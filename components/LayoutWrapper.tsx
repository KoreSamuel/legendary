import { ReactChild } from 'react';
import SectionContainer from './SectionContainer';
import Header from './Header';
import Footer from './Footer';

type Props = {
  children: ReactChild | ReactChild[];
};

export default function Layout(props: Props) {
  return (
    <SectionContainer>
      <div className='flex flex-col min-h-screen'>
        <Header />
        <main className='mb-auto'>{props.children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
}
