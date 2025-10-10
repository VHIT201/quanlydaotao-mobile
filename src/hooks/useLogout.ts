import { useMutation } from '@tanstack/react-query';
import { clearTokens } from '../services/TokenService'
import { queryClient } from '../navigation/AppNavigator';
import api from '../services/AuthService';
export const useLogout = () => {
    return useMutation({
    mutationFn: async () => {
        const res = await api.post('/auth/logout')
        return res
    },
    onSuccess: async () => {
        await clearTokens()
        queryClient.setQueryData(['userProfile'], null)
    },
    })
}