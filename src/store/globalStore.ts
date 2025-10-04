import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

// Ngôn ngữ được hỗ trợ
type SupportedLanguage = 'en' | 'vi';

interface GlobalState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  setUser: (user: GlobalState['user']) => void;
  
  // Quản lý ngôn ngữ
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => Promise<boolean>;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }),
  user: null,
  setUser: (user) => set({ user }),
  
  // Mặc định ngôn ngữ là tiếng Việt
  language: 'vi',
  setLanguage: async (language) => {
    try {
      console.log(`Đang thay đổi ngôn ngữ thành: ${language}`);
      
      // Lưu ngôn ngữ vào AsyncStorage để giữ nguyên khi khởi động lại ứng dụng
      await AsyncStorage.setItem('user-language', language);
      
      // Thay đổi ngôn ngữ trong i18n
      await i18n.changeLanguage(language);
      
      // Cập nhật state
      set({ language });
      
      console.log(`Đã thay đổi ngôn ngữ thành: ${language}`);
      return true;
    } catch (error) {
      console.error('Lỗi khi thay đổi ngôn ngữ:', error);
      throw error;
    }
  },
}));
