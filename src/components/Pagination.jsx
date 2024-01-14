import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const range = (start, end) => {
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <nav className="flex justify-center my-4">
            <ul className="pagination">
                {range(1, totalPages).map((page) => (
                    <li key={page} className={`mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} hover:bg-blue-200 cursor-pointer rounded-md px-3 py-1`}>
                        <button onClick={() => onPageChange(page)}>{page}</button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
