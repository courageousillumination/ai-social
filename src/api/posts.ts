import { supabase } from "../supabaseClient";

export interface Post {
  /** UUID for the post */
  id: string;

  /** Text content of the post */
  content: string;

  /** UUID for the user who created the post. */
  user_id: string;
}

const createPost = async (text: string) => {
  const { data, error } = await supabase
    .from('posts')
    .insert([{ content: text }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const getPosts = async (user?: string) => {
  let query = supabase.from('posts').select('*');

  if (user) {
    query = query.eq('user_id', user);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
