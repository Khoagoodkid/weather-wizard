import clsx from 'clsx'
import React from 'react'
import style from "../styles.module.scss"
import moment from 'moment'
function Overview({ data,mode }: { data: any,mode:string }) {
    const [, time] = data.location.localtime.split(" ")
    const date = moment.unix(data.location.localtime_epoch).format("dddd,  DD MMM");
    return (
        <div className={clsx(`w-full h-full rounded-[30px] flex flex-col items-center justify-around p-[2em] ${mode == "light" ? 'bg-[#D9D9D9]':'bg-[#444]'}`, mode=="light" ? style.box_shadow_light : style.box_shadow_dark)}>
            <div className='flex flex-col items-center'>
                <h1 className='text-[2.3em] font-[700] text-center'>{data.location.name}, {data.location.country}</h1>
                <div className='flex items-center gap-3'>
                    <span>Longitude: {data.location.lat}&deg;</span>
                    <span>Longtitude: {data.location.lon}&deg;</span>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <span className='font-bold text-[5em]'>{time}</span>
                <span className='text-[1.2em]'>{date}</span>
            </div>
        </div>
    )
}

export default Overview