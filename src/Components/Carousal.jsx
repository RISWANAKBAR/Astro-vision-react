import React, { useState, useEffect } from "react";

export default function Carousal() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch("http://127.0.0.1:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        if (data.users) {
          setUsers(data.users);
          setMessage(data.message);
        } else {
          setMessage("Error fetching data");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data");
      });
  }, []);

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      imageUrl:
        "https://img.freepik.com/free-photo/business-silhouettes_1098-18436.jpg?size=626&ext=jpg&ga=GA1.1.1953163554.1665137541&semt=ais",
      heading: "Partner webinar series",
      subheading: "Cofee conversation for thought leaders",
    },
    {
      imageUrl:
        "https://img.freepik.com/free-photo/silhouette-people-city_23-2149211283.jpg?size=626&ext=jpg&ga=GA1.1.1953163554.1665137541&semt=ais",
      heading: "Partner webinar series",
      subheading: "Cofee conversation for thought leaders",
    },
    {
      imageUrl:
        "https://img.freepik.com/free-photo/before-conference_1098-637.jpg?size=626&ext=jpg&ga=GA1.1.1953163554.1665137541&semt=ais",
      heading: "Partner webinar series",
      subheading: "Cofee conversation for thought leaders",
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  const handlePrevSlide = () => {
    const newIndex = (activeSlide - 1 + slides.length) % slides.length;
    handleSlideChange(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = (activeSlide + 1) % slides.length;
    handleSlideChange(newIndex);
  };

  return (
    <>
      <nav className="border-gray-200 bg-black">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-thin whitespace-nowrap text-white">
              Astro <span className="font-bold">Vision</span>
            </span>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-small flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-6  rtl:space-x-reverse md:mt-0 md:border-0  md:bg-black  ">
              <li>
                <a
                  href="/login"
                  className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:text-white md:p-0 transition duration-300 hover:text-red-500"
                  aria-current="page"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:text-white md:p-0 transition duration-300 hover:text-red-500"
                  aria-current="page"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="block py-2 px-3 text-white text-sm rounded md:bg-transparent md:text-white md:p-0 transition duration-300 hover:text-red-500"
                  aria-current="page"
                >
                  dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="relative w-full">
        <div className="relative h-screen overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`${
                index === activeSlide ? "block" : "hidden"
              } transition-transform duration-700 ease-in-out`}
              data-carousel-item
            >
              <div
                className="absolute w-full h-full"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "50vh",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 rtl:space-x-reverse">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-8 md:w-12 h-1 md:h-1 rounded-full ${
                index === activeSlide ? "bg-white" : "bg-gray-400"
              } focus:outline-none`}
              aria-current={index === activeSlide}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSlideChange(index)}
              data-carousel-slide-to={index}
            ></div>
          ))}
        </div>

        <button
          type="button"
          className="absolute top-1/2 left-2 z-30 flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-white text-red-500 focus:outline-none ml-2 md:ml-8"
          data-carousel-prev
          onClick={handlePrevSlide}
        >
          &lt;
        </button>

        <button
          type="button"
          className="absolute top-1/2 right-2 z-30 flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-white text-red-500 focus:outline-none mr-2 md:mr-8"
          data-carousel-next
          onClick={handleNextSlide}
        >
          &gt;
        </button>
      </div>

      <div className="relative flex flex-col items-center mt-20">
        <h2 className="text-2xl font-semibold mb-4">User Profiles</h2>

        <div className="flex flex-wrap justify-center gap-16">
          {users.map((users, index) => (
            <div key={index} className="max-w-xs mx-2 mb-4 ">
              <div className="bg-white shadow-xl rounded-lg py-3">
                <div className="photo-wrapper p-2">
                  <img
                    className="w-32 h-32 rounded-full mx-auto px-gap-12"
                    src={users.imageSrc}
                    alt="images"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                    {users.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
