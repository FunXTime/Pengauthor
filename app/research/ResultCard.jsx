"use client";

export default function ResultCard({
  title,
  description,
  url,
  thumbnail,
  author,
  timestamp,
  organization
}) {
  organization = organization?.toUpperCase();
  timestamp = new Date(timestamp)
    .toLocaleString("en-US", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short"
    });
  if (!thumbnail) thumbnail = `/thumbnails/research/${organization.toLowerCase()}.png`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-4 rounded-xl border border-edge bg-panel-raised p-4 transition-all hover:bg-panel select-none"
    >
      <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-edge bg-panel">
        {thumbnail && (
          <img
            src={thumbnail}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `/thumbnails/research/${organization.toLowerCase()}.png`;
            }}
          />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-ink">
          {title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-faint">
          {description}
        </p>
        <p className="mt-2 text-xs text-faint">
          {[organization, author, timestamp]
            .filter(Boolean)
            .join(" • ")}
        </p>
      </div>
    </a>
  );
}
