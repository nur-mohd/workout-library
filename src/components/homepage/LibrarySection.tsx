import { IApi } from "@/types/apiType";

const getLibraryData = async () => {
     const res = await fetch("https://api.abcz.workers.dev/api/fitlog", { cache: "force-cache" });
    const data = await res.json();
    return data;

}


const LibrarySection = async() => {
   const data = await getLibraryData();
    console.log(data);
    return (
        <div>
            <div>
                <h1 className="text-4xl text-white font-semibold">THE LIBRARY</h1>
                <p className="text-[#9CA3AF]">Twelve lifts covering every major muscle group.</p>
            </div>

            {/* data display via card */}
            {
            data.map((item:IApi, ind:number) => {
                return (
                   <div key={ind}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                   </div>
                );
            })}

        </div>
    );
};

export default LibrarySection;