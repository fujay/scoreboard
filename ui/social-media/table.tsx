import { fetchFilteredSocialMedia } from "@/lib/data";
import { SocialMediaTypes } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";
import NewsStatus from "@/ui/news/status";
import {
  DeleteSocialMedia,
  UpdateSocialMedia,
} from "@/ui/social-media/buttons";
import { InfinityIcon } from "lucide-react";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Pinterest,
  TikTok,
  X,
  YouTube,
} from "@/ui/social-media-icons";

const getSocialMediaIcon = (platform: SocialMediaTypes) => {
  switch (platform) {
    case "Facebook":
      return <Facebook />;
    case "Instagram":
      return <Instagram />;
    case "LinkedIn":
      return <LinkedIn />;
    case "Pinterest":
      return <Pinterest />;
    case "TikTok":
      return <TikTok />;
    case "Tweet":
    case "X":
      return <X />;
    case "YouTube":
      return <YouTube />;
  }
};

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const socialMedia = await fetchFilteredSocialMedia(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 lg:pt-0">
          <div className="lg:hidden">
            {socialMedia?.map((media) => (
              <div
                key={media.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-x-2">
                      <p title={media.platform}>
                        {getSocialMediaIcon(media.platform)}
                      </p>
                      <p>{media.platform}</p>
                      <p title={media.show_until}>
                        {media.show_until === null ? (
                          <InfinityIcon />
                        ) : (
                          formatDateToLocal(media.show_until)
                        )}
                      </p>
                    </div>
                    <p className="font-medium">{media.title}</p>
                  </div>
                  <NewsStatus showDate={media.show_until} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div title={media.url} className="max-w-xs truncate">
                    <p>{media.url}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateSocialMedia id={media.id} />
                    <DeleteSocialMedia id={media.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left font-normal max-lg:text-sm">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Platform
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  URL
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Title
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
              {socialMedia?.map((media) => (
                <tr
                  key={media.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="py-3 pr-3 pl-6">
                    <div className="flex items-center gap-3">
                      {getSocialMediaIcon(media.platform)}
                      <p>{media.platform}</p>
                    </div>
                  </td>
                  <td className="max-w-xs truncate px-3 py-3" title={media.url}>
                    {media.url}
                  </td>
                  <td className="px-3 py-3">{media.title}</td>
                  <td title={media.show_until} className="px-3 py-3">
                    {media.show_until === null ? (
                      <InfinityIcon />
                    ) : (
                      formatDateToLocal(media.show_until)
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <NewsStatus showDate={media.show_until} />
                  </td>
                  <td className="py-3 pr-3 pl-6">
                    <div className="flex justify-end gap-3">
                      <UpdateSocialMedia id={media.id} />
                      <DeleteSocialMedia id={media.id} />
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
