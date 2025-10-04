import React, {useRef} from 'react';
import {View, Text, StyleSheet, Pressable, Animated} from 'react-native';
import {CalendarDays, Clock, Check} from 'lucide-react-native';

type Props = {
  id: string;
  subject: string;
  time: string;
  room?: string;
  teacher?: string;
  status?: 'upcoming' | 'live' | 'done';
  onJoin?: (id: string) => void;
};

const CourseCard: React.FC<Props> = ({id, subject, time, room, teacher, status = 'upcoming', onJoin}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => Animated.spring(scale, {toValue: 0.97, useNativeDriver: true, friction: 8}).start();
  const onPressOut = () => Animated.spring(scale, {toValue: 1, useNativeDriver: true, friction: 8}).start();

  return (
    <Animated.View style={[styles.card, {transform: [{scale}]}]}>
      <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={() => onJoin?.(id)} android_ripple={{color: 'rgba(0,0,0,0.04)'}} style={styles.touchArea}>
        <View style={styles.leftIcon}>
          <CalendarDays size={20} color="#fff" />
        </View>

        <View style={styles.body}>
          <Text style={styles.subject}>{subject}</Text>
          <View style={styles.rowMeta}>
            <View style={styles.chip}><Text style={styles.chipText}>{teacher}</Text></View>
            <View style={[styles.chip, {backgroundColor: '#eef2ff', marginLeft: 6}]}><Text style={[styles.chipText, {color: '#334155'}]}>{room}</Text></View>
          </View>
        </View>

        <View style={styles.right}>
          <View style={styles.timePill}>
            <Clock size={12} color="#0f172a" />
            <Text style={styles.timePillText}>{time}</Text>
          </View>
          {status === 'live' ? (
            <View style={styles.livePill}><Text style={styles.liveText}>Live</Text></View>
          ) : status === 'done' ? (
            <View style={styles.doneWrap}><Check size={14} color="#06D6A0" /><Text style={styles.doneText}>Hoàn thành</Text></View>
          ) : (
            <View style={styles.joinBtn}><Text style={styles.joinText}>Vào</Text></View>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 8},
    shadowRadius: 18,
  },
  touchArea: {flexDirection: 'row', alignItems: 'center', flex: 1},
  leftIcon: {width: 56, height: 56, borderRadius: 14, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center', marginRight: 14},
  body: {flex: 1},
  subject: {fontWeight: '900', color: '#0f172a', fontSize: 16, marginBottom: 6},
  rowMeta: {flexDirection: 'row', alignItems: 'center'},
  chip: {backgroundColor: '#eef2ff', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8},
  chipText: {fontSize: 12, color: '#334155', fontWeight: '700'},
  time: {color: '#94a3b8', fontSize: 12, marginTop: 6},
  right: {justifyContent: 'center', alignItems: 'flex-end'},
  joinBtn: {backgroundColor: '#06b6d4', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, marginTop: 10},
  joinText: {color: '#fff', fontWeight: '800'},
  livePill: {backgroundColor: '#ef4444', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, marginTop: 10},
  liveText: {color: '#fff', fontWeight: '700', fontSize: 12},
  doneWrap: {flexDirection: 'row', alignItems: 'center', marginTop: 10},
  doneText: {color: '#64748b', fontWeight: '700', marginLeft: 8},
  timePill: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 10},
  timePillText: {color: '#0f172a', fontSize: 12, marginLeft: 6, fontWeight: '700'},
});

export default CourseCard;
