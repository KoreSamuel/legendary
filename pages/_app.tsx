import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import LayoutWrapper from '../components/LayoutWrapper';

import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider attribute='class'>
    <LayoutWrapper>
      <Component {...pageProps} />
    </LayoutWrapper>
  </ThemeProvider>
);

export default MyApp;
