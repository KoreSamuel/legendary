/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  env: {
    yuqueToken: process.env.YUQUE_TOKEN,
  },
  devIndicators: {
    autoPrerender: false,
  },
};
