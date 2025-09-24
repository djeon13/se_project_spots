const editProfileBtn = document.querySelector (".profile__edit-btn");
const editProfileModal = document.querySelector ("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector (".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector ("#profile-name-input");
const editProfileDescriptionInput = editProfileModal.querySelector ("#profile-description-input");

const addPostBtn = document.querySelector (".profile__add-btn");
const addPostModal = document.querySelector ("#new-post-modal");
const addPostCloseBtn = addPostModal.querySelector (".modal__close-btn");
const addPostForm = addPostModal.querySelector(".modal__form");
const addPostImageInput= addPostModal.querySelector("#card-image-input");
const addPostDescriptionInput = addPostModal.querySelector("#caption-description-input");

const profileNameEl = document.querySelector (".profile__name");
const profileDescriptionEl = document.querySelector (".profile__description");


editProfileBtn.addEventListener("click", function(){
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    editProfileModal.classList.add("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function(){
    editProfileModal.classList.remove("modal_is-opened");
});


addPostBtn.addEventListener("click", function(){
    addPostModal.classList.add("modal_is-opened");
});

addPostCloseBtn.addEventListener("click", function(){
    addPostModal.classList.remove("modal_is-opened");
});
function handleEditProfileSubmit(evt){
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    editProfileModal.classList.remove("modal_is-opened");
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddPostSubmit(evt){
    evt.preventDefault();
    console.log(addPostImageInput.value);
    console.log(addPostDescriptionInput.value);
    addPostModal.classList.remove("modal_is-opened");
};

addPostForm.addEventListener("submit", handleAddPostSubmit);