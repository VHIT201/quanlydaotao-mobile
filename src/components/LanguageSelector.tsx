import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useGlobalStore } from '../store/globalStore';
import { COLORS } from '../theme';

interface LanguageSelectorProps {
  style?: object;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ style }) => {
  // Use useGlobalStore correctly to avoid unnecessary re-renders
  // Get each value separately to avoid infinite loops
  const language = useGlobalStore(state => state.language);
  const setLanguageStore = useGlobalStore(state => state.setLanguage);
  
  // Use useCallback to memoize event handler functions
  const handleSetVietnamese = useCallback(() => {
    setLanguageStore('vi');
  }, [setLanguageStore]);
  
  const handleSetEnglish = useCallback(() => {
    setLanguageStore('en');
  }, [setLanguageStore]);
  
  return (
    <View style={[styles.container, style]}>
      <Pressable
        style={[
          styles.languageButton,
          language === 'vi' ? styles.activeLanguage : null
        ]}
        onPress={handleSetVietnamese}
      >
        <Text style={styles.languageText}>🇻🇳 VI</Text>
      </Pressable>
      <Pressable
        style={[
          styles.languageButton,
          language === 'en' ? styles.activeLanguage : null
        ]}
        onPress={handleSetEnglish}
      >
        <Text style={styles.languageText}>🇬🇧 EN</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.secondary + '30',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeLanguage: {
    backgroundColor: COLORS.primary + '30',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  languageText: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default LanguageSelector;