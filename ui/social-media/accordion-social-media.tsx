import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionSocialMedia() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Facebook</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            For the post you would like to embed, select <kbd>⋯</kbd> ›{" "}
            <kbd>Embed</kbd> › <kbd>Advanced settings</kbd> ›{" "}
            <kbd>Get Code</kbd>, then use the <kbd>cite</kbd> link in the
            generated <kbd>blockquote</kbd>.
          </p>
          <p>
            See{" "}
            <a href="https://github.com/justinmahar/react-social-media-embed/issues/14#issuecomment-1297458134">
              these instructions which include screenshots
            </a>{" "}
            for more information.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Instagram</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            {" "}
            A few options:
            <ul>
              <li>
                - Open a post and select <kbd>⋯</kbd> › <kbd>Copy Link</kbd>
              </li>
              <li>
                - Open a post in a browser window and copy the URL from the
                address bar. The URL should be in the format:
                <kbd>https://www.instagram.com/p/abc123xyzAB/</kbd>
              </li>
              <li>
                - Open a post and select <kbd>⋯</kbd> › <kbd>Embed</kbd> ›{" "}
                <kbd>Copy embed code</kbd>. Paste the embed code in a text
                editor, then locate the
                <kbd>data-instgram-permalink</kbd> attribute and use that link.
              </li>
            </ul>
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>LinkedIn</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            The <kbd>url</kbd> must be be retrieved from the &quot;Embed this
            post&quot; option for the desired post. Use the <kbd>src</kbd>{" "}
            attribute of the <kbd>iframe</kbd>.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Pinterest</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Visit a Pinterest post in your browser. Copy the URL from the
            address bar. The URL must contain the pin ID, in the format{" "}
            <kbd>pin/1234567890123456789</kbd>. Short links are not supported.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>TikTok</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Open a post in your browser. The post URL will be shown. Click the{" "}
            <kbd>Copy Link</kbd> button. The URL must contain the video ID, in
            the format{" "}
            <kbd>
              https://www.tiktok.com/@username/video/1234567890123456789
            </kbd>
            . Short links are not supported.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>X</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Open an X post in a browser window. Copy the link to the post from
            the address bar. The URL must contain the post ID, in the format
            <kbd>https://twitter.com/username/status/1234567890123456789</kbd>.
            Short links are not supported.
          </p>
          <p>
            Alternate option: Select <kbd>⋯</kbd> › <kbd>Embed Post</kbd>, and
            use the <kbd>a href</kbd> attribute value from the provided embed
            code.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>Tweet</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>Copy the tweet id from the URL of the tweet you want to embed.</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>YouTube</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Open the video in a browser window. Copy the URL from the address
            bar. You can also click <kbd>Share</kbd> › <kbd>Copy</kbd>. The URL
            must be in the format{" "}
            <kbd>https://www.youtube.com/watch?v=VIDEO_ID</kbd> or
            <kbd>https://youtu.be/VIDEO_ID</kbd> where <kbd>VIDEO_ID</kbd> is
            the video ID. YouTube Shorts are also supported. For shorts, the URL
            must be in the format <kbd>https://youtube.com/shorts/VIDEO_ID</kbd>
            .
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
