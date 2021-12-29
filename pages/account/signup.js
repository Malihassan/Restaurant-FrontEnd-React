import dynamic from "next/dynamic";
import Head from "next/head";
import { Fragment } from "react";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";
const Signup = dynamic(
  () => import("../../components/accounts/signUp/Signup"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);
function SignupPage() {
  return (
    <Fragment>
      <Head>
        <title>Signup Page</title>
      </Head>
      <Signup />
    </Fragment>
  )
  
}
export default SignupPage;
