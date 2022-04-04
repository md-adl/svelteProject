<script context="module">
	export const load = ({ params }) => {
		const id = params.id;
		return {
			props: {
				id: id
			}
		};
	};
</script>
<script>
    import Header from '../../componets/Header.svelte'
	import Footer from '../../componets/Footer.svelte'
	import {onDestroy} from 'svelte'

    import { post, review_ftr, user_chk,  } from '../../store';
    export let id;
	let pageNo = Number(id); // change id(string) to id(number) page no. means storing 
	let explanationAnswer; //
	// replacing the seq string to only one character(A or ,B or, C or, D )
    $: if (pageNo + 1) {
		explanationAnswer = JSON.parse($post[pageNo].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}

	const updateQues = (event) =>{
		pageNo = event.detail;
	} 

	const nextPage = ()=>{
		pageNo = pageNo+1
	}
	const prevPage = ()=>{
		pageNo = pageNo-1
	}
  onDestroy(()=>{
	  review_ftr.update((x) =>{
		  x=false;
	  })
  })
	 
</script>
<div class="reviewPage">
	<Header />
	<div class="question_cntr">
		{#each $post as data, i}
			{#if pageNo == i}
				<div class="question">
					<h3>
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="answer">
						<div class="answerOption">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
									<label class="answerOptionData">
										<input
											type="radio"
											class="radio"
											value={j}
											name="radio"
											bind:group={answers}
											disabled
										/>
										{@html answers.answer}
									</label>
								{:else}
									<label class="answerOptionData">
										<input type="radio" name="radio" disabled />
										{@html answers.answer}
									</label>
								{/if}
							{/each}
						</div>
                    
                    </div>
					{#each JSON.parse(data.content_text).answers as answersCorrect}
						{#if answersCorrect.is_correct == 1}
							<div class="explanation">
								<p>{@html explanationAnswer}</p>
							</div>
						{/if}
					{/each}
					{#each $user_chk as user}
						{#if i + 1 == user.question_nmbr}
							{#if user.user_crct == '1'}
								<div class="comparationResult">
									<h3>Correct</h3>
								</div>
							{:else}
								<div class="comparationResult">
									<h3>Incorrect</h3>
								</div>
							{/if}
						{/if}
					{/each}
					</div>
            {/if}
        {/each}            
    </div>
   <div>
	   <Footer
	           question_id = {pageNo}
	           on:changecoorect_ques={updateQues}
			   on:updateCurrent = {nextPage}
			   on:updatePrev = {prevPage}
	   />
   </div>
</div>   
<style>
   .explanation{
	   margin-top: 20px;
	   background: lavenderblush;
   }
	.answerOption{
		display: flex;
		justify-content: center;
		flex-direction: column;
		
	}
	.question_cntr{
		max-width: 600px;
		height: 100vh;
		margin: auto;
		margin-top: 80px;
	}
	.radio{
		border: 2px solid white;
		box-shadow: 0 0 0 1px #392;
		appearance: none;
		border-radius: 50%;
		width: 12px;
		height: 12px;
		background-color: green;
		transition: all ease-in 0.2s;
	}
</style>                 