import { Plus } from "lucide-react";
import Link from "next/link";

const RecruiterJobsPage = () => {
    return (
        <div>
            
            
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
};

export default RecruiterJobsPage;