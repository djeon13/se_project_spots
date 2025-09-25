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


function openModal(modal){
    modal.classList.add("modal_is-opened");
};

editProfileBtn.addEventListener("click", function(){
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    openModal(editProfileModal);
});

addPostBtn.addEventListener("click", function(){
    openModal(addPostModal); 
});

function closeModal(modal){
    modal.classList.remove("modal_is-opened");
};

editProfileCloseBtn.addEventListener("click", function(){
    closeModal(editProfileModal);
});

addPostCloseBtn.addEventListener("click", function(){
    closeModal(addPostModal);
});

function handleEditProfileSubmit(evt){
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
   closeModal(editProfileModal);
};

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddPostSubmit(evt){
    evt.preventDefault();
    console.log(addPostImageInput.value);
    console.log(addPostDescriptionInput.value);
    closeModal(addPostModal);
};

addPostForm.addEventListener("submit", handleAddPostSubmit);