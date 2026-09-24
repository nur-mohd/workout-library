import Image from 'next/image';
import logo from '@/assets/logo.png';
const Logo = () => {
    return (
        <div>
            <div className="flex items-center gap-2">
                    <Image
                        src={logo}
                        alt="FITLOG logo"
                        width={22}
                        height={22}
                        className="object-contain"
                    />
                    <h1 className="text-md font-bold tracking-wide">
                        FITLOG
                    </h1>
                </div>
        </div>
    );
};

export default Logo;