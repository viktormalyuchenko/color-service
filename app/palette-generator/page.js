import Generator from "@/components/Generator";

export default function PalettePage() {
  return (
    // h-[calc(100vh-64px)] вычитает высоту шапки (16 * 4 = 64px)
    <div className="h-[calc(100vh-64px)] overflow-hidden">
      <Generator />
    </div>
  );
}
