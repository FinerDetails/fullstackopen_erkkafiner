const Login = ({
	handleLogin,
	username,
	setUsername,
	password,
	setPassword,
}) => (
	<div className="text-center">
		<h2 className="p-6 text-xl text-white bg-pink-900">
			Log in to application
		</h2>
		<form className="p-6 m-6 bg-pink-100" onSubmit={handleLogin}>
			<div>
				<input
					placeholder="username"
					className="border-b-2 border-pink-900 my-3"
					id="usernameField"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				<input
					className="border-b-2 border-pink-900 my-3"
					placeholder="password"
					id="passwordField"
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button
				className="border-b-2 border-pink-900 my-3"
				id="loginButton"
				type="submit"
			>
				login
			</button>
		</form>
	</div>
)
export default Login
