<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	
</script>

<ModeWatcher defaultTheme="light" defaultMode="light" />
<Toaster />
<slot />
