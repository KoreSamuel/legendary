import React, { FC } from 'react';

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PostLayout from '@/layouts/PostLayout';
import { YuqueAPI } from '../../utils/yuque-api';
import { IDoc } from '../../types/index';
import { ParsedUrlQuery } from 'querystring';

const CDN_ROOT = /https:\/\/cdn.nlark.com/g;

interface IPostPageProps {
  doc: IDoc;
}

interface Params extends ParsedUrlQuery {
  namespace: string;
  slug: string;
}

const PostPage: FC<IPostPageProps> = ({ doc }: IPostPageProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const __html = doc.body_html.replace(CDN_ROOT, '/api/img');

  return (
    <>
      <Head>
        <title>{`${doc.title} - ${doc.book.name}`}</title>
      </Head>
      <>
        <PostLayout post={doc}>
          {<div dangerouslySetInnerHTML={{ __html }} />}
        </PostLayout>
      </>
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const api = new YuqueAPI(process.env.yuqueToken || '');

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [noteRepo] = repos.filter((repo) => repo.slug === 'note');
  const { data: docs } = await api.getDocs(noteRepo.namespace);

  const paths: Array<{ params: { [key: string]: string | string[] } }> = docs
    .filter((doc) => doc.status === 1)
    .map((doc) => ({
      params: { namespace: noteRepo.namespace, slug: doc.slug },
    }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context,
): Promise<{ props: IPostPageProps }> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const params = context.params! as Params;
  const { namespace, slug } = params;
  const api = new YuqueAPI(process.env.yuqueToken || '');

  let _namespace = namespace as string;

  if (!_namespace) {
    const { data: currentUser } = await api.getUser();
    const { data: repos } = await api.getRepos(currentUser.login);
    const [noteRepo] = repos.filter((repo) => repo.slug === 'note');

    _namespace = noteRepo.namespace;
  }

  const { data: doc } = await api.getDoc(_namespace, slug as string);

  return {
    props: {
      doc,
    },
  };
};
