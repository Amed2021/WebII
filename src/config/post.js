import { onFindAll, onFindByQuery, onUpdateArrayField, onUpdateIntFieldBy, onInsert} from './api.js';

export const ReadAllPosts = async () => {
  const result = await onFindAll("publicaciones");
  return result;
}

// Solo hay que pasarle la lista de amigos
export const ReadPostsFromFriends = async (friends) => {
  const result = await onFindByQuery("publicaciones", "authorId", "in", friends);
  return result;
}

export const UploadPost = async (post) => {
  await onInsert("publicaciones", post);
}

export const CommentOnPost = async (postId, comment) => {
  await onUpdateArrayField("publicaciones", postId, "comments", comment);
}

export const LikePost = async (postId) => {
  await onUpdateIntFieldBy("publicaciones", postId, "likes", 1);
}

export const UnlikePost = async (postId) => {
  await onUpdateIntFieldBy("publicaciones", postId, "likes", -1);
}

export const ReadAllStories = async () => {
  const result = await onFindAll("historias");
  return result;
}

export const ReadStoriesFromFriends = async (friends) => {
  const result = await onFindByQuery("historias", "authorId", "in", friends);
  return result;
}

export const UploadStory = async (story) => {
  await onInsert("historias", story);
}
