import React from "react";

function Pagination({ total, current, setpage }) {
  console.log(total, "detailsin");
  const itemsPerSection = 5; // Number of items per section
  const numberOfSections = Math.ceil(total / itemsPerSection);
  console.log(numberOfSections, "page");

  const listItems = [];
  for (let i = 1; i <= numberOfSections; i++) {
    listItems.push(
      <li key={i} onClick={() => handlePageclick(i)}>
        <a
          href="#"
          className={`flex items-center justify-center px-3 h-8 leading-tight border ${
            current === i
              ? "text-white bg-blue-500 border-blue-500"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          }`}
        >
          {i}
        </a>
      </li>
    );
  }

  const handleNextPage = () => {
    setpage((current) => Math.min(current + 1, numberOfSections));
  };

  // Handle previous page
  const handlePrevPage = () => {
    setpage((current) => Math.max(current - 1, 1));
  };

  const handlePageclick = (i) => {
    console.log(i);
    setpage(i);
  };

  return (
    <div>
      <nav
        aria-label="Page navigation example no-scrollbar"
        style={{ width: "100vw", overflowX: "auto" }}
      >
        <ul class="inline-flex -space-x-px text-sm">
          <li onClick={() => handlePrevPage()}>
            <button class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </button>
          </li>

          {listItems}

          <li onClick={() => handleNextPage()}>
            <a
              href="#"
              class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              disabled={current.current == numberOfSections ? true : false}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
