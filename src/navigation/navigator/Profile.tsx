import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen, EditProfileScreen } from "../../screens/import";
const Stack = createNativeStackNavigator();

// Stack cho Profile
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

export default ProfileStack
