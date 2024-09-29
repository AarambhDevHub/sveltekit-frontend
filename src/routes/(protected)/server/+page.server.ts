import { dataMeApi } from "@/API/api";
import type { PageServerLoad } from "./$types"
import { withActionHandler } from "@/API/actionUtils";

export const load: PageServerLoad = async ({ cookies }) => {

    const token = cookies.get('token');

    const response = await withActionHandler(() => dataMeApi({ cookies: token as string }));
    
    // console.log(response,'response1111')

    return {
        response
    };
}