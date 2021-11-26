<script>
	import ProfilePage from './BasedOnBottomNav/Profile/ProfilePage.svelte';
	import { page } from 'localStorageStores';
	import ChallengePage from './Challenge/ChallengePage.svelte';
	import ClaimBody from './Claim/ClaimBody.svelte';
	import ClaimBody2 from './Claim/ClaimBody2.svelte';
	import ClaimBody3 from './Claim/ClaimBody3.svelte';
	import ClaimBottom from './Claim/ClaimBottom.svelte';
	import ClaimTopBar from './Claim/ClaimTopBar.svelte';
	import HomePage from './BasedOnBottomNav/HomePage/HomePage.svelte';
	import LoginPage from './Login/LoginPage.svelte';
	import SearchPage from './BasedOnBottomNav/SearchPage/SearchPage.svelte';

	let settings = {
		theme: 'auto',
	};
</script>

<style lang="scss">
	main {
		display: flex;
		flex-flow: column nowrap;
		height: 100%;
	}

	// svg {
	// 	fill: currentColor;
	// }

	.row {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		flex: 0 0 40px;

		font-size: 1rem;
		font-weight: normal;

		border-bottom: 1px solid var(--hover-color);
	}
	:global(.center) {
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		// height: 100%;
		color: #9aa0a6;
		font-weight: bold;
		text-align: center;
	}
</style>

<main class={settings.theme}>
	{#if $page === 'home'}
		<HomePage />
	{:else if $page === 'claim'}
		<ClaimTopBar />
		<ClaimBody />
		<ClaimBottom />
	{:else if $page === 'claim-now'}
		<ClaimTopBar />
		<ClaimBody2 />
		<ClaimBottom isClaimAllowed="true" buttonText="Claim Now" />
	{:else if $page === 'start-now'}
		<ClaimTopBar />
		<ClaimBody3 />
		<ClaimBottom isClaimAllowed="true" buttonText="Start Now" />
	{:else if $page === 'challenge'}
		<ChallengePage />
	{:else if $page.startsWith('login')}
		<LoginPage />
	{:else if $page === 'search'}
		<SearchPage />
	{:else if $page === 'profile'}
		<ProfilePage />
	{/if}
</main>
