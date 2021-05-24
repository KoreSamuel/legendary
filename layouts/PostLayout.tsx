import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import siteMetadata from '@/data/site.config.json';
import { ReactChild } from 'react';
import { IDoc } from 'types';

const postDateTemplate: any = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

type PostLayoutProps = {
  children: ReactChild | ReactChild[];
  post: IDoc;
  next?: IDoc | null;
  prev?: IDoc | null;
};

export default function PostLayout({
  children,
  post,
  next,
  prev,
}: PostLayoutProps) {
  const { created_at, title } = post;
  const tags: string[] = [];

  return (
    <SectionContainer>
      <article>
        <div className='xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700'>
          <header className='pt-6 xl:pb-6'>
            <div className='space-y-1 text-center'>
              <dl className='space-y-10'>
                <div>
                  <dt className='sr-only'>Published on</dt>
                  <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                    <time dateTime={created_at}>
                      {new Date(created_at).toLocaleDateString(
                        siteMetadata.locale,
                        postDateTemplate,
                      )}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div
            className='pb-8 divide-y divide-gray-200 xl:divide-y-0 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6'
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className='pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200 xl:dark:border-gray-700'>
              <dt className='sr-only'>Authors</dt>
              <dd>
                <ul className='flex justify-center space-x-8 xl:block sm:space-x-12 xl:space-x-0 xl:space-y-8'>
                  <li className='flex items-center space-x-2'>
                    <img
                      src={siteMetadata.image}
                      alt='avatar'
                      className='w-10 h-10 rounded-full'
                    />
                    <dl className='text-sm font-medium leading-5 whitespace-nowrap'>
                      <dt className='sr-only'>Name</dt>
                      <dd className='text-gray-900 dark:text-gray-100'>
                        {siteMetadata.author}
                      </dd>
                      {typeof siteMetadata.twitter === 'string' && (
                        <>
                          <dt className='sr-only'>Twitter</dt>
                          <dd>
                            <Link
                              href={siteMetadata.twitter}
                              className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                            >
                              {siteMetadata.twitter.replace(
                                'https://twitter.com/',
                                '@',
                              )}
                            </Link>
                          </dd>
                        </>
                      )}
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className='divide-y divide-gray-200 dark:divide-gray-700 xl:pb-0 xl:col-span-3 xl:row-span-2'>
              <div className='pt-10 pb-8 prose dark:prose-dark max-w-none'>
                {children}
              </div>
            </div>
            <footer>
              <div className='text-sm font-medium leading-5 divide-gray-200 xl:divide-y dark:divide-gray-700 xl:col-start-1 xl:row-start-2'>
                {tags && (
                  <div className='py-4 xl:py-8'>
                    <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                      Tags
                    </h2>
                  </div>
                )}
                {(next || prev) && (
                  <div className='flex justify-between py-4 xl:block xl:space-y-8 xl:py-8'>
                    {prev && (
                      <div>
                        <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                          Previous Article
                        </h2>
                        <div className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'>
                          <Link href={`/posts/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className='text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400'>
                          Next Article
                        </h2>
                        <div className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'>
                          <Link href={`/posts/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className='pt-4 xl:pt-8'>
                <Link
                  href='/blog'
                  className='text-blue-500 hover:text-blue-600 dark:hover:text-blue-400'
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  );
}
