import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="mb-3 text-6xl md:text-8xl font-extrabold text-gradient">404</h1>
        <p className="mb-2 text-xl md:text-2xl text-muted-foreground">Xatolik! Sahifa topilmadi</p>
        <p className="mb-8 text-muted-foreground">Siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.</p>
        <Button asChild size="lg" className="shadow-accent hover-lift">
          <a href="/">Uyga Qaytish</a>
        </Button>
      </motion.div>
      {/* Floating accents */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-24 left-16 w-2 h-2 bg-primary rounded-full animate-float" />
        <div className="absolute bottom-28 right-16 w-3 h-3 bg-accent rounded-full animate-float" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
};

export default NotFound;
