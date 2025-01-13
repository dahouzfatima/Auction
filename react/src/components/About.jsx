export default function About() {
    return (
        <div className=" min-[300px]:h-[100vh] md:h-[60vh]  mt-3  min-[300px]:mb-14">
            <div className="flex justify-center items-center  flex-col  md:flex-row lg:flex-row  ">
                
                <img src={'auctionAbout.jpg'} className="w-[400px] sm:w-[500px] h-72 m-10  " />
                <div className="w-[400px] mt-3 text-justify flex flex-col justify-center items-center " >
                    <span className="text-md  leading-relaxed">At AuctionHere, we are passionate art enthusiasts dedicated to connecting artists and collectors through dynamic and exciting auctions. Our platform celebrates the creativity and diversity of artists from around the world, providing a space where their works can be appreciated and acquired by</span>
                    <br></br>
                    <button className="m-4 bg-blue-700 text-zinc-100  p-2 animate-bounce  rounded w-fit">Get Started</button>

                </div>
            </div>
        </div>

    )
}