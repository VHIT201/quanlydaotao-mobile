import {create} from 'zustand';

interface LoadingState {
    loading: boolean;
    setLoading: (loading: boolean) => void;
} 

const useLoadingStore = create<LoadingState>((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading })
}))

export default useLoadingStore