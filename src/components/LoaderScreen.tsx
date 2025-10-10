import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const LoaderScreen = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#2196F3" />
    <Text style={styles.text}>Đang tải...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {position: 'absolute', zIndex: 10, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent'},
  text: {marginTop: 10, fontSize: 16, color: '#64748b'},
});

export default LoaderScreen;