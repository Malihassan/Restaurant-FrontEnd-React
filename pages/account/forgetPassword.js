import dynamic from "next/dynamic";
import Head from "next/head";
import { Fragment } from "react";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";
const ForgetPass =dynamic(
  () => import("../../components/accounts/forgetPassword/forgetPass"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);


function forgetPassword(props) {
  return (
    <Fragment>
      <Head>
        <title>Forget Password</title>
      </Head>
      <ForgetPass />
    </Fragment>
  )
  
}
export default forgetPassword;
