import { Footer } from "../components/Footer";
import Logout from "../components/Logout";
import Header from "../components/NavBar";
import Profile from "../components/Profile";
import WishList from "../components/WishList";
import BiddingItems from "../components/BiddingsItems";
import Sidebar from "../components/SideBar";
import { useState } from "react";
import DashboardUser from "../components/DashboardUser";
import MyItems from "../components/MyItems";

export default function Dashboard() {
    const [activeComponent, setActiveComponent] = useState
        ("Dashboard");

    const renderComponent = () => {
        switch (activeComponent) {
            case "Dashboard":
                return <DashboardUser />;
            case "Items":
                return <MyItems></MyItems>    
            case "Profile":
                return <Profile />;
            case "BiddingItems":
                return <BiddingItems />;
            case "Wishlist":
                return <WishList />;
            case "Logout":
                return <Logout />;
            default:
                return <Dashboard />;
        }
    };
    return (
        <>
            <Header></Header>
            <div className="flex min-h-screen justify-center items-center ">
                <div className=" relative flex w-full max-w-5xl border border-gray-300 ">
                    <Sidebar setActiveComponent={setActiveComponent} />
                    <div className="flex-1 p-6 ">{renderComponent()}</div>
                </div>
            </div>

            <Footer></Footer>
        </>
    )
}