
<script>
	import { tweened } from 'svelte/motion';
	let orig = 2 * 60;
	let timer = tweened(orig);
	
	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
	$: minut = Math.floor($timer / 60);
	$: sec = Math.floor($timer - minut * 60);
</script>

{#if minut == 0 && sec == 0}
	<div class="timer">
		<div class="modal">
			<h3>Test Time is Over</h3>
			<a href="/resultPage"><button>See Your Result</button></a>
		</div>
	</div>
{:else}
	<h4>
		<span class="mins">{minut}</span><span class="secs">:{sec}</span>
	</h4>
{/if}

<style>
	.timer {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.modal {
		padding: 10px;
		border-radius: 8px;
		min-width: 300px;
		max-width: 400px;
		min-height: 200px;
		margin: 10% auto;
		text-align: center;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.modal > a > button {
		width: 150px;
		display: inline-block;
		background: #027ad6;
		border: none;
		cursor: pointer;
		height: 30px;
		margin-top: 10px;
	}
</style>