
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Not set');
console.log('Supabase Key:', supabaseKey ? 'Set' : 'Not set');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test connection to the brands table
export const testBrandsTableConnection = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Testing connection to Supabase brands table...');
    
    // First test general Supabase connection
    const { error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.error('Error connecting to Supabase:', authError);
      return { success: false, error: `Supabase connection error: ${authError.message}` };
    }
    
    // Now test the brands table specifically
    const { data, error } = await supabase
      .from('brands')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Error connecting to brands table:', error);
      
      // Check for Row Level Security issues
      if (error.code === '42501') {
        return { 
          success: false, 
          error: 'Row Level Security is enabled for the brands table. You may need to authenticate first or adjust RLS policies.' 
        };
      }
      
      return { success: false, error: `Brands table error: ${error.message}` };
    }
    
    console.log('Successfully connected to brands table');
    return { success: true };
  } catch (error) {
    console.error('Exception when testing brands table connection:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export interface BrandRegistrationData {
  brandName: string;
  email: string;
  domain: string;
  website: string;
  phone: string;
  industry: string;
  customIndustry?: string;
  description: string;
  address: string;
  contactPerson: string;
  isParentCompany: boolean;
  parentCompany?: string;
}

// Special function to check for RLS policies on brands table
export const checkRlsPolicies = async (): Promise<{ 
  hasInsertPolicy: boolean; 
  error?: string;
  details?: string;
}> => {
  try {
    // Attempt an anonymous insert (should fail if no policy)
    const testData = {
      name: 'RLS Test Brand',
      email: 'test@example.com',
      status: 'test',
      user_id: 'test-user-id'
    };
    
    const { error } = await supabase
      .from('brands')
      .insert([testData])
      .select();
    
    // If there's no error or the error is not RLS related, assume the policy exists
    if (!error || error.code !== '42501') {
      return { hasInsertPolicy: true };
    }
    
    return { 
      hasInsertPolicy: false,
      error: 'Missing INSERT policy for the brands table',
      details: `You need to create an RLS policy that allows users to insert records. Current error: ${error.message}`
    };
  } catch (error) {
    console.error('Error checking RLS policies:', error);
    return { 
      hasInsertPolicy: false, 
      error: 'Error checking RLS policies',
      details: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Function to provide specific RLS policy suggestions
export const getRlsPolicySuggestions = (): string => {
  return `
To fix the RLS policy issue, go to your Supabase dashboard and create these policies:

1. Enable RLS on the brands table if not already enabled:
   - Go to Table Editor > brands > Authentication
   - Toggle "Enable RLS"

2. Create an INSERT policy:
   SQL: CREATE POLICY "Enable insert for authenticated users" 
   ON brands FOR INSERT 
   TO authenticated
   WITH CHECK (auth.uid() IS NOT NULL);

3. Make sure auth.uid() is being properly set as user_id in your brand registration code.

Note: The current error might be because your policy has a condition that's not being met.
Check if your policy has a condition like "WITH CHECK (auth.uid() = user_id)"
If so, make sure user_id is being set to auth.uid() when inserting.
  `;
};

export const registerBrand = async (
  formData: BrandRegistrationData, 
  password: string
): Promise<{ success: boolean; error?: string; brandId?: string; errorCode?: string; rlsHelp?: string }> => {
  try {
    // First test the connection to the brands table
    const connectionTest = await testBrandsTableConnection();
    if (!connectionTest.success) {
      return { 
        success: false, 
        error: `Could not connect to brands table: ${connectionTest.error}` 
      };
    }
    
    // Step 1: Check if user already exists
    const { data: existingUserData, error: checkUserError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: password
    });

    if (existingUserData?.user) {
      return { 
        success: false, 
        error: "A user with this email already exists. Please sign in instead or use a different email.",
        errorCode: "user_already_exists"
      };
    }
    
    // Step 2: Create the user account with email and password
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: password,
      options: {
        data: {
          full_name: formData.contactPerson,
          brand_name: formData.brandName
        }
      }
    });

    if (authError) {
      console.error('Authentication error:', authError);
      
      // Handle specific auth error cases
      if (authError.status === 422 && authError.message.includes('already registered')) {
        return { 
          success: false, 
          error: "This email is already registered. Please use a different email or try signing in.", 
          errorCode: "user_already_exists"
        };
      }
      
      return { success: false, error: authError.message };
    }

    // Step 3: Sign in with the newly created user to get the session
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: password
    });

    if (signInError) {
      console.error('Sign in error after registration:', signInError);
      return { 
        success: false, 
        error: "Account created but couldn't sign in automatically. Please try signing in manually.",
        errorCode: "signin_failed" 
      };
    }

    // Step 4: Insert the brand data into the brands table
    const { data: brandData, error: brandError } = await supabase
      .from('brands')
      .insert([
        {
          name: formData.brandName,
          email: formData.email,
          domain: formData.domain,
          website: formData.website,
          phone: formData.phone,
          industry: formData.industry === 'other' ? formData.customIndustry : formData.industry,
          description: formData.description,
          address: formData.address,
          contact_person: formData.contactPerson,
          is_parent_company: formData.isParentCompany,
          parent_company: !formData.isParentCompany ? formData.parentCompany : null,
          status: 'pending', // Pending approval by admin
          user_id: authData.user?.id
        }
      ])
      .select();

    if (brandError) {
      console.error('Brand registration error:', brandError);
      
      // Handle specific brand insertion error cases
      if (brandError.code === '42501') {
        // Get the RLS policy suggestions
        const rlsSuggestions = getRlsPolicySuggestions();
        
        return { 
          success: false, 
          error: "Permission denied: You don't have access to create brand records. This is due to Row Level Security (RLS) policies.",
          errorCode: "rls_violation",
          rlsHelp: rlsSuggestions
        };
      }
      
      return { success: false, error: brandError.message };
    }

    return { 
      success: true, 
      brandId: brandData?.[0]?.id 
    };
  } catch (error) {
    console.error('Registration failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Function to fetch all brands (for admin purposes)
export const getAllBrands = async () => {
  const { data, error } = await supabase
    .from('brands')
    .select('*');
    
  if (error) {
    console.error('Error fetching brands:', error);
    throw error;
  }
  
  return data;
};

// Function to get a brand by ID
export const getBrandById = async (brandId: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('id', brandId)
    .single();
    
  if (error) {
    console.error(`Error fetching brand with ID ${brandId}:`, error);
    throw error;
  }
  
  return data;
};

// Function to get brand by user ID
export const getBrandByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('user_id', userId)
    .single();
    
  if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
    console.error(`Error fetching brand for user ${userId}:`, error);
    throw error;
  }
  
  return data;
};
