import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxShowcase = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Depth-based transforms
  const yFar = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yNear = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const opacityIn = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ opacity: opacityIn }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Dunyoni Qatlamlarda O'rganing
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg md:text-xl"
            style={{ opacity: opacityIn }}
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Skroll qilganingizda chuqurlikni ochib beruvchi parallax namoyishi.
          </motion.p>
        </div>
      </div>

      {/* Far background blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-20 -left-16 w-80 h-80 rounded-full blur-3xl z-0"
        style={{ y: yFar, background: "radial-gradient(closest-side, hsl(var(--primary) / 0.18), transparent)" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-10 -right-10 w-72 h-72 rounded-full blur-3xl z-0"
        style={{ y: yFar, background: "radial-gradient(closest-side, hsl(var(--accent) / 0.18), transparent)" }}
      />

      {/* Masked parallax imagery (replace URLs with your assets in /public or /src/assets) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-6 md:top-10 h-72 md:h-96 mask-fade-x z-0"
        style={{
          y: yFar,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1400&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.45,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-40 md:top-56 h-80 md:h-[28rem] mask-fade-y z-0"
        style={{
          y: yMid,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1502920917128-1aa500764ce7?q=80&w=1400&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
          filter: "grayscale(10%)",
        }}
      />

      {/* Middle cards layer */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-6 md:gap-8"
          style={{ y: yMid }}
        >
          {[
            {
              title: "Siyosat",
              desc: "Jahon ishlarining ortidagi kontekst.",
            },
            {
              title: "Geografiya",
              desc: "Harakatlanishdagi joylar va odamlar.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-6 gradient-card shadow-elegant hover-lift"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Foreground image strip */}
      <div className="container mx-auto px-4 relative z-20 mt-10 md:mt-16">
        <motion.div
          className="rounded-3xl glass-effect border overflow-hidden shadow-glow"
          style={{ y: yNear }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative w-full h-40 md:h-56 lg:h-64">
            {/* Decorative stripes mimicking a map/graph */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--border))/60_1px,transparent_1px)] bg-[length:24px_100%] opacity-60" />
            <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))/50_1px,transparent_1px)] bg-[length:100%_24px] opacity-60" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsl(var(--accent)/0.12) 0%, transparent 60%)" }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxShowcase;
