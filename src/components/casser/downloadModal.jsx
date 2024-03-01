import axios from "axios";
import { useTranslation } from "react-i18next";
import { config, url } from "../api";
import { useState } from "react";
import LoadingBtn from "../loading/Loading";

const DownloadModal = ({ isOpen, closeDown }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)

    if (!isOpen) return null;

    const downloadWereHouse = () => {
        setIsLoading(true)
        let addData = {
            start: document.getElementById('start').value ? document.getElementById('start').value : null,
            end: document.getElementById('end').value ? document.getElementById('end').value : null,
        }
        axios.post(`${url}cashier/download-file`, addData, { ...config, responseType: 'blob' })
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

    return (
        <div className="fixed sm:px-0 px-5 inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="zoom-modal relative top-20 mx-auto p-5 border sm:w-96 w-full shadow-lg rounded-md bg-white">
                <div>
                    <div>
                        <label
                            htmlFor={`start`}
                            className="block text-gray-700 text-sm font-bold my-2"
                        >
                            {t("start")} <span className="text-red-400"><sup>*{t('required')}</sup></span>
                        </label>
                        <input
                            id={`start`}
                            placeholder="Start date"
                            type="date"
                            className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor={`end`}
                            className="block text-gray-700 text-sm font-bold my-2"
                        >
                            {t("end")} <span className="text-red-400"><sup>*{t('required')}</sup></span>
                        </label>
                        <input
                            id={`end`}
                            placeholder={t("end")}
                            type="date"
                            required
                            className="shadow appearance-none border rounded w-full py-2.5 px-4 mb-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-between ">
                        <button type="button" onClick={closeDown} className="btm-close">
                            {t("close")}
                        </button>
                        <button
                            onClick={() => {
                                downloadWereHouse();
                            }}
                            className={`btmn ${isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                            disabled={isLoading}
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
