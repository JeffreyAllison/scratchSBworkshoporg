import {
  checkAuth,
  logout,
  deleteParticipant,
  getWorkshops
} from '../fetch-utils.js';

checkAuth();
const workshopsEl = document.querySelector('.workshops-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  logout();
});
