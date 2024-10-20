document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("phoneForm");
    const summaryModal = document.getElementById("summaryModal");
    const summaryContent = document.getElementById("summaryContent");
    const showSummaryBtn = document.getElementById("showSummaryBtn");
    const confirmOrderBtn = document.getElementById("confirmOrderBtn");
    const closeModal = document.querySelector(".close");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    const surnameError = document.getElementById("surnameError");
    const surnameInput = document.getElementById("surname");
    const gendrError = document.getElementById("gendrError");


    const showDivBtn = document.getElementById("showDivBtn");
    const hiddenDiv = document.getElementById("hiddenDiv");

    // Fields for price calculation
    const zoznam1 = document.getElementById("zoznam1");
    const zoznam2 = document.getElementById("zoznam2");
    const zoznam3 = document.getElementById("zoznam3");
    const phonePriceElement = document.getElementById("phonePrice");
    const accessoriesPriceElement = document.getElementById("accessoriesPrice");
    const totalPriceElement = document.getElementById("totalPrice");

    const protectorCheckbox = document.getElementById("protectorCheckbox");
    const caseCheckbox = document.getElementById("caseCheckbox");
    const plainColorCase = document.getElementById("plainColorCase");
    const imageCase = document.getElementById("imageCase");
    const chargerCheckbox = document.getElementById("chargerCheckbox");
    const phoneError = document.getElementById("phoneError");
    const phoneInput = document.getElementById("phone");

    let currentAccessoriesPrice = 0;
    let currentPhonePrice = 0;

    // Base prices for phone models
    const phoneModelPrices = {
        "apple": {
            "iPhone 12": 600,
            "iPhone 13": 700,
            "iPhone 14": 800
        },
        "samsung": {
            "Galaxy S21": 650,
            "Galaxy Note 20": 750,
            "Galaxy A52": 450
        },
        "xiaomi": {
            "Redmi Note 10": 200,
            "Mi 11": 400,
            "Poco X3": 300
        },
        "huawei": {
            "P30": 400,
            "P40 Pro": 600,
            "Mate 40": 700
        },
        "oneplus": {
            "OnePlus 8": 500,
            "OnePlus 9": 600,
            "Nord": 350
        }
    };

// Add an event listener to the button
    showDivBtn.addEventListener("click", function () {
        // Toggle the display property
        if (hiddenDiv.style.display === "none" || hiddenDiv.style.display === "") {
            hiddenDiv.style.display = "block"; // Show the div
        } else {
            hiddenDiv.style.display = "none"; // Hide the div
        }
    });

    // Updated email validation function based on requirements


    function validateEmail(email) {
        const emailRegex = /^[^\s@]{3,}@[^\s@]+\.[a-zA-Z]{2,4}$/;
        const parts = email.split("@");
        if (parts.length === 2) {
            const domainParts = parts[1].split(".");
            return (
                emailRegex.test(email) &&
                domainParts.length >= 2 &&
                domainParts[domainParts.length - 1].length >= 2 &&
                domainParts[domainParts.length - 1].length <= 4
            );
        }
        return false;
    }
    function validatePhone(phone) {
        const phoneRegex = /^\+\d{7,15}$/;
        return phoneRegex.test(phone);
    }
    // Show or hide name error based on validation
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim() !== "") {
            nameError.style.display = "none";
        } else {
            nameError.style.display = "block";
            nameError.textContent = "Please enter your name.";
        }
    });

    // Show or hide surname error based on validation
    surnameInput.addEventListener("input", function () {
        if (surnameInput.value.trim() !== "") {
            surnameError.style.display = "none";
        } else {
            surnameError.style.display = "block";
            surnameError.textContent = "Please enter your surname.";
        }
    });


    // Show or hide email error based on validation
    emailInput.addEventListener("input", function () {
        if (validateEmail(emailInput.value)) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "block";
            emailError.textContent = "Please enter a valid email address.";
        }
    });

    // Show or hide phone error based on validation
    phoneInput.addEventListener("input", function () {
        if (validatePhone(phoneInput.value)) {
            phoneError.style.display = "none";
        } else {
            phoneError.style.display = "block";
            phoneError.textContent = "Please enter a valid phone number in international format (e.g., +123456789).";
        }
    });

    // Event listeners for price calculation
    zoznam1.addEventListener("change", updatePhoneModels);
    zoznam2.addEventListener("change", updatePhonePrice);
    zoznam3.addEventListener("change", updatePhonePrice);
    protectorCheckbox.addEventListener("change", updateAccessoryPrice);
    caseCheckbox.addEventListener("change", updateAccessoryPrice);
    plainColorCase.addEventListener("change", updateAccessoryPrice);
    imageCase.addEventListener("change", updateAccessoryPrice);
    chargerCheckbox.addEventListener("change", updateAccessoryPrice);

    // Function to update phone models based on brand selection
    function updatePhoneModels() {
        const models = phoneModelPrices[zoznam1.value];

        zoznam2.innerHTML = '<option value="">Vyberte</option>';

        if (models) {
            for (const model in models) {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = `${model} - ${models[model]} EUR`;
                zoznam2.appendChild(option);
            }
        }
        updatePhonePrice();
    }

    // Function to update phone price based on model and memory selection
    function updatePhonePrice() {
        const selectedBrand = zoznam1.value;
        const selectedModel = zoznam2.value;
        const selectedStorage = zoznam3.options[zoznam3.selectedIndex];
        let basePrice = 0;

        if (selectedBrand && selectedModel) {
            basePrice = phoneModelPrices[selectedBrand][selectedModel];
        }

        // Calculate additional cost based on memory storage
        const storagePrice = selectedStorage ? parseInt(selectedStorage.getAttribute("data-price")) : 0;

        currentPhonePrice = basePrice + storagePrice;
        phonePriceElement.textContent = `Total Phone Price: ${currentPhonePrice} EUR`;
        updateTotalPrice();
    }

    // Function to update accessory price based on selected options
    function updateAccessoryPrice() {
        currentAccessoriesPrice = 0;
        if (protectorCheckbox.checked) currentAccessoriesPrice += 5;
        if (chargerCheckbox.checked) currentAccessoriesPrice += 15;

        if (caseCheckbox.checked) {
            if (plainColorCase.checked) currentAccessoriesPrice += 10;
            if (imageCase.checked) currentAccessoriesPrice += 15;
        }

        accessoriesPriceElement.textContent = `Total Accessories Price: ${currentAccessoriesPrice} EUR`;
        updateTotalPrice();
    }

    // Function to update the total price
    function updateTotalPrice() {
        const total = currentPhonePrice + currentAccessoriesPrice;
        totalPriceElement.textContent = `Total Price: ${total} EUR`;
    }

    flag = 0;



    // Show the summary modal before form submission
    showSummaryBtn.addEventListener("click", function () {
        // Check if the email is valid before showing the summary
        if (!validateEmail(emailInput.value)) {
            emailError.style.display = "block";
            emailError.textContent = "Enter a valid email address! >:(";
            flag = 1;
        }
        // Check if the name is not empty
        const nameInput = document.getElementById("name");
        if (nameInput.value.trim() === "") {
            nameError.style.display = "block";
            nameError.textContent = "Enter a name! >:(";
            flag = 1;
        }

        // Check if the name is not empty
        const surnameInput = document.getElementById("name");
        if (nameInput.value.trim() === "") {
            surnameError.style.display = "block";
            surnameError.textContent = "Enter a surname! >:(";
            flag = 1;
        }

        const phoneInput = document.getElementById("name");
        if (nameInput.value.trim() === "") {
            phoneError.style.display = "block";
            phoneError.textContent = "What is your phone >:(";
            flag = 1;
        }

        if (flag == 1) {
            flag = 0;
            return;
        }


        // Gather form data to display in the modal
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const gender = document.querySelector("input[name='gender']:checked")?.value || "Not selected";
        const dob = document.getElementById("dob").value;
        const age = document.getElementById("age").value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const phoneBrand = zoznam1.value;
        const phoneModel = zoznam2.value;
        const memoryStorage = zoznam3.value;
        const protector = protectorCheckbox.checked ? "Yes" : "No";
        const caseType = caseCheckbox.checked ? (plainColorCase.checked ? "Plain Color Case" : imageCase.checked ? "Case with Image" : "Not selected") : "No";
        const charger = chargerCheckbox.checked ? "Yes" : "No";

        // Display summary
        summaryContent.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Surname:</strong> ${surname}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Phone Brand:</strong> ${phoneBrand}</p>
            <p><strong>Phone Model:</strong> ${phoneModel}</p>
            <p><strong>Memory Storage:</strong> ${memoryStorage}</p>
            <p><strong>Screen Protector:</strong> ${protector}</p>
            <p><strong>Phone Case:</strong> ${caseType}</p>
            <p><strong>Charger:</strong> ${charger}</p>
            <p><strong>Total Price:</strong> ${document.getElementById("totalPrice").textContent}</p>
        `;

        // Show the modal
        summaryModal.style.display = "block";
    });

    // Confirm and submit the form
    confirmOrderBtn.addEventListener("click", function () {
        summaryModal.style.display = "none";
        form.submit(); // Submit the form after user confirms
    });

    // Close the modal
    closeModal.addEventListener("click", function () {
        summaryModal.style.display = "none";
    });

    // Close the modal when clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target == summaryModal) {
            summaryModal.style.display = "none";
        }
    });
});
