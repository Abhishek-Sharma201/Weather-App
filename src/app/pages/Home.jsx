import React from 'react'
import Image from 'next/image'
import './Home.css'
import { backImg1 } from '../utils/constant'

const Home = () => {
    return (
        <div className="Home">
            <div className="card">
                <div className="back">
                    <Image src={backImg1} alt="cardBackImg" priority={true} className="cardBackImg" />
                </div>
                <div className="content">
                    <h1>Location: Your City</h1>
                </div>
            </div>
        </div>
    )
}

export default Home