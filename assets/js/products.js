// cart 

let carticon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closecart = document.querySelector("#close-cart");
let cartItemsKey = 'juFantasyCartItems';

// Open Cart
carticon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closecart.onclick = () => {
    cart.classList.remove("active");
};

// cart workink js 

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// making function 

function ready() {
    loadCartItems();
    //remove itens from cart 
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    // Função para salvar os itens no localStorage
    function saveCartItems() {
        let cartContent = document.querySelector('.cart-content');
        localStorage.setItem(cartItemsKey, cartContent.innerHTML);
    }

    // Função para carregar os itens do localStorage
    function loadCartItems() {
        let cartContent = document.querySelector('.cart-content');
        let savedItems = localStorage.getItem(cartItemsKey);

        if (savedItems) {
            cartContent.innerHTML = savedItems;
            // Reaplica os event listeners aos elementos carregados
            reapplyEventListeners();
            updatetotal();
        }
    }

    // Função para reaplicar os listeners após carregar do localStorage
    function reapplyEventListeners() {
        var removeCartButtons = document.getElementsByClassName('cart-remove');
        for (var i = 0; i < removeCartButtons.length; i++) {
            removeCartButtons[i].addEventListener('click', removeCartItem);
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            quantityInputs[i].addEventListener('change', quantityChanged);
        }
    }

    // quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // wpp button work 
    // Função para enviar o carrinho via WhatsApp
    function sendCartToWhatsApp() {
        var cartContent = document.querySelector(".cart-content");
        var cartBoxes = cartContent.getElementsByClassName("cart-box");

        if (cartBoxes.length === 0) {
            Toastify({
                text: "Seu carrinho está vazio! Adicione produtos antes de enviar.",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #000000, #333333, #666666, #999999)",
                },
                onClick: function () { } // Callback after click
            }).showToast();
            return;
        }

        var message = "Olá Ju Fantasy, gostaria de comprar os seguintes carrinhos:\n\n";
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var title = cartBox.querySelector(".cart-product-title").innerText;
            var price = cartBox.querySelector(".cart-price").innerText;
            var quantity = cartBox.querySelector(".cart-quantity").value;

            message += `- ${title} (Quantidade: ${quantity}, Preço: ${price})\n`;
        }

        var totalPrice = document.querySelector(".total-price").innerText;
        message += `\nTotal: ${totalPrice}`;

        // Número de telefone (substitua pelo número desejado)
        var phoneNumber = "5521967338323"; // Exemplo: 55 (Brasil) + DDD + Número

        // Codifica a mensagem para URL
        var encodedMessage = encodeURIComponent(message);

        // Cria o link do WhatsApp
        var whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Redireciona para o WhatsApp
        window.open(whatsappLink, "_blank");
    }

    // Adiciona o evento de clique ao botão "btn-buy"
    document.querySelector(".btn-buy").addEventListener("click", sendCartToWhatsApp);



    //remove itens from cart
    function removeCartItem(event) {
        var buttonclicked = event.target;;
        buttonclicked.parentElement.remove();
        updatetotal();
        saveCartItems();
    }

    // quantity changes
    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updatetotal();
        saveCartItems();
    }

    // add to cart
    function addCartClicked(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
        var price = shopProducts.getElementsByClassName("price")[0].innerText;
        var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
        addProductToCart(title, price, productImg);
        updatetotal();
    }

    function addProductToCart(title, price, productImg) {
        var cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box");
        var cartItems = document.getElementsByClassName("cart-content")[0];
        var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
        for (var i = 0; i < cartItemsNames.length; i++) {
            if (cartItemsNames[i].innerText == title) {
                Toastify({
                    text: "Este produto já foi adicionado ao carrinho!",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "linear-gradient(to right, #000000, #333333, #666666, #999999)",
                    },
                    onClick: function () { } // Callback after click
                }).showToast();
                return;
            }
        }

        var cartBoxContent = `
        <img loading="lazy" src ="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">R$${price.replace("R$", "").trim()}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--Remove Cart-->
        <i class='bx bxs-trash-alt cart-remove'></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        // Adicionar o alerta aqui
        Toastify({
            text: "Produto adicionado ao carrinho com sucesso!",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #000000, #333333, #666666, #999999)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        saveCartItems();
        cartShopBox
            .getElementsByClassName("cart-remove")[0]
            .addEventListener("click", removeCartItem);
        cartShopBox
            .getElementsByClassName("cart-quantity")[0]
            .addEventListener("change", quantityChanged);
    }

    //update total 
    function updatetotal() {
        var cartContent = document.getElementsByClassName("cart-content")[0];
        var cartBoxes = cartContent.getElementsByClassName("cart-box");
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];

            // Remove o "R$" e converte o valor para número
            var price = parseFloat(priceElement.innerText.replace("R$", "").replace(",", ".").trim());
            var quantity = quantityElement.value;

            // Calcula o total
            total += price * quantity;
        }

        // Formata o total como moeda brasileira (R$)
        total = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Atualiza o valor total no carrinho
        document.getElementsByClassName("total-price")[0].innerText = total;
    }

    // Define o tema fixo (exemplo: claro)
    function applyFixedTheme() {
        document.documentElement.setAttribute("data-theme", "light"); // Altere para "dark" se quiser o tema escuro
    }

    // Remove detecção automática do tema do sistema
    function disableSystemThemeChange() {
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
        prefersDarkScheme.removeEventListener("change", handleSystemThemeChange);
    }

    // Callback para mudanças no tema do sistema (não faz nada)
    function handleSystemThemeChange() {
        // Não altera o tema
    }

    // Aplica o tema fixo ao carregar o site
    applyFixedTheme();
    disableSystemThemeChange();
}

document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const content = dropdown.querySelector(".dropdown-content");

        if (content) {
            dropdown.addEventListener("mouseenter", function () {
                const rect = content.getBoundingClientRect();
                const windowWidth = window.innerWidth;

                if (rect.right > windowWidth) {
                    content.classList.add("right-align");
                } else {
                    content.classList.remove("right-align");
                }
            });
        }
    });
});



