import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/authenticate';

// Define the paths that do not require authentication
const PUBLIC_PATHS = ['/login', '/', '/_error', '/register', '/products'];
// const PUBLIC_PATHS = ['/login', '/', '/_error', '/register', '/products', '/favorite', '/history'];

export default function RouteGuard(props) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false); //Local state for authorization status

     // Function to check authentication status
    const authCheck = useCallback((url) => {
        // If not authenticated and accessing a private page, redirect to login
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);

            router.push(`/login?redirect=${encodeURIComponent(router.asPath)}`);
            router.push("/login");
        } else {
            // If authenticated or accessing a public page, set authorized to true
            setAuthorized(true);
        }
    }, [router]);

    useEffect(() => {
        // Run auth check on initial load
        authCheck(router.pathname);

        // Run auth check on route change complete
        router.events.on('routeChangeComplete', authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }

    }, [authCheck, router.events, router.pathname]);

    // Render children if authorized
    return (
      <>
      
        {authorized && props.children}
      </>
    )
}

