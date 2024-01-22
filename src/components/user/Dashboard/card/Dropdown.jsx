import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const Dropdown = ({setSearchBy}) => {
    const [isOpen, setIsOpen] = useState(false);

    const {t} = useTranslation()
    const toggleDropdown = (e) => {
        setSearchBy(e.target.innerText);
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block text-left float-end">
            <i className="fa-solid fa-bars text-3xl"  onClick={toggleDropdown}></i>
            {isOpen && (
                <div
                    className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleDropdown}
                              role="menuitem">
                             {t('dropdown1')}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            {t('dropdown2')}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                             {t('dropdown3')}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                             {t('dropdown4')}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
