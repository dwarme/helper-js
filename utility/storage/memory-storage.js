/**
 * MemoryStorage
 *
 * This class serves as a fallback storage mechanism when browser-based storage options such as
 * localStorage, sessionStorage, or cookies are not available or fail to function properly.
 *
 * MemoryStorage stores data in an in-memory JavaScript object (`_storage`). As it's an in-memory solution,
 * the data is lost once the page is refreshed or closed. It implements the same interface as browser storage
 * (setItem, getItem, removeItem, key, and clear) to ensure compatibility with other storage systems.
 *
 * Key Features:
 * - Fallback Storage**: Used when localStorage, sessionStorage, or cookie storage is not supported or fails.
 * - Unified Interface**: Implements the same API as browser storage for seamless fallback handling.
 * - Volatile Storage**: Data is stored only in memory and does not persist beyond the page session.
 *
 * @author Daouda Warme
 */
export default class MemoryStorage {
    constructor() {
        this._storage = {};
    }

    /**
     * @param {string} key
     * @param {*} value
     *
     * @returns {*}
     */
    setItem(key, value) {
        return this._storage[key] = value;
    }

    /**
     * @param {string} key
     *
     * @returns {*}
     */
    getItem(key) {
        return Object.prototype.hasOwnProperty.call(this._storage, key) ? this._storage[key] : null;
    }

    /**
     * @param {string} key
     *
     * @returns {boolean}
     */
    removeItem(key) {
        return delete this._storage[key];
    }

    /**
     * @param {number} index
     *
     * @returns {any}
     */
    key(index) {
        return Object.values(this._storage)[index] || null;
    }

    /**
     * @returns {{}}
     */
    clear() {
        return this._storage = {};
    }
}
