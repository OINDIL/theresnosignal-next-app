"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Instagram, Music, Globe } from "lucide-react";

type NowPlaying =
  | {
    isLive: true;
    streamUrl: string;
    show: {
      id: string;
      title: string;
      description?: string;
      category?: string;
      startTime: string;
      endTime: string;
      coverArtUrl?: string;
      dj: { id: string; name: string; bio?: string; imageUrl?: string; instagram?: string; soundcloud?: string; website?: string };
    };
  }
  | {
    isLive: false;
    streamUrl: string;
    show: null;
    nextShow?: { id: string; title: string; startTime: string; endTime: string; djName?: string } | null;
  };

function formatRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const date = s.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  const startTime = s.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  const endTime = e.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${date} • ${startTime} - ${endTime}`;
}

export default function RadioPage() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setError(null);
        const res = await fetch("/api/radio/now", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load radio info (${res.status})`);
        const json = (await res.json()) as NowPlaying;
        if (isMounted) setData(json);
      } catch (e) {
        if (isMounted) setError(e instanceof Error ? e.message : "Failed to load radio info");
      }
    }

    load();
    const id = window.setInterval(load, 15_000);
    return () => {
      isMounted = false;
      window.clearInterval(id);
    };
  }, []);

  const liveLabel = useMemo(() => {
    if (!data) return "Loading…";
    if (data.isLive) return "ON AIR";
    if (data.nextShow) return `OFF AIR • NEXT: ${data.nextShow.title}`;
    return "OFF AIR";
  }, [data]);

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-10 min-h-screen py-16">
      <div className="flex flex-col gap-10">
        <header>
          <h1 className="text-6xl md:text-[10vw] lg:text-9xl uppercase dark:text-[#B7F346] mb-4">
            Radio
          </h1>
          <div className="inline-flex items-center gap-3 border-2 border-black dark:border-[#B7F346] px-4 py-2 uppercase font-bold">
            <span className="h-3 w-3 bg-black dark:bg-[#B7F346]" />
            <span className="dark:text-[#B7F346]">{liveLabel}</span>
          </div>
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
        </header>

        {/* Player + show card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="border-2 border-black dark:border-[#B7F346] p-6 bg-background">
              <p className="uppercase font-bold mb-3 dark:text-[#B7F346]">Stream</p>
              {data?.streamUrl ? (
                <audio controls className="w-full">
                  <source src={data.streamUrl} />
                </audio>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  Stream URL not configured. Please set ICECAST_STREAM_URL in your environment variables.
                </div>
              )}
              <p className="mt-3 text-sm text-muted-foreground">
                If audio doesn&apos;t start automatically, press play. (Your browser may block autoplay.)
              </p>
            </div>

            {data?.isLive && (
              <div className="border-2 border-black dark:border-[#B7F346] p-6">
                <p className="uppercase font-bold mb-2 dark:text-[#B7F346]">About the show</p>
                {data.show.description ? (
                  <p className="text-base md:text-lg whitespace-pre-line">{data.show.description}</p>
                ) : (
                  <p className="text-muted-foreground">No description yet.</p>
                )}
              </div>
            )}

            {!data?.isLive && data?.nextShow && (
              <div className="border-2 border-black dark:border-[#B7F346] p-6">
                <p className="uppercase font-bold mb-2 dark:text-[#B7F346]">Next up</p>
                <p className="text-xl font-bold dark:text-[#B7F346]">{data.nextShow.title}</p>
                <p className="text-muted-foreground">{formatRange(data.nextShow.startTime, data.nextShow.endTime)}</p>
                {data.nextShow.djName && <p className="mt-2">DJ: {data.nextShow.djName}</p>}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="border-2 border-black dark:border-[#B7F346] p-6">
              <p className="uppercase font-bold mb-4 dark:text-[#B7F346]">Now Playing</p>

              {data?.isLive ? (
                <div className="space-y-4">
                  {data.show.coverArtUrl ? (
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image
                        src={data.show.coverArtUrl}
                        alt={data.show.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-square border border-dashed border-black/40 dark:border-[#B7F346]/40 flex items-center justify-center text-muted-foreground">
                      No cover art
                    </div>
                  )}

                  <div>
                    <p className="text-2xl font-bold dark:text-[#B7F346]">{data.show.title}</p>
                    <p className="text-muted-foreground">{formatRange(data.show.startTime, data.show.endTime)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {data.show.dj.imageUrl ? (
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-black/20 dark:border-[#B7F346]/40">
                        <Image src={data.show.dj.imageUrl} alt={data.show.dj.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="h-12 w-12 rounded-full border border-black/20 dark:border-[#B7F346]/40" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold">DJ: {data.show.dj.name}</p>
                        <div className="flex items-center gap-2">
                          {data.show.dj.instagram && (
                            <a
                              href={data.show.dj.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground transition-colors"
                              aria-label="Instagram"
                            >
                              <Instagram size={18} />
                            </a>
                          )}
                          {data.show.dj.soundcloud && (
                            <a
                              href={data.show.dj.soundcloud}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground transition-colors"
                              aria-label="SoundCloud"
                            >
                              <Music size={18} />
                            </a>
                          )}
                          {data.show.dj.website && (
                            <a
                              href={data.show.dj.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-foreground transition-colors"
                              aria-label="Website"
                            >
                              <Globe size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                      {data.show.category && <p className="text-sm text-muted-foreground">{data.show.category}</p>}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No live show right now.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
