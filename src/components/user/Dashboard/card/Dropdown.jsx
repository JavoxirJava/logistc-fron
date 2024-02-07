import axios from 'axios';
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

const Dropdown = ({pagination, getProduct,setSearchBy, inputDrop, selectDrop}) => {
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
    // function searchProject(e) {
    //     let text = e.target.value;
    //     if (text === "") getProject(pagination, 4);
    //     else
    //       axios
    //         .get(
    //           `${url}project/admin/search?${searchByName()}=${text}&lang=${lang}`,
    //           config
    //         )
    //         .then((res) => {
    //           if (!res.data.body) {
    //             // eslint-disable-next-line array-callback-return
    //            setProject([]);
    //           } else {
    //             if (res.data.body.length > 4)
    //             setProject(
    //               res.data.body.map((item, i) => {
    //                 if (i < 4) return item;
    //               })
    //             );
    //           else setProject(res.data.body);
    //           }
    //         })
    //         .catch((err) => console.log(err));
    //   }
    
    //   function searchByName() {
    //     switch (searchBy) {
    //       case "Product TN code":
    //         return "productIdNumber";
    //       case "Product status":
    //         return "productStatus";
    //       case "Product name":
    //         return "productName";
    //       case "User name":
    //         return "userName";
    //       default:
    //         return "productIdNumber";
    //     }
    //   }

    return (
        <div className="relative inline-block text-left float-end">
            <i className="fa-solid fa-bars text-3xl"  onClick={toggleDropdown}></i>
            {isOpen && (
                <div
                    className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                         onClick={toggleDropdown}
                              role="menuitem">
                             {t('dropdown3')}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown2}>
                            {t('dropdown2')}
                        </Link>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem" onClick={toggleDropdown}>
                             {t('dropdown1')}
                        </Link>
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
