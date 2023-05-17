export const localStorageService = {
    getToken: () => localStorage.getItem("userToken"),
    removetoken : () => localStorage.removeItem("userToken"),
    setToken : (token:string)=> localStorage.setItem ('userToken', token )
}