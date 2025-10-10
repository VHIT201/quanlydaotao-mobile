import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

// Quản lý ngôn ngữ
interface LanguageState {
    language: 'en' | 'vi',
    setLanguage: (language: 'en' | 'vi') => Promise<boolean>;
}

const useLanguageStore = create<LanguageState>((set) => ({
    // Mặc định ngôn ngữ là tiếng Việt
    language: 'vi',
    setLanguage: async (language) => {
        try {
            // Lưu vào storage
            await AsyncStorage.setItem('user-language', language);

            // Cập nhật store trước
            set({ language });

            // Sau đó mới đổi ngôn ngữ trong i18n
            i18n.changeLanguage(language);
            return true;
        } catch (e) {
            throw e;
        }
    }
}))

export default useLanguageStore