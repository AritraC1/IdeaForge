export default function IdeaSkeleton() {
  return (
    <div className="w-full max-w-2xl mt-10 animate-pulse">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-10 shadow-sm">
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded mb-2" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded mb-6" />

        <div className="grid grid-cols-2 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
          ))}
        </div>

        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
