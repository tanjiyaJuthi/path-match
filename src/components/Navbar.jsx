"use client";

import { authClient, useSession } from "@/app/lib/auth-client";
import { Button, Link } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut();

    router.push("/signin");
  };

  const navItems = [
    { label: "Browse Jobs", href: "browse-jobs" },
    { label: "Company", href: "company" },
    { label: "Pricing", href: "pricing" },
    ...(user
    ? [
        { label: "Recruiter", href: "recruiter" },
        { label: "Job Seeker", href: "/job-seeker" },
      ]
    : []),
  ];

  return (
    <nav className="sticky top-0 z-50 mt-6 px-5 lg:px-0">
      <div className="nav-container max-w-7xl mx-auto rounded-3xl px-8 py-3 flex items-center justify-between">
        <Link href="/" data-purpose="brand-logo">
          PathMatch
        </Link>

        <div
          className="hidden md:flex items-center"
          data-purpose="primary-links"
        >
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-divider"></div>

          <div
            className="flex items-center space-x-6"
            data-purpose="user-actions"
          >
            {user ? (
              <div className="flex items-center gap-2">
                <Button className="bg-[#8b5cf6] ">{user.name[0]}</Button>

                <Button
                  onClick={handleLogout}
                  className="text-white bg-[#8b5cf6] hover:text-white transition"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Link
                  className="text-sm font-medium text-[#8b5cf6] hover:text-[#a78bfa] transition-colors"
                  href="/signin"
                >
                  Sign In
                </Link>

                <Link
                  className="btn btn-gradient px-6 py-2.5 rounded-xl text-white text-sm font-semibold bg-[#8b5cf6] ml-7"
                  href="signup"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-300 hover:text-white"
          >
            {isMenuOpen ? (
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16m-7 6h7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 border-t border-white/10" : "max-h-0"
        }`}
      >
        <div className="space-y-2 p-5">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block rounded-xl px-3 py-3 text-gray-300 transition hover:bg-white/5 hover:text-white"
              onPress={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-4 border-t border-white/10 pt-4">
            <Link
              href="/signin"
              className="mb-3 block px-3 py-3 text-[#6D5DFC]"
            >
              signin
            </Link>

            <Link
              href="/signup"
              fullWidth
              radius="lg"
              className="btn bg-[#6D5DFC] text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
