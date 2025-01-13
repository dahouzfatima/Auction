import 'bootstrap/dist/css/bootstrap.min.css';

import Banner from '../components/BannerL';
import About from '../components/About';
import AuctionLatest from '../components/AuctionGrid';
import WhyUs from '../components/WhyUs';
import Acknowledges from '../components/Acknowledges';
import Footer from '../components/FooterL';

function Homepage() {
  return (
    <div>
      <div id="banner">
        <Banner />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="auction-latest">
        <AuctionLatest />
      </div>
      <div id="why-us">
        <WhyUs />
      </div>
      <div id="acknowledges">
        <Acknowledges />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
