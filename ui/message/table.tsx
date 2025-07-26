import { fetchFilteredMessages } from "@/lib/data";
import { formatDateToLocal } from "@/lib/utils";
import NewsStatus from "@/ui/news/status";
import { CircleOff, InfinityIcon, QrCodeIcon } from "lucide-react";
import { DeleteMessage, UpdateMessage } from "@/ui/message/buttons";

export function QRCodeStatus(qrcode: string) {
  const hasQRCode = qrcode.trim();

  return (
    <>
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-xs xl:hidden ${hasQRCode ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}
      >
        {hasQRCode ? (
          <QrCodeIcon className="size-5 text-white" />
        ) : (
          <CircleOff className="size-5 text-gray-500" />
        )}
      </span>
      <span className="hidden xl:block">{qrcode}</span>
    </>
  );
}

export default async function MessageTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const messages = await fetchFilteredMessages(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 lg:pt-0">
          <div className="lg:hidden">
            {messages?.map((message) => (
              <div
                key={message.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-x-6">
                      <p title={message.show_until}>
                        {message.show_until === null ? (
                          <InfinityIcon />
                        ) : (
                          formatDateToLocal(message.show_until)
                        )}
                      </p>
                      <p
                        title={message.created_at}
                        className="text-sm text-gray-500"
                      >
                        {formatDateToLocal(message.created_at)}
                      </p>
                    </div>
                    <p className="font-medium">{message.url}</p>
                  </div>
                  <NewsStatus showDate={message.show_until} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div title={message.content} className="max-w-xs truncate">
                    <p>{message.content}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateMessage id={message.id} />
                    <DeleteMessage id={message.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left font-normal max-lg:text-sm">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Content
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  QR Code
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Show until
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {messages?.map((message) => (
                <tr
                  key={message.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td
                    title={message.content}
                    className="max-w-md truncate py-3 pr-3 pl-6"
                  >
                    {message.content}
                  </td>
                  <td
                    className="max-w-xs truncate px-3 py-3"
                    title={message.url}
                  >
                    {QRCodeStatus(message.url)}
                  </td>
                  <td title={message.show_until} className="px-3 py-3">
                    {message.show_until === null ? (
                      <InfinityIcon />
                    ) : (
                      formatDateToLocal(message.show_until)
                    )}
                  </td>
                  <td title={message.created_at} className="px-3 py-3">
                    {formatDateToLocal(message.created_at)}
                  </td>
                  <td className="px-3 py-3">
                    <NewsStatus showDate={message.show_until} />
                  </td>
                  <td className="py-3 pr-3 pl-6">
                    <div className="flex justify-end gap-3">
                      <UpdateMessage id={message.id} />
                      <DeleteMessage id={message.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
