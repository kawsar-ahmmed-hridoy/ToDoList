document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('box');
    const input = form.querySelector('input[type="text"]');
    const list = document.getElementById('list');
    const countDiv = document.getElementById('count');

    function updateCount() {
        const total = list.children.length;
        const completed = list.querySelectorAll('.done').length;
        countDiv.textContent = `Total: ${total} | Completed: ${completed}`;
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        li.addEventListener('click', (e) => {
            if (e.target === li) {
                li.classList.toggle('done');
                updateCount();
            }
        });
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="fas fa-edit"></i>';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (li.querySelector('input')) return; 

            const currentText = li.firstChild.textContent;
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = currentText;
            li.firstChild.textContent = '';
            li.insertBefore(inputEdit, editBtn);

            inputEdit.focus();

            inputEdit.addEventListener('keydown', (ev) => {
                if (ev.key === 'Enter') {
                    li.firstChild.textContent = inputEdit.value;
                    inputEdit.remove();
                }
                if (ev.key === 'Escape') {
                    li.firstChild.textContent = currentText;
                    inputEdit.remove();
                }
            });

            inputEdit.addEventListener('blur', () => {
                li.firstChild.textContent = inputEdit.value || currentText;
                inputEdit.remove();
            });
        });
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            updateCount();
        });
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        return li;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value.trim();
        if (task) {
            const li = createTaskElement(task);
            list.appendChild(li);
            input.value = '';
            updateCount();
        }
    });

    updateCount();
});