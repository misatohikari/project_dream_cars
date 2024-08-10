import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register', '/products'];
// const PUBLIC_PATHS = ['/login', '/', '/_error', '/register', '/products', '/favorite', '/history'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    const authCheck = useCallback((url) => {
        // redirect to login page if accessing a private page and not logged in 
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);

            router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, [router]);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.pathname);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }

    }, [authCheck, router.events, router.pathname]);

    return (
      <>
        {authorized && props.children}
      </>
    )
}

