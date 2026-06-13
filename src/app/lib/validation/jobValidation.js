export const jobValidation = (form, isRemote) => {
  const errors = {};

  if (!form.jobTitle?.trim()) {
    errors.jobTitle = "Job title is required";
  }

  if (!form.category) {
    errors.category = "Category is required";
  }

  if (!form.jobType) {
    errors.jobType = "Job type is required";
  }

  if (!form.currency) {
    errors.currency = "Currency is required";
  }

  if (!form.salaryMin) {
    errors.salaryMin = "Minimum salary is required";
  }

  if (!form.salaryMax) {
    errors.salaryMax = "Maximum salary is required";
  }

  if (!isRemote) {
    if (!form.city?.trim()) {
      errors.city = "City is required";
    }

    if (!form.country?.trim()) {
      errors.country = "Country is required";
    }
  }

  if (!form.deadline) {
    errors.deadline = "Deadline is required";
  }

  if (!form.responsibilities?.trim()) {
    errors.responsibilities = "Responsibilities are required";
  }

  if (!form.requirements?.trim()) {
    errors.requirements = "Requirements are required";
  }

  return errors;
}