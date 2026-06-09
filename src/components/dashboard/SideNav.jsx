"use client";

import { Button } from "@heroui/react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  BarChart3,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/app/lib/auth-client";

export default function SideNav({ collapsed, setCollapsed }) {
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/signin");
    }
  }, [user, isPending, router]);

  if (isPending) return null;
  if (!user) return null;

  const navigation = [
    {
      name: "Dashboard",
      href: user?.role === "seeker" ? "/job-seeker" : "/recruiter",
      icon: LayoutDashboard
    },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Roles", href: "/dashboard/roles", icon: Shield },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={
        "h-full bg-black text-white border-r flex flex-col transition-all duration-300 " +
        (collapsed ? "w-20" : "w-64")
      }
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && <Link href="/" className="font-bold text-lg">PathMatch</Link>}

        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {navigation.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href}>
              <div
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 mb-2 rounded-lg text-sm transition",
                  active
                    ? "bg-gray-100 text-black"
                    : "hover:bg-gray-100 hover:text-black text-white",
                  collapsed && "justify-center",
                )}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t text-xs text-gray-500">
        {!collapsed ? "Admin Panel v1.0" : "v1"}
      </div>
    </aside>
  );
}
