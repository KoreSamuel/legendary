import React, { FC } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { YuqueAPI, IHelloMessage } from '../utils/yuque-api';

interface HomePageProps {
  hello: IHelloMessage;
}
const HomePage: FC<HomePageProps> = ({ hello }: HomePageProps) => (
  <>
    <Head>
      <title>home page</title>
    </Head>
    <div>
      <h2>{hello.message}</h2>
    </div>
  </>
);

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: HomePageProps;
}> => {
  const api = new YuqueAPI(process.env.yuqueToken || '');

  const { data: hello } = await api.hello();
  console.log(hello);

  return {
    props: {
      hello,
    },
  };
};
