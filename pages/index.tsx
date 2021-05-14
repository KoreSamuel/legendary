import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { YuqueAPI } from '../utils/yuque-api';
import { IDoc, IRepo } from '../types/index';

interface HomePageProps {
  repo: IRepo;
  docs: IDoc[];
}
const HomePage: FC<HomePageProps> = ({ repo, docs }: HomePageProps) => (
  <>
    <Head>
      <title>{repo.name}</title>
    </Head>
    <div>
      <h2>blog list</h2>
      <ul id='posts'>
        {docs.map((doc) => (
          <li key={doc.slug}>
            <Link href={`/posts/${doc.slug}`}>
              <a>{doc.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: HomePageProps;
}> => {
  const api = new YuqueAPI(process.env.yuqueToken || '');

  const { data: currentUser } = await api.getUser();
  const { data: repos } = await api.getRepos(currentUser.login);
  const [noteRepo] = repos.filter((repo) => repo.slug === 'note');
  const { data: docs } = await api.getDocs(noteRepo.namespace);
  return {
    props: {
      repo: noteRepo,
      docs: docs.filter((doc) => doc.status === 1),
    },
  };
};
