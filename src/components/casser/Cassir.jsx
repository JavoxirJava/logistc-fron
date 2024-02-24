import NavBar from "../navbar/NavBar"
import { useTranslation } from "react-i18next";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { config, url } from "../api";


const Cassir = ({ changeLanguage, lang }) => {
    const [cassier, setCasseir] = useState(null)
    const [projectId, setProjectId] = useState(null)
    const [userId, setUserId] = useState(null)
    const [productId, setProductId] = useState(null)
    const { t } = useTranslation();

    useEffect(() => {
        getCassier();
        getProject();
    }, [lang])

    // get caser
    const getCassier = () => {
        axios.get(`${url}cashier/all?lang=${lang}`, config)
            .then(res => {
                // console.log(res.data);
                // setCasseir(res.data)
            })
    }

    // get project
    const getProject = () => {
        axios.get(`${url}project/list?lang=${lang}`, config)
            .then(res => setProjectId(res.data.body))
            .catch(() => console.log('error'))
    }

    // get user
    const getUser = id => {
        axios.get(`${url}user/project?projectId=${id}&lang=${lang}`, config)
            .then(res => setUserId(res.data.body))
            .catch(() => console.log('error user id'))
    }

    // get product id
    const getProduct = id => {
        axios.get(`${url}product/list?userId=${id}&lang=${lang}`, config)
            .then(res => setProductId(res.data.body))
            .catch(() => console.log('error user id'))
    }

    return (
        <div>
            <NavBar changeLang={changeLanguage} cassier={'border-b-red-600 border-b text-slate-900'} lang={lang} />
            <div className="background h-screen pt-20  ">
                <div className="md:w-[80vw] w-full mx-auto mt-[1.5rem] ">
                    <div className="flex flex-wrap justify-between">
                        <Modal
                            projectId={projectId}
                            userId={userId}
                            productId={productId}
                            getCassier={getCassier}
                            getUser={getUser}
                            getProduct={getProduct}
                        />
                        <input
                            type="search"
                            placeholder="🔍Search"
                            className="outline-none pl-5 md:w-[40%] w-[80%] border-slate-100 border-2 rounded-md"
                        />
                    </div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th className="px-6 py-3">
                                        #
                                    </th>
                                    <th className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th className="px-6 py-3">
                                        Color
                                    </th>
                                    <th className="px-6 py-3">
                                        Category
                                    </th>
                                    <th className="px-6 py-3">
                                        Price
                                    </th>
                                    <th className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {cassier ?
                                    cassier.map((item, i) => (
                                        <tr className="bg-white ">
                                            <th className="px-6 py-3">
                                                {i + 1}
                                            </th>
                                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.status}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.tranport}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.totalKub}
                                            </td>
                                            <td className="px-6 py-4">
                                                <a href="#" className="font-medium text-blue-600  hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr className="odd:bg-white  even:bg-gray-50 border-b ">
                                            <td colSpan='6' className="text-center py-3">
                                                dfguyasergfiwa
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cassir
