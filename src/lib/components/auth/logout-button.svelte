<script>
	import toast from "svelte-french-toast";
	import { Button } from "../ui/button";
	import { goto } from "$app/navigation";
	import { Reload } from "svelte-radix";

    let isLoading = false;

    async function handleLogout() {
        // Perform the logout by sending a POST request to the logout endpoint
        isLoading = true;
        const response = await fetch('/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle the redirection
        if (response.ok) {
            toast.success("Logout successful! Redirecting to login...");
            setTimeout(() => goto('/login'), 1000); 
        } else {
            console.error('Logout failed');
        }
        isLoading = false;
    }


</script>
<Button on:click={handleLogout} disabled={isLoading} variant='outline'>
    {#if isLoading}
		<Reload class="mr-2 h-4 w-4 animate-spin" />
	{/if}
    Logout
</Button>