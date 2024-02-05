import React from 'react';
import empty from "./empty.png";

function Empty() {
    return (
        <div className='w-full flex justify-center items-center  h-[60vh]'>
            <img src={empty} alt="Empty" className="d-block w-44"/>
        </div>
    );
}

export default Empty;