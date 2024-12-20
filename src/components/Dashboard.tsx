import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Menu from "./Menu Access/Menu";
import VeganMenu from "./Menu Access/VeganMenu";
import GlutenFreeMenu from "./Menu Access/GlutenFreeMenu";
import Feedback from "./Feedback System/Feedback";
import ViewReservations from "./Dining Reservations/ViewReservation";
import ReservationHistory from "./Feedback System/ReservationHistory";

const API_BASE_URL = 'https://appdietary-appdietary-xu5p2zrq7a-uc.a.run.app/DietaryManagement';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("menuAccess");
  const [searchTerm, setSearchTerm] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [feedbackSidebarVisible, setFeedbackSidebarVisible] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [dietaryPreference, setDietaryPreference] = useState<string | null>(null);
  const [dietType, setDietType] = useState<string | null>(null); // State to manage the diet type
  const [showReservationHistory, setShowReservationHistory] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);


  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user && user.email) {
      setUserId(user.email);
      setUserEmail(user.email); // Set the user email to display in the welcome message
      fetchUserPreference(user.email); // Fetch user preference after getting email
    } else {
      setUserId(null); // User is not logged in or email is null
      setUserEmail(null); // Clear the user email if not logged in
    }
  });
  return () => unsubscribe();
}, []);



  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const toggleFeedbackSidebar = () => {
    setFeedbackSidebarVisible(!feedbackSidebarVisible); // Toggle feedback sidebar
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    if (menuVisible) {
      setShowReservationHistory(false);
    }
  };

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleLogoutClick = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("dietType"); // Clear diet type on logout
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  const handleMealCreditsClick = () => {
    navigate("/meal-credits");
  };

  const handleReservationClick = () => {
    navigate("/dining-reservations");
  };

  const handleDietaryClick = () => {
    navigate("/dietary-management");
  };

  const toggleReservationHistory = () => {
    setShowReservationHistory(!showReservationHistory);
  };

  const fetchUserPreference = async (userID: string) => {
    try {
      const response = await axios.get(API_BASE_URL, { params: { userID } });
      const preferences = response.data;

      // Assuming there's only one preference returned
      if (preferences.length > 0) {
        setDietaryPreference(preferences[0].type);
      } else {
        setDietaryPreference(null); // No preference found, show default menu
      }
    } catch (error) {
      console.error("Error fetching dietary preference:", error);
    }
  };

  const renderMenu = () => {
  if (dietaryPreference === "Vegan") {
    return <VeganMenu />;
  } else if (dietaryPreference === "Gluten-Free") {
    return <GlutenFreeMenu />;
  } else {
    return <Menu />;
  }
};


  return (
    <div className="fixed min-h-screen overflow-y-scroll">
      {/* Background Image */}
      <img
        src="wits-white.jpg"
        alt="backgroundImage"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* Navigation Bar */}
      <div className="flex items-center px-5 py-2 bg-transparent fixed top-0 w-full z-10 shadow-md">
        <button
          test-id="menu-button"
          className="text-3xl bg-none border-none cursor-pointer mr-5"
          onClick={toggleMenu}
        >
          &#9776;
        </button>
        <img
          src="/wits-logo.png"
          alt="Wits-Logo"
          onClick={handleLogoutClick}
          className="h-10 cursor-pointer"
        />
        <div className="ml-5 text-blue-900 text-lg font-bold">
          Dining Services
        </div>
        <div className="flex items-center ml-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="border border-gray-300 rounded px-2 py-2 mx-5 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Welcome User Dropdown */}
          <div className="">
            {/* Welcome User */}
            <div className="flex items-center justify-center mb-2 text-blue-900 text-lg font-bold mr-5">
              <span>Welcome {userEmail || "Guest"} </span>
              <img
                src="https://freesvg.org/img/abstract-user-flat-3.png"
                alt="User Icon"
                className="w-6 h-6 mr-2"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Side Menu */}
      <div
        className={`fixed top-0 ${
          menuVisible ? "left-0" : "left-[-275px]"
        } w-[275px] h-full bg-[#0c0d43] shadow-lg transition-all duration-300 z-20`}
      >
        <button
          test-id="close-menu-button"
          className="absolute top-4 right-4 text-2xl bg-none border-none cursor-pointer text-white"
          onClick={toggleMenu}
        >
          &times;
        </button>

        {/* Dashboard Link */}
        <a
          test-id="dashboard-link"
          href="/dashboard"
          className="block text-white text-lg py-2 px-4 bg-[#003080] rounded-md text-center my-12 mx-auto w-11/12 hover:bg-[#0056b3] no-underline"
        >
          Dashboard
        </a>

        {/* Line separator */}
        <div className="w-4/5 h-px bg-gray-300 my-2.5 mx-auto"></div>

        <ul className="list-none pt-7 pb-7 px-7 mt-10">
          <button
            test-id="dietary-management-button"
            className="block text-white text-sm py-2 px-4 bg-[#003080] rounded-md text-center shadow-md w-full mx-auto no-underline hover:bg-[#0056b3] mb-2.5"
            onClick={handleDietaryClick}
          >
            Dietary Management
          </button>

          <button
            test-id="meal-credits-button"
            className="block text-white text-sm py-2 px-4 bg-[#003080] rounded-md text-center shadow-md w-full mx-auto no-underline hover:bg-[#0056b3] mb-2.5"
            onClick={handleMealCreditsClick}
          >
            Meal Credits
          </button>

          <button
            test-id="reservation-button"
            className="block text-white text-sm py-2 px-4 bg-[#003080] rounded-md text-center shadow-md w-full mx-auto no-underline hover:bg-[#0056b3] mb-2.5"
            onClick={handleReservationClick}
          >
            Dining Reservation
          </button>

          <button
            test-id="reservation-history-button"
            className="block text-white text-sm py-2 px-4 bg-[#003080] rounded-md text-center shadow-md w-full mx-auto no-underline hover:bg-[#0056b3] mb-2.5"
            onClick={toggleReservationHistory}
          >
            History
          </button>
        </ul>
        {/* User Email and Logout Button */}
        <div className="absolute bottom-10 left-0 w-full text-center text-white">
          <div className="text-sm mb-2">Logged in as:</div>
          <div className="flex items-center justify-center mb-2">
            <img
              src="https://freesvg.org/img/abstract-user-flat-3.png"
              alt="User Icon"
              className="w-5 h-5 mr-2"
            />
            <span>{userEmail || "Guest"}</span>
          </div>
          <button
            test-id="logout-button"
            onClick={handleLogoutClick}
            className="block text-white text-sm py-2 px-4 bg-[#003080] rounded-md w-4/5 mx-auto hover:bg-[#0056b3]"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Reservation History Side Tab */}
      {showReservationHistory && (
        <div className="fixed top-0 left-[275px] w-[600px] h-full bg-gray-50 shadow-lg transition-transform duration-500 ease-in-out z-[1000] translate-x-0">
          <button
            className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
            onClick={() => setShowReservationHistory(false)}
          >
            &times;
          </button>
          <ReservationHistory />
        </div>
      )}

      {/* Tabs for the Dashboard */}
      <div className="fixed top-36 left-64 flex w-3/4">
        {[
          { label: "Menu Access", value: "menuAccess" },
          { label: "Dining Reservations", value: "diningReservations" },
        ].map((tab) => (
          <button
            key={tab.value}
            className={`flex-1 py-3 px-5 text-black bg-transparent transition-all duration-300 group relative ${
              activeTab === tab.value ? "bg-opacity-20" : ""
            }`}
            onClick={() => openTab(tab.value)}
          >
            <span className="relative z-10">{tab.label}</span>
            <span
              className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2 ${
                activeTab === tab.value ? "w-1/2" : ""
              }`}
            ></span>
            <span
              className={`absolute bottom-0 right-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2 ${
                activeTab === tab.value ? "w-1/2" : ""
              }`}
            ></span>
          </button>
        ))}
      </div>

      {/* Feedback Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[300px] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[1000] p-5 ${
          feedbackSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-xl text-gray-700 hover:text-gray-900"
          onClick={toggleFeedbackSidebar}
        >
          &times;
        </button>
        <h2>Feedback System</h2>
        <Feedback />
      </div>

      {/* Tab Content */}
      <div className="fixed grow bg-transparent border rounded top-64 left-64 w-3/4 p-5 max-h-screen text-black text-center overflow-y-scroll ">
        {activeTab === "menuAccess" && (
          <div className="">
            <h2 className="text-2xl font-bold">Menu Access</h2>
            {renderMenu()}
          </div>
        )}
        {activeTab === "diningReservations" && (
          <div>
            <h2 className="text-2xl font-bold">Upcoming Reservations</h2>
            <ViewReservations userEmail={userEmail} />
          </div>
        )}
      </div>

      {/* Rate the app button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={toggleFeedbackSidebar}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
        >
          {feedbackSidebarVisible ? "Close Feedback" : "Rate the app!"}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
