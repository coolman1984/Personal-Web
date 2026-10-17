/** روابط تواصل مباشرة بدل نموذج بيفشل من غير مفتاح إرسال. */
import { publicContact } from "@/lib/public-contact";

export function DirectContact({
  intro = "نموذج الرسائل مش متاح دلوقتي. راسلني مباشرة وهرد عليك.",
}: {
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-[15px] leading-relaxed text-fg-muted">{intro}</p>
      <div className="flex flex-col items-start gap-3">
        <a
          href={publicContact.mailto}
          className="text-base font-extrabold text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
          dir="ltr"
        >
          {publicContact.email}
        </a>
        <a
          href={publicContact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-extrabold text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
        >
          {publicContact.linkedinLabel}
        </a>
      </div>
    </div>
  );
}
