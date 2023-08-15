import Api from './api.js';

export async function loadData() {
 app.store.menu = await Api.fetchMenu();
}
