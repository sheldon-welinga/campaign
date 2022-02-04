import { DeleteSharp } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../context";
import { PostProps } from "../types";

const Post: React.FC<{ post: PostProps }> = (props) => {
  const { deletePost, userCredentials } = useContext(AppContext);

  return (
    <div className="post">
      <div className="post-title">
        <h1>{props.post.title}</h1>
        {props.post?.user === userCredentials!.id && (
          <IconButton
            title="Delete post"
            onClick={async () =>
              props.post._id && (await deletePost?.(props.post?._id))
            }
          >
            <DeleteSharp color="error" />
          </IconButton>
        )}
      </div>
      <div className="post-body">
        <p>{props.post.content}</p>
      </div>
    </div>
  );
};

export default Post;
