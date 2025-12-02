"use client"

import { fetchNavLinksType } from "@/hooks/fetchNavLinks";
import { useThemeSelect } from "@/hooks/useThemeSelect";
import { Radio, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShowThemeSelector } from "./show-theme-selector";

interface LandingPageProps {
    navLinks: fetchNavLinksType | null;
}

export function LandingPage({ navLinks }: LandingPageProps) {
    const { showThemeSelector } = useThemeSelect();

    // show the theme selector
    if (showThemeSelector) {
        return <ShowThemeSelector />
    }

    return (
        <section className="landing-page-bright">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <Link href={"/radio"} className="flex items-center justify-center flex-col group *:group-hover:text-white/80">
                    <Radio className="size-40 text-[#B7F346]" />
                    <p className="text-3xl uppercase text-[#B7F346]">Radio</p>
                </Link>

                <div>
                    <Image src="/logo.gif" alt="theresnosignal-logo" width={50} height={50} className="size-64" unoptimized />
                </div>

                <Link href={"/events"} className="flex items-center justify-center flex-col group *:group-hover:text-white/80">
                    <User className="size-40 text-[#B7F346]" />
                    <p className="text-3xl uppercase text-[#B7F346]">Events</p>
                </Link>
            </div>

            <div className="flex items-center justify-center gap-10 mt-30">
                {navLinks?.map((link, index) => (
                    <Link href={link.href} key={index} className="text-2xl text-center text-[#B7F346] hover:text-white/80">{link.title}</Link>
                ))}
            </div>
        </section>
    );
}