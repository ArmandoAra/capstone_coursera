import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/layout";
import Home from "./pages/Home";
import BookingPage from "./pages/BookingPage";
import ConfirmedBookingPage from "./pages/ConfirmedBookingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/confirmedBooking" element={<ConfirmedBookingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
