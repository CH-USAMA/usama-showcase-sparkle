import { motion } from "framer-motion";

const Motto = () => {
  return (
    <section className="py-16 bg-card/50 border-y border-border/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <motion.p
            className="text-3xl lg:text-5xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            "Don't just build software —{" "}
            <span className="text-primary">digitize, automate, and scale</span>{" "}
            your entire business."
          </motion.p>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            — Usama Munawar
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Motto;
