import React from 'react'

export const Unsplash = () => {
    const random = 'https://source.unsplash.com/daily'


    return(
    <div className="unsplash">
        
        <img src={random} width="200" alt="unsplash" height="200" className="unsplash-image"/>
    </div>)
    
}