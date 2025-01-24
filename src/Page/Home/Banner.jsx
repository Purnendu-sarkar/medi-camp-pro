import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./banner.css";

const Banner = () => {
  // Data for the slider
  const stories = [
    {
      image: "https://i.ibb.co.com/0FGQMxS/IMG-3837-1-860x430.jpg",
      title: "Successful Eye Camp",
      description:
        "Over 200 patients received free eye check-ups and treatments.",
    },
    {
      image:
        "https://i.ibb.co.com/87QcSJY/Mpower-COPE-mental-health-awareness-drive-Garware-Institute-scaled.jpg",
      title: "Health Awareness Drive",
      description:
        "Educating 500+ attendees about diabetes prevention and management.",
    },
    {
      image: "https://i.ibb.co.com/mDWN0zf/sny07553-2.jpg",
      title: "Free Vaccination Camp",
      description: "Administered vaccines to over 1,000 children and adults.",
    },
  ];

  return (
    <div className="banner-section">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="swiper-container"
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="banner-slide">
              <img
                src={story.image}
                alt={story.title}
                className="banner-image"
              />
              <div className="banner-content">
                <h2 className="banner-title">{story.title}</h2>
                <p className="banner-description">{story.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
