export interface Post {
  /** UUID for the post */
  id: string;

  /** Text content of the post */
  content: string;

  /** UUID for the user who created the post. */
  user_id: string;
}

const createPost = async (text: string) => {};

const getPosts = async (user?: string) => {};
