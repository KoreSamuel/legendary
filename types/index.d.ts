/* eslint-disable @typescript-eslint/no-explicit-any */
export interface YuquePayload<T> {
  data: T;
}

export interface IHelloMessage {
  message: string;
}

export interface IUser {
  id: number;
  type: string;
  login: string;
  name: string;
  description: string | null;
  avatar_url: string;
  books_count: number;
  public_books_count: number;
  followers_count: number;
  following_count: number;
  public: number;
  create_at: string;
  updated_at: string;
}

export interface IRepo extends IUser {
  slug: string;
  namespace: string;
  user_id: string;
  user: IUser;
  creator_id: string;
  public: number;
  likes_count: number;
  watches_count: number;
}

export interface IDoc {
  id: number;
  slug: string;
  title: string;
  book_id: number;
  book: IRepo;
  user_id: number;
  user: IUser;
  format: string;
  body: string;
  body_draft: string;
  body_html: string;
  body_lake: string;
  creator_id: number;
  public: number;
  status: number;
  likes_count: number;
  comments_count: number;
  content_updated_at: string;
  custom_description: string;
  description: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
}

export interface ISiteMetadata {
  author: string;
  title: string;
  github: string;
  email: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
}

declare module '*.svg' {
  const content: any;
  export default content;
}

export type NoteMetaType = {
  title: string;
  htmlTitle: string;
  created_at: string;
  slug: string;
  permalink: string;
  description?: string;
  image?: string;
  tags?: string[];
  readingMins?: number;
  noComments?: boolean;
};
