import { deleteMessage } from "@/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function CreateMessage() {
  return (
    <Link
      href="/dashboard/message/create"
      className="flex h-10 items-center rounded-lg bg-primary-color px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color"
    >
      <span className="hidden md:block">Create Message</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateMessage({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/message/${id}/edit`}
      className="rounded-md border p-2 shadow hover:border-primary-color/50 hover:bg-primary-color/10 hover:text-primary-color hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-color"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteMessage({ id }: { id: string }) {
  const deleteMessageId = deleteMessage.bind(null, id);

  return (
    <form action={deleteMessageId}>
      <button
        type="submit"
        className="cursor-pointer rounded-md border p-2 shadow hover:border-destructive/50 hover:bg-destructive-foreground hover:text-destructive hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
