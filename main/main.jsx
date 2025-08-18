import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../store/index.js";
import "./index.css";
import TodoApp from "./App.jsx";

const domContainer = document.getElementById("root");
const root = ReactDOM.createRoot(domContainer);
root.render(
	<Provider store={store}>
		<React.StrictMode>
			<Router>
				<TodoApp />
			</Router>
		</React.StrictMode>
	</Provider>,
);
