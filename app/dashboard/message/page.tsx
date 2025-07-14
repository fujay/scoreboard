import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

type Props = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
};

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div>
      {query} {currentPage}
    </div>
  );
}
