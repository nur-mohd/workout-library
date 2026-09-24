import Logo from "@/lib/Logo";

const Navbar = () => {
    return (
        <nav className="w-full border-b border-[#1A1C21] bg-[#0D0F12] text-white py-5">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">

            {/* Logo Added from lib folder */}
                <Logo />

                <div className="flex items-center gap-1 text-[14px]">
                    <button 
                        className="rounded-full bg-[#263500] px-3 py-1.5 font-medium text-[#C2F800] cursor-pointer">
                        Workouts
                    </button>

                    <button 
                        className="px-3 py-1.5 text-[#8B8D93] hover:text-white cursor-pointer">
                        My Plan
                    </button>
                </div>

                <div className="flex items-center gap-5 text-[10px]">
                    
                    <button 
                        className="flex items-center gap-2 text-[#B5B7BC] cursor-pointer">
                        <span>Plan</span>
                        <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#C2F800] text-[10px] font-bold text-black">
                            0
                        </span>
                    </button>

                    <button className="flex items-center gap-2 text-[#B5B7BC] cursor-pointer">
                        <span>Saved</span>
                        <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#44474F] text-[10px] text-[#8B8D93]">
                            0
                        </span>
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;