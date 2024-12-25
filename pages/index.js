import EmailChat from '../component/EmailChat';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Email Chat Interface</title>
        <meta name="description" content="Email chat interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <EmailChat />
      </main>
    </>
  );
}