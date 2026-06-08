"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";
import { Button } from "@heroui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Shield,
} from "lucide-react";

export default function SideNav({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Users", href: "/dashboard/users", icon: Users },
    { name: "Roles", href: "/dashboard/roles", icon: Shield },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <aside
      className={clsx(
        "h-full bg-black text-white border-r flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b">
        {!collapsed && (
          <span className="font-bold text-lg">Admin</span>
        )}

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
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition",
                  active
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700",
                  collapsed && "justify-center"
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