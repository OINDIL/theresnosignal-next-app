import { EventDetail } from "@/components/blocks/event-detail";
import { fetchEventById } from "@/hooks/fetchEvents";
import { notFound } from "next/navigation";

interface EventPageProps {
  params: Promise<{ eventId: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { eventId } = await params;
  const event = await fetchEventById(eventId);

  if (!event) {
    notFound();
  }

  return <EventDetail event={event} />;
}

