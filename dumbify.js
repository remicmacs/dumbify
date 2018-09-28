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

    // Core library
    const tossCoin = () => Math.random() >= 0.5;
    const randCase = c => tossCoin() ? c.toUpperCase() : c.toLowerCase();
    const dumbify = (s) => s.split('').map(randCase).join('');
    const nodeFilter = (node) => {
        if (!/^\s*$/.test(node.data)) {
            return NodeFilter.FILTER_ACCEPT;
        } else if (node.nodeType !== 3) return NodeFilter.FILTER_REJECT;
    };

    const textNodesUnder = (el) => {
        let node;
        let ary = [];
        let walker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_TEXT, {
                acceptNode: nodeFilter
            },
            false
        );
        while (node = walker.nextNode()) ary.push(node);
        return ary;
    };

    const selectTextNode = () => {
        const body = document.querySelector('body');
        const nodes = textNodesUnder(body);
        return nodes;
    }

    const selectImg = () => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs;
    };

    const displayThing = (elt) => {
        console.log(elt.src);
    };

    const chooseBob = () => {
        return tossCoin()
        ? browser.extension.getURL("icons/mockingspongebob.jpg")
        : browser.extension.getURL("icons/mockingspongebob_background.jpg");
    };

    browser.runtime.onMessage.addListener((message) => {
        selectTextNode();
        if (message.command === "dumbify") {
            const ary = selectTextNode();
            const imgs = selectImg();
            //console.dir(imgs);
            //imgs.map(displayThing);
            for (elt of ary) {
                elt.data = dumbify(elt.data);
            }
            
            for (img of imgs) {
                img.src = chooseBob();
            }
            // Other messages handling ?
        } else {
            console.err('This is not the message you are looking for');
        }
    });
})();