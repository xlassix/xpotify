import formatDuration from "format-duration";

export const formatSongTime = (duration) => formatDuration(duration * 1000);

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
