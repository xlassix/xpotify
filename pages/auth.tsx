import AuthForm from "../components/authForm";
import { useState } from "react";
const Auth = () => {
  const [mode, setMode] = useState("signin");
  return <AuthForm mode={mode} />;
};

Auth.plainPageLayout = true;

export default Auth;
