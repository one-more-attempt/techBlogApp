export const localStorageService = {
    getToken: () => localStorage.getItem("userToken"),
    removetoken : () => localStorage.removeItem("userToken")
}