"use client";

import { Event } from "@/hooks/fetchEvents";
import Image from "next/image";
import Link from "next/link";

interface EventDetailProps {
  event: Event;
}

export function EventDetail({ event }: EventDetailProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    
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
      dayOfWeek: dayOfWeek,
      shortMonth: month.substring(0, 3).toUpperCase(),
    };
  };

  const dateInfo = formatDate(event.startTime);
  const endDateInfo = event.endTime ? formatDate(event.endTime) : null;

  return (
    <div className="min-h-screen bg-black text-[#B7F346] relative overflow-hidden">
      {/* Pixelated vertical strip on the right */}
      <div className="fixed right-0 top-0 w-4 h-full bg-[#B7F346] opacity-20 pixelated-strip"></div>

      <div className="container mx-auto px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* LEFT COLUMN: EVENT INFO */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold uppercase underline decoration-[#B7F346] decoration-2 underline-offset-4">
              EVENT INFO
            </h2>

            {/* Event Image with pixelated filter */}
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <div className="absolute inset-0 pixelated-filter-wrapper">
                <Image
                  src={event.imageUrl}
                  alt={event.eventTitle}
                  fill
                  className="object-cover pixelated-filter"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
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

            {/* CTA Button */}
            <Link
              href={event.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border-2 border-[#B7F346] bg-transparent text-white uppercase font-bold py-4 px-6 text-center hover:bg-[#B7F346] hover:text-black transition-all pixelated-button"
            >
              {event.ctaButtonText || 'GET TICKETS'}
            </Link>
          </div>

          {/* RIGHT COLUMN: AGENDA */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold uppercase underline decoration-[#B7F346] decoration-2 underline-offset-4">
              AGENDA
            </h2>

            {event.agenda && event.agenda.length > 0 ? (
              <div className="space-y-6">
                {event.agenda.map((day, dayIndex) => (
                  <div key={dayIndex} className="space-y-4">
                    {/* Day Header */}
                    <div className="flex items-center gap-2">
                      <span className="text-[#B7F346]">■</span>
                      <h3 className="text-xl font-bold text-[#B7F346]">
                        {`{${day.day}}`}
                      </h3>
                    </div>

                    {/* Agenda Items */}
                    <div className="space-y-3 ml-6">
                      {day.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="inline-block bg-[#B7F346] text-black px-3 py-1 text-xs font-bold rounded pixelated-button">
                              {item.timePeriod}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 ml-2">
                            <span className="text-[#B7F346] mt-1">■</span>
                            <p className="text-[#B7F346]">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-[#B7F346]">No agenda available.</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
