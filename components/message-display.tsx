import { MessageData } from "@/lib/definitions";
import { getTextSize } from "@/lib/utils";
import { MDXClient } from "next-mdx-remote-client";
import { serialize, SerializeResult } from "next-mdx-remote-client/serialize";
import { useEffect, useState } from "react";

export default function MessageDisplay({ data }: { data: MessageData }) {
  const [mdxSource, setMdxSource] = useState<
    SerializeResult<Record<string, unknown>, Record<string, unknown>>
  >({} as SerializeResult);

  useEffect(() => {
    const generateMdxSource = async () => {
      const serialized = await serialize({ source: data.content });
      setMdxSource(serialized);
    };
    generateMdxSource();
  }, [data.content]);

  if ("compiledSource" in mdxSource) {
    return (
      <div
        className={`prose flex max-w-none flex-col items-center text-balance ${getTextSize(data.content)}`}
      >
        <MDXClient {...mdxSource} />
      </div>
    );
  }
  if ("error" in mdxSource) {
    return <div>Error rendering message: {mdxSource.error.message}</div>;
  }
  return null;
}
