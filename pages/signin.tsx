import AuthForm from "../components/authForm";

const Signin = () => {
  return <AuthForm mode="signin" />;
};

Signin.excludePlayerLayout = true;

export default Signin;
