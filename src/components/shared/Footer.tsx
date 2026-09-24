
import Logo from "@/lib/Logo";


const FooterPage = () => {
    return (
        <footer className="container mx-auto ">
            <div className="flex items-center justify-between py-4">
                <Logo />
                <p> &copy; 2026 FitLog — Workout Library. Train hard, log honest.</p>
             </div>
        </footer>
    );
};

export default FooterPage;