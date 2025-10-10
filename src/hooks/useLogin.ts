import { useMutation } from '@tanstack/react-query';
import { saveTokens } from '../services/TokenService'
import { queryClient } from '../navigation/AppNavigator';
import { loginApi } from '../services/AuthService';
import api from '../services/AuthService';
export const useLogin = () => {
    return useMutation({
    mutationFn: async ({ username, password }: {username: string, password: string}) => {
      const data = await loginApi(username, password)
      await saveTokens(data.token, data.refreshToken)
      return data
    },
    onSuccess: async () => {
        const userProfile = await queryClient.fetchQuery({
        queryKey: ['userProfile'],
        queryFn: async () => {
          const res = await api.get('auth/profile');
          return res.data;
        },
        });

        // Lưu user vào cache
        queryClient.setQueryData(['userProfile'], userProfile);

        
    }
    })
}