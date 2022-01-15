import { deleteToken, setToken } from "../utils/storage";
import client, { removeAuthorizationHeader, setAuthorizationHeader } from "./Client"

const pathname = 'api';
const version = 'v1';

export const login = (credentials, checkOut) => {
    return client.post(`/${pathname}/auth/login`, credentials).then(({ accessToken }) => {
        setAuthorizationHeader(accessToken);
        if (checkOut) {
            setToken(accessToken);
        }
    });
}

export const logout = () =>
  Promise.resolve().then(() => {
    removeAuthorizationHeader()
    deleteToken()
  });


export const getListOfAdverts = () => {
    return client.get(`/${pathname}/${version}/adverts`);
}

export const postNewAdvert = (advert) => {
    return client.post(`/${pathname}/${version}/adverts`, advert);
}

export const getAdvertDetail = (id) => {
    return client.get(`/${pathname}/${version}/adverts/${id}`);
}

export const deleteAdvert = (id) => {
    return client.delete(`/${pathname}/${version}/adverts/${id}`);
}