import React from "react";
import { byId } from "../components/api";

function 
Select({changeLang, className, value}) {

    return (
        <select data-te-select-init
            id="language"
                className={`languageSelect z-50 bg-slate-200 px-6 py-2 shadow-lg font-bold text-[1rem] rounded-full outline-0 fixed top-3`}
                onChange={changeLang}
                value={value}>
                <option selected={false} className="bg-slate-300" value="en">
                    En
                </option>
                <option selected={true} className="bg-slate-300" value="ru">
                    Ru
                </option>
        </select>
    );
}

export default Select;
