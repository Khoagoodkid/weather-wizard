import React, { useRef } from 'react'
import clsx from 'clsx'
import style from "../styles.module.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from 'next/image';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
function HourForecast({ data, mode }: { data: any, mode:string }) {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrows: false,
    dots: false,
    infinite: true,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1279,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const sliderRef = useRef<any>(null);

  const handlePrevBtn = () => {
    sliderRef.current?.slickPrev();
  };
  const handleNextBtn = () => {
    sliderRef.current?.slickNext();
  };
  const hourForecast = data.forecast.forecastday[0].hour.filter((h:any) => {
    return h.time_epoch > data.current.last_updated_epoch
  })

  return (
    <div className={clsx(`w-[870x] h-auto ${mode == "light" ? 'bg-[#D9D9D9]':'bg-[#444]'} rounded-[30px] flex flex-col items-center p-[2em] gap-5`, mode=="light" ? style.box_shadow_light : style.box_shadow_dark)}>
      <h1 className='font-[700] text-[2em] text-center'>Hourly Forecast</h1>
      <div className='flex gap-2 items-center'>
        <a onClick={handlePrevBtn} className={`p-[.5em] bg-slate-900 rounded-[40px] hover:bg-transparent hover:border-[2px] hover:border-slate-900 cursor-pointer text-white`}>
          <FaArrowLeft/>
        </a>
        <a onClick={handleNextBtn} className={`p-[.5em] bg-slate-900 rounded-[40px] hover:bg-transparent hover:border-[2px] hover:border-slate-900 cursor-pointer text-white`}>
          <FaArrowRight/>
        </a>
      </div>

      <div className='w-full'>
        <Slider {...settings} ref={sliderRef}>
          {hourForecast?.map((h: any, idx: number) => {
            return (
              <Item h={h} key={idx} />
            )
          })}
        </Slider>
      </div>

    </div>
  )
}
const Item = ({ h }: { h: any }) => {
  const time = h.time.split(" ")[1]
  const iconURL = '/imgs' + h.condition.icon.slice(20)
  const isDay = time.split(":")[0] >= 6 && time.split(":")[0] <= 17 ? true: false
  return (
    <div className={clsx(`flex flex-col text-white items-center gap-3 py-[1em] rounded-[40px] bg-[#373636] w-[10em]`, 
      isDay ? style.day_bg : style.night_bg
    )}>
      <span className='text-[1.5em] font-[700]'>{time}</span>
      <Image src={iconURL} alt="dd" width={50} height={50} />
      <span className='text-[1.1em] font-[600]'>{h.temp_c}&deg;C</span>

      <span>{h.wind_dir}</span>
      <span>{h.wind_kph}km/h</span>
    </div>
  )
}
export default HourForecast