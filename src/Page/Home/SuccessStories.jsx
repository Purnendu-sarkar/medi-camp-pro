import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      name: "Sarah Ahmed",
      feedback:
        "MediCamp changed my life! The medical care and support I received helped me recover from a long-term illness.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "John Doe",
      feedback:
        "I attended a heart checkup camp, and the doctors detected an issue early. Thanks to them, I got timely treatment!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Ayesha Khan",
      feedback:
        "The vaccination camp was so well organized. The staff was friendly, and I got my shots without any hassle!",
      img: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      id: 4,
      name: "Michael Robinson",
      feedback:
        "I was struggling with diabetes, but the free consultation helped me manage my diet and medication better.",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      id: 5,
      name: "Emily Watson",
      feedback:
        "I got a free eye checkup and received prescription glasses. It has changed my daily life significantly!",
      img: "https://randomuser.me/api/portraits/women/38.jpg",
    },
    {
      id: 6,
      name: "David Smith",
      feedback:
        "MediCamp provided mental health counseling, which helped me cope with stress and anxiety. Highly recommended!",
      img: "https://randomuser.me/api/portraits/men/48.jpg",
    },
  ];

  return (
    <>
      <div className="w-full md:w-11/12 mx-auto py-16 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="w-full mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-10">
            Success Stories
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Hear from participants who benefited from our medical camps.
          </p>

          {/* Swiper Slider Section */}
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            className="pb-10"
          >
            {stories.map((story) => (
              <SwiperSlide key={story.id}>
                <div className="bg-white shadow-lg rounded-xl p-6 text-center transition-all duration-300 hover:scale-105">
                  <img
                    src={story.img}
                    alt={story.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                  <p className="text-gray-600 italic">"{story.feedback}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default SuccessStories;
