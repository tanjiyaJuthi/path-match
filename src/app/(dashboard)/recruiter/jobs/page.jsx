"use client";

import { authClient } from "@/app/lib/auth-client";
import { Button, Chip, Table, Tooltip } from "@heroui/react";
import { Edit2, Eye, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCompanyJobs } from "../../../lib/api/jobs";

const RecruiterJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const companyId = "company_123";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data: tokenData } = await authClient.token();

        const res = await getCompanyJobs(companyId, tokenData, null);

        setJobs(res || []);
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [companyId]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Manage All Jobs</h2>
        <p className="text-sm text-default-500">
          View, update, and manage your current job postings.
        </p>
      </div>

      <Table
        aria-label="Company jobs management table"
        className="mt-5 rounded-lg"
      >
        <Table.ResizableContainer>
          <Table.Content className="min-w-200">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr">
                Job Title
              </Table.Column>
              <Table.Column defaultWidth="1.2fr">Type / Category</Table.Column>
              <Table.Column defaultWidth="1fr">Location</Table.Column>
              <Table.Column defaultWidth="1fr">Status</Table.Column>
              <Table.Column defaultWidth="1.2fr">Actions</Table.Column>
            </Table.Header>

            <Table.Body
              className="rounded-lg"
              emptyContent={
                loading ? "Loading jobs..." : "No jobs found for this company."
              }
            >
              {jobs.map((job) => (
                <Table.Row key={job._id}>
                  <Table.Cell>
                    <div className="font-medium text-default-800">
                      {job.jobTitle}
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm capitalize font-medium">
                        {job.jobType}
                      </span>
                      <span className="text-xs text-default-400 capitalize">
                        {job.jobCategory}
                      </span>
                    </div>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="text-sm text-default-600">
                      {job.isRemote ? "Remote" : job.location}
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Chip
                      color={getStatusColor(job.status)}
                      size="sm"
                      variant="soft"
                      className="capitalize"
                    >
                      {job.status || "Unknown"}
                    </Chip>
                  </Table.Cell>

                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Tooltip content="View Job">
                        <Button isIconOnly size="sm" variant="light">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Edit Job">
                        <Button isIconOnly size="sm" variant="light">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </Tooltip>

                      <Tooltip content="Delete Job">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>

      <div className="fixed bottom-6 right-6">
        <Link
          href="/recruiter/jobs/new"
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <Plus size={24} />
        </Link>
      </div>
    </div>
  );
};

export default RecruiterJobsPage;
