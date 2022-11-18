import React from "react";
import FlexContainer from "../FlexContainer/FlexContainer";

import styles from "./Inputs.module.scss";

interface BasicInputProps {
  label: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  value: string;
  dataCy?: string;
}

const BasicInput = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  dataCy,
}: BasicInputProps) => {
  return (
    <FlexContainer
      width="70%"
      height="80px"
      flexDirection="column"
      alignItems="flex-start"
      flexWrap="nowrap"
    >
      <label style={{ color: "white", letterSpacing: "2px" }}>{label} </label>
      <input
        data-cy={dataCy}
        className={styles.basicInput}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: "100%" }}
      />
    </FlexContainer>
  );
};

export default BasicInput;
