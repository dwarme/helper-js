import CookieStorage from './cookie-storage.js';
import MemoryStorage from "./memory-storage.js";

/**
 * StorageSingleton
 *
 * This class provides a singleton instance for accessing the best available client-side storage option.
 * It dynamically selects from localStorage, sessionStorage, cookies, or in-memory storage based on the availability
 * and browser support for each storage mechanism. The class ensures a unified interface for all storage types, so
 * they can be used interchangeably without changing the way the storage API is called.
 *
 * Key Features:
 * - Automatic Storage Selection**: Chooses the best available storage (localStorage, sessionStorage, cookies, or memory).
 * - Compatibility Check**: Ensures that the selected storage type has a standard API (setItem, getItem, removeItem, etc.).
 * - Singleton Pattern**: Ensures that only one instance of storage is created and used across the application, preventing conflicts.
 *
 * @author Daouda Warme
 */
class StorageSingleton {

    constructor() {
        this._storage = null;
        this._chooseStorage();
        this._validateStorage();
    }

    /**
     * sets the best available storage
     *
     * @returns {*}
     * @private
     */
    _chooseStorage() {
        if (StorageSingleton._isSupported(window.localStorage)) {
            return this._storage = window.localStorage;
        }

        if (StorageSingleton._isSupported(window.sessionStorage)) {
            return this._storage = window.sessionStorage;
        }

        if (CookieStorage.isSupported()) {
            return this._storage = CookieStorage;
        }

        return this._storage = new MemoryStorage();
    }

    /**
     * returns if the passed storage is supported
     *
     * @param storage
     * @returns {boolean}
     * @private
     */
    static _isSupported(storage) {
        try {
            const testKey = '__storage_test';
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * ensures the same interface
     * for each storage
     *
     * @private
     */
    _validateStorage() {
        if (typeof this._storage.setItem !== 'function') {
            throw new Error('The storage must have a "setItem" function');
        }
        if (typeof this._storage.getItem !== 'function') {
            throw new Error('The storage must have a "getItem" function');
        }
        if (typeof this._storage.removeItem !== 'function') {
            throw new Error('The storage must have a "removeItem" function');
        }
        if (typeof this._storage.key !== 'function') {
            throw new Error('The storage must have a "key" function');
        }
        if (typeof this._storage.clear !== 'function') {
            throw new Error('The storage must have a "clear" function');
        }
    }

    /**
     * returns the currently used storage
     *
     * @returns {Storage|null}
     */
    getStorage() {
        return this._storage;
    }
}

/**
 * Create the Storage instance.
 * @type {Readonly<StorageSingleton>}
 */
export const StorageInstance = Object.freeze(new StorageSingleton());

export default StorageInstance.getStorage();
