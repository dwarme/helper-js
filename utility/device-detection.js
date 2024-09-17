/**
 *
 * @class DeviceDetection
 *
 * This class provides a set of static utility functions for detecting various device and browser types
 * based on the user agent and other properties available in the browser's runtime environment.
 * It includes methods to detect touch devices, iOS devices, Windows browsers (including Internet Explorer and Edge),
 * and specific device types like iPhones and iPads.
 *
 * Each method checks the current user agent or other properties and returns a boolean indicating
 * whether the condition is met. Additionally, the class provides a method to retrieve an object
 * that contains a set of CSS class names based on the results of these detection methods.
 *
 * @author Daouda Warme
 */
export default class DeviceDetection {

    /**
     * Determines whether the current device supports touch events.
     * It checks for the 'ontouchstart' event in the document's root element.
     *
     * @returns {boolean} - True if the device is a touch device, otherwise false.
     */
    static isTouchDevice() {
        return ('ontouchstart' in document.documentElement);
    }

    /**
     * Determines if the current device is an iOS device (either iPhone or iPad).
     * It combines the results of `isIPhoneDevice` and `isIPadDevice` methods.
     *
     * @returns {boolean} - True if the device is an iPhone or iPad, otherwise false.
     */
    static isIOSDevice() {
        return (DeviceDetection.isIPhoneDevice() || DeviceDetection.isIPadDevice());
    }

    /**
     * Determines if the current browser is a native Windows browser.
     * This includes Internet Explorer and Microsoft Edge.
     *
     * @returns {boolean} - True if the browser is Internet Explorer or Edge, otherwise false.
     */
    static isNativeWindowsBrowser() {
        return (DeviceDetection.isIEBrowser() || DeviceDetection.isEdgeBrowser());
    }

    /**
     * Determines whether the current device is an iPhone by inspecting the user agent string.
     *
     * @returns {boolean} - True if the device is an iPhone, otherwise false.
     */
    static isIPhoneDevice() {
        const userAgent = navigator.userAgent;
        return !!userAgent.match(/iPhone/i);
    }

    /**
     * Determines whether the current device is an iPad by inspecting the user agent string.
     *
     * @returns {boolean} - True if the device is an iPad, otherwise false.
     */
    static isIPadDevice() {
        const userAgent = navigator.userAgent;
        return !!userAgent.match(/iPad/i);
    }

    /**
     * Determines whether the current browser is Internet Explorer (IE).
     * It checks the user agent string for 'msie' or 'Trident', which are unique to IE browsers.
     *
     * @returns {boolean} - True if the browser is Internet Explorer, otherwise false.
     */
    static isIEBrowser() {
        const userAgent = navigator.userAgent.toLowerCase();
        return userAgent.indexOf('msie') !== -1 || !!navigator.userAgent.match(/Trident.*rv:\d+\./);
    }

    /**
     * Determines whether the current browser is Microsoft Edge by inspecting the user agent string.
     *
     * @returns {boolean} - True if the browser is Edge, otherwise false.
     */
    static isEdgeBrowser() {
        const userAgent = navigator.userAgent;
        return !!userAgent.match(/Edge\/\d+/i);
    }

    /**
     * Provides a comprehensive list of device and browser detection results, each mapped to a CSS class name.
     * This method returns an object where the keys are CSS class names (based on device/browser type)
     * and the values are booleans representing the result of the respective detection methods.
     *
     * @returns {object} - An object where the keys are CSS class names (e.g., 'is-touch') and the values are boolean results.
     */
    static getList() {
        return {
            'is-touch': DeviceDetection.isTouchDevice(),
            'is-ios': DeviceDetection.isIOSDevice(),
            'is-native-windows': DeviceDetection.isNativeWindowsBrowser(),
            'is-iphone': DeviceDetection.isIPhoneDevice(),
            'is-ipad': DeviceDetection.isIPadDevice(),
            'is-ie': DeviceDetection.isIEBrowser(),
            'is-edge': DeviceDetection.isEdgeBrowser(),
        };
    }
}
