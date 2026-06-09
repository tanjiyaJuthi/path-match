'use client';

import { useSession } from "@/app/lib/auth-client";
import {
  Card,
  Avatar,
  Chip,
  Button,
  Link
} from "@heroui/react";

import {
  FileText,
  Users,
  Zap,
  CheckCircle,
  Plus
} from "lucide-react";

/* -----------------------------
   Data
------------------------------ */

const overviewStats = [
  { title: "Total Job Posts", value: "48", icon: FileText },
  { title: "Total Applicants", value: "1,284", icon: Users },
  { title: "Active Jobs", value: "18", icon: Zap },
  { title: "Jobs Closed", value: "32", icon: CheckCircle },
];

const recentApplications = [
  { id: 1, name: "Julianne Moore", role: "Senior Product Designer", date: "Oct 24, 2023", exp: "6 years", status: "Interviewing" },
  { id: 2, name: "Robert Downey", role: "Backend Engineer", date: "Oct 23, 2023", exp: "4 years", status: "New" },
  { id: 3, name: "Emma Stone", role: "Marketing Lead", date: "Oct 22, 2023", exp: "8 years", status: "Reviewing" },
  { id: 4, name: "Chris Pratt", role: "Product Manager", date: "Oct 21, 2023", exp: "5 years", status: "Rejected" },
];

const topCompanies = [
  { id: 1, name: "Google Inc.", industry: "Technology • Mountain View", jobs: 24, logoBg: "bg-blue-950/40" },
  { id: 2, name: "Meta Platforms", industry: "Social Media • Menlo Park", jobs: 18, logoBg: "bg-indigo-950/40" },
  { id: 3, name: "Stripe", industry: "Fintech • San Francisco", jobs: 12, logoBg: "bg-slate-800" },
  { id: 4, name: "Tesla", industry: "Automotive • Austin", jobs: 31, logoBg: "bg-zinc-800" },
];

const statusColorMap = {
  Interviewing: "success",
  New: "default",
  Reviewing: "warning",
  Rejected: "danger",
};

export default function RecruiterPage() {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0d0d0e] text-white">
        <span className="animate-pulse text-lg">Loading ....</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-100 p-4 md:p-10 pb-28">

      {/* Header */}
      <header className="mb-8">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
          Welcome back, {user?.name || "Anonymous"}
        </h2>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="bg-[#161618] border border-zinc-800/60">
              <div className="p-5 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#202024]">
                  <Icon size={18} className="text-zinc-400" />
                </div>

                <div>
                  <p className="text-xs text-zinc-500">{stat.title}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-4">

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Recent Applications</h3>
            <Link href="#" className="text-xs text-zinc-400">
              View all
            </Link>
          </div>

          <Card className="bg-[#161618] border border-zinc-800/60 p-4 space-y-3">

            {recentApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg hover:bg-zinc-900/40"
              >

                {/* Left */}
                <div className="flex items-center gap-3 min-w-55">
                  <Avatar name={app.name} className="w-9 h-9 bg-zinc-700" />
                  <div>
                    <p className="text-sm font-semibold">{app.name}</p>
                    <p className="text-xs text-zinc-500">{app.role}</p>
                  </div>
                </div>

                {/* Middle info */}
                <div className="flex gap-6 text-xs text-zinc-400">
                  <span>{app.date}</span>
                  <span>{app.exp}</span>
                </div>

                {/* Status */}
                <Chip
                  size="sm"
                  variant="flat"
                  color={statusColorMap[app.status] || "default"}
                  className="w-fit"
                >
                  {app.status}
                </Chip>

              </div>
            ))}

          </Card>
        </div>

        {/* Companies */}
        <div className="space-y-4">

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">My Top Companies</h3>
            <Link href="#" className="text-xs text-zinc-400">
              View all
            </Link>
          </div>

          <Card className="bg-[#161618] border border-zinc-800/60 p-4 space-y-3">

            {topCompanies.map((company) => (
              <div
                key={company.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-900/40"
              >
                <div className="flex items-center gap-3">

                  <div className={`w-10 h-10 rounded-lg ${company.logoBg} flex items-center justify-center font-bold`}>
                    {company.name.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{company.name}</p>
                    <p className="text-xs text-zinc-500">{company.industry}</p>
                  </div>

                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold">{company.jobs}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">
                    Active Jobs
                  </p>
                </div>
              </div>
            ))}

          </Card>

          <Button fullWidth variant="bordered" className="mt-2">
            View All Companies
          </Button>

        </div>

      </div>

      <div className="fixed bottom-6 right-6">
        <Link
          href="/recruiter/jobs/new"
          aria-label="Create new job"
          className="btn w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <Plus size={24} />
        </Link>
      </div>

    </div>
  );
}