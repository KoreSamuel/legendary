import { GetServerSideProps } from 'next';
import PostListLayout from '@/layouts/PostListLayout';
import { YuqueAPI } from '../../utils/yuque-api';
import { IDoc } from 'types';

type BlogProps = {
  posts: IDoc[];
};

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <PostListLayout posts={posts} title='All Posts' />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: BlogProps;
}> => {
  const api = new YuqueAPI(process.env.yuqueToken || '');
  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [noteRepo] = repos.filter((repo) => repo.slug === 'note');
  const { data: docs } = await api.getDocs(noteRepo.namespace);

  return {
    props: {
      posts: docs.filter((doc) => doc.status === 1),
    },
  };
};
