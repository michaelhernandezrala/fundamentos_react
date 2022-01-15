
const keyToken = 'AUTH_TOKEN';

export const getToken = () => {
    return localStorage.getItem(keyToken);
};

export const setToken = (token) => {
    localStorage.setItem(keyToken, token);
};

export const deleteToken = () => {
    console.log('deleteToken')
    localStorage.removeItem(keyToken);
}

