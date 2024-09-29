<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { passwordChangeSchema, type PasswordChangeSchema, type UserDataInterFace} from "@/schema";
    import * as Form from '@/components/ui/form';
	import { Input } from "@/components/ui/input";
	import toast from "svelte-french-toast";
	import { Reload } from "svelte-radix";

    export let passwordChangeForm: SuperValidated<Infer<PasswordChangeSchema>>;
    export let userData: UserDataInterFace;


    let isSubmitting: boolean = false;

    let isVerfied = userData.verified;


    const form = superForm(passwordChangeForm, {
        validators: zodClient(passwordChangeSchema),
        dataType: 'json',
        invalidateAll: false,
        onUpdate({ result }) {
            const { data } = result;
            console.log(data,'data')
            if(data.updateUserPasswordResponse.status == 400 || data.updateUserPasswordResponse.status == 'fail') {
                toast.error(data.updateUserPasswordResponse.message)
            }else{
                toast.success("Password update Successful!")
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: isSubmitting = $submitting;

</script>

<form method="post" use:enhance action="?/updateUserPassword">
    <Form.Field {form} name="oldpassword">
        <Form.Control let:attrs>
            <Form.Label>Old Password</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.oldpassword}
                placeholder="*********"
                disabled={isSubmitting || !isVerfied}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="newpassword">
        <Form.Control let:attrs>
            <Form.Label>New Password</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.newpassword}
                placeholder="*********"
                disabled={isSubmitting || !isVerfied}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="newpasswordConfirm">
        <Form.Control let:attrs>
            <Form.Label>New password Confirm</Form.Label>
            <Input
                {...attrs}
                bind:value={$formData.newpasswordConfirm}
                placeholder="*********"
                disabled={isSubmitting || !isVerfied}
                enablePasswordToggle
            />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="mt-3 w-full" disabled={isSubmitting || !isVerfied}>
        {#if isSubmitting}
            <Reload class="mr-2 h-4 w-4 animate-spin" />
        {/if}
        Submit
    </Form.Button>
</form>
