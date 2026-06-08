"use client";

import SideNav from "@/components/dashboard/SideNav";
import TopNav from "@/components/dashboard/TopNav";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-black">
      <SideNav collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1">
        <TopNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}