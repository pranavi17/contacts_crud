import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
	AsyncStorage,
	Image,
} from "react-native";
// import PhotoUpload from "react-native-photo-upload";
import { useDispatch } from "react-redux";
import { Header } from "react-navigation-stack";
import { addContact, updateContact } from "./redux/actions";
import ImagePickerExample from "./image";

const MAX_LENGTH = 250;

export default function NewContact(props) {
	const dispatch = useDispatch();
	const { navigation } = props;

	let contact = navigation.getParam("contact", null);

	//1 - DECLARE VARIABLES
	const [isSaving, setIsSaving] = useState(false);
	const [person, setPerson] = useState(contact ? contact.person : "");
	const [text, setText] = useState(contact ? contact.text : "");

	const [number, setNumber] = useState(contact ? contact.number : "");
	const [address, setAddress] = useState(contact ? contact.address : "");
	const [email, setEmail] = useState(contact ? contact.email : "");
	const [image, setImage] = useState(contact ? contact.image : "");
	//2 - GET FLATLIST DATA
	const onSave = () => {
		let edit = contact !== null;
		let contact_ = {};

		if (edit) {
			contact_ = contact;
			contact_["person"] = person;
			contact_["text"] = text;
			contact_["number"] = number;
			contact_["address"] = address;
			contact_["email"] = email;
			// contact_["image"] = image;
		} else {
			let id = generateID();
			contact_ = {
				id: id,
				person: person,
				text: text,
				number: number,
				address: address,
				email: email,
				// image: image,
			};
		}

		//ADD TO LOCAL STORAGE DATA
		AsyncStorage.getItem("contacts", (err, contacts) => {
			if (err) alert(err.message);
			else if (contacts !== null) {
				contacts = JSON.parse(contacts);

				if (!edit) {
					//add the new contact to the top
					contacts.unshift(contact_);
				} else {
					const index = contacts.findIndex((obj) => obj.id === contact_.id);

					if (index !== -1) contacts[index] = contact_;
					//if the contact is in the array, replace the contact
					//find the index of the contact with the contact id
				}

				//Update the local storage
				AsyncStorage.setItem("contacts", JSON.stringify(contacts), () => {
					if (!edit) dispatch(addContact(contact_));
					else dispatch(updateContact(contact_));

					navigation.goBack();
				});
			}
		});
	};

	// GENERATE ID
	const generateID = () => {
		let d = new Date().getTime();
		let id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
			c
		) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == "x" ? r : (r & 0x3) | 0x8).toString(5);
		});

		return id;
	};

	let disabled = person.length > 0 && text.length > 0 ? false : true;
	return (
		<KeyboardAvoidingView
			keyboardVerticalOffset={Header.HEIGHT}
			style={styles.flex}
			behavior="padding"
		>
			<SafeAreaView style={styles.flex}>
				<View style={styles.flex}>
					<ImagePickerExample />

					<TextInput
						onChangeText={(text) => setPerson(text)}
						placeholder={"Name"}
						style={[styles.person]}
						autoFocus={true}
						value={person}
					/>
					<TextInput
						onChangeText={(text) => setText(text)}
						placeholder={"Contact Number "}
						keyboardType="numeric"
						style={[styles.text]}
						maxLength={10}
						value={text}
					/>
					<TextInput
						onChangeText={(text) => setNumber(text)}
						// onChangeText={(text) => onChanged(text)}
						keyboardType="numeric"
						placeholder={"Enter Number"}
						style={[styles.text]}
						maxLength={10}
						value={number}
					/>
					{/*	 <TextInput
						style={styles.textInput}
						keyboardType="numeric"
						onChangeText={(text) => this.onChanged(text)}
						value={this.state.myNumber}
						maxLength={10} //setting limit of input
					/> */}

					<TextInput
						onChangeText={(text) => setAddress(text)}
						placeholder={"Enter address"}
						multiline="true"
						style={[styles.text]}
						maxLength={MAX_LENGTH}
						value={address}
					/>
					<TextInput
						onChangeText={(text) => setEmail(text)}
						placeholder={"Enter email"}
						style={[styles.text]}
						maxLength={MAX_LENGTH}
						value={email}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<View style={{ flex: 1, justifyContent: "center" }}>
						{/* <Text
							style={[
								styles.count,
								MAX_LENGTH - text.length <= 10 && { color: "red" },
							]}
						>
							{" "}
							{MAX_LENGTH - text.length}
						</Text> */}
					</View>
					<View style={{ flex: 1, alignItems: "flex-end" }}>
						<TouchableHighlight
							style={[styles.button]}
							disabled={disabled}
							onPress={onSave}
							underlayColor="rgba(0, 0, 0, 0)"
						>
							<Text
								style={[
									styles.buttonText,
									{ color: disabled ? "rgba(255,255,255,.5)" : "#FFF" },
								]}
							>
								Save
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
}
// onChanged = (text) => {
// 	let newText = "";
// 	let numbers = "0123456789";

// 	for (var i = 0; i < text.length; i++) {
// 		if (numbers.indexOf(text[i]) > -1) {
// 			newText = newText + text[i];
// 		} else {
// 			// your call back function
// 			alert("please enter numbers only");
// 		}
// 	}
// 	this.setState({ number: newText });

// };
// onChanged = (text) => {
// 	let number = "";
// 	this.number({
// 		number: text.replace(/[^0-9]/g, ""),
// 	});
// };
const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},

	buttonContainer: {
		height: 70,
		flexDirection: "row",
		padding: 12,
		backgroundColor: "white",
	},

	count: {
		fontFamily: "HelveticaNeue-Medium",
		fontSize: 17,
		color: "#6B9EFA",
	},

	button: {
		width: 80,
		height: 44,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#6B9EFA",
	},

	buttonText: {
		fontFamily: "HelveticaNeue-Medium",
		fontSize: 16,
	},

	person: {
		fontSize: 20,
		lineHeight: 22,
		fontFamily: "Helvetica Neue",
		height: 80,
		padding: 16,
		backgroundColor: "white",
	},

	text: {
		fontSize: 20,
		lineHeight: 20,
		fontFamily: "Helvetica Neue",
		color: "#333333",
		height: 80,
		padding: 16,
		paddingTop: 16,
		borderTopWidth: 1,
		borderColor: "lightgray",
	},
});
