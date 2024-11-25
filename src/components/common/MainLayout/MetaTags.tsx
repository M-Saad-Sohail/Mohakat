
import Head from 'next/head';

const MetaTags = () => (
  <Head>
    <meta
      name="google-site-verification"
      content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
    />
  </Head>
);

export default MetaTags;