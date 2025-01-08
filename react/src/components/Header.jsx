import Navbar from "./NavbarL";

export default function Header() {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="w-full  h-[100vh] ">
        {/* Section du texte */}
        <div className="flex lg:flex-row min-[300px]:flex-col items-center justify-between m-5">
        <div className="text-5xl pl-4 w-fit h-fit ">
          Collect and Discover <br />
          our authentic pieces
        </div>
          <img src={'landingArt.jpg'} className=" w-[700px] rounded-full" />
        </div>
      </div>
    </div>
  );
}