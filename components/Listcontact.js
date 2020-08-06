import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, Button, Alert } from "react-native";
import { Icon } from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";

// import ImagePickerExample from "./image";

let colours = ["#599e96", "white"];

export default function ListItem({
	item,
	index,
	navigation,
	onDelete,
	onEdit,
}) {
	//Returns a colour based on the index
	function random() {
		if (index % 2 === 0) {
			//check if its an even number
			return colours[0];
		} else {
			return colours[1];
		}
	}

	return (
		<View style={styles.row}>
			<View style={[styles.container, { backgroundColor: random() }]}>
				<Text style={styles.person}>
					{/* <Icon name="ios-contact" color="#4F8EF7" size="25" /> */}
					{item.person}
				</Text>
				{/* <Icon name="ios-contact" color="#4F8EF7" size="25" /> */}

				<Text style={styles.text}>{item.text}</Text>
				<View style={styles.fixToText}>
					{/* <View style={[styles.rightAction, styles.editAction]}> */}
					<Button
						title="Edit"
						color="black"
						// onPress={() => Alert.alert("Button with adjusted color pressed")}
						onPress={() => onEdit(item)}
					/>
					{/* <View style={[styles.rightAction, styles.deleteAction]}> */}

					<Button
						title="Delete "
						color="black"
						onPress={() => onDelete(item.id)}
					></Button>
				</View>
			</View>
			{/* <ImagePickerExample /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: "#424242",
		backgroundColor: "#FFF",
		padding: 1,
	},

	container: {
		padding: 1,
	},
	text: {
		marginTop: 2,
		fontFamily: "HelveticaNeue-Medium",
		fontSize: 15,
		lineHeight: 21,
		color: "black",
	},

	person: {
		marginTop: 2,
		marginBottom: 2,
		fontFamily: "HelveticaNeue-Medium",
		fontSize: 17,
		color: "black",
		textAlign: "left",
	},

	buttons: {
		width: 190,
		flexDirection: "row",
	},

	rightAction: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		// width: 95,
		textAlign: "right",
	},

	editAction: {
		backgroundColor: "#497AFC",
	},

	deleteAction: {
		backgroundColor: "#dd2c00",
	},

	actionText: {
		color: "#fff",
		fontWeight: "600",
		padding: 20,
	},
	fixToText: {
		flexDirection: "row",
		// justifyContent: "space-between",
		justifyContent: "space-evenly",
	},
});
