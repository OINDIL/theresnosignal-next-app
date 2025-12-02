import { LandingPage } from "@/components/blocks/landing-page";
import { fetchNavLinks } from "@/hooks/fetchNavLinks";

export default async function page() {
  const navLinks = await fetchNavLinks();

  return (
    <>
      <LandingPage navLinks={navLinks} />
    </>
  )

}
