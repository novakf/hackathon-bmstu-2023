import React, { useEffect, useState } from "react";
import SpaceCraft from "../../icons/SpaceCraft";
import styled from "styled-components";
import "./styles.module.scss";

const MainPage: React.FC = () => {
  const [positionX, setPositionX] = useState(-100);
  const [positionY, setPositionY] = useState(-100);
  const [rotateDeg, setRotateDeg] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "ArrowLeft") {
        setPositionX((prev) => (prev += 10));
        setRotateDeg(90)
      }
      if (e.key === "ArrowRight") {
        setPositionX((prev) => (prev -= 10));
        setRotateDeg(-90)
      }
      if (e.key === "ArrowUp") {
        setPositionY((prev) => (prev += 10));
        setRotateDeg(180)
      }
      if (e.key === "ArrowDown") {
        setPositionY((prev) => (prev -= 10));
        setRotateDeg(0)
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Container>
      <Title>Route map</Title>
      <Layout positionx={positionX} positiony={positionY}>
        <ModelContainer rotateDeg={rotateDeg}>
          <SpaceCraft />
        </ModelContainer>
      </Layout>
    </Container>
  );
};

const Title = styled.div`
  font-size: 35px;
`;

const ModelContainer = styled.div<{ rotateDeg: number }>`
  width: 40px;
  transform: rotate(${(props) => props.rotateDeg}deg);
  transition: transform 0.3s;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  max-width: 1100px;
  flex-direction: column;
  margin: 0 auto;
`;

const Layout = styled.div<{ positionx: number; positiony: number }>`
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 1100px;
  height: 600px;
  background: url("/src/assets/background1.jpg");
  background-size: 130%;
  background-position-x: ${(props) => `${props.positionx}px`};
  background-position-y: ${(props) => `${props.positiony}px`};
  box-shadow: 0px 10px 10px 0px rgba(129, 129, 129, 0.25);
`;

export default MainPage;
