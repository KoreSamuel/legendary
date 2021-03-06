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
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.end(buffer);
};
