import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/singleuser/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUserData(data.user);
          setMessage(data.message);
        } else {
          setMessage("Error fetching profile data");
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setMessage("Error fetching profile data");
      });

    fetch(`http://127.0.0.1:8000/api/category/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.category) {
          setCategoryData(data.category);
        } else {
          console.error("Category data not available");
          setCategoryData({ category: "User" });
        }
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
    console.log("userdata", userData.profilePicture);
  }, [id]);

  const handleCategoryClick = () => {
    setShowPopup(true);
  };

  const handleCategorySubmit = () => {
    if (!userData || !userData.id) {
      console.error("User data or user ID not available");
      return;
    }

    const requestData = {
      category_name: selectedCategory,
      user_id: userData.id,
    };

    fetch("http://127.0.0.1:8000/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);
      })
      .catch((error) => {
        console.error("Error sending data to API:", error);
      });

    setShowPopup(false);
  };
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="max-w-xs">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img
              src={userData.profilePicture}
              alt="Profile Picture"
              className="your-image-class"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {userData.name || "John Doe"}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{userData.email || "john.doe@example.com"}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone Number
                  </td>
                  <td className="px-2 py-2">{userData.phoneNumber || "N/A"}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center my-3">
              <p className="text-xs text-gray-500 font-semibold">
                Category: {categoryData.category}
              </p>
            </div>

            <div className="text-center my-3">
              <a
                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                href="#"
                onClick={handleCategoryClick}
              >
                Category
              </a>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-medium mb-4">Select Category</h2>

            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border p-2 mb-2 w-full"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>

            <button
              onClick={handleClosePopup}
              className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600"
            >
              Close
            </button>

            <button
              onClick={handleCategorySubmit}
              className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
