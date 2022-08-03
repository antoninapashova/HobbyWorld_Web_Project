let allHobbiesOfAllUsers = document.getElementById('allHobbiesOfAllUsers');
let cards = document.getElementById("cards");
document.getElementById('musicBtn').addEventListener('click',()=> getHobbiesByCategory('music'));
document.getElementById('photographyBtn').addEventListener('click',()=> getHobbiesByCategory('photography'));
document.getElementById('origamiBtn').addEventListener('click',()=> getHobbiesByCategory('origami'));
document.getElementById('petsBtn').addEventListener('click',()=> getHobbiesByCategory('pets'));

function getAllUsers(url){
    return fetch(url).then(response=>response.json());
}
function loadAllHobbiesOfAllUsers(){
        if(allHobbiesOfAllUsers.contains(cards)){
            allHobbiesOfAllUsers.removeChild(cards);
        }
        fetch(`http://localhost:8080/statistic/`)
            .then(res => res.json())
            .then(data => data.forEach(el => {
                let hobbyCard = document.createElement('div');
                hobbyCard.classList.add("hobby-card");
                hobbyCard.innerHTML = `<div  id="cardForHobby">
                      <img src = "${el.photo.url}"/>
                    <div>
                     <h3 class="card-text">${el.user.username}</h3>
                     <h4  class="card-title">${el.title}</h4>
                      <p  class="card-title">${el.description}</p>
                    <button id="deleteBtn" onclick="deleteHobbyByHobbyId(${el.id})">Delete</button>
                </div>
            </div>
        </div>
    </div>`;
                cards.appendChild(hobbyCard);
            }));
        allHobbiesOfAllUsers.appendChild(cards);

}

function searchHobbiesByUsername(){
    if(allHobbiesOfAllUsers.contains(cards)){
        allHobbiesOfAllUsers.removeChild(cards);
    }
        let user = document.getElementById('username');
        fetch(`http://localhost:8080/statistic/` + user.textContent)
            .then(res => res.json())
            .then(data => data.forEach(el => {
                let hobbyCard = document.createElement('div');
                hobbyCard.classList.add("hobby-card");
                hobbyCard.innerHTML = `<div  id="cardForHobby">
                      <img src = "${el.photo.url}"/>
                    <div>
                       <p class="card-text">${el.user.username}</p>
                       <h5  class="card-title">${el.title}</h5>
                       <p  class="card-title">${el.description}</p>
                    <button id="deleteBtn" onclick="deleteHobbyByHobbyId(${el.id})">Delete</button>
                </div>
            </div>
        </div>
    </div>`;
                cards.appendChild(hobbyCard);
            }));
    allHobbiesOfAllUsers.appendChild(cards);
 }

function loadAllUsers(){
        let allRegisteredUsersDiv = document.getElementById("allRegisteredUsers");
        allRegisteredUsersDiv.style.display='block';
        if(allHobbiesOfAllUsers.contains(cards)){
        allHobbiesOfAllUsers.removeChild(cards);
        }

        let table = document.getElementById('tableWithUsers');
        let body = document.getElementById('tBody');
        if(table.contains(body)){
            table.removeChild(body);
        }
        const userResponse = getAllUsers(`http://localhost:8080/statistic/user`);

        userResponse.then(data=> data.forEach(user => {
            let tr = document.createElement('tr');
            tr.innerHTML = `<td>${user.id}</td>
           <td>${user.username}</td>
           <td>${user.firstName}</td>
           <td>${user.lastName}</td>
           <td>${user.email}</td>
           <td><button id="deleteBtn" onclick="deleteUser(${user.id})" class="btn btn-outline-success btn-sm" name="delete">Delete
           </button></td>
           </tr>`;
            body.appendChild(tr);
        }));
        table.appendChild(body);

}

function deleteUser(id){
   fetch(`http://localhost:8080/statistic/user/` + id,
       {method: 'DELETE'}).
           then((resp) => resp.json().then((body) => console.log(body)));
}

function deleteHobbyByHobbyId(id) {
   fetch(`http://localhost:8080/statistic/` + id, {method: 'DELETE'})
       .then((resp) => resp.json().then((body) => console.log(body)));

}


function getHobbiesByCategory(category, event){
    let section = document.getElementById('show-hobbies');
    let header = document.createElement("h2");
    let divCards = document.createElement('div');
    divCards.classList.add('cards');
    if(section.contains(header) || section.contains(divCards)){
        section.removeChild(header);
        section.removeChild(divCards);
    }
    header.textContent=category;
    section.appendChild(header);

    fetch("http://localhost:8080/"+ category)
        .then(res => res.json())
        .then(data => data.forEach(el => {
            let hobbyCard = document.createElement('div');
            hobbyCard.classList.add("hobby-card");
            if(section.contains(hobbyCard)){
                section.removeChild(hobbyCard)
            }
            hobbyCard.innerHTML = `<img class=" card-img-top" src="${el.photo.url}" alt="Card image cap">
                   <div class="card-body">
                       <h5 class="card-title">${el.user.username}</h5>
                       <h5 class="card-title">${el.category.category}</h5>
                       <h5 class="card-title">${el.title}</h5>
                         <p class="card-text">${el.description}</p>`;
            divCards.appendChild(hobbyCard);
        }));

    section.appendChild(divCards);
}
