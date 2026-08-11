function initDirectory() {
  const gridView = document.getElementById('grid-view');
  const listView = document.getElementById('list-view');
  const container = document.getElementById('directory-container');
  const modal = document.getElementById('directory-modal');
  const modalBody = document.getElementById('modal-body');
  const closeBtn = document.getElementById('close-modal-btn');

  if (gridView && listView && container) {
    gridView.addEventListener('click', () => {
      container.classList.remove('list-view');
      gridView.classList.add('active');
      listView.classList.remove('active');
    });

    listView.addEventListener('click', () => {
      container.classList.add('list-view');
      listView.classList.add('active');
      gridView.classList.remove('active');
    });
  }

  async function loadDirectory() {
    let directory;
    try {
      const response = await fetch('../data/directory.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      directory = await response.json();
    } catch (error) {
      console.error('Failed to load directory data:', error);
      directory = [];
    }

    renderDirectory(directory);
  }

  function renderDirectory(directoryList) {
    if (!container) return;
    container.innerHTML = '';

    directoryList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <h3>${item.name}</h3>
          <p><strong>Department:</strong> ${item.department}</p>
          <p><strong>Email:</strong> ${item.email}</p>
          <p><strong>Phone:</strong> ${item.phone}</p>
          <p>${item.description}</p>
        </div>
        <button class="btn details-btn" data-id="${item.id}">View Details</button>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll('.details-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const itemId = e.target.getAttribute('data-id');
        const selectedItem = directoryList.find(d => d.id == itemId);
        openModal(selectedItem);
      });
    });
  }

  function openModal(item) {
    if (!item || !modal || !modalBody) return;
    modalBody.innerHTML = `
      <h2>${item.name}</h2>
      <p><strong>Department:</strong> ${item.department}</p>
      <p><strong>Email:</strong> ${item.email}</p>
      <p><strong>Phone:</strong> ${item.phone}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p>${item.description}</p>
    `;
    modal.showModal();

    if (closeBtn) {
      closeBtn.onclick = () => modal.close();
    }
  }

  loadDirectory();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDirectory);
} else {
  initDirectory();
}
