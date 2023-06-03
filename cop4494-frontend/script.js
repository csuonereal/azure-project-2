let currentPage = 1;
const container = document.querySelector('#container');
const pageSpan = document.querySelector('#page');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

function getData(page) {
    fetch(`http://localhost:1337/api/imdb-reviews?pagination[page]=${page}&sort[0]=id`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = '';
            data.data.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card mb-3';
                card.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">ID: ${item.id}</h5>
                        <p class="card-text">Review: ${item.attributes.review}</p>
                        <p class="card-text"><small class="text-muted">Sentiment: ${item.attributes.sentiment}</small></p>
                        <button onclick="updateSentiment(${item.id})" class="btn btn-primary">Analyze Sentiment</button>
                    </div>
                `;
                container.appendChild(card);
            });

            const pagination = data.meta.pagination;
            pageSpan.textContent = `Page ${pagination.page} of ${pagination.pageCount}`;

            prevBtn.disabled = pagination.page === 1;
            nextBtn.disabled = pagination.page === pagination.pageCount;
        });
}


function updateSentiment(id) {
    fetch(`http://localhost:1337/api/imdb-reviews/analyze`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
        .then(response => response.json())
        .then(data => {
            alert(`New sentiment: ${data.sentiment}`);
            getData(currentPage); 
        })
        .catch(error => console.error('Error:', error));
}

prevBtn.addEventListener('click', () => getData(--currentPage));
nextBtn.addEventListener('click', () => getData(++currentPage));

getData(currentPage);
