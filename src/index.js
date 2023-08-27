document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenDetail = document.getElementById('ramen-detail')
    const ratingDelete = document.getElementById('rating-delete')
    const newRamenForm = document.getElementById('new-ramen')
    const editFeaturedRamenForm = document.getElementById('edit-ramen')

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
                    ratingDelete.remove()
                    renderRamen(ramen)
                })
            })
        })
    }

    function renderRamen(ramen){
        fetch(`http://localhost:3000/ramens/${ramen.id}`)
        .then(res => res.json())
        .then(() => {
            ramenDetail.innerHTML = `
            <div id="ramen-detail">
            <img class="detail-image" src="${ramen.image}" alt="Insert Name Here" />
            <h2 class="name">${ramen.name}</h2>
            <h3 class="restaurant">${ramen.restaurant}</h3>
          </div>
        
          <h3>Rating:</h3>
          <p>
            <span id='rating-display'>${ramen.rating}</span> / 10
          </p>
          <h3>Comment:</h3>
          <p id='comment-display'>
            ${ramen.comment}
          </p>
            `
            addDeleteButton(ramen)
        })
    }

    function renderFirstRamen(){
        ratingDelete.remove()
        fetch('http://localhost:3000/ramens/1')
        .then(res => res.json())
        .then(ramenObject => {
            ramenDetail.innerHTML = `
            <div id="ramen-detail">
            <img class="detail-image" src="${ramenObject.image}" alt="Insert Name Here" />
            <h2 class="name">${ramenObject.name}</h2>
            <h3 class="restaurant">${ramenObject.restaurant}</h3>
          </div>
        
          <h3>Rating:</h3>
          <p>
            <span id='rating-display'>${ramenObject.rating}</span> / 10
          </p>
          <h3>Comment:</h3>
          <p id='comment-display'>
            ${ramenObject.comment}
          </p>
            `
            addDeleteButton()
        })
    }

    function addNewRamen(e){
        e.preventDefault()
        const newRamenObj = {
            name:e.target.name.value,
            restaurant:e.target.restaurant.value,
            image:e.target.image.value,
            rating:e.target.rating.value,
            comment:e.target.comment.value
        }
        const newRamenImage = document.createElement('img')
        newRamenImage.src = newRamenObj.image
        newRamenImage.addEventListener('click', () => {
            renderRamen(newRamenObj)
        })
        ramenMenu.appendChild(newRamenImage)
    }

    function editFeaturedRamen(e){
        e.preventDefault()

        const newRatingObj = {
            rating:e.target.rating.value,
            comment:e.target.comment.value
        }

        const newRating = document.getElementById('rating-display')
        const newComment = document.getElementById('comment-display')

        newRating.textContent = newRatingObj.rating
        newComment.textContent = newRatingObj.comment
    }

    newRamenForm.addEventListener('submit', addNewRamen)

    editFeaturedRamenForm.addEventListener('submit', editFeaturedRamen)

    renderMenu()
    renderFirstRamen()

    function addDeleteButton(ramen){
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'DELETE'
        ramenDetail.appendChild(deleteButton)
        deleteButton.addEventListener('click', () => {
            const ramenImage = document.getElementById(ramen.id)
            ramenImage.remove()
        })
    }
})
