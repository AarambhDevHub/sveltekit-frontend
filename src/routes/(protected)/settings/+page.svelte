<script>
	import { Card, CardContent, CardHeader } from "@/components/ui/card";
	import UserDataForm from "./user-data-form.svelte";
	import UserRoleForm from "./user-role-form.svelte";
	import { Separator } from "@/components/ui/separator";
    import * as Alert from "@/components/ui/alert";
	import PasswordChangeForm from "./password-change-form.svelte";

    export let data;

    $: userDataForm = data.userDataForm;
    $: passwordChangeForm = data.passwordChangeForm;
    $: userRoleForm = data.userRoleForm;
    $: userData = data.user || {
        id: "",
        name: "",
        email: "",
        role: "",
        verified: false,
    };

</script>

<title>
    Settings - {userData.name} - {userData.email} | {userData.verified? "Verified" : "Not Verified"} | {userData.role}
</title>

<Card class="w-[900px]">
    {#if !userData.verified}
    <CardHeader>
        <Alert.Root variant="destructive">
            <Alert.Title>Email Verification Required</Alert.Title>
            <Alert.Description>
                Please verify your email address by clicking the link we sent to your inbox. Until you verify your email, you won't be able to make changes to your account.
            </Alert.Description>
        </Alert.Root>
    </CardHeader>
    {/if}
    <CardHeader>
        <p class="text-2xl font-semibold text-center">⚙️ Settings</p>
    </CardHeader>
    <CardContent class="flex flex-col gap-4">
        <div class="flex flex-row gap-4 flex-wrap">
            <div class="flex-1">
                <UserDataForm {userDataForm} {userData} />
            </div>
            <Separator orientation="vertical" />
            <div class="flex-1">
                <UserRoleForm {userRoleForm} {userData} />
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <Separator />
            <div class="flex-2">
                <PasswordChangeForm {passwordChangeForm} {userData} />
            </div>
        </div>
    </CardContent>
</Card>