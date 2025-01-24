import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaCampground, FaUser, FaQuoteLeft, FaStar } from "react-icons/fa";
import "swiper/swiper-bundle.css";
import useFeedbacks from "../../hooks/useFeedbacks";

const Feedback = () => {
  const feedbacks = useFeedbacks();

  return (
    <div className="px-4 lg:px-8 py-16 bg-gradient-to-br from-blue-50 to-blue-200">
      <h2 className="text-4xl font-bold text-center text-blue-700 mb-12">
        Participants Feedback
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Pagination, Autoplay]}
      >
        {feedbacks.map((fb) => (
          <SwiperSlide key={fb._id}>
            <div
              className="p-6 rounded-lg shadow-2xl text-white bg-cover bg-center flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2)), url(${fb.image})`,
                height: "450px",
              }}
            >
              <div className="text-white flex flex-row items-center mb-4 gap-3">
                <FaCampground className="text-3xl mb-1 text-yellow-400 animate-bounce" />
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  Camp Name:
                </h3>
                <span className="text-sm font-medium">{fb.campName}</span>
              </div>

              <div className="text-yellow-300 flex flex-row items-center mb-4 gap-3">
                <FaUser className="text-3xl mb-1 animate-pulse" />
                <h4 className="text-lg font-bold uppercase tracking-wide">
                  Participant:
                </h4>
                <span className="text-sm font-medium">
                  {fb.participantName}
                </span>
              </div>

              <div className="text-yellow-400 flex flex-row items-center gap-3">
                <FaStar className="text-3xl mb-1 text-yellow-300 animate-ping" />
                <h4 className="text-lg font-bold uppercase tracking-wide">
                  Rating:
                </h4>
                <span className="text-sm font-semibold">{fb.rating} / 5</span>
              </div>

              <div className="text-gray-200 flex flex-col items-center mb-4 gap-3">
                <FaQuoteLeft className="text-3xl mb-1 text-yellow-300 animate-pulse" />
                <h4 className="text-lg font-bold uppercase tracking-wide">
                  Feedback:
                </h4>
                <span className="italic text-sm">"{fb.feedback}"</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {feedbacks.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No feedbacks available at the moment.
        </p>
      )}
    </div>
  );
};

export default Feedback;
