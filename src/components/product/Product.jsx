import React from 'react';
import './product.css';

function Product() {
    return (
        <div className='product-main'>
            <div className="flex w-full row h-full">
                <div className='w-4/12 h-full col1 px-3'>
                    <input type='search' placeholder="🔍 Search id Numnber..." className='w-10/12 ps-2 h-10 focus:outline-0 border'/>

                </div>
                <div className='w-10/12 h-full col2'>

                </div>
            </div>
        </div>
    );
}

export default Product;