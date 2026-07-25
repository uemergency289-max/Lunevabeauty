import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 py-24 text-center">
      <p className="font-display text-[60px] text-gold">404</p>
      <h1 className="font-display text-[24px] text-charcoal mb-2">Page Not Found</h1>
      <p className="font-body text-charcoal-soft mb-6">The page you're looking for doesn't exist.</p>
      <Link href="/" className="inline-block px-6 py-3 bg-charcoal text-white font-body text-[13px] uppercase">Back to Home</Link>
    </div>
  );
}
