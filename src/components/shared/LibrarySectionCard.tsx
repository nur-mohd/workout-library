import Image from "next/image";
import { IApi } from "@/types/apiType";
import Link from "next/link";



interface ILibraryCardProps {
  item: IApi;
}

const LibrarySectionCard = ({item}: ILibraryCardProps) => {
  return (
    <Link href={`/library/${item.id}`}>
      <div className="cursor-pointer hover:border-[#C2F800] border rounded-lg overflow-hidden bg-[#1A1C21] text-white transition-all duration-300 hover:shadow-lg">
      
      {/* Image */}
      <figure className="h-44 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          width={300}
          height={500}
          className="w-full h-full object-cover object-[center_20%]"
        />
      </figure>

      {/* Content */}
      <div className="p-3">

        {/* Muscle Groups */}
        <div className="flex flex-wrap gap-1 mb-2">
          {item.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="bg-[#C2F800] text-[#000000] text-[12px] font-medium px-2 py-1 rounded-xl"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <h2 className="text-lg font-bold uppercase leading-tight line-clamp-1">
          {item.name}
        </h2>

        {/* Equipment */}
        <p className="text-[15px] text-base-content/60 mt-1">
          {item.equipment}
        </p>

        {/* Workout Stats */}
        <div className="flex items-center gap-3 mt-3 text-[15px] text-base-content/70">

          <div className="flex items-center gap-1">
            <span className="text-[#C2F800]" aria-hidden="true">◷</span>
            <span>{item.duration} min</span>
          </div>

          <div className="flex items-center gap-1">
            <span 
                className="text-[#C2F800]" aria-hidden="true">♨</span>
            <span>{item.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1">
            <span aria-hidden="true" className="text-[11px] text-[#C2F800]">★</span>
            <span>{item.rating}</span>
          </div>

        </div>
      </div>
      </div>
    </Link>
  );
};

export default LibrarySectionCard;