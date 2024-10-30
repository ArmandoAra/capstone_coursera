import React, { useEffect } from "react";
import ConfirmedCard from "../components/confirmation/confirmedCard";

import { getLastItem } from "../data/storage";

const ConfirmedBooking = () => {
  const [bookingData, setBookingData] = React.useState({});

  useEffect(() => {
    const data = getLastItem();
    setBookingData(data);
  }, []);

  return (
    <>
      <ConfirmedCard bookingData={bookingData} />
    </>
  );
};

export default ConfirmedBooking;
