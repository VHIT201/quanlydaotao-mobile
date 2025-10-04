import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { COLORS } from '../../theme';
import AppTextInput from '../../components/AppTextInput';
import { Facebook } from 'lucide-react-native';
import { useGlobalStore } from '../../store/globalStore';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { loadI18nModule } from '../../i18n';
import LanguageSelector from '../../components/LanguageSelector';

const LOGO_URL = 'https://vietprodev.vn/wp-content/uploads/2024/12/Logo-VietProDev.png';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  // Sử dụng đúng cách để tránh vòng lặp vô hạn
  const setLoading = useGlobalStore(state => state.setLoading);
  const { t, i18n } = useTranslation('auth');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadI18nModule('auth', i18n.language);
    Animated.spring(cardAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  }, [i18n.language]);

  const handleLogin = () => {
    setError('');
    if (!username || !password) {
      setError(t('empty_fields'));
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (username === 'student' && password === '123456') {
        Alert.alert(t('login_success'), t('welcome_back'));
        // TODO: set user info, navigate to main app
      } else {
        setError(t('invalid_credentials'));
      }
    }, 1200);
  };

  return (
    <View style={styles.bgWrap}>
      <View
        style={[styles.gradientTop, { backgroundColor: COLORS.secondary }]}
      />
      <View
        style={[styles.gradientBottom, { backgroundColor: COLORS.accent }]}
      />
      <SafeAreaView
        style={[styles.container, { backgroundColor: COLORS.background }]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Animated.View
            style={[
              styles.card,
              {
                backgroundColor: COLORS.card,
                shadowColor: COLORS.text,
                transform: [{ scale: cardAnim }],
              },
            ]}
          >
            <Image source={{ uri: LOGO_URL }} style={styles.logoBig} />
            <Text style={styles.welcome}>{t('welcome')}</Text>
            <Text style={[styles.title, { color: COLORS.text }]}>
              {t('login_title')}
            </Text>
            <View style={styles.divider} />
            <AppTextInput
              label={t('username')}
              inputType="text"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              returnKeyType="next"
              error={error && !password ? error : ''}
              style={{ color: COLORS.text }}
            />
            <AppTextInput
              label={t('password')}
              password
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              error={error && password ? error : ''}
              style={{ color: COLORS.text }}
            />
            <Pressable
              style={[styles.loginBtn, { backgroundColor: COLORS.primary }]}
              onPress={handleLogin}
              android_ripple={{ color: COLORS.secondary }}
            >
              <Text style={[styles.loginText, { color: COLORS.card }]}>
                {t('login')}
              </Text>
            </Pressable>
            <Pressable
              style={styles.forgotBtn}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={[styles.forgotText, { color: COLORS.primary }]}>
                {t('forgot_password')}
              </Text>
            </Pressable>
            <View style={styles.socialDivider}>
              <View style={styles.line} />
              <Text style={styles.socialText}>{t('or_login_with')}</Text>
              <View style={styles.line} />
            </View>
            <View style={styles.socialRow}>
              <Pressable
                style={styles.socialBtn}
                android_ripple={{ color: COLORS.secondary }}
              >
                <Facebook size={22} color={COLORS.primary} />
              </Pressable>
              <Pressable
                style={styles.socialBtn}
                android_ripple={{ color: COLORS.secondary }}
              >
                <Facebook size={22} color={COLORS.primary} />
              </Pressable>
            </View>

            {/* Language Selector */}
            <LanguageSelector />
          </Animated.View>
        </KeyboardAvoidingView>
        <Text style={[styles.version, { color: COLORS.muted }]}>
          © 2025 Quản lý đào tạo • v1.0.0
        </Text>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  bgWrap: { flex: 1 },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    zIndex: -1,
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: -1,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 28,
    borderRadius: 20,
    width: '90%',
    elevation: 6,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  logoBig: {
    width: 120,
    height: 120,
    borderRadius: 45,
    marginBottom: 18,
    alignSelf: 'center',
    objectFit: 'contain',
  },
  welcome: {
    fontSize: 17,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: COLORS.background,
    marginVertical: 10,
    borderRadius: 2,
  },
  inputWrap: { position: 'relative', width: '100%', marginBottom: 16 },
  inputPassword: { paddingRight: 44 },
  eyeBtnAbs: {
    position: 'absolute',
    right: 8,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    padding: 8,
  },
  error: { fontWeight: '700', marginBottom: 8, alignSelf: 'flex-start' },
  loginBtn: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 4,
    marginBottom: 8,
  },
  loginText: { fontWeight: '900', fontSize: 17 },
  forgotBtn: { marginTop: 2, padding: 6 },
  forgotText: { fontWeight: '700', fontSize: 15 },
  version: { textAlign: 'center', marginTop: 36, fontSize: 13 },
  socialDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 8,
  },
  socialText: { color: COLORS.textSecondary, fontSize: 13 },
  socialRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 2 },
  socialBtn: {
    backgroundColor: COLORS.background,
    borderRadius: 32,
    padding: 12,
    marginHorizontal: 8,
    elevation: 2,
  },
});

export default LoginScreen;
