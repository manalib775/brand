
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Image as ImageIcon, Download, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BulkUploadTab() {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  
  // Template data for CSV downloads
  const templateData = {
    brand: {
      filename: "brand_data_template.csv",
      content: "Brand ID,Brand Name,Industry,Description,Website,Logo URL,Year Founded,Country,Contact Email,Contact Phone,Social Media Links\n1,Example Brand,Technology,A sample brand description,https://example.com,https://example.com/logo.png,2020,India,contact@example.com,+91-1234567890,\"Instagram: @examplebrand, Twitter: @examplebrand, Facebook: ExampleBrand\""
    },
    product: {
      filename: "product_data_template.csv",
      content: "Product ID,Brand ID,Product Name,Category,Sub-category,Description,Price,Currency,Stock,Product URL,Image URL,Features,Specifications,Weight,Dimensions,Materials,Manufacturing Location,Warranty Period,Certification\n1,1,Sample Product,Electronics,Smartphones,A sample product description,29999,INR,100,https://example.com/product1,https://example.com/product1.jpg,\"5G, 8GB RAM, 128GB Storage\",\"Processor: Snapdragon 888, Screen: 6.5 inch AMOLED\",189g,\"16.5 x 7.4 x 0.8 cm\",\"Glass, Aluminum\",China,\"1 Year\",\"BIS, CE\""
    },
    company: {
      filename: "company_structure_template.csv",
      content: "Company ID,Brand ID,Company Name,Parent Company,Headquarters,CEO/MD,Founded Year,Employees Count,Annual Revenue,Revenue Currency,Public/Private,Stock Symbol,Subsidiaries,Company Description,Industry\n1,1,Example Corp,Example Global Inc.,Mumbai,John Doe,2010,1200,50000000,INR,Public,EXCORP,\"Example Subsidiaries: Example Tech, Example Finance\",A leading technology company in India,Technology"
    },
    regulatory: {
      filename: "regulatory_bodies_template.csv",
      content: "Regulatory ID,Name,Country,Industry,Description,Website,Certification Type,Required For,Validity Period,Renewal Process,Contact Information\n1,Bureau of Indian Standards,India,\"Consumer Electronics, Food, Textiles\",National standards body of India,https://www.bis.gov.in,BIS Certification,\"Electronic items, Gold jewelry, Packaged water\",\"2-5 Years\",\"Application submission, Sample testing, Factory inspection\",\"contact@bis.gov.in, +91-1112223333\""
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImages(files);
      console.log('Images selected:', files);
    }
  };

  const simulateUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadSuccess(null);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          setUploadedFiles(prevFiles => [...prevFiles, selectedFile.name]);
          setSelectedFile(null);
          
          toast({
            title: "File uploaded",
            description: `${selectedFile.name} has been uploaded successfully.`
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const simulateImagesUpload = () => {
    if (!selectedImages || selectedImages.length === 0) {
      toast({
        title: "No images selected",
        description: "Please select at least one image to upload",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploadSuccess(true);
          
          const imageNames = Array.from(selectedImages).map(file => file.name);
          setUploadedFiles(prevFiles => [...prevFiles, ...imageNames]);
          setSelectedImages(null);
          
          toast({
            title: "Images uploaded",
            description: `${selectedImages.length} images have been uploaded successfully.`
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const downloadTemplate = (templateType: 'brand' | 'product' | 'company' | 'regulatory') => {
    const template = templateData[templateType];
    
    // Create a Blob with the CSV content
    const blob = new Blob([template.content], { type: 'text/csv' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element and trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = template.filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Template Downloaded",
      description: `${template.filename} has been downloaded. You can fill it and upload it back.`
    });
  };

  const clearUploads = () => {
    setUploadedFiles([]);
    setUploadSuccess(null);
    toast({
      title: "Uploads cleared",
      description: "All uploaded files have been cleared."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Data Upload</CardTitle>
          <CardDescription>Import brand and product data via Excel or CSV</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed rounded-lg p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
              </div>
              <div>
                <Label 
                  htmlFor="file-upload" 
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/80"
                >
                  <span>Upload Excel/CSV file</span>
                  <Input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />
                </Label>
                {selectedFile && (
                  <div className="mt-2 text-sm">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Drag and drop or click to upload. Supported formats: .xlsx, .xls, .csv
              </p>
              
              {selectedFile && (
                <div className="mt-4">
                  <Button 
                    onClick={simulateUpload} 
                    disabled={uploading}
                    className="w-full"
                  >
                    {uploading ? 'Uploading...' : 'Start Upload'}
                  </Button>
                </div>
              )}
              
              {uploading && (
                <div className="mt-4 space-y-2">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              
              {uploadSuccess === true && (
                <Alert className="mt-4 bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle>Upload Successful</AlertTitle>
                  <AlertDescription>
                    Your data has been uploaded successfully.
                  </AlertDescription>
                </Alert>
              )}
              
              {uploadSuccess === false && (
                <Alert className="mt-4 bg-red-50 border-red-200" variant="destructive">
                  <X className="h-4 w-4" />
                  <AlertTitle>Upload Failed</AlertTitle>
                  <AlertDescription>
                    There was an error uploading your data. Please try again.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Download Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => downloadTemplate('brand')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  <span className="flex-1 text-left">Brand Data Template</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => downloadTemplate('product')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  <span className="flex-1 text-left">Product Data Template</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => downloadTemplate('company')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  <span className="flex-1 text-left">Company Structure Template</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => downloadTemplate('regulatory')}
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  <span className="flex-1 text-left">Regulatory Bodies Template</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Bulk Image Upload</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label 
                  htmlFor="image-upload" 
                  className="relative cursor-pointer block p-4 border-2 border-dashed rounded-lg hover:bg-accent"
                >
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground" />
                    <span className="text-sm font-medium block">Upload Brand Logos & Banners</span>
                    <Input
                      id="image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </div>
                </Label>
                
                {selectedImages && selectedImages.length > 0 && (
                  <div className="mt-2">
                    <div className="text-sm mb-2">
                      Selected: {selectedImages.length} image(s)
                    </div>
                    <Button 
                      onClick={simulateImagesUpload} 
                      disabled={uploading}
                      className="w-full"
                    >
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Uploads Section */}
          {uploadedFiles.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Uploads</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={clearUploads}
                >
                  Clear All
                </Button>
              </div>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="p-2 bg-green-50 border border-green-100 rounded-md flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
