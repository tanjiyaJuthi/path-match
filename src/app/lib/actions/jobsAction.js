'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createJob = async (newJobData, tokenData) => {
    try {
        const res = await fetch(`${baseUrl}/api/job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(newJobData),
        });

        const data = await res.json();

        return res.ok
            ? { success: true, data }
            : {
                success: false,
                message: data?.message || 'Failed to create job',
                errors: data?.missingFields || null,
            };
    } catch (error) {
        console.error("CRITICAL SERVER ACTION ERROR:", error);

        return {
            success: false,
            message: 'Network error',
        };
    }
};