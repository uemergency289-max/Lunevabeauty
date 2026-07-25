import Reveal from "@/components/ui/Reveal";

const reviews = [
  { name: "Ayesha K.", text: "The serum absorbed instantly and my skin has never felt this hydrated. Repeat customer for life.", rating: 5 },
  { name: "Zainab R.", text: "Packaging alone feels premium. Product quality matches the price completely.", rating: 5 },
  { name: "Hina S.", text: "Fast delivery and the COD process was seamless. Will be ordering again.", rating: 4 },
];

export default function Reviews() {
  return (
    <section className="py-20 bg-beige">
      <div className="max-w-6xl mx-auto px-5">
        <Reveal className="mb-7">
          <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">What customers say</p>
          <h2 className="text-[28px] sm:text-[34px] font-display text-charcoal">Real reviews</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 100} className="p-6 rounded-sm bg-white border border-line">
              <p className="text-gold text-[14px] mb-3">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
              <p className="font-body text-[14px] leading-relaxed text-charcoal">&quot;{r.text}&quot;</p>
              <p className="font-display text-[13px] text-gold mt-4">{r.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
