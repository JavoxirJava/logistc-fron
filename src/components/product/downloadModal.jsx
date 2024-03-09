import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { url, config } from "../api";
import LoadingBtn from "../loading/Loading";

const animatedComponents = makeAnimated();

const DownloadModal = ({ isOpen, projects, closeDown }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState([])
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setOptions(projects ? projects.map(p => {
      return { value: p ? p.id : 0, label: p ? p.name : "" }
    }) : { value: 1, label: t('notfound') })
  }, [projects])

  useEffect(() => {
    setSelectedId(selectedValues && selectedValues.map(i => i.value))
  }, [selectedValues])

  const downloadWereHouse = () => {
    setIsLoading(true)
    let addData = {
      start: document.getElementById('start').value ? document.getElementById('start').value : null,
      end: document.getElementById('end').value ? document.getElementById('end').value : null,
      projectsId: selectedId
    }
    axios.post(`${url}project/download-file`, addData, { ...config, responseType: 'blob' })
      .then((res) => {
        const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        // .${fileExtension} bu kammaentdagilar kerka bulib qolsa quyiladi
        // const fileExtension = prompt("Fayl kengaytmasini kiriting (pdf, doc, docx, xlsx, ...)");
        // const filename = prompt("Name the file you want to download");
        // const fullFilename = `${filename}`;
        a.download = 'logistic.xlsx';
        document.body.appendChild(a);
        a.click()
        closeDown()
        setIsLoading(false);
      })
      .catch(() => {
        closeDown()
        setIsLoading(false);
      })
  }

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
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            onChange={(selectedOptions) => setSelectedValues(selectedOptions)}
          />
          <div className="flex justify-between mt-7">
            <button type="button" onClick={closeDown} className="btm-close ">
              {t("close")}
            </button>
            <button
              onClick={() => {
                downloadWereHouse();
              }}
              disabled={isLoading}
              className={`btmn ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {isLoading ? <LoadingBtn /> : t("download")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
