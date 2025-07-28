"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createMessage, type StateMessage } from "@/lib/actions";
import { Button } from "@/ui/button";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { CalendarDays, Save } from "lucide-react";
import { MDXClient, SerializeResult } from "next-mdx-remote-client";
import { serialize } from "next-mdx-remote-client/serialize";
import Link from "next/link";
import { useActionState, useState } from "react";

export default function MessageForm() {
  const initialState: StateMessage = {
    message: null,
    errors: {},
    inputs: {},
  };

  const [content, setContent] = useState<string>("");
  const [mdxSource, setMdxSource] = useState<
    SerializeResult<Record<string, unknown>, Record<string, unknown>>
  >({} as SerializeResult);

  const [state, formAction, isPending] = useActionState(
    createMessage,
    initialState,
  );

  const handleOnChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const mdxSource = await serialize({ source: e.target.value });
    setMdxSource(mdxSource);
  };

  return (
    <>
      <form action={formAction}>
        <div className="my-6 flex justify-end gap-4">
          <Link
            href="/dashboard/message"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            <XMarkIcon className="h-6 w-6 sm:mr-1.5" />
            <span className="hidden sm:block">Cancel</span>
          </Link>
          <Button type="submit" disabled={isPending}>
            <Save />
            <span className="hidden sm:block">
              {isPending ? "Creating..." : "Create Message"}
            </span>
          </Button>
        </div>

        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          {/* url */}
          <div className="mb-4">
            <label htmlFor="url" className="mb-2 block text-sm font-medium">
              URL for further information:
            </label>
            <div className="relative">
              <input
                id="url"
                name="url"
                type="url"
                placeholder="https://www.frankfurt-university.de/"
                title="The URL for further information"
                defaultValue={state.inputs?.url}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-label="The URL for further information"
                aria-describedby="url-error"
              />
              <LinkIcon className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="url-error" aria-live="polite" aria-atomic="true">
              {state.errors?.url &&
                state.errors.url.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* showUntil */}
          <div className="mb-4">
            <label
              htmlFor="showUntil"
              className="mb-2 block text-sm font-medium"
            >
              Date until which the message will be shown:
            </label>
            <div className="relative">
              <input
                id="showUntil"
                name="showUntil"
                type="date"
                defaultValue={state.inputs?.showUntil}
                className={`peer block w-auto cursor-pointer rounded-md border py-2 pl-10 text-sm outline-1 placeholder:text-gray-500 ${state.errors?.showUntil ? "border-destructive" : "border-gray-200"}`}
                title="The date until which the news article will be shown"
                aria-label="The date until which the news article will be shown"
                aria-describedby="showUntil-error"
              />
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="showUntil-error" aria-live="polite" aria-atomic="true">
              {state.errors?.showUntil &&
                state.errors.showUntil.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Markdown Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  defaultValue={state.inputs?.content}
                  onChange={handleOnChange}
                  placeholder={`Enter your markdown content here...

Example:
# Welcome Message

This is a **bold** message with *italic* text.

- List item 1
- List item 2

> This is a quote

[Link text](https://example.com)`}
                  className="min-h-[500px] w-full resize-none rounded-md border border-gray-300 p-3 font-mono text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="min-h-[500px] rounded border bg-white p-4">
                  {"compiledSource" in mdxSource ? (
                    <MDXClient {...mdxSource} />
                  ) : mdxSource && "error" in mdxSource ? (
                    <div className="text-red-500 italic">
                      Error rendering preview: {mdxSource.error.message}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Errors */}
          <div aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            )}
          </div>
        </div>
      </form>

      {/* Markdown Syntax Help */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Markdown Syntax Help</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-semibold">Headers</h4>
              <code className="block rounded bg-gray-100 p-2">
                # H1 Header
                <br />
                ## H2 Header
                <br />
                ### H3 Header
              </code>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Text Formatting</h4>
              <code className="block rounded bg-gray-100 p-2">
                **bold text**
                <br />
                *italic text*
                <br />
                `code text`
              </code>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Lists</h4>
              <code className="block rounded bg-gray-100 p-2">
                - Item 1<br />- Item 2<br />- Item 3
              </code>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Links & Quotes</h4>
              <code className="block rounded bg-gray-100 p-2">
                [Link text](URL)
                <br />
                {"> Quote text"}
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
