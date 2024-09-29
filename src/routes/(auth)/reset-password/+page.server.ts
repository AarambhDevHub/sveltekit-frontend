import { fail, superValidate } from "sveltekit-superforms"
import type { PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { resetPasswordSchema } from "@/schema"
import { redirect, type Actions } from "@sveltejs/kit"
import { withActionHandler } from "@/API/actionUtils"
import { resetPasswordApi } from "@/API/api"

export const load: PageServerLoad = async ({ url }) => {

    let token = url.searchParams.get("token");

    if(!token) {
        return redirect(302, "/login")
    }

    return {
        form: await superValidate(zod(resetPasswordSchema)),
        token
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(resetPasswordSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        return withActionHandler(async () => {
            const response = await resetPasswordApi(form.data);
    
            if (response.status === "success" && response.token) {
                return {
                    form,
                    apiResponse: response
                };
            } else {
                return fail(400, {
                    form,
                    apiResponse: response,
                });
            }            
        }, { defaultForm: form, returnFormOnError: true })        

    }
}