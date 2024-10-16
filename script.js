document.addEventListener("DOMContentLoaded", function () {
    // Email validation
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const form = document.getElementById("phoneForm");

    emailInput.addEventListener("input", function () {
        if (validateEmail(emailInput.value)) {
            emailError.style.display = "none";
        } else {
            emailError.style.display = "block";
        }
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]{3,}@[^\s@]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email) && email.split("@")[1].split(".").length > 1;
    }

    form.addEventListener("submit", function (e) {
        if (!validateEmail(emailInput.value)) {
            e.preventDefault();
            emailError.style.display = "block";
            alert("Please correct the email format.");
        } else {
            e.preventDefault(); // Prevent actual submission for modal demonstration
            showModal();
        }
    });

    // Age calculation
    const dobInput = document.getElementById("dob");
    const ageInput = document.getElementById("age");

    dobInput.addEventListener("change", function () {
        const dob = new Date(dobInput.value);
        const age = calculateAge(dob);
        if (!isNaN(age)) {
            ageInput.value = age;
        } else {
            ageInput.value = '';
        }
    });

    function calculateAge(dob) {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDifference = today.getMonth() - dob.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    // Phone selection dropdown
    const phonePrices = {
        apple: 800,
        samsung: 700,
        xiaomi: 600
    };

    const storagePrices = {
        '64GB': 50,
        '128GB': 100,
        '256GB': 150,
        '512GB': 200
    };

    const phoneModels = {
        apple: ['iPhone 12', 'iPhone 13', 'iPhone 14'],
        samsung: ['Galaxy S21', 'Galaxy S22', 'Galaxy A52'],
        xiaomi: ['Mi 11', 'Redmi Note 10', 'Poco X3']
    };

    const memoryOptions = {
        'iPhone 12': ['64GB', '128GB', '256GB'],
        'iPhone 13': ['128GB', '256GB', '512GB'],
        'iPhone 14': ['128GB', '256GB', '512GB'],
        'Galaxy S21': ['128GB', '256GB'],
        'Galaxy S22': ['128GB', '256GB'],
        'Galaxy A52': ['128GB', '256GB'],
        'Mi 11': ['128GB', '256GB'],
        'Redmi Note 10': ['64GB', '128GB'],
        'Poco X3': ['64GB', '128GB']
    };

    const zoznam1 = document.getElementById("zoznam1");
    const zoznam2 = document.getElementById("zoznam2");
    const zoznam3 = document.getElementById("zoznam3");
    const phonePrice = document.getElementById("phonePrice");
    const accessoriesPrice = document.getElementById("accessoriesPrice");
    const totalPrice = document.getElementById("totalPrice");

    let currentPhonePrice = 0;
    let currentStoragePrice = 0;
    let currentAccessoriesPrice = 0;

    zoznam1.addEventListener("change", function () {
        zoznam2.innerHTML = '<option value="">Vyberte</option>';
        const selectedBrand = zoznam1.value;

        if (phoneModels[selectedBrand]) {
            phoneModels[selectedBrand].forEach(function (model) {
                const newOption = document.createElement("option");
                newOption.value = model;
                newOption.textContent = model;
                zoznam2.appendChild(newOption);
            });
            currentPhonePrice = phonePrices[selectedBrand] || 0;
            updateTotalPrice();
        }
    });

    zoznam2.addEventListener("change", function () {
        zoznam3.innerHTML = '<option value="">Vyberte</option>';
        const selectedModel = zoznam2.value;

        if (memoryOptions[selectedModel]) {
            memoryOptions[selectedModel].forEach(function (memory) {
                const newOption = document.createElement("option");
                newOption.value = memory;
                newOption.textContent = memory;
                zoznam3.appendChild(newOption);
            });
        }
    });

    zoznam3.addEventListener("change", function () {
        const selectedStorage = zoznam3.value;
        currentStoragePrice = storagePrices[selectedStorage] || 0;
        updateTotalPrice();
    });

    // Case Options Logic
    const caseCheckbox = document.getElementById("caseCheckbox");
    const caseOptions = document.getElementById("caseOptions");
    const colorList = document.getElementById("colorList");
    const imageList = document.getElementById("imageList");
    const plainColorCase = document.getElementById("plainColorCase");
    const imageCase = document.getElementById("imageCase");

    // Display or hide case options based on checkbox
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

    // Accessory price calculation logic (updated for case types)
    const protectorCheckbox = document.getElementById("protectorCheckbox");
    const chargerCheckbox = document.getElementById("chargerCheckbox");

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
        const total = currentPhonePrice + currentStoragePrice + currentAccessoriesPrice;
        totalPrice.textContent = `Total Price: ${total} EUR`;
    }

    // Modal functionality
    const modal = document.getElementById("successModal");
    const closeModal = document.querySelector(".close");

    function showModal() {
        modal.style.display = "block";
    }

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
