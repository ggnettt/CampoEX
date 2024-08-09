// Variáveis globais
let nav = 0; // Navegação inicialmente definida como zero (mês atual)
let clicked = null; // Armazena a data do dia clicado
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // Array de eventos, lê do localStorage se disponível

// Elementos do modal
const newEvent = document.getElementById('newEventModal'); // Modal para adicionar novo evento
const deleteEventModal = document.getElementById('deleteEventModal'); // Modal para deletar evento
const backDrop = document.getElementById('modalBackDrop'); // Fundo do modal
const eventTitleInput = document.getElementById('eventTitleInput'); // Campo de entrada para título do evento

const calendar = document.getElementById('calendar'); // Div que representa o calendário
const weekdays = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado']; // Array com os dias da semana em português

// Função para abrir o modal de adição ou edição de eventos
function openModal(date) {
  clicked = date; // Define a data clicada

  // Verifica se existe um evento para a data clicada
  const eventDay = events.find((event) => event.date === clicked);

  if (eventDay) {
    // Se houver evento, exibe o título do evento no modal de exclusão
    document.getElementById('eventText').innerText = eventDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    // Se não houver evento, exibe o modal para adicionar novo evento
    newEvent.style.display = 'block';
  }

  backDrop.style.display = 'block'; // Exibe o fundo do modal
}

// Função para carregar o calendário
function load() {
  const date = new Date(); // Data atual

  // Ajusta o mês baseado na navegação
  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate(); // Dia do mês atual
  const month = date.getMonth(); // Mês atual
  const year = date.getFullYear(); // Ano atual

  // Calcula o número de dias no mês e o primeiro dia da semana
  const daysMonth = new Date(year, month + 1, 0).getDate(); // Número de dias no mês
  const firstDayMonth = new Date(year, month, 1); // Primeiro dia do mês

  // Obtém o dia da semana do primeiro dia do mês e ajusta para exibir o calendário corretamente
  const dateString = firstDayMonth.toLocaleDateString('pt-br', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddinDays = weekdays.indexOf(dateString.split(', ')[0]); // Dia da semana do primeiro dia do mês

  // Exibe o título do mês e ano no calendário
  document.getElementById('monthDisplay').innerText = `${date.toLocaleDateString('pt-br', { month: 'long' })}, ${year}`;

  calendar.innerHTML = ''; // Limpa o conteúdo atual do calendário

  // Cria as divs para cada dia do mês
  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayS = document.createElement('div'); // Cria uma div para cada dia
    dayS.classList.add('day'); // Adiciona a classe 'day' para estilização

    // Constrói a string da data no formato 'mês/dia/ano'
    const dayString = `${month + 1}/${i - paddinDays}/${year}`;

    // Condicional para criar os dias do mês no calendário
    if (i > paddinDays) {
      dayS.innerText = i - paddinDays; // Exibe o número do dia

      // Verifica se há um evento para este dia
      const eventDay = events.find((event) => event.date === dayString);

      if (i - paddinDays === day && nav === 0) {
        dayS.id = 'currentDay'; // Marca o dia atual com uma ID específica para estilização
      }

      if (eventDay) {
        // Se houver evento, cria uma div para exibir o título do evento
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventDay.title;
        dayS.appendChild(eventDiv); // Adiciona a div do evento ao dia correspondente
      }

      dayS.addEventListener('click', () => openModal(dayString)); // Adiciona um listener para abrir o modal ao clicar no dia
    } else {
      dayS.classList.add('padding'); // Adiciona classe para estilização de dias fora do mês
    }

    calendar.appendChild(dayS); // Adiciona o dia ao calendário
  }
}

// Função para fechar o modal
function closeModal() {
  eventTitleInput.classList.remove('error'); // Remove classe de erro do campo de título
  newEvent.style.display = 'none'; // Esconde o modal de novo evento
  backDrop.style.display = 'none'; // Esconde o fundo do modal
  deleteEventModal.style.display = 'none'; // Esconde o modal de exclusão

  eventTitleInput.value = ''; // Limpa o valor do campo de título
  clicked = null; // Reseta a variável de data clicada
  load(); // Recarrega o calendário
}

// Função para salvar um evento
function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error'); // Remove classe de erro do campo de título

    // Adiciona o evento ao array de eventos
    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events)); // Salva os eventos no localStorage
    closeModal(); // Fecha o modal após salvar o evento
  } else {
    eventTitleInput.classList.add('error'); // Adiciona classe de erro ao campo de título se estiver vazio
  }
}

// Função para deletar um evento
function deleteEvent() {
  events = events.filter((event) => event.date !== clicked); // Filtra o evento para removê-lo do array
  localStorage.setItem('events', JSON.stringify(events)); // Atualiza o localStorage sem o evento deletado
  closeModal(); // Fecha o modal após deletar o evento
}

// Função para configurar os listeners dos botões
function buttons() {
  // Listener para o botão de voltar no calendário
  document.getElementById('backButton').addEventListener('click', () => {
    nav--; // Decrementa a navegação
    load(); // Recarrega o calendário
  });

  // Listener para o botão de avançar no calendário
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++; // Incrementa a navegação
    load(); // Recarrega o calendário
  });

  // Listener para o botão de salvar evento
  document.getElementById('saveButton').addEventListener('click', () => saveEvent());

  // Listener para o botão de cancelar ação no modal
  document.getElementById('cancelButton').addEventListener('click', () => closeModal());

  // Listener para o botão de deletar evento no modal
  document.getElementById('deleteButton').addEventListener('click', () => deleteEvent());

  // Listener para o botão de fechar o modal
  document.getElementById('closeButton').addEventListener('click', () => closeModal());
}

// Inicializa os listeners dos botões e carrega o calendário ao carregar a página
buttons();
load();