import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, Pressable, ScrollView, Alert, Switch, Animated, TouchableWithoutFeedback} from 'react-native';
import {User, Settings, LogOut, Edit2, FileText, Bell, Moon, Info, HelpCircle, ChevronRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const user = {name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', avatarColor: '#60a5fa'};
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const avatarScale = useState(new Animated.Value(1))[0];
  const onAvatarPressIn = () => Animated.spring(avatarScale, {toValue: 0.92, useNativeDriver: true}).start();
  const onAvatarPressOut = () => Animated.spring(avatarScale, {toValue: 1, useNativeDriver: true}).start();

  const onViewInfo = () => (navigation as any).navigate('EditProfile');
  const onEdit = () => Alert.alert('Chỉnh sửa', 'Mở màn hình chỉnh sửa (placeholder)');
  const onHistory = () => Alert.alert('Lịch sử', 'Hiển thị lịch sử điểm danh (placeholder)');
  const onSettings = () => Alert.alert('Cài đặt', 'Mở cài đặt (placeholder)');
  const onLogout = () => {
    // Optionally: clear user state here
    (navigation as any).navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Custom header with color blocks */}
        <View style={styles.headerBg}>
          <View style={styles.headerGradientTop} />
          <View style={styles.headerGradientBottom} />
        </View>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPressIn={onAvatarPressIn} onPressOut={onAvatarPressOut}>
            <Animated.View style={[styles.avatar, {backgroundColor: user.avatarColor, transform: [{scale: avatarScale}]}]}>
              <Text style={styles.avatarText}>{user.name.split(' ').slice(-1)[0][0]}</Text>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
          <Pressable style={styles.editBtn} onPress={onEdit}>
            <Edit2 color="#0f172a" size={20} />
          </Pressable>
        </View>
        {/* Stat cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}><Text style={styles.statNum}>12</Text><Text style={styles.statLabel}>Buổi hôm nay</Text></View>
          <View style={styles.statCard}><Text style={styles.statNum}>88%</Text><Text style={styles.statLabel}>Chuyên cần</Text></View>
          <View style={styles.statCard}><Text style={styles.statNum}>3</Text><Text style={styles.statLabel}>Vắng</Text></View>
        </View>
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
  container: {flex: 1, backgroundColor: '#f1f5f9'},
  scrollContent: {padding: 20, paddingBottom: 80},
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 140,
    zIndex: -1,
  },
  headerGradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: '#06b6d4',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerGradientBottom: {
    position: 'absolute',
    top: 90,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  avatarText: {color: '#fff', fontSize: 36, fontWeight: '900'},
  userInfo: {flex: 1, marginLeft: 18},
  name: {fontSize: 22, fontWeight: '900', color: '#0f172a'},
  email: {color: '#64748b', marginTop: 4, fontSize: 15},
  editBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 8,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.10,
    shadowRadius: 4,
  },
  statNum: {fontWeight: '900', fontSize: 20, color: '#0f172a'},
  statLabel: {color: '#64748b', marginTop: 8, fontSize: 13},
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