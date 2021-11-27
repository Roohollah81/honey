<script>
    import Header from './Header.svelte';
	import Content from './Content.svelte';
	import Footer from './Footer.svelte';
</script>

<style lang="scss">
	div.container {
		position: relative;
		width: 100px;
		height: 100px;
		background-color: aqua;
		border: 10px solid black;
	}
</style>

<div class="container">
    <Header />
	<Content />
	<Footer />
</div>
