import { fetchFilteredScrapers } from "@/lib/data";
import { formatDateToLocal } from "@/lib/utils";
import { DeleteScraper, UpdateScraper } from "@/ui/scraper/buttons";
import { DocumentTextIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default async function ScrapersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const scrapersList: Settings["scraper"] = await readKeyConfig("scraper");
  // const scrapers = scrapersList.filter((scraper) => {
  //   return (
  //     scraper.titleSelector.includes(query) ||
  //     scraper.selectors.includes(query) ||
  //     scraper.url.includes(query) ||
  //     scraper.format.includes(query)
  //   );
  // });

  const scrapers = await fetchFilteredScrapers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {scrapers?.map((scraper, index) => (
              <div key={index} className="mb-2 w-full rounded-md bg-white p-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 items-center">
                      <p>{scraper.url}</p>
                    </div>
                    <p className="text-sm text-gray-500">
                      {scraper.titleSelector}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-white">
                    {scraper.format === "Text" ? (
                      <DocumentTextIcon
                        title={scraper.format}
                        className="w-4 text-gray-500"
                      />
                    ) : (
                      <PhotoIcon
                        title={scraper.format}
                        className="w-4 text-gray-500"
                      />
                    )}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">{scraper.selectors}</p>
                    <p>{formatDateToLocal(new Date().toString())}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateScraper index={index} />
                    <DeleteScraper index={index} />
                  </div>
                </div>
              </div>
            ))}
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
                <th scope="col" className="relative py-3 pr-3 pl-6">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {scrapers?.map((scraper, index) => (
                <tr
                  key={index}
                  className="w-full border-b py-3 text-sm even:bg-muted last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <p>{scraper.url}</p>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {scraper.titleSelector}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {scraper.selectors}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-white">
                        {scraper.format === "Text" ? (
                          <DocumentTextIcon
                            title={scraper.format}
                            className="w-4 text-gray-500"
                          />
                        ) : (
                          <PhotoIcon
                            title={scraper.format}
                            className="w-4 text-gray-500"
                          />
                        )}
                      </span>
                    }
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    {formatDateToLocal(new Date().toString())}
                  </td>
                  <td className="py-3 pr-3 pl-6 whitespace-nowrap">
                    <div className="flex justify-end gap-3">
                      <UpdateScraper index={index} />
                      <DeleteScraper index={index} />
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
