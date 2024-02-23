import NavBar from '../navbar/NavBar'

const ViewMore = ({lang}) => {
    return (
        <div className="w-full h-screen background overflow-x-hidden">
            <NavBar
                product={"border-b-red-600 border-b text-slate-900"}
                lang={lang}
            />
            <div className="product-main">
                <div className="flex lg:flex-row align-center justify-center flex-col lg:h-full h-max pt-20">
                    <div className=" lg:px-3 md:px-10 lg:py-0 sm:py-5 px-1 w-screen lg:w-10/12">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewMore