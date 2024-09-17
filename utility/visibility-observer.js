/**
 * @author Daouda Warme
 */
export default class VisibilityObserver {
    static percentageSeen(element) {
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const elementPositionY = element.getBoundingClientRect().top + scrollY;
        const elementHeight = element.offsetHeight;

        if (elementPositionY > scrollY + viewportHeight) {
            // If we haven't reached the element yet
            return 0;
        } else if (elementPositionY + elementHeight < scrollY) {
            // If we've completely scrolled past the element
            return 100;
        }

        // When the element is in the viewport
        const distance = scrollY + viewportHeight - elementPositionY;
        let percentage = distance / ((viewportHeight + elementHeight) / 100);
        return Math.round(percentage);
    }
}