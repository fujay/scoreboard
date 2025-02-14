import { deleteScraper } from "@/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateScraper() {
  return (
    <Link
      href="/dashboard/scraper/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Scraper</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateScraper({ index }: { index: number }) {
  return (
    <Link
      href={`/dashboard/scraper/${index}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteScraper({ index }: { index: number }) {
  const deleteScraperWithId = deleteScraper.bind(null, index);

  return (
    <form action={deleteScraperWithId}>
      <button
        type="submit"
        className="cursor-pointer rounded-md border p-2 hover:text-red-500 hover:bg-gray-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
