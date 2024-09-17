/**
 * @class CookieStorage
 *
 * This class provides utility functions for managing browser cookies, such as checking support for cookies,
 * setting, retrieving, and removing cookies. It offers methods that simplify working with cookies, handling
 * common operations like cookie expiration, secure cookie setting, and value retrieval.
 *
 * The class is designed to abstract away the complexity of dealing with cookies and ensures that cookies are
 * set with common security standards like 'SameSite' and optional 'secure' attributes.
 *
 * @author Daouda Warme
 * */
export default class CookieStorage {

    /**
     * returns if cookies are supported
     *
     * @returns {boolean}
     */
    static isSupported() {
        return document.cookie !== 'undefined';
    }

    /**
     * Sets cookie with name, value and expiration date
     *
     * @param {string} key
     * @param {string} value
     *
     * @param {number} expirationDays
     */
    static setItem(key, value, expirationDays) {
        if (typeof key === 'undefined' || key === null) {
            throw new Error('You must specify a key to set a cookie');
        }

        const date = new Date();
        date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));

        let secure = '';
        if (location.protocol === 'https:') {
            secure = 'secure';
        }

        document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/;sameSite=lax;${secure}`;
    }

    /**
     * Gets cookie value through the cookie name
     *
     * @param {string} key
     *
     * @returns {string} cookieValue
     */
    static getItem(key) {
        if (!key) {
            return false;
        }

        const name = key + '=';
        const allCookies = document.cookie.split(';');

        for (let i = 0; i < allCookies.length; i++) {
            let singleCookie = allCookies[i];

            while (singleCookie.charAt(0) === ' ') {
                singleCookie = singleCookie.substring(1);
            }

            if (singleCookie.indexOf(name) === 0) {
                return singleCookie.substring(name.length, singleCookie.length);
            }
        }

        return false;
    }

    /**
     * removes a cookie
     *
     * @param key
     */
    static removeItem(key) {
        document.cookie = `${key}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
}
