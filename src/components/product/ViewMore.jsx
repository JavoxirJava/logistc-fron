import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar'
import axios from 'axios';
import { config, getFile, url } from '../api';
import ReactPaginate from 'react-paginate';
import img from '../empty.png';

const ViewMore = ({ lang }) => {
    const [projectIdInfo, setProjectIdInfo] = useState(null)
    const [page, setPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    let projectId = sessionStorage.getItem('projectIdViewMore');

    useEffect(() => {
        getProjectInfo();
    }, [projectId])

    useEffect(() => {
        getProjectInfo();
    }, [lang])

    const getProjectInfo = () => {
        axios.get(`${url}product/project?projectId=${projectId}&lang=${lang}&page=0&size=5`, config)
            .then(res => {
                setProjectIdInfo(res.data.body.object)
                setPage(res.data.body.totalPage)
            })
            .catch((err) => console.log('product/project yulida error!', err))
    }

    const handelPageClick = (event) => {
        const pageNumber = event.selected;
        setCurrentPage(pageNumber)
        axios.get(`${url}product/project?projectId=${projectId}&lang=${lang}&page=${pageNumber}&size=5`, config)
            .then(res => setProjectIdInfo(res.data.body.object))
            .catch(err => console.log('error page: ', err))
    }

    const styles = {
        loading: 'animate-pulse hover:cursor-wait my-3 w-full h-7 bg-sky-200 rounded'
    }

    const searchHandler = e => {
        let data = e.target.value
        !!data ? axios.get(`${url}product/admin/search?userName=${data}&lang=${lang}`, config)
            .then(res => setProjectIdInfo(res.data.body))
            .catch(() => console.log('error'))
            : getProjectInfo();
    }

    return (
        <div className="w-full h-screen background overflow-x-hidden">
            <NavBar lang={lang} />
            <div className='mt-32 flex justify-center w-full'>
                <input
                    type="search"
                    onChange={searchHandler}
                    placeholder='🔍  Search...'
                    className="lg:w-8/12 px-4 h-10 focus:outline-0 border rounded-md"
                />
            </div>
            <div className="product-main flex justify-center items-start overflow-hidden w-full">
                <div className="lg:px-0 md:px-10 lg:py-0 sm:py-5 px-3 mt-8 w-screen lg:w-[90%] overflow-x-auto">
                    <table className="w-full rounded-2xl overflow-hidden text-gray-500">
                        <thead className="text-[1.1rem] text-slate-50 uppercase bg-slate-500">
                            <tr>
                                <th className="px-6 py-3">№</th>
                                <th className="px-6 py-3">Photo</th>
                                <th className="px-6 py-3">Owner</th>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Comment</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">product Count</th>
                                <th className="px-6 py-3">total Weight</th>
                                <th className="px-6 py-3">total Kub</th>
                            </tr>
                        </thead>
                        <tbody className='text-[1rem] text-gray-700 bg-white text-center'>
                            {projectIdInfo ?
                                projectIdInfo.map((item, i) => (
                                    <tr className='border-b transition duration-300 ease-in-out hover:bg-gray-300'>
                                        <th className='px-6 py-5'>{(currentPage * 10) + (i + 1)}</th>
                                        <th className='px-6 py-5 flex justify-center items-center'>
                                            <img
                                                src={item.attachmentId ? getFile + item.attachmentId : img}
                                                className='w-10 h-10 object-cover rounded-full scale-150'
                                                alt="img"
                                            />
                                        </th>
                                        <td className='px-6 py-5'>{item.owner}</td>
                                        <td className='px-6 py-5'>{item.productName}</td>
                                        <td className='px-6 py-5'>{item.comment}</td>
                                        <td className='px-6 py-5'>{item.date}</td>
                                        <td className='px-6 py-5'>{item.productCount}</td>
                                        <td className='px-6 py-5'>{item.totalWeight}</td>
                                        <td className='px-6 py-5'>{item.totalKub}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='9' className='px-4'>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                            <div className={styles.loading}></div>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                    <div className='mt-7 ms-1 mb-20 lg:mb-10'>
                        <ReactPaginate className="navigation"
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={handelPageClick}
                            pageRangeDisplayed={5}
                            pageCount={page}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            nextClassName='nextBtn'
                            previousClassName='prevBtn'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMore