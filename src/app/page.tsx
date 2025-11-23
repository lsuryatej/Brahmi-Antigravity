import { HeroSequence } from "@/components/hero/HeroSequence";
import { Collections } from "@/components/landing/Collections";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSequence />
      <Collections />
    </div>
  );
}
