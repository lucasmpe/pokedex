const TOTAL_NUMERIC_ITEMS = 3;
const FIRST_PAGE = 1;
const LAST_PAGE = 113;

export default function updatePage(callbackSelectPage) {
  document.querySelector('.pagination').addEventListener('click', (e) => {
    const $pokemonList = document.querySelector('.list');
    const item = e.target.textContent;
    if (item === $pokemonList.dataset.pageNumber) return;

    if (!isNaN(item)) {
      $pokemonList.dataset.pageNumber = item;

    } else {
      if (e.target.classList.contains('previous')) { $pokemonList.dataset.pageNumber--; }
      if (e.target.classList.contains('next')) { $pokemonList.dataset.pageNumber++; }
      if (e.target.classList.contains('start')) { $pokemonList.dataset.pageNumber = FIRST_PAGE; }
      if (e.target.classList.contains('end')) { $pokemonList.dataset.pageNumber = LAST_PAGE; }
    }

    callbackSelectPage();
    updatePaginator();
  });
}

function isAdjacent(itemsPage, newPage) {
  return itemsPage.every((item) => (newPage - item) <= TOTAL_NUMERIC_ITEMS && (newPage - item) >= -TOTAL_NUMERIC_ITEMS);
}

function updateDatasetNumericItems(numericItems, newPage) {
  const $pokemonList = document.querySelector('.list');
  if (isAdjacent(numericItems, newPage)) {
    if (numericItems.every((item) => (item < newPage))) {
      numericItems.shift();
      numericItems.push(newPage);
    } else {
      numericItems.pop();
      numericItems.unshift(newPage);
    }
  } else if (newPage === LAST_PAGE) {
    for (let i = 0; i < TOTAL_NUMERIC_ITEMS; i++) {
      numericItems[i] = LAST_PAGE - (2 - i);
    }
  } else if (newPage === FIRST_PAGE) {
    for (let i = 0; i < TOTAL_NUMERIC_ITEMS; i++) {
      numericItems[i] = FIRST_PAGE + i;
    }
  }
  $pokemonList.dataset.numericItems = numericItems.join(' ');
  return numericItems;
}

function setActiveNumericItem(item) {
  const $itemActive = document.querySelector('.pagination li.active');
  if ($itemActive) {
    $itemActive.classList.remove('active');
  }
  item.parentElement.classList.add('active');
}

function updateNumericItemsPage(newPage) {
  const $pokemonList = document.querySelector('.list');
  let numericItems = $pokemonList.dataset.numericItems.split(' ').map(item => Number(item));

  if (!numericItems.includes(newPage)) {
    numericItems = updateDatasetNumericItems(numericItems, newPage);
  }

  document.querySelectorAll('.pagination li.numeric a').forEach((item, index) => {
    item.textContent = numericItems[index];
    if (numericItems[index] === newPage) {
      setActiveNumericItem(item);
    }
  });
}

function updateShortcutItemsPage(newPage) {
  if (newPage !== FIRST_PAGE) {
    document.querySelector('.start').parentElement.classList.remove('disabled');
    document.querySelector('.previous').parentElement.classList.remove('disabled');
  } else {
    document.querySelector('.start').parentElement.classList.add('disabled');
    document.querySelector('.previous').parentElement.classList.add('disabled');
  }

  if (newPage === LAST_PAGE) {
    document.querySelector('.end').parentElement.classList.add('disabled');
    document.querySelector('.next').parentElement.classList.add('disabled');
  } else {
    document.querySelector('.end').parentElement.classList.remove('disabled');
    document.querySelector('.next').parentElement.classList.remove('disabled');
  }
}

function updatePaginator() {
  const $pokemonList = document.querySelector('.list');
  const newPage = Number($pokemonList.dataset.pageNumber);
  updateNumericItemsPage(newPage);
  updateShortcutItemsPage(newPage);
}
