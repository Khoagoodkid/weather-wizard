"use client"
import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import style from "../styles.module.scss"
import axios from 'axios'
import moment from 'moment'
import Image from 'next/image'
import { icons } from '@/utils/Icons'
function DayForecast({ data, dayForecast,mode }: { data: any, dayForecast: any, mode:string }) {
  useEffect(() => {
    console.log(dayForecast)
  
  }, [])
  return (
    <div className={clsx(`w-full h-auto rounded-[30px] flex flex-col items-center px-[1em] py-[1em] gap-5 ${mode == "light" ? 'bg-[#D9D9D9]':'bg-[#444]'}`,mode=="light" ? style.box_shadow_light : style.box_shadow_dark)}>
      <h1 className='text-[2em] font-[700]'>7 days forecast</h1>
      <div className='flex flex-col items-center w-full gap-[0em] pl-[2em]'>
        {dayForecast.length > 0 && dayForecast.map((day: any, idx: number) => {
           const date = moment.unix(day.date_epoch).format("dddd,  DD MMM");
          const iconURL= '/imgs' + day.day.condition.icon.slice(20)
          return (
            <div key={idx} className='flex items-center justify-start  gap-[20%] w-full'>
              <Image src={iconURL} alt="dd" width={50} height={50}/>
              <span className='font-[700]'>{day.day.avgtemp_c}&deg;C</span>
              <span className='font-[700]'>{date}</span>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default DayForecast