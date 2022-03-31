<script>
	/**
	 *	fileName  		:  footer.svelte
	 *	Description 	: showing Buuton Next and Prevoious you can go next question and previous question you can also end the test
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 31-march-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */
	import Sidebar from './Sidebar.svelte';
	import { reviewFooter } from '../store';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Timer from '../componets/Timer.svelte';
	let sidebar_show = false;
	let review;
	export let qustionIdNo;
	qustionIdNo = Number(qustionIdNo);
	onMount(() => {
		reviewFooter.subscribe((value) => {
			review = value;
		});
	});

	export let currentQue;
	const dispatch = createEventDispatcher();

	function nextQuest() {
		dispatch('updateCurrent');
	}

	function prevQuest() {
		dispatch('updatePrev');
	}
	const changeIndex = (event) => {
		console.log('events are', event.detail);
		dispatch('changeCorrectQues', event.detail);
	};
	const confirmBox = () => {
		dispatch('confirmBoxs');
	};
</script>

<main>
	<footer>
		<div>
			{#if !review}
				<div>
					<!-- svelte-ignore a11y-accesskey -->
					<button id="end" class="btn" on:click={confirmBox} accesskey="t">End Test</button>
					{#if currentQue == 10}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn" on:click={nextQuest} disabled >Next</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn" on:click={nextQuest} accesskey="n">Next</button>
					{/if}
					     <div>
							 <h4>{currentQue+1} of 11</h4>
						 </div>
					{#if currentQue == 0}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn" on:click={prevQuest} disabled >Previous</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn" on:click={prevQuest} accesskey="p">Previous</button>
					{/if}
					<!-- svelte-ignore a11y-accesskey -->
					<button class="btn" on:click={() => (sidebar_show = !sidebar_show)} accesskey="l">List</button>
					<div>
						<Timer />
					</div>
					<Sidebar bind:show={sidebar_show} on:changeIndex={changeIndex} />
				</div>
			{:else}
				<div>
					{#if qustionIdNo == 10}
						<button id="nxt" class="btn" on:click={nextQuest} disabled >Next</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="nxt" class="btn" on:click={nextQuest} accesskey="n">Next</button>
					{/if}
					  <div>
						<h4>{qustionIdNo+1}of 11</h4>

					  </div>
					{#if qustionIdNo == 0}
						<button id="prev" class="btn" on:click={prevQuest} disabled>Previous</button>
					{:else}
						<!-- svelte-ignore a11y-accesskey -->
						<button id="prev" class="btn" on:click={prevQuest} accesskey="p">Previous</button>
					{/if}
					<!-- svelte-ignore a11y-accesskey -->
					<button class="btn" on:click={() => (sidebar_show = !sidebar_show)} accesskey="l" >List</button>

					<Sidebar bind:show={sidebar_show} on:changeIndex={changeIndex} />
					<a href="/">
					  <button class="btn">Dashboard</button>
					</a>
				</div>
			{/if}
		</div>
	</footer>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.btn {
		float: right;
		margin: 8px;
		width: 70px;
		height: 20px;
	}
	footer {
		position: fixed;
		bottom: 0px;
		width: 100%;
		padding-left: 22px;
		background-color: rgb(237, 247, 248);
		z-index: 10;
		border-top: 2px solid rgba(0, 0, 0, 0.3);
	}
	footer div {
		float: right;
		padding: 10px;
	}
</style>
