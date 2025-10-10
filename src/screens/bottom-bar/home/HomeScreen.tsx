import React, {useMemo, useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, FlatList, ScrollView, TextInput, Animated, // Easing,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import AnnouncementCard from './AnnoucementCart';
import { useDebounce } from 'use-debounce';
import Stat from './home-components/Stat';
import Hero from './home-components/Hero';
import Header from './home-components/Header';
import QuickAction from './home-components/QuickAction';
import { quickActions, announcements, upcoming } from '../../../placeholderSample';
import CourseCard from '../../../components/CourseCard';
import AnnouncementCarousel from '../../../components/AnnouncementCarousel';
import ActivityFeed from '../../../components/ActivityFeed';
import { useUserProfile } from '../../../hooks/useUserProfile';

const HomeScreen = () => {
  const {data, isLoading} = useUserProfile() 
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500) // chờ 500ms sau khi gõ
  const heroAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(new Animated.Value(0)).current;
  // const fabAnim = useRef(new Animated.Value(0)).current;
  // const fabRotate = useRef(new Animated.Value(0)).current;
  // const courseItemAnims = useRef(upcoming.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(heroAnim, {toValue: 1, duration: 500, useNativeDriver: true}),
      Animated.timing(listAnim, {toValue: 1, duration: 400, useNativeDriver: true}),
    ]).start();
  }, [heroAnim, listAnim]);

  const filtered = useMemo(() => {
    if (!debouncedQuery.trim()) return upcoming;
    const q = debouncedQuery.toLowerCase();
    return upcoming.filter(c => c.subject.toLowerCase().includes(q) || c.teacher?.toLowerCase().includes(q));
  }, [debouncedQuery]);

  return (
    <SafeAreaView style={styles.container}>
      
      <ScrollView contentContainerStyle={styles.scroll}>
        
        <Header isLoading={isLoading} firstName={data?.data?.firstName}/>

        <Hero />

        <Animated.View style={{opacity: listAnim, transform: [{translateY: listAnim.interpolate({inputRange: [0,1], outputRange: [8,0]})}]}}>
          <AnnouncementCarousel items={announcements} />
        </Animated.View>

        <Stat />

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Tìm lớp, giáo viên..."
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Tác vụ nhanh */}
        <Text style={styles.sectionTitle}>Tác vụ nhanh</Text>
        <View style={styles.actionsRowModern}>
          {quickActions.map(q => (
            <QuickAction key={q.id} item={q} />
          ))}
        </View>

        {/* Hoạt động gần đây */}
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
              {...item}
              onJoin={() => {}}
            />
          )}
        />

        <View  
        style={{height: 140}} />
        <Pressable style={styles.fab} onPress={() => {}} android_ripple={{color: 'rgba(255,255,255,0.16)'}}>
          <Text style={styles.fabPlus}>+</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F3F6FB'},
  scroll: {padding: 16, paddingBottom: 24, backgroundColor: '#f8fafc'},
  searchRow: {marginBottom: 12},
  searchInput: {backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 10, elevation: 2},
  sectionTitle: {fontSize: 16, fontWeight: '800', marginBottom: 8, color: '#0f172a'},
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
  fab: {position: 'absolute', right: 20, bottom: 28, width: 64, height: 64, borderRadius: 32, backgroundColor: '#06b6d4', alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: '#000', shadowOffset: {width: 0, height: 6}, shadowOpacity: 0.12, shadowRadius: 8},
  fabPlus: {color: '#fff', fontSize: 30, fontWeight: '800', lineHeight: 34},
});

export default HomeScreen;