import React, { useEffect, useState } from 'react';
import { useFilter } from './FilterContext';
import { CloudCog, Tally3 } from 'lucide-react';
import axios from 'axios';
import BookCard from './BookCard';

const MainContent: React.FC = () => {
  const { searchQuery, selectCategory, minPrice, maxPrice, keyword } = useFilter();
  const [product, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const itemPerPage = 12;

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setDropdownOpen(false); 
  };

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemPerPage}&skip=${(currentPage - 1) * itemPerPage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios.get(url).then(response => {
      setProducts(response.data.products);

    }).catch(error => {
      console.error("error fetching data", error);
    });
  }, [currentPage, keyword]);

  const getFilterProducts = (): Product[] => {
    let filterProducts = product;

    if (selectCategory) {
      filterProducts = filterProducts.filter((product) => product.category === selectCategory);
    }

    if (minPrice !== undefined) {
      filterProducts = filterProducts.filter(product => product.price >= minPrice);
    }

    if (maxPrice !== undefined) {
      filterProducts = filterProducts.filter(product => product.price <= maxPrice);
    }

    if (searchQuery) {
      filterProducts = filterProducts.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    switch (filter) {
      case "expensive":
        return filterProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filterProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filterProducts.sort((a, b) => b.rating - a.rating);
      default:
        return filterProducts;
    }
  };

  const filterProducts = getFilterProducts();
  const totalProduct = 100; // This should be updated according to your actual total products
  const totalPage = Math.ceil(totalProduct / itemPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = (): number[] => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPage, currentPage + 2);
    
    if (currentPage - 2 < 1) {
      endPage = Math.min(totalPage, startPage + (2 - currentPage));
    }

    if (startPage + 2 > totalPage) {
      startPage = Math.max(1, endPage - (2 - (totalPage - currentPage)));
    }

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(page);
    }

    return buttons;
  };

  return (
    <section className='xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5'>
      <div className='mb-5'>
        <div className='flex flex-col sm:flex-row justify-between items-center'>
          <div className='relative mb-5 mt-5'>
            <button
              className='px-4 py-4 rounded-full flex items-center'
              onClick={handleDropdownToggle}
            >
              <Tally3 className='mr-2' />
              {filter === "all" ? "Filter" : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className='absolute bg-white border rounded mt-2 w-full sm:w-40'>
                <button onClick={() => handleFilterChange("cheap")} className='block px-4 py-2 text-left hover:bg-gray-200'>
                  Cheap
                </button>
                <button onClick={() => handleFilterChange("expensive")} className='block px-4 py-2 text-left hover:bg-gray-200'>
                  Expensive
                </button>
                <button onClick={() => handleFilterChange("popular")} className='block px-4 py-2 text-left hover:bg-gray-200'>
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5'>
          {filterProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
        <div className='flex flex-col sm:flex-row justify-between items-center mt-5'>
          <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='border px-4 py-2 mx-2 rounded-full'>
            Previous
          </button>
          <div className="flex flex-wrap justify-center">
            {getPaginationButtons().map(page => (
              <button 
                key={page} 
                onClick={() => handlePageChange(page)} 
                className={`border px-4 py-2 rounded-full ${page === currentPage ? "bg-black text-white" : ""}`}
              >
                {page}
              </button>
            ))}
          </div>
          <button disabled={currentPage === totalPage} onClick={() => handlePageChange(currentPage + 1)} className='border px-4 py-2 mx-2 rounded-full'>
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;

