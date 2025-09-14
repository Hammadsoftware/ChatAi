"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight text-blue-400 hover:text-blue-300 transition"
        >
          Convex
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="text-gray-300 hover:text-blue-400 text-sm font-medium transition"
          >
            Pricing
          </Link>

          {/* Show only when signed out */}
          <SignedOut>
            {/* Sign In (modal) */}
            <SignUpButton mode="modal" >
              <Link href={"/dashboard"} className="text-gray-300 hover:text-blue-400 text-sm font-medium transition">
                Sign up
              </Link>
            </SignUpButton>

           
            <SignInButton mode="modal" >
              <Link href={"/dashboard"} className="px-5 py-2 w-36  flex items-center justify-center h-12 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow transition">
                Get Started
                <FaLongArrowAltRight />
              </Link>
            </SignInButton>
          </SignedOut>

          {/* Show only when signed in */}
          <SignedIn>
             <UserButton  />
            <Link href={"/dashboard"} className="px-5 py-2 w-36 flex items-center justify-center h-12 rounded font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow transition">dashboard</Link>
           

          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
