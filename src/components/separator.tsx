export default function Separator({
  orientation,
}: {
  orientation: "vertical" | "horizontal";
}) {
  return (
    <div
      className={`bg-slate-500 ${
        orientation === "vertical" ? "w-px h-full" : "h-px w-full"
      }`}
    />
  );
}
