import React from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css"
import Navbar from "./NavbarL";

const BannerL = ({ scrollToSection }) => {
  return (
      
      <section className="slider ">
        <Navbar  scrollToSection={scrollToSection} />
        <Carousel variant="dark ">
          <Carousel.Item>
            <img src={'landingArt.jpg'} className="d-block w-100 h-[100vh]" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading text-white ">
                Collect and Discover <br />
                <span>our authentic pieces</span>
                </h5>
                <p className="sub_text text-white">
                     Discover Timeless Masterpieces — Where Art Meets Opportunity.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={'land2.jpg'} className="d-block w-100 h-[100vh]  " alt="Second slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading text-white">
                Collect and Discover <br />
                <span>our authentic pieces</span>
                </h5>
                <p className="sub_text text-white">
                     Discover Timeless Masterpieces — Where Art Meets Opportunity.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={'exhibtion.jpg'} className="d-block w-100 h-[100vh]" alt="Third slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading text-white ">
                Bid and Own Timeless Art <br />
                </h5>
                <p className="sub_text text-white">
                  Discover Masterpieces at Our Exclusive Auctions.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          
        </Carousel>
      </section>
  );
};

export default BannerL;