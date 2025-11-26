import { client } from "@/lib/sanityClient";
import { type SanityDocument } from "next-sanity";

type fetchNavLinksType = Promise<Array<{ title: string, href: string, isVisible: boolean }>>

export const fetchNavLinks = async (): fetchNavLinksType => {

    const navigationQuery = `*[
      _type == "navigation"
    ]|order(publishedAt desc)[0...12]{title, href, isVisible}`;

    const options = { next: { revalidate: 30 } };

    const navLinks = await client.fetch<SanityDocument[]>(navigationQuery, {}, options);
    const visibleNavlinks = navLinks.filter(link => link.isVisible);

    return visibleNavlinks as unknown as fetchNavLinksType;

}