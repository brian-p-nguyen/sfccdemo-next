import Head from 'next/head';

const HeadComponent = ({ title }) => {
  return (
    <Head>
      <title>
        {title ? `Next Reference Store | ${title}` : 'Next Reference Store'}
      </title>
    </Head>
  );
};
export default HeadComponent;
