import { styled } from "styled-components";
import "./CircularMenu.sass";
import CircularMenuItem from "./CircularMenuItem/CircularMenuItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CircularMenu = () => {
  const degresss = [0, 45, 90, 135, 180, 225, 270, 315];

  const [open, setOpen] = useState<boolean>(true);

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    console.log("handleClickOutside");
    if (ref.current && ref.current.contains(event.target)) {
      console.log("asdf");
      console.log(open);
      console.log(open);
    }
  };

  const handleClick = (index: number) => {
    axios
      .post("http://172.20.10.9:3001/station", {
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

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <R>
      <Container className={"circular-menu " + (open ? "open" : "")} ref={ref}>
        {degresss.map((deg, index) => {
          return <CircularMenuItem rotation={deg} index={index} />;
        })}
        <div  onClick={() => handleClick(8)} style={{color: "white", cursor: "pointer", marginTop: "5px"}}>Stop</div>
      </Container>
    </R>
  );
};

const R = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  z-index: 1000;
  left: 980px;
  top: 120px;
`;

export default CircularMenu;
