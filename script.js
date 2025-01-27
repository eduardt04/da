async function search() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    // Check if the query includes "măsuță cafea"
    if (!query.includes("măsuță cafea")) {
        alert("Te rog încearcă din nou cu 'Măsuță cafea'");
        return; // Exit the function if the condition is met
    }

    const response = await fetch('data.json');
    const productsStrings = await response.json(); // This is an array of strings

    // Parse each JSON string into an object
    const products = productsStrings.map(productString => JSON.parse(productString));

    const filteredProducts = products.filter(product => {
        const title = product.titlu.toLowerCase();
        return title.includes(query);
    });

    if (filteredProducts.length === 0) {
        // Handle the case where no products match the query
        resultsContainer.innerHTML = '<p>Nu au fost găsite produse conform căutării.</p>';
    } else {
        filteredProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h2>${product.titlu}</h2>
                <div class="product-details">Preț: ${product.pret}</div>
                <div class="product-details">Dimensiuni: ${product.dimensiuni}</div>
                <div class="product-details">Culoare: ${product.culoare}</div>
                <div class="product-details">Material: ${product.material}</div>
                <div class="product-details">URL: <a href="${product.url}" target="_blank">Vezi produs</a></div>
            `;
            resultsContainer.appendChild(productElement);
        });
    }
}