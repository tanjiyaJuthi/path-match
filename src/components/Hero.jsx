import {
  Briefcase,
  MapPin,
  Search,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-28 text-center">
            <div className="mb-10 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md">
                <Briefcase size={16} className="text-orange-400" />
                
                <span className="font-semibold">50,000+</span>
                
                <span className="uppercase tracking-[0.25em] text-gray-400">
                    New Jobs This Month
                </span>
            </div>

            <h1 className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
                Find Your Dream Job Today
            </h1>

            <p className="mt-6 max-w-3xl text-lg text-gray-400">
                HireLoop connects top talent with world-class companies.
                Browse thousands of curated opportunities and land your next
                role — faster.
            </p>

            <div className="mt-14 flex w-full max-w-4xl items-center rounded-2xl border border-white/10 p-2">
                <div className="flex flex-1 items-center gap-3 px-4">
                    <Search size={20} className="text-gray-400" />
                    
                    <input
                        type="text"
                        placeholder="Job title, skill or company"
                        className="w-full bg-transparent outline-none placeholder:text-gray-500"
                    />
                </div>

                <div className="flex flex-1 items-center gap-3 px-4">
                    <MapPin size={20} className="text-gray-400" />
                    
                    <input
                        type="text"
                        placeholder="Location or Remote"
                        className="w-full bg-transparent outline-none placeholder:text-gray-500"
                    />
                </div>

                <button className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#6D5DFC] transition hover:scale-105">
                    <Search size={20} />
                </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
                <span className="text-gray-400">Trending Position</span>

                {[
                    "Product Designer",
                    "AI Engineering",
                    "Dev-ops Engineer",
                ].map((item) => (
                    <button
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-gray-200 backdrop-blur-md transition hover:bg-white/10"
                    >
                    {item}
                    </button>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Hero;