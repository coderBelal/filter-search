import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";
import ProductPage from "./Components/ProductPage";
import TopSellers from "./Components/TopSellers";
import PopularBlog from "./Components/PopularBlog";
import MobileWarning from "./Components/MobileWarning"; // Import MobileWarning

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobileDevice = () => {
      setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    };

    checkMobileDevice();


    window.addEventListener('resize', checkMobileDevice);
    return () => window.removeEventListener('resize', checkMobileDevice);
  }, []);

  return (
    <Router>
      {isMobile && <MobileWarning />}
      <div className={`flex h-screen ${isMobile ? 'hidden' : ''}`}>
        <Sidebar />
        <div className="app-content w-full flex flex-wrap justify-between rounded">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
          <div>
            <TopSellers />
            <PopularBlog />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
