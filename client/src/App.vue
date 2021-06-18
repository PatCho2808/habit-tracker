<template>
	<div id="app">
		<auth-component
			v-if="!isLoggedIn"
			@loginIn="onLoginIn"
			@register="onRegister"
			msg="Heloł"
		/>
	</div>
</template>

<script>
import AuthComponent from './components/AuthComponent.vue';
import AuthService from './services/AuthService';

const authService = new AuthService();

export default {
	name: 'App',
	components: {
		AuthComponent
	},
	data() {
		return {
			isLoggedIn: false
		};
	},
	methods: {
		async onLoginIn(username, password) {
			this.isLoggedIn = await authService.login(username, password);
		},
		async onRegister(username, password) {
			this.isLoggedIn = await authService.register(username, password);
		}
	},
	created: function() {
		this.isLoggedIn = authService.getIsLoggedIn();
	}
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

#app {
	/* https://coolors.co/231942-5e548e-9f86c0-be95c4-e0b1cb */
	--color-primary: #231942;
	--color-secondary: #5e548e;
	--color-tertiary: #9f86c0;

	width: 100vw;
	height: 100vh;

	background-color: var(--color-primary);

	display: flex;
	justify-content: center;
	align-items: center;

	color: var(--color-tertiary);
}

*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: inherit;
}

html {
	font-size: 62.5%;
}

body {
	box-sizing: border-box;
	margin: 0;
	font-family: 'Quicksand', sans-serif;
}
</style>
