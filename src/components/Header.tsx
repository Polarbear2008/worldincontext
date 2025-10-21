import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    } else {
      toast.error("Iltimos, qidiruv so'zini kiriting");
    }
  };

  const navigation = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Siyosat", href: "/siyosat" },
    { name: "Iqtisod", href: "/iqtisod" },
    { name: "Geografiya", href: "/geografiya" },
    { name: "Tarix", href: "/tarix" },
    { name: "Diplomatiya", href: "/diplomatiya" },
    { name: "Biz Haqimizda", href: "/about" },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="World in Context" className="h-10 md:h-12 w-auto group-hover:scale-105 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors text-base font-medium story-link"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar & Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 w-48 h-9 text-sm glass-effect hover:border-primary/50 focus:border-primary transition-colors"
              />
            </form>
            <Button variant="outline" size="sm" className="hover-scale whitespace-nowrap" asChild>
              <a href="/signin">Kirish</a>
            </Button>
            <Button size="sm" className="hover-scale bg-primary whitespace-nowrap" asChild>
              <a href="/signup">Ro'yxatdan o'tish</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Maqolalarni qidirish..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-base"
                />
              </form>
              <nav className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-foreground hover:text-primary hover:bg-primary/5 transition-colors py-3 px-3 text-base font-medium rounded-lg"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="lg" className="w-full h-12 text-base" asChild>
                  <a href="/signin">Kirish</a>
                </Button>
                <Button size="lg" className="w-full h-12 text-base bg-primary" asChild>
                  <a href="/signup">Ro'yxatdan o'tish</a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;