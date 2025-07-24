import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export default function HireMe() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="lg"
        variant="outline-white"
        className="gap-2 hover:scale-105 transition-all duration-300"
        onClick={() => setOpen(true)}
      >
        <Mail className="w-4 h-4" />
        Hire Me
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-semibold">
              Hire Me
            </DialogTitle>
          </DialogHeader>

          <form
            action="https://formspree.io/f/mkgzjlde"
            method="POST"
            className="space-y-4"
          >
            <Input type="text" name="name" placeholder="Your Name" required />
            <Input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <Textarea
              name="message"
              placeholder="Write your message..."
              required
            />

            <DialogFooter className="mt-4">
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
