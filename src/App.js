import logo from './logo.svg';
import './App.css';
import FoodItems from './food-items/FoodItems';
import { useSelector, useDispatch } from 'react-redux';
import { selectCountry } from './Redux/action';
import { useEffect, useState } from 'react';
import Pagination from './Pagination/Pagination';

function App() {
  const items = [
    'Fast Delivery',
    'New On Swiggy',
    'Rating 4.0+',
    'Non Veg',
    'Veg',
    'Offers',
    'Rs.300 - Rs.600',
    'Less Than Rs.300'
  ];

  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  const [sort, setSort] = useState('asc');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData().catch((error) => console.error('Error fetching data:', error));

    getCategories();
  }, []);

  useEffect(() => {
    console.log(loading);
  }, [loading]);
  useEffect(() => {
    console.log(sort);
  }, [sort]);

  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);

  const getData = async () => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
      .then((response) => response.json())
      .then((data) => {
        setFilter(data.meals);
        setLoading(false);
      });
  };

  const getCategories = async () => {
    await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories);
        console.log(data.categories);
      });
  };

  const handleFilter = (filter) => {
    dispatch(selectCountry(filter));
    setFilterOpen(false);
  };
  return (
    <div className='App h-[100vh]'>
      <header className='header shadow-md	'>
        <div class='header_image w-6/12'>
          <img src='https://startuparticle.com/wp-content/uploads/2019/11/swiggy-2.jpg' />
        </div>
        <div className='header_searchbar' class='w-6/12'>
          {/* <input placeholder='Search Items ' /> */}

          <form class='w-full'>
            <label
              for='default-search'
              class='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
            >
              Search
            </label>
            <div class='relative'>
              <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                <svg
                  class='w-4 h-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='search'
                id='default-search'
                class='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search Fooditems.....'
                required
              />
              {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
            </div>
          </form>
        </div>
      </header>

      <section style={{ height: 'max-content', minHeight: '100vh' }}>
        <div class='filter-section  flex mt-4 ms-6 me-4'>
          <button
            type='button'
            style={{ position: 'sticky' }}
            onClick={() => setFilterOpen(!filterOpen)}
            class='flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            filters
            <div class='ms-2'>
              <svg
                class='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path d='M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z' />
              </svg>
            </div>
            {/* {filterOpen && (
              <div class="filter-dropdown shadow-lg">
                {filter?.map((item, index) => (
                  <div
                    class="filter-item"
                    style={{
                      color:
                        selectedCountry === item.strArea ? "blue" : "black",
                    }}
                    onClick={() => handleFilter(item.strArea)}
                  >
                    {item.strArea}
                  </div>
                ))}
              </div>
            )} */}
          </button>
          <button
            onClick={() => {
              sort == 'asc' ? setSort('desc') : setSort('asc');
            }}
            type='button'
            class='flex py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
          >
            sortby
            <div class='ms-2'>
              {sort == 'asc' ? (
                <svg
                  class='w-6 h-6 text-gray-800 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m19 9-7 7-7-7'
                  />
                </svg>
              ) : (
                <svg
                  class='w-6 h-6 text-gray-800 dark:text-white'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    stroke='currentColor'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    stroke-width='2'
                    d='m5 15 7-7 7 7'
                  />
                </svg>
              )}
            </div>
          </button>

          {items.map((item, index) => (
            <div key={index} className='item '>
              <button
                type='button'
                class='py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                {item}
              </button>

              {/* {item} */}
            </div>
          ))}
          <div></div>
        </div>

        <div
          className={`transition-[height] duration-1000 delay-550 ease-in-out ${
            filterOpen ? 'max-h-120 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}
        >
          <h5 className='m-4 text-xl font-bold'>Select From The Best Regions</h5>
          <div class='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-100 ms-4 me-4 mt-4 mb-4'>
            {filter?.map((item, index) => (
              <div
                class='filter-item cursor-pointer p-2 border rounded-md text-center'
                style={{
                  color: selectedCountry === item.strArea ? 'white' : 'black',
                  backgroundColor: selectedCountry === item.strArea ? '#cc8c53' : ''
                }}
                onClick={() => handleFilter(item.strArea)}
              >
                {item.strArea}
              </div>
            ))}
          </div>
        </div>

        <div class='w-wide overflow-x-scroll m-3 categories'>
          {/* {open ? (
            <div className="sticky top-0 left-0 bg-white z-10">
              <h5 className="m-4 text-xl font-bold">
                Categories That You Can Select From
              </h5>
            </div>
          ) : (
            ""
          )} */}

          <div className='sticky top-0 left-0 bg-white'>
            <h5 className='m-4 text-xl font-bold'>Categories That You Can Select From</h5>
          </div>
          <div class='flex w-[max-content] '>
            {categories.map((item, index) => (
              <div class='relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-[14rem] m-2 card2 cursor-pointer'>
                <div class='relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-[10rem]'>
                  <img src={item.strCategoryThumb} alt='profile-picture' />
                </div>
                <div class='p-6 text-center'>
                  <h4 class='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
                    {item.strCategory}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <FoodItems loading={loading} setLoading={setLoading} sorting={sort} setSort={setSort} />
        </div>

        <div></div>
      </section>

      <footer class='shadow dark:bg-gray-800 mt-4' style={{marginTop:'50px'}}>
        <footer class='bg-white rounded-lg m-4 dark:bg-gray-200 shadow-2xl'>
          <div class='w-100 flex justify-center'>
            <img
              class='h-[50px]'
              src='https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Swiggy_logo.svg/2560px-Swiggy_logo.svg.png'
            />
          </div>
          <div class='w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between'>
            <span class='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
              © 2024{' '}
              <a href='#' class='hover:underline'>
                Swiggy
              </a>
              . All Rights Reserved.
            </span>
            <ul class='flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  About
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline me-4 md:me-6'>
                  Licensing
                </a>
              </li>
              <li>
                <a href='#' class='hover:underline'>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </footer>
      {/* 
      <div>
        <Pagination/>
      </div> */}
    </div>
  );
}

export default App;
