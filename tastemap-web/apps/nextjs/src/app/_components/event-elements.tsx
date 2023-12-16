"use client";

import Snowfall from "react-snowfall";

const EventElements = () => {
  return (
    <>
      <Snowfall color="red" snowflakeCount={5} />
      <Snowfall color="green" snowflakeCount={5} />
    </>
  );
};

export default EventElements;
