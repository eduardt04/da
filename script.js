async function search() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    const response = await fetch('data.json');
    const products = await response.json();

    const filteredProducts = products.filter(product => {
        const title = product.titlu.toLowerCase();
        return title.includes(query);
    });

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${product.titlu}</h2>
            <div class="product-details">Preț: ${product.pret}</div>
            <div class="product-details">Dimensiuni: ${product.dimensiuni}</div>
            <div class="product-details">Culoare: ${product.culoare}</div>
            <div class="product-details">Material: ${product.material}</div>
        `;
        resultsContainer.appendChild(productElement);
    });
}