<script>
	/**
	 *	fileName  		:  test.svelte
	 *	Description 	:  this page have question ans answer you can give the test also showing the list of attemeted and Unattempted question
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 31-march-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */
	import { post, userChecked } from '../store';
	import Footer from '../componets/Footer.svelte';
	import { chooseAns } from '../store';
	import Confirm from '../componets/Confirm.svelte';
	import { onMount } from 'svelte';
	import Header from '../componets/Header.svelte';
	let posts = [];
	let currentQues = 0;
	let data = false;
	
	let checkedAns = [];
	$: chooseAns.update((items) => {
		return [...checkedAns];
	});
	let userCheckedData = [];

	onMount(async () => {
		const responce = await fetch(`data/jsonFile.json`);
		posts = await responce.json();
		post.set(posts);
		console.log(posts);
	});

	const Incre = () => {
		currentQues = currentQues + 1;
	};

	const decre = () => {
		currentQues = currentQues - 1;
	};
	const questionAttempt = (i, index) => {
		console.log(index);
		let id = JSON.parse(posts[i].content_text).answers[index].id;
		console.log(id);
		
		 let userOptionCorrect = JSON.parse(posts[i].content_text).answers[index].is_correct;
		let userOptionCheckedAns=index
		let userCheckQuestion = JSON.parse(posts[i].content_text).question;
		let quetionId = JSON.parse(posts[i].content_id);
		let questionNumber = i + 1;
		userCheckedData.push({
			userOptionCorrect:userOptionCorrect,
			userOptionCheckedAns: userOptionCheckedAns,
			userCheckQuestion: userCheckQuestion,
			questionNumber: questionNumber,
			quetionId: quetionId
		});
		userChecked.set(userCheckedData);
		// console.log('checked answer is', checkedAns);
		for (i=0; i<=userCheckedData.length; i++){
			
		}
	};
	const changeCorrectQues = (event) => {
		currentQues = event.detail;
	};
	const confirmBoxs = () => {
		data = true;
	};
	const offBox = () => {
		data = false;
	};
</script>

<main>
	<Header />
	<div class="conatiner">
		{#each posts as dataItem, i (dataItem)}
			{#if currentQues == i}
				<h3 class="show-ques">{i + 1} {JSON.parse(dataItem.content_text).question}</h3>

				{#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
					<div class="answer">
						<label>
							<input
								on:click={questionAttempt(i, index)}
								type="radio"
								name="ans"
								id={ans.id}
								class="selectAns"
								value={ans.answer}
								bind:group={checkedAns[i]}
							/>
							{@html ans.answer}
						</label>
					</div>
				{/each}
			{/if}
		{/each}
	</div>
</main>

<Footer
	on:updateCurrent={Incre}
	on:updatePrev={decre}
	currentQue={currentQues}
	on:changeCorrectQues={changeCorrectQues}
	on:confirmBoxs={confirmBoxs}
/>
{#if data}
	<div class="confirm">
		<Confirm on:offBox={offBox} />
	</div>
{/if}

<style>
	.confirm {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.answer {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.conatiner {
		max-width: 600px;
		height: 100vh;
		margin: auto;
		margin-top: 80px;
	}
</style>
