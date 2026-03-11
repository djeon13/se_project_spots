import { enableValidation, resetValidation, disableButton, settings } from "../scripts/validation.js";
import "../pages/index.css";
import Api from "../utils/Api.js";
import logo from "../images/logo.svg";
import avatar from "../images/avatar.jpg";
import editIcon from "../images/Group2.svg";
import plusIcon from "../images/Plus.svg";
import closeIcon from "../images/Group27.svg";
import previewCloseIcon from "../images/Previewclose.svg";
import { error } from "jquery";


const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "dee05ca2-31eb-4c59-a1fe-65c32e1e642e",
    "Content-Type": "application/json"
  }
});

let currentUserId; 

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, cards]) => {
    currentUserId = userInfo._id;
    profileNameEl.textContent = userInfo.name;
    profileDescriptionEl.textContent = userInfo.about;
    
   
    profileImage.src = userInfo.avatar;
    profileImage.onerror = function() {
      this.src = avatar; 
    };

    cards.forEach((card) => {
      const cardElement = getCardElement(card, currentUserId);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

let selectedCard = null;
let selectedCardId = null;

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
    "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
    "#profile-description-input"
);
const addPostBtn = document.querySelector(".profile__add-btn");
const addPostModal = document.querySelector("#new-post-modal");
const addPostCloseBtn = addPostModal.querySelector(".modal__close-btn");
const addPostForm = addPostModal.querySelector(".modal__form");
const addPostSubmitBtn = addPostModal.querySelector(".modal__submit-btn");
const addPostImageInput = addPostModal.querySelector("#card-image-input");
const addPostDescriptionInput = addPostModal.querySelector(
    "#caption-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__avatar");
const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");

const editAvatarBtn = document.querySelector(".profile__edit-avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarUrlInput = editAvatarModal.querySelector("#profile-avatar-input");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarModalCloseBtn = editAvatarModal.querySelector(".modal__close-btn");
const editAvatarSubmitBtn = editAvatarModal.querySelector(".modal__submit-btn");

const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
    modal.addEventListener("click", handleModalClick);
});

function handleModalClick(evt) {
    if (evt.target.classList.contains("modal_is-opened")) {
        closeModal(evt.target);
    }
}


function getCardElement(data, userId) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;


if (data.isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  } else {
    cardLikeBtnEl.classList.remove("card__like-btn_active");
        }

  cardLikeBtnEl.addEventListener("click", () => {
    handleLikeCard(cardElement, data._id);
  });

  cardDeleteBtnEl.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

previewModalCloseBtn.addEventListener("click", function () {
    closeModal(previewModal);
});

function openModal(modal) {
    modal.classList.add("modal_is-opened");
    document.addEventListener("keydown", handleEscapeKey);
}

editProfileBtn.addEventListener("click", function () {
    
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    resetValidation(editProfileForm, [editProfileNameInput, editProfileDescriptionInput], settings);
    openModal(editProfileModal);
    
});

addPostBtn.addEventListener("click", function () {
    addPostImageInput.value="";
    addPostDescriptionInput.value="";
    resetValidation(addPostForm, [addPostImageInput, addPostDescriptionInput], settings);
    openModal(addPostModal);
});

function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
}

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
    document.removeEventListener("keydown", handleEscapeKey);
}

editProfileCloseBtn.addEventListener("click", function () {
    closeModal(editProfileModal);
});

addPostCloseBtn.addEventListener("click", function () {
    closeModal(addPostModal);
});

function resetButtonText(button) {
    button.textContent = "Save";
}

function handleResetButtonText() {
    resetButtonText(submitButton);
}

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    const submitButton = editProfileForm.querySelector(".modal__submit-btn");
    submitButton.textContent = "Saving. . .";

    const userData = {
        name: editProfileNameInput.value,
        about: editProfileDescriptionInput.value
    };
    api.updateUserProfile(userData)
    .then((data) => {
        profileNameEl.textContent = data.name;
    profileDescriptionEl.textContent = data.about;
    submitButton.textContent = "Save"; 
    closeModal(editProfileModal);
    })
    .catch((err) => {
        submitButton.textContent = "Error! Try again. . .";
        submitButton.removeEventListener('click', handleResetButtonText);
        submitButton.addEventListener('click', handleResetButtonText);
    })
   }


editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddPostSubmit(evt) {
    evt.preventDefault();
    const submitButton = addPostForm.querySelector(".modal__submit-btn");
    submitButton.textContent = "Saving. . .";
    const inputValues = {
        name: addPostDescriptionInput.value,
        link: addPostImageInput.value,
    };

    api.addCard(inputValues)
    .then((data) => {
        closeModal(addPostModal);
        const cardElement = getCardElement(data, currentUserId);
    cardsList.prepend(cardElement);
    addPostForm.reset();
    disableButton(addPostSubmitBtn,settings);
    })
    .finally(() => {
         submitButton.textContent = "Save";
    });
}

addPostForm.addEventListener("submit", handleAddPostSubmit);

function handleDeleteCard(cardElement, data) {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
    
}

function handleDeleteSubmit(evt) {
    evt.preventDefault();
    const deleteButton = deleteForm.querySelector(".modal__submit-btn_type_delete");
    deleteButton.textContent = "Deleting. . .";

    api.removeCard(selectedCardId)
    .then(() => {
        selectedCard.remove();
        closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
        deleteButton.textContent = "Delete";
    })
}

cancelBtn.addEventListener('click', () => {
    closeModal(deleteModal);
});

deleteModalCloseBtn.addEventListener('click', () => {
    closeModal(deleteModal);
});

deleteForm.addEventListener('submit', handleDeleteSubmit);

function handleLikeCard(cardElement, cardId) {
  const likeButton = cardElement.querySelector(".card__like-btn");
  const isLiked = likeButton.classList.contains("card__like-btn_active");

  const request = isLiked
    ? api.removeCardLike(cardId)
    : api.addCardLike(cardId);

  request
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        likeButton.classList.add("card__like-btn_active");
      } else {
        likeButton.classList.remove("card__like-btn_active");
      }
    })
    .catch(console.error);
}


editAvatarBtn.addEventListener('click', () => {
    editAvatarUrlInput.value = "";
    resetValidation(editAvatarForm, [editAvatarUrlInput], settings);
    openModal(editAvatarModal);
});

function handleAvatarSubmit(evt) {
    evt.preventDefault(); 
    const originalButtonText = editAvatarSubmitBtn.textContent;
    editAvatarSubmitBtn.textContent = "Saving. . .";
    const inputValue = editAvatarUrlInput.value;
    
    api.updateUserAvatar(inputValue)
    .then((data) => {
        profileImage.src = data.avatar;
        closeModal(editAvatarModal);
    })
    .catch(err => {
        console.error("Error updating avatar:", err);
    })
    .finally(() => {
        editAvatarSubmitBtn.textContent = originalButtonText;
    })
}

editAvatarForm.addEventListener("submit", handleAvatarSubmit);

editAvatarModalCloseBtn.addEventListener('click', () => {
    closeModal(editAvatarModal);
});

enableValidation(settings);
