import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'urql';
import { client, ssrCache } from '../lib/urql';

function MyApp({ Component, pageProps }: AppProps) {

  // Utilizando cache de queries já feitas no server-side
  if(pageProps.urqlState) {
    ssrCache.restoreData(pageProps.urqlState);
  }

  return (
    <Provider value={ client }>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
