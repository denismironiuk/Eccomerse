import React, { Suspense } from 'react'
import Categories from '../../components/Categories/Categories'

import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import Slider from '../../components/Slider/Slider'

import styles from './Home.module.css'
import { Await, defer, useLoaderData } from 'react-router-dom'

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

  const{lastAdded,products}=useLoaderData()



  return (
    <div className={styles.home}>
      <Slider slides={slides}  interval={5000} />
      <Suspense>
        <Await resolve={products}> 
        {(loadedProducts)=>(
          <FeaturedProducts data={loadedProducts} type="featured"/>
        )}
        
        </Await>
      </Suspense>
      
      <Categories/>
      <Suspense>
        <Await resolve={lastAdded}> 
        {(loadedLastAdded)=>(
          <FeaturedProducts data={loadedLastAdded} type="Last Added"/>
        )}
        
        </Await>
      </Suspense>
   
     
    </div>
  )
}

export default Home

export async function lastAddedProducts() {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/productLast`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    
    return resData.products
  }
}

export async function loadProducts() {
  const response = await fetch(
    `${process.env.REACT_APP_API_ENDPOINT}/products`
  );
  if (!response.ok) {
  } else {
    const resData = await response.json();
    return resData.products;
  }
}

export async function loader() {
  

  return defer({
    lastAdded:lastAddedProducts(),
    products: loadProducts(),
  });
}
