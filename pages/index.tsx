import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from '@/components/Link';
import { YuqueAPI } from '../utils/yuque-api';
import { IDoc, IRepo } from '../types/index';
import siteMetadata from '@/data/site.config.json';

const MAX_DISPLAY = 5;
const postDateTemplate: any = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
interface HomePageProps {
  repo: IRepo;
  posts: IDoc[];
}
const HomePage: FC<HomePageProps> = ({ repo, posts }: HomePageProps) => (
  <>
    <Head>
      <title>{repo.name}</title>
    </Head>
    <div className='divide-y divide-gray-200 dark:divide-gray-700'>
      <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
        <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
          Latest
        </h1>
        <p className='text-lg leading-7 text-gray-500 dark:text-gray-400'>
          {siteMetadata.description}
        </p>
      </div>
      <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
        {!posts.length && 'No posts found.'}
        {posts.slice(0, MAX_DISPLAY).map((post) => {
          const { slug, created_at, title } = post;
          return (
            <li key={slug} className='py-12'>
              <article>
                <div className='space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={created_at}>
                        {new Date(created_at).toLocaleDateString(
                          siteMetadata.locale,
                          postDateTemplate,
                        )}
                      </time>
                    </dd>
                  </dl>
                  <div className='space-y-5 xl:col-span-3'>
                    <div className='space-y-6'>
                      <div>
                        <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                          <Link
                            href={`/posts/${slug}`}
                            className='text-gray-900 dark:text-gray-100'
                          >
                            {title}
                          </Link>
                        </h2>
                      </div>
                      <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                        {'summary'}
                      </div>
                    </div>
                    <div className='text-base font-medium leading-6'>
                      <Link
                        href={`/posts/${slug}`}
                        className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                        aria-label={`Read "${title}"`}
                      >
                        Read more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
    {posts.length > MAX_DISPLAY && (
      <div className='flex justify-end text-base font-medium leading-6'>
        <Link
          href='/blog'
          className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
          aria-label='all posts'
        >
          All Posts &rarr;
        </Link>
      </div>
    )}
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
  const { data: posts } = await api.getDocs(noteRepo.namespace);
  return {
    props: {
      repo: noteRepo,
      posts: posts.filter((doc) => doc.status === 1),
    },
  };
};
