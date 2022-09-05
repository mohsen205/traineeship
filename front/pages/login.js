import React, { useState, useEffect } from "react";
import Header from "components/Header";
import Title from "components/Title";
import styles from "styles/login.module.css";
import Footer from "components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Error from "components/util/error";
import SocialLoginRes from "components/util/SocialLoginRes";
import Link from "next/link";
import SecurePage from "components/util/securePage";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Toast from "components/util/Toast";

const validationSchema = Yup.object({
  email: Yup.string().email().required("Email is a required field"),
  password: Yup.string().required("Message is a required field"),
});

const Login = () => {
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.error) {
      setError(router.query.error);
      setLoginEmail(router.query.email);
    }
  }, [router]);
  const initialValues = {
    email: error == 404 ? "" : loginEmail,
    password: "",
  };
  const onSubmit = (values, onSumbitProps) => {
    signIn(
      "credentials",
      {
        username: values.email,
        password: values.password,
      },
      { callbackUrl: "http://localhost:3000/client" }
    );
    if (true) {
      onSumbitProps.setSumbitting(false);
    }
  };

  return (
    <SecurePage>
      <Title pageName="Login" />
      <Header />
      <div className={`${styles.login}`}>
        {/* <h3 className="text-center">Sign in</h3> */}
        <div className="d-flex justify-content-around">
          <div className={`${styles.form}`}>
            <div className={`${styles.error} text-center`}>
              {!error ? null : error == 404 ? (
                <Toast error="Sorry we could not found your account" />
              ) : error == 403 ? (
                <Toast error="Worg Password" />
              ) : (
                <Toast error="Please provide a valid email address and password." />
              )}
            </div>
            <div className="h4 text-center">Sign In</div>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="form-group mt-3">
                      <Field
                        type="email"
                        className={`${styles.input} form-input`}
                        name="email"
                        placeholder="Email*"
                      />
                      <ErrorMessage
                        name="email"
                        render={(error) => <Error e={error} />}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <Field
                        type="password"
                        className={`${styles.input} form-input`}
                        name="password"
                        placeholder="Password*"
                      />
                      <div className="d-flex justify-content-between">
                        <ErrorMessage
                          name="password"
                          render={(error) => <Error e={error} />}
                        />
                        <div className="text-white"> </div>
                        <Link href={"/forgetPassword"}>
                          <a
                            className={`${styles.anchor} ms-1 text-decoration-none`}
                          >
                            Forget Password ?
                          </a>
                        </Link>
                      </div>
                    </div>
                    <button
                      className="btn-blue mt-4 w-100"
                      type="submit"
                      disabled={!formik.isValid || formik.isSubmitting}
                    >
                      Login
                    </button>
                    <div className="line d-flex justify-content-between my-2">
                      Or sign in via
                    </div>
                    <SocialLoginRes />
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </SecurePage>
  );
};

export default Login;
//
