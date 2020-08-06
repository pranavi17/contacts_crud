import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	ActivityIndicator,
	TouchableHighlight,
	AsyncStorage,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { addContact, deleteContact } from "./redux/actions";

import ListItem from "./Listcontact";

export default function Home(props) {
	const dispatch = useDispatch();
	const { navigation } = props;

	//1 - DECLARE VARIABLES
	const [isFetching, setIsFetching] = useState(false);

	//Access Redux Store State
	const dataReducer = useSelector((state) => state.dataReducer);
	const { contacts } = dataReducer;
	//Todo big heck here

	//useeffect with lifecycle component but issue from here
	useEffect(() => getData(), []);

	//GET FLATLIST DATA
	const getData = () => {
		setIsFetching(true);

		// LOCAL DATA
		AsyncStorage.getItem("contacts", (err, contacts) => {
			if (err) alert(err.message);
			else if (contacts !== null) dispatch(addContact(JSON.parse(contacts)));

			setIsFetching(false);
		});
	};

	//RENDER FLATLIST ITEM
	const renderItem = ({ item, index }) => {
		return (
			<ListItem
				item={item}
				index={index}
				navigation={navigation}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		);
	};

	//EDIT CONTACT
	const onEdit = (item) => {
		navigation.navigate("NewContact", { contact: item, title: "Edit Contact" });
	};

	//DELETE CONTACT
	const onDelete = (id) => {
		AsyncStorage.getItem("contacts", (err, contacts) => {
			if (err) alert(err.message);
			else if (contacts !== null) {
				contacts = JSON.parse(contacts);

				//finding the index of the contact with the id passed
				const index = contacts.findIndex((obj) => obj.id === id);

				// delete the contact
				if (index !== -1) contacts.splice(index, 1);

				//Update the local storage
				AsyncStorage.setItem("contacts", JSON.stringify(contacts), () =>
					dispatch(deleteContact(id))
				);
			}
		});
	};

	//fetching
	if (isFetching) {
		return (
			<View style={styles.activityIndicatorContainer}>
				<ActivityIndicator animating={true} />
			</View>
		);
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={contacts}
					renderItem={renderItem}
					keyExtractor={(item, index) => `contacts_${index}`}
				/>
				{/* Todo : item to display the contacts */}
				<TouchableHighlight
					style={styles.floatingButton}
					underlayColor="#ff7043"
					onPress={() =>
						navigation.navigate("NewContact", { title: "New contact" })
					}
				>
					<Text style={{ fontSize: 25, color: "white" }}>+</Text>
				</TouchableHighlight>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F5F5F5",
	},

	activityIndicatorContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},

	floatingButton: {
		backgroundColor: "black",
		borderColor: "black",
		height: 55,
		width: 55,
		borderRadius: 55 / 2,
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		bottom: 60,
		right: 15,
		shadowColor: "#000000",
		shadowOpacity: 0.5,
		shadowRadius: 2,
		shadowOffset: {
			height: 1,
			width: 0,
		},
	},
});
