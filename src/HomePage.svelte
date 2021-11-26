<script>
    import Header from './Header.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
</script>

<style lang="scss">
	div.container {
		position: relative;
		width: 360px;
		height: 600px;
		border: 1px solid gray;
	}
</style>

<div class="container">
    <Header />
	<Content />
	<Footer />
</div>
