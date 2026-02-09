import React, { useState,useEffect } from 'react'
import {
  Carousel,
  Image,
} from 'react-bootstrap'

import img1 from '../../assets/carousel/banner_1.jpeg'
import img2 from '../../assets/carousel/banner_2.jpeg'
import img3 from '../../assets/carousel/banner_3.jpeg'
function Carouselcomp() {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  }
  return (
    <>
      <div className='carousel m-0 mb-5 ' >
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <Image src={img1} className='carousel-image' />
            <Carousel.Caption>
              <h3>First slide Label</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rerum, nulla odit doloribus ea atque.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={img2} className='carousel-image ' />
            <Carousel.Caption>
              <h3>First slide Label</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rerum, nulla odit doloribus ea atque.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Image src={img3} className='carousel-image' />
            <Carousel.Caption>
              <h3>First slide Label</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias rerum, nulla odit doloribus ea atque.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  )
}

export default Carouselcomp