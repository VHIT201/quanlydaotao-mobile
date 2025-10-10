import { Student } from './../types/Types';
import {create} from 'zustand';

interface UserState {
    user: Student | null,
    setUser: (user: Student | null) => void;
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({user})
}))

export default useUserStore