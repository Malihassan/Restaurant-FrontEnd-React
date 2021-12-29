import Head from "next/head";
import dynamic from "next/dynamic";
import LoadingSpinner from "../../components/ui/spinner/LoadingSpinner";
import { Fragment } from "react";

const LoginForm =dynamic(
  () => import("../../components/accounts/login/LoginForm"),
  { loading: () => <LoadingSpinner className="LoadingSpinner" /> }
);

function LoginPage() {
  return <Fragment>
    <Head>
        <title>Login Page</title>
      </Head>
    <LoginForm  />
  </Fragment>
}



export default LoginPage;
