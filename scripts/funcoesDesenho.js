function desenharContentores(fileList) {
    const listaCards = document.getElementById('galeria');
    galeria.innerHTML = ''; // limpar conteúdo existente

    let row;

    fileList.forEach((item, index) => {
        // Mudar de linha a cada 3 cards
        if (index % 3 === 0) {
            row = document.createElement('div');
            row.classList.add('row', 'mb-4');
            galeria.appendChild(row);
        }

        // Criar coluna
        const col = document.createElement('div');
        col.classList.add('col-md-4'); // 3 colunas por linha

        // Criar o card
        const card = document.createElement('div');
        card.classList.add('card', 'h-100', 'shadow-sm', 'cardsContainer');

        //imagem
        const img = document.createElement('img');
        img.src = item.path;
        img.alt = item.name;
        img.classList.add('card-img-top', 'w-75', 'mx-auto');

        // Card body
        const body = document.createElement('div');
        body.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = item.name;

        const desc = document.createElement('p');
        desc.classList.add('card-text');
        desc.textContent = item.description;

        // juntar elementos
        body.appendChild(title);
        body.appendChild(desc);
        card.appendChild(img);
        card.appendChild(body);
        col.appendChild(card);
        row.appendChild(col);
    });
}