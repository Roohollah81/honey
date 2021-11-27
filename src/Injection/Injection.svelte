<script>
	import SideButton from './SideButton.svelte';

	import RelatedButtonLogo from './RelatedButtonLogo.svelte';
	import { onMount } from 'svelte';
	const clickHandler = () => {
		alert('clicked2!!!!');
	};
	let src = '';

	let logoButton;
	let nameButton;
	let picButton;
	let sideButton;

	onMount(() => {
		if (typeof browser !== 'undefined') {
			src = browser.runtime.getURL('/icons/default/icon-32.png');
		}
		const instagram_logo = document.querySelector('#react-root > div > div > section > nav > div > div > div > div > a > div > div');
		if (instagram_logo !== null) instagram_logo.appendChild(logoButton);

		const page_username = document.querySelector('#react-root > div > div > section > main > div > header > section > div > h1');
		if (page_username !== null) page_username.appendChild(nameButton);

		const page_pic_3 = document.getElementsByClassName('_9AhH0')[3 - 1];
		if (page_pic_3 !== null) page_pic_3.appendChild(picButton);
	});
</script>

<style lang="scss">
	.qButton {
		border-radius: 30px;
		border: 3px solid rgb(64, 85, 191);
		background-color: white;
		color: #4055bf;
		font-family: Roboto;
		font-weight: bold;
		display: flex;
		direction: rtl;
		justify-content: space-evenly;
		align-items: center;
		padding: 0px;
		text-align: center;
		z-index: 1000;
	}
	.qButton-1 {
		position: absolute;
		font-size: 6px;
		width: 66px;
		height: 18px;
		right: 0;
		top: 33px;
	}
	.qButton-2 {
		font-size: 14px;
		width: 138px;
		height: 37px;
	}
	.qButton-3 {
		position: absolute;
		top: 0;
		left: 0;
		margin: 10px;
		font-size: 8px;
		width: 131px;
		height: 40px;
		color: black;
		text-align: left;
		font-weight: 400;
		span > b {
			font-weight: bold;
		}
	}
	.qButton-side {
		position: fixed;
		top: 40%;
		right: -9px;
	}
</style>

<!-- svelte-ignore a11y-invalid-attribute -->
<a class="qButton qButton-1" bind:this={logoButton} href="" on:click|stopPropagation={clickHandler}>
	Related events
	<RelatedButtonLogo size={12} />
</a>

<!-- svelte-ignore a11y-invalid-attribute -->
<a class="qButton qButton-2" bind:this={nameButton} href="nowhere" on:click|stopPropagation={clickHandler}>
	Related events
	<RelatedButtonLogo size={23} />
</a>
<!-- svelte-ignore a11y-invalid-attribute -->
<a class="qButton qButton-3" bind:this={picButton} href="nowhere" on:click|stopPropagation={clickHandler}>
	<span
		>New <b>Challenge/Reward</b><br />
		See details
	</span>
	<RelatedButtonLogo size={23} />
</a>
<!-- svelte-ignore a11y-invalid-attribute -->
<a class="qButton-side" bind:this={sideButton} href="nowhere" on:click|stopPropagation={clickHandler}>
	<SideButton />
</a>
