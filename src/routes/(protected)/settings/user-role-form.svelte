<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { UserRole, userRoleUpdate, type UserDataInterFace, type UserRoleUpdate } from "@/schema";
    import * as Form from '@/components/ui/form';
	import * as Select from "@/components/ui/select";
	import toast from "svelte-french-toast";
	import { Reload } from "svelte-radix";

    export let userRoleForm: SuperValidated<Infer<UserRoleUpdate>>;
    export let userData: UserDataInterFace;

    let isSubmitting: boolean = false;

    let isVerfied = userData.verified;
    
    const form = superForm(userRoleForm, {
        validators: zodClient(userRoleUpdate),
        dataType: 'json',
        resetForm: false,
        invalidateAll: false,
        onUpdate({ result }) {
            const { data } = result;
            if(data.updateUserRoleResponse.status == '400') {
                toast.error(data.updateUserRoleResponse.message);
            }else{
                $formData.role = data.userRoleForm.data.role;
                toast.success('Successfully updated user role');
            }
        },
    });

    const { form: formData, enhance, submitting } = form;

    $: $formData.role =  userData.role === 'admin' ? UserRole.Admin 
                : UserRole.User;

    $: selectedRole = $formData.role
    ? {
        label: $formData.role === UserRole.Admin 
            ? UserRole.Admin 
                : UserRole.User,
        value: $formData.role === UserRole.Admin 
            ? UserRole.Admin 
                : UserRole.User,
    }
    : undefined;

    $: isSubmitting = $submitting;

</script>

<form method="post" use:enhance class="flex flex-col justify-between h-full" action="?/updateUserRole">
    <Form.Field {form} name="role">
        <Form.Control let:attrs>
            <Form.Label>Role</Form.Label>
            <Select.Root
                selected={selectedRole}
                onSelectedChange={(v) => {
                    v && ($formData.role = v.value);
                }}
                disabled={isSubmitting || !isVerfied}
            >
            <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select Role" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={UserRole.Admin} label={UserRole.Admin} />
                <Select.Item value={UserRole.User} label={UserRole.User} />
            </Select.Content>
            <input hidden bind:value={$formData.role} name={attrs.name} />
            </Select.Root>
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
