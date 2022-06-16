import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit[id]" as={`/post/edit/${id}`}>
        <IconButton
          aria-label="Edit Post"
          mr={4}
          // colorScheme="grey"
          size="lg"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label="Delete Post"
        // colorScheme="grey"
        size="lg"
        onClick={() =>
          deletePost({
            variables: { id },
            // clean up cache
            update: (cache) => {
              cache.evict({ id: "Post:" + id });
            },
          })
        }
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
