import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-line bg-charcoal text-white">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <span className="font-display text-[18px]">LunevaBeauty Admin</span>
          <Link href="/" className="font-body text-[12px] text-gold">← Storefront</Link>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-5 py-8">{children}</div>
    </div>
  );
}
