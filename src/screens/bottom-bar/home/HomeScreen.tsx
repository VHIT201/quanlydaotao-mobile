import React, {useMemo, useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ScrollView,
  Dimensions,
  TextInput,
  Animated,
  Platform,
  Easing,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Bell,
  CalendarDays,
  Clock,
  CheckSquare,
  BookOpen,
  User,
  Star,
  Mail,
  Search,
  PieChart,
  Activity,
  Check,
} from 'lucide-react-native';
import CourseCard from '../../../components/CourseCard';
import AnnouncementCarousel from '../../../components/AnnouncementCarousel';
import ActivityFeed from '../../../components/ActivityFeed';

const {width} = Dimensions.get('window');

type Action = {id: string; title: string; icon: any; color?: string};
type ClassItem = {id: string; subject: string; time: string; room: string; teacher?: string; status?: 'upcoming' | 'done' | 'live'};
type Announcement = {id: string; title: string; body: string; date: string};

const quickActions: Action[] = [
  {id: '1', title: 'Đăng ký lớp', icon: BookOpen, color: '#5E60CE'},
  {id: '2', title: 'Xem điểm', icon: Star, color: '#FFB703'},
  {id: '3', title: 'Lịch học', icon: CalendarDays, color: '#2196F3'},
  {id: '4', title: 'Điểm danh', icon: CheckSquare, color: '#06D6A0'},
];

const announcements: Announcement[] = [
  {id: 'n1', title: 'Thông báo nghỉ lễ', body: 'Trường nghỉ lễ từ 1/5 đến 3/5. Lưu ý lịch học online.', date: '01 May'},
  {id: 'n2', title: 'Lịch thi giữa kỳ', body: 'Đăng ký phòng thi trước ngày 10. Xem chi tiết ở phần Thi.', date: '20 May'},
  {id: 'n3', title: 'Cập nhật điểm', body: 'Điểm giữa kỳ đã được cập nhật. Vui lòng kiểm tra bảng điểm.', date: '02 Jun'},
];

const upcoming: ClassItem[] = [
  {id: 'a', subject: 'Toán Đại số', time: '08:00 - 09:30', room: 'P101', teacher: 'Thầy Hùng', status: 'upcoming'},
  {id: 'b', subject: 'Lập trình di động', time: '10:00 - 11:30', room: 'P202', teacher: 'Cô Lan', status: 'live'},
  {id: 'c', subject: 'Tiếng Anh', time: '14:00 - 15:30', room: 'P303', teacher: 'Thầy Nam', status: 'upcoming'},
  {id: 'd', subject: 'Vật lý', time: '16:00 - 17:30', room: 'P404', teacher: 'Cô Mai', status: 'done'},
];

const QuickAction = ({item}: {item: Action}) => {
  const Icon = item.icon as any;
  return (
    <Pressable style={({pressed}) => [styles.actionButtonModern, pressed && styles.actionPressed]} onPress={() => {}} android_ripple={{color: 'rgba(0,0,0,0.06)'}}>
      <View style={[styles.actionGradient, {backgroundColor: item.color ?? '#2196F3'}]}>
        <Icon color="#fff" size={20} />
      </View>
      <Text style={styles.actionTextModern} numberOfLines={1}>{item.title}</Text>
    </Pressable>
  );
};

const AnnouncementCard = ({item}: {item: Announcement}) => {
  return (
    <View style={styles.announcementCard}>
      <View style={styles.announcementLeft}>
        <Mail size={18} color="#fff" />
      </View>
      <View style={styles.announcementBody}>
        <Text style={styles.announcementTitle}>{item.title}</Text>
        <Text style={styles.announcementText} numberOfLines={2}>{item.body}</Text>
      </View>
      <Text style={styles.announcementDate}>{item.date}</Text>
    </View>
  );
};

const ActivityItem = ({title, time}: {title: string; time: string}) => (
  <View style={styles.activityItem}>
    <View style={styles.activityIcon}><Activity size={16} color="#fff" /></View>
    <View style={{flex: 1}}>
      <Text style={styles.activityTitle}>{title}</Text>
      <Text style={styles.activityTime}>{time}</Text>
    </View>
    <Check size={18} color="#06D6A0" />
  </View>
);

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const heroAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;
  const fabAnim = useRef(new Animated.Value(0)).current;
  const fabRotate = useRef(new Animated.Value(0)).current;
  const courseItemAnims = useRef(upcoming.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroAnim, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.timing(listAnim, {toValue: 1, duration: 400, useNativeDriver: true}),
    ]).start();
  }, [heroAnim, listAnim]);

  const filtered = useMemo(() => {
    if (!query.trim()) return upcoming;
    const q = query.toLowerCase();
    return upcoming.filter(c => c.subject.toLowerCase().includes(q) || c.teacher?.toLowerCase().includes(q));
  }, [query]);

  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN', {weekday: 'long', day: 'numeric', month: 'short'});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{backgroundColor: '#f8fafc'}} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>NV</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Xin chào,</Text>
              <Text style={styles.username}>Nguyễn Văn A</Text>
              <Text style={styles.date}>{dateStr}</Text>
            </View>
          </View>
          <Pressable style={styles.bellWrap} onPress={() => {}}>
            <Bell size={20} color="#333" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroTitle}>Chào mừng trở lại</Text>
            <Text style={styles.heroSubtitle}>Chuẩn bị cho buổi học hôm nay</Text>
          </View>
          <View style={styles.heroStats}>
            <Text style={styles.heroNumber}>2</Text>
            <Text style={styles.heroLabel}>Lớp</Text>
          </View>
        </View>

        <Animated.View style={{opacity: listAnim, transform: [{translateY: listAnim.interpolate({inputRange: [0,1], outputRange: [8,0]})}]}}>
          <AnnouncementCarousel items={announcements} />
        </Animated.View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Lớp đang học</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '60%'}]} />
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8.6</Text>
            <Text style={styles.statLabel}>Điểm trung bình</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '86%'}]} />
            </View>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>92%</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, {width: '92%'}]} />
            </View>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Tìm lớp, giáo viên..."
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionTitle}>Tác vụ nhanh</Text>
        <View style={styles.actionsRowModern}>
          {quickActions.map(q => (
            <QuickAction key={q.id} item={q} />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
        <ActivityFeed
          items={[
            {id: 'e1', title: 'Bạn đã hoàn thành bài kiểm tra Toán', time: '2 giờ trước'},
            {id: 'e2', title: 'Giáo viên đăng bài mới: Lập trình di động', time: '5 giờ trước'},
            {id: 'e3', title: 'Nhắc nhở: Đăng ký phòng thi', time: '1 ngày trước'},
          ]}
        />

        <Text style={[styles.sectionTitle, {marginTop: 8}]}>Lịch sắp tới</Text>
        <FlatList
          data={filtered}
          keyExtractor={i => i.id}
          style={styles.list}
          scrollEnabled={false}
          renderItem={({item}) => (
            <CourseCard
              id={item.id}
              subject={item.subject}
              time={item.time}
              room={item.room}
              teacher={item.teacher}
              status={item.status}
              onJoin={() => {}}
            />
          )}
        />

        <View style={{height: 140}} />
        <Pressable style={styles.fab} onPress={() => {}} android_ripple={{color: 'rgba(255,255,255,0.16)'}}>
          <Text style={styles.fabPlus}>+</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F3F6FB'},
  scroll: {padding: 16, paddingBottom: 24},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12},
  headerLeft: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 56, height: 56, borderRadius: 14, backgroundColor: '#475569', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  avatarText: {color: '#fff', fontWeight: '700'},
  greeting: {color: '#718096', fontSize: 13},
  username: {fontSize: 18, fontWeight: '800', color: '#0f172a'},
  date: {color: '#94a3b8', fontSize: 12, marginTop: 2},
  bellWrap: {padding: 8, backgroundColor: '#fff', borderRadius: 10},
  badge: {position: 'absolute', right: 2, top: 2, backgroundColor: '#ef4444', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center'},
  badgeText: {color: '#fff', fontSize: 11, fontWeight: '700'},
  heroCard: {flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, alignItems: 'center', elevation: 2},
  heroLeft: {flex: 1},
  heroRight: {width: 120, alignItems: 'flex-end'},
  heroTitle: {fontSize: 20, fontWeight: '900', color: '#0f172a'},
  heroSubtitle: {color: '#64748b', marginTop: 6},
  heroStats: {backgroundColor: '#E8F4FF', padding: 10, borderRadius: 10, alignItems: 'center'},
  heroNumber: {fontSize: 18, fontWeight: '900', color: '#0ea5e9'},
  heroLabel: {fontSize: 12, color: '#0ea5e9'},
  announcementsRow: {marginBottom: 12},
  announcementCard: {width: width * 0.78, marginRight: 12, backgroundColor: '#2563EB', borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center'},
  announcementLeft: {width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  announcementBody: {flex: 1},
  announcementTitle: {color: '#fff', fontWeight: '800', fontSize: 14},
  announcementText: {color: '#e6eefc', marginTop: 6, fontSize: 12},
  announcementDate: {color: '#cfe0ff', marginLeft: 8, fontSize: 11},
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12},
  statCard: {flex: 1, backgroundColor: '#fff', marginRight: 8, padding: 12, borderRadius: 10, alignItems: 'center', elevation: 2},
  statNumber: {fontSize: 18, fontWeight: '800', color: '#111'},
  statLabel: {fontSize: 12, color: '#6b7280', marginTop: 6},
  progressBar: {height: 6, backgroundColor: '#e6eefc', width: '100%', borderRadius: 6, marginTop: 10, overflow: 'hidden'},
  progressFill: {height: 6, backgroundColor: '#0ea5e9'},
  searchRow: {marginBottom: 12},
  searchInput: {backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, elevation: 2},
  sectionTitle: {fontSize: 16, fontWeight: '800', marginBottom: 8, color: '#0f172a'},
  actionsRow: {marginBottom: 16},
  actionButtonModern: {width: 86, marginRight: 12, alignItems: 'center'},
  actionCircle: {width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 8, elevation: Platform.OS === 'android' ? 3 : 6},
  actionGradient: {width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8, elevation: 4},
  actionPressed: {opacity: 0.9, transform: [{scale: 0.994}]},
  actionTextModern: {fontSize: 12, fontWeight: '700', color: '#111', textAlign: 'center'},
  actionsRowModern: {flexDirection: 'row', marginBottom: 16, alignItems: 'center'},
  activityList: {marginBottom: 12},
  activityItem: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 8, elevation: 1},
  activityIcon: {width: 36, height: 36, borderRadius: 10, backgroundColor: '#374151', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  activityTitle: {fontWeight: '700', color: '#0f172a'},
  activityTime: {color: '#94a3b8', fontSize: 12, marginTop: 4},
  list: {backgroundColor: 'transparent'},
  listItem: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 12, marginBottom: 10, elevation: 1},
  timeCol: {width: 72, alignItems: 'flex-start'},
  timeText: {fontSize: 13, fontWeight: '700', color: '#0f172a'},
  timeSmall: {color: '#94a3b8', fontSize: 12},
  listBody: {flex: 1, paddingLeft: 8},
  subject: {fontSize: 15, fontWeight: '800', color: '#0f172a'},
  meta: {color: '#64748b', marginTop: 4, fontSize: 12},
  rightCol: {justifyContent: 'center', alignItems: 'center'},
  joinBtn: {backgroundColor: '#0ea5e9', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8},
  joinText: {color: '#fff', fontWeight: '800'},
  livePill: {backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999},
  liveText: {color: '#fff', fontWeight: '700', fontSize: 12},
  doneText: {color: '#94a3b8', fontWeight: '700'},
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 28,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  fabPlus: {color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 34},
});

export default HomeScreen;