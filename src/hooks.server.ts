import { type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {

    const token = event.cookies.get('token') || null;

    event.locals.token = token;

    const protectedPaths = [
        '/admin',
        '/settings',
        '/client',
        '/server',
    ];

    const isProtectedPath = protectedPaths.some(path => event.url.pathname.startsWith(path));

    if ((event.url.pathname === '/login' || event.url.pathname === '/register' || event.url.pathname === "/forgot-password" || event.url.pathname === "reset-password") && token) {
        return new Response(null, {
            status: 302,
            headers: {
                location: '/settings',
            },
        });
    }

    if (isProtectedPath && !token) {
        return new Response(null, {
            status: 302,
            headers: {
                location: '/login',
            },
        });
    }

    return resolve(event);
};
