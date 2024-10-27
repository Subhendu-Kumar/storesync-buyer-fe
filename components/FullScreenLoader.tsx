import { Skeleton } from "@/components/ui/skeleton";

const FullScreenLoader = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Skeleton className="w-full h-[4.5rem] rounded bg-zinc-200" />
      <div className="flex-1 flex flex-col gap-6 p-6 bg-white">
        <Skeleton className="w-3/4 h-10 rounded bg-zinc-200" />
        <Skeleton className="w-full h-64 rounded bg-zinc-200" />
        <Skeleton className="w-full h-64 rounded bg-zinc-200" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
