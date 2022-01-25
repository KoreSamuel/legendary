import { GetStaticProps } from 'next';
import PostListLayout from '@/layouts/PostListLayout';
import { IDoc } from 'types';
import { getAllNotes } from '../../utils/parse-notes';

type BlogProps = {
  posts: IDoc[];
};

export default function Notes({ posts }: BlogProps) {
  return (
    <>
      <PostListLayout posts={posts} title='All Notes' />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let posts: IDoc[] = [];
  posts = getAllNotes();
  console.log(posts);

  return {
    props: {
      posts,
    },
  };
};
