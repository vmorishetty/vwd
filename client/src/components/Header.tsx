import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, Search, X, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { Category } from "@shared/schema";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fetch categories
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="text-xs md:text-sm flex justify-between items-center">
            <div>
              The latest in startup and venture capital news
            </div>
            <div>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-4">
            <div className="font-bold text-2xl tracking-tight">
              <Link href="/" className="flex items-center">
                <BarChart2 className="h-8 w-8 text-blue-600 mr-2" />
                <div>
                  <span className="text-blue-600 text-xl md:text-2xl font-extrabold font-serif">VENTURE</span>
                  <span className="text-gray-800 text-xl md:text-2xl font-light ml-1 font-serif">WIRE</span>
                  <span className="hidden sm:inline text-blue-600 text-sm align-top ml-1 font-medium">DAILY</span>
                </div>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-6 ml-8">
              {!isLoading &&
                categories?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <SearchBar />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="flex md:hidden items-center text-gray-700"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
            <Link href="/subscribe">
              <Button className="hidden md:inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                Subscribe
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/" 
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="h-7 w-7 text-blue-600 mr-2" />
                <div>
                  <span className="text-blue-600 text-lg font-extrabold font-serif">VENTURE</span>
                  <span className="text-gray-800 text-lg font-light ml-1 font-serif">WIRE</span>
                </div>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            
            <div className="relative mt-6 mb-4">
              <div onClick={() => setMobileMenuOpen(false)}>
                <SearchBar />
              </div>
            </div>
            
            <div className="mt-2 space-y-0.5">
              <h3 className="text-xs uppercase tracking-wider text-gray-500 font-semibold px-3 mb-1">
                Categories
              </h3>
              {!isLoading &&
                categories?.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <Link 
                  href="/subscribe" 
                  className="block w-full text-center px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe to Newsletter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
