document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.getElementById('ramen-menu')
    const ramenDetail = document.getElementById('ramen-detail')
    const ratingDelete = document.getElementById('rating-delete')
    const newRamenForm = document.getElementById('new-ramen')
    const editFeaturedRamenForm = document.getElementById('edit-ramen')
    const submitDelete = document.getElementById('submit-delete')
    console.log(submitDelete)

    function renderMenu(){
        fetch('http://localhost:3000/ramens')
        .then(res => res.json())
        .then(ramenImages => {
            ramenImages.forEach(ramen => {
                const ramenImage = document.createElement('img')
                ramenImage.src = ramen.image
                ramenImage.id = ramen.id
                ramenImage.className = 'menu-image'
                ramenMenu.appendChild(ramenImage)

                ramenImage.addEventListener('click', () => {
                    ratingDelete.remove()
                    renderRamen(ramen)
                })
            })
        })
    }

    function renderRamen(ramen){
        console.log(9)
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
        //     editFeaturedRamenForm.innerHTML = `
        //     <form id="edit-ramen">
        //         <h4>Update the Featured Ramen</h4>
        //         <input type="hidden" name="ramenId" value="${ramen.id}" />
        //         <label for="rating">Rating: </label>
        //         <input type="number" name="rating" id="new-rating" />
        //         <label for="comment">Comment: </label>
        //         <textarea name="comment" id="comment"></textarea>
        //         <input type="submit" value="Update" />
        //     </form>
        // `;
            console.log('complte')
            addDeleteButton(ramen)
            addEditButton(ramen)
        })
    }

    // function renderFirstRamen(){
    //     ratingDelete.remove()
    //     fetch('http://localhost:3000/ramens/1')
    //     .then(res => res.json())
    //     .then(ramenObject => {
    //         ramenDetail.innerHTML = `
    //         <div id="ramen-detail">
    //         <img class="detail-image" src="${ramenObject.image}" alt="Insert Name Here" />
    //         <h2 class="name">${ramenObject.name}</h2>
    //         <h3 class="restaurant">${ramenObject.restaurant}</h3>
    //       </div>
        
    //       <h3>Rating:</h3>
    //       <p>
    //         <span id='rating-display'>${ramenObject.rating}</span> / 10
    //       </p>
    //       <h3>Comment:</h3>
    //       <p id='comment-display'>
    //         ${ramenObject.comment}
    //       </p>
    //         `
    //         addDeleteButton()
    //     })
    // }

    function addNewRamen(e){
        e.preventDefault()
        const newRamenObj = {
            name:e.target.name.value,
            restaurant:e.target.restaurant.value,
            image:e.target.image.value,
            rating:e.target.rating.value,
            comment:e.target.comment.value
        }
        if (newRamenObj.name){
            fetch('http://localhost:3000/ramens',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body:JSON.stringify(newRamenObj)
            })
            .then(res => res.json())
            .then(ramen => console.log(ramen))
        }
        const images = document.getElementsByClassName('menu-image')
        while (images.length > 0){
            images[0].remove()
        }
        setTimeout(() => {
            renderMenu()
        }, 500);
    }

    function addEditButton(ramen){
        console.log('love')
        const editButton = document.createElement('button')
        editButton.type = "button"
        editButton.textContent = "Update Ramen"
        console.log(submitDelete)
        submitDelete.remove()
        editFeaturedRamenForm.appendChild(editButton)
        editButton.addEventListener('click', () => editFeaturedRamen(ramen));
    }

    function editFeaturedRamen(ramen) {
        // e.preventDefault()
        const newRatingObj = {
            rating: document.getElementById('new-rating').value,
            comment: document.getElementById('comment').value
        };
    
        const newRating = document.getElementById('rating-display');
        const newComment = document.getElementById('comment-display');
    
        newRating.textContent = newRatingObj.rating;
        newComment.textContent = newRatingObj.comment;
    
        fetch(`http://localhost:3000/ramens/${ramen.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRatingObj)
        })
        .then(res => res.json())
        .then(updatedRamen => {
            console.log('Ramen updated:', updatedRamen);
        })
        .catch(error => {
            console.error('Error updating ramen:', error);
        });
    }

    newRamenForm.addEventListener('submit', addNewRamen)

    editFeaturedRamenForm.addEventListener('submit', editFeaturedRamen)

    renderMenu()
    // renderFirstRamen()

    function addDeleteButton(ramen){
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'DELETE'
        ramenDetail.appendChild(deleteButton)
        deleteButton.addEventListener('click', () => {
            const ramenImage = document.getElementById(ramen.id)
            ramenImage.remove()
            fetch(`http://localhost:3000/ramens/${ramen.id}`,{
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ramen)
                })
                .then(res => res.json())
                .then(ramen => console.log(ramen))
                // renderFirstRamen()
        })
    }
})
