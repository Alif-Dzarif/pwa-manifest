const popupBox = document.querySelector('.popup_box');
const cancelButton = document.querySelector('.cancel_button');
const installButton = document.querySelector('.install_button');


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



let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});


installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }

  // console.log('clicked');
});

