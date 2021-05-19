import { ReactChild } from 'react';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactChild | ReactChild[];
};

export default function Layout(props: Props) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />

      <main className='flex-1 lg:container px-4 py-6 mx-auto md:px-6 md:py-12'>
        {props.children}
      </main>

      <Footer />
    </div>
  );
}
