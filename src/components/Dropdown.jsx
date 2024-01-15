import React, {useState} from 'react';
import {Link} from "react-router-dom";

const Dropdown = ({setSearchBy}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = (e) => {
        setSearchBy(e.target.innerText);
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left float-end">
            <button
                onClick={toggleDropdown} type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Search by
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleDropdown}
                              role="menuitem">
                            Product id number
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            Product status
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            User id number
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            User id
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
