<script lang="ts">
	import CardWrapper from '@/components/auth/card-wrapper.svelte';
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { Button } from "@/components/ui/button";
	import { loginSchema } from '@/schema';
	import toast from 'svelte-french-toast';
	import { Reload } from 'svelte-radix';
	import {
		superForm,
	} from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

    export let data: PageData;

	let isSubmitting: boolean = false;

	const form = superForm(data.form, {
		validators: zodClient(loginSchema),
		dataType: 'json',
		onUpdate({ result }) {
			const { data } = result;

			if (data?.apiResponse) {
				if (data.apiResponse?.status === 'fail' || data.apiResponse?.status != 'success') {
					toast.error(data.apiResponse.message);
				} else {
					toast.success("Login successfully!");
				}
			}
		},
	});

	const { form: formData, enhance, submitting } = form;

	$: isSubmitting = $submitting;

</script>

<title>
	Login Page
</title>

<CardWrapper
	headerLabel="Welcome back!"
	backButtonHref={"/register"}
	backButtonLabel="Don't have an account?"
>
	<form method="POST" use:enhance>
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
		<Form.Field {form} name="password">
			<Form.Control let:attrs>
				<Form.Label>Password</Form.Label>
				<Input
					{...attrs}
					bind:value={$formData.password}
					placeholder="*******"
					disabled={isSubmitting}
					enablePasswordToggle
				/>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Button href="/forgot-password" class="font-normal p-1" size="sm" variant="link">
			forgot password?
		</Button>
		<Form.Button class="mt-3 w-full" disabled={isSubmitting}>
			{#if isSubmitting}
				<Reload class="mr-2 h-4 w-4 animate-spin" />
			{/if}
			Submit
		</Form.Button>
	</form>
</CardWrapper>
