import { Skeleton } from "@/components/ui/skeleton";

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      // className="relative animate-pulse overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm"
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <DataChartSkeleton /> */}
        {/* <DataCategoriesChartSkeleton /> */}
      </div>
    </>
  );
}

export function TableRowNewsSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* Icon */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-6 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Title */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-32 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Content */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Show until */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Status */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>

      {/* Actions */}
      <td className="py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-[38px] w-[38px] rounded bg-gray-100"></Skeleton>
          <Skeleton className="h-[38px] w-[38px] rounded bg-gray-100"></Skeleton>
        </div>
      </td>
    </tr>
  );
}

export function TableRowScrapperSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      {/* URL */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-32 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Title */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-32 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Data */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Format */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>
      {/* Date */}
      <td className="px-3 py-3 whitespace-nowrap">
        <Skeleton className="h-6 w-16 rounded bg-gray-100"></Skeleton>
      </td>

      {/* Actions */}
      <td className="py-3 pr-3 pl-6 whitespace-nowrap">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-[38px] w-[38px] rounded bg-gray-100"></Skeleton>
          <Skeleton className="h-[38px] w-[38px] rounded bg-gray-100"></Skeleton>
        </div>
      </td>
    </tr>
  );
}

export function MobileSkeleton() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-8">
        <div className="flex items-center">
          <div className="mr-2 h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </div>
        <div className="h-6 w-16 rounded bg-gray-100"></div>
      </div>
      <div className="flex w-full items-center justify-between pt-4">
        <div>
          <div className="h-6 w-16 rounded bg-gray-100"></div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-100"></div>
        </div>
        <div className="flex justify-end gap-2">
          <div className="h-10 w-10 rounded bg-gray-100"></div>
          <div className="h-10 w-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  );
}

export function ScraperTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  URL
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Format
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th
                  scope="col"
                  className="relative pt-2 pr-6 pb-4 pl-3 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowScrapperSkeleton />
              <TableRowScrapperSkeleton />
              <TableRowScrapperSkeleton />
              <TableRowScrapperSkeleton />
              <TableRowScrapperSkeleton />
              <TableRowScrapperSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function NewsTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Icon
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Show until
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pt-2 pr-6 pb-4 pl-3 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function SocialMediaTableSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
            <MobileSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  URL
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Platform
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Show until
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th
                  scope="col"
                  className="relative pt-2 pr-6 pb-4 pl-3 sm:pr-6"
                >
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
              <TableRowNewsSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
