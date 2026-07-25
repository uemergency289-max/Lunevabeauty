import Reveal from "@/components/ui/Reveal";

const items = [
  { icon: "🚚", label: "Free shipping over $75" },
  { icon: "✅", label: "Dermatologist tested" },
  { icon: "↩️", label: "30-day returns" },
  { icon: "🌿", label: "Cruelty-free formulas" },
];

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-line">
      <div className="max-w-6xl mx-auto px-5 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <Reveal key={i} delay={i * 80} className="flex items-center gap-3">
            <span className="text-[18px]">{item.icon}</span>
            <span className="text-[12.5px] font-body text-charcoal">{item.label}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
