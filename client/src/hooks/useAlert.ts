import { useCallback } from "react";


export const useAlert = () => {
    const showAlert = useCallback((msg : string) => {
        window.alert(msg);
    }, []);

    return showAlert;
};