document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenDetail = document.getElementById('ramen-detail')

    function renderMenu(){
        fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(ramenImages => {
            ramenImages.forEach(ramen => {
                const ramenImage = document.createElement('img')
                ramenImage.src = ramen.image
                ramenImage.id = ramen.id
                ramenMenu.appendChild(ramenImage)

                ramenImage.addEventListener('click', () => {
                    renderRamen(ramen)
                })
            })
        })
    }

    function renderRamen(ramen){
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(res => res.json())
        .then(ramenObject => {
            ramenDetail.innerHTML = `
            <div id="ramen-detail">
            <img class="detail-image" src="${ramenObject.image}" alt="Insert Name Here" />
            <h2 class="name">${ramen.name}</h2>
            <h3 class="restaurant">${ramen.restaurant}</h3>
          </div>
        
          <h3>Rating:</h3>
          <p>
            <span id='rating-display'>Insert rating here</span> / 10
          </p>
          <h3>Comment:</h3>
          <p id='comment-display'>
            Insert comment here
          </p>
            `
        })
    }

    renderMenu()
})
