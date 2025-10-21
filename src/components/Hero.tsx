import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center mb-3">
              <motion.div
                className="relative"
                initial={{ scale: 0.95, rotate: 0 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
              >
                <Globe className="h-14 w-14 md:h-16 md:w-16 text-primary" />
              </motion.div>
            </div>
            <div className="accent-pill mx-auto mb-4 text-sm md:text-base">Global bilimlarni o'rganing</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 px-4">
              <span className="text-gradient">World in Context</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 font-light px-4">
              Dunyo bilimlari o‘zbek tilida.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
              Biz eng yaxshi xalqaro maqolalarni tarjima qilamiz va global bilimlarni o'zbek o'quvchilari uchun taqdim etamiz.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 px-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-accent hover:to-primary/90 text-primary-foreground border-0 shadow-2xl hover:shadow-primary/25 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto h-14 sm:h-14 text-lg font-semibold"
              onClick={() => {
                const categoriesSection = document.getElementById('categories-section');
                categoriesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <BookOpen className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="tracking-wide">Maqolalarni Ko'rish</span>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </div>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group relative overflow-hidden border-2 border-primary/30 hover:border-primary bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-xl hover:shadow-primary/20 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto h-14 sm:h-14 text-lg font-semibold"
              onClick={() => {
                const newsletterSection = document.getElementById('newsletter-section');
                newsletterSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-3">
                <Mail className="h-6 w-6 transition-transform group-hover:scale-110" />
                <span className="tracking-wide">Yangilanishlarga Obuna Bo'lish</span>
              </div>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;