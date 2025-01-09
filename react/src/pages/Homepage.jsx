
import Banner from '../components/BannerL';
import About from '../components/About';
import AuctionLatest from '../components/AuctionGrid';
import WhyUs from '../components/WhyUs';
import Acknowledges from '../components/Acknowledges';
import Footer from '../components/FooterL';



function Homepage() {
    return (
        <div >
            <Banner />
            <About></About>
            <AuctionLatest />
            <WhyUs />
            <Acknowledges />
            <Footer />


        </div>
    );
}

export default Homepage;