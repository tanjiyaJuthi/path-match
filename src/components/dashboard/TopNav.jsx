"use client";

import { authClient, useSession } from "@/app/lib/auth-client";
import { getInitials } from "@/app/lib/helper/helper";
import {
  Button,
  Input,
  Dropdown,
  Avatar,
  Label
} from "@heroui/react";
import { Menu, Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopNav({ collapsed, setCollapsed }) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  return (
    <header className="h-16 bg-black text-white border-b flex items-center justify-between px-4">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Button
          isIconOnly
          variant="light"
          className="md:hidden"
          onPress={() => setCollapsed(!collapsed)}
        >
          <Menu />
        </Button>

        <Input placeholder="Search..." className="w-64 hidden md:flex" />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Button isIconOnly variant="light">
          <Bell />
        </Button>

        <Dropdown>
          <Button className="bg-transparent" aria-label="Menu" variant="secondary">
            <Avatar
              size="sm"
              src={user?.image || "../../../public/images/fallback.jpg"}
              name={user?.name || "User"}
            >
              {!user?.image && getInitials(user?.name || "User")}
            </Avatar>
          </Button>

          <Dropdown.Popover className="rounded-lg">
            <Dropdown.Menu>
              <Dropdown.Item textValue="Sign Out" variant="danger" className="hover:rounded-lg">
                <Button variant="ghost" onClick={handleLogout}>
                  Sign Out
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </header>
  );
}