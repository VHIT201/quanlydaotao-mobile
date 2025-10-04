import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Switch, Platform, PermissionsAndroid, Alert, ActivityIndicator, Modal, Pressable, ScrollView} from 'react-native';
import {CalendarDays, Check} from 'lucide-react-native';
import { ClassItem } from './libs/types';
import { SAMPLE_CLASSES } from './libs/constants';



const initials = (name?: string) => {
  if (!name) return 'GV';
  const parts = name.trim().split(/\s+/);
  return parts.slice(-2).map(p => p[0]).join('').toUpperCase();
};

const AttendanceScreen: React.FC = () => {
  const [items, setItems] = useState<ClassItem[]>(SAMPLE_CLASSES);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const dateStr = useMemo(() => selectedDate.toLocaleDateString('vi-VN', {weekday: 'long', day: 'numeric', month: 'short'}), [selectedDate]);

  const [calendarVisible, setCalendarVisible] = useState(false);

  const formatKey = (d: Date) => `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`;
  const [itemsByDate, setItemsByDate] = useState<Record<string, ClassItem[]>>(() => ({[formatKey(new Date())]: SAMPLE_CLASSES}));

  const loadItemsForDate = (d: Date) => {
    const key = formatKey(d);
    const list = itemsByDate[key] || [];
    setItems(list);
  };

  const toggle = (id: string) => setItems(prev => prev.map(it => it.id === id ? {...it, present: !it.present} : it));

  const presentCount = items.filter(i => i.present).length;

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Quyền vị trí',
        message: 'App cần quyền truy cập vị trí để điểm danh',
        buttonPositive: 'Cho phép',
        buttonNegative: 'Hủy',
      });
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    // iOS: navigator.geolocation permission prompt will occur on first use if configured in Info.plist
    return true;
  };

  const doCheckin = async (id: string) => {
    try {
      setLoadingId(id);
      const ok = await requestLocationPermission();
      if (!ok) {
        Alert.alert('Quyền bị từ chối', 'Không thể điểm danh khi không có quyền vị trí.');
        setLoadingId(null);
        return;
      }

      // Use navigator.geolocation as a compatible fallback. Projects may replace with recommended packages.
  const geo = (globalThis as any)?.navigator?.geolocation || (globalThis as any)?.geo;
      if (!geo || !geo.getCurrentPosition) {
        Alert.alert('Lỗi', 'Trình duyệt/thiết bị không hỗ trợ vị trí');
        setLoadingId(null);
        return;
      }
      geo.getCurrentPosition(
        (pos: {coords: {latitude: number; longitude: number}}) => {
          const {latitude, longitude} = pos.coords;
          const time = new Date().toLocaleTimeString();
          setItems(prev => prev.map(it => it.id === id ? {...it, present: true, checkin: {latitude, longitude, time}} : it));
          Alert.alert('Điểm danh thành công', `Vị trí: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}\nThời gian: ${time}`);
          setLoadingId(null);
        },
        (err: {code?: number; message?: string}) => {
          Alert.alert('Lỗi vị trí', err?.message || 'Không thể lấy vị trí');
          setLoadingId(null);
        },
        {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
      );
    } catch (e: any) {
      Alert.alert('Lỗi', e?.message || String(e));
      setLoadingId(null);
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <View>
          <Text style={s.title}>Điểm danh</Text>
          <Text style={s.subtitle}>{dateStr}</Text>
        </View>
        <Pressable style={s.iconWrap} onPress={() => setCalendarVisible(true)}>
          <CalendarDays color="#fff" />
        </Pressable>
      </View>

      <Modal visible={calendarVisible} animationType="slide" transparent>
        <View style={m.modalOverlay}>
          <View style={m.modalCard}>
            <View style={m.calHeader}>
              <Text style={m.calTitle}>{selectedDate.toLocaleString('vi-VN', {month: 'long', year: 'numeric'})}</Text>
              <Pressable onPress={() => setCalendarVisible(false)}><Text style={{color: '#ef4444'}}>Đóng</Text></Pressable>
            </View>
            <CalendarGrid
              year={selectedDate.getFullYear()}
              month={selectedDate.getMonth()}
              selected={selectedDate}
              onSelect={(d: Date) => { setSelectedDate(d); loadItemsForDate(d); setCalendarVisible(false); }}
              onMonthChange={(y, m) => setSelectedDate(new Date(y, m, 1))}
            />
          </View>
        </View>
      </Modal>

      <View style={s.stats}>
        <View style={s.statCard}>
          <Text style={s.statNum}>{items.length}</Text>
          <Text style={s.statLabel}>Buổi</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{presentCount}</Text>
          <Text style={s.statLabel}>Đã điểm danh</Text>
        </View>
        <View style={s.statCard}>
          <Text style={s.statNum}>{Math.round((presentCount / Math.max(items.length, 1)) * 100)}%</Text>
          <Text style={s.statLabel}>Tỷ lệ</Text>
        </View>
      </View>

      <Text style={s.section}>Buổi hôm nay</Text>
      <FlatList
        data={items}
        keyExtractor={i => i.id}
        renderItem={({item}) => (
          <View style={s.row}>
            <View style={s.avatar}><Text style={s.avatarText}>{initials(item.teacher)}</Text></View>
            <View style={{flex: 1}}>
              <Text style={s.rowTitle}>{item.subject}</Text>
              <Text style={s.rowSub}>{item.teacher} • {item.room}</Text>
              {item.checkin ? (
                <Text style={{color: '#0f172a', marginTop: 6, fontSize: 12}}>Đã điểm danh: {item.checkin.time} — {item.checkin.latitude.toFixed(5)}, {item.checkin.longitude.toFixed(5)}</Text>
              ) : null}
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={s.rowTime}>{item.time}</Text>
              <View style={{height: 8}} />
              {loadingId === item.id ? (
                <ActivityIndicator />
              ) : (
                <TouchableOpacity style={[s.checkBtn, item.present ? s.checkBtnDone : null]} onPress={() => doCheckin(item.id)}>
                  <Text style={s.checkBtnText}>{item.present ? 'Đã điểm danh' : 'Điểm danh'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
        contentContainerStyle={{padding: 16, paddingBottom: 120}}
      />

      <TouchableOpacity style={s.fab} activeOpacity={0.8} onPress={() => setItems(prev => prev.map(p => ({...p, present: true, checkin: undefined})))}>
        <Check color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9fafb'},
  header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#0ea5e9', borderBottomLeftRadius: 12, borderBottomRightRadius: 12},
  title: {color: '#fff', fontSize: 20, fontWeight: '800'},
  subtitle: {color: '#e6f6ff', marginTop: 4},
  iconWrap: {width: 44, height: 44, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center'},
  stats: {flexDirection: 'row', justifyContent: 'space-between', padding: 16},
  statCard: {flex: 1, backgroundColor: '#fff', marginHorizontal: 6, padding: 12, borderRadius: 10, alignItems: 'center', elevation: 2},
  statNum: {fontSize: 18, fontWeight: '900'},
  statLabel: {color: '#64748b', marginTop: 4},
  section: {paddingHorizontal: 16, paddingTop: 8, fontWeight: '800', color: '#0f172a'},
  row: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginHorizontal: 0},
  avatar: {width: 48, height: 48, borderRadius: 10, backgroundColor: '#60a5fa', alignItems: 'center', justifyContent: 'center', marginRight: 12},
  avatarText: {color: '#fff', fontWeight: '900'},
  rowTitle: {fontWeight: '800'},
  rowSub: {color: '#64748b', marginTop: 4},
  rowTime: {color: '#475569', marginBottom: 6},
  fab: {position: 'absolute', right: 20, bottom: 28, width: 56, height: 56, borderRadius: 28, backgroundColor: '#06b6d4', alignItems: 'center', justifyContent: 'center', elevation: 8},
  checkBtn: {backgroundColor: '#06b6d4', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8},
  checkBtnDone: {backgroundColor: '#10b981'},
  checkBtnText: {color: '#fff', fontWeight: '700'},
});

export default AttendanceScreen;

// --- CalendarGrid component (simple, self-contained) ---
type CalendarGridProps = {year: number; month: number; selected: Date; onSelect: (d: Date) => void; onMonthChange?: (y: number, m: number) => void};
const CalendarGrid: React.FC<CalendarGridProps> = ({year, month, selected, onSelect, onMonthChange}) => {
  // Build a 6-week grid including prev/next month days
  const firstOfMonth = new Date(year, month, 1);
  const startWeek = firstOfMonth.getDay(); // 0..6 (Sun..Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: {day: number; inCurrent: boolean; date: Date}[] = [];
  // previous month tail
  for (let i = startWeek - 1; i >= 0; i--) {
    const day = daysInPrev - i;
    const d = new Date(year, month - 1, day);
    cells.push({day, inCurrent: false, date: d});
  }
  // current month
  for (let d = 1; d <= daysInMonth; d++) cells.push({day: d, inCurrent: true, date: new Date(year, month, d)});
  // next month head
  let nextDay = 1;
  while (cells.length < 42) { const d = new Date(year, month + 1, nextDay); cells.push({day: nextDay, inCurrent: false, date: d}); nextDay++; }

  const onPrev = () => onMonthChange && onMonthChange(year, month - 1);
  const onNext = () => onMonthChange && onMonthChange(year, month + 1);

  const isSameDate = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const today = new Date();

  return (
    <View>
      <View style={m.navRow}>
        <Pressable style={m.navBtn} onPress={onPrev}><Text style={m.navTxt}>{'‹'}</Text></Pressable>
        <Text style={m.navTitle}>{firstOfMonth.toLocaleString('vi-VN', {month: 'long', year: 'numeric'})}</Text>
        <Pressable style={m.navBtn} onPress={onNext}><Text style={m.navTxt}>{'›'}</Text></Pressable>
      </View>

      <View style={m.weekRow}>
        {['CN','T2','T3','T4','T5','T6','T7'].map(d => <Text key={d} style={m.weekDay}>{d}</Text>)}
      </View>

      <View style={m.grid}>
        {cells.map((c, idx) => {
          const selectedDay = isSameDate(c.date, selected);
          const todayDay = isSameDate(c.date, today);
          return (
            <Pressable key={idx} style={[m.cell, selectedDay ? m.cellSelected : null, !c.inCurrent ? m.cellMuted : null]} onPress={() => onSelect(c.date)}>
              <Text style={[m.cellText, selectedDay ? m.cellTextSelected : null, !c.inCurrent ? m.cellTextMuted : null]}>{c.day}</Text>
              {todayDay && <View style={m.todayDot} />}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const m = StyleSheet.create({
  modalOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center'},
  modalCard: {width: '92%', backgroundColor: '#fff', borderRadius: 12, padding: 16},
  calHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  calTitle: {fontWeight: '800'},
  navRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12},
  navBtn: {width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9'},
  navTxt: {fontSize: 18},
  navTitle: {fontWeight: '800'},
  weekRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8},
  weekDay: {width: 36, textAlign: 'center', color: '#64748b'},
  grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'},
  cell: {width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 8, borderRadius: 8, marginBottom: 6},
  cellSelected: {backgroundColor: '#0ea5e9'},
  cellMuted: {opacity: 0.45},
  cellText: {color: '#0f172a'},
  cellTextSelected: {color: '#fff', fontWeight: '700'},
  cellTextMuted: {color: '#94a3b8'},
  todayDot: {width: 6, height: 6, borderRadius: 3, backgroundColor: '#ef4444', marginTop: 6},
});