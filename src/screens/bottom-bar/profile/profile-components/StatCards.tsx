import {FC} from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface StatCardsProps {
    todaySchedule: number,
    attendance: number,
    absence: number
}

const StatCards: FC<StatCardsProps> = ({todaySchedule, attendance, absence}) => {
    return (
    <View style={styles.statsRow}>
        <View style={styles.statCard}><Text style={styles.statNum}>{todaySchedule}</Text><Text style={styles.statLabel}>Buổi hôm nay</Text></View>
        <View style={styles.statCard}><Text style={styles.statNum}>{attendance}%</Text><Text style={styles.statLabel}>Chuyên cần</Text></View>
        <View style={styles.statCard}><Text style={styles.statNum}>{absence}</Text><Text style={styles.statLabel}>Vắng</Text></View>
    </View>
    )
}

const styles = StyleSheet.create({
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20},
  statCard: {flex: 1, backgroundColor: '#fff', marginHorizontal: 8, padding: 18, borderRadius: 16, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.10, shadowRadius: 4},
  statNum: {fontWeight: '900', fontSize: 20, color: '#0f172a'},
  statLabel: {color: '#64748b', marginTop: 8, fontSize: 13},
  sectionTitle: {fontSize: 17, fontWeight: '800', color: '#0f172a', marginBottom: 14, marginTop: 24},
})

export default StatCards