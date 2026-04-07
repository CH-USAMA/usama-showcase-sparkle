import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FloatingHireMe = () => {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-20 z-50"
          >
            <Button
              size="lg"
              variant="hero"
              className="shadow-glow rounded-full px-6 gap-2"
              onClick={() => setOpen(true)}
            >
              <MessageCircle className="w-5 h-5" />
              Hire Me
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-display font-bold">
              Let's Work Together
            </DialogTitle>
          </DialogHeader>

          <form
            action="https://formspree.io/f/mkgzjlde"
            method="POST"
            className="space-y-4"
          >
            <Input type="text" name="name" placeholder="Your Name" required className="rounded-xl" />
            <Input type="email" name="email" placeholder="Your Email" required className="rounded-xl" />
            <Textarea name="message" placeholder="Tell me about your project..." required className="rounded-xl" />
            <DialogFooter className="mt-4">
              <Button type="submit" variant="hero" className="w-full rounded-xl shadow-glow">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingHireMe;
