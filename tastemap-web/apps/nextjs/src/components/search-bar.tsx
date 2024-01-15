import { KeyboardEvent, FC } from "react";
import { Search } from "lucide-react";
import { Tag } from "./tag";

interface SearchBarProps {
  search: string;
  tags?: string[];
  onSearchChange: (search: string) => void;
  onTagChange?: (tags: string[]) => void;
  onTagRemove?: (index: number) => void;
  onEnter?: () => void;
}

const SearchBar: FC<SearchBarProps> = ({
  search,
  tags,
  onSearchChange,
  onTagChange,
  onTagRemove,
  onEnter,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && search.length === 0 && !!tags) {
      event.preventDefault();
      if (onTagRemove) {
        onTagRemove(tags.length - 1);
      }
    }

    if (event.key === "Enter") {
      event.preventDefault();
      onEnter && onEnter();
    }
  };

  return (
    <div id="SearchBar" className="px-5">
      <div className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
        <Search size={25} color="gray" />
        {!!tags &&
          onTagRemove &&
          tags.map((tag, index) => (
            <Tag type="Product" key={index} onClick={() => onTagRemove(index)}>
              {tag}
            </Tag>
          ))}
        <input
          onKeyDown={handleKeyDown}
          onChange={e => onSearchChange(e.target.value)}
          value={search}
          className="w-full bg-transparent outline-none ring-0"
          placeholder="Shop name, tags, etc"
        />
      </div>
    </div>
  );
};

export default SearchBar;
