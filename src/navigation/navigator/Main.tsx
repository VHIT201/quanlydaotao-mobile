import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, CalendarDays, UserCheck, User } from 'lucide-react-native';
import { HomeScreen, ScheduleScreen, AttendanceScreen } from '../../screens/import';
import ProfileStack from './Profile';
import { IconProps } from '../../types/Types';
const tabOptions = {
  animationEnabled: true, 
  gestureEnabled: true, 
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: 'gray',
  headerShown: false,
};

const HomeIcon = ({ color, size }: IconProps) => <Home size={size} color={color} />;
const ScheduleIcon = ({ color, size }: IconProps) => <CalendarDays size={size} color={color} />;
const AttendanceIcon = ({ color, size }: IconProps) => <UserCheck size={size} color={color} />;
const ProfileIcon = ({ color, size }: IconProps) => <User size={size} color={color} />;

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
  <Tab.Navigator screenOptions={tabOptions} initialRouteName="Home">
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: HomeIcon,
      }}
    />
    <Tab.Screen
      name="Schedule"
      component={ScheduleScreen}
      options={{
        tabBarLabel: 'Lịch học',
        tabBarIcon: ScheduleIcon,
      }}
    />
    <Tab.Screen
      name="Attendance"
      component={AttendanceScreen}
      options={{
        tabBarLabel: 'Điểm danh',
        tabBarIcon: AttendanceIcon
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{
        tabBarLabel: 'Cá nhân',
        tabBarIcon: ProfileIcon
      }}
    />
  </Tab.Navigator>
)};

export default Main