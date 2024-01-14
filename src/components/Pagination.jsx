import React, {useState} from 'react';

function Pagination({className, totalPage}) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const totalPages = Math.ceil(totalPage / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={`mr-2 px-3 py-1 rounded focus:outline-none ${
                    i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
            >
                {i}
            </button>
        );
    }

    const displayedItems = [];

    return (
        <div className={className}>
            {displayedItems.map((item) => (
                <div key={item.id}></div>
            ))}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`mr-2 px-3 py-1 rounded focus:outline-none ${
                        currentPage === 1 ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-chevron-double-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                        <path fillRule="evenodd"
                              d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
                    </svg>
                </button>
                {paginationButtons}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-2 px-3 py-1 rounded focus:outline-none ${
                        currentPage === totalPages ? 'bg-gray-300 text-gray-700' : 'bg-blue-500 text-white'
                    }`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708"/>
                        <path fillRule="evenodd"
                              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Pagination;