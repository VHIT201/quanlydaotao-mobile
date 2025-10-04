import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Home, CalendarDays, UserCheck, User} from 'lucide-react-native';

// Import all screens directly for instant transitions
import HomeScreen from '../screens/bottom-bar/home/HomeScreen';
import ScheduleScreen from '../screens/bottom-bar/schedule/ScheduleScreen';
import AttendanceScreen from '../screens/bottom-bar/attendance/AttendanceScreen';
import ProfileScreen from '../screens/bottom-bar/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import AuthNavigator from './AuthNavigator';
// TypeScript types
export type RootStackParamList = {
  Home: undefined;
  Schedule: undefined;
  Attendance: undefined;
  ProfileStack: undefined;
  Settings: undefined;
  EditProfile: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack cho Profile
const ProfileStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
  </Stack.Navigator>
);

const tabOptions = {
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

import { useGlobalStore } from '../store/globalStore';

const AppNavigator: React.FC = () => {
  const user = useGlobalStore(state => state.user);
  return (
    <SafeAreaProvider style={{backgroundColor: '#f8fafc'}}>
      <NavigationContainer>
        {user ? <MainTabs /> : <AuthNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const MainTabs = () => (
  <Tab.Navigator screenOptions={tabOptions} initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({color, size}) => <Home size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        tabBarLabel: 'Lịch học',
        tabBarIcon: ({color, size}) => <CalendarDays size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="Attendance"
      component={AttendanceScreen}
      options={{
        tabBarLabel: 'Điểm danh',
        tabBarIcon: ({color, size}) => <UserCheck size={size} color={color} />,
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ({color, size}) => <User size={size} color={color} />,
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;