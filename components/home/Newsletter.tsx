"use client";

import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/ui/Reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Welcome! Check your inbox for 15% off.");
    setEmail("");
  };
  return (
    <section className="py-20 bg-charcoal">
      <Reveal className="max-w-xl mx-auto px-5 text-center">
        <p className="text-[12px] uppercase tracking-[0.3em] mb-3 font-body text-gold">Join the list</p>
        <h2 className="font-display text-[28px] text-white">Get 15% off your first order</h2>
        <form onSubmit={handleSubmit} className="mt-7 flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 text-[13px] outline-none font-body bg-white/10 text-white border border-white/25"
          />
          <button type="submit" className="px-6 py-3 text-[12px] tracking-wide uppercase bg-gold text-white font-body">Subscribe</button>
        </form>
      </Reveal>
    </section>
  );
}
