let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let filtroAtual = 'todas';

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');

// Carregar tarefas ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    atualizarLista();
    atualizarContador();
});

// Adicionar tarefa
function adicionarTarefa() {
    const texto = taskInput.value.trim();
    if (texto) {
        const tarefa = {
            id: Date.now(),
            texto: texto,
            concluida: false
        };
        tarefas.push(tarefa);
        salvarTarefas();
        atualizarLista();
        atualizarContador();
        taskInput.value = '';
    }
}

// Alternar status da tarefa
function alternarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        atualizarLista();
        atualizarContador();
    }
}

// Deletar tarefa
function deletarTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    salvarTarefas();
    atualizarLista();
    atualizarContador();
}

// Filtrar tarefas
function filtrarTarefas(filtro) {
    filtroAtual = filtro;
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('ativo');
    });
    document.querySelector(`.filtro-btn[onclick="filtrarTarefas('${filtro}')"]`).classList.add('ativo');
    atualizarLista();
}

// Limpar tarefas concluídas
function limparConcluidas() {
    tarefas = tarefas.filter(t => !t.concluida);
    salvarTarefas();
    atualizarLista();
    atualizarContador();
}

// Atualizar lista de tarefas
function atualizarLista() {
    taskList.innerHTML = '';
    
    let tarefasFiltradas = tarefas;
    if (filtroAtual === 'ativas') {
        tarefasFiltradas = tarefas.filter(t => !t.concluida);
    } else if (filtroAtual === 'concluidas') {
        tarefasFiltradas = tarefas.filter(t => t.concluida);
    }
    
    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `task-item ${tarefa.concluida ? 'concluida' : ''}`;
        
        li.innerHTML = `
            <div class="checkbox ${tarefa.concluida ? 'checked' : ''}" onclick="alternarTarefa(${tarefa.id})">
                ${tarefa.concluida ? '✓' : ''}
            </div>
            <span class="task-text">${tarefa.texto}</span>
            <button class="delete-btn" onclick="deletarTarefa(${tarefa.id})">×</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Atualizar contador de tarefas
function atualizarContador() {
    const tarefasAtivas = tarefas.filter(t => !t.concluida).length;
    taskCount.textContent = `${tarefasAtivas} tarefa${tarefasAtivas !== 1 ? 's' : ''} restante${tarefasAtivas !== 1 ? 's' : ''}`;
}

// Salvar tarefas no localStorage
function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

// Adicionar tarefa com Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
}); 