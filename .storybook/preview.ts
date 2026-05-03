import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    viewMode: "docs",
    backgrounds: {
      default: "canvas",
      values: [
        { name: "canvas", value: "#fafaf9" },
        { name: "surface", value: "#f5f4f2" },
        { name: "white", value: "#ffffff" },
        { name: "dark", value: "#1a1917" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
