<script>
	import Header from '../componets/Header.svelte';
</script>

<Header />

<a href="/testPage">
	<button>Start Test</button>
</a>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	button {
		width: 78px;
		height: 27px;
		border-radius: 7px;
		border: 1px solid pink;
		color: blue;
		position: fixed;
		top: 50%;
		left: 50%;
	}
</style>
