import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";
const ForgetPass =dynamic(
  () => import("../../components/accounts/forgetPassword/forgetPass"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);


function forgetPassword(props) {
  return <ForgetPass />;
}
export default forgetPassword;
