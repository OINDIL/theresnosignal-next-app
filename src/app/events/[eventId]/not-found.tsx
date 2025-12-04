import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 dark:text-[#B7F346]">
        Event Not Found!
      </h1>
      <p className="text-muted-foreground mb-8 text-center">
        The event you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/events"
        className="inline-flex items-center justify-center px-8 py-4 bg-[#B7F346] text-black font-bold uppercase hover:bg-[#9dd832] transition-colors"
      >
        Back to Events
      </Link>
    </div>
  );
}

