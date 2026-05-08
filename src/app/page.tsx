import { HeroSequence } from "@/components/hero/HeroSequence";
import { Collections } from "@/components/landing/Collections";

export default function Home() {
  return (
    <div className="relative flex flex-col -mt-16 md:-mt-20 bg-background">
      <HeroSequence />
      <Collections />
    </div>
  );
}
