import getConfig from 'next/config';
import { userService } from '../../services/login';

const { publicRuntimeConfig } = getConfig();

const get = (url: string) => {
    const requestOptions: any = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url: string, body: any) => {
    const requestOptions: any = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const put = (url: string, body: any) => {
    const requestOptions: any = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}

const _delete = (url: string) => {
    const requestOptions: any = {
        method: 'DELETE',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const authHeader = (url: string) => {
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

const handleResponse = (response: any) => {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && userService.userValue) {
                // userService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
};