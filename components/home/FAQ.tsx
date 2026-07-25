"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  { q: "Is LunevaBeauty cruelty-free?", a: "Yes — none of our formulas are tested on animals, and the majority of our line is vegan." },
  { q: "Do you offer cash on delivery?", a: "Yes, COD is available alongside card payment at checkout." },
  { q: "What is your return policy?", a: "Unopened products can be returned within 30 days of delivery for a full refund." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="font-display text-[16px] text-charcoal">{q}</span>
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && <p className="font-body text-[14px] pb-5 text-charcoal-soft">{a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="max-w-3xl mx-auto px-5 py-20">
      <Reveal className="mb-7">
        <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">Good to know</p>
        <h2 className="text-[28px] sm:text-[34px] font-display text-charcoal">FAQs</h2>
      </Reveal>
      <Reveal>{faqs.map((f, i) => <FAQItem key={i} {...f} />)}</Reveal>
    </section>
  );
}
