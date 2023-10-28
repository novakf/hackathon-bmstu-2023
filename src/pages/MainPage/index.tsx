import React, { useEffect, useState } from "react";
import SpaceCraft from "../../icons/SpaceCraft";
import styled from "styled-components";
import Tooltip from "../../Components/MainPage/ToolTip";

const MainPage: React.FC = () => {
  const [positionX, setPositionX] = useState(-100);
  const [positionY, setPositionY] = useState(-100);
  const [rotateDeg, setRotateDeg] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      console.log(e.key);
      if (e.key === "ArrowLeft") {
        setPositionX((prev) => (prev += 10));
        setRotateDeg(-90);
      }
      if (e.key === "ArrowRight") {
        setPositionX((prev) => (prev -= 10));
        setRotateDeg(90);
      }
      if (e.key === "ArrowUp") {
        setPositionY((prev) => (prev += 10));
        setRotateDeg(0);
      }
      if (e.key === "ArrowDown") {
        setPositionY((prev) => (prev -= 10));
        setRotateDeg(180);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <Container>
      <Title>Route map</Title>
      <InfoContainer>
        <CoordinatesTitle>Coordinates</CoordinatesTitle>
        <Coordinates>
          <div>Lat: -13.29414°</div>
          <div>Lon: -10.92728°</div>
        </Coordinates>
      </InfoContainer>
      <Layout positionx={positionX} positiony={positionY}>
        <Tooltip title={<div>SpaceCraft</div>}>
          <ModelContainer rotateDeg={rotateDeg}>
            <SpaceCraft />
          </ModelContainer>
        </Tooltip>
      </Layout>
      <MapInfo>
        Map scale:
        <SizeLine />
        <MapSize>210km</MapSize>
      </MapInfo>
    </Container>
  );
};

const SizeLine = styled.div`
  border-bottom: 2px solid;
  border-right: 2px solid;
  border-left: 2px solid;
  width: 80px;
  height: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 15px;
`;

const MapInfo = styled.div`
  display: flex;
  justify-content: center;
`;

const MapSize = styled.div`
  display: flex;
`;

const Coordinates = styled.div`
  text-align: justify;
`;

const CoordinatesTitle = styled.div`
  font-size: 18px;
`;

const InfoContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  background: #00000069;
  width: 150px;
  margin-bottom: 455px;
  margin-left: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 5px;
  font-size: 14px;
  text-align: justify;
  color: #f5f5f5d6;
  padding-left: 20px;

  &:hover {
    background: #000;
  }
`;

const Title = styled.div`
  font-size: 35px;
`;

const ModelContainer = styled.div<{ rotateDeg: number }>`
  width: 40px;
  transform: rotate(${(props) => props.rotateDeg}deg);
  transition: transform 0.3s;
  cursor: pointer;
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
