import {create} from 'zustand';

interface AuthenticatedState {
    authenticated: boolean;
    setAuthenticated: (loading: boolean) => void;
} 

const useAuthenticatedStore = create<AuthenticatedState>((set) => ({
    authenticated: false,
    setAuthenticated: (authenticated: boolean) => set({ authenticated })
}))

export default useAuthenticatedStore