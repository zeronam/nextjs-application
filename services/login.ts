import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import { fetchWrapper } from '../helpers/api/fetch-api';

const { publicRuntimeConfig } = getConfig();
const baseUrl = `http://localhost:8000`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const login = (email: string, password: string) => {
    return fetchWrapper.post(`${baseUrl}/auth/login`, { email, password })
        .then(user => {
            console.log(user);
            userSubject.next(user);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

export const userService = {
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value },
    login
};

