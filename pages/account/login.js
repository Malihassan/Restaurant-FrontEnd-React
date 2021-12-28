import cookie from "cookie";
import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";

const LoginForm =dynamic(
  () => import("../../components/accounts/login/LoginForm"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);

function LoginPage() {
  return <LoginForm  />;
}



export default LoginPage;
