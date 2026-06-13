"use client";

import { createJob } from "@/app/lib/actions/jobsAction";
import { authClient } from "@/app/lib/auth-client";
import { jobValidation } from "@/app/lib/validation/jobValidation";
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
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewJobsPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isRemote, setIsRemote] = useState(false);
  const [errors, setErrors] = useState({});

  const [mockCompany] = useState({
        name: "Acme Corp (Auto-filled)",
        id: "company_123",
        isApproved: true,
    });

  const jobCategories = [
    { key: "tech", label: "Technology & Software" },
    { key: "design", label: "Design & Creative" },
    { key: "marketing", label: "Marketing" },
  ];

  const jobTypes = [
    { key: "full-time", label: "Full-time" },
    { key: "part-time", label: "Part-time" },
    { key: "internship", label: "Internship" },
  ];

  const currencies = [
    { key: "USD", label: "USD ($)" },
    { key: "EUR", label: "EUR (€)" },
    { key: "BDT", label: "BDT (৳)" },
  ];

  const submit = async (e) => {
    e.preventDefault();

    if (!mockCompany.isApproved) {
      alert("Your company profile must be approved before you can post jobs.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const formValues = Object.fromEntries(formData.entries());

    const newErrors = jobValidation(formValues, isRemote);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setIsPending(true);

    const payload = {
      ...formValues,
      isRemote,
      location: isRemote
        ? "Remote"
        : `${formValues.city}, ${formValues.country}`,
      status: "active",
      companyId: mockCompany.id,
    };

    try {
      const { data: tokenData } = await authClient.token();

      const res = await createJob(payload, tokenData);

      if (res?.success) {
        toast.success("Job Posted Successfully!");

        setIsRemote(false);
        setErrors({});

        setTimeout(() => {
          router.replace("/recruiter/jobs");
          router.refresh();
        }, 0);
      } else {
        toast.warning("Job Posted Failed!");
      }
    } catch (err) {
      toast.warning("Something went wrong while posting job");
      console.error(err);
    } finally {
      setIsPending(false);
    }
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
                  className="w-full"
                />
                {errors.jobTitle && <FieldError className="text-xs text-danger mt-1">{errors.jobTitle}</FieldError>}
              </TextField>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {/* CATEGORY */}
                <div>
                  <Select
                    isInvalid={!!errors.category}
                    isRequired
                    name="category"
                    placeholder="Select job Category"
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
                  {errors.category && <FieldError>{errors.category}</FieldError>}
                </div>

                {/* TYPE */}
                <div>
                  <Select
                    isInvalid={!!errors.jobType}
                    isRequired
                    name="jobType"
                    placeholder="Select job type"
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
                {/* MIN SALARY */}
                <TextField
                  name="salaryMin"
                  isRequired
                  className="flex flex-col gap-2"
                  isInvalid={!!errors.salaryMin}
                >
                  <Label>Minimum Salary</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                  />
                  {errors.salaryMin && <FieldError>{errors.salaryMin}</FieldError>}
                </TextField>

                {/* MAX SALARY */}
                <TextField
                  name="salaryMax"
                  isRequired
                  className="flex flex-col gap-2"
                  isInvalid={!!errors.salaryMax}
                >
                  <Label>Maximum Salary</Label>
                  <Input
                    type="number"
                    placeholder="120000"
                  />
                  {errors.salaryMax && <FieldError>{errors.salaryMax}</FieldError>}
                </TextField>

                {/* CURRENCY */}
                <div className="flex flex-col gap-2">
                  <Select
                    isInvalid={!!errors.currency}
                    isRequired
                    name="currency"
                    placeholder="Select Currency"
                  >
                    <Label>Currency</Label>
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>

                    <Select.Popover>
                      <ListBox>
                        {currencies.map((cur) => (
                          <ListBox.Item
                            key={cur.key}
                            id={cur.key}
                            textValue={cur.label}
                          >
                            {cur.label}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                  </Select>
                  {errors.currency && <FieldError>{errors.currency}</FieldError>}
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

              {/* Location Fields */}
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
                    />
                    {errors.city && (<FieldError>{errors.city}</FieldError>)}
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
                    />
                    {errors.country && (<FieldError>{errors.country}</FieldError>)}
                  </TextField>
                </div>
              )}

              {/* DEADLINE */}
              <TextField
                isRequired
                name="deadline"
                className="flex flex-col gap-2"
                isInvalid={!!errors.deadline}
              >
                <Label>Application Deadline</Label>
                <Input
                  type="date"
                />
                {errors.deadline && (<FieldError>{errors.deadline}</FieldError>)}
              </TextField>
            </Fieldset>

            <Fieldset aria-label="Job Description" className="space-y-6">
              <TextField
                isRequired
                name="responsibilities"
                className="flex flex-col gap-2"
                isInvalid={!!errors.responsibilities}
              >
                <Label>Responsibilities</Label>
                <TextArea
                  placeholder="Describe day-to-day responsibilities..."
                  minrows={5}
                  className="w-full"
                />
                {errors.responsibilities && (<FieldError>{errors.responsibilities}</FieldError>)}
              </TextField>

              <TextField
                isRequired
                name="requirements"
                className="flex flex-col gap-2"
                isInvalid={!!errors.requirements}
              >
                <Label>Requirements</Label>
                <TextArea
                  placeholder="List required skills..."
                  minrows={5}
                  className="w-full"
                />
                {errors.requirements && (<FieldError>{errors.requirements}</FieldError>)}
              </TextField>

              <TextField name="benefits" className="flex flex-col gap-2">
                <Label>Benefits (Optional)</Label>
                <TextArea
                  placeholder="Health insurance, allowances, etc."
                  className="w-full"
                />
              </TextField>
            </Fieldset>

            {/* SUBMIT */}
            <div className="flex justify-end">
              <Button
                isDisabled={isPending}
                type="submit"
                className="rounded-lg bg-white text-black px-6"
              >
                {isPending ? "Publishing..." : "Publish Job"}
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}