import {View, Text, Pressable, StyleSheet} from 'react-native'
import {Bell} from 'lucide-react-native'
import { memo } from 'react';

const Header = memo(({firstName, isLoading} : {firstName: string | null, isLoading: boolean}) => {
    const today = new Date();
    const dateStr = today.toLocaleDateString('vi-VN', {weekday: 'long', day: 'numeric', month: 'short'});
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>

            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{firstName[0]}</Text>
            </View>

            <View>
                <Text style={styles.greeting}>Xin chào,</Text>
                <Text style={styles.username}>{firstName}</Text>
                <Text style={styles.date}>{dateStr}</Text>
            </View>

            </View>
            <Pressable style={styles.bellWrap}>
                
            <Bell size={20} color="#333" />

            <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
            </View>

            </Pressable>
        </View>
    )
})

const styles = StyleSheet.create({
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
})

export default Header