// import "@/styles/globals.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// // import { Provider } from 'jotai';
// import RouterGuard from '../components/RouterGuard'
// import Layout from '../components/Layout'


// export default function App({ Component, pageProps }) {

//   // return <Component {...pageProps} />;

//   return (
//     <RouterGuard>
//     {/* <Provider> */}
//       <Layout>
//       <Component {...pageProps} />;
//       </Layout>
//     {/* </Provider> */}
//     </RouterGuard>
//   );
// }

import '@/styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { userAtom } from '../state/atoms';
import { readToken, verifyToken, removeToken } from '../lib/authenticate'; // Add token verification function
import RouterGuard from '../components/RouterGuard';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  // const router = useRouter();
  // const [user, setUser] = useAtom(userAtom);



  return (
    <RouterGuard>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RouterGuard>
  );
}
