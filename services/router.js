
const Router = {
    init: () => {
        document.querySelectorAll('a.navlink').forEach((a =>
                a.addEventListener('click', e => {
                    e.preventDefault();
                    Router.go(e.target.getAttribute('href'));
                })
        ));

        window.addEventListener('popstate', event => {
            Router.go(event.state.route, false);
        })

        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        if(addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElement = null;

        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
                pageElement.textContent = "Your order";
                break;
            default:
                if(route.startsWith('/product-')) {
                    pageElement = document.createElement("details-age");
                    pageElement.textContent = "Details";
                    const paramId = route.substring(route.lastIndexOf('-') + 1)
                    pageElement.dataset.id = paramId;
                    break;
                }
        }

        const cache = document.querySelector('main');
        cache.innerHTML = '';
        cache.appendChild(pageElement)
        window.scrollY = 0;
        window.scrollX = 0;
    }
};
export default Router;
