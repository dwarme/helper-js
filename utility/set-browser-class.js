import DeviceDetection from "./device-detection";
import Iterator from "./iterator";

/**
 * @author Daouda Warme
 */
export default class SetBrowserClass {

    init() {
        this._browserDetection();
    }

    /**
     * Detects the browser type and adds specific css classes to the html element.
     */
    _browserDetection() {
        const detections = DeviceDetection.getList();

        Iterator.iterate(detections, function(value, key) {
            if (value) {
                return document.documentElement.classList.add(key);
            }
        });
    }
}