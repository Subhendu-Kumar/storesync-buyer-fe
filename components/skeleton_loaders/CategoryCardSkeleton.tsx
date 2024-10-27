import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CategoryCardSkeleton = () => {
  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 mb-2" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-60 rounded-lg overflow-hidden bg-gray-200 border">
          <Skeleton className="w-full h-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardFooter>
    </Card>
  );
};

export default CategoryCardSkeleton;
