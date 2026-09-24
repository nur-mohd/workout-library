import { IApi } from "@/types/apiType";
import LibrarySectionCard from "../shared/LibrarySectionCard";

const getLibraryData = async () => {
     const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "force-cache" });
    const data = await res.json();
    return data;

}


const LibrarySection = async() => {
   const data = await getLibraryData();
    console.log(data);
    return (
        <div className="container mx-auto px-4 py-8">
            <div>
                <h1 className="text-4xl text-white font-semibold">THE LIBRARY</h1>
                <p className="text-[#9CA3AF]">Twelve lifts covering every major muscle group.</p>
            </div>

            {/* data display via card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-5">
                {data.map((item:IApi, ind:number) => {
                return (
                         <div key={ind}>
                            <LibrarySectionCard item={item} />
                   </div>
                );
            })}
            </div>

        </div>
    );
};

export default LibrarySection;