export default class HTMLUpdateUtility {
    /**
     * Used to swap an HTML node with a new node.
     * The new node is inserted as a previous sibling to the old node, the old node is hidden, and then the old node is removed.
     *
     * The function currently uses a double buffer approach, but this should be replaced by a view transition once it is more widely supported https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API
     */
    static viewTransition(oldNode, newContent, preProcessCallbacks = [], postProcessCallbacks = []) {
        preProcessCallbacks?.forEach((callback) => callback(newContent));

        const newNodeWrapper = document.createElement('div');
        HTMLUpdateUtility.setInnerHTML(newNodeWrapper, newContent.outerHTML);
        const newNode = newNodeWrapper.firstChild;

        // dedupe IDs
        const uniqueKey = Date.now();
        oldNode.querySelectorAll('[id], [form]').forEach((element) => {
            element.id && (element.id = `${element.id}-${uniqueKey}`);
            element.form && element.setAttribute('form', `${element.form.getAttribute('id')}-${uniqueKey}`);
        });

        oldNode.parentNode.insertBefore(newNode, oldNode);
        oldNode.style.display = 'none';

        postProcessCallbacks?.forEach((callback) => callback(newNode));

        setTimeout(() => oldNode.remove(), 500);
    }

    // Sets inner HTML and reinjects the script tags to allow execution. By default, scripts are disabled when using element.innerHTML.
    static setInnerHTML(element, html) {
        element.innerHTML = html;
        element.querySelectorAll('script').forEach((oldScriptTag) => {
            const newScriptTag = document.createElement('script');
            Array.from(oldScriptTag.attributes).forEach((attribute) => {
                newScriptTag.setAttribute(attribute.name, attribute.value);
            });
            newScriptTag.appendChild(document.createTextNode(oldScriptTag.innerHTML));
            oldScriptTag.parentNode.replaceChild(newScriptTag, oldScriptTag);
        });
    }
}