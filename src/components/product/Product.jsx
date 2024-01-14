import React from 'react';
import './product.css';
import Dropdown from "../Dropdown";
import ProductCard from "./ProductCard";

function Product() {
    return (
        <div className='product-main'>
            <div className="flex w-full row h-full">
                <div className='w-5/12 h-full col1 px-3'>
                    <div className='mt-4'>
                        <input type='search' placeholder="🔍 Search id Numnber..."
                               className='w-9/12 ps-2 h-10 focus:outline-0 border'/>
                        <Dropdown/>
                    </div>
                    <div className='mt-8'>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-8 border rounded">
                            Add
                        </button>
                        <ProductCard className='mt-5'/>
                    </div>


                </div>
                <div className='w-10/12 h-full col2'>

                </div>
            </div>
        </div>
    );
}

export default Product;