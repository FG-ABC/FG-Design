import type { Meta, StoryObj } from "@storybook/react";
import { ImageCarousel } from "@/components/data/image-carousel";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80", alt: "Gym main floor" },
  { src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80", alt: "Gym equipment" },
  { src: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&q=80", alt: "Gym lockers" },
];

const meta: Meta<typeof ImageCarousel> = {
  title: "Data/ImageCarousel",
  component: ImageCarousel,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [(Story) => <div className="w-[640px]"><Story /></div>],
  argTypes: {
    autoplay: { control: "boolean" },
    showThumbnails: { control: "boolean" },
    aspectRatio: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof ImageCarousel>;

export const Default: Story = {
  args: { images: IMAGES },
};

export const NoAutoplay: Story = {
  args: { images: IMAGES, autoplay: false },
};

export const NoThumbnails: Story = {
  args: { images: IMAGES, showThumbnails: false },
};

export const SquareAspect: Story = {
  args: { images: IMAGES, aspectRatio: "1/1" },
};
