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
    const phoneError = document.getElementById("phoneError");
    const phoneInput = document.getElementById("phone");
    const showDivBtn = document.getElementById("showDivBtn");
    const hiddenDiv = document.getElementById("hiddenDiv");

    const ageError = document.getElementById("ageError");


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

    const specialRequestsInput = document.getElementById("specialRequests");

    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");


    let currentAccessoriesPrice = 0;
    let currentPhonePrice = 0;

    // Base prices and storage options for phone models
    const phoneModelData = {
        "apple": {
            "iPhone 12": { price: 600, storageOptions: { "64GB": 50, "128GB": 100, "256GB": 150 } },
            "iPhone 13": { price: 700, storageOptions: { "128GB": 100, "256GB": 150, "512GB": 200 } },
            "iPhone 14": { price: 800, storageOptions: { "128GB": 100, "256GB": 150, "512GB": 200 } }
        },
        "samsung": {
            "Galaxy S21": { price: 650, storageOptions: { "128GB": 100, "256GB": 150 } },
            "Galaxy Note 20": { price: 750, storageOptions: { "256GB": 150, "512GB": 200 } },
            "Galaxy A52": { price: 450, storageOptions: { "64GB": 50, "128GB": 100 } }
        },
        "xiaomi": {
            "Redmi Note 10": { price: 200, storageOptions: { "64GB": 50, "128GB": 100 } },
            "Mi 11": { price: 400, storageOptions: { "128GB": 100, "256GB": 150 } },
            "Poco X3": { price: 300, storageOptions: { "64GB": 50, "128GB": 100, "256GB": 150 } }
        },
        "huawei": {
            "P30": { price: 400, storageOptions: { "64GB": 50, "128GB": 100 } },
            "P40 Pro": { price: 600, storageOptions: { "128GB": 100, "256GB": 150 } },
            "Mate 40": { price: 700, storageOptions: { "256GB": 150, "512GB": 200 } }
        },
        "oneplus": {
            "OnePlus 8": { price: 500, storageOptions: { "128GB": 100, "256GB": 150 } },
            "OnePlus 9": { price: 600, storageOptions: { "128GB": 100, "256GB": 150, "512GB": 200 } },
            "Nord": { price: 350, storageOptions: { "64GB": 50, "128GB": 100 } }
        }
    };

    dobInput.addEventListener("change", function () {
        const dobValue = dobInput.value;
        if (dobValue) {
            const age = calculateAge(new Date(dobValue));
            ageInput.value = age;
        }
    });

    // Allow manual changes to age
    ageInput.addEventListener("input", function () {
        const manualAge = parseInt(ageInput.value, 10);
        if (!isNaN(manualAge) && manualAge > 0) {
            ageInput.value = manualAge;
        }
    });

    // Function to calculate age
    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    // Add an event listener to the button
    showDivBtn.addEventListener("click", function () {
        if (hiddenDiv.style.display === "none" || hiddenDiv.style.display === "") {
            hiddenDiv.style.display = "block";
        } else {
            hiddenDiv.style.display = "none";
        }
    });

    // Email validation function
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

    // Name input validation
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim() !== "") {
            nameError.style.display = "none";
        } else {
            nameError.style.display = "block";
            nameError.textContent = "Please enter your name.";
        }
    });

    //age input validation
    ageInput.addEventListener("input", function () {
        if (ageInput.value >= 0) {
            ageError.style.display = "none";
        } else {
            ageError.style.display = "block";
            ageError.textContent = "Please enter a valid age!";
        }
    });
    // dob input validation
    dobInput.addEventListener("input", function () {
        if (dobInput.value.trim() !== "") {
            ageError.style.display = "none";
        } else {
            ageError.style.display = "block";
            ageError.textContent = "Please enter your date of birth.";
        }
    });



    // Surname input validation
    surnameInput.addEventListener("input", function () {
        if (surnameInput.value.trim() !== "") {
            surnameError.style.display = "none";
        } else {
            surnameError.style.display = "block";
            surnameError.textContent = "Please enter your surname.";
        }
    });

    // Email input validation
    emailInput.addEventListener("input", function () {
        if (validateEmail(emailInput.value)) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "block";
            emailError.textContent = "Please enter a valid email address.";
        }
    });

    // Phone input validation
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
    zoznam2.addEventListener("change", updateStorageOptions);
    zoznam3.addEventListener("change", updatePhonePrice);
    protectorCheckbox.addEventListener("change", updateAccessoryPrice);
    caseCheckbox.addEventListener("change", function () {
        const isChecked = caseCheckbox.checked;
        const caseOptions = document.getElementById("caseOptions");
        caseOptions.style.display = isChecked ? "block" : "none";
        updateAccessoryPrice();
    });
    plainColorCase.addEventListener("change", updateAccessoryPrice);
    imageCase.addEventListener("change", updateAccessoryPrice);
    chargerCheckbox.addEventListener("change", updateAccessoryPrice);

    // Update phone models based on brand selection
    function updatePhoneModels() {
        const models = phoneModelData[zoznam1.value];
        zoznam2.innerHTML = '<option value="">Vyberte</option>';

        if (models) {
            for (const model in models) {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = `${model} - ${models[model].price} EUR`;
                zoznam2.appendChild(option);
            }
        }

        // Reset storage options when the model changes
        zoznam3.innerHTML = '<option value="">Vyberte</option>';
        updatePhonePrice();
    }

    // Update storage options based on selected model
    function updateStorageOptions() {
        const selectedBrand = zoznam1.value;
        const selectedModel = zoznam2.value;
        const modelData = phoneModelData[selectedBrand]?.[selectedModel];

        zoznam3.innerHTML = '<option value="">Vyberte</option>';

        if (modelData) {
            for (const storage in modelData.storageOptions) {
                const option = document.createElement("option");
                option.value = storage;
                option.textContent = `${storage} - ${modelData.storageOptions[storage]} EUR`;
                option.setAttribute("data-price", modelData.storageOptions[storage]);
                zoznam3.appendChild(option);
            }
        }

        updatePhonePrice();
    }

    // Update phone price based on model and memory selection
    function updatePhonePrice() {
        const selectedBrand = zoznam1.value;
        const selectedModel = zoznam2.value;
        const selectedStorage = zoznam3.options[zoznam3.selectedIndex];
        let basePrice = 0;

        if (selectedBrand && selectedModel) {
            basePrice = phoneModelData[selectedBrand][selectedModel].price;
        }

        // Calculate additional cost based on memory storage
        const storagePrice = selectedStorage ? parseInt(selectedStorage.getAttribute("data-price")) : 0;

        currentPhonePrice = basePrice + storagePrice;
        phonePriceElement.textContent = `Total Phone Price: ${currentPhonePrice} EUR`;
        updateTotalPrice();
    }

    // Update accessory price based on selected options
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

    // Update the total price
    function updateTotalPrice() {
        const total = currentPhonePrice + currentAccessoriesPrice;
        totalPriceElement.textContent = `Total Price: ${total} EUR`;
    }


    // Update character count as user types
    specialRequestsInput.addEventListener("input", function () {
        const currentLength = specialRequestsInput.value.length;
        charCount.textContent = `${currentLength}/100 characters`;
    });

    // Show the summary modal before form submission
    showSummaryBtn.addEventListener("click", function () {
        let flag = 0;

        // Validate name, surname, and email
        if (nameInput.value.trim() === "") {
            nameError.style.display = "block";
            nameError.textContent = "Enter a name!";
            flag = 1;
        }

        if (surnameInput.value.trim() === "") {
            surnameError.style.display = "block";
            surnameError.textContent = "Enter a surname!";
            flag = 1;
        }

        if (!validateEmail(emailInput.value)) {
            emailError.style.display = "block";
            emailError.textContent = "Enter a valid email address!";
            flag = 1;
        }

        if (!validatePhone(phoneInput.value)) {
            phoneError.style.display = "block";
            phoneError.textContent = "Please enter a valid phone number in international format (e.g., +123456789).";
            flag = 1;
        }

        //check if age >= 0
        if (ageInput.value < 0) {
            ageError.style.display = "block";
            ageError.textContent = "Please enter a valid age!";
            flag = 1;
        }

        if (flag === 1) {
            return;
        }

        // Gather form data to display in the modal
        const name = nameInput.value;
        const surname = surnameInput.value;
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
            <p><strong>Special Requests:</strong> ${specialRequestsInput.value}</p>
            <p><strong>Total Price:</strong> ${totalPriceElement.textContent}</p>
        `;

        summaryModal.style.display = "block";
    });

    // Confirm and submit the form
    confirmOrderBtn.addEventListener("click", function () {
        summaryModal.style.display = "none";
        form.submit();
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
