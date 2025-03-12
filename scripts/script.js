let drugData = {};

// Fetch drug data from drugs.json
fetch('/scripts/drug.json')
    .then(response => response.json())
    .then(data => {
        drugData = data;
        populateDrugDropdown();
    })
    .catch(error => console.error("Error loading drug data:", error));

// Populate drug dropdown
function populateDrugDropdown() {
    const drugSelect = document.getElementById("drug");
    Object.keys(drugData).forEach(drug => {
        let option = document.createElement("option");
        option.value = drug;
        option.textContent = drug;
        drugSelect.appendChild(option);
    });
}

// Convert weight between kg and lb
function convertWeight(unit) {
    let weightKg = document.getElementById("weightKg");
    let weightLb = document.getElementById("weightLb");

    if (unit === "kg") {
        weightLb.value = weightKg.value ? (weightKg.value * 2.20462).toFixed(2) : "";
    } else {
        weightKg.value = weightLb.value ? (weightLb.value * 0.453592).toFixed(2) : "";
    }
}

// Calculate dosage
function calculateDosage() {
    const weight = parseFloat(document.getElementById("weightKg").value);
    const concentration = parseFloat(document.getElementById("concentration").value);
    const selectedDrug = document.getElementById("drug").value;
    const resultText = document.getElementById("result");
    const infoCard = document.getElementById("infoCard");

    if (!weight || !concentration || !selectedDrug) {
        resultText.textContent = "Please fill all fields correctly!";
        resultText.style.color = "red";
        infoCard.style.display = "none"; // Keep the info section hidden
        return;
    }

    const mgRequired = weight * drugData[selectedDrug].doseRate;
    const mlRequired = mgRequired / concentration;
    
    resultText.textContent = `Required Dose: ${mlRequired.toFixed(2)} mL`;
    resultText.style.color = "black";

    document.getElementById("reaction").textContent = drugData[selectedDrug].reaction;
    document.getElementById("doseRate").textContent = drugData[selectedDrug].doseRate;
    document.getElementById("calculatedMg").textContent = mgRequired.toFixed(2);

    infoCard.style.display = "block"; // Show the info section after calculation
}
