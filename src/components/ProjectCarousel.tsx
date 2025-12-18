import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";

interface ProjectItem {
  title: string;
  image: string;
  href: string;
  description?: string;
  tooltip?: string;
}

interface ProjectCarouselProps {
  items: ProjectItem[];
  setApi?: (api: CarouselApi | null) => void;
  className?: string;
  showCounter?: boolean;
  mdBasis?: string;
}

export default function ProjectCarousel({
  items,
  setApi,
  className = "w-full",
  showCounter = false,
  mdBasis = "1/2",
}: ProjectCarouselProps) {
  const [api, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(items.length);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(items.length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, items.length]);

  useEffect(() => {
    if (setApi) {
      setApi(api);
    }
  }, [api, setApi]);

  // Initialize tilt effect for cards
  useEffect(() => {
    const tiltCards: HTMLElement[] = Array.from(document.querySelectorAll(".tilt-card"));
    if (tiltCards.length > 0) {
      VanillaTilt.init(tiltCards, {
        speed: 300,
        glare: true,
        "max-glare": 0.1,
        gyroscope: true,
        perspective: 900,
        scale: 0.9,
      });
    }
  }, [items]); // Re-initialize when items change
  return (
    <div className="mt-14">
      <Carousel setApi={setCarouselApi} className={className}>
        <CarouselContent>
          {items.map((item) => (
            <CarouselItem
              key={item.title}
              className={mdBasis ? `md:basis-${mdBasis}` : "md:basis-1/2"}
            >
              <Card className="tilt-card">
                <CardHeader className="p-0">
                  <Link href={item.href} target="_blank" passHref>
                    {item.image.endsWith(".webm") ? (
                      <video
                        src={item.image}
                        autoPlay
                        loop
                        muted
                        className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                        title={item.tooltip}
                      />
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={300}
                        quality={100}
                        className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                        title={item.tooltip}
                      />
                    )}
                  </Link>
                </CardHeader>
                {item.description && (
                  <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                    <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                      {item.description}
                    </CardTitle>
                  </CardContent>
                )}
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {showCounter && (
        <div className="py-2 text-center text-lg text-muted-foreground">
          Video {" "}
          <span className="font-semibold">
            {current} / {count}
          </span>
        </div>
      )}
    </div>
  );
}
