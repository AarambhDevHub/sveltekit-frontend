<script lang="ts">
	import { Card, CardContent, CardHeader } from "@/components/ui/card";


    export let data;
    const response = data.response.data.user || {
        id: '',
        email: '',
        name: '',
        role: '',
    };
</script>

<title>
    User Data - {response.name}
</title>

<Card class="w-[900px] shadow-md">
    <CardHeader>
        <p class="text-2xl font-semibold text-center">👤 User Data</p>
    </CardHeader>
    <CardContent class="space-y-4">
        <div class='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p class='text-sm font-medium'>ID</p>
            <p class='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
                {response.id}
            </p>
        </div>
        <div class='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p class='text-sm font-medium'>Email</p>
            <p class='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
                {response.email}
            </p>
        </div>
        <div class='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p class='text-sm font-medium'>Name</p>
            <p class='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
                {response.name}
            </p>
        </div>
        <div class='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <p class='text-sm font-medium'>Role</p>
            <p class='truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md'>
                {response.role}
            </p>
        </div>
        
    </CardContent>
</Card>