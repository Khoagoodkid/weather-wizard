"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { countries } from '@/utils/Cities'
import Link from 'next/link'
function SearchBar({mode}: {mode:string}) {
    const [search, setSearch] = useState("")
    const [filteredCities, setFilteredCities] = useState([])
    const filterHandler = (e: any) => {
        const text = e.target.value
        if(!text) {
            setFilteredCities([])
            setSearch('')
            return;
        }
        setSearch(text)
        const filtered: any = []

        countries.map((country) => {
            country.cities.map((city) => {
                if (city.toLowerCase().includes(text.toLowerCase())) filtered.push({
                    city,
                    country: country.country
                })
            })
        })
        // const cities:any = []
        // console.log(Array.isArray(cities))
        // Object.keys(filtered).forEach((f) => {
        //     cities.push(filtered[f])
        // })

        setFilteredCities(filtered)

    }

    return (
        <div className={`relative w-[70%] ${mode=="light" ? 'bg-[#D9D9D9] border-[1px] border-[#000]':'bg-[#444]'} h-[4em] flex items-center px-[1em] rounded-[40px] gap-4 `}>
            <Image src="/imgs/SearchIcon.png" width={25} height={25} alt='Search'
                className='z-[2]'
            />
            <input className={`w-full ${mode=="light" ? 'bg-[#D9D9D9] text-black ':'bg-[#444] text-white '} focus:outline-none z-[2]`}
                placeholder='Search for your preferred city...'
                value={search}
                onChange={filterHandler}
            />
            {filteredCities.length > 0 && <div className={`absolute w-full h-auto ${mode=="light" ? 'bg-[#D9D9D9] text-black ':'bg-[#444] text-white '} opacity-[1] rounded-[40px] left-0 top-[100%] z-[1] `}>
                {filteredCities.slice(0,10).map((c, idx) => {
                    const { city, country } = c;
                    return (
                        <Link 
                        onClick={() => filterHandler("")}
                        href={{
                            pathname: "/weather_tracker",
                            query: {
                                city: city
                            }
                           
                        }} key={idx} className={`w-full flex items-center pl-[2em] py-[.5em]  ${mode=="light" ? 'hover:bg-slate-200 ':'hover:bg-slate-900'}`}>
                            <span>{city}, {country}</span>
                        </Link>
                    )
                })}


            </div>}
        </div>
    )
}

export default SearchBar