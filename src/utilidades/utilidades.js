export function generateEndPoint() {
    const pageNumber = Number(document.querySelector('.list').dataset.pageNumber);
    const limit = 10;
    const offset = (pageNumber - 1) * limit;
    return `?offset=${offset}&limit=${limit}`;
}

export function getActiveItem() {
    return document.querySelector('.list-group-item.active');
}

export function setActiveItem(item) {
    item.classList.add('active');
}

export function changeActiveItem(selectedItem) {
    getActiveItem().classList.remove('active');
    setActiveItem(selectedItem);
}
