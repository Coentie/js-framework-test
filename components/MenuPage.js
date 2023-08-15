export class MenuPage extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);

        const loadCss = async () => {
            const res = await fetch('/components/MenuPage.css');
            styles.textContent = await res.text();
        }

        loadCss();

    }

    // When the component is attached to the dom
    connectedCallback() {
        const template = document.getElementById('menu-page-template');
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
        console.log('ho')

        window.addEventListener('appmenuchange', () => {
            this.render();
        });
    }

    render() {
        if(app.store.menu) {
            this.root.querySelector('#menu').innerHTML = "";

            for ( let category of app.store.menu) {
                const liCategory = document.createElement('li');
                liCategory.innerHTML = `
                <h3>${category.name}</h3>
                <ul class="category">
                </ul>`

                this.root.querySelector('#menu').appendChild(liCategory);

                category.products.forEach((product) => {
                    const item = document.createElement('product-item');
                    item.dataset.product = JSON.stringify(product);
                    liCategory.querySelector('ul').appendChild(item);
                })
            }
        } else {
            this.root.querySelectorAll('#menu').innerHTML = 'Loading...';
        }
    }
}

customElements.define('menu-page', MenuPage);
