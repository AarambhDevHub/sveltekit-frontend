<!-- src/routes/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
</script>

<main class="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
    <div class="space-y-6 text-center">

        <span class="font-semibold text-white drop-shadow-md" style="font-size: 4rem; text-align: center;">🔐Auth</span>
        <h1 class="text-4xl font-bold mb-4" style="font-size: 2.25rem;">Welcome to Our Sample App</h1>
        <p class="mb-8">Register or Login to explore our features!</p>
        
        <button 
            class="bg-blue-500 text-white py-2 px-4 rounded-md mr-4" 
            on:click={() => goto('/register')}>
            Register
        </button>
        <button 
            class="bg-green-500 text-white py-2 px-4 rounded-md" 
            on:click={() => goto('/login')}>
            Login
        </button>
    </div>
</main>
