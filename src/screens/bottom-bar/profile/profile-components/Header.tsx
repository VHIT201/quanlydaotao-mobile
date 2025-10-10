import { useState } from 'react'
import { View, Text, Pressable, Animated, Alert, StyleSheet } from 'react-native'
import { Edit2 } from 'lucide-react-native'

const Header = ({firstName, lastName, email}: {firstName: string | null, lastName: string | null, email: string | null}) => {
    const avatarScale = useState(new Animated.Value(1))[0];
    const onEdit = () => Alert.alert('Chỉnh sửa', 'Mở màn hình chỉnh sửa (placeholder)');
    const onAvatarPressIn = () => Animated.spring(avatarScale, {toValue: 0.92, useNativeDriver: true}).start();
    const onAvatarPressOut = () => Animated.spring(avatarScale, {toValue: 1, useNativeDriver: true}).start();
    return (
    <>
    <View style={styles.headerBg}>
        <View style={styles.headerGradientTop} />
        <View style={styles.headerGradientBottom} />
    </View>
    <View style={styles.header}>
        <Pressable onPressIn={onAvatarPressIn} onPressOut={onAvatarPressOut}>
        <Animated.View style={[styles.avatar, {backgroundColor: '#60a5fa', transform: [{scale: avatarScale}]}]}>
            <Text style={styles.avatarText}>{firstName?.split(' ').slice(-1)[0][0]}</Text>
        </Animated.View>
        </Pressable>
        <View style={styles.userInfo}>
        <Text style={styles.name}>{`${firstName} ${lastName}`}</Text>
        <Text style={styles.email}>{email}</Text>
        </View>
        <Pressable style={styles.editBtn} onPress={onEdit}>
        <Edit2 color="#0f172a" size={20} />
        </Pressable>
    </View>
    </>
    )
}

const styles = StyleSheet.create({
  headerBg: {position: 'absolute', top: 0, left: 0, right: 0, height: 140, zIndex: -1},
  headerGradientTop: {position: 'absolute', top: 0, left: 0, right: 0, height: 90, backgroundColor: '#06b6d4', borderBottomLeftRadius: 40, borderBottomRightRadius: 40},
  headerGradientBottom: {position: 'absolute', top: 90, left: 0, right: 0, height: 50, backgroundColor: '#3b82f6', borderBottomLeftRadius: 40, borderBottomRightRadius: 40},
  header: {display: 'flex', alignItems: 'center', marginBottom: 20, marginTop: 30},
  avatar: {width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#fff', elevation: 8, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.12, shadowRadius: 8},
  avatarText: {color: '#fff', fontSize: 36, fontWeight: '900'},
  userInfo: {flex: 1, marginLeft: 18},
  name: {fontSize: 22, fontWeight: '900', color: '#0f172a'},
  email: {color: '#64748b', marginTop: 4, fontSize: 15},
  editBtn: {width: 52, height: 52, borderRadius: 26, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.12, shadowRadius: 4},
})

export default Header