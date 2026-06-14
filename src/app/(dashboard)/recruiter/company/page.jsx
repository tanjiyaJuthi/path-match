import { getRecruiterCompany } from "@/app/lib/api/companies";
import CompanyProfile from "@/app/lib/client/CompanyProfile";
import { getUserSession } from "../../../lib/core/session";

const RecruiterCompanyPage = async () => {
    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);

    return (
        <div>
            <CompanyProfile recruiter={user} recruiterCompany={company}></CompanyProfile>
        </div>
    );
};

export default RecruiterCompanyPage;