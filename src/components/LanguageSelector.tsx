import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import useLanguageStore from '../store/languageStore';

const LanguageSelector = ({ style } : {style?: object})=> {
  const language = useLanguageStore(state => state.language);
  const setLanguageStore = useLanguageStore(state => state.setLanguage);
  
  const handleSetVietnamese = () => setLanguageStore('vi');
  const handleSetEnglish = () => setLanguageStore('en');
  
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