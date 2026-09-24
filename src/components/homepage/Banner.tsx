import Image from "next/image";
import bannerImg from "@/assets/banner.png";

const Banner = () => {
    return (
        <section className="container mx-auto px-4">
            <div className="flex min-h-[240px] items-center justify-between rounded-xl border border-[#22252C] bg-[#15171D] px-8 py-8 text-white md:px-10">

                <div className="max-w-[520px]">
                    <h4 className="text-[14px] font-bold text-[#C2F800]">
                        WORKOUT LIBRARY
                    </h4>

                    <h1 className="mt-3 text-4xl">
                        TRAIN WITH INTENT. LOG <br /> EVERY SET.
                    </h1>

                    <p className="mt-4 max-w-[420px] text-left text-[14px] text-[#8F939D]">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
                        into today&apos;s plan, and watch the week&apos;s work add up.
                    </p>

                    <button className="mt-5 rounded-md bg-[#C2F800] px-4 py-2 text-[11px] font-bold text-black transition hover:bg-[#b4e800]">
                        BROWSE WORKOUTS
                    </button>
                </div>

                <div className="hidden md:block">
                    <Image
                        src={bannerImg}
                        alt="Workout"
                        width={220}
                        height={220}
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Banner;