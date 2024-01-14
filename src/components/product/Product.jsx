import React, {useState} from 'react';
import './product.css';
import Dropdown from "../Dropdown";
import ProductCard from "./ProductCard";
import Pagination from "../Pagination";
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import OffcanvasProduct from "./OffcanvasProduct";
import {byId, config, url} from "../api";
import axios from "axios";

function Product() {

    const [coordinates, setCoordinates] = useState([55.75, 37.57]);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [editOf, setEditOf] = useState(false);

    const openEdit = () => setEditOf(!editOf);

    const handleToggleOffcanvas = () => {
        setIsOffcanvasOpen(!isOffcanvasOpen);
    };

    const handleClick = (e) => {
        const coords = e.get('coords');
        setCoordinates(coords);
        const apiKey = '1248def2-c2d9-4353-90a7-01b7e5703e21';

        const geocodeUrl = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${coords[1]},${coords[0]}`;

        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                const address = data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text;
                sessionStorage.setItem("address", address)
            }).catch(error => console.error('Xatolik yuz berdi:', error));
    };

    function setObj(id) {
        return {
            id: id ? id : 0,
            idNumber: byId('idNumber'),
            name: byId('name'),
            measureCount: byId('measureCount'),
            transport: byId('transport'),
            measure: byId('measure'),
            productStatus: byId('productStatus'),
            latitude: coordinates[0],
            longitude: coordinates[1],
            address: sessionStorage.getItem('address')
        }
    }

    function addProduct() {
        const userId = sessionStorage.getItem('userId')
        axios.post(`${url}product?userId=${userId}`, setObj(0), config).then(res => {
            console.log(res)
        });
    }

    return (
        <div className='product-main'>
            <div className="flex w-full row h-full">
                <div className='w-6/12 h-full col1 px-3'>
                    <div className='mt-4'>
                        <input type='search' placeholder="🔍 Search id Numnber..."
                               className='w-9/12 ps-2 h-10 focus:outline-0 border'/>
                        <Dropdown/>
                    </div>
                    <div className='mt-8'>
                        <button onClick={handleToggleOffcanvas}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded">
                            Add
                        </button>
                        <ProductCard className='mt-5' openEdit={openEdit}/>
                        <ProductCard className='mt-5' openEdit={openEdit}/>
                        <ProductCard className='mt-5' openEdit={openEdit}/>
                        <ProductCard className='mt-5' openEdit={openEdit}/>
                    </div>
                    <Pagination className='mt-12'/>

                </div>
                <div className='w-11/12 h-full col2'>
                    <YMaps>
                        <Map
                            defaultState={{center: [55.75, 37.57], zoom: 9}} width="100%" height="100%"
                            onClick={handleClick}>
                            <Placemark geometry={coordinates}/>
                        </Map>
                    </YMaps>
                </div>
            </div>

            <OffcanvasProduct handleToggleOffcanvas={handleToggleOffcanvas} isOffcanvasOpen={isOffcanvasOpen}
                              name="Add product" btnName="Save" onSave={addProduct}/>
            <OffcanvasProduct handleToggleOffcanvas={openEdit} isOffcanvasOpen={editOf} name="Edit product"
                              btnName="Edit"/>
        </div>
    );
}

export default Product;