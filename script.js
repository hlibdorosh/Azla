document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("phoneForm");
    const summaryModal = document.getElementById("summaryModal");
    const summaryContent = document.getElementById("summaryContent");
    const showSummaryBtn = document.getElementById("showSummaryBtn");
    const confirmOrderBtn = document.getElementById("confirmOrderBtn");
    const closeModal = document.querySelector(".close");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

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

    let currentAccessoriesPrice = 0;
    let currentPhonePrice = 0;

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

    // Show or hide email error based on validation
    emailInput.addEventListener("input", function () {
        if (validateEmail(emailInput.value)) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "block";
            emailError.textContent = "Please enter a valid email address.";
        }
    });

    // Event listeners for price calculation
    zoznam1.addEventListener("change", updatePhoneModels);
    zoznam2.addEventListener("change", updateTotalPrice);
    zoznam3.addEventListener("change", updatePhonePrice);
    protectorCheckbox.addEventListener("change", updateAccessoryPrice);
    caseCheckbox.addEventListener("change", updateAccessoryPrice);
    plainColorCase.addEventListener("change", updateAccessoryPrice);
    imageCase.addEventListener("change", updateAccessoryPrice);
    chargerCheckbox.addEventListener("change", updateAccessoryPrice);

    // Function to update phone models based on brand selection
    function updatePhoneModels() {
        const models = {
            "apple": ["iPhone 12", "iPhone 13", "iPhone 14"],
            "samsung": ["Galaxy S21", "Galaxy Note 20", "Galaxy A52"],
            "xiaomi": ["Redmi Note 10", "Mi 11", "Poco X3"],
            "huawei": ["P30", "P40 Pro", "Mate 40"],
            "oneplus": ["OnePlus 8", "OnePlus 9", "Nord"]
        };

        const selectedBrand = zoznam1.value;
        zoznam2.innerHTML = '<option value="">Vyberte</option>';

        if (models[selectedBrand]) {
            models[selectedBrand].forEach(model => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                zoznam2.appendChild(option);
            });
        }
        updateTotalPrice();
    }

    // Function to update phone price based on memory selection
    function updatePhonePrice() {
        const selectedStorage = zoznam3.options[zoznam3.selectedIndex];
        currentPhonePrice = selectedStorage ? parseInt(selectedStorage.getAttribute("data-price")) : 0;
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

    // Show the summary modal before form submission
    showSummaryBtn.addEventListener("click", function () {
        // Check if the email is valid before showing the summary
        if (!validateEmail(emailInput.value)) {
            emailError.style.display = "block";
            emailError.textContent = "Please enter a valid email address.";
            return;
        }

        // Gather form data to display in the modal
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const gender = document.querySelector("input[name='gender']:checked")?.value || "Not selected";
        const dob = document.getElementById("dob").value;
        const age = document.getElementById("age").value;
        const email = emailInput.value;
        const phoneBrand = document.getElementById("zoznam1").value;
        const phoneModel = document.getElementById("zoznam2").value;
        const memoryStorage = document.getElementById("zoznam3").value;
        const protector = document.getElementById("protectorCheckbox").checked ? "Yes" : "No";
        const caseType = document.getElementById("caseCheckbox").checked ? (document.getElementById("plainColorCase").checked ? "Plain Color Case" : document.getElementById("imageCase").checked ? "Case with Image" : "Not selected") : "No";
        const charger = document.getElementById("chargerCheckbox").checked ? "Yes" : "No";

        // Display summary
        summaryContent.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Surname:</strong> ${surname}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Date of Birth:</strong> ${dob}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Email:</strong> ${email}</p>
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
