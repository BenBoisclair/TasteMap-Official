import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div id="SearchBar" className=" px-5">
      <div className="flex w-full items-center gap-2 rounded-3xl bg-neutral px-3 py-2">
        <Search size={20} color="gray" />
        <input
          className="w-full bg-transparent"
          placeholder="Shop name, tags, etc"
        />
      </div>
    </div>
  );
};

export default SearchBar;
