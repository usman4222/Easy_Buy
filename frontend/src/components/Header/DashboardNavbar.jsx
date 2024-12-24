import { Link } from "react-router-dom";
import { SiSimilarweb } from "react-icons/si";


const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow  g-[#ffffff] shadow-md p-[6px_24px] justify-between items-center ">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              setSidebarOpen(!sidebarOpen);
            }}
            className="block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-200 ease-in-out ${sidebarOpen ? "rotate-90" : ""
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2"></button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-between w-full">
          <h2 className="font-montserrat text-sm font-medium leading-[22px] text-left text-[#727983] hidden md:block md:pl-5 lg:pl-0">
            School Management System V 1.0
          </h2>
          <div className="flex items-center gap-[20px]">
            <span className="text-[#727983] font-montserrat pl-3 text-[13px] md:text-[14px] font-medium leading-[22px]">
              Last login: 19:00:00 - 12/02/2024
            </span>
            <div className="flex gap-5 md:gap-[20px]">
              <div>
                {/* <div
                  className="md:bg-[#F1F5F9] cursor-pointer rounded-full md:p-[10px] flex justify-center items-center relative"
                  onClick={() => setShowModal(true)}
                >
                  <img src="" alt="notification" className="w-10 md:w-auto" />
                  <span className="absolute top-0 right-0  text-white rounded-full text-xs w-5 h-5 flex justify-center items-center"></span>
                </div> */}
              </div>
              <Link to="/">
                <div className="md:bg-[#F1F5F9]  cursor-pointer rounded-full md:p-[10px] flex justify-center items-center">
                  <SiSimilarweb />
                </div>
              </Link>
            </div>
            <div className="w-[1px] h-[52px] rounded-[1px] bg-[#E2E8F0]"></div>
          </div>
        </div>
        {/* <div className="bg-[#ffffff] shadow-md p-[6px_24px] flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="font-montserrat text-sm font-medium leading-[22px] text-left text-[#727983]">
              School Management System V 1.0
            </h2>
          </div>
          <div className="flex items-center gap-[20px]">
            <span className="text-[#727983] font-montserrat text-[14px] font-medium leading-[22px]">
              Last login: 19:00:00 - 12/02/2024
            </span>
            <div className="flex gap-[20px]">
              <div>
                <div
                  className="bg-[#F1F5F9] cursor-pointer rounded-full p-[10px] flex justify-center items-center relative"
                  onClick={() => setShowModal(true)}
                >
                  <img src={notification} alt="notification" />
                  <span className="absolute top-0 right-0  text-white rounded-full text-xs w-5 h-5 flex justify-center items-center"></span>
                </div>
              </div>
              <div className="bg-[#F1F5F9]  cursor-pointer rounded-full p-[10px] flex justify-center items-center">
                <img src={settings} alt="settings" />
              </div>
            </div>
            <div className="w-[1px] h-[52px] rounded-[1px] bg-[#E2E8F0]"></div>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
