import NavBar from "../navbar/NavBar"
import { useTranslation } from "react-i18next";
import Modal from "./Modal";


const Cassir = ({ changeLanguage, lang }) => {
    const { t } = useTranslation();

    return (
        <div>
            <NavBar changeLang={changeLanguage} cassier={'border-b-red-600 border-b text-slate-900'} lang={lang} />
            <div className="background h-screen pt-20  ">
                <div className="md:w-[80vw] w-full mx-auto mt-[1.5rem] ">
                    <div className="flex flex-wrap justify-between">
                        <Modal />
                        <input
                            type="search"
                            placeholder="🔍Search"
                            className="outline-none pl-5 md:w-[40%] w-[80%] border-slate-100 border-2 rounded-md"
                        />
                    </div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td class="px-6 py-4">
                                        Silver
                                    </td>
                                    <td class="px-6 py-4">
                                        Laptop
                                    </td>
                                    <td class="px-6 py-4">
                                        $2999
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cassir
