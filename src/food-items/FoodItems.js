import { React, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./foodItems.css";
import Pagination from "../Pagination/Pagination";

function FoodItems({ setLoading, loading, sorting,setSort }) {
  const [mealsCollection, setMeals] = useState([]);
  const [pageData, setDataPagination] = useState([]);
  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  const dispatch = useDispatch();
  const [currentPage, setpage] = useState(1);
  // const [meal, setMeal] = useState([]);
  const myRef = useRef(null);

  function generateRandomStars() {
    return Math.floor(Math.random() * 5) + 1;
  }

  // const style = {
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
  // };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //   useEffect(() => {
  //     fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
  //       .then((response) => response.json())
  //       .then((data) => setMeals(data.meals))
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }, []);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedCountry}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setpage(1)
        setSort('asc')
        paginatedData(data.meals, 5, currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [selectedCountry]);

  useEffect(() => {
    console.log(sorting);

    const sortedData = [...mealsCollection].sort((a, b) => {
      if (sorting == "asc") {
        return a.strMeal.localeCompare(b.strMeal);
      } else {
        return b.strMeal.localeCompare(a.strMeal);
      }
    });

    setMeals(sortedData);
    paginatedData(sortedData, 5, currentPage);
  }, [sorting]);

  useEffect(() => {
    console.log(currentPage);
    paginatedData(mealsCollection, 5, currentPage);
  }, [currentPage]);
  const modalOpener = (name) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => response.json())
      .then((data) => {
        myRef.current = data.meals;
        console.log(data.meals)
        setOpen(!open);
      })
      .catch((error) => console.error("Error fetching data:", error));

    console.log("data needed");
  };

  const generateButtons = () => {
    const numberOfButtons = generateRandomStars();
    const buttons = [];
    for (let i = 0; i < numberOfButtons; i++) {
      buttons.push(
        <button key={i} className="repeat-button">
          <svg
            class="w-6 h-6 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
            style={{ color: "gold" }}
          >
            <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
          </svg>
        </button>
      );
    }
    return buttons;
  };

  const paginatedData = (array, limit, current) => {
    setLoading(true);
    const startIdx = (current - 1) * limit;
    const endIdx = startIdx + limit;
    const currentItems = array.slice(startIdx, endIdx);
    console.log(currentItems);
    setDataPagination(currentItems);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        // <div style={{ width: "100vw", height: "100vh" }}>
        //   <div role="status" class="max-w-sm animate-pulse w-100">
        //     <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        //     <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        //     <span class="sr-only">Loading...</span>
        //   </div>
        // </div>
        <div className="flex items-center justify-center h-[50vh]">
          <div class="hourglassBackground">
      <div class="hourglassContainer">
        <div class="hourglassCurves"></div>
        <div class="hourglassCapTop"></div>
        <div class="hourglassGlassTop"></div>
        <div class="hourglassSand"></div>
        <div class="hourglassSandStream"></div>
        <div class="hourglassCapBottom"></div>
        <div class="hourglassGlass"></div>
      </div>
    </div>
        </div>
      ) : (
        <div className="mt-5">
          <h5 className="m-4 text-xl font-black">
            Select The Best {selectedCountry} Dishes Available{" "}
          </h5>
          <div class=" mt-2 mb-2 ms-4 me-4 grid lg:grid-cols-4 lg:gap-4 md:grid-cols-3 md:gap-4  sm:grid-cols-2 sm:gap-4 ">
            {pageData.map((item) => (
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  onClick={() => modalOpener(item.strMeal)}
                  class="rounded-t-lg"
                  src={item.strMealThumb}
                  alt=""
                />
                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.strMeal}
                    </h5>
                  </a>
                  <div>{generateButtons()}</div>
                </div>
              </div>
            ))}
          </div>
          <div class="flex text-center justify-center align-items-center w-100 m-4">
            <Pagination
              total={mealsCollection.length}
              current={currentPage}
              setpage={setpage}
            />
          </div>
        </div>
      )}

      {/* <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        open modal
      </button> */}
      {open ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            backgroundColor: "rgb(28 10 10 / 50%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="Modal shadow-2xl"
            style={{
              position: "fixed",
              width: "850px",
              height: "400px",
              backgroundColor: "#ffffff",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              "border-radius": "30px",
            }}
          >
            <div class="flex ModalImage">
              <img
                src={myRef.current[0].strMealThumb}
                alt=""
                style={{ borderRadius: "30px", maxHeight: "400px" }}
              />
              <div class="headlineModal p-[30px]">
                <div class="w-[400px] flex justify-between">
                  {
                  myRef.current[0].strCategory == "Vegetarian" ?(
                    <button
                    class="h-[40px] w-[120px] rounded-[30px]"
                    style={{ backgroundColor: "#E9F9EE", color: "#27c653" }}
                  >
                    <span
                      class="rounded-[50%] w-[10px] h-[10px] inline-block me-3"
                      style={{ backgroundColor: "#27c653" }}
                    ></span>
                    Veg
                  </button>
                  ):(
                    <button
                    class="h-[40px] w-[120px] rounded-[30px]"
                    style={{ backgroundColor: "rgb(245 229 208)", color: "rgb(199 121 72)" }}
                  >
                    <span
                      class="rounded-[50%] w-[10px] h-[10px] inline-block me-3"
                      style={{ backgroundColor: "rgb(220 43 43)" }}
                    ></span>
                    Non-Veg
                  </button>
                  )
                  }
                  
                  <button class="closeButton"
                    onClick={() => {
                      setOpen(!open);
                    }}
                  >
                    <svg
                      class="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  </button>
                </div>
                <h5 class="font-bold text-2xl mt-4">
                  {myRef.current[0].strMeal}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 h-[150px] ... w-[400px]">
                  {myRef.current[0].strInstructions.substring(1, 300) + "..."}
                </p>
                <div>
                  <button
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {myRef.current[0].strIngredient1}
                  </button>
                  <button
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {myRef.current[0].strIngredient2}
                  </button>
                  {
                    myRef.current[0].strIngredient3!=""?(
<button
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {myRef.current[0].strIngredient3}
                  </button>
                    ):''
                  }
                  {
                    myRef.current[0].strIngredient4!=""?(
<button
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {myRef.current[0].strIngredient4}
                  </button>
                    ):''
                  }
                  {
                    myRef.current[0].strIngredient5!=""?(
<button
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    {myRef.current[0].strIngredient5}
                  </button>
                    ):''
                  }
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FoodItems;
