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
  const { lastAdded, products, error } = useLoaderData();

 
  return (
    <div className={styles.home}>
      <Slider slides={slides} interval={5000} />
      <Suspense>
        <Await resolve={products}>
          {(loadedProducts) => (
            <FeaturedProducts error={error} data={loadedProducts} type="featured" />
          )}
        </Await>
      </Suspense>
      <Categories />
      <Suspense>
        <Await resolve={lastAdded}>
          {(loadedLastAdded) => (
            <FeaturedProducts error={error} data={loadedLastAdded} type="Last Added" />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default Home;

export async function lastAddedProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch last added products. Status: ${response.status}`);
    }

    const resData = await response.json();
    return resData.products;
  } catch (error) {
    console.error('Error fetching last added products:', error.message);
    throw error; // Re-throw the error for the component to handle
  }
}
export async function loadProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products. Status: ${response.status}`);
    }

    const resData = await response.json();
    return resData.products;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error; // Re-throw the error for the component to handle
  }
}

export async function loader() {
  try {
    const lastAddedPromise = lastAddedProducts();
    const productsPromise = loadProducts();

    const [lastAdded, products] = await Promise.all([lastAddedPromise, productsPromise]);

    return {
      lastAdded,
      products,
      error: null,
    };
  } catch (error) {
    console.error('Error loading data:', error.message);
    return {
      lastAdded: null,
      products: null,
      error,
    };
  }
}