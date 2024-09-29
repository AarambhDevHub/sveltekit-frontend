<script lang="ts">
	import CardWrapper from "@/components/auth/card-wrapper.svelte";
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { resetPasswordSchema } from "@/schema";
	import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import { Reload } from "svelte-radix";
	import toast from "svelte-french-toast";
	import { goto } from "$app/navigation";

    export let data: PageData;

	let isSubmitting: boolean = false;

    const form = superForm(data.form, {
        validators: zodClient(resetPasswordSchema),
        dataType: 'json',
        onUpdate({ result }) {
            const { data } = result;
            if(data?.apiResponse) {
                if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
					toast.error(data.apiResponse.message);
				} else {
					toast.success(data.apiResponse.message);
                    setTimeout(() => goto('/login'), 1000);
				}
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $formData.token = data.token;

    $: isSubmitting = $submitting;

</script>

<title>
    Reset Password
</title>

<CardWrapper
    headerLabel="Reset your password?"
    backButtonLabel="Back to login"
    backButtonHref="/login"
>
<form method="post" use:enhance>
    <Form.Field {form} name="token">
        <Form.Control let:attrs>
            <Input
                {...attrs}
                bind:value={$formData.token}
                type="hidden"
                disabled
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="new_password">
        <Form.Control let:attrs>
            <Form.Label>New password</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.new_password}
                placeholder="***********"
                disabled={isSubmitting}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="new_password_confirm">
        <Form.Control let:attrs>
            <Form.Label>New password confirm</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.new_password_confirm}
                placeholder="***********"
                disabled={isSubmitting}
                enablePasswordToggle
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