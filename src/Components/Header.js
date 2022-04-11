import Logo from "../Constants/Images/logo.png";
import HeaderIcon from "./HeaderIcon";
import {
  HomeIcon,
  SearchIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <header
      className="flex flex-col sm:flex-row  justify-between 
   h-auto items-center bg-white"
    >
      <div className="inline-flex m-2 ">
        <img className="" src={Logo} width="50px" height="50px" />
        <span className="mt-6 mb-0 text-[20px]">Buchi</span>
      </div>
      <div className="flex flex-grow m-4 justify-evenly max-w-[40%]">
        <HeaderIcon title="Home" Icon={HomeIcon} />
        <HeaderIcon title="Search" Icon={SearchIcon} />
        <HeaderIcon title="Location" Icon={LocationMarkerIcon} />
      </div>
    </header>
  );
};

export default Header;
