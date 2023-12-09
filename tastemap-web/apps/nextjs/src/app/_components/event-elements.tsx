import Snowfall from "react-snowfall";

const EventElements = () => {
  return (
    <>
      <Snowfall color="red" snowflakeCount={15} />
      <Snowfall color="green" snowflakeCount={15} />
      <Snowfall color="yellow" snowflakeCount={5} />
    </>
  );
};

export default EventElements;
