import React, { useState } from "react";
import { useRouter } from "next/router";

import { useAppDispatch } from "@/redux/redux.hooks";
import { setUserEmail } from "@/redux/user/UserSlice";
import { googleHandler, loginOrSignup } from "@/database/user";

import toast from "react-hot-toast";

import FlexContainer from "../FlexContainer/FlexContainer";
import BasicInput from "../Inputs/BasicInput";
import SubmitForm from "../Buttons/SubmitForm";

import styles from "./LoginForm.module.scss";
import NeumorphicContainer from "../Containers/NeumorphicContainer/NeumorphicContainer";
import TitleAndDescription from "../Texts/TitleAndDescription";

import googleIcon from "@/assets/icons/google.png";
import ButtonWithIcon from "../Buttons/ButtonWithIcon";
import SectionDescription from "../Texts/SectionDescription";

type Props = {};

const LoginForm = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmitLoginForm = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const loginResult: any = await loginOrSignup(
      isLogin,
      formData.email,
      formData.password
    );
    if (!loginResult.error) {
      dispatch(setUserEmail(formData.email));
      router.push("/dashboard");
    } else {
      toast.error("Login failed, Please try again");
      setFormData({ email: "", password: "" });
    }
  };

  const handleSignInWithGoogle = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const loginResult: any = await googleHandler();

    if (!loginResult.error) {
      dispatch(setUserEmail(loginResult.email));
      router.push("/dashboard");
    } else if (loginResult) {
      toast.error("Login failed, Please try again");
    }
  };
  return (
    <NeumorphicContainer
      width="450px"
      height="500px"
      style={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <TitleAndDescription
        width="80%"
        title="Login"
        description="Enter your credentials or login with Google"
      />
      <form
        onSubmit={handleSubmitLoginForm}
        style={{
          width: "100%",
          height: "250px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BasicInput
          dataCy="login-email"
          label="Email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={(e: { target: { value: string } }) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        <BasicInput
          dataCy="login-password"
          label="Password"
          type="password"
          placeholder="*********"
          value={formData.password}
          onChange={(e: { target: { value: string } }) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <SubmitForm title="Login" dataCy="login-submit" />
      </form>
      <SectionDescription description="OR" color="lightgrey" />
      <ButtonWithIcon
        title="Login with Google"
        icon={googleIcon}
        onClick={handleSignInWithGoogle}
      />
    </NeumorphicContainer>
  );
};

export default LoginForm;
