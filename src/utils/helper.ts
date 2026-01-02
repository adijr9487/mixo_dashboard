export const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Invalid date";

  const two = (v: number) => v.toString().padStart(2, "0");

  const day = two(date.getDate());
  const month = two(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = two(date.getHours());
  const minutes = two(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

