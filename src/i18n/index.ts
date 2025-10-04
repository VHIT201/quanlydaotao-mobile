import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

// Import basic resources
const enCommon = require('./locales/en.json');
const viCommon = require('./locales/vi.json');

// Supported languages
const AVAILABLE_LANGUAGES = ['en', 'vi'] as const;
type AvailableLanguage = typeof AVAILABLE_LANGUAGES[number];

// Module registry - Register modules and their corresponding resources
const moduleRegistry: Record<string, Record<string, any>> = {
  auth: {
    en: require('./locales/en/auth.json'),
    vi: require('./locales/vi/auth.json')
  },
  attendance: {
    en: require('./locales/en/attendance.json'),
    vi: require('./locales/vi/attendance.json')
  }
  // Add new modules here when needed
};

// Language detector for i18next - Uses AsyncStorage
// Currently it can be overridden by Zustand store
const languageDetector = {
  type: 'languageDetector' as any,
  async: true,
  detect: async (callback: (lng: string) => void) => {
    try {
      // Get saved language from AsyncStorage
      const storedLang = await AsyncStorage.getItem('user-language');
      if (storedLang && AVAILABLE_LANGUAGES.includes(storedLang as AvailableLanguage)) {
        callback(storedLang);
        return;
      }
      
      // Get device language
      const deviceLang = RNLocalize.getLocales()[0].languageCode;
      const supported = AVAILABLE_LANGUAGES.includes(deviceLang as AvailableLanguage);
      callback(supported ? deviceLang : 'en');
    } catch (error) {
      callback('en'); // Default to English on error
    }
  },
  init: () => {},
  cacheUserLanguage: async (lng: string) => {
    try {
      await AsyncStorage.setItem('user-language', lng);
    } catch (error) {
      console.warn('Failed to cache language', error);
    }
  }
};

// Initialize i18n with basic resources
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon },
      vi: { common: viCommon }
    },
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

/**
 * Load a language module on demand
 * @param module - Name of the module to load (auth, attendance, etc)
 * @param lang - Language to load (defaults to current language)
 */
export const loadI18nModule = (module: string, lang?: string) => {
  const currentLang = lang || i18n.language;
  
  // Check if module exists in registry
  if (moduleRegistry[module] && moduleRegistry[module][currentLang]) {
    // Add resource to i18n
    i18n.addResourceBundle(
      currentLang,
      module,
      moduleRegistry[module][currentLang],
      true, // Deep merge
      true  // Overwrite
    );
    
    return true;
  }
  
  console.warn(`Module "${module}" does not exist or does not support language "${currentLang}"`);
  return false;
};

/**
 * Change language
 * @param lang - Language to switch to
 */
export const changeLanguage = async (lang: AvailableLanguage) => {
  // Confirm language is supported
  if (!AVAILABLE_LANGUAGES.includes(lang)) {
    console.warn(`Language "${lang}" is not supported`);
    return false;
  }
  
  try {
    // Change language
    await i18n.changeLanguage(lang);
    
    // Update all loaded modules for the new language
    const loadedNamespaces = i18n.reportNamespaces?.getUsedNamespaces() || [];
    for (const ns of loadedNamespaces) {
      if (ns !== 'common' && moduleRegistry[ns] && moduleRegistry[ns][lang]) {
        i18n.addResourceBundle(lang, ns, moduleRegistry[ns][lang], true, true);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error changing language:', error);
    return false;
  }
};

export { AVAILABLE_LANGUAGES };
export type { AvailableLanguage };
export default i18n;