import {
  checkAuth,
  logout,
  deleteParticipant,
  getWorkshops
} from '../fetch-utils.js';

checkAuth();

const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');
const loadingEl = document.querySelector('.loading-spinner');

logoutButton.addEventListener('click', () => {
  logout();
  toggleLoadingSpinner();
});

async function fetchAndDisplayWorkshops () {
  toggleLoadingSpinner();
  const workshops = await getWorkshops();
  workshopsEl.textContent = '';

  for (let workshop of workshops) {
    const workshopEl = document.createElement('div');
    const nameEl = document.createElement('h4');
    const participantsEl = document.createElement('div');

    participantsEl.classList.add('participants');
    workshopEl.classList.add('workshop');
    nameEl.classList.add('names');

    nameEl.textContent = workshop.topic;

    for (let participant of workshop.participants) {
      const participantEl = document.createElement('div');

      participantEl.classList.add('participant');
      participantEl.textContent = participant.name;

      participantEl.addEventListener('click', async () => {
        await deleteParticipant(participant.id);

        const updatedWorkshops = await getWorkshops();

        fetchAndDisplayWorkshops(updatedWorkshops);

      });
      participantsEl.append(participantEl);
    }
    workshopEl.append(nameEl, participantsEl);
    workshopsEl.append(workshopEl);
  }
  toggleLoadingSpinner();
}

window.addEventListener('load', async () => {

  await fetchAndDisplayWorkshops();
});

function toggleLoadingSpinner () {
  loadingEl.classList.toggle('invisible');
}
