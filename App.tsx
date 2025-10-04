/**
 * @format
 */

import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { useLanguageInit } from './src/hooks/useLanguageInit';

const App: React.FC = () => {
  // Khởi tạo ngôn ngữ khi ứng dụng khởi động
  useLanguageInit();
  
  return <AppNavigator />;
};

export default App;
