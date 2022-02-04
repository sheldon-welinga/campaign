export type UserCredentialsProps = {
  id: string;
  email: string;
  name: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export type PostProps = {
  _id?: string;
  user?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  title: string;
  content: string;
};

export type AppContextProps = {
  token: string | null;
  userCredentials: UserCredentialsProps | null;
  loginUser?: (user: LoginProps) => Promise<void>;
  registerUser?: (user: RegisterProps) => Promise<void>;
  logOut?: () => void;
  posts: PostProps[];
  addPost?: (post: PostProps) => Promise<void>;
  getPosts?: () => Promise<void>;
  deletePost?: (postId: string) => Promise<void>;
};
