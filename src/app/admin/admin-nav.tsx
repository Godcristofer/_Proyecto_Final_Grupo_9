
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const adminNavLinks = [
  { href: "/admin/users", label: "Usuarios" },
  { href: "/admin/sales", label: "Ventas" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2 mb-8">
      {adminNavLinks.map((link) => (
        <Button
          key={link.href}
          asChild
          variant={pathname === link.href ? "default" : "outline"}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
