import { create } from "zustand";

interface StoreState {
    isLogined : boolean;
    storeLogin : (token:string) => void;
    storeLogout : () => void;
}

export const getToken = () => {
    return localStorage.getItem('token');
};

const setToken = (token : string) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const useAuthStore = create<StoreState>((set)=>({
    isLogined : getToken()? true : false,
    storeLogin : (token) => {
        set(state => ({...state, isLogined : true }));
        setToken(token);
    },
    storeLogout : () => {
        set(state => ({...state, isLogined : false }));
        removeToken();
    },
}));