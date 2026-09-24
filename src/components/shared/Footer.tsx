
import Logo from "@/lib/Logo";


const FooterPage = () => {
    return (
        <footer 
        className="w-full border-b border-[#1A1C21] bg-[#0D0F12] text-white py-7">
            <div className="container mx-auto flex items-center justify-between py-4">
                <Logo />
                <p> &copy; 2026 FitLog — Workout Library. Train hard, log honest.</p>
             </div>
        </footer>
    );
};

export default FooterPage;