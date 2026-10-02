
// MAYA MASHIN TOOL - COMPLETE JAVASCRIPT

// WhatsApp number with India country code
const WHATSAPP_NUMBER = "919217763198";


// 1. MOBILE NAVIGATION
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}


// 2. AUTOMATIC FOOTER YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 3. MACHINE DATA
const machines = {
  press: {
    name: "Press Machine",
    description:
      "For industrial pressing and forming applications.",
    note:
      "Please contact us to confirm capacity, specifications, price and availability."
  },

  lathe: {
    name: "Lathe Machine",
    description:
      "For turning and machining operations in industrial workshops.",
    note:
      "Please confirm machine size, capacity, specifications and availability."
  },

  drilling: {
    name: "Drilling Machine",
    description:
      "For hole-making and industrial workshop applications.",
    note:
      "Please confirm drilling capacity, model, price and availability."
  },

  testing: {
    name: "Final Testing Machine",
    description:
      "For industrial testing and inspection requirements.",
    note:
      "Please confirm the testing method and required specifications."
  }
};


// 4. MACHINE DETAILS POPUP
const machineDialog = document.getElementById("machineDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDescription = document.getElementById("dialogDescription");
const dialogNote = document.getElementById("dialogNote");
const closeDialog = document.getElementById("closeDialog");
const dialogEnquire = document.getElementById("dialogEnquire");

let selectedMachine = "";

document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    selectedMachine = button.dataset.machine;
    const machine = machines[selectedMachine];

    if (
      !machine ||
      !machineDialog ||
      !dialogTitle ||
      !dialogDescription ||
      !dialogNote
    ) {
      return;
    }

    dialogTitle.textContent = machine.name;
    dialogDescription.textContent = machine.description;
    dialogNote.textContent = machine.note;

    if (typeof machineDialog.showModal === "function") {
      machineDialog.showModal();
    }
  });
});

if (closeDialog && machineDialog) {
  closeDialog.addEventListener("click", () => {
    machineDialog.close();
  });

  machineDialog.addEventListener("click", (event) => {
    if (event.target === machineDialog) {
      machineDialog.close();
    }
  });
}

if (dialogEnquire) {
  dialogEnquire.addEventListener("click", () => {
    const machine = machines[selectedMachine];

    if (machine) {
      openWhatsApp(
        `Hello Maya Mashin Tool, I would like details and a quotation for ${machine.name}.`
      );
    }
  });
}


// 5. MACHINE SEARCH AND CATEGORY FILTER
const machineSearch = document.getElementById("machineSearch");
const categoryFilter = document.getElementById("categoryFilter");

const machineCards = [
  ...document.querySelectorAll(".machine-card")
];

const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

function filterMachines() {
  const query = machineSearch
    ? machineSearch.value.trim().toLowerCase()
    : "";

  const category = categoryFilter
    ? categoryFilter.value
    : "all";

  let visible = 0;

  machineCards.forEach((card) => {
    const name = (card.dataset.name || "").toLowerCase();
    const cardCategory = card.dataset.category || "";
    const text = card.textContent.toLowerCase();

    const matchesQuery =
      name.includes(query) || text.includes(query);

    const matchesCategory =
      category === "all" || cardCategory === category;

    const show = matchesQuery && matchesCategory;

    card.hidden = !show;

    if (show) visible++;
  });

  if (resultCount) {
    resultCount.textContent =
      `${visible} machine${visible === 1 ? "" : "s"} found`;
  }

  if (noResults) {
    noResults.hidden = visible !== 0;
  }
}

if (machineSearch) {
  machineSearch.addEventListener("input", filterMachines);
}

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterMachines);
}

filterMachines();


// 6. WHATSAPP ACTION
function openWhatsApp(message) {
  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}


// 7. ENQUIRY FORM
const enquiryForm = document.getElementById("enquiryForm");
const formMessage = document.getElementById("formMessage");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!enquiryForm.reportValidity()) {
      return;
    }

    const data = new FormData(enquiryForm);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const machine = String(data.get("machine") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !phone || !machine || !message) {
      if (formMessage) {
        formMessage.textContent =
          "Please fill in all required fields.";
      }
      return;
    }

    const whatsappMessage = [
      "Hello Maya Mashin Tool, I have a machine enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Machine: ${machine}`,
      `Requirements: ${message}`
    ].join("\n");

    if (formMessage) {
      formMessage.textContent =
        "Opening WhatsApp. Please review and send your enquiry.";
    }

    openWhatsApp(whatsappMessage);
  });
}