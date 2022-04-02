import {
  createParticipant,
  getWorkshops,
  checkAuth,
  logout,
} from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');
const loadingEl = document.querySelector('.loading-spinner');

form.addEventListener('submit', async (e) => {
  e.preventDefault();


  const data = new FormData(form);

  const name = data.get('participant-name');
  const workshopId = data.get('workshop-id');

  await createParticipant({
    name: name,
    workshop_id: workshopId
  });

  form.reset();

  window.location.href = '../workshops';
  toggleLoadingSpinner();
});

window.addEventListener('load', async () => {
  toggleLoadingSpinner();

  const workshopSelectorEl = document.querySelector('select');

  const workshops = await getWorkshops();

  for (let workshop of workshops) {

    const optionTag = document.createElement('option');

    optionTag.textContent = workshop.topic;
    optionTag.value = workshop.id;

    workshopSelectorEl.append(optionTag);
  }
  toggleLoadingSpinner();

});
checkAuth();

logoutButton.addEventListener('click', () => {
  logout();

});

function toggleLoadingSpinner () {
  loadingEl.classList.toggle('invisible');
}