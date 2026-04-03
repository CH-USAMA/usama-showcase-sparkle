import { motion } from "framer-motion";

const Motto = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Glow line top */}
      <div className="glow-line w-full" />
      
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto space-y-6"
        >
          <motion.p
            className="text-2xl sm:text-4xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <span className="text-foreground">"Don't just build software — </span>
            <span className="text-gradient">digitize, automate, and scale</span>
            <span className="text-foreground"> your entire business."</span>
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            — Usama Munawar
          </motion.p>
        </motion.div>
      </div>

      {/* Glow line bottom */}
      <div className="glow-line w-full" />
    </section>
  );
};

export default Motto;
