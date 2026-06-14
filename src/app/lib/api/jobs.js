const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, tokenData, status = null) => {
  let url = `${baseUrl}/api/jobs?companyId=${companyId}`;
  if (status) url += `&status=${status}`;

  const res = await fetch(url, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData?.token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch jobs");

  const { data } = await res.json();
  return data;
};