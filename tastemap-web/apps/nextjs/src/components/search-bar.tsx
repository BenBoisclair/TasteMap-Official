"use client";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "~/utils/useDebounce";

type SearchBarProps<T extends Array<object>> = {
  setFilteredData: Dispatch<SetStateAction<T>>;
  data: T;
};

function SearchBar<T extends Array<object>>({
  data,
  setFilteredData,
}: SearchBarProps<T>) {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    if (debouncedSearch.length > 0) {
      const filtered = data?.filter((node: any) => {
        const searchLower = debouncedSearch.toLowerCase();

        const matchesName = node.name.toLowerCase().includes(searchLower);
        const matchesAbout = node.about.toLowerCase().includes(searchLower);

        return matchesName || matchesAbout;
      });
      setFilteredData(filtered as T);
    } else {
      setFilteredData(data);
    }
  }, [debouncedSearch, data]);

  return (
    <div id="SearchBar" className="px-5">
      <div className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
        <Search size={25} color="gray" />
        <input
          onChange={e => setSearch(e.target.value)}
          value={search}
          className="w-full bg-transparent outline-none ring-0"
          placeholder="Shop name, tags, etc"
        />
      </div>
    </div>
  );
}

export default SearchBar;
