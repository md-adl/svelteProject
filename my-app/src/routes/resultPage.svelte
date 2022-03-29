<script>
	import Header from '../componets/Header.svelte';
	import { chooseAns, userChecked, post, reviewFooter } from '../store';
	import { onMount } from 'svelte';

	let incorrectAns = 0;
	let correctAns = 0;
	let score = 0;
	let optionArray = ['A', 'B', 'C', 'D'];
	let actualCorrectArr = [];

	let answerChoosebyUser = [];

	$: for (let i = 0; i < $post.length; i++) {
		let correctIndex = 0;
		if ($chooseAns[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($post[i].content_text).answers[j].answer == $chooseAns[i]) {
					correctIndex = j;
				}
			}
		} else {
			correctIndex = null;
		}
		answerChoosebyUser[i] = correctIndex;
	}

	$: for (let i = 0; i < $post.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($post[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualCorrectArr[i] = actualCorrect;
	}

	onMount(() => {
		$userChecked.sort(function (a, b) {
			return a.questionNumber - b.questionNumber;
		});
		for (let i = 0; i < $userChecked.length; i++) {
			if ($userChecked[i].userOptionCorrect == '1') {
				correctAns = correctAns + 1;
				console.log('hiii', correctAns);
			} else {
				incorrectAns += 1;
			}
			score = ((correctAns / 11) * 100).toFixed(2);
		}
	});
	let j;
	let unselected = [];
	let matched = [];
	for (let i = 0; i < $post.length; i++) {
		for (j = 0; j < $userChecked.length; j++) {
			if (i + 1 == $userChecked[j].questionNumber) {
				matched[i] = i + 1;
				break;
			} else {
				matched[i] = 0;
			}
		}
		if (j >= $userChecked.length) {
			unselected[i] = i + 1;
			// console.log('un', unselected);
		}
	}
	$: data = $chooseAns.filter(Boolean);
	const reviewPage=()=>{
		reviewFooter.set(true)
	}
</script>

<Header />
<main>
	<div class="container">
		<div class="header">
			<div>
				<h3>Correct</h3>
				<p>{correctAns}</p>
			</div>
			<div>
				<h3>Incorrect</h3>
				<p>{incorrectAns}</p>
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
				<h3 class="totalResult">Total Result:</h3>
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

							<div class="resultOption">
								{#each optionArray as optionData, j}
									<div
										class="{`${actualCorrectArr[i] == j}`} option"
										class:selected={actualCorrectArr[i] != answerChoosebyUser[i] &&
										answerChoosebyUser[i] == j
											? true
											: false}
									>
										<p>{optionData}</p>
									</div>
								{/each}

								{#each $userChecked as selectQue}
									{#if i + 1 == selectQue.questionNumber}
										{#if selectQue.userOptionCorrect == 0}
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
	.resultOption {
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
