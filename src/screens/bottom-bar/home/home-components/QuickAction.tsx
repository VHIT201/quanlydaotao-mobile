import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Action } from "../../../../types/Types";

const QuickAction = ({item}: {item: Action}) => {
  const Icon = item.icon as any;
  return (
    <Pressable style={({pressed}) => [styles.actionButtonModern, pressed && styles.actionPressed]} onPress={() => {}} android_ripple={{color: 'rgba(0,0,0,0.06)'}}>
      <View style={[styles.actionGradient, {backgroundColor: item.color ?? '#2196F3'}]}>
        <Icon color="#fff" size={20} />
      </View>
      <Text style={styles.actionTextModern} numberOfLines={1}>{item.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  actionsRow: {marginBottom: 16},
  actionButtonModern: {width: 86, marginRight: 12, alignItems: 'center'},
  actionCircle: {width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 8, elevation: Platform.OS === 'android' ? 3 : 6},
  actionGradient: {width: 64, height: 64, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8, elevation: 4},
  actionPressed: {opacity: 0.9, transform: [{scale: 0.994}]},
  actionTextModern: {fontSize: 12, fontWeight: '700', color: '#111', textAlign: 'center'},
  actionsRowModern: {flexDirection: 'row', marginBottom: 16, alignItems: 'center'},
})

export default QuickAction