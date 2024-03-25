document.addEventListener('DOMContentLoaded', function() {
    fetchProducts();
    setupEventListeners();
});
async function fetchProducts() {
    try {
        const response = await fetch('/products');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
        displayFetchError();
    }
}

function displayFetchError() {
    const productList = document.getElementById('productList');
    productList.innerHTML = `<li>Error loading products. Please try again later.</li>`;
}

function setupEventListeners() {
    document.getElementById('addProductBtn').addEventListener('click', addProduct);
    document.getElementById('toggleChatBtn').addEventListener('click', () => toggleChatOverlay(true));
    document.getElementById('sendChatBtn').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
    document.getElementById('chat-assistant-ai').addEventListener('click', openChatAssistant);
}



function displayProducts(data) {
    const productList = document.getElementById('productList');
    productList.innerHTML = data.map(productTemplate).join('');
}

function productTemplate(product) {
    return `
        <li>
            <strong>${product.name || 'No name provided'}</strong> (${product.clas || 'No class'}, ${product.type || 'No type'})
            <div>Price: $${product.price || 0}</div>
            <div>Quantity: ${product.quantity || 0} kg</div>
        </li>
    `;
}

function addProduct() {
    const product = gatherProductInfo();
    sendProductData(product).then(clearProductForm).then(fetchProducts);
}

function gatherProductInfo() {
    return {
        name: document.getElementById('productName').value,
        class: document.getElementById('productClass').value,
        type: document.getElementById('productType').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseFloat(document.getElementById('productQuantity').value)
    };
}

function sendProductData(product) {
    return fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
}

function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productClass').value = '';
    document.getElementById('productType').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productQuantity').value = '';
}

function toggleChatOverlay(show) {
    document.getElementById("chat-overlay").style.display = show ? "block" : "none";
    if (show) initializeChatWebSocket();
}

function initializeChatWebSocket() {
    // Chat WebSocket initialization code remains the same.
}

function sendMessage() {
    const message = document.getElementById('chat-input').value.trim();
    if (message && window.chatSocket) {
        window.chatSocket.send(message);
        document.getElementById('chat-input').value = ''; // Clear input after sending.
    }
}

function openChatAssistant() {
    window.open('http://localhost:8080/chat/', '_blank');
}
