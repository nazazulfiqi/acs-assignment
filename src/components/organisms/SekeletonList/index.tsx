import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonList() {
  return (
    <div className='mx-auto flex flex-col space-y-3 '>
      <Skeleton className='h-[125px] w-[250px] rounded-xl' />
    </div>
  );
}
