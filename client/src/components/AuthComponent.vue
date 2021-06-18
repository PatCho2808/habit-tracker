<template>
	<div class="auth">
		<div class="auth__login">
			<h3 class="heading--tertiary">Login:</h3>
			<form action="#" class="auth__form">
				<label for="email" class="auth__label">Email:</label>
				<input
					type="email"
					class="auth__input"
					name="email"
					id="email"
					v-model="username_login"
				/>
				<label for="password" class="auth__label">Password:</label>
				<input
					type="password"
					class="auth__input"
					name="password"
					id="password"
					v-model="password_login"
				/>
				<button class="btn" @click="login">submit</button>
			</form>
		</div>
		<div class="auth__register">
			<h3 class="heading--tertiary">Or register:</h3>
			<form action="#" class="auth__form">
				<label for="email" class="auth__label">Email:</label>
				<input
					type="email"
					class="auth__input"
					name="email"
					id="email"
					v-model="username_register"
				/>
				<label for="password" class="auth__label">Password:</label>
				<input
					type="password"
					class="auth__input"
					name="password"
					id="password"
					v-model="password_register"
				/>
				<button class="btn" @click="register">submit</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'AuthComponent',
	props: {
		msg: String
	},
	data() {
		return {
			username_login: '',
			password_login: '',
			username_register: '',
			password_register: ''
		};
	},
	methods: {
		login(event) {
			event.preventDefault();
			if (this.username && this.password) {
				this.$emit('loginIn', this.username_login, this.password_login);
			}
		},

		register(event) {
			event.preventDefault();
			if (this.username && this.password) {
				this.$emit('register', this.username_register, this.password_register);
			}
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.auth {
	display: flex;
	justify-content: space-around;

	width: 80%;
	font-size: 2.5rem;
	margin-top: -10rem;

	&__form {
		display: flex;
		flex-direction: column;
		padding: 2rem;
		margin-top: 2rem;
	}

	&__label {
		padding: 2rem;
		font-size: 3rem;
		font-weight: 300;
		letter-spacing: 0.5rem;
	}

	&__input {
		font-size: 2rem;
		font-family: inherit;
		color: inherit;
		border-radius: 1rem;
		outline: none;
		border: none;
		padding: 1.2rem 3rem;
		margin-bottom: 2rem;
		box-shadow: 0.5rem 1rem 2rem black;
	}
}

.heading--tertiary {
	font-size: 5rem;
	text-align: center;
	letter-spacing: 0.5rem;
	text-transform: uppercase;
	margin-bottom: 2rem;
}

.btn {
	margin-top: 4rem;
	font-size: 3rem;
	text-transform: uppercase;
	color: inherit;
	background-color: var(--color-secondary);
	outline: none;
	border: none;
	align-self: center;
	padding: 1rem 2rem;
	border-radius: 1rem;
	cursor: pointer;
	transition: all 0.2s;
	box-shadow: 0.5rem 1rem 2rem black;

	&:hover {
		transform: translateY(-0.7rem);
		box-shadow: 0.5rem 1.5rem 2.5rem black;
	}

	&:active {
		transform: translateY(-0.4rem);
		box-shadow: 0.5rem 1.25rem 2.25rem black;
	}
}
</style>
