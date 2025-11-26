import { fetchNavLinks } from "@/hooks/fetchNavLinks";
import { Radio, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";




export default async function page() {

  const navLinks = await fetchNavLinks();

  console.log(navLinks)

  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <Link href={"/radio"} className="flex items-center justify-center flex-col group *:group-hover:text-white/80">
          <Radio className="size-40" />
          <p className="text-3xl uppercase">Radio</p>
        </Link>

        <div>
          <Image src="/theresnosignal_logo.gif" alt="theresnosignal-logo" width={50} height={50} className="size-50" />
        </div>

        <Link href={"/events"} className="flex items-center justify-center flex-col group *:group-hover:text-white/80">
          <User className="size-40" />
          <p className="text-3xl uppercase">Events</p>
        </Link>
      </div>

      <div className="flex items-center justify-center gap-10 mt-30">
        {navLinks.map((link, index) => (
          <Link href={link.href} key={index} className="text-2xl text-center">{link.title}</Link>
        ))}
      </div>
    </section>
  );
}
