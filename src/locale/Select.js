import React from "react";

function Select({ changeLang, className }) {
  const changeLanguage = (e) => {
    changeLang(e.target.value)
  }
  return (
    <select data-te-select-init className={`languageSelect z-50 bg-slate-200 px-6 py-2 shadow-lg font-bold text-[1rem] rounded-full outline-0 ${className} top-3`} onChange={changeLanguage}>
      <option className="bg-slate-300" value="en">
        En
      </option>
      <option className="bg-slate-300" value="ru">
        Ru
      </option>
    </select>
  );
}

export default Select;
