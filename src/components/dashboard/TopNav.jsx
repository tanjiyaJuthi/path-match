"use client";

import { Button, Input } from "@heroui/react";
import { Menu, Bell } from "lucide-react";

export default function TopNav({ collapsed, setCollapsed }) {
  return (
    <header className="h-16 bg-black text-white border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          className="md:hidden"
          onPress={() => setCollapsed(!collapsed)}
        >
          <Menu />
        </Button>

        <Input
          placeholder="Search..."
          className="w-64 hidden md:flex"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button isIconOnly variant="light">
          <Bell />
        </Button>

        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}