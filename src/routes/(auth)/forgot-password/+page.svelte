<script lang="ts">
	import CardWrapper from "@/components/auth/card-wrapper.svelte";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { forgotPasswordSchema } from "@/schema";
	import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import { Reload } from "svelte-radix";
	import toast from "svelte-french-toast";

    export let data: PageData;

	let isSubmitting: boolean = false;

    const form = superForm(data.form, {
        validators: zodClient(forgotPasswordSchema),
        dataType: 'json',
        onUpdate({ result }) {
            const { data } = result;
            if(data?.apiResponse) {
                if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
					toast.error(data.apiResponse.message);
				} else {
					toast.success(data.apiResponse.message);
				}
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: isSubmitting = $submitting;

</script>

<title>
    Forgot Password
</title>

<CardWrapper
    headerLabel="Forgot your password?"
    backButtonLabel="Back to login"
    backButtonHref="/login"
>
<form method="post" use:enhance>
    <Form.Field {form} name="email">
        <Form.Control let:attrs>
            <Form.Label>Email</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.email}
                placeholder="john.doe@example.com"
                disabled={isSubmitting}
                type="email"
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="mt-3 w-full" disabled={isSubmitting}>
        {#if isSubmitting}
            <Reload class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Submit
    </Form.Button>
</form>
</CardWrapper>