import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {Activity, Check, Clock} from 'lucide-react-native';

type ActivityItem = {id: string; title: string; subtitle?: string; time: string; unread?: boolean};

const AVATAR_COLORS = ['#06b6d4', '#7c3aed', '#fb7185', '#f59e0b', '#06d6a0'];

const pickColor = (id: string) => {
  const n = id.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
  return AVATAR_COLORS[n % AVATAR_COLORS.length];
};

const ActivityFeed: React.FC<{
  items: ActivityItem[];
  showHeader?: boolean;
  onSeeAll?: () => void;
  onItemPress?: (id: string) => void;
}> = ({items, showHeader = false, onSeeAll, onItemPress}) => {
  return (
    <View>
      {showHeader && (
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Hoạt động gần đây</Text>
          <Pressable onPress={onSeeAll} style={({pressed}) => [{opacity: pressed ? 0.6 : 1}] }>
            <Text style={styles.seeAll}>Xem tất cả</Text>
          </Pressable>
        </View>
      )}

      {items.map(i => (
        <Pressable
          key={i.id}
          onPress={() => onItemPress?.(i.id)}
          android_ripple={{color: 'rgba(0,0,0,0.04)'}}
          style={({pressed}) => [styles.row, pressed && styles.rowPressed]}
        >
          <View style={[styles.icon, {backgroundColor: pickColor(i.id)}]}>
            <Activity size={16} color="#fff" />
          </View>

          <View style={{flex: 1}}>
            <View style={styles.titleRow}>
              <Text style={styles.title} numberOfLines={1}>{i.title}</Text>
              {i.unread ? <View style={styles.unreadDot} /> : null}
            </View>
            {i.subtitle ? <Text style={styles.subtitle} numberOfLines={1}>{i.subtitle}</Text> : null}
            <View style={styles.rowMeta}>
              <Clock size={12} color="#94a3b8" />
              <Text style={styles.time}>{i.time}</Text>
            </View>
          </View>

          <View style={styles.actionWrap}>{i.unread ? null : <Check size={18} color="#06D6A0" />}</View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
  headerTitle: {fontSize: 16, fontWeight: '900', color: '#0f172a'},
  seeAll: {color: '#2563EB', fontWeight: '800'},
  row: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 14, borderRadius: 12, marginBottom: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowOffset: {width:0, height:6}, shadowRadius: 12},
  rowPressed: {opacity: 0.88},
  icon: {width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 14},
  titleRow: {flexDirection: 'row', alignItems: 'center'},
  title: {fontWeight: '800', color: '#0f172a', marginRight: 8, flex: 1},
  unreadDot: {width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444'},
  subtitle: {color: '#64748b', marginTop: 6},
  rowMeta: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
  time: {color: '#94a3b8', fontSize: 12, marginLeft: 8},
  actionWrap: {marginLeft: 8, width: 28, alignItems: 'center', justifyContent: 'center'},
});

export default ActivityFeed;
