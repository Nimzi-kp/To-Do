const zones = ['new', 'working', 'completed'];
const form = document.getElementById('new-task-form');
const input = document.getElementById('new-task-input');
const dropAreas = document.querySelectorAll('.task-zone');
const deletedBox = document.getElementById('deleted');

function updateUI() {
zones.forEach(zone => {
    const area = document.getElementById(zone);
    area.innerHTML = '';
    const items = JSON.parse(localStorage.getItem(zone)) || [];
    items.forEach(task => {
    area.appendChild(makeTask(task));
    });
});


deletedBox.innerHTML = '';
const deletedItems = JSON.parse(localStorage.getItem('deleted')) || [];
deletedItems.forEach(obj => {
    addToDeleted(obj.text, obj.origin, false);
});

updateCounters();
}

function updateCounters() {
document.getElementById('new-count').textContent = document.getElementById('new').children.length;
document.getElementById('working-count').textContent = document.getElementById('working').children.length;
document.getElementById('completed-count').textContent = document.getElementById('completed').children.length;
document.getElementById('deleted-count').textContent = deletedBox.children.length;
}

function saveAll() {
zones.forEach(zone => {
    const zoneEl = document.getElementById(zone);
    const list = [...zoneEl.children].map(item => item.querySelector('span')?.textContent.trim());
    localStorage.setItem(zone, JSON.stringify(list));
});

const deletedList = [...deletedBox.children].map(item => {
    const span = item.querySelector('span');
    const origin = item.querySelector('span + span')?.textContent.replace('from ', '');
    return { text: span.textContent.trim(), origin };
});
localStorage.setItem('deleted', JSON.stringify(deletedList));
}

function makeTask(text) {
const card = document.createElement('div');
card.className = 'task-item draggable flex items-center justify-between bg-white p-2 rounded border shadow-sm text-sm gap-2 cursor-move';
card.draggable = true;

const label = document.createElement('span');
label.className = 'flex-1 truncate';
label.textContent = text;

const edit = document.createElement('button');
edit.textContent = '📝';
edit.className = 'hover:text-blue-600';
edit.onclick = () => {
    const input = document.createElement('input');
    input.value = label.textContent;
    input.className = 'flex-1 border px-2 py-1 text-sm rounded';
    card.replaceChild(input, label);
    edit.style.display = 'none';

    const save = document.createElement('button');
    save.textContent = '🗒️';
    save.className = 'text-green-600 hover:text-green-700';
    save.onclick = () => {
    label.textContent = input.value.trim();
    card.replaceChild(label, input);
    card.removeChild(save);
    edit.style.display = '';
    saveAll();
    };
    card.insertBefore(save, del);
};

const del = document.createElement('button');
del.textContent = '❌';
del.className = 'hover:text-red-600';
del.onclick = () => {
    const stage = zones.find(z => document.getElementById(z).contains(card)) || 'Unknown';
    addToDeleted(label.textContent, stage);
    card.remove();
    saveAll();
    updateCounters();
};

card.append(label, edit, del);
enableDragging(card);
return card;
}

form.onsubmit = e => {
e.preventDefault();
const val = input.value.trim();
if (!val) return;
const task = makeTask(val);
document.getElementById('new').appendChild(task);
input.value = '';
saveAll();
updateCounters();
};

function enableDragging(el) {
el.addEventListener('dragstart', () => el.classList.add('drag-active'));
el.addEventListener('dragend', () => {
    el.classList.remove('drag-active');
    saveAll();
    updateCounters();
});
}

dropAreas.forEach(area => {
area.addEventListener('dragover', e => {
    e.preventDefault();
    const active = document.querySelector('.drag-active');
    const after = getInsertPosition(area, e.clientY);
    if (!after) {
    area.appendChild(active);
    } else {
    area.insertBefore(active, after);
    }
});
});

function getInsertPosition(container, y) {
const items = [...container.querySelectorAll('.draggable:not(.drag-active)')];
return items.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    return offset < 0 && offset > closest.offset ? { offset, el: child } : closest;
}, { offset: Number.NEGATIVE_INFINITY }).el;
}

function addToDeleted(text, origin, save = true) {
const item = document.createElement('div');
item.className = 'bg-white p-2 rounded border flex items-center justify-between text-sm';
item.innerHTML = `
    <span class="truncate">${text}</span>
    <span class="text-xs text-gray-500 italic">from ${origin}</span>
`;
deletedBox.appendChild(item);
if (save) saveAll();
}

updateUI();
