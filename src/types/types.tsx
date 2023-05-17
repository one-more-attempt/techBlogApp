export type LoginInput = {
  user: { email: string; password: string };
};

export type LoginResponse = {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
};

export type SignUpInput = {
  user: {
    email: string;
    username: string;
    password: string;
  };
};

export type SignUpResponse = LoginResponse;

export type AuthorInfo = {
  username: string;
  bio: string;
  image: string;
  following: boolean;
};

export type AuthorInfoResponse = {
  profile: AuthorInfo;
};

export type AuthorInfoInput = {
  author: string;
  token: string;
};

export type FollowUnfollowAuthorInput = { token: string; author: string };
export type LikeUnlikePostInput = { token: string; post: string };

export type likeUnlikePostResponse = {
  article: {
    author: AuthorInfo;
    authorId: number;
    body: string;
    createdAt: string;
    description: string;
    favorited: boolean;
    favoritesCount: number;
    id: number;
    slug: string;
    tagList: string[];
    title: string;
    updatedAt: string;
    favoritedBy: {
      bio: string;
      demo: string;
      email: string;
      id: number;
      image: string;
      password: string;
      username: string;
    }[];
  };
};

export type addCommentToPostInput = {
  token: string;
  slug: string;
  comment: { comment: { body: string } };
};

export type allCommentsInput = {
  slug: string;
  token: string;
};

export interface CommentBody {
  body: string;
  createdAt: string;
  id: number;
  updatedAt: string;
}

export type getCommentsResponse = {
  comments: {
    author: AuthorInfo;
    body: string;
    createdAt: string;
    id: number;
    updatedAt: string;
  }[];
};

export type addCommentResponse = {
  comment: {
    author: AuthorInfo;
    body: string;
    createdAt: string;
    id: number;
    updatedAt: string;
  };
};

export type Article = {
  author: AuthorInfo;
  body: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
};

export type getPostsResponse = {
  articles: Article[];
  articlesCount: number;
};

export type getSelectedPostResponse = {
  article: Article;
};

export type getAllPopularTagsResponse = {
  tags: string[];
};

export type getFeedInput = {
  token: string;
  offset: number;
  limit: number;
};

export type getFeedByTagNameInput = {
  token: string;
  offset: number;
  limit: number;
  tagname: string;
};

export type getAuthorPostsInput = {
  author: string;
  token: string;
  offset: number;
  limit: number;
};

export type getSelectedPostInput = { slug: string; token: string };
