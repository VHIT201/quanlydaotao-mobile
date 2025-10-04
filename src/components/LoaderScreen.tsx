import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';

const LoaderScreen: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#2196F3" />
    <Text style={styles.text}>Đang tải...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'},
  text: {marginTop: 10, fontSize: 16, color: '#64748b'},
});

export default LoaderScreen;