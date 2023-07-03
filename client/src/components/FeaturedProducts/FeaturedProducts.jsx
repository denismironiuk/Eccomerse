import React from "react";
import Card from "../Card/Card";
import styles from "./FeaturedProducts.module.css";
import useFetch from "../../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { Link } from "react-router-dom";
import LoadingSpinner from "../UI/LoadingSpinner";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(`/products`);

 console.log(data)

  return (
    <section className={styles.featuredProducts}>
      <div className={styles.top}>
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>

      <div className={styles.swiperContainer}>
        {loading ?(<LoadingSpinner/>):( <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
        >
          {data?.map((item) => (
           
            <SwiperSlide key={item._id}    style={{ width: "25%", height: "auto", margin: "0 auto" }}>
              <Link to={`/product/${item.category.categoryName}/${item.subcategory.subcategoryName}/${item._id}`}>
                <img src={item.image} alt="" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>)}
       
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default FeaturedProducts;