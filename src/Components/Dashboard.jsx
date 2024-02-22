import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Dashboard() {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
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
    fetch(`http://127.0.0.1:8000/api/category/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.category) {
          setCategoryData(data.category);
        } else {
          console.error("Category data not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching category data:", error);
      });
  }, [userId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Dashboard</h1>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left">
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={index % 2 === 0 ? "even:bg-gray-50" : "odd:bg-white"}
                border-b
              >
                <td className="px-6 py-4">
                  <img
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : "default-profile-picture.jpg"
                    }
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneNumber}</td>

                <td className="px-6 py-4">
                  {categoryData.length > 0 &&
                  categoryData[0].category !== "admin" ? (
                    <span className="text-gray-400">View Profile</span>
                  ) : (
                    <Link
                      to={`/profile/${user.id}`}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View Profile
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
