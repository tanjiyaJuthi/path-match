'use client';

import React, { useState } from 'react';
import {
  Form,
  Fieldset,
  Input,
  Select,
  TextArea,
  Switch,
  Button,
  Card,
  FieldError,
  Label,
  ListBox
} from "@heroui/react";

export default function NewJobsPage() {

  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    jobTitle: "",
    category: "",
    jobType: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    city: "",
    country: "",
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: ""
  });

  const update = (k, v) =>
    setForm((p) => ({ ...p, [k]: v }));

  const jobCategories = [
    { key: "tech", label: "Technology & Software" },
    { key: "design", label: "Design & Creative" },
    { key: "marketing", label: "Marketing" },
  ];

  const jobTypes = [
    { key: "full-time", label: "Full-time" },
    { key: "part-time", label: "Part-time" },
    { key: "remote", label: "Remote" },
    { key: "internship", label: "Internship" }
  ];

  const currencies = [
    { key: "USD", label: "USD ($)" },
    { key: "EUR", label: "EUR (€)" },
    { key: "BDT", label: "BDT (৳)" }
  ];

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      isRemote,
      location: isRemote ? "Remote" : `${form.city}, ${form.country}`,
      status: "active"
    };

    console.log(payload);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-zinc-100 p-6 md:p-10">

      <div className="max-w-4xl mx-auto space-y-6">

        <header>
          <h1 className="text-3xl font-semibold">Post a Job</h1>
          <p className="text-sm text-zinc-500">
            Create a job posting visible to candidates
          </p>
        </header>

        <Card className="bg-[#161618] border border-zinc-800/60 p-6">

          <Form onSubmit={submit} className="space-y-8">

            {/* ================= JOB INFO ================= */}
            <Fieldset label="Job Info" className="space-y-6">
                {/* JOB TITLE */}
                <div>
                    <Label>Job Title</Label>
                    <Input
                    placeholder="e.g. Senior Frontend Engineer"
                    value={form.jobTitle}
                    onChange={(e) => update("jobTitle", e.target.value)}
                    className="w-full"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* CATEGORY */}
                    <div>
                        <Label>Job Category</Label>
                        <Select>
                            <Select.Trigger>
                                <Select.Value placeholder="Select a category" />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                {jobCategories.map((c) => (
                                    <ListBox.Item
                                    key={c.key}
                                    id={c.key}
                                    textValue={c.label}
                                    onAction={() => update("category", c.key)}
                                    >
                                    {c.label}
                                    <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    {/* TYPE */}
                    <div>
                        <Label>Job Type</Label>
                        <Select>
                            <Select.Trigger>
                                <Select.Value placeholder="Select job type" />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover>
                                <ListBox>
                                {jobTypes.map((t) => (
                                    <ListBox.Item
                                    key={t.key}
                                    id={t.key}
                                    textValue={t.label}
                                    onAction={() => update("jobType", t.key)}
                                    >
                                    {t.label}
                                    <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Minimum Salary</Label>
                        <Input
                        type="number"
                        placeholder="50000"
                        value={form.salaryMin}
                        onChange={(e) => update("salaryMin", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Maximum Salary</Label>
                        <Input
                        type="number"
                        placeholder="120000"
                        value={form.salaryMax}
                        onChange={(e) => update("salaryMax", e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Currency</Label>

                        <Select>
                        <Select.Trigger>
                            <Select.Value placeholder="Select currency" />
                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                            {currencies.map((c) => (
                                <ListBox.Item
                                key={c.key}
                                id={c.key}
                                textValue={c.label}
                                onAction={() => update("currency", c.key)}
                                >
                                {c.label}
                                <ListBox.ItemIndicator />
                                </ListBox.Item>
                            ))}
                            </ListBox>
                        </Select.Popover>
                        </Select>
                    </div>
                </div>

                {/* Remote Toggle */}
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <label className="text-sm font-medium">Remote Job</label>
                            <p className="mt-1 text-xs text-zinc-500">
                                Candidates can work from anywhere.
                            </p>
                        </div>

                        <Switch isSelected={isRemote} onChange={setIsRemote}>
                            <Switch.Control>
                                <Switch.Thumb />
                            </Switch.Control>

                            <Switch.Content>
                                <Label className="text-sm">Remote</Label>
                            </Switch.Content>
                        </Switch>

                    </div>
                </div>

                {/* Location */}
                {!isRemote && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                        <Label>City</Label>
                        <Input
                            placeholder="e.g. Dhaka"
                            value={form.city}
                            onChange={(e) => update("city", e.target.value)}
                        />
                        </div>

                        <div className="flex flex-col gap-2">
                        <Label>Country</Label>
                        <Input
                            placeholder="e.g. Bangladesh"
                            value={form.country}
                            onChange={(e) => update("country", e.target.value)}
                        />
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <Label>Application Deadline</Label>

                    <Input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => update("deadline", e.target.value)}
                    />
                </div>
            </Fieldset>

            {/* ================= DESCRIPTION ================= */}
            <Fieldset label="Job Description" className="space-y-6">
                <div className="flex flex-col gap-2">
                    <Label>Responsibilities</Label>

                    <TextArea
                        placeholder="Describe day-to-day responsibilities, key tasks, team collaboration, ownership areas, and expected outcomes..."
                        value={form.responsibilities}
                        onChange={(e) => update("responsibilities", e.target.value)}
                        minrows={5}
                        className="w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Requirements</Label>

                    <TextArea
                        placeholder="List required skills, technologies, years of experience, qualifications, certifications, and other prerequisites..."
                        value={form.requirements}
                        onChange={(e) => update("requirements", e.target.value)}
                        minrows={5}
                        className="w-full"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Benefits (Optional)</Label>

                    <TextArea
                        placeholder="Health insurance, annual bonuses, flexible working hours, remote work allowance, learning budget, paid leave, etc."
                        value={form.benefits}
                        onChange={(e) => update("benefits", e.target.value)}
                        minrows={4}
                        className="w-full"
                    />
                </div>

                </Fieldset>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button type="submit" className="rounded-lg bg-white text-black px-6">
                Publish Job
              </Button>
            </div>

          </Form>

        </Card>
      </div>
    </div>
  );
}