import { fail, superValidate } from "sveltekit-superforms"
import type { PageServerLoad } from "./$types"
import { zod } from "sveltekit-superforms/adapters"
import { forgotPasswordSchema } from "@/schema"
import type { Actions } from "@sveltejs/kit"
import { withActionHandler } from "@/API/actionUtils"
import { forgotPasswordApi } from "@/API/api"

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(forgotPasswordSchema))
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(forgotPasswordSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        return withActionHandler(async () => {
            const response = await forgotPasswordApi(form.data);
    
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