<template>
	<div class="user">
		<div class="user__name">Patrycja</div>
		<div class="user__photobox">
			<img
				src="../assets/blank-user.png"
				alt="user-photo"
				class="user__photo"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'UserComponent'
};
</script>

<style lang="scss" scoped>
.user {
	margin: 5rem;
	display: flex;
	align-items: center;
	flex-direction: row-reverse;

	&__name {
		margin-left: 2rem;
		font-size: 3rem;
	}
	&__photo {
		width: 5.5rem;
		border-radius: 3rem;
	}
}
</style>
