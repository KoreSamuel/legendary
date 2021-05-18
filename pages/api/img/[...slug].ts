import type { NextApiRequest, NextApiResponse } from 'next';

const CDN_ROOT = 'https://cdn.nlark.com';

type IReq = {
  query: {
    slug: string[];
  };
} & NextApiRequest;

export default async (req: IReq, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  const response = await fetch(`${CDN_ROOT}/${slug.join('/')}`);
  const buffer = await response.arrayBuffer();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/png');
  res.end(buffer);
};
