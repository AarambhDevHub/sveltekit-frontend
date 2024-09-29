<script lang="ts">
    import { Card, CardHeader, CardContent } from "@/components/ui/card";
    import DataTable from './data-table.svelte';
	import { goto } from "$app/navigation";
    
    export let data: {
        users: Array<{
            id: string;
            email: string;
            name: string;
            role: string;
        }>;
        totalPage: number;
        isAdmin: boolean;
        pageIndex: number;
    };

    $: ({ isAdmin, totalPage, pageIndex, users } = data);

    const handlePageChange = async (newPage: number) => {
        const adjustedPageIndex = Math.max(1, newPage);
        await goto(`/admin?page=${adjustedPageIndex.toString()}`,{ invalidateAll: true });
    }

</script>

<title>
    Admin Users Data | {totalPage} Pages | {pageIndex} Page | {isAdmin? 'Admin' : 'User'}
</title>

<Card class="w-[900px] shadow-sm">
    <CardHeader>
        <p class="text-2xl font-semibold text-center">👥 Users Data</p>
    </CardHeader>
    <CardContent class="space-y-2">
        {#if isAdmin}
            <DataTable usersData={users} currentPage={pageIndex} totalPage={totalPage} onPageChange={(newPage) => handlePageChange(newPage)} />
        {:else}
            <p class="text-2xl text-center font-bold">You do not have permission to view this data.</p>
        {/if}
    </CardContent>
</Card>
