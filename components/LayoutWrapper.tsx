import { ReactChild } from 'react';
import SectionContainer from './SectionContainer';
import Header from './Header';
import Footer from './Footer';
if (process.env.NODE_ENV === 'development') {
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
}

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
