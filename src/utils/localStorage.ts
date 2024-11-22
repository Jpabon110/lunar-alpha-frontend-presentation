export const getLocalStorageToken = () => {
    return window.localStorage.getItem("token") || '';
}

export const saveLocalStorageToken = (token: string) => {
    window.localStorage.setItem("token", token);
}