<script>
	import { Button } from "@/components/ui/button";
    import { page } from '$app/stores';
    import LogoutButton from '@/components/auth/logout-button.svelte'

    let pathname = "settings";
    
    $: pathname = $page.url.pathname;
</script>

<nav class="bg-secondary flex justify-between items-center p-4 rounded-xl w-[800px] shadow-sm">
    <div class="flex gap-x-2">
        <Button href="/server" variant={pathname === "/server" ? "default" : "outline"}>
            Server
        </Button>
        <Button href="/admin" variant={pathname === "/admin" ? "default" : "outline"}>
            Admin
        </Button>
        <Button href="/settings" variant={pathname === "/settings" ? "default" : "outline"}>
            Settings
        </Button>
    </div>
    <LogoutButton />
</nav>