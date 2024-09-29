import { AdminUsersAPI, dataMeApi } from "@/API/api";
import type { PageServerLoad } from "./$types"
import { withActionHandler } from "@/API/actionUtils";

export const load: PageServerLoad = async ({ cookies, url }) => {

    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = 10;

    const token = cookies.get('token');

    const response = await withActionHandler(() => AdminUsersAPI({ cookies: token as string, limit: limit, page: page }));

    if(response.status == 'success') {
        const totalPage = Math.ceil(response.results / limit);
        const pageIndex =  url.searchParams.get('page') ? parseInt(url.searchParams.get('page') || '1') : 1;
        return {
            users: response.users,
            counts: response.results,
            totalPage: totalPage,
            isAdmin: true,
            pageIndex: pageIndex,
        }
    }else {
        return {
            users: [],
            counts: 0,
            totalPage: 0,
            isAdmin: false,
            pageIndex: 1,
        }
    }
}