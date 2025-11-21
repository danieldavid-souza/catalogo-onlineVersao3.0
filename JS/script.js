// Aguarda o carregamento completo do DOM para executar o script
document.addEventListener('DOMContentLoaded', async () => {

    // --- ELEMENTOS DO DOM ---
    const catalogContainer = document.getElementById('product-catalog');
    const searchInput = document.getElementById('searchInput');
    const sortOptions = document.getElementById('sortOptions');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    // --- DADOS DOS PRODUTOS ---
    // Variável para armazenar os produtos carregados do JSON.
    let products = [];

    /**
     * Carrega os dados dos produtos a partir de um arquivo JSON.
     */
    async function loadProducts() {
        try {
            const response = await fetch('data/produtos.json'); // Carrega o arquivo JSON.
            products = await response.json(); // Converte a resposta para JSON e armazena na variável.
        } catch (error) {
            console.error('Erro ao carregar os produtos:', error); // Exibe um erro no console se o carregamento falhar.
        }
    }

    // --- FUNÇÕES ---

    /**
     * Renderiza os produtos na tela.
     * @param {Array} productsToRender - O array de produtos a ser exibido.
     */
    function renderProducts(productsToRender) {
        // Limpa o container do catálogo antes de adicionar novos produtos
        catalogContainer.innerHTML = '';

        // Itera sobre cada produto e cria o card correspondente
        productsToRender.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            // Conteúdo HTML do card do produto
            card.innerHTML = `
                <img src="${product.imagem}" alt="${product.nome}" data-name="${product.nome}" data-price="${product.preco}">
                <h3>${product.nome}</h3>
                <p class="price">R$ ${product.preco.toFixed(2)}</p>
                <a href="https://api.whatsapp.com/send?phone=5532991657472&text=Olá, tenho interesse no produto: ${product.nome}" target="_blank" class="whatsapp-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="whatsapp-icon" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.05-.084-.182-.133-.38-.232z"/></svg>
                    <span>Pedir via WhatsApp</span>
                </a>
            `;

            // Adiciona o card ao container do catálogo
            catalogContainer.appendChild(card);
        });

        // Adiciona o evento de clique para abrir o lightbox em cada imagem
        addLightboxEvents();
    }

    /**
     * Adiciona os eventos de clique nas imagens dos produtos para o lightbox.
     */
    function addLightboxEvents() {
        const productImages = document.querySelectorAll('.product-card img');
        productImages.forEach(img => {
            img.addEventListener('click', () => {
                // Define a imagem e a legenda do lightbox
                lightboxImg.src = img.src;
                const productName = img.getAttribute('data-name');
                const productPrice = parseFloat(img.getAttribute('data-price')).toFixed(2);
                lightboxCaption.innerHTML = `<h3>${productName}</h3><p>R$ ${productPrice}</p>`;
                // Exibe o lightbox
                lightbox.style.display = 'flex';
            });
        });
    }

    /**
     * Filtra e ordena os produtos com base nos inputs do usuário.
     */
    function filterAndSortProducts() {
        // Obtém o termo de busca e a opção de ordenação
        const searchTerm = searchInput.value.toLowerCase();
        const sortValue = sortOptions.value;

        // Filtra os produtos com base no nome e na descrição
        let filteredProducts = products.filter(product =>
            product.nome.toLowerCase().includes(searchTerm) ||
            product.descricao.toLowerCase().includes(searchTerm)
        );

        // Ordena os produtos filtrados
        switch (sortValue) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.preco - b.preco);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.preco - b.preco);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'name-desc':
                filteredProducts.sort((a, b) => b.nome.localeCompare(a.nome));
                break;
        }

        // Renderiza os produtos filtrados e ordenados
        renderProducts(filteredProducts);
    }

    // --- EVENT LISTENERS ---

    // Evento para fechar o lightbox ao clicar no 'X'
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Evento para fechar o lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // Eventos para acionar a filtragem e ordenação
    searchInput.addEventListener('input', filterAndSortProducts);
    sortOptions.addEventListener('change', filterAndSortProducts);

    // --- INICIALIZAÇÃO ---
    /**
     * Função principal de inicialização.
     */
    async function init() {
        await loadProducts(); // Carrega os produtos do JSON.
        renderProducts(products); // Renderiza os produtos na tela.
    }

    init(); // Chama a função de inicialização.
});