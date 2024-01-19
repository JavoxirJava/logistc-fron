import React from "react";

function Select({changeLang}) {
    const changeLanguage = (e) => {
        changeLang(e.target.value)
    }
  return (
    <select data-te-select-init className="btm2 relative top-3" onChange={changeLanguage}>
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
