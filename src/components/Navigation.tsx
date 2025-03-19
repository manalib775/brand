
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignedIn, UserButton, useAuth } from "@clerk/clerk-react"
import { Link } from "react-router-dom"
import { NavigationMenu } from "@/components/ui/navigation-menu"
import { NotificationCenter } from "@/components/NotificationCenter"
import { LoginButtons } from "@/components/auth/LoginButtons"
import { useCustomerAuth } from "@/contexts/CustomerAuthContext"
import { LogOut } from "lucide-react"

export function Navigation() {
  const { userId } = useAuth();
  const { isLoggedIn, userProfile, logout } = useCustomerAuth();

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          BrandReview
        </Link>
        
        <div className="flex items-center space-x-4">
          {userId ? (
            <>
              <NotificationCenter />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="Clerk User" />
                      <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : isLoggedIn ? (
            <>
              <NotificationCenter />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage 
                        src={userProfile?.profilePicture || "/placeholder.svg"} 
                        alt={userProfile?.name || "User"} 
                      />
                      <AvatarFallback>
                        {userProfile?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/register" className="w-full">Register Product</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <LoginButtons />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
