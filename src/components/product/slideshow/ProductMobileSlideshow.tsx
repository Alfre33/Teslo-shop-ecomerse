"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import React from "react";
import { ProductImageComponent } from "../product-image/ProductImage";

interface Props {
  images: string[];
  title: string;
  className?: string;
}
export const ProductMobileSlideshow = ({ title, className, images }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        spaceBetween={10}
        pagination
        autoplay={{
          delay: 3000,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.length > 0 ? (
          images.map((img) => (
            <SwiperSlide key={img}>
              {" "}
              <ProductImageComponent
                src={img}
                alt={title}
                width={300}
                height={300}
                className="object-fill rounded"
              />{" "}
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide key="default">
            {" "}
            <ProductImageComponent
              src={""}
              alt="Imagen por defecto"
              width={300}
              height={300}
              className="object-fill rounded"
            />{" "}
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};
