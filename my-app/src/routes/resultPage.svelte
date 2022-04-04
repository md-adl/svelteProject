<script>
		// @ts-nocheck
	/**
	 *	fileName  		: Result.svelte
	 *	Description 	: After the giving the test you can see the result percentage and 		                 	unattempted and attempted
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 31-march-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */

	import Header from '../componets/Header.svelte';
	import { choose__ans, user_chk, post, review_ftr } from '../store';
	import { onMount } from 'svelte';

	let incorrect_ans = 0;
	let coorect_ans = 0;
	let score = 0;
	let option_arr = ['A', 'B', 'C', 'D'];
	let actual_crt = [];

	let answer_user = [];

	$: for (let i = 0; i < $post.length; i++) {
		let correct_indx = 0;
		if ($choose__ans[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($post[i].content_text).answers[j].answer == $choose__ans[i]) {
					correct_indx = j;
				}
			}
		} else {
			correct_indx = null;
		}
		answer_user[i] = correct_indx;
	}

	$: for (let i = 0; i < $post.length; i++) {
		let actual_crct = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($post[i].content_text).answers[j].is_correct == '1') {
				actual_crct = j;
			}
		}
		actual_crt[i] = actual_crct;
	}

	onMount(() => {
		$user_chk.sort(function (a, b) {
			return a.question_nmbr - b.question_nmbr;
		});
		for (let i = 0; i < $user_chk.length; i++) {
			if ($user_chk[i].user_crct == '1') {
				coorect_ans = coorect_ans + 1;
				console.log('hiii', coorect_ans);
			} else {
				incorrect_ans += 1;
			}
			score = ((coorect_ans / 11) * 100).toFixed(2);
		}
	});
	let j;
	let unselected = [];
	let matched = [];
	for (let i = 0; i < $post.length; i++) {
		for (j = 0; j < $user_chk.length; j++) {
			if (i + 1 == $user_chk[j].question_nmbr) {
				matched[i] = i + 1;
				break;
			} else {
				matched[i] = 0;
			}
		}
		if (j >= $user_chk.length) {
			unselected[i] = i + 1;
		}
	}
	$: data = $choose__ans.filter(Boolean);
	const reviewPage=()=>{
		review_ftr.set(true)
	}
</script>

<Header />
<main>
	<div class="container">
		<div class="header">
			<div>
				<h3>Correct</h3>
				<p>{coorect_ans}</p>
			</div>
			<div>
				<h3>Incorrect</h3>
				<p>{incorrect_ans}</p>
			</div>

			<div>
				<h3>attempted</h3>
				<p>{data.length}</p>
			</div>

			<div>
				<h3>unattempted</h3>
				<p>{11 - data.length}</p>
			</div>

			<div>
				<h3 class="total_rslt">Total Result:</h3>
				<p>{score}%</p>
			</div>
		</div>

		<div class="question_container">
			<div class="result">
				{#each $post as dataItem, i}
					<a href={`review/${i}`} class="link" on:click={reviewPage}>
						<div class="question_row">
							<div class="question"><span>{i + 1}</span></div>
							<p class="wrap">{JSON.parse(dataItem.content_text).question}</p>

							<div class="result_optn">
								{#each option_arr as optionData, j}
									<div
										class="{`${actual_crt[i] == j}`} option"
										class:selected={actual_crt[i] != answer_user[i] &&
										answer_user[i] == j
											? true
											: false}
									>
										<p>{optionData}</p>
									</div>
								{/each}

								{#each $user_chk as selectQue}
									{#if i + 1 == selectQue.question_nmbr}
										{#if selectQue.user_crct == 0}
											<h3>InCorrect</h3>
										{:else}
											<h3>correct</h3>
										{/if}
									{/if}
								{/each}
							</div>
							{#each unselected as unattepmted}
								{#if i + 1 == unattepmted}
									<h3>Unattempted</h3>
								{/if}
							{/each}
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	.wrap {
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
		overflow: hidden;
		width: 30em;
	}
	.result {
		padding: 10px;
		position: absolute;
	}
	.question_row {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.header {
		display: flex;
		justify-content: center;
		text-align: center;
		border: 1px solid black;
		max-width: 700px;
		margin-left: 200px;
		margin-top: 80px;
		gap: 40px;
	}
	.question_container {
		text-align: center;
		max-width: 700px;
		margin-left: 200px;
		position: absolute;
		gap: 10px;
	}
	.option {
		border: 1px solid black;
		width: 20px;
		height: 20px;
		margin: 2px;
		border-radius: 3px;
		text-align: center;
	}
	.result_optn {
		display: flex;
		margin: 3px;
	}
	.question {
		width: 20px;
		height: 20px;
		border-radius: 20px;
		background-color: gray;
		margin-right: 10px;
	}
	.true {
		background-color: green;
	}
	.selected {
		background-color: red;
	}
	a {
		text-decoration: none;
	}
</style>
