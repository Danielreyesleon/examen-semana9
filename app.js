/**
 * Gestor de Tareas – Examen Semana 9
 * Daniel Reyes León – UFIDE – 2026
 *
 * Funcionalidades:
 *  - Agregar, completar y eliminar tareas
 *  - Prioridad (alta / media / baja)
 *  - Persistencia con localStorage
 *  - Filtrado por estado (todas / pendientes / completadas)
 */

'use strict';

/* =====================================================================
   State
   ===================================================================== */

/** @type {{ id: string, title: string, description: string, priority: string, status: string, createdAt: string }[]} */
let tasks = loadTasks();

/** @type {'all'|'pendiente'|'completada'} */
let currentFilter = 'all';

/* =====================================================================
   DOM References
   ===================================================================== */

const form            = document.getElementById('task-form');
const titleInput      = document.getElementById('task-title');
const descriptionInput = document.getElementById('task-description');
const prioritySelect  = document.getElementById('task-priority');
const taskList        = document.getElementById('task-list');
const taskCount       = document.getElementById('task-count');
const emptyMessage    = document.getElementById('empty-message');
const filterButtons   = document.querySelectorAll('.btn-filter');

/* =====================================================================
   Event Listeners
   ===================================================================== */

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  const task = {
    id: crypto.randomUUID(),
    title,
    description: descriptionInput.value.trim(),
    priority: prioritySelect.value,
    status: 'pendiente',
    createdAt: new Date().toISOString(),
  };

  tasks.unshift(task);
  saveTasks();
  renderTasks();

  form.reset();
  titleInput.focus();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

/* =====================================================================
   Render
   ===================================================================== */

function renderTasks() {
  const filtered = tasks.filter((task) => {
    if (currentFilter === 'all') return true;
    return task.status === currentFilter;
  });

  taskList.innerHTML = '';

  taskCount.textContent = tasks.length;

  if (filtered.length === 0) {
    emptyMessage.hidden = false;
    return;
  }

  emptyMessage.hidden = true;

  filtered.forEach((task) => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

/**
 * Build a <li> element for a task.
 * @param {{ id: string, title: string, description: string, priority: string, status: string, createdAt: string }} task
 * @returns {HTMLLIElement}
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = `task-item ${task.status}`;
  li.dataset.id = task.id;

  const date = new Date(task.createdAt).toLocaleDateString('es-CR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });

  li.innerHTML = `
    <input
      type="checkbox"
      class="task-checkbox"
      aria-label="Marcar tarea como ${task.status === 'completada' ? 'pendiente' : 'completada'}"
      ${task.status === 'completada' ? 'checked' : ''}
    />
    <div class="task-content">
      <span class="task-title">${escapeHtml(task.title)}</span>
      ${task.description ? `<p class="task-description">${escapeHtml(task.description)}</p>` : ''}
      <div class="task-meta">
        <span class="priority-tag priority-${task.priority}">${task.priority}</span>
        <span class="status-tag status-${task.status}">${task.status}</span>
        <span class="task-date">${date}</span>
      </div>
    </div>
    <button class="btn btn-delete" aria-label="Eliminar tarea">🗑</button>
  `;

  li.querySelector('.task-checkbox').addEventListener('change', () => toggleTask(task.id));
  li.querySelector('.btn-delete').addEventListener('click', () => deleteTask(task.id));

  return li;
}

/* =====================================================================
   Actions
   ===================================================================== */

/**
 * Toggle the completion status of a task.
 * @param {string} id
 */
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.status = task.status === 'completada' ? 'pendiente' : 'completada';
  saveTasks();
  renderTasks();
}

/**
 * Remove a task by id.
 * @param {string} id
 */
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

/* =====================================================================
   Persistence
   ===================================================================== */

const STORAGE_KEY = 'gestor_tareas_semana9';

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn('No se pudo guardar en localStorage:', e);
  }
}

/**
 * Load tasks from localStorage, returning an empty array on failure.
 * @returns {Array}
 */
function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.warn('No se pudo cargar desde localStorage:', e);
    return [];
  }
}

/* =====================================================================
   Utility
   ===================================================================== */

/**
 * Escape HTML special characters to prevent XSS.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* =====================================================================
   Bootstrap
   ===================================================================== */

renderTasks();
