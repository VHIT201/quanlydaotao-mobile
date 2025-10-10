/**
 * @format
 */
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './src/navigation/AppNavigator';
import useLanguageStore from './src/store/languageStore';
import * as RNLocalize from 'react-native-localize';
import LoaderScreen from './src/components/LoaderScreen';

const App = () => {
  const [ready, setReady] = useState(false);
  const setLanguage = useLanguageStore((state) => state.setLanguage);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('user-language');
        let lang = storedLang as 'en' | 'vi';

        if (!lang) {
          const deviceLang = RNLocalize.getLocales()[0].languageCode;
          lang = deviceLang === 'en' ? 'en' : 'vi';
        }

        setLanguage(lang);
      } catch (e) {
        setLanguage('vi'); // fallback
      } finally {
        setReady(true);
      }
    };

    initLanguage();
  }, [setLanguage]);

  if (!ready) {
    // Hiển thị splash hoặc loading ngắn gọn
    return (
      <LoaderScreen />
    );
  }

  return <AppNavigator />;
};

export default App;
