import Dashboard from "../../pages/dashboard";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import Login from "../../pages/login";
import Signup from "../../pages/signup";
import AppointmentHistory from "../../pages/appointmenthistory";
import Booking from "../../pages/bookingpage";
import RescheduleAppointment from "../../pages/rescheduleappointment";
import ServicesPage from "../../pages/services";
import DemographicForm from "../../pages/demographicdetails";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Labreport from "../../pages/labreport";




const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [location]); 

  return null; 
};

const Layout = ({ children }) => {
  const location = useLocation();
  // console.log(location);
  const hideHeaderFooter = ["/login", "/signup", "/"].includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
};


Layout.propTypes = {
  children: PropTypes.node, 
};

const RoutesManager = () => {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reschedule/:id" element={<RescheduleAppointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/appointments" element={<AppointmentHistory />} />
            <Route path="/appointment/:id" element={<Booking />} />
            <Route path="/services" element={<ServicesPage/> } /> 
            <Route path="/demographics" element={<DemographicForm/> } />
            <Route path="/report" element={<Labreport />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default RoutesManager;