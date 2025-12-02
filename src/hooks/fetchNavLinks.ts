import { client } from "@/lib/sanityClient";

export type fetchNavLinksType = Array<{ title: string, href: string, isVisible: boolean }>

export const fetchNavLinks = async (): Promise<fetchNavLinksType> => {

  const navigationQuery = `*[
      _type == "navigation"
    ]|order(publishedAt desc)[0...12]{title, href, isVisible}`;

  const options = { next: { revalidate: 30 } };

  const navLinks = await client.fetch<Array<{ title: string, href: string, isVisible: boolean }>>(navigationQuery, {}, options);
  const visibleNavlinks = navLinks.filter(link => link.isVisible);

  return visibleNavlinks;

}