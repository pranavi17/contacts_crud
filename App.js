import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import store from "./components/redux/store"; //Import the store
import Router from "./components/index"; //Import the component file

export default function App() {
	return (
		// <View style={styles.container}>
		// 	<Text>Working on your app!</Text>
		// 	<StatusBar style="auto" />
		// </View>
		<Provider store={store}>
			<Router />
		</Provider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });
