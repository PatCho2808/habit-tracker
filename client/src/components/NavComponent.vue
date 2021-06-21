<template>
	<div class="nav">
		<div class="nav__title">
			Habit tracker
			<br />
			<span class="nav__title__desc">Be more organized in your life</span>
		</div>
		<ul class="nav__list">
			<li class="nav__list__item">Current habits</li>
			<li class="nav__list__item">All habits</li>
			<li class="nav__list__item">Done habits</li>
			<li class="nav__list__item">Summary</li>
			<li class="nav__list__item">Settings</li>
			<li class="nav__list__item">About</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'NavComponent'
};
</script>

<style scoped lang="scss">
.nav {
	flex: 0 0 20%;
	background-color: black;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	&__title {
		flex: 0 0 40%;
		font-size: 6rem;
		padding: 2rem;
		margin-top: 2rem;
		text-transform: uppercase;
		line-height: 5rem;
		letter-spacing: 1.5rem;
		&__desc {
			font-size: 1.5rem;
			text-transform: none;
			letter-spacing: 0;
		}
	}
	&__list {
		margin-top: -5rem;
		height: 50%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-size: 2rem;
		list-style: none;
		&__item {
		}
	}
}
</style>
