import React from "react";

function Select({ changeLang, className }) {
  const changeLanguage = (e) => {
    changeLang(e.target.value)
  }
  return (
    <select data-te-select-init className={`btm2 ${className} right-[2%] top-4`} onChange={changeLanguage}>
      <option className="bg-gray-800" value="en">
        en
      </option>
      <option className="bg-gray-800" value="ru">
        ru
      </option>
    </select>
  );
}

export default Select;
