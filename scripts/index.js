const initialCards = [
    {
        name: "Golden Gate Bridge",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    },
    {
        name: "Val Thorens",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    },
    {
        name: "Restaurant terrace",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    },
    {
        name: "An outdoor cafe",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    },
    {
        name: "A very long bridge, over the forest and through the trees",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    },
    {
        name: "Tunnel with morning light",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    },
    {
        name: "Mountain house",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    },
];

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

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

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

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardTitleEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");

    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;
    cardTitleEl.textContent = data.name;

    const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
    cardLikeBtnEl.addEventListener("click", () => {
        cardLikeBtnEl.classList.toggle("card__like-btn_active");
    });

    const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
    cardDeleteBtnEl.addEventListener("click", () => {
        cardElement.remove();
    });

    cardImageEl.addEventListener("click", () => {
        previewImageEl.src = data.link;
        previewImageEl.alt = data.name;
        previewCaptionEl.textContent = data.name;

        openModal(previewModal);
    });
    return cardElement;
}

function handleEscapeKey(evt) {
    if (evt.key === "Escape") {
        const openModal = document.querySelector(".modal_is-opened");
        closeModal(openModal);
    }
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
    openModal(editProfileModal);
});

addPostBtn.addEventListener("click", function () {
    openModal(addPostModal);
});

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

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;
    closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddPostSubmit(evt) {
    evt.preventDefault();

    const inputValues = {
        name: addPostDescriptionInput.value,
        link: addPostImageInput.value,
    };
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);
    addPostForm.reset();
    disableButton(addPostSubmitBtn);
    closeModal(addPostModal);
}

addPostForm.addEventListener("submit", handleAddPostSubmit);

initialCards.forEach(function (item) {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
});
