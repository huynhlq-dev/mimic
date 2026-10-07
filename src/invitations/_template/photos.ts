// Tự nạp mọi ảnh trong ./photos, xếp theo tên file (1, 2, 3 ... 10).
const files = import.meta.glob("./photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export const photos: string[] = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, url]) => url);
