import {View, Text, StyleSheet} from 'react-native'

const Stat = () => {
    return (
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
    )
}

const styles = StyleSheet.create({
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12},
  statCard: {flex: 1, backgroundColor: '#fff', marginRight: 8, padding: 12, borderRadius: 10, alignItems: 'center', elevation: 2},
  statNumber: {fontSize: 18, fontWeight: '800', color: '#111'},
  statLabel: {fontSize: 12, color: '#6b7280', marginTop: 6},
  progressBar: {height: 6, backgroundColor: '#e6eefc', width: '100%', borderRadius: 6, marginTop: 10, overflow: 'hidden'},
  progressFill: {height: 6, backgroundColor: '#0ea5e9'},
})

export default Stat