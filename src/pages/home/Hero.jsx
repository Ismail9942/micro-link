import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import img1 from "../../assets/hero/hero-1.jpeg";
import img2 from "../../assets/hero/images.jpeg";
import img3 from "../../assets/hero/pexels-photo-326503.webp";
import img4 from "../../assets/hero/pexels-photo-6804613.jpeg";

const Hero = () => {
  return (
    <>
      <div className=" overflow-hidden">
        <Carousel autoPlay infiniteLoop interval={1000}>
          {/* Slide 1 */}
          <div className="relative">
            <img src={img1} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/30  flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold">
                Explore the Mountains
              </h2>
              <p className="text-lg mt-2">Adventure awaits in every step.</p>
              <button className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200">
                Discover Now
              </button>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="relative">
            <img src={img2} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/30  flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold">
                Journey to the Jungle
              </h2>
              <p className="text-lg mt-2">Feel the wild, breathe the fresh.</p>
              <button className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200">
                Explore More
              </button>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="relative">
            <img src={img3} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/30  flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold">
                Sea Side Escape
              </h2>
              <p className="text-lg mt-2">Calm, clear, and endless.</p>
              <button className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200">
                Book Your Trip
              </button>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="relative">
            <img src={img4} className="w-full object-cover" />
            <div className="absolute inset-0 bg-black/30  flex flex-col justify-center items-center text-white">
              <h2 className="text-3xl md:text-5xl font-bold">
                Urban Eco Adventures
              </h2>
              <p className="text-lg mt-2">Green travel in the city lights.</p>
              <button className="mt-4 px-6 py-2 bg-white text-black rounded hover:bg-gray-200">
                Learn More
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
