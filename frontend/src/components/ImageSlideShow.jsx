import React from "react";
import Slider from "react-slick";
import FirstImage from '../assets/first.jpg';
import SecondImage from '../assets/second.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ImageSlideshow() {
  // slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="max-w-full mx-auto">
        {/* settings props spreads the settings object to the Slider component */}
      <Slider {...settings}>
        <div>
          <img src={FirstImage} alt="First" className="w-full h-full object-cover"/>
        </div>
        <div>
          <img src={SecondImage} alt="Second" className="w-full h-full object-cover" />
        </div>
      </Slider>
    </div>
  );
}

export default ImageSlideshow;
