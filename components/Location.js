import React from 'react'
import Image from 'next/image'
import styles from '../styles/Default.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Location = ({ data }) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const {location} = data
    const WeatherCard = ({ info }) => {
        const dt = new Date(info["Date"])
        const day = days[dt.getDay()]
        const temprature = info["Temperature"]["Maximum"]["Value"]
        const imageNumber = info["Day"]["Icon"]
        const imageText = (imageNumber < 10) ? `0${imageNumber}` : imageNumber
        const image = `https://developer.accuweather.com/sites/default/files/${imageText}-s.png`
        const text = info["Day"]["IconPhrase"]

        return (<div className={styles.weatherCard}>
            <h3 className={styles.locationName}>{day}</h3>
            <p className={styles.temprature}>{temprature}<sup>°C</sup></p>
            <Image src={image} alt={"image"} height={70} width={112} />
            <p className={styles.info}>{text}</p>
        </div>)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Weather for {location}</h2>
            <div className={styles.weatherCards}>
                {data["DailyForecasts"].map((info, index) => { return <WeatherCard key={index} info={info} /> })}
            </div>
        </div>
    )
}

export default Location