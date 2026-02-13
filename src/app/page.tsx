import { HeroSequence } from "@/components/hero/HeroSequence";
import { Collections } from "@/components/landing/Collections";

export default function Home() {
  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: "url('/images/plain-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeroSequence />
      <Collections />
    </div>
  );
}
