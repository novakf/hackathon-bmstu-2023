import React, {useEffect, useState} from "react";
import SpaceCraft from "../../icons/SpaceCraft";
import styled from "styled-components";
import Tooltip from "../../Components/MainPage/ToolTip";
import MapPointIcon from "../../icons/MapPointIcon";
import CircularMenu from "../../Components/CircularMenu/CircularMenu";
import html2canvas from "html2canvas";

const rgbToHex = (r: number, g: number, b: number) =>
  `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;

const MainPage: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [rotateDeg, setRotateDeg] = useState(0);

  const [points, setPoints] = useState([{ x: positionX, y: positionY }]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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

  useEffect(() => {
    setPoints((prev) => [...prev, { x: positionX, y: positionY }]);
  }, [positionX, positionY]);

  useEffect(() => {
    html2canvas((document as any).querySelector("#layout")).then((canvas) => {
      let c = canvas.getContext("2d");

      if (!c) {
        console.log("canvas error");
        return;
      }

      canvas.style.filter = "brightness(4)";

      let posX = 550,
        posY = 300;

      if (rotateDeg === -90) {
        posX = 550 - 60;
        posY = 300;
      }

      if (rotateDeg === 90) {
        posX = 550 + 70;
        posY = 300;
      }

      if (rotateDeg === 0) {
        posX = 550;
        posY = 300 - 70;
      }

      if (rotateDeg === 180) {
        posX = 550;
        posY = 300 + 100;
      }

      var pixelData = c.getImageData(posX, posY, 1, 1).data;
      const [red, green, blue] = pixelData;

      const hexCode = rgbToHex(red, green, blue);

      console.log("Background color:", hexCode);
      // document.body.appendChild(canvas);
    });
  }, [positionX, positionY]);

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
      <Map id="layout">
        <Layout positionx={positionX} positiony={positionY}>
          <Tooltip title={<div>SpaceCraft</div>}>
            <ModelContainer
              positionx={positionX}
              positiony={positionY}
              rotatedeg={rotateDeg}
            >
              <CircularMenu />
              <SpaceCraft />
            </ModelContainer>

            {points.map((point, i) => {
              return (
                <Point
                  key={i}
                  positionx={i === 0 ? point.x + 14 : point.x}
                  positiony={i === 0 ? point.y + 14 : point.y}
                  startpoint={(i === 0).toString()}
                >
                  {i === 0 && <MapPointIcon />}
                </Point>
              );
            })}
          </Tooltip>
        </Layout>
      </Map>
      <MapInfo>
        Map scale:
        <SizeLine />
        <MapSize>210km</MapSize>
      </MapInfo>
    </Container>
  );
};

const Point = styled.div<{
  positionx: number;
  positiony: number;
  startpoint: string;
}>`
  width: 5px;
  height: 5px;
  position: absolute;
  top: calc(15000px - ${(props) => props.positiony}px + 20px);
  left: calc(15550px - ${(props) => props.positionx}px + 18px);
  border-radius: 50%;

  ${(props) =>
    props.startpoint === "false" &&
    `
   background: red;
  `}

  z-index: 3;
`;

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

  z-index: 5;
  &:hover {
    background: #000;
  }
`;

const Title = styled.div`
  font-size: 35px;
`;

const ModelContainer = styled.div<{
  rotatedeg: number;
  positionx: number;
  positiony: number;
}>`
  position: absolute;
  top: calc(15000px - ${(props) => props.positiony}px);
  left: calc(15550px - ${(props) => props.positionx}px);
  width: 40px;
  transform: rotate(${(props) => props.rotatedeg}deg);
  transition: transform 0.3s;
  cursor: pointer;
  z-index: 4;
  transition: all 0.1s;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  max-width: 1100px;
  flex-direction: column;
  margin: 0 auto;
  z-index: 0;
`;

const Map = styled.div`
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  width: 1100px;
  height: 600px;
  box-shadow: 0px 10px 10px 0px rgba(129, 129, 129, 0.25);
  overflow: hidden;
  z-index: 0;
`;

const Layout = styled.div<{ positionx: number; positiony: number }>`
  width: 30000px;
  height: 30000px;
  margin-left: calc(-15000px + ${(props) => props.positionx}px);
  margin-top: calc(2 * ${(props) => props.positiony}px);
  background: url("/src/assets/background2.jpg");
  background-size: 3000px;
  z-index: 0;

  transition: all 0.1s;
`;

export default MainPage;
