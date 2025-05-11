import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const freelancers = [
  {
    name: "L Rao",
    email: "[Email is protected for the demo]",
    country: "India",
    jobsCompleted: 2,
    image: "https://i.ibb.co/4f5V7vq/avatar.png",
  },
  {
    name: "test test",
    email: "[Email is protected for the demo]",
    country: "Bangladesh",
    jobsCompleted: 1,
    image: "https://i.ibb.co/4f5V7vq/avatar.png",
  },
  {
    name: "Griffin Mcfarland",
    email: "[Email is protected for the demo]",
    country: "USA",
    jobsCompleted: 1,
    image: "https://i.ibb.co/4f5V7vq/avatar.png",
  },
  {
    name: "Jane Doe",
    email: "[Email is protected for the demo]",
    country: "UK",
    jobsCompleted: 3,
    image: "https://i.ibb.co/4f5V7vq/avatar.png",
  },
];

const FreelancerReviewSlider = () => {
  return (
    <section className=" py-16 px-4 md:px-20 text-center my-4">
      <h2 className="text-3xl font-bold mb-4">
        Most Job Completed Freelancers
      </h2>
      <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
        Our top freelancers have successfully completed thousands of tasks with
        quality and efficiency. Hire the best talent for your micro jobs today!
      </p>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {freelancers.map((freelancer, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 shadow-2xl rounded-lg p-6 my-4">
              <img
                src={freelancer.image}
                alt={freelancer.name}
                className="w-20 h-20 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{freelancer.name}</h3>
              <p className="text-sm text-gray-500">{freelancer.email}</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Country:</span>{" "}
                  {freelancer.country}
                </p>
                <p>
                  <span className="font-medium">Jobs Completed:</span>{" "}
                  {freelancer.jobsCompleted}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FreelancerReviewSlider;
