<script>
	/**
	 *	fileName  		:  test.svelte
	 *	Description 	:  this page have question ans answer you can give the test also showing the list of attemeted and Unattempted question
	 *	Author   		: Mohammad Adil
	 *	version 		: 1.0
	 *	created 		: 31-march-2022;
	 *	updated by 		: Mohammad Adil   mohammad.adil@ucertify.com
	 */
	import { post, user_chk } from '../store';
	import Footer from '../componets/Footer.svelte';
	import { choose__ans } from '../store';
	import Confirm from '../componets/Confirm.svelte';
	import { onMount } from 'svelte';
	import Header from '../componets/Header.svelte';
	let posts = [];
	let current_ques = 0;
	let data = false;

	let checked_ans = [];
	$: choose__ans.update((items) => {
		return [...checked_ans];
	});
	let user_chkData = [];

	onMount(async () => {
		const responce = await fetch(`data/jsonFile.json`);
		posts = await responce.json();
		post.set(posts);
		console.log(posts);
	});

	const Incre = () => {
		current_ques = current_ques + 1;
	};

	const decre = () => {
		current_ques = current_ques - 1;
	};
	const question_atmt = (i, index) => {
		let id = JSON.parse(posts[i].content_text).answers[index].id;
		console.log(id);
		let user_crct = JSON.parse(posts[i].content_text).answers[index].is_correct;
		let user_ansr = index;
		let usercheck__que = JSON.parse(posts[i].content_text).question;
		let question_id = JSON.parse(posts[i].content_id);
		let question_nmbr = i + 1;
		user_chkData.push({
			user_crct: user_crct,
			user_ansr: user_ansr,
			usercheck__que: usercheck__que,
			question_nmbr: question_nmbr,
			question_id: question_id
		});
		user_chk.set(user_chkData);
	};
	const changecoorect_ques = (event) => {
		current_ques = event.detail;
	};
	const modal = () => {
		data = true;
	};
	const close = () => {
		data = false;
	};
</script>

<main>
	<Header />
	<div class="conatiner">
		{#each posts as dataItem, i (dataItem)}
			{#if current_ques == i}
				<h3 class="show-ques">{i + 1} {JSON.parse(dataItem.content_text).question}</h3>

				{#each JSON.parse(dataItem.content_text).answers as ans, index (ans)}
					<div class="answer">
						<label>
							<input
								on:click={question_atmt(i, index)}
								type="radio"
								name="ans"
								id={ans.id}
								class="selectAns"
								value={ans.answer}
								bind:group={checked_ans[i]}
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
	currentQue={current_ques}
	on:changecoorect_ques={changecoorect_ques}
	on:modal={modal}
/>
{#if data}
	<div class="confirm">
		<Confirm on:close={close} />
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
