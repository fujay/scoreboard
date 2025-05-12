import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function NewsStatus({ showDate }: { showDate: string }) {
  const newsDate = new Date(showDate);
  const currentDate = new Date();
  const active = showDate === null || newsDate > currentDate;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${active ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}
    >
      {active ? (
        <>
          Active
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : (
        <>
          Expired
          <XMarkIcon className="ml-1 w-4 text-gray-500" />
        </>
      )}
    </span>
  );
}
