

class DeleteComments {
    constructor() {
        // set href to proper this.link
        this.select_comments_button_xq = '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[1]/section/main/div/article/div/div[2]/div/div/div[1]/div/div/div/div/div[2]/div[2]/span';
        this.select_comments_feed_xq = '/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[1]/section/main/div/article/div/div[2]/div/div/div[1]/div/div/div/div/div[2]/div/div';
        this.link = 'https://www.instagram.com/your_activity/interactions/comments';

        if (window.location.href !== this.link && window.location.href.includes('instagram.com')) {
            window.location.href = this.link;
        } else {
            // Initialize if already on the correct page
            this.initialize();
        }
    }

    async initialize() {
        // better way than DOMContentLoaded, it may not be triggered in React webapp.

        this.showTooltip('Initialization started.');
        await new Promise(resolve => setTimeout(resolve, 5000));

        this.showTooltip('Initialization complete.');
        this.initialized = true;
        this.clickSelect();
        this.scrollToFetch();
    }

    getElementByXpath(XPATH) {
        return document.evaluate(XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    async clickSelect() {
        if (!this.initialized) {
            await this.initialize();
        }

        const button = this.getElementByXpath(this.select_comments_button_xq);
        if (button) {
            button.click();
            this.showTooltip('Element "select_comments_button_xq" clicked!');
        } else {
            this.showTooltip('Element "select_comments_button_xq" not found! Error 000L2030', 20000);
            console.error('Element "select_comments_button_xq" not found! Error 000L2030');
        }
    }

    async scrollToFetch() {
        if (!this.initialized) {
            await this.initialize();
        }

        const feed = document.querySelector('[data-bloks-name="bk.components.Collection"]>[data-bloks-name="bk.components.Flexbox"]');
        if (feed) {
            let counter = 5;
            const interval = setInterval(() => {
                if (counter > 0) {
                    const feed_items = document.querySelectorAll('[data-bloks-name="bk.components.Collection"]>[data-bloks-name="bk.components.Flexbox"]');
                    if (feed_items.length) {
                        const feed_last = feed_items[feed_items.length - 1];
                        feed_last.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        counter--;
                        this.showTooltip(`scrolling down (${counter} left)...`, 2500);
                    }
                } else {
                    clearInterval(interval);
                    this.showTooltip('Scrolled 5 times.', 2500);
                }
            }, 2500);
        }
    }

    showTooltip(message, delay = 4000) {
        let previous = document?.querySelectorAll(".tl-dextra-parent");
        // delay for prev. 1s, then show new. If there's no prev, show immidiately.
        if (previous.length) {
            setTimeout(() => {
                document.querySelectorAll(".tl-dextra-parent").forEach(e => e.remove());
                addNew();
            }, 1000)
        } else addNew();

        function addNew() {
            if (message) {
                document.querySelector('html').insertAdjacentHTML('beforeend', `
                <div class="tl-dextra-parent">
                    <div class="tl-dextra">${message}</div>
                    <style>
                    .tl-dextra {
                        font-family: 'Noto Sans', sans-serif;
                        position: fixed;
                        bottom: 100px;
                        left: 50%;
                        background: white;
                        color: black;
                        border: 1px solid black;
                        padding: 20px;
                        transform: translateX(-50%);
                        transition: opacity 700ms ease;
                    }
                    </style>
                </div>`);
            }
        }
        
        setTimeout(() => document.querySelectorAll(".tl-dextra-parent").forEach(e => e.remove()), (delay + 800));
    }
}

let DelComInstance = new DeleteComments();
