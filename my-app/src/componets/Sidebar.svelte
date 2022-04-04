<script>
	// @ts-nocheck
	/**
	 *	fileName  		: sidebar.svelte
	 *	Description 	: This component has if you click the list button you can see attempted and Unattempted question
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 31-march-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */

	import { fly } from 'svelte/transition';
	import { post } from '../store';
	import { choose__ans } from '../store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = true;
	let postData = [];
	import { onMount } from 'svelte';
	onMount(() => {
		post.subscribe((value) => {
			postData = value;
		});
	});
	const setCorrectValue = (i) => {
		dispatch('changeIndex', i);
	};

	console.log('wjdgwgewqhewu', $choose__ans);
	$: data = $choose__ans.filter(Boolean);
</script>

{#if show}
	<nav transition:fly={{ x: -550, opacity: 1 }} class="container">
		<div>
			<p>attempted :{data.length}</p>
			<p>unattempted : {11 - data.length}</p>
		</div>
		&nbsp;

		<div class="btn">
			{#each postData as dataItem, i (dataItem)}
				<p id="list{i}" class="wrap" on:click={setCorrectValue(i)}>
					Q{i + 1}
					{JSON.parse(dataItem.content_text).question}
				</p>
			{/each}
		</div>
	</nav>
{/if}

<style>
	.wrap {
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		overflow: hidden;
		width: 8em;
	}

	nav {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		border-left: 1px solid #aaa;
		background: #fff;
		overflow-y: auto;
		width: 10rem;
	}
	.btn {
		display: flex;
		justify-content: space-evenly;
		flex-direction: column;
		gap: 10px;
		cursor: pointer;
	}
	.container {
		border: 1px solid black;
		margin-top: 47px;
	}
</style>
