import NeumorphicContainer from "@/components/Containers/NeumorphicContainer/NeumorphicContainer";
import React from "react";

type Props = {};

const NeumorphicModal = (props: Props) => {
  return (
    <NeumorphicContainer
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "50%",
        zIndex: 1000,
      }}
    >
      <h1>Title</h1>
    </NeumorphicContainer>
  );
};

export default NeumorphicModal;
