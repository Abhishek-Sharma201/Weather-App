import React, { useState } from 'react'
import './Subscribe.css'
import { toast } from 'react-toastify';

const Subscribe = () => {
    const [input, setInput] = useState(null);
    const handleInput = (e) => {
        setInput(e.target.value)
    };
    const sendToast = (e) => {
        e.preventDefault();
        setInput(input);
        return toast.info('Subscribed!');
    };

    return (
        <>
            <form className='subscribeComponant' onSubmit={sendToast}>
                <input type='text' value={input} onChange={handleInput} placeholder='name@gmail.com' name='subscriberEmail' required />
                <button type='submit'>Subscribe</button>
            </form>
        </>
    )
}

export default Subscribe