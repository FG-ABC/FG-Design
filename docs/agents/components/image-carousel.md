# ImageCarousel

Media gallery with a main image and optional thumbnail strip. Supports autoplay, prev/next navigation, and thumbnail-click navigation.

## Minimal example

```tsx
import { ImageCarousel } from "fg-design";

<ImageCarousel
  images={[
    { src: "/gym-1.jpg", alt: "Gym main floor" },
    { src: "/gym-2.jpg", alt: "Gym equipment" },
  ]}
/>;
```

## Props

| Prop               | Type                             | Default  | Notes                                               |
| ------------------ | -------------------------------- | -------- | --------------------------------------------------- |
| `images`           | `{ src: string; alt: string }[]` | required | Ordered list of images                              |
| `autoplay`         | `boolean`                        | `true`   | Auto-advance slides                                 |
| `autoplayInterval` | `number`                         | `4000`   | ms between auto-advances; stops on user interaction |
| `showThumbnails`   | `boolean`                        | `true`   | Renders thumbnail strip below main image            |
| `aspectRatio`      | `string`                         | `"16/9"` | CSS `aspect-ratio` of the main image area           |
