import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import Post from "../components/Post";
import { AppContext } from "../context";
import { Post as IPost } from "../types";

const Posts = () => {
  const navigate = useNavigate();
  const { getPosts, addPost, posts, token } = useContext(AppContext);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [post, setPost] = useState<IPost>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      (async function () {
        await getPosts?.();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      e.preventDefault();

      await addPost?.(post);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div className="posts">
      {!showForm ? (
        <div className="post-btn-wrapper">
          <IconButton title="Create post" onClick={() => setShowForm(true)}>
            <button className="btn btn-primary" type="button">
              Create Post
            </button>
          </IconButton>
        </div>
      ) : (
        <div className="post-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form-wrapper">
              <label htmlFor="title" className="label">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                className="form-control"
                value={post.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-wrapper">
              <label htmlFor="body" className="label">
                Post Content
              </label>
              <textarea
                name="content"
                id="content"
                cols={30}
                rows={5}
                className="form-control"
                placeholder="Type your message..."
                value={post.content}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="form-footer">
              <IconButton title="Cancel" onClick={() => setShowForm(false)}>
                <button className="btn btn-outline" type="button">
                  Cancel
                </button>
              </IconButton>
              <IconButton title="Create post" onClick={handleSubmit}>
                <button className="btn btn-primary" type="submit">
                  Create Post
                </button>
              </IconButton>
            </div>
          </form>
        </div>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
