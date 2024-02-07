import React, {useState} from 'react';
import {Link} from "react-router-dom";
import { useTranslation } from "react-i18next";


const Dropdown = ({pagination, getProduct, setSearchBy, inputDrop, selectDrop }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleDropdown = (e) => {
        getProduct(pagination, 4);
        setSearchBy(e.target.innerText);
        setIsOpen(!isOpen);
        inputDrop();
      };
    
      const toggleDropdown2 = (e) => {
        getProduct(pagination, 4);
        setSearchBy(e.target.innerText);
        setIsOpen(!isOpen);
        selectDrop();
      };
    

   

    return (
        <div className="relative inline-block text-left float-end">
            <button
                onClick={toggleDropdown} type="button"
                className="inline-flex justify-center w-full rounded sm:mt-0 mt-2 border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                {t("searchBy")}
            </button>

            {isOpen && (
                <div
                    className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                       
                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            {t("dropdown1")}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown2}>
                             {t("dropdown2")}
                        </Link>
                         
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                            {t("dropdown3")}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                             {t("dropdown4")}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
