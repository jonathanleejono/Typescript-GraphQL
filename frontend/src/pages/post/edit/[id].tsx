import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import {
  usePostQuery,
  usePostsQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { withApollo } from "../../../utils/withApollo";
import createPost from "../../create-post";

const EditPost = ({}) => {
  const router = useRouter();
  const intId = useGetIntId();
  const { data, loading } = usePostQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [updatePost] = useUpdatePostMutation();

  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }

  return (
    <div>
      <Layout variant="small">
        <Formik
          initialValues={{ title: data.post.title, text: data.post.text }}
          onSubmit={async (values) => {
            const { errors } = await updatePost({
              variables: { id: intId, ...values },
            });
            if (!errors) router.push("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="title" placeholder="title" label="Title" />
              <Box mt={4}>
                <InputField
                  textarea
                  name="text"
                  placeholder="text..."
                  label="Body"
                />
              </Box>

              <Button
                type="submit"
                colorScheme="teal"
                mt={4}
                isLoading={isSubmitting}
              >
                Update Post
              </Button>
            </Form>
          )}
        </Formik>
      </Layout>
    </div>
  );
};

export default withApollo({ ssr: false })(EditPost);
