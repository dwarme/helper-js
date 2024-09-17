/**
 * Iterator
 *
 * This class provides a static method `iterate` that allows iteration over various types of data structures,
 * such as arrays, objects, Maps, FormData, NodeLists, and HTMLCollections. It abstracts away the differences
 * between these structures, providing a consistent way to iterate over them by invoking a callback function
 * for each entry.
 *
 * The `iterate` method accepts a source (array, object, etc.) and a callback function, which is executed for
 * each item in the collection. This class throws an error if the provided source is not iterable.
 *
 * Key Features:
 * - Supports a variety of data structures like arrays, objects, Maps, NodeLists, FormData, and HTMLCollections.
 * - Provides a unified interface for iteration across different types.
 * - Uses a callback function to operate on each item in the iterable.
 *
 * Example Usage:
 * ```js
 * const data = { name: "Daouda", age: 24, profession: "Developer" };
 * Iterator.iterate(data, (value, key) => {
 *     console.log(`${key}: ${value}`);
 * });
 * // Output:
 * // name: Daouda
 * // age: 24
 * // profession: Developer
 * ```
 *
 * @author Daouda Warme
 * 
 */

export default class Iterator {

    /**
     * This callback is displayed as a global member.
     * @callback ObjectIterateCallback
     * @param {value} value
     * @param {key} key
     */

    /**
     * Iterates over an object
     *
     * @param {Array|Object} source
     * @param {ObjectIterateCallback} callback
     *
     * @returns {*}
     */
    static iterate(source, callback) {
        if (source instanceof Map) {
            return source.forEach(callback);
        }

        if (Array.isArray(source)) {
            return source.forEach(callback);
        }

        if (source instanceof FormData) {
            for(var entry of source.entries()) {
                callback(entry[1], entry[0]);
            }
            return;
        }

        if (source instanceof NodeList) {
            return source.forEach(callback);
        }

        if (source instanceof HTMLCollection) {
            return Array.from(source).forEach(callback);
        }

        if (source instanceof Object) {
            return Object.keys(source).forEach(key => {
                callback(source[key], key)
            });
        }

        throw new Error(`The element type ${typeof source} is not iterable!`);
    }
}
