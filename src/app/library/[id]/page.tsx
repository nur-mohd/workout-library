import { IApi } from "@/types/apiType";
import Image from "next/image";

interface ICardDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getLibraryData = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "force-cache",
  });

  const data = await res.json();
  return data;
};

const CardDetailsPage = async ({ params }: ICardDetailsPageProps) => {
  const { id } = await params;

  const libraryData = await getLibraryData();

  const itemCard = libraryData.find(
    (item: IApi) => item.id === Number(id),
  ) as IApi;

  // If workout doesn't exist
  if (!itemCard) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Workout not found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0F12] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Main Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
          {/* ================= IMAGE ================= */}
          <div className="h-[400px] rounded-lg overflow-hidden">
            <Image
              src={itemCard.image}
              alt={itemCard.name}
              width={300}
              height={500}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* ================= DETAILS ================= */}
          <div>
            {/* Title */}
            <h1 className="text-3xl md:text-3xl font-bold uppercase tracking-tight">
              {itemCard.name}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-400 mt-2 max-w-2xl">
              {itemCard.description}
            </p>

            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2 mt-3">
              {itemCard.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-[#C2F800] text-black text-[15px] font-semibold px-3 py-1 rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* ================= INFO TABLE ================= */}
            <div className=" mt-4 border border-[#2A2D33] rounded-lg overflow-hidden bg-[#1A1C21]">
              {/* Equipment */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5">
                <span className="font-bold uppercase text-gray-300">
                  Equipment
                </span>
                <span className="text-gray-200">{itemCard.equipment}</span>
              </div>

              {/* Difficulty */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">
                  Difficulty
                </span>
                <span className="text-gray-200 text-[15px]">{itemCard.difficulty}</span>
              </div>

              {/* Sets */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">Sets</span>
                <span className="text-[15px]">{itemCard.sets}</span>
              </div>

              {/* Reps */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">Reps</span>
                <span className="text-[15px]">{itemCard.reps}</span>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">
                  Duration
                </span>
                <span className="text-[15px]">{itemCard.duration} min</span>
              </div>

              {/* Calories */}
              <div className="grid grid-cols-[130px_1fr] border-b border-[#2A2D33] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">
                  Calories
                </span>
                <span className="text-[15px]">{itemCard.caloriesBurned} kcal</span>
              </div>

              {/* Rating */}
              <div className="grid grid-cols-[130px_1fr] px-3 py-2.5 text-xs">
                <span className="font-bold uppercase text-gray-300">
                  Rating
                </span>
                <span className="text-[#C2F800] text-[15px]">★ {itemCard.rating}</span>
              </div>
            </div>

            {/* ================= INSTRUCTIONS ================= */}
            <div className="mt-5">
              <h2 className="text-lg font-bold uppercase mb-2">Instructions</h2>

              <ol className="space-y-1.5 text-[15px] text-gray-300 list-decimal list-inside">
                {itemCard.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>

            {/* ================= BUTTONS ================= */}
            <div className="flex flex-wrap gap-2 mt-5">
              <button className="bg-[#C2F800] text-black px-4 py-2 rounded-lg text-[15px] font-semibold hover:bg-[#d2ff35] transition">
                + Add to today&apos;s plan
              </button>

              <button className="border border-gray-500 px-4 py-2 rounded-lg text-[15px] hover:border-[#C2F800] transition">
                ☆ Save for later
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardDetailsPage;
