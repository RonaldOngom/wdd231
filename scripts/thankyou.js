const params = new URLSearchParams(window.location.search);
const displayDiv = document.getElementById('results-display');

if (displayDiv) {
  if (params.toString() === '') {
    displayDiv.textContent = 'No form data detected.';
  } else {
    const list = document.createElement('ul');
    list.className = 'results-list';

    for (const [key, value] of params.entries()) {
      const item = document.createElement('li');
      item.className = 'results-list-item';
      const label = document.createElement('strong');
      label.textContent = `${key.charAt(0).toUpperCase()}${key.slice(1)}: `;
      item.append(label, value);
      list.append(item);
    }

    displayDiv.replaceChildren(list);
  }
}
