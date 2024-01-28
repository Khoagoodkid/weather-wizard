"use client"

import SearchBar from "@/components/SearchBar"
import axios from "axios"
import clsx from "clsx"
import { useEffect, useState } from "react"
import style from "../../styles.module.scss"
import ScreenModeToggle from "@/components/ScreenModeToggle"
import Overview from "@/components/Overview"
import Details from "@/components/Details"
import DayForecast from "@/components/DayForecast"
import HourForecast from "@/components/HourForecast"
import Loader from "@/components/Loader"
import Image from "next/image"
import Link from "next/link"
import useGeoLocation from "@/hooks/useGeoLocation"
const Tracker = ({ searchParams }: {
    searchParams: {
        lat?: string,
        lng?: string,
        city?: string
    }
}) => {
    const { lat, lng, city } = searchParams
    const [data, setData] = useState(null);
    const [astro, setAstro] = useState(null)
    const [dayForecast, setDayForecast] = useState(null)
    const [visible, setVisible] = useState(false)
    const [mode, setMode] = useState<"dark" | "light">("dark");
    const location = useGeoLocation()
    useEffect(() => {
        if (!lat && !lng) {
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=7`)
                .then((res: any) => {
                    setData(res.data)
                    const forecast: any = []
                    for (let i = 1; i <= 7; i++) {
                      
                        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=69e781be3f2f446aa0b24547230312&q=${city}&hour=0&unixdt=${res.data.current.last_updated_epoch + 86400 * i}`)
                            .then((res) => {
                                forecast.push(res.data.forecast.forecastday[0])
                            })
                    }
                    const sorted = forecast.sort((a: any, b: any) => {
                        return a.date_epoch < b.date_epoch
                    })
                    setDayForecast(sorted)
                })
            axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=${process.env.API_KEY}&q=${city}&days=7`)
                .then((res) => {
                    setAstro(res.data.astronomy.astro)
                })

        } else {
            axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${lat},${lng}&days=7`)
                .then((res: any) => {
                    setData(res.data)
                    const forecast: any = []
                    for (let i = 1; i <= 7; i++) {
              
                        axios.get(`https://api.weatherapi.com/v1/forecast.json?key=69e781be3f2f446aa0b24547230312&q=${lat},${lng}&hour=0&unixdt=${res.data.current.last_updated_epoch + 86400 * i}`)
                            .then((res) => {
                                forecast.push(res.data.forecast.forecastday[0])
                            })
                    }
                    const sorted = forecast.sort((a: any, b: any) => {
                        return a.date_epoch < b.date_epoch
                    })
                    setDayForecast(sorted)
                })
            axios.get(`https://api.weatherapi.com/v1/astronomy.json?key=${process.env.API_KEY}&q=${lat},${lng}&days=7`)
                .then((res) => {
                    setAstro(res.data.astronomy.astro)
                })
        }

    }, [lat, lng])
    useEffect(() => {
        setVisible(false)
        setTimeout(() => {
            setVisible(true)
        }, 3000)
    }, [data])
    return (
        <div className={clsx(`absolute top-0 left-0 w-full ${mode == "light" ? 'text-black' : 'text-white'}`, mode == "light" ? style.background_light : style.background_dark)}>
            {visible && data && astro && dayForecast ?
                <>
                    <div className="h-[7em] w-full flex items-center gap-10 px-[2em]">
                        <ScreenModeToggle
                            mode={mode}
                            setMode={setMode}
                        />
                        <SearchBar mode={mode}/>
                        <Link href={{
                            pathname: "/weather_tracker",
                            query: {
                                lat: location.coordinates?.lat,
                                lng: location.coordinates?.lng,
                            }
                        }} className={clsx("flex gap-4 px-[2em] text-center justify-center h-[4em] bg-[#4CBB17] items-center rounded-[40px]", mode == "light" ? style.box_shadow_light : style.box_shadow_dark)}>
                            <Image src="/imgs/current-location.png" alt="Current Location" width={30} height={30} />
                            <span className="text-[1.2em] font-[700]">Current Location</span>
                        </Link>
                    </div>
                    <div className="w-full h-auto py-[1em] grid grid-cols-12 px-[5em] gap-6 hidden xl:grid">
                        <div className="col-span-5">
                            <Overview data={data} mode={mode} />
                        </div>
                        <div className="col-span-7">
                            <Details data={data} astro={astro} mode={mode} />
                        </div>
                        <div className="col-span-4">
                            <DayForecast data={data} dayForecast={dayForecast} mode={mode} />
                        </div>
                        <div className="col-span-8">
                            <HourForecast data={data} mode={mode} />
                        </div>
                    </div>

                    <div className="w-full h-auto py-[1em] grid grid-cols-12 px-[2em] gap-6 hidden md:grid xl:hidden">
                        <div className="col-span-6">
                            <Overview data={data} mode={mode} />
                        </div>
                        <div className="col-span-6">
                            <DayForecast data={data} dayForecast={dayForecast} mode={mode} />
                        </div>
                        <div className="col-span-12">
                            <Details data={data} astro={astro} mode={mode} />
                        </div>
                        <div className="col-span-12">
                            <HourForecast data={data} mode={mode} />
                        </div>
                    </div>

                    <div className="w-full h-auto py-[1em] grid grid-cols-12 px-[2em] gap-6 md:hidden">
                        <div className="col-span-12">
                            <Overview data={data} mode={mode} />
                        </div>
                        <div className="col-span-12">
                            <DayForecast data={data} dayForecast={dayForecast} mode={mode} />
                        </div>
                        <div className="col-span-12">
                            <Details data={data} astro={astro} mode={mode} />
                        </div>
                        <div className="col-span-12">
                            <HourForecast data={data} mode={mode} />
                        </div>
                    </div>
                </>
                : (
                    <Loader />
                )
            }
        </div>
    )
}
export default Tracker