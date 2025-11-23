# Catálogo de Produtos - Lima Calixto Personalizados

![Logo da Lima Calixto Personalizados](imagens/logo/logo.png)

## 📝 Descrição

Este é um projeto de um catálogo de produtos online, desenvolvido para a "Lima Calixto Personalizados". A aplicação é uma página web dinâmica e responsiva que exibe produtos a partir de um arquivo de dados, permitindo que os usuários visualizem, busquem e ordenem os itens de forma interativa.

### ✨ Funcionalidades Principais

- **Carregamento Dinâmico de Produtos:** Os produtos são carregados a partir de um arquivo `produtos.json`, tornando a adição e remoção de itens simples e centralizada.
- **Busca em Tempo Real:** Um campo de busca permite filtrar produtos por nome ou descrição instantaneamente.
- **Ordenação Flexível:** Os usuários podem ordenar os produtos por preço (menor para maior e vice-versa) e por nome (A-Z e Z-A).
- **Visualizador de Imagens (Lightbox):** Ao clicar na imagem de um produto, um lightbox é aberto para uma visualização ampliada e mais detalhada.
- **Design Responsivo:** A interface se adapta a diferentes tamanhos de tela, proporcionando uma boa experiência de uso em desktops, tablets e smartphones.
- **Contato via WhatsApp:** Cada produto possui um botão que direciona o usuário para o WhatsApp com uma mensagem pré-definida, facilitando o contato para orçamentos e compras.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web padrão, sem a necessidade de frameworks complexos, focando em performance e simplicidade.

- **HTML5:** Para a estrutura semântica da página.
- **CSS3:** Para a estilização completa e responsividade, utilizando Flexbox, Grid Layout e variáveis CSS para melhor manutenibilidade.
- **JavaScript (ES6+):** Para toda a lógica de interatividade, incluindo a busca, ordenação, manipulação do DOM e o carregamento assíncrono dos dados dos produtos (`fetch API`).

---

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma para manter a clareza e a separação de responsabilidades:

```
catalogo-online/
├── css/
│   └── style.css         # Folha de estilos principal
├── data/
│   └── produtos.json     # Arquivo com os dados de todos os produtos
├── imagens/
│   ├── logo/
│   │   └── logo.png      # Logo da empresa
│   ├── ...               # Imagens dos produtos
├── js/
│   └── script.js         # Lógica de interatividade da aplicação
└── index.html            # Arquivo principal da estrutura HTML
```

---

## 🛠️ Como Executar o Projeto

Como este é um projeto front-end baseado em HTML, CSS e JavaScript puros, não há um processo de compilação ou instalação de dependências complexas.

1.  **Clone o repositório (ou baixe os arquivos):**
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```

2.  **Abra o arquivo `index.html`:**
    A maneira mais simples de executar o projeto é abrir o arquivo `index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

3.  **(Opcional) Use um servidor local:**
    Para evitar possíveis problemas com políticas de CORS (Cross-Origin Resource Sharing) ao carregar o arquivo `produtos.json` localmente, é recomendado usar um servidor de desenvolvimento simples.

    - Se você tem o **Node.js** instalado, pode usar o `live-server`:
      ```bash
      # Instale globalmente (apenas uma vez)
      npm install -g live-server
      # Execute na pasta do projeto
      live-server
      ```
    - Se você usa **VS Code**, pode instalar a extensão Live Server e clicar em "Go Live" no canto inferior direito do editor.

---

## ⚖️ Licença

Este projeto é de propriedade de Lima Calixto Personalizados. Todos os direitos reservados. O uso, reprodução ou distribuição do código e das imagens sem permissão prévia é proibido.

&copy; 2025 Lima Calixto Personalizados.