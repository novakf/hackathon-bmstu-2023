import axios from "axios";
import "./CirularMenuItem.sass";
import { FaArrowRight } from "react-icons/fa";

const CircularMenuItem = ({
  rotation,
  index,
}: {
  rotation: number;
  index: number;
}) => {
  const handleClick = (index: number) => {
    axios
      .post("http://localhost:3001/station", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: index,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div
      className="menu-item"
      style={{
        transform: `rotate(${rotation}deg) translate(175%)`,
      }}
      onClick={() => handleClick(index)}
    >
      <FaArrowRight />
    </div>
  );
};

export default CircularMenuItem;
