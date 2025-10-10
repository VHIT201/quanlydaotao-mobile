import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Pressable, ScrollView, Alert, Switch} from 'react-native';
import {User, Settings, LogOut, Edit2, FileText, Bell, Moon, Info, ChevronRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';
import Header from './profile-components/Header';
import StatCards from './profile-components/StatCards';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { useLogout } from '../../../hooks/useLogout';
import LoaderScreen from '../../../components/LoaderScreen';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const {mutate, isPending} = useLogout()
  const {data} = useUserProfile()
  const onViewInfo = () => (navigation as any).navigate('EditProfile');
  const onEdit = () => Alert.alert('Chỉnh sửa', 'Mở màn hình chỉnh sửa (placeholder)');
  const onHistory = () => Alert.alert('Lịch sử', 'Hiển thị lịch sử điểm danh (placeholder)');
  const onSettings = () => Alert.alert('Cài đặt', 'Mở cài đặt (placeholder)');

  const onLogout = () => {
    mutate()
  };
  return (
    <SafeAreaView style={styles.container}>
      {isPending && <LoaderScreen />}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Custom header with color blocks */}
        <Header email={data?.data?.email} firstName={data?.data?.firstName} lastName={data?.data?.lastName}/>

        {/* Stat cards */}
        <StatCards todaySchedule={12} attendance={88} absence={3}/>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Tính năng nhanh</Text>
        <View style={styles.quickRow}>
          {[{icon: <User color="#06b6d4" size={24} />, label: "Xem thông tin", onPress: onViewInfo},
            {icon: <FileText color="#06b6d4" size={24} />, label: "Lịch sử", onPress: onHistory},
            {icon: <Settings color="#06b6d4" size={24} />, label: "Cài đặt", onPress: onSettings}].map((item) => (
            <Pressable key={item.label} style={styles.quickBtn} onPress={item.onPress} android_ripple={{color: '#e0f2fe'}}>
              {item.icon}
              <Text style={styles.quickLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
        {/* Preferences */}
        <Text style={styles.sectionTitle}>Tùy chọn</Text>
        <View style={styles.prefItem}>
          <View style={styles.prefLeft}><Bell color="#64748b" size={20} /><Text style={styles.prefLabel}>Thông báo</Text></View>
          <Switch value={notifyEnabled} onValueChange={setNotifyEnabled} />
        </View>
        <View style={styles.prefItem}>
          <View style={styles.prefLeft}><Moon color="#64748b" size={20} /><Text style={styles.prefLabel}>Chế độ tối</Text></View>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        {/* Menu list */}
        <Text style={styles.sectionTitle}>Tài khoản</Text>
        <View style={styles.list}>
          {[{icon: <Info color="#06b6d4" size={20} />, label: "Thông tin cá nhân", onPress: onViewInfo},
            {icon: <Edit2 color="#06b6d4" size={20} />, label: "Chỉnh sửa hồ sơ", onPress: onEdit},
            {icon: <FileText color="#06b6d4" size={20} />, label: "Lịch sử điểm danh", onPress: onHistory},
            {icon: <Settings color="#06b6d4" size={20} />, label: "Cài đặt ứng dụng", onPress: onSettings},
            {icon: <LogOut color="#ef4444" size={20} />, label: "Đăng xuất", onPress: onLogout, danger: true}].map((item) => (
            <Pressable key={item.label} style={[styles.listItem, item.danger && {borderColor: '#ef4444', borderWidth: 1}]} onPress={item.onPress} android_ripple={{color: '#e0f2fe'}}>
              <View style={styles.listLeft}>{item.icon}<Text style={[styles.listText, item.danger && {color: '#ef4444'}]}>{item.label}</Text></View>
              <ChevronRight color={item.danger ? '#ef4444' : '#64748b'} size={16} />
            </Pressable>
          ))}
        </View>
        <Text style={styles.version}>Phiên bản 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f1f5f9', position: 'relative'},
  scrollContent: {padding: 20, paddingBottom: 80},
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
    marginTop: 24,
  },
  quickRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  quickBtn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  quickLabel: {marginTop: 8, fontSize: 13, fontWeight: '700', color: '#0f172a'},
  prefItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  prefLeft: {flexDirection: 'row', alignItems: 'center'},
  prefLabel: {fontSize: 15, color: '#0f172a', marginLeft: 12},
  list: {},
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  listLeft: {flexDirection: 'row', alignItems: 'center'},
  listText: {fontWeight: '700', fontSize: 15, color: '#0f172a', marginLeft: 12},
  version: {textAlign: 'center', color: '#94a3b8', marginTop: 36, fontSize: 13},
});

export default ProfileScreen;