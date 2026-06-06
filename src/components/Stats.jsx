'use client';
import { motion } from "motion/react"

const stats = [
    {
        icon: "work",
        value: "50K",
        label: "Active Jobs",
        color: "primary",
    },
    {
        icon: "corporate_fare",
        value: "12K",
        label: "Companies",
        color: "primary",
    },
    {
        icon: "person_search",
        value: "2M",
        label: "Job Seekers",
        color: "primary",
    },
    {
        icon: "star",
        value: "97%",
        label: "Satisfaction Rate",
        color: "tertiary",
    },
];

const StatCard = ({ icon, value, label, color }) => {
    return (
        <div className="group relative p-8 rounded-3xl bg-black/90 border border-white/10 transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col gap-8 h-full">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        color === "primary"
                            ? "bg-primary/10 text-primary"
                            : "bg-tertiary/10 text-tertiary"
                    }`}
                >
                    <span
                        className="material-symbols-outlined"
                        data-icon={icon}
                    >
                        {icon}
                    </span>
                </div>

                <div>
                    <h3 className="font-display-lg text-display-lg-mobile md:text-[40px] text-white font-bold leading-tight mb-2 tracking-tight">
                        {value}
                    </h3>

                    <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    );
};

const Stats = () => {
    return (
        <section className="relative overflow-hidden py-28">
            <div
                className="absolute inset-0 bg-cover bg-center py-20"
                style={{
                    backgroundImage:"url(/images/globe.png)"
                }}
            />

            <div className="absolute left-1/2 top-[25%] h-100 w-100 -translate-x-1/2 rounded-ful bg-violet-600/30 blur-[140px]"  />

            <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
                <h2 className="text-4xl text-gray-300 mb-6">
                    Assisting over{" "}
                    <span className="text-white">15,000</span> job seekers
                    <br className="hidden md:block" />
                    find their dream positions.
                </h2>
                <motion.p animate={{rotate: -45}}>Remote Jobs</motion.p>
            </div>

            <div className="mt-20 relative z-10 w-full max-w-7xl px-container-margin mx-auto px-5 md:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {stats.map((stat) => (
                        <StatCard
                            key={stat.label}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            color={stat.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;