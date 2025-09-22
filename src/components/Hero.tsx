import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="container-narrow text-center">
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
            <div className="accent-pill mx-auto mb-4">Explore global knowledge</div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-gradient">World in Context</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-light">
              Global knowledge, made simple in Uzbek.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We translate the world's best educational content into Uzbek, making global knowledge accessible for everyone.
            </p>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4 }}
          >
            <Button size="lg" className="btn-gradient hover-lift">
              <BookOpen className="mr-2 h-5 w-5" />
              <span>Browse Articles</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="ghost" size="lg" className="hover-scale">
              Subscribe to Updates
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-border/60"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {[{v:'500+', l:'Articles Translated', c:'text-primary'}, {v:'6', l:'Subject Areas', c:'text-primary'}, {v:'10K+', l:'Monthly Readers', c:'text-accent'}, {v:'100%', l:'Free Access', c:'text-accent'}].map((s, i) => (
              <motion.div key={i} className="text-center group" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                <div className={`text-3xl font-bold ${s.c} mb-1`}>{s.v}</div>
                <div className="text-sm text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;