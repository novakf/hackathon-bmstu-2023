import React from "react";
import RoverModel from "../../icons/RoverModel";
import styled from "styled-components";

const MainPage: React.FC = () => {
  return (
    <div>
      <ModelContainer>
        <RoverModel />
      </ModelContainer>
    </div>
  );
};

const ModelContainer = styled.div`
  width: 50px;
`;

export default MainPage;
