import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import LoadingScreen from "./Loadingscreen";
import HomeScreen from "./Home";
import NewContact from "./NewContact";

const AppStack = createStackNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: ({ navigation }) => ({
			title: `Contacts`,
		}),
	},
	NewContact: {
		screen: NewContact,
		navigationOptions: ({ navigation }) => ({
			title: `New Contact`,
		}),
	},
});

const RoutesStack = createSwitchNavigator(
	{
		Loading: LoadingScreen,
		App: AppStack,
	},
	{ initialRouteName: "Loading" }
);

const Router = createAppContainer(RoutesStack);

export default Router;
