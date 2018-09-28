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

    const selectTextNode = () => {
        const body = document.querySelector('body');
        // There must be a better way...
        const megaSelector = 'a,abbr,b,blockquote,button,caption,code,data,' +
            'dd,dt,dfn,figcaption,h1,h2,h3,h4,h5,h6,i,legend,li,kbd,mark,p,' +
            'q,s,samp,small,strong,td,th';
        const candidates = Array.from(body.querySelectorAll(megaSelector));
        return candidates;
    }

    browser.runtime.onMessage.addListener((message) => {
        selectTextNode();
        if (message.command === "dumbify") {
            let ary = selectTextNode();
            for (elt of ary) {
                elt.innerHTML = dumbify(elt.innerHTML);
            }
        // Other messages handling ?
        } else {
            console.err('This is not the message you are looking for');
        }
    });
})();