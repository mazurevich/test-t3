import React from "react";
import { Button } from "#/components/ui/button";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-secondary w-full">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/about">About</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
