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
            <i className="fa-solid fa-bars text-2xl"  onClick={toggleDropdown}></i>
            {isOpen && (
                <div
                    className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
