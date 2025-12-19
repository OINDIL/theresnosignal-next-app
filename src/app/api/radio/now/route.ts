import { NextResponse } from "next/server";
import { client } from "@/lib/sanityClient";
import { env } from "@/lib/env";
import { urlFor } from "@/lib/sanityImage";

type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};

type NowPlayingResponse =
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
      dj: {
        id: string;
        name: string;
        bio?: string;
        imageUrl?: string;
      };
    };
  }
  | {
    isLive: false;
    streamUrl: string;
    show: null;
    nextShow?: {
      id: string;
      title: string;
      startTime: string;
      endTime: string;
      djName?: string;
    } | null;
  };

async function checkStreamActive(streamUrl: string): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(streamUrl, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "Icy-MetaData": "1",
      },
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

export async function GET() {
  const now = new Date().toISOString();

  // Query for shows that are currently live
  // This handles both same-day and cross-midnight shows
  const currentShowQuery = `*[
    _type == "radioShow" &&
    startTime <= $now &&
    endTime > $now &&
    defined(dj)
  ] | order(startTime desc)[0]{
    _id,
    title,
    description,
    category,
    startTime,
    endTime,
    coverArt{_type,asset{_ref,_type}},
    dj->{_id,name,bio,image{_type,asset{_ref,_type}}}
  }`;

  const nextShowQuery = `*[
    _type == "radioShow" &&
    startTime > $now
  ] | order(startTime asc)[0]{
    _id,
    title,
    startTime,
    endTime,
    "djName": dj->name
  }`;

  const streamUrl = env.ICECAST_STREAM_URL;

  const [currentShow, nextShow, streamActive] = await Promise.all([
    client.fetch<{
      _id: string;
      title: string;
      description?: string;
      category?: string;
      startTime: string;
      endTime: string;
      coverArt?: SanityImage;
      dj?: {
        _id: string;
        name: string;
        bio?: string;
        image?: SanityImage;
      } | null;
    } | null>(currentShowQuery, { now }, { next: { revalidate: 10 } }),
    client.fetch<{
      _id: string;
      title: string;
      startTime: string;
      endTime: string;
      djName?: string;
    } | null>(nextShowQuery, { now }, { next: { revalidate: 30 } }),
    checkStreamActive(streamUrl),
  ]);

  // If there's a scheduled show with a DJ, use it
  if (currentShow && currentShow.dj) {
    const coverArtUrl = currentShow.coverArt
      ? urlFor(currentShow.coverArt).width(1200).height(1200).url()
      : undefined;
    const djImageUrl = currentShow.dj.image
      ? urlFor(currentShow.dj.image).width(800).height(800).url()
      : undefined;

    const payload: NowPlayingResponse = {
      isLive: true,
      streamUrl,
      show: {
        id: currentShow._id,
        title: currentShow.title,
        description: currentShow.description,
        category: currentShow.category,
        startTime: currentShow.startTime,
        endTime: currentShow.endTime,
        coverArtUrl,
        dj: {
          id: currentShow.dj._id,
          name: currentShow.dj.name,
          bio: currentShow.dj.bio,
          imageUrl: djImageUrl,
        },
      },
    };

    return NextResponse.json(payload);
  }

  // Fallback: If stream is active but no scheduled show, show generic "LIVE" state
  if (streamActive) {
    const payload: NowPlayingResponse = {
      isLive: true,
      streamUrl,
      show: {
        id: "live-now",
        title: "Live Stream",
        description: "Currently broadcasting live.",
        startTime: now,
        endTime: new Date(Date.now() + 3600000).toISOString(),
        dj: {
          id: "live-dj",
          name: "Live DJ",
        },
      },
    };

    return NextResponse.json(payload);
  }

  // No active stream and no scheduled show
  const payload: NowPlayingResponse = {
    isLive: false,
    streamUrl,
    show: null,
    nextShow: nextShow
      ? {
        id: nextShow._id,
        title: nextShow.title,
        startTime: nextShow.startTime,
        endTime: nextShow.endTime,
        djName: nextShow.djName,
      }
      : null,
  };

  return NextResponse.json(payload);
}


