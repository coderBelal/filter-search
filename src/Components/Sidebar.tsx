import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery, setSearchQuery, selectCategory, setSelectCategory, minPrice, setMinPrice, maxPrice, setMaxPrice, setKeyword
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [Keyword] = useState<string[]>([
    "Apple",
    "Watch",
    "Fashion",
    "Trend",
    "Shoes",
    "Shirt",

  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error Fetching products", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseInt(value) : undefined);
  };

  const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseInt(value) : undefined);
  };

  const handleRadioChange = (category: string) => {
    setSelectCategory(category);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  const formatValue = (value: number | undefined) => {
    return value !== undefined && !isNaN(value) ? value.toString() : "";
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">React Store</h1>
      <section>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="Search Products"
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mb-3 mt-5 w-full"
            value={formatValue(minPrice)}
            onChange={handleMinPrice}
            placeholder="min"
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-3 mt-5 mb-3 w-full"
            value={formatValue(maxPrice)}
            onChange={handleMaxPrice}
            placeholder="max"
          />
        </div>
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectCategory === category}
                onChange={() => handleRadioChange(category)}
                className="mr-2 w-[16px] h-[16px]"
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>
        </div>
        {Keyword.map((keyword, index) => (
          <button
            key={index}
            onClick={() => handleKeyword(keyword)}
            className="block mb-2 px-4 py-2 w-full bg-slate-300 text-left rounded hover:bg-gray-200"
          >
            {keyword.toUpperCase()}
          </button>
        ))}
        <button
          className="w-full mb-[4rem] py-2 rounded bg-black text-white mt-5"
          onClick={handleReset}
        >
          Reset Filter
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
