import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setError('');
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setSent(true);
    Alert.alert('Reset link sent', 'Please check your email for instructions.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive a reset link.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Pressable style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendText}>Send Reset Link</Text>
        </Pressable>
        {sent ? <Text style={styles.success}>Reset link sent! Check your email.</Text> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  card: { padding: 28, borderRadius: 20, width: '90%', elevation: 6, backgroundColor: COLORS.card, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '900', marginBottom: 8, textAlign: 'center', color: COLORS.text },
  subtitle: { fontSize: 15, marginBottom: 18, textAlign: 'center', color: COLORS.textSecondary },
  input: { width: '100%', backgroundColor: '#f8fafc', padding: 13, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, fontSize: 16, marginBottom: 16 },
  error: { color: COLORS.error, marginBottom: 8, fontWeight: '700', alignSelf: 'flex-start' },
  sendBtn: { paddingVertical: 15, borderRadius: 12, alignItems: 'center', width: '100%', backgroundColor: COLORS.primary, marginBottom: 8 },
  sendText: { color: COLORS.card, fontWeight: '900', fontSize: 17 },
  success: { color: COLORS.success || 'green', marginTop: 8, fontWeight: '700', textAlign: 'center' },
});

export default ForgotPasswordScreen;
