import React from 'react';
import loading from './loading.gif';

const LoadingClient = () => {
  return (
    <div className='w-[100px] h-[44px] rounded-lg overflow-hidden'>
        <img src={loading} className='scale-150 -mt-[1rem] cursor-not-allowed opacity-70' alt="loading" />
    </div>
  )
}

export default LoadingClient