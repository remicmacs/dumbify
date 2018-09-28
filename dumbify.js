(function () {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;
    const tossCoin = () => Math.random() >= 0.5;

    const randCase = c => tossCoin() ? c.toUpperCase() : c.toLowerCase();

    const dumbify = (s) => s.split('').map(randCase).join('');

    // @TODO: Finish this!!
    const selectTextNode = () => {
        const body = document.querySelector('body');

        const findChildTextNodes = (node) => {
            return node;
        }
    
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "dumbify") {
            let ary = document.querySelectorAll('p');
            for (p of ary) {
                p.innerHTML = dumbify(p.innerHTML);
            }
        } else {
            console.err('This is not the message you are looking for');
        }
    });
})();