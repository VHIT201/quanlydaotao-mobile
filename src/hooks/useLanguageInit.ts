import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import { useGlobalStore } from '../store/globalStore';
import i18n from '../i18n';

/**
 * Hook để khởi tạo và đồng bộ ngôn ngữ khi khởi động ứng dụng
 * Sẽ được gọi trong App.tsx hoặc file khởi động
 */
export const useLanguageInit = () => {
  // Lưu ý: Chúng ta vẫn cần lấy hàm setLanguage từ store, nhưng Zustand
  // sẽ đảm bảo hàm này ổn định giữa các lần render
  const setLanguage = useGlobalStore((state) => state.setLanguage);
  
  useEffect(() => {
    const initLanguage = async () => {
      try {
        console.log('Đang khởi tạo ngôn ngữ...');
        
        // Thử lấy ngôn ngữ đã lưu từ AsyncStorage
        const storedLanguage = await AsyncStorage.getItem('user-language');
        
        if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'vi')) {
          // Nếu có ngôn ngữ đã lưu, sử dụng nó
          console.log('Đã tìm thấy ngôn ngữ đã lưu:', storedLanguage);
          await setLanguage(storedLanguage);
        } else {
          // Nếu không, lấy ngôn ngữ từ thiết bị
          const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
          
          // Chỉ hỗ trợ en và vi
          const supportedLanguage = deviceLanguage === 'en' ? 'en' : 'vi';
          console.log('Sử dụng ngôn ngữ từ thiết bị:', supportedLanguage);
          
          await setLanguage(supportedLanguage);
        }
      } catch (error) {
        console.warn('Failed to initialize language:', error);
        // Mặc định là tiếng Việt nếu có lỗi
        try {
          await setLanguage('vi');
        } catch (innerError) {
          console.error('Lỗi khi đặt ngôn ngữ mặc định:', innerError);
        }
      }
    };
    
    initLanguage();
  }, []);
};