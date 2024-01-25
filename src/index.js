const popupBox = document.querySelector('.popup_box');
const cancelButton = document.querySelector('.cancel_button');
const installButton = document.querySelector('.install_button');
const popupOnline = document.querySelector('.online');
const popupOffline = document.querySelector('.offline');
const refreshButton = document.querySelector('.refresh');
const scrollEvent = document.querySelector('.container');
const bodyScroll = document.querySelector('.body_scroll');
const wrapper = document.querySelector('.wrapper');
const buttonInstall = document.querySelector('.install_text');
const loadingInstall = document.querySelector('.loading_install');


const executeCodes = () => {
  popupBox.classList.add("show");
}

window.addEventListener('load', () => {
  setTimeout(executeCodes, 2000);
});

cancelButton.addEventListener('click', () => {
  popupBox.classList.remove("show");
});


fetch('https://65addbab1dfbae409a737b66.mockapi.io/api/v1/products')
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const markup = `
              <div class="card_box">
                <figure><img src="${product.image}" alt="Shoes" /></figure>
                <div class="card_body">
                  <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <div class="card_actions">
                      <button>$${product.price} USD</button>
                    </div>
                </div>
              </div>
            `;

      document.querySelector('#product__list').insertAdjacentHTML('beforeend', markup);
    })
  })
  .catch(err => console.log(err));


loadingInstall.classList.add("hidden")
buttonInstall.classList.remove("hidden")


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();

  deferredPrompt = e;

  buttonInstall.removeAttribute('hidden');
});

buttonInstall.addEventListener('click', async () => {

  buttonInstall.classList.add('hidden');
  loadingInstall.classList.remove('hidden');

  if (deferredPrompt) {
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    deferredPrompt = null;

    if (outcome !== 'accepted') {
      buttonInstall.classList.remove('hidden');
      loadingInstall.classList.add('hidden');
    }
  }
});


window.ononline = (event) => {
  popupOnline.classList.add("show");
  popupOffline.classList.remove("show");
  scrollEvent.classList.add("disable");
  wrapper.classList.add("disable");
  bodyScroll.classList.add("disable");
};

window.addEventListener("offline", (event) => {
  popupOnline.classList.remove("show");
  popupOffline.classList.add("show");
  scrollEvent.classList.remove("disable");
  wrapper.classList.remove("disable");
  bodyScroll.classList.remove("disable");
});

refreshButton.addEventListener("click", async () => {
  scrollEvent.classList.remove("disable");
  wrapper.classList.remove("disable");
  bodyScroll.classList.remove("disable");
  await window.location.reload();
});
