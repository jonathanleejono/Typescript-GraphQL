import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import router from "next/router";
import React from "react";
import InputField from "../../components/InputField";
import Wrapper from "../../components/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import login from "../login";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          //   const response = await login(values);
          //   console.log(response);
          //   if (response.data?.login.errors) {
          //     setErrors(toErrorMap(response.data.login.errors));
          //   } else if (response.data?.login.user) {
          //     //worked
          //     router.push("/");
          //   }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New Password"
              type="password"
            />
            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              change password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

//grabbing url token, or rather these are query params

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default ChangePassword;
