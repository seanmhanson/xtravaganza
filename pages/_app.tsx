import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import PageLayout from '@/components/PageLayout';

export default function App({ Component, pageProps }: AppProps) {
  return <PageLayout><Component {...pageProps} /></PageLayout>
}
