import { Skeleton } from './ui/skeleton';

const MessageAreaSkeleton = () => {
  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden">
      <div className="bg-muted/20 flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-4xl space-y-4">
          {/* Received Message */}
          <div className="flex justify-start">
            <div className="flex max-w-[70%] flex-col items-start space-y-1">
              <Skeleton className="h-20 w-64 rounded-2xl" />
              <Skeleton className="ml-3 h-3 w-16" />
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex justify-end">
            <div className="flex max-w-[70%] flex-col items-end space-y-1">
              <Skeleton className="h-16 w-48 rounded-2xl" />
              <Skeleton className="mr-3 h-3 w-16" />
            </div>
          </div>

          {/* Received Message */}
          <div className="flex justify-start">
            <div className="flex max-w-[70%] flex-col items-start space-y-1">
              <Skeleton className="h-24 w-72 rounded-2xl" />
              <Skeleton className="ml-3 h-3 w-16" />
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex justify-end">
            <div className="flex max-w-[70%] flex-col items-end space-y-1">
              <Skeleton className="h-20 w-56 rounded-2xl" />
              <Skeleton className="mr-3 h-3 w-16" />
            </div>
          </div>

          {/* Received Message */}
          <div className="flex justify-start">
            <div className="flex max-w-[70%] flex-col items-start space-y-1">
              <Skeleton className="h-16 w-60 rounded-2xl" />
              <Skeleton className="ml-3 h-3 w-16" />
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex justify-end">
            <div className="flex max-w-[70%] flex-col items-end space-y-1">
              <Skeleton className="h-28 w-80 rounded-2xl" />
              <Skeleton className="mr-3 h-3 w-16" />
            </div>
          </div>

          {/* Received Message */}
          <div className="flex justify-start">
            <div className="flex max-w-[70%] flex-col items-start space-y-1">
              <Skeleton className="h-20 w-52 rounded-2xl" />
              <Skeleton className="ml-3 h-3 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageAreaSkeleton;
