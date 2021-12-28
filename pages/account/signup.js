import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";
const Signup = dynamic(
  () => import("../../components/accounts/signUp/Signup"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);
function SignupPage() {
  return <Signup />;
}
export default SignupPage;
