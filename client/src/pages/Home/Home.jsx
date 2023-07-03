import React from 'react'
import Categories from '../../components/Categories/Categories'

import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'

import styles from './Home.module.css'

const slides = [
  {
    image: 'https://images.pexels.com/photos/3951790/pexels-photo-3951790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Slide 1',
  },
  {
    image: 'https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Slide 2',
  },
  {
    image: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Slide 3',
  },
  {
    image: 'https://images.pexels.com/photos/4005033/pexels-photo-4005033.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    caption: 'Slide 3',
  },
];

const Home = () => {
  return (
    <div className={styles.home}>
      <Slider slides={slides}  interval={5000} />
      <FeaturedProducts type="featured"/>
      <Categories/>
      <FeaturedProducts type="trending"/>
     
    </div>
  )
}

export default Home