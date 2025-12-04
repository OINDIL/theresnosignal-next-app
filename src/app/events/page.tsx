import { EventsList } from "@/components/blocks/events-list";
import { fetchEvents } from "@/hooks/fetchEvents";

export default async function EventsPage() {
    const events = await fetchEvents();

    return <EventsList events={events} />;
}