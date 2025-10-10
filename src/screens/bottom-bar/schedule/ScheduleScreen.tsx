import React, {useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Dimensions,
  // useWindowDimensions,
} from 'react-native';
import {Clock, ChevronLeft, ChevronRight} from 'lucide-react-native';
import { Slot } from '../../../types/Types';

const {width: screenWidth} = Dimensions.get('window');


const sampleSchedule: Record<string, Slot[]> = {
  mon: [
    {id: 'm1', subject: 'Toán Đại số', time: '08:00 - 09:30', room: 'P101', teacher: 'Thầy Hùng', color: '#7c3aed'},
    {id: 'm2', subject: 'Lập trình di động', time: '10:00 - 11:30', room: 'P202', teacher: 'Cô Lan', color: '#06b6d4'},
  ],
  tue: [
    {id: 't1', subject: 'Vật lý', time: '09:00 - 10:30', room: 'P303', teacher: 'Cô Mai', color: '#f97316'},
  ],
  wed: [],
  thu: [
    {id: 'th1', subject: 'Tiếng Anh', time: '13:00 - 14:30', room: 'P404', teacher: 'Thầy Nam', color: '#2563EB'},
    {id: 'th2', subject: 'CSDL', time: '15:00 - 16:30', room: 'P505', teacher: 'Cô Hoa', color: '#ef4444'},
  ],
  fri: [
    {id: 'f1', subject: 'Thi thử', time: '08:00 - 10:00', room: 'Hội trường', teacher: 'Ban CTSV', color: '#10b981'},
  ],
  sat: [],
  sun: [],
};

const weekdayKey = (d: Date) => {
  const map = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return map[d.getDay()];
};

const monthNames = ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];

const generateMonth = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = first.getDay(); // 0-6 Sun-Sat

  const weeks: Array<Array<Date | null>> = [];
  let week: Array<Date | null> = [];
  for (let i = 0; i < startDay; i++) week.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) { weeks.push(week); week = []; }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
};

const ScheduleScreen: React.FC = () => {
  const today = new Date();
  const [baseMonth, setBaseMonth] = useState({year: today.getFullYear(), month: today.getMonth()});
  const [selectedDate, setSelectedDate] = useState<Date>(today);

  const weeks = useMemo(() => generateMonth(baseMonth.year, baseMonth.month), [baseMonth]);
  const slotsForSelected = useMemo(() => sampleSchedule[weekdayKey(selectedDate)] ?? [], [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Lịch học</Text>
          <Text style={styles.subtitle}>Xem nhanh lịch tháng</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable onPress={() => setBaseMonth(b => ({ year: b.month === 0 ? b.year - 1 : b.year, month: b.month === 0 ? 11 : b.month - 1 }))} style={styles.iconBtn}>
            <ChevronLeft size={18} color="#0f172a" />
          </Pressable>
          <Text style={styles.monthLabel}>{monthNames[baseMonth.month]} {baseMonth.year}</Text>
          <Pressable onPress={() => setBaseMonth(b => ({ year: b.month === 11 ? b.year + 1 : b.year, month: b.month === 11 ? 0 : b.month + 1 }))} style={styles.iconBtn}>
            <ChevronRight size={18} color="#0f172a" />
          </Pressable>
        </View>
      </View>

      <View style={styles.weekHeader}>
        {['CN','T2','T3','T4','T5','T6','T7'].map((d) => (
          <Text key={d} style={styles.weekHeaderText}>{d}</Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.weekRow}>
            {week.map((dt, di) => {
              const isToday = dt ? dt.toDateString() === new Date().toDateString() : false;
              const isSelected = dt ? selectedDate.toDateString() === dt.toDateString() : false;
              const dots = dt ? (sampleSchedule[weekdayKey(dt)] || []).length : 0;
              return (
                <Pressable key={di} style={[styles.dayCell, isSelected && styles.dayCellSelected]} onPress={() => dt && setSelectedDate(dt)}>
                  <Text style={[styles.dayNum, isToday && styles.dayNumToday, isSelected && styles.dayNumSelected]}>{dt ? dt.getDate() : ''}</Text>
                  <View style={styles.dayDotRow}>
                    {dots > 0 && <View style={styles.eventDot} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={{flex: 1}}>
        <Text style={styles.sectionTitle}>Sự kiện ngày {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</Text>
        {slotsForSelected.length === 0 ? (
          <View style={styles.emptyWrap}>
            <View style={styles.emptyIcon}><Clock size={40} color="#60a5fa" /></View>
            <Text style={styles.emptyTitle}>Không có buổi học</Text>
            <Text style={styles.emptySubtitle}>Ngày này chưa có lịch. Hãy chọn ngày khác hoặc thêm lịch.</Text>
          </View>
        ) : (
          <FlatList
            data={slotsForSelected}
            keyExtractor={s => s.id}
            contentContainerStyle={{paddingBottom: 40}}
            renderItem={({item}) => (
              <View style={styles.slotRow}>
                <View style={styles.timeCol}>
                  <Text style={styles.timeText}>{item.time.split(' - ')[0]}</Text>
                  <Text style={styles.timeSmall}>{item.time.split(' - ')[1]}</Text>
                </View>
                <View style={styles.slotCard}>
                  <View style={[styles.slotAccent, {backgroundColor: item.color ?? '#7c3aed'}]} />
                  <View style={styles.slotBody}>
                    <Text style={styles.slotTitle}>{item.subject}</Text>
                    <Text style={styles.slotMeta}>{item.teacher} • {item.room}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F7FAFF', padding: 16},
  headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12},
  title: {fontSize: 20, fontWeight: '900', color: '#0f172a'},
  subtitle: {color: '#64748b', fontSize: 12, marginTop: 4},
  iconBtn: {width: 36, height: 36, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, elevation: 2},
  monthLabel: {fontWeight: '800', marginHorizontal: 6},
  weekHeader: {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2, marginBottom: 8},
  weekHeaderText: {width: (screenWidth - 32) / 7, textAlign: 'center', color: '#64748b', fontWeight: '800'},
  calendarGrid: {borderRadius: 12, overflow: 'hidden'},
  weekRow: {flexDirection: 'row'},
  dayCell: {width: (screenWidth - 32) / 7, height: 72, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 10},
  dayCellSelected: {backgroundColor: 'rgba(37,99,235,0.06)'},
  dayNum: {color: '#0f172a', fontWeight: '700'},
  dayNumToday: {color: '#2563EB'},
  dayNumSelected: {color: '#2563EB'},
  dayDotRow: {flexDirection: 'row', marginTop: 8},
  eventDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#2563EB'},
  divider: {height: 1, backgroundColor: '#eef2ff', marginVertical: 12},
  sectionTitle: {fontSize: 16, fontWeight: '800', marginBottom: 12, color: '#0f172a'},
  list: {paddingBottom: 40},
  slotRow: {flexDirection: 'row', marginBottom: 12, alignItems: 'center'},
  timeCol: {width: 84, alignItems: 'flex-start'},
  timeText: {fontWeight: '900', color: '#0f172a'},
  timeSmall: {color: '#94a3b8', fontSize: 12, marginTop: 4},
  slotCard: {flex: 1, backgroundColor: '#fff', borderRadius: 12, elevation: 3, flexDirection: 'row', overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.04, shadowOffset: {width: 0, height: 10}, shadowRadius: 16},
  slotAccent: {width: 8, borderTopLeftRadius: 12, borderBottomLeftRadius: 12},
  slotBody: {flex: 1, padding: 12},
  slotTitle: {fontWeight: '900', color: '#0f172a'},
  slotMeta: {color: '#64748b', marginTop: 6, fontSize: 12},
  emptyWrap: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  emptyIcon: {width: 88, height: 88, borderRadius: 22, backgroundColor: 'rgba(96,165,250,0.12)', alignItems: 'center', justifyContent: 'center', marginBottom: 16},
  emptyTitle: {fontSize: 16, fontWeight: '800', color: '#0f172a'},
  emptySubtitle: {color: '#94a3b8', marginTop: 8, textAlign: 'center', paddingHorizontal: 24},
});

export default ScheduleScreen;