import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"
const Togglable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}
	const hideWhenVisible = { display: visible ? "none" : "" }
	const showWhenVisible = { display: visible ? "" : "none" }

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})
	return (
		<div>
			<div style={hideWhenVisible}>
				<button
					className="mx-8 p-4 rounded-full font-semibold bg-indigo-900 text-white"
					onClick={toggleVisibility}
				>
					{props.buttonLabel}
				</button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<button onClick={toggleVisibility}>cancle</button>
			</div>
		</div>
	)
})

Togglable.displayName = "Togglable"
Togglable.propTypes = {
	buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
