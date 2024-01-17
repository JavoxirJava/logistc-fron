import React, {useEffect, useState} from "react";
import "./product.css";
import ProductCard from "./ProductCard";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import OffcanvasProduct from "./OffcanvasProduct";
import {config, url} from "../api";
import axios from "axios";
import {toast} from "react-toastify";
import Pagination, {bootstrap5PaginationPreset} from "react-responsive-pagination";
import NavBar from "../navbar/NavBar";
import Dropdown from "../Dropdown";

function Product() {
    const [coordinates, setCoordinates] = useState([55.75, 37.57]);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [editOf, setEditOf] = useState(false);
    const [product, setProductObj] = useState(null);
    const [product2, setProductObj2] = useState(null);
    const [products, setProduct] = useState(null);
    const [totalPage, setTotalPage] = useState(2);
    const [pagination, setPagination] = useState(0);
    const [searchBy, setSearchBy] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        getProduct(pagination, 4);
    }, []);

    useEffect(() => {
        if ((pagination - 1) * 4 < 0) setPagination(0);
        else getProduct(Math.floor(pagination - 1), 4);
    }, [pagination]);

    useEffect(() => {
        searchByName();
    }, [searchBy]);

    const openEdit = () => setEditOf(!editOf);

    const handleToggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const handleClick = (e) => {
        const coords = e.get("coords");
        setCoordinates(coords);
        const apiKey = "1248def2-c2d9-4353-90a7-01b7e5703e21";
        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

        fetch(geocodeUrl)
            .then((response) => response.json())
            .then((data) => {
                const address =
                    data.response.GeoObjectCollection.featureMember[0].GeoObject
                        .metaDataProperty.GeocoderMetaData.text;
                sessionStorage.setItem("address", address);
            }).catch((error) => console.error("Xatolik yuz berdi:", error));
    };

    function setObj() {
        return {
            id: product ? product.productId : 0,
            latitude: coordinates[0],
            longitude: coordinates[1],
            address: sessionStorage.getItem("address"),
        };
    }

    function getProduct(page, size) {
        axios.get(`${url}product?page=${page}&size=${size}`, config).then((res) => {
            if (res.data.message === 'success') {
                setTotalPage(res.data.body.totalPage ? res.data.body.totalPage - 1 : 2);
                setProduct(res.data.body.object);
            }
        });
    }

    function addProduct() {
        let data = {...product2, ...setObj()};
        axios.post(`${url}product?userId=${userId}`, data, config)
            .then(() => {
                toast.success("successfully saved product");
                setProductObj2(null);
            }).catch((err) => {
            toast.error("product saved error");
            console.log(err);
        });
    }

    function editProduct() {
        let data = {...product2, ...setObj()};
        console.log(product2);
        axios.put(`${url}product?userId=${userId}`, data, config)
            .then(() => {
                toast.success("successfully Edit product");
                setProductObj2(null);
            }).catch((err) => {
            toast.error("product Edit error");
            console.log(err);
        });
    }

    function searchProduct(e) {
        let text = e.target.value;
        if (text === '') getProduct(pagination, 4);
        else axios.get(`${url}product/admin/search?${searchByName()}=${text}`, config).then(res => {
            if (res.data.body) {
                // eslint-disable-next-line array-callback-return
                if (res.data.body.length > 4) setProduct(res.data.body.map((item, i) => {
                    if (i < 4) return item;
                }))
                else setProduct(res.data.body);
            } else setProduct([]);
        }).catch(err => console.log(err));
    }

    function searchByName() {
        switch (searchBy) {
            case "Product id number":
                return "productIdNumber";
            case "Product status":
                return "productStatus";
            case "User id number":
                return "userIdNumber";
            case "User id":
                return "userId";
            default:
                return "productIdNumber";
        }
    }

    return (
        <>
            <NavBar product={'border-b-red-600 border-b text-slate-900'} />
            <div className="product-main">
                <div className="flex w-full lg:flex-row flex-col lg:h-full h-max">
                    <div className="lg:w-5/12 w-full lg:px-3 md:px-10 px-3 lg:py-0 py-5">
                        <div className="mt-4 flex flex-wrap justify-between">
                            <input
                                type="search"
                                placeholder="🔍 Search id Numnber..."
                                onChange={searchProduct}
                                className="lg:w-9/12 ps-2 h-10 focus:outline-0 border sm:mt-0 mt-2"
                            />
                            <Dropdown setSearchBy={setSearchBy}/>
                        </div>
                        <div className="mt-4 flex flex-wrap justify-between">
                            <button
                                onClick={handleToggleOffcanvas}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded"
                            >
                                Add
                            </button>
                            <span className="me-5 pt-1.5 float-end">
                                Current page: {pagination}
                              </span>
                            {products && products.map((item, i) => (
                                <ProductCard
                                    key={i}
                                    className="mt-5"
                                    openEdit={openEdit}
                                    product={item}
                                    setProductObj={setProductObj}
                                />
                            ))}
                        </div>
                        <div className="pagination-style mt-4">
                            <Pagination
                                {...bootstrap5PaginationPreset}
                                current={pagination}
                                total={Math.floor(totalPage + 1)}
                                onPageChange={setPagination}
                            />
                        </div>
                    </div>
                    <div className="xl:w-7/12 lg:w-8/12 w-full h-full col2 z-0 relative">
                        <YMaps>
                            <Map
                                defaultState={{center: [55.75, 37.57], zoom: 9}}
                                width="100%"
                                height="100%"
                                onClick={handleClick}
                            >
                                <Placemark geometry={coordinates}/>
                            </Map>
                        </YMaps>
                    </div>
                </div>

                <OffcanvasProduct
                    isAdd={true}
                    getProduct={getProduct}
                    setProduct={setProductObj2}
                    product=""
                    handleToggleOffcanvas={handleToggleOffcanvas}
                    isOffcanvasOpen={isOffcanvasOpen}
                    name="Add product"
                    btnName="Save"
                    onSave={addProduct}
                    setUserId={setUserId}
                />
                <OffcanvasProduct
                    isAdd={false}
                    getProduct={getProduct}
                    setProduct={setProductObj2}
                    product={product}
                    handleToggleOffcanvas={openEdit}
                    isOffcanvasOpen={editOf}
                    name="Edit product"
                    btnName="Edit"
                    onSave={editProduct}
                    setUserId={setUserId}
                />
            </div>
        </>
    );
}

export default Product;
