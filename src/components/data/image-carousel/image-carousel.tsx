"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageCarouselImage {
  src: string;
  alt: string;
}

export interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImageCarouselImage[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showThumbnails?: boolean;
  aspectRatio?: string;
}

export const ImageCarousel = React.forwardRef<HTMLDivElement, ImageCarouselProps>(
  (
    {
      images,
      autoplay = true,
      autoplayInterval = 4000,
      showThumbnails = true,
      aspectRatio = "16/9",
      className,
      ...props
    },
    ref
  ) => {
    const plugins = autoplay
      ? [Autoplay({ delay: autoplayInterval, stopOnInteraction: true })]
      : [];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, plugins);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    React.useEffect(() => {
      if (!emblaApi) return;
      const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
      emblaApi.on("select", onSelect);
      return () => { emblaApi.off("select", onSelect); };
    }, [emblaApi]);

    const scrollTo = React.useCallback(
      (index: number) => emblaApi?.scrollTo(index),
      [emblaApi]
    );

    const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        <div className="relative overflow-hidden rounded-[var(--radius-lg)]">
          <div
            ref={emblaRef}
            className="overflow-hidden rounded-[var(--radius-lg)]"
          >
            <div className="flex touch-pan-y">
              {images.map((image, i) => (
                <div
                  key={i}
                  className="min-w-0 shrink-0 grow-0 basis-full"
                  style={{ aspectRatio }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-elevated)]/80 text-[var(--color-base)] shadow-[var(--shadow-sm)] backdrop-blur-sm transition-opacity duration-[var(--duration-fast)] hover:bg-[var(--color-elevated)]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-elevated)]/80 text-[var(--color-base)] shadow-[var(--shadow-sm)] backdrop-blur-sm transition-opacity duration-[var(--duration-fast)] hover:bg-[var(--color-elevated)]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {showThumbnails && images.length > 1 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {images.map((image, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}: ${image.alt}`}
                className={cn(
                  "shrink-0 overflow-hidden rounded-[var(--radius-sm)] transition-all duration-[var(--duration-fast)]",
                  "h-14 w-20 ring-2",
                  i === selectedIndex
                    ? "ring-[var(--color-accent-500)] opacity-100"
                    : "ring-transparent opacity-50 hover:opacity-75"
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);

ImageCarousel.displayName = "ImageCarousel";
