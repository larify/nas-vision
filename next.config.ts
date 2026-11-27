import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  outputFileTracingIncludes: {
    '/*': ['./node_modules/better-sqlite3/prebuilds/*.node'],
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
};
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
