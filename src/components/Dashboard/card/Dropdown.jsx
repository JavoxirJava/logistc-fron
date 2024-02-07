import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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
      <i className="fa-solid fa-bars text-3xl" onClick={toggleDropdown}></i>
      {isOpen && (
        <div className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={toggleDropdown}
              role="menuitem"
            >
              {t("dropdown6")}
            </Link>
            <Link
              to="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              onClick={toggleDropdown2}
            >
              {t("dropdown5")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
