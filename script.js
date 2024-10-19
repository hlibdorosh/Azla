document.addEventListener("DOMContentLoaded", function () {
    // Form validation and error message handling
    const form = document.getElementById("phoneForm");

    // Fields and error elements
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    const nameInput = document.getElementById("name");
    const nameError = createErrorElement(nameInput, "Please enter a valid name.");

    const surnameInput = document.getElementById("surname");
    const surnameError = createErrorElement(surnameInput, "Please enter a valid surname.");

    const dobInput = document.getElementById("dob");
    const dobError = createErrorElement(dobInput, "Please select a valid date of birth.");

    const genderInputs = document.getElementsByName("gender");
    const genderError = createErrorElement(genderInputs[0].parentElement, "Please select a gender.");

    const ageInput = document.getElementById("age");

    // Event listener to calculate age based on Date of Birth input
    dobInput.addEventListener("change", function () {
        if (dobInput.value) {
            const dob = new Date(dobInput.value);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const monthDiff = today.getMonth() - dob.getMonth();

            // Adjust age if the birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            ageInput.value = age >= 0 ? age : "";
        }
    });

    // Phone selection dropdown
    const zoznam1 = document.getElementById("zoznam1");
    const zoznam2 = document.getElementById("zoznam2");
    const zoznam3 = document.getElementById("zoznam3");

    // Update Phone Model Dropdown Based on Brand Selection
    zoznam1.addEventListener("change", function () {
        const selectedBrand = zoznam1.value;
        updatePhoneModels(selectedBrand);
    });

    function updatePhoneModels(brand) {
        const models = {
            "apple": ["iPhone 12", "iPhone 13", "iPhone 14"],
            "samsung": ["Galaxy S21", "Galaxy Note 20", "Galaxy A52"],
            "xiaomi": ["Redmi Note 10", "Mi 11", "Poco X3"],
            "huawei": ["P30", "P40 Pro", "Mate 40"],
            "oneplus": ["OnePlus 8", "OnePlus 9", "Nord"]
        };

        // Clear existing options
        zoznam2.innerHTML = '<option value="">Vyberte</option>';

        if (models[brand]) {
            models[brand].forEach(model => {
                const option = document.createElement("option");
                option.value = model;
                option.textContent = model;
                zoznam2.appendChild(option);
            });
        }
    }

    // Accessory section elements
    const caseCheckbox = document.getElementById("caseCheckbox");
    const caseOptions = document.getElementById("caseOptions");
    const colorList = document.getElementById("colorList");
    const imageList = document.getElementById("imageList");
    const plainColorCase = document.getElementById("plainColorCase");
    const imageCase = document.getElementById("imageCase");

    // Event listener to show or hide case options
    caseCheckbox.addEventListener("change", function () {
        if (caseCheckbox.checked) {
            caseOptions.style.display = "block";
        } else {
            caseOptions.style.display = "none";
            colorList.style.display = "none";
            imageList.style.display = "none";
            plainColorCase.checked = false;
            imageCase.checked = false;
        }
        updateAccessoryPrice();
    });

    // Show color options when "Plain Color Case" is selected
    plainColorCase.addEventListener("change", function () {
        if (plainColorCase.checked) {
            colorList.style.display = "block";
            imageList.style.display = "none";
        }
        updateAccessoryPrice();
    });

    // Show image options when "Case with Image" is selected
    imageCase.addEventListener("change", function () {
        if (imageCase.checked) {
            imageList.style.display = "block";
            colorList.style.display = "none";
        }
        updateAccessoryPrice();
    });

    // Function to update accessory price
    const protectorCheckbox = document.getElementById("protectorCheckbox");
    const chargerCheckbox = document.getElementById("chargerCheckbox");
    const accessoriesPrice = document.getElementById("accessoriesPrice");
    let currentAccessoriesPrice = 0;

    protectorCheckbox.addEventListener("change", updateAccessoryPrice);
    chargerCheckbox.addEventListener("change", updateAccessoryPrice);

    function updateAccessoryPrice() {
        currentAccessoriesPrice = 0;
        if (protectorCheckbox.checked) currentAccessoriesPrice += 5;
        if (chargerCheckbox.checked) currentAccessoriesPrice += 15;

        if (caseCheckbox.checked) {
            if (plainColorCase.checked) currentAccessoriesPrice += 10;
            if (imageCase.checked) currentAccessoriesPrice += 15;
        }

        accessoriesPrice.textContent = `Total Accessories Price: ${currentAccessoriesPrice} EUR`;
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const phonePrice = 0; // Placeholder, integrate with your existing phone price calculation
        const total = phonePrice + currentAccessoriesPrice;
        const totalPriceElement = document.getElementById("totalPrice");
        totalPriceElement.textContent = `Total Price: ${total} EUR`;
    }

    // Helper functions for form validation
    form.addEventListener("submit", function (e) {
        let isValid = true;

        if (!validateEmail(emailInput.value)) {
            emailError.style.display = "block";
            isValid = false;
        } else {
            emailError.style.display = "none";
        }

        if (nameInput.value.trim() === "") {
            nameError.style.display = "block";
            isValid = false;
        } else {
            nameError.style.display = "none";
        }

        if (surnameInput.value.trim() === "") {
            surnameError.style.display = "block";
            isValid = false;
        } else {
            surnameError.style.display = "none";
        }

        // Ensure at least one gender is selected
        if (!isGenderSelected()) {
            genderError.style.display = "block";
            isValid = false;
        } else {
            genderError.style.display = "none";
        }

        if (dobInput.value === "") {
            dobError.style.display = "block";
            isValid = false;
        } else {
            dobError.style.display = "none";
        }

        // Prevent form submission if any validation fails
        if (!isValid) {
            e.preventDefault();
            alert("Please correct the errors before submitting.");
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) && email.split("@")[1].split(".").length > 1;
    }

    function createErrorElement(inputElement, errorMessage) {
        const errorElement = document.createElement("p");
        errorElement.style.color = "red";
        errorElement.style.display = "none";
        errorElement.textContent = errorMessage;
        inputElement.parentElement.appendChild(errorElement);
        return errorElement;
    }

    function isGenderSelected() {
        for (let i = 0; i < genderInputs.length; i++) {
            if (genderInputs[i].checked) {
                return true;
            }
        }
        return false;
    }
});
