import React from 'react'
import Image from 'next/image'
import styles from '../styles/Default.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
const Default = () => {
    const [weatherInfo, setWeatherInfo] = useState([])

    const getWeather = async (key, location) => {
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=QzeKute5GSXAOUVQSY3orxdxaa6LoAhV&metric=true`)
        const { data } = res;
        const text = data["Headline"]["Text"]
        const temprature = data["DailyForecasts"][0]["Temperature"]["Maximum"]["Value"]
        const imageNumber = data["DailyForecasts"][0]["Day"]["Icon"]
        const imageText = (imageNumber < 10) ? `0${imageNumber}` : imageNumber
        const image = `https://developer.accuweather.com/sites/default/files/${imageText}-s.png`
        const newWeather = { text, temprature, image, location }
        return newWeather
    }
    const getAllWeather = async () => {
        const a = await getWeather(205617, "jaipur")
        const b = await getWeather(187745, "new delhi")
        const c = await getWeather(206690, "kolkata")
        const d = await getWeather(204842, "mumbai")
        const e = await getWeather(206671, "chennai")
        const newWeather = [a, b, c, d, e]
        setWeatherInfo(newWeather)
    }
    useEffect(() => {
        if (weatherInfo.length === 0) {
            // setWeatherInfo([])
            getAllWeather()
        }
    }, [])
    const WeatherCard = ({ info }) => {
        const { location, temprature, text, image } = info
        return (<div className={styles.weatherCard}>
            <h3 className={styles.locationName}>{location}</h3>
            <p className={styles.temprature}>{temprature}<sup>°C</sup></p>
            <Image src={image} alt={"image"} height={70} width={112} />
            <p className={styles.info}>{text}</p>
        </div>)
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Weather for 5 major cities</h2>
            <div className={styles.weatherCards}>
                {weatherInfo.map((info, index) => { return <WeatherCard key={index} info={info} /> })}
            </div>
        </div>
    )
}

export default Default