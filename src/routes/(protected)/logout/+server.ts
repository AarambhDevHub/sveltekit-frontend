import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ cookies }) => {

    cookies.delete('token',{
        path: '/',
        sameSite: 'strict',
        expires: new Date(0)  // Delete the cookie immediately
    });

    return new Response(null, {
        status: 302,
        headers: {
            location: '/login' // Redirect to the login page or another appropriate page
        }
    });

}