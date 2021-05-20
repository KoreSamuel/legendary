import SocialIcon from './SocialIcon';
import Link from './Link';
import siteMetadata from '@/data/site.config.json';

export default function Footer() {
  return (
    <footer>
      <div className='flex flex-col items-center mt-16'>
        <div className='flex mb-3 space-x-4'>
          <SocialIcon kind='mail' href={`mailto:${siteMetadata.email}`} />
          <SocialIcon kind='github' href={siteMetadata.github} />
          <SocialIcon kind='facebook' href={siteMetadata.facebook} />
          <SocialIcon kind='youtube' href={siteMetadata.youtube} />
          <SocialIcon kind='linkedin' href={siteMetadata.linkedin} />
          <SocialIcon kind='twitter' href={siteMetadata.twitter} />
        </div>
        <div className='flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400'>
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href='/'>{siteMetadata.title}</Link>
        </div>
        <div className='mb-8 text-sm text-gray-500 dark:text-gray-400'>
          <Link href='https://github.com/KoreSamuel/legendary'>
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  );
}
