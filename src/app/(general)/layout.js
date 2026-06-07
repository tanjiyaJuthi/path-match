import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function GeneralLayout({ children }) {
  return (
    <div>
      <Navbar />
        {children}
      <Footer />
    </div>
  );
}
