import { client } from "@/lib/sanityClient";
import { urlFor } from "@/lib/sanityImage";

export type AgendaItem = {
    timePeriod: string;
    activity: string;
};

export type AgendaDay = {
    day: string;
    items: AgendaItem[];
};

export type Event = {
    _id: string;
    eventTitle: string;
    description: string;
    startTime: string;
    endTime: string;
    dj: string;
    imageUrl: string;
    ticketLink: string;
    isLive?: boolean;
    venueName?: string;
    venueAddress?: string;
    venueCity?: string;
    ctaButtonText?: string;
    agenda?: AgendaDay[];
};

export const fetchEvents = async (): Promise<Event[]> => {
    const eventsQuery = `*[_type == "event"] | order(startTime asc) {
    _id,
    eventTitle,
    description,
    startTime,
    endTime,
    dj,
    image {
      _type,
      asset {
        _ref,
        _type
      }
    },
    ticketLink,
    isLive,
    venueName,
    venueAddress,
    venueCity
  }`;

    const options = { next: { revalidate: 30 } };

    const events = await client.fetch<Array<{
        _id: string;
        eventTitle: string;
        description: string;
        startTime: string;
        endTime: string;
        dj: string;
        image: {
            _type: "image";
            asset: {
                _ref: string;
                _type: "reference";
            };
        };
        ticketLink: string;
        isLive?: boolean;
        venueName?: string;
        venueAddress?: string;
        venueCity?: string;
    }>>(eventsQuery, {}, options);

    // Build image URLs on the server side
    const eventsWithImageUrls: Event[] = events.map((event) => ({
        _id: event._id,
        eventTitle: event.eventTitle,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        dj: event.dj,
        imageUrl: urlFor(event.image).width(800).height(600).url(),
        ticketLink: event.ticketLink,
        isLive: event.isLive,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        venueCity: event.venueCity,
    }));

    return eventsWithImageUrls;
};

export const fetchEventById = async (eventId: string): Promise<Event | null> => {
    const eventQuery = `*[_type == "event" && _id == $eventId][0] {
    _id,
    eventTitle,
    description,
    startTime,
    endTime,
    dj,
    image {
      _type,
      asset {
        _ref,
        _type
      }
    },
    ticketLink,
    isLive,
    venueName,
    venueAddress,
    venueCity,
    ctaButtonText,
    agenda
  }`;

    const options = { next: { revalidate: 30 } };

    const event = await client.fetch<{
        _id: string;
        eventTitle: string;
        description: string;
        startTime: string;
        endTime: string;
        dj: string;
        image: {
            _type: "image";
            asset: {
                _ref: string;
                _type: "reference";
            };
        };
        ticketLink: string;
        isLive?: boolean;
        venueName?: string;
        venueAddress?: string;
        venueCity?: string;
        ctaButtonText?: string;
        agenda?: AgendaDay[];
    } | null>(eventQuery, { eventId }, options);

    if (!event) {
        return null;
    }

    // Build image URL on the server side
    return {
        _id: event._id,
        eventTitle: event.eventTitle,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        dj: event.dj,
        imageUrl: urlFor(event.image).width(1200).height(1600).url(),
        ticketLink: event.ticketLink,
        isLive: event.isLive,
        venueName: event.venueName,
        venueAddress: event.venueAddress,
        venueCity: event.venueCity,
        ctaButtonText: event.ctaButtonText || 'GET TICKETS',
        agenda: event.agenda,
    };
};

