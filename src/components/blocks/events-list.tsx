"use client";

import { Event } from "@/hooks/fetchEvents";
import Image from "next/image";

interface EventsListProps {
  events: Event[];
}

export function EventsList({ events }: EventsListProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();

    // Get the day suffix (1st, 2nd, 3rd, etc.)
    const getDaySuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return {
      month: month,
      day: `${day}${getDaySuffix(day)}`,
      year: year,
    };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Filter to only show upcoming events
  const now = new Date();
  const upcomingEvents = events.filter((event) => {
    const eventDate = new Date(event.startTime);
    return eventDate >= now;
  });

  return (
    <div className="min-h-screen bg-black text-[#B7F346] relative overflow-hidden">
      {/* Pixelated vertical strip on the right */}

      <div className="container mx-auto px-8 py-12 max-w-7xl relative z-10">
        <h1 className="text-6xl md:text-[10vw] lg:text-9xl uppercase text-[#B7F346] mb-16">
          Events
        </h1>

        <div className="space-y-16">
          {upcomingEvents.map((event) => {
            const dateInfo = formatDate(event.startTime);
            const endDateInfo = event.endTime ? formatDate(event.endTime) : null;

            return (
              <div
                key={event._id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                {/* LEFT: Event Flyer/Image */}
                <div className="relative w-full aspect-4/3 overflow-hidden">
                  <div className="absolute inset-0 pixelated-filter-wrapper">
                    <Image
                      src={event.imageUrl}
                      alt={event.eventTitle}
                      fill
                      className="object-cover pixelated-filter"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  {event.isLive && (
                    <div className="absolute top-4 right-4 bg-[#B7F346] text-black px-3 py-1 text-sm font-bold uppercase">
                      Live
                    </div>
                  )}
                </div>

                {/* RIGHT: Event Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold uppercase underline decoration-[#B7F346] decoration-2 underline-offset-4 mb-6">
                      EVENT INFO
                    </h2>

                    <h3 className="text-3xl md:text-4xl font-bold text-[#B7F346] mb-4">
                      {event.eventTitle}
                    </h3>
                    {event.dj && (
                      <p className="text-xl text-[#B7F346] mb-6">
                        {event.dj}
                      </p>
                    )}
                  </div>

                  {/* WHEN? Section */}
                  <div className="space-y-2">
                    <p className="text-sm uppercase text-[#B7F346]">WHEN?</p>
                    <p className="text-2xl font-bold text-[#B7F346]">{dateInfo.month}</p>
                    {endDateInfo ? (
                      <p className="text-2xl font-bold text-[#B7F346]">
                        {dateInfo.day} - {endDateInfo.day}, {dateInfo.year}
                      </p>
                    ) : (
                      <p className="text-2xl font-bold text-[#B7F346]">
                        {dateInfo.day}, {dateInfo.year}
                      </p>
                    )}
                    <p className="text-xl text-[#B7F346]">
                      {formatTime(event.startTime)}
                      {event.endTime && ` - ${formatTime(event.endTime)}`}
                    </p>
                  </div>

                  {/* WHERE? Section */}
                  {(event.venueName || event.venueAddress || event.venueCity) && (
                    <div className="space-y-2">
                      <p className="text-sm uppercase text-[#B7F346]">WHERE?</p>
                      {event.venueName && (
                        <p className="text-2xl font-bold text-[#B7F346]">{event.venueName}</p>
                      )}
                      {event.venueAddress && (
                        <p className="text-xl text-[#B7F346]">{event.venueAddress}</p>
                      )}
                      {event.venueCity && (
                        <p className="text-xl text-[#B7F346]">{event.venueCity}</p>
                      )}
                    </div>
                  )}

                  {/* RSVP Button */}
                  <a
                    href={event.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full border-2 border-[#B7F346] bg-transparent text-white uppercase font-bold py-4 px-6 text-center hover:bg-[#B7F346] hover:text-black transition-all pixelated-button"
                  >
                    RSVP
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {upcomingEvents.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-[#B7F346]">No upcoming events found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
