// Adiciona um ouvinte de eventos que espera o conteúdo do DOM (a estrutura HTML) ser completamente carregado e analisado antes de executar o script.
document.addEventListener('DOMContentLoaded', async () => {

    // --- SELEÇÃO DE ELEMENTOS DO DOM ---
    // Armazena referências aos elementos HTML que serão manipulados pelo JavaScript.
    const catalogContainer = document.getElementById('product-catalog');
    const searchInput = document.getElementById('searchInput');
    const sortOptions = document.getElementById('sortOptions');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox'); // Seleciona o botão de fechar do lightbox.

    // --- ESTADO DA APLICAÇÃO ---
    // Array que irá armazenar a lista de produtos carregada do arquivo JSON.
    let products = [];

    /**
     * Carrega os dados dos produtos de forma assíncrona a partir de um arquivo JSON.
     * A palavra-chave 'async' indica que a função pode executar operações assíncronas.
     */
    async function loadProducts() {
        try {
            // 'fetch' busca o recurso na rede. 'await' pausa a execução até que a Promise do fetch seja resolvida.
            const response = await fetch('data/produtos.json');
            // '.json()' converte o corpo da resposta em um objeto JavaScript. 'await' pausa até que a conversão seja concluída.
            products = await response.json();
        } catch (error) {
            // Se ocorrer um erro durante o 'fetch' ou a conversão para JSON, ele será capturado aqui.
            console.error('Erro ao carregar os produtos:', error); // Exibe uma mensagem de erro no console para depuração.
        }
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO E MANIPULAÇÃO DO DOM ---

    /**
     * Renderiza (exibe) uma lista de produtos no container do catálogo.
     * @param {Array} productsToRender - O array de produtos a ser exibido.
     */
    function renderProducts(productsToRender) {
        // Limpa o conteúdo HTML do container do catálogo para remover produtos antigos antes de renderizar os novos.
        catalogContainer.innerHTML = '';

        // Itera sobre cada produto no array 'productsToRender'.
        productsToRender.forEach(product => {
            // Cria um novo elemento <div> para representar o card do produto.
            const card = document.createElement('div');
            // Adiciona a classe CSS 'product-card' ao novo elemento div.
            card.className = 'product-card';

            // Define o conteúdo HTML interno do card usando um template literal para facilitar a interpolação de variáveis.
            card.innerHTML = `
                <img src="${product.imagem}" alt="${product.nome}" class="product-image" data-name="${product.nome}" data-price="${product.preco}">
                <div class="product-info">
                    <h3 class="product-name">${product.nome}</h3>
                    <p class="product-description">${product.descricao}</p>
                    <p class="product-price">R$ ${product.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <a href="https://api.whatsapp.com/send?phone=5532991657472&text=Olá, tenho interesse no produto: ${product.nome}" target="_blank" class="whatsapp-button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.05-.084-.182-.133-.38-.232z"/></svg>
                    <span>Pedir via WhatsApp</span>
                </a>
            `;

            // Adiciona o card recém-criado como um filho do container do catálogo.
            catalogContainer.appendChild(card);

            // Adiciona o evento de clique na imagem do card recém-criado para abrir o lightbox.
            const productImage = card.querySelector('.product-image');
            productImage.addEventListener('click', () => openLightbox(productImage));
        });
    }

    /**
     * Abre o lightbox com a imagem e informações do produto clicado.
     * @param {HTMLElement} imageElement - O elemento da imagem que foi clicado.
     */
    function openLightbox(imageElement) {
        // Define a imagem do lightbox para ser a mesma da imagem clicada.
        lightboxImg.src = imageElement.src;
        // Pega o nome e o preço dos atributos 'data-*' da imagem.
        const productName = imageElement.getAttribute('data-name');
        const productPrice = parseFloat(imageElement.getAttribute('data-price')).toFixed(2).replace('.', ',');
        // Define a legenda do lightbox com o nome e o preço do produto.
        lightboxCaption.innerHTML = `<h3>${productName}</h3><p>R$ ${productPrice}</p>`;
        // Altera o estilo do lightbox para 'flex' para exibi-lo.
        lightbox.style.display = 'flex';
    }

    /**
     * Filtra e ordena os produtos com base nos valores dos campos de busca e ordenação.
     */
    function filterAndSortProducts() {
        // Obtém o termo de busca, converte para minúsculas para uma busca case-insensitive.
        const searchTerm = searchInput.value.toLowerCase().trim();
        // Obtém o valor selecionado na opção de ordenação.
        const sortValue = sortOptions.value;

        // Cria uma cópia do array de produtos original para não modificá-lo.
        // Filtra os produtos: mantém apenas aqueles cujo nome ou descrição (em minúsculas) incluem o termo de busca.
        let filteredProducts = products.filter(product =>
            product.nome.toLowerCase().includes(searchTerm) ||
            product.descricao.toLowerCase().includes(searchTerm)
        );

        // Ordena os produtos filtrados com base na opção de ordenação selecionada.
        switch (sortValue) {
            case 'price-asc': // Ordena por preço, do menor para o maior.
                filteredProducts.sort((a, b) => a.preco - b.preco);
                break;
            case 'price-desc': // Ordena por preço, do maior para o menor.
                filteredProducts.sort((a, b) => b.preco - b.preco);
                break;
            case 'name-asc': // Ordena por nome, em ordem alfabética (A-Z).
                filteredProducts.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'name-desc': // Ordena por nome, em ordem alfabética inversa (Z-A).
                filteredProducts.sort((a, b) => b.nome.localeCompare(a.nome));
                break;
            // 'default': não faz nada, mantém a ordem do filtro.
        }

        // Chama a função para renderizar os produtos que passaram pelo filtro e ordenação.
        renderProducts(filteredProducts);
    }

    // --- EVENT LISTENERS ---

    // Adiciona um ouvinte de evento para o clique no botão de fechar do lightbox.
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none'; // Oculta o lightbox.
    });

    // Adiciona um ouvinte de evento para o clique na área do fundo do lightbox (fora da imagem).
    lightbox.addEventListener('click', (e) => {
        // Verifica se o alvo do clique é o próprio elemento lightbox (o fundo escuro).
        if (e.target === lightbox) {
            lightbox.style.display = 'none'; // Oculta o lightbox.
        }
    });

    // Adiciona um ouvinte de evento 'input' ao campo de busca. A função será chamada toda vez que o usuário digitar algo.
    searchInput.addEventListener('input', filterAndSortProducts);
    // Adiciona um ouvinte de evento 'change' ao seletor de ordenação. A função será chamada quando o usuário selecionar uma nova opção.
    sortOptions.addEventListener('change', filterAndSortProducts);

    // --- INICIALIZAÇÃO ---
    /**
     * Função principal de inicialização da aplicação.
     */
    async function init() {
        await loadProducts(); // Espera o carregamento dos produtos.
        renderProducts(products); // Renderiza todos os produtos inicialmente.
    }

    // Chama a função de inicialização para iniciar a aplicação.
    init();
});