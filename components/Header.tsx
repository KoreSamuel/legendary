import Link from './Link';
import Image from 'next/image';
import ThemeSwitch from './ThemeSwitch';
import headerNavLinks from '@/data/headerNavLinks';

export default function Header() {
  return (
    <header className='flex items-center justify-between py-10'>
      <div className='flex flex-wrap items-center justify-between lg:container px-4 py-6 mx-auto md:flex-no-wrap md:px-6'>
        <div className='flex items-center'>
          <Image
            src='/vercel.svg'
            width={40}
            height={40}
            priority
            alt='Vercel logo'
          />

          <Link href='/'>
            <a className='text-lg md:text-xl font-bold ml-3 text-white font-sans'>
              KoreSamuel
            </a>
          </Link>
        </div>
      </div>

      <div className='flex items-center text-base leading-5'>
        <div className='hidden sm:block'>
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className='p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100'
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeSwitch />
      </div>
    </header>
  );
}
