import { fetchFilteredNews } from "@/lib/data";
import { formatDateToLocal } from "@/lib/utils";
import { DeleteNews, UpdateNews } from "@/ui/news/buttons";
import { IconMapping } from "@/ui/news/news-icon";
import { InfinityIcon } from "lucide-react";
import NewsStatus from "@/ui/news/status";

export default async function NewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const newsList = await fetchFilteredNews(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 lg:pt-0">
          <div className="lg:hidden">
            {newsList?.map((news) => (
              <div
                key={news.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-x-2">
                      <p title={news.icon}>
                        <IconMapping icon={news.icon} />
                      </p>
                      <p title={news.show_until}>
                        {news.show_until === null ? (
                          <InfinityIcon />
                        ) : (
                          formatDateToLocal(news.show_until)
                        )}
                      </p>
                    </div>
                    <p className="font-medium">{news.title}</p>
                  </div>
                  <NewsStatus showDate={news.show_until} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p>{news.content}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateNews id={news.id} />
                    <DeleteNews id={news.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left font-normal max-lg:text-sm">
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
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {newsList?.map((news) => (
                <tr
                  key={news.id}
                  className="w-full border-b py-3 text-sm even:bg-muted/50 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td title={news.icon} className="py-3 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      <p>
                        <IconMapping icon={news.icon} />
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3">{news.title}</td>
                  <td className="px-3 py-3">{news.content}</td>
                  <td title={news.show_until} className="px-3 py-3">
                    {news.show_until === null ? (
                      <InfinityIcon />
                    ) : (
                      formatDateToLocal(news.show_until)
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <NewsStatus showDate={news.show_until} />
                  </td>
                  <td className="py-3 pr-3 pl-6">
                    <div className="flex justify-end gap-3">
                      <UpdateNews id={news.id} />
                      <DeleteNews id={news.id} />
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
