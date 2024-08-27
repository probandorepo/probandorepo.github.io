document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const cartInfo = document.querySelector('.cart-product');
    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');
    const btnFinish = document.querySelector('.btn-finish');
    const whatsappNumber = "5492615722699"; // Reemplaza con el número de WhatsApp destino en formato internacional

    let allProducts = loadFromLocalStorage();

    function loadFromLocalStorage() {
        const storedProducts = localStorage.getItem('cart');
        return storedProducts ? JSON.parse(storedProducts) : [];
    }

    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(allProducts));
    }

    const showHTML = () => {
        if (!allProducts.length) {
            cartEmpty.classList.remove('hidden');
            rowProduct.classList.add('hidden');
            cartTotal.classList.add('hidden');
        } else {
            cartEmpty.classList.add('hidden');
            rowProduct.classList.remove('hidden');
            cartTotal.classList.remove('hidden');
        }

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">${product.price}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            `;

            rowProduct.append(containerProduct);

            total += parseInt(product.quantity * product.price.slice(1));
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    };

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
        
    });
  

    productsList.addEventListener('click', e => {
        if (e.target.classList.contains('btn-add-cart')) {
            const product = e.target.parentElement;

            const infoProduct = {
                quantity: 1,
                title: product.querySelector('h2').textContent,
                price: product.querySelector('p').textContent,
            };

            const exists = allProducts.some(product => product.title === infoProduct.title);

            if (exists) {
                allProducts = allProducts.map(product => {
                    if (product.title === infoProduct.title) {
                        product.quantity++;
                        return product;
                    } else {
                        return product;
                    }
                });
            } else {
                allProducts = [...allProducts, infoProduct];
            }

            saveToLocalStorage();
            showHTML();
        }
    });

    rowProduct.addEventListener('click', e => {
        if (e.target.classList.contains('icon-close')) {
            const product = e.target.parentElement;
            const title = product.querySelector('p').textContent;

            allProducts = allProducts.filter(product => product.title !== title);

            saveToLocalStorage();
            showHTML();
        }
    });

    btnFinish.addEventListener('click', () => {
        let message = "Hola, quiero realizar una compra con los siguientes productos:%0A%0A";

        allProducts.forEach(product => {
            message += `* ${product.quantity} ${product.title} *%0A`;
        });

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
        allProducts = [];
        saveToLocalStorage();
        showHTML();
        containerCartProducts.classList.add('hidden-cart');
        window.open(whatsappLink, '_blank');
    });

    const cartIcon = document.querySelector('.container-cart-icon');
    const cartContainer = document.querySelector('.container-cart-products');
    document.addEventListener('click', function(event) {
        const isClickInsideCart = cartContainer.contains(event.target);
        const isClickOnCartIcon = cartIcon.contains(event.target);
        if (!isClickInsideCart && !isClickOnCartIcon) {
            cartContainer.classList.add('hidden-cart');
        }
    });

    const filterItems = document.querySelectorAll('.filters-item');
    const items = document.querySelectorAll('.container-items .item');

    filterItems.forEach(item => {
        item.addEventListener('click', () => {
            filterItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            const category = item.getAttribute('data-category');
            items.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                if (category === 'all' || category === productCategory) {
                    product.classList.remove('hide');
                } else {
                    product.classList.add('hide');
                }
            });
        });
    });

    document.querySelector('.filters-item[data-category="all"]').click();

    showHTML();
});


document.querySelectorAll('.btn-ver').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.item');
        item.classList.toggle('show-info');
    });
});

document.querySelectorAll('.btn-close-info').forEach(button => {
    button.addEventListener('click', function() {
        const item = this.closest('.item');
        item.classList.remove('show-info');
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const itemsContainer = document.querySelector('.container-items');

    prevButton.addEventListener('click', () => {
        itemsContainer.scrollBy({ left: -itemsContainer.clientWidth, behavior: 'smooth' });
    });

    nextButton.addEventListener('click', () => {
        itemsContainer.scrollBy({ left: itemsContainer.clientWidth, behavior: 'smooth' });
    });
});