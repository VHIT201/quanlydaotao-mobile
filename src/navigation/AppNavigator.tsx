import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUserProfile } from '../hooks/useUserProfile';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Main from './navigator/Main';
import Auth from './navigator/Auth';
import Toast from 'react-native-toast-message';
import ToastConfig from '../components/ToastConfig';
import LoaderScreen from '../components/LoaderScreen';

export const queryClient = new QueryClient();

const AppContent = () => {
  const { data, isLoading, isError } = useUserProfile();

  if(isLoading) return <LoaderScreen />


  if (isError || !data) {
    return <Auth />;
  }

  return <Main />;
};

const AppNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider style={{backgroundColor: '#f8fafc'}}>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
        <Toast config={ToastConfig}/>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default AppNavigator;