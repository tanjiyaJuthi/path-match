"use client";

import {
  Button,
  Card,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  Switch,
  TextArea,
  TextField,
} from "@heroui/react";
import { useState } from "react";

export default function NewJobsPage() {
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
    benefits: "",
  });

  const updateError = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const jobCategories = [
    { key: "tech", label: "Technology & Software" },
    { key: "design", label: "Design & Creative" },
    { key: "marketing", label: "Marketing" },
  ];

  const jobTypes = [
    { key: "full-time", label: "Full-time" },
    { key: "part-time", label: "Part-time" },
    { key: "remote", label: "Remote" },
    { key: "internship", label: "Internship" },
  ];

  const currencies = [
    { key: "USD", label: "USD ($)" },
    { key: "EUR", label: "EUR (€)" },
    { key: "BDT", label: "BDT (৳)" },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.jobType) newErrors.jobType = "Job type is required";
    if (!form.currency) newErrors.currency = "Currency is required";

    if (!form.salaryMin) newErrors.salaryMin = "Minimum salary is required";
    if (!form.salaryMax) newErrors.salaryMax = "Maximum salary is required";

    if (!isRemote) {
      if (!form.city.trim()) newErrors.city = "City is required";
      if (!form.country.trim()) newErrors.country = "Country is required";
    }

    if (!form.deadline) newErrors.deadline = "Deadline is required";

    if (!form.responsibilities.trim()) {
      newErrors.responsibilities = "Responsibilities are required";
    }

    if (!form.requirements.trim()) {
      newErrors.requirements = "Requirements are required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!validateForm()) return;

    const payload = {
      ...form,
      isRemote,
      location: isRemote ? "Remote" : `${form.city}, ${form.country}`,
      status: "active",
    };

    console.log(payload);

    // API call here
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
          <Form
            validationBehavior="aria"
            onSubmit={submit}
            className="space-y-8"
          >
            {/* ================= JOB INFO ================= */}
            <Fieldset aria-label="Job Info" className="space-y-6">
              {/* JOB TITLE */}
              <TextField
                name="jobTitle"
                isRequired
                isInvalid={!!errors.jobTitle}
              >
                <Label>Job Title</Label>
                <Input
                  placeholder="e.g. Senior Frontend Engineer"
                  value={form.jobTitle}
                  onChange={(e) => updateError("jobTitle", e.target.value)}
                  className="w-full"
                />

                <FieldError>{errors.jobTitle}</FieldError>
              </TextField>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* CATEGORY */}
                <div>
                  <Select
                    isInvalid={!!errors.category}
                    isRequired
                    aria-label="Job Category"
                    placeholder="Select job Category"
                    value={form.category}
                    onChange={(value) => updateError("category", value)}
                  >
                    <Label>Job Category</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {jobCategories.map((cat) => (
                          <ListBox.Item
                            key={cat.key}
                            id={cat.key}
                            textValue={cat.label}
                          >
                            {cat.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {errors.category && (
                    <FieldError>{errors.category}</FieldError>
                  )}
                </div>

                {/* TYPE */}
                <div>
                  <Select
                    isInvalid={!!errors.jobType}
                    isRequired
                    aria-label="Job Type"
                    placeholder="Select job type"
                    value={form.jobType || null}
                    onChange={(value) => updateError("jobType", value)}
                  >
                    <Label>Job Type</Label>

                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {jobTypes.map((t) => (
                          <ListBox.Item
                            key={t.key}
                            id={t.key}
                            textValue={t.label}
                          >
                            {t.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {errors.jobType && <FieldError>{errors.jobType}</FieldError>}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <TextField
                  name="salaryMin"
                  type="number"
                  isRequired
                  className="flex flex-col gap-2"
                  isInvalid={!!errors.salaryMin}
                >
                  <Label>Minimum Salary</Label>
                  <Input
                    aria-label="Minimum Salary"
                    type="number"
                    placeholder="50000"
                    value={form.salaryMin}
                    onChange={(e) => updateError("salaryMin", e.target.value)}
                  />

                  <FieldError>{errors.salaryMin}</FieldError>
                </TextField>

                <TextField
                  name="salaryMax"
                  type="number"
                  isRequired
                  className="flex flex-col gap-2"
                  isInvalid={!!errors.salaryMax}
                >
                  <Label>Maximum Salary</Label>
                  <Input
                    placeholder="120000"
                    value={form.salaryMax}
                    onChange={(e) => updateError("salaryMax", e.target.value)}
                  />

                  <FieldError>{errors.salaryMax}</FieldError>
                </TextField>

                <div className="flex flex-col gap-2">
                  <Select
                    isInvalid={!!errors.currency}
                    aria-label="Currency"
                    placeholder="Select currency"
                    name="currency"
                  >
                    <Label>Currency</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {currencies.map((c) => (
                          <ListBox.Item
                            key={c.key}
                            id={c.key}
                            textValue={c.label}
                          >
                            {c.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>

                  {errors.currency && (
                    <FieldError>{errors.currency}</FieldError>
                  )}
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

                  <Switch
                    isSelected={isRemote}
                    onChange={(checked) => setIsRemote(checked)}
                  >
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
                  <TextField
                    name="city"
                    className="flex flex-col gap-2"
                    isRequired={!isRemote}
                    isInvalid={!!errors.city}
                  >
                    <Label>City</Label>
                    <Input
                      placeholder="e.g. Dhaka"
                      value={form.city}
                      onChange={(e) => updateError("city", e.target.value)}
                    />

                    <FieldError>{errors.city}</FieldError>
                  </TextField>

                  <TextField
                    name="country"
                    isRequired={!isRemote}
                    className="flex flex-col gap-2"
                    isInvalid={!!errors.country}
                  >
                    <Label>Country</Label>
                    <Input
                      placeholder="e.g. Bangladesh"
                      value={form.country}
                      onChange={(e) => updateError("country", e.target.value)}
                    />
                    <FieldError>{errors.country}</FieldError>
                  </TextField>
                </div>
              )}

              <TextField
                isRequired
                name="deadline"
                type="date"
                className="flex flex-col gap-2"
                isInvalid={!!errors.deadline}
              >
                <Label>Application Deadline</Label>

                <Input
                  value={form.deadline}
                  onChange={(e) => updateError("deadline", e.target.value)}
                />

                <FieldError>{errors.deadline}</FieldError>
              </TextField>
            </Fieldset>

            {/* ================= DESCRIPTION ================= */}
            <Fieldset aria-label="Job Description" className="space-y-6">
              <TextField
                isRequired
                name="responsibilities"
                className="flex flex-col gap-2"
                isInvalid={!!errors.responsibilities}
              >
                <Label>Responsibilities</Label>

                <TextArea
                  placeholder="Describe day-to-day responsibilities, key tasks, team collaboration, ownership areas, and expected outcomes..."
                  value={form.responsibilities}
                  onChange={(e) =>
                    updateError("responsibilities", e.target.value)
                  }
                  minrows={5}
                  className="w-full"
                />

                <FieldError>{errors.responsibilities}</FieldError>
              </TextField>

              <TextField
                isRequired
                name="requirements"
                className="flex flex-col gap-2"
                isInvalid={!!errors.requirements}
              >
                <Label>Requirements</Label>

                <TextArea
                  placeholder="List required skills, technologies, years of experience, qualifications, certifications, and other prerequisites..."
                  value={form.requirements}
                  onChange={(e) => updateError("requirements", e.target.value)}
                  minrows={5}
                  className="w-full"
                />

                <FieldError>{errors.requirements}</FieldError>
              </TextField>

              <TextField name="benefits" className="flex flex-col gap-2">
                <Label>Benefits (Optional)</Label>

                <TextArea
                  placeholder="Health insurance, annual bonuses, flexible working hours, remote work allowance, learning budget, paid leave, etc."
                  value={form.benefits}
                  onChange={(e) => updateError("benefits", e.target.value)}
                  minrows={4}
                  className="w-full"
                />
              </TextField>
            </Fieldset>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="rounded-lg bg-white text-black px-6"
              >
                Publish Job
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
