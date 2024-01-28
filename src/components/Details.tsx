import React from 'react'
import clsx from 'clsx'
import style from "../styles.module.scss"
import Image from 'next/image'
function Details({ data, astro, mode }: { data: any, astro: any, mode: string }) {
  const iconURL = '/imgs' + data.current.condition.icon.slice(20)
  return (
    <div className={clsx(`w-full h-full rounded-[30px] flex items-center flex-col md:flex-row px-[1em] gap-5 md:gap-0 py-[2em] ${mode == "light" ? 'bg-[#D9D9D9]' : 'bg-[#444]'}`, mode == "light" ? style.box_shadow_light : style.box_shadow_dark)}>
      {/* block 1 */}
      <div className='w-full md:w-[30%] flex flex-row items-center  md:flex-col items-center justify-around h-full gap-2'>

        <div className='w-1/2 md:w-full flex flex-col items-center'>
          <span className={clsx('text-[4em] font-[700]', mode == "light" ? style.deg_text_dark : style.deg_text_white)}>{data.current.temp_c}&deg;C</span>
          <span className={clsx('text-[1.3em] font-[700]', mode == "light" ? style.deg_text_dark : style.deg_text_white)}>Feels like:
            <span className={`${mode == "light" ? 'bg-[rgba(0,0,0,0.8)]' : 'bg-[rgba(255,255,255,0.8)]'} bg-clip-text`}>{data.current.feelslike_c}&deg;C</span>
          </span>
        </div>
        <div className='flex flex-col md:text-[1.2em] font-[600] gap-5'>
          <div className='flex flex-row items-center gap-3'>
            <Image src={`${mode == "light" ? "/imgs/SunRise.png" : "/imgs/SunRise-white.png"}`} width={35} height={35} alt="Sun Rise" />
            <div className='flex flex-col justify-center'>
              <span>Sun Rise</span>
              <span>{astro.sunrise}</span>
            </div>
          </div>
          <div className='flex flex-row items-center gap-3'>
            <Image src={`${mode == "light" ? "/imgs/SunSet.png" : "/imgs/SunSet-white.png"}`} width={35} height={35} alt="Sun Set" />
            <div className='flex flex-col justify-center'>
              <span>Sun Set</span>
              <span>{astro.sunset}</span>
            </div>
          </div>
        </div>
      </div>

      {/* block 2*/}
      <div className='w-full md:w-[30%] flex flex-col items-center justify-center'>
        <Image src={iconURL} alt="dd" width={200} height={200} />
        <span className='font-[700] text-[2em]'> {data.current.condition.text}</span>
      </div>
      {/* block 3 */}
      <div className='w-full md:w-[40%] grid grid-cols-2 gap-x-0 gap-y-3'>
        {props.map((prop, idx) => {
          const { icon_white, icon_black, name, id, unit } = prop
          return (
            <div className='flex flex-col items-center gap-2 justify-between' key={idx}>
              <Image src={icon_white} alt={name} width={45} height={45} />
              <span className='text-[1.3em] font-[600]'>{data.current[id]}{unit}</span>
              <span className='font-[500]'>{name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
const props = [
  {
    icon_white: '/imgs/humidity-white.png',
    icon_black: '/imgs/humidity-black.png',
    name: 'Humidity',
    id: 'humidity',
    unit: '%'
  },
  {
    icon_white: '/imgs/wind-white.png',
    icon_black: '/imgs/wind-black.png',
    name: 'Wind Speed',
    id: 'wind_kph',
    unit: 'km/h'
  },
  {
    icon_white: '/imgs/pressure-white.png',
    icon_black: '/imgs/pressure-black.png',
    name: 'Pressure',
    id: 'pressure_mb',
    unit: 'hPa'
  },
  {
    icon_white: '/imgs/uv-white.png',
    icon_black: '/imgs/uv-black.png',
    name: 'UV',
    id: 'uv',
    unit: ''
  },

]
export default Details