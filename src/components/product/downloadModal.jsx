import { useState } from "react";
import { useTranslation } from "react-i18next";

const DownloadModal = ({ isOpen, projects, closeDown }) => {
  const { t } = useTranslation();
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedValues(prevValues => [...prevValues, value]);
    } else {
      setSelectedValues(prevValues => prevValues.filter(item => item !== value));
    }
  };
  console.log(selectedValues);

  if (!isOpen) return null;
  return (
    <div className="fixed sm:px-0 px-5 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border sm:w-96 w-full shadow-lg rounded-md bg-white">
        <div>
          <div>
            <label
              htmlFor={`start`}
              className="block text-gray-700 text-sm font-bold my-2"
            >
              {t("start")}
            </label>
            <input
              id={`start`}
              placeholder={t("start")}
              type="date"
              className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              htmlFor={`end`}
              className="block text-gray-700 text-sm font-bold my-2"
            >
              {t("end")}
            </label>
            <input
              id={`end`}
              placeholder={t("end")}
              type="date"
              className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <label
            htmlFor={`warehouse`}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t("selectWer")}
          </label>
          <select
            id={`warehouse`}
            className="block w-full p-2 border rounded-md shadow-sm focus:outline-0 mb-4"
            multiple // ko'p qiymatli tanlovni yoqish
            value={selectedValues} // tanlangan qiymatlar
            onChange={handleChange}
          >
            {projects && projects.map((item, i) => (
              <option key={i} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="flex justify-between mt-7">
            <button type="button" onClick={closeDown} className="btm-close">
              {t("close")}
            </button>
            <button
              onClick={() => {
                // closeDown();
              }}
              className="btmn "
            >
              {t("download")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
