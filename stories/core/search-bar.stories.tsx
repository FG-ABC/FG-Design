import type { Meta, StoryObj } from "@storybook/react";
import { SearchBar } from "@/components/core/search-bar";
import React from "react";

const meta: Meta<typeof SearchBar> = {
  title: "Core/SearchBar",
  component: SearchBar,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["debounce", "button"],
    },
    debounceMs: { control: "number" },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const DebounceMode: Story = {
  args: {
    mode: "debounce",
    placeholder: "Search…",
    onSearch: (value) => console.log("search:", value),
  },
};

export const ButtonMode: Story = {
  args: {
    mode: "button",
    placeholder: "Search…",
    buttonLabel: "Search",
    onSearch: (value) => console.log("search:", value),
  },
};

export const Loading: Story = {
  args: {
    mode: "debounce",
    placeholder: "Searching…",
    loading: true,
    onSearch: () => {},
  },
};

export const Disabled: Story = {
  args: {
    mode: "button",
    placeholder: "Search…",
    disabled: true,
    onSearch: () => {},
  },
};

export const Controlled: Story = {
  render: () => {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<string[]>([]);

    const fruits = ["Apple", "Apricot", "Banana", "Blueberry", "Cherry", "Grape", "Mango", "Orange", "Peach", "Pear"];

    function handleSearch(value: string) {
      setQuery(value);
      setResults(
        value.trim()
          ? fruits.filter((f) => f.toLowerCase().includes(value.toLowerCase()))
          : []
      );
    }

    return (
      <div className="flex flex-col gap-3 max-w-sm">
        <SearchBar
          mode="debounce"
          value={query}
          placeholder="Search fruits…"
          onSearch={handleSearch}
          onClear={() => handleSearch("")}
        />
        {results.length > 0 && (
          <ul className="flex flex-col gap-1">
            {results.map((r) => (
              <li key={r} className="text-sm text-[var(--color-base)] px-2 py-1.5 rounded-[var(--radius-sm)] hover:bg-[var(--color-surface)]">
                {r}
              </li>
            ))}
          </ul>
        )}
        {results.length === 0 && query && (
          <p className="text-sm text-[var(--color-subtle)]">No results for "{query}"</p>
        )}
      </div>
    );
  },
};

export const AllModes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-[var(--color-subtle)] uppercase tracking-wide">Debounce mode</p>
        <SearchBar mode="debounce" placeholder="Fires after 300ms idle…" onSearch={(v) => console.log(v)} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-[var(--color-subtle)] uppercase tracking-wide">Button mode</p>
        <SearchBar mode="button" placeholder="Press Search or Enter…" onSearch={(v) => console.log(v)} />
      </div>
    </div>
  ),
};
