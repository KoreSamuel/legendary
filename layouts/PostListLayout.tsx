import { useState } from 'react';
import Link from '@/components/Link';
import siteMetadata from '@/data/site.config.json';
import { IDoc } from '../types/index';

type Props = {
  posts: IDoc[];
  title: string;
};

const postDateTemplate: any = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export default function PostListLayout({ posts, title }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title + post.body_html;
    return searchContent
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());
  });

  return (
    <>
      <div className='divide-y'>
        <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            {title}
          </h1>
          <div className='relative max-w-lg'>
            <input
              aria-label='Search articles'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search articles'
              className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
            />
            <svg
              className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredPosts.length && 'No posts found.'}
          {filteredPosts.map((post) => {
            const {
              slug,
              created_at,
              title,
              custom_description = '',
              description = '',
            } = post;
            return (
              <li key={slug} className='py-4'>
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline'>
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
                  <div className='space-y-3 xl:col-span-3'>
                    <div>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link
                          href={`/posts/${slug}`}
                          className='text-gray-900 dark:text-gray-100'
                        >
                          {title}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'></div>
                    </div>
                    <div className='prose text-gray-500 max-w-none dark:text-gray-400'>
                      {custom_description || description}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
