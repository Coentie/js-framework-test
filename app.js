import Store from './services/store.js'
import Router from './services/router.js'
import { loadData } from './services/menu.js'

import { MenuPage } from './components/MenuPage.js';
import { DetailsPage } from './components/DetailsPage.js';
import { OrderPage } from './components/OrderPage.js';

window.app = {};
app.store = Store;
app.router = Router;

window.addEventListener('DOMContentLoaded', async () => {
    app.router.init();
    await loadData();
});



