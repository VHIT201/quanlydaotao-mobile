import { useQuery } from '@tanstack/react-query';
import { getTokens } from '../services/TokenService';
import api from '../services/AuthService'

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { accessToken } = await getTokens(); // Kiểm tra có access token hay chưa
      if (!accessToken) throw new Error('No token'); 
      const res = await api.get('auth/profile');
      return res.data;
    },
    enabled: true, // true: luôn chạy
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
};