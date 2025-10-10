import {View, Text, StyleSheet } from 'react-native'
const Hero = () => {
    return (
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
    )
}

const styles = StyleSheet.create({
  heroCard: {flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderRadius: 12, marginBottom: 12, alignItems: 'center', elevation: 2},
  heroLeft: {flex: 1},
  heroRight: {width: 120, alignItems: 'flex-end'},
  heroTitle: {fontSize: 20, fontWeight: '900', color: '#0f172a'},
  heroSubtitle: {color: '#64748b', marginTop: 6},
  heroStats: {backgroundColor: '#E8F4FF', padding: 10, borderRadius: 10, alignItems: 'center'},
  heroNumber: {fontSize: 18, fontWeight: '900', color: '#0ea5e9'},
  heroLabel: {fontSize: 12, color: '#0ea5e9'}
})

export default Hero