"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const cart = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const goToSection = (id: string) => {
    router.push(`/#${id}`);
  };

  // Close profile menu on outside click / ESC
  useEffect(() => {
    if (!menuOpen) return;

    const onDown = (e: MouseEvent) => {
      const el = menuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setMenuOpen(false);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-cream/90 border-b border-gold">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo -> Home */}
          <Link
            href="/"
            className="brand-logo text-4xl text-brown font-black tracking-wider"
            aria-label="Go to home"
          >
            Konaseema Specials
          </Link>

          <div className="hidden md:flex gap-8 font-semibold">
            <button className="hover:text-gold" onClick={() => goToSection("home")} type="button">
              Home
            </button>
            <button className="hover:text-gold" onClick={() => goToSection("categories")} type="button">
              Categories
            </button>
            <button className="hover:text-gold" onClick={() => goToSection("products")} type="button">
              Products
            </button>
            <button className="hover:text-gold" onClick={() => goToSection("about")} type="button">
              About
            </button>
            <button className="hover:text-gold" onClick={() => goToSection("contact")} type="button">
              Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              className="relative"
              onClick={cart.open}
              aria-label="Open cart"
              type="button"
            >
              <ShoppingCart />
              {cart.count > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-brown text-xs font-bold rounded-full px-2 py-0.5">
                  {cart.count}
                </span>
              )}
            </button>

            {/* WhatsApp */}
            <a
              aria-label="WhatsApp"
              className="icon-circle whatsapp-circle"
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noreferrer"
              title="Contact on WhatsApp"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
