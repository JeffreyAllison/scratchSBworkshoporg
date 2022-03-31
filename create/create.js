import {
  createParticipant,
  getWorkshops,
  checkAuth,
  logout,
} from '../fetch-utils.js';

const form = document.querySelector('.participant-form');
const logoutButton = document.getElementById('logout');

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
});