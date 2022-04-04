<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	const close = () => {
		dispatch('close');
	};
</script>

<div class="confirmBox">
	<h3>Are you sure want to confirm ?</h3>
	<div>
		<a href="/resultPage">
			<button class="btn">Yes</button>
		</a>
		<button class="btn" on:click={close}>No</button>
	</div>
</div>

<style>
	.confirmBox {
		top: 50%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		border: 1px solid lightslategray;
		height: 100px;
		width: 300px;
		text-align: center;
		background-color: white;
		z-index: 1;
		border-radius: 10px;
	}
	button {
		background: blue;
	}
	.btn {
		width: 50px;
		color: white;
	}
</style>
