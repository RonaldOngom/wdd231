import { initNavigation } from './main.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadProjects();
});

const fallbackProjects = [
  {
    "id": 1,
    "title": "Cloud ERP System",
    "category": "Software",
    "description": "An enterprise resource planning solution designed for medium-scale businesses to track inventory, payroll, and sales.",
    "technologies": "Python, Django, PostgreSQL"
  },
  {
    "id": 2,
    "title": "Smart Farm IoT Hub",
    "category": "IoT & Hardware",
    "description": "Automated irrigation and soil moisture monitoring system utilizing wireless sensor nodes and a centralized web dashboard.",
    "technologies": "C++, Arduino, JavaScript"
  },
  {
    "id": 3,
    "title": "Community Health Portal",
    "category": "Web Development",
    "description": "A responsive web application enabling local clinics to manage patient appointments, digital records, and health notices.",
    "technologies": "HTML5, CSS3, JavaScript"
  },
  {
    "id": 4,
    "title": "SecureNet Firewall",
    "category": "Cybersecurity",
    "description": "A custom packet-filtering firewall appliance configured for small business networks to mitigate unauthorized intrusions.",
    "technologies": "Linux, Python, iptables"
  },
  {
    "id": 5,
    "title": "Lira Chamber Directory",
    "category": "Web Development",
    "description": "A comprehensive digital directory showcasing local businesses, chamber events, and membership spotlights.",
    "technologies": "HTML5, Tailwind, JavaScript"
  },
  {
    "id": 6,
    "title": "School LMS Platform",
    "category": "Software",
    "description": "A learning management system supporting online assignments, automated grading, and student progress tracking.",
    "technologies": "Node.js, Express, MongoDB"
  },
  {
    "id": 7,
    "title": "Automated Solar Tracker",
    "category": "IoT & Hardware",
    "description": "Dual-axis solar panel tracking system maximizing photovoltaic energy absorption throughout daylight hours.",
    "technologies": "Python, Raspberry Pi, Sensors"
  },
  {
    "id": 8,
    "title": "Retail POS Terminal",
    "category": "Software",
    "description": "Point-of-sale software featuring offline capability, barcode scanning support, and daily sales reconciliation reports.",
    "technologies": "Electron, JavaScript, SQLite"
  },
  {
    "id": 9,
    "title": "Logistics Fleet Tracker",
    "category": "Web Development",
    "description": "Real-time GPS tracking interface providing route optimization and fuel efficiency analytics for transport companies.",
    "technologies": "Leaflet.js, Node.js, WebSockets"
  },
  {
    "id": 10,
    "title": "Vulnerability Scanner",
    "category": "Cybersecurity",
    "description": "Automated auditing tool scanning web servers for outdated software packages and common security misconfigurations.",
    "technologies": "Python, BeautifulSoup, JSON"
  },
  {
    "id": 11,
    "title": "Agro-Produce Marketplace",
    "category": "Web Development",
    "description": "An e-commerce platform connecting regional farmers directly with bulk buyers and urban retail distributors.",
    "technologies": "HTML5, CSS Grid, JavaScript"
  },
  {
    "id": 12,
    "title": "Automated Attendance System",
    "category": "IoT & Hardware",
    "description": "Biometric fingerprint and RFID card reader system logging employee work hours securely to a central database.",
    "technologies": "C++, Arduino, MySQL"
  },
  {
    "id": 13,
    "title": "Legal Document Vault",
    "category": "Software",
    "description": "Encrypted document management solution ensuring secure storage and role-based access for law firms.",
    "technologies": "Python, Flask, AES Encryption"
  },
  {
    "id": 14,
    "title": "Municipal Water Monitor",
    "category": "IoT & Hardware",
    "description": "Remote flow and pressure monitoring sensors deployed across community water distribution networks.",
    "technologies": "IoT, MQTT, Python"
  },
  {
    "id": 15,
    "title": "Event Ticketing Engine",
    "category": "Web Development",
    "description": "Fast, responsive web platform for generating QR-coded event tickets, processing reservations, and validating entry.",
    "technologies": "JavaScript, HTML5, LocalStorage"
  }
];

async function loadProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  let projects;
  try {
      const response = await fetch('data/projects.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    projects = await response.json();
  } catch (error) {
    console.error('Failed to load project data, using fallback:', error);
    projects = fallbackProjects;
  }

  renderProjects(projects);
  setupFilters(projects);
}

function renderProjects(projectsList) {
  const container = document.getElementById('projects-container');
  container.innerHTML = '';

  // Ensure at least 15 items are displayed with 4 distinct properties
  projectsList.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p><strong>Category:</strong> ${project.category}</p>
        <p>${project.description}</p>
        <p><strong>Tech:</strong> ${project.technologies}</p>
      </div>
      <button class="btn details-btn" data-id="${project.id}">View Details</button>
    `;
    container.appendChild(card);
  });

  // Attach event listeners for modal
  document.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const projectId = e.target.getAttribute('data-id');
      const selectedProject = projectsList.find(p => p.id == projectId);
      openModal(selectedProject);
    });
  });
}

function setupFilters(projects) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');
      if (category === 'All') {
        renderProjects(projects);
      } else {
        const filtered = projects.filter(p => p.category === category);
        renderProjects(filtered);
      }
    });
  });
}

function openModal(project) {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  
  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <p><strong>Category:</strong> ${project.category}</p>
    <p><strong>Overview:</strong> ${project.description}</p>
    <p><strong>Stack:</strong> ${project.technologies}</p>
    <p><em>Project ID Reference: KW-${project.id}</em></p>
  `;
  
  modal.showModal();

  const closeBtn = document.getElementById('close-modal-btn');
  closeBtn.onclick = () => modal.close();
}
