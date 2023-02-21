import React from 'react';
import accepted from '../../assets/accepted.png';

const ThankYou = () => {
    return (
        <div className='text-center mt-5 mb-5 pb-5 fs-2'>
            <img src={accepted} alt="accepted" width={"5%"}/>
            We recieved your message <br/>and will answer you within 2 business days</div>
    )
}

export default ThankYou;