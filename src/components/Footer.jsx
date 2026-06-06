import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-20 text-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-0 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left">
                    <div>
                        <Link href="/">
                            PathMatch
                        </Link>

                        <p className="mt-6 text-gray-400 leading-8 w-full md:max-w-xs">
                        The AI-native career platform. Built for people who take their
                        work seriously.
                        </p>
                    </div>
                </div>

                <div className="flex gap-10 items-center justify-between">
                    <div>
                    <h3 className="text-lg font-medium text-indigo-400 mb-6">
                        Product
                    </h3>

                    <ul className="space-y-4 text-gray-400">
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Job discovery
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Worker AI
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Companies
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Salary data
                        </Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-medium text-indigo-400 mb-6">
                        Navigations
                    </h3>

                    <ul className="space-y-4 text-gray-400">
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Help center
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Career library
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Contact
                        </Link>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <h3 className="text-lg font-medium text-indigo-400 mb-6">
                        Resources
                    </h3>

                    <ul className="space-y-4 text-gray-400">
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Brand Guideline
                        </Link>
                        </li>
                        <li>
                        <Link href="#" className="hover:text-white transition">
                            Newsroom
                        </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>

            <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center justify-between gap-4 text-gray-500 text-sm">
                <div className="flex items-center gap-3">
                    <Link
                        href="#"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-indigo-700 transition"
                    >
                        <FaFacebookF size={18} />
                    </Link>

                    <Link
                        href="#"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-indigo-700 transition"
                    >
                        <FaPinterestP size={18} />
                    </Link>

                    <Link
                        href="#"
                        className="w-11 h-11 flex items-center justify-center rounded-lg bg-zinc-900 hover:bg-indigo-700 transition"
                    >
                    <FaLinkedinIn size={18} />
                    </Link>
                </div>
                
                <div className="flex items-center gap-5 justify-between">
                    <p>Copyright 2024 – hireloop</p>

                    <div className="flex items-center">
                        <Link href="#" className="hover:text-white transition">
                            Terms & Policy
                        </Link>
                        -
                        <Link href="#" className="hover:text-white transition">
                            Privacy Guideline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
