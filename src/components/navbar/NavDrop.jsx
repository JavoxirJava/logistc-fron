import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DropdownA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(t("users"));



  const options = [
    { name: t("client"), link: "/client" },
    { name: t("client11"), link: "/managers" }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-5 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {selectedOption}
        <svg
          className="w-5 h-5inset-y-0 right-0 m-auto"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          {options.map((option) => (
            <Link to={option.link}>
              <button
                key={option}
                onClick={() => handleOptionSelect(option.name)}
                className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white"
              >
                {option.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownA;
