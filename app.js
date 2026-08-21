const appElement = document.getElementById("app");
const breadcrumbElement = document.getElementById("breadcrumb");
const homeButton = document.getElementById("home-button");
const settingsButton = document.getElementById("settings-button");
const signatureButton = document.getElementById("signature-button");
const sectionBrandElement = document.getElementById("section-brand");

const standardClosingLines = [
  "Hvis du fortsatt her mer behov for bistand, vennligst kontakt Brukerstøtte på telefon 95 12 99 99.",
  "",
  "Med vennlig hilsen",
  "1. Linje Brukerstøtte",
  "NorgesGruppen Data"
];
const ngflytClosingLines = [
  "Hvis du fortsatt her mer behov for bistand, vennligst kontakt NGFLYT direkte på telefon 97 15 49 15.",
  "",
  "Med vennlig hilsen",
  "1. Linje Brukerstøtte",
  "NorgesGruppen Data"
];
const notNgdataVendors = ["Onitio", "Strongpoint", "Profilhus"];
const standardClosingText = standardClosingLines.join("\n");

const settingsStorageKey = "workday-brukerstotte-settings";
const defaultSettings = {
  theme: "day",
  buttonSize: "medium",
  compactWidth: true,
  showBreadcrumbs: false
};

const workdaySpokeUrls = {
  "Nano Org": "nano.norgesgruppen.no",
  "Nano2 Org": "nano2.norgesgruppen.no",
  "Asko Org": "nano.asko.no",
  "Kiwi Org": "nano.kiwi.no",
  "Meny Org": "nano.meny.no",
  "Spar Org": "nano.spar.no",
  "Joker Org": "nano.joker.no",
  "Nærbutikken Org": "nano.narbutikken.no",
  "Kmh Org": "nano.kjopmannshuset.no",
  "Bakehuset Org": "nano.bakehuset.no",
  "Deli de Luca Org": "nano.delideluca.no",
  "Matbørsen Org": "nano.matborsen.no",
  "b2b org": "b2b-ng.okta-emea.com"
};

const jobProfileLookup = JOB_PROFILE_DATA.lookups;
const jobProfilePhraseTranslations = [
  ["Assistant Store Manager", "Assisterende butikksjef"],
  ["Store Department Manager", "Avdelingsleder"],
  ["Store Manager", "Butikksjef"],
  ["Area Manager", "Områdeansvarlig"],
  ["Store Employee", "Butikkmedarbeider"],
  [" - store -", " - butikk -"],
  ["Administration Employee", "Administrasjonsmedarbeider"],
  ["Business Analyst", "Forretningsanalytiker"],
  ["Data Scientist", "Dataanalytiker"],
  ["Master Data", "Masterdata"],
  ["Key Account Management", "Kundeansvar"],
  ["Customer Service Representative", "Kundeservicemedarbeider"],
  ["Sales Representative", "Salgsrepresentant"],
  ["Managing Director", "Administrerende direktør"],
  ["General Counsel", "Juridisk direktør"],
  ["Paralegal", "Advokatassistent"],
  ["Business Controller", "Business Controller"],
  ["Payroll Employee", "Lønningsmedarbeider"],
  ["HR Consultant", "HR-konsulent"],
  ["HR Advisor", "HR-rådgiver"],
  ["HR Coordinator", "HR-koordinator"],
  ["Communication Employee", "Kommunikasjonsmedarbeider"],
  ["Graphic Designer", "Grafisk designer"],
  ["UX/UI Designer", "UX/UI-designer"],
  ["Visual Merchandising", "Visuell vareeksponering"],
  ["Operations Support", "Driftsstøtte"],
  ["Category Management", "Kategoriansvar"],
  ["Product Developer", "Produktutvikler"],
  ["Product Development", "Produktutvikling"],
  ["Project Management", "Prosjektledelse"],
  ["Quality and Safety", "Kvalitet og sikkerhet"],
  ["Facility Management", "Eiendomsdrift"],
  ["Real Estate", "Eiendom"],
  ["Strategy and Business Development", "Strategi og forretningsutvikling"],
  ["Business Relationship Manager", "Forretningsrelasjonsansvarlig"],
  ["System Administrator", "Systemadministrator"],
  ["Product Owner", "Produkteier"],
  ["Scrum Master", "Scrum master"],
  ["Software Engineer", "Programvareutvikler"],
  ["IT Support", "IT-brukerstøtte"],
  ["Consultant", "Konsulent"],
  ["Team Leader", "Teamleder"],
  ["Department Manager", "Avdelingsleder"],
  ["Next in Command", "Nestleder"],
  ["Special Operator", "Spesialoperatør"],
  ["Production Employee", "Produksjonsmedarbeider"],
  ["Transportation Employee", "Transportmedarbeider"],
  ["Transportation Office", "Transportkontor"],
  ["Warehouse Employee", "Lagermedarbeider"],
  ["Production Planner", "Produksjonsplanlegger"],
  ["Traffic Planner", "Trafikkplanlegger"],
  ["Tactical Planner", "Taktisk planlegger"],
  ["Purchaser", "Innkjøper"],
  ["Planner", "Planlegger"],
  ["Advisor", "Rådgiver"],
  ["Senior Advisor", "Seniorrådgiver"],
  ["Senior Consultant", "Senior konsulent"],
  ["Senior", "Senior"],
  ["Director", "Direktør"],
  ["Manager", "Leder"],
  ["Employee", "Medarbeider"],
  ["Operations", "Drift"],
  ["Administration", "Administrasjon"],
  ["Analytics", "Analyse"],
  ["Finance", "Økonomi"],
  ["Accounting", "Regnskap"],
  ["Marketing", "Markedsføring"],
  ["Merchandising", "Vareeksponering"],
  ["Allocation", "Allokering"],
  ["Procurement", "Innkjøp"],
  ["Production", "Produksjon"],
  ["Planning", "Planlegging"],
  ["Distribution", "Distribusjon"],
  ["Transportation", "Transport"],
  ["Warehouse", "Lager"],
  ["Factory", "Produksjon"],
  ["Maintenance", "Vedlikehold"],
  ["Service", "Service"],
  ["Infrastructure", "Infrastruktur"],
  ["Architect", "Arkitekt"],
  ["Technology", "Teknologi"],
  ["Design", "Design"],
  ["Applications", "Applikasjoner"],
  ["Support", "Støtte"],
  ["under 18 years old", "under 18 år"],
  ["Under 18s Group", "Gruppe under 18 år"],
  ["Under 18s", "Under 18 år"],
  ["Gas Station", "Bensinstasjon"],
  ["with Certification", "med fagbrev"],
  ["without Certification", "uten fagbrev"],
  ["Apprentice", "Lærling"],
  ["Hourly", "Timelønn"],
  ["Salary", "Månedslønn"]
];

const jobProfileCategoryTranslations = {
  "Non-field": "Kontor / spesialist",
  Store: "Butikk",
  "Store Manager": "Butikksjef",
  Transportation: "Transport",
  "Transportation Manager": "Transportleder",
  Warehouse: "Lager",
  "Warehouse Manager": "Lagerleder",
  Factory: "Produksjon",
  "Factory Manager": "Produksjonsleder",
  Maintenance: "Vedlikehold",
  "Maintenance Manager": "Vedlikeholdsleder"
};

const jobProfileManagementTranslations = {
  "Individual Contributor": "Medarbeider",
  "Middle Management": "Mellomleder",
  "Top Management": "Toppleder"
};

function cleanJobProfileText(value) {
  return String(value || "")
    .replaceAll("\u200b", "")
    .replaceAll("\u00a0", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function translateJobProfileText(value) {
  let translated = cleanJobProfileText(value);

  jobProfilePhraseTranslations.forEach(([source, target]) => {
    translated = translated.replaceAll(source, target);
  });

  return cleanJobProfileText(translated);
}

function translateJobProfileClassification(value) {
  return cleanJobProfileText(value)
    .replaceAll("DATA SCIENTIST", "DATAANALYTIKER")
    .replaceAll("KEY ACCOUNT MANAGER", "KUNDEANSVARLIG");
}

function getOverarchingJobProfile(profileName) {
  return cleanJobProfileText(profileName)
    .replace(/\s*[-–—]\s*(?:Månedslønn|Timelønn)\s*$/i, "")
    .replace(/\s+(?:VIII|VII|VI|IX|IV|III|II|X|V|I)(?=\s*(?:[-–—]|\/|$))/g, "")
    .replace(/\s*[-–—]\s*(?:store|butikk)\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getJobProfileLevel(profileName) {
  const match = cleanJobProfileText(profileName).match(/\b(VIII|VII|VI|IX|IV|III|II|X|V|I)\b(?=\s*(?:[-–—]|\/|$))/);
  return match ? match[1] : "";
}

function getJobProfileLevelNumber(level) {
  const levels = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
  return levels[level] || 99;
}

const jobProfiles = JOB_PROFILE_DATA.rows.map((row) => {
  const rawProfile = row[1];
  const translatedProfile = translateJobProfileText(rawProfile);
  const rawTitle = jobProfileLookup.title[row[2]];
  const rawGroup = jobProfileLookup.group[row[3]];
  const rawFamily = jobProfileLookup.family[row[4]];
  const rawCategory = jobProfileLookup.category[row[5]];
  const rawManagement = jobProfileLookup.management[row[6]];
  const rawPay = jobProfileLookup.pay[row[7]];
  const rawClassification = jobProfileLookup.classification[row[9]];

  return {
    code: row[0],
    rawProfile,
    rawGroup,
    rawFamily,
    rawCategory,
    rawManagement,
    rawPay,
    rawClassification,
    profile: translatedProfile,
    baseProfile: getOverarchingJobProfile(translatedProfile),
    level: getJobProfileLevel(rawProfile),
    title: translateJobProfileText(rawTitle),
    group: translateJobProfileText(rawGroup),
    family: translateJobProfileText(rawFamily),
    category: jobProfileCategoryTranslations[rawCategory] || translateJobProfileText(rawCategory),
    management: rawManagement,
    managementLabel: jobProfileManagementTranslations[rawManagement] || translateJobProfileText(rawManagement),
    pay: rawPay,
    payLabel: rawPay === "Salary" ? "Månedslønn" : rawPay === "Hourly" ? "Timelønn" : "Ikke angitt",
    grade: jobProfileLookup.grade[row[8]],
    classification: translateJobProfileClassification(rawClassification),
    workers: row[10]
  };
});

const jobProfileAreaOptions = [
  { value: "store", label: "Butikk", help: "Butikkmedarbeidere og butikkledelse" },
  { value: "administration", label: "Administrasjon", help: "Administrasjons- og støtteprofiler" },
  { value: "warehouse", label: "Lager", help: "Lager og vareflyt" },
  { value: "production", label: "Produksjon", help: "Fabrikk- og produksjonsprofiler" },
  { value: "maintenance", label: "Vedlikehold", help: "Service- og vedlikeholdsprofiler" },
  { value: "transportation", label: "Transport", help: "Transport- og distribusjonsprofiler" },
  { value: "other", label: "Øvrige jobbprofiler", help: "Andre fag-, kontor- og spesialistprofiler" }
];

const nanoOrganizations = [
  "Kiwi Org",
  "Meny Org",
  "Joker Org",
  "Spar Org",
  "Nærbutikken Org",
  "Asko Org",
  "Bakehuset Org",
  "b2b org",
  "Deli de Luca Org",
  "Kmh Org",
  "Matbørsen Org",
  "Nano Org",
  "Nano2 Org"
];

const nanoOrganizationUrls = {
  "Nano Org": "http://nano.norgesgruppen.no",
  "Nano2 Org": "http://nano2.norgesgruppen.no",
  "Asko Org": "http://nano.asko.no",
  "Kiwi Org": "http://nano.kiwi.no",
  "Meny Org": "http://nano.meny.no",
  "Spar Org": "http://nano.spar.no",
  "Joker Org": "http://nano.joker.no",
  "Nærbutikken Org": "http://nano.narbutikken.no",
  "Kmh Org": "http://nano.kjopmannshuset.no",
  "Bakehuset Org": "http://nano.bakehuset.no",
  "Deli de Luca Org": "http://nano.delideluca.no",
  "Matbørsen Org": "http://nano.matborsen.no",
  "b2b org": "https://b2b-ng.okta-emea.com"
};

const state = {
  currentView: "home",
  currentScenario: null,
  formData: {},
  draftData: null,
  settingsOpen: false,
  settings: loadSettings()
};

homeButton.addEventListener("click", goHome);
settingsButton.addEventListener("click", toggleSettingsPanel);
if (signatureButton) {
  signatureButton.addEventListener("click", copyStandardClosingToClipboard);
}

applySettings();
renderApp();

function renderApp() {
  renderSectionBrand();
  updateBreadcrumb();
  renderSettingsPanel();

  if (state.currentView === "home") {
    renderHome();
    return;
  }

  if (state.currentView === "scenario") {
    renderScenario();
    return;
  }

  if (state.currentView === "draft") {
    renderDraft();
  }
}

function renderSectionBrand() {
  if (!sectionBrandElement) {
    return;
  }

  const brands = {
    nano: {
      className: "section-brand--nano",
      ariaLabel: "NANO",
      image: "nano-logo.png"
    },
    workday: {
      className: "section-brand--workday",
      ariaLabel: "Workday",
      image: "workday-logo.png"
    }
  };
  const brand = state.currentView === "home"
    ? {
        className: "section-brand--norgesgruppen",
        ariaLabel: "NorgesGruppen",
        image: "norgesgruppen-logo.png"
      }
    : brands[state.currentScenario];

  if (!brand) {
    sectionBrandElement.className = "section-brand hidden";
    sectionBrandElement.removeAttribute("aria-label");
    sectionBrandElement.textContent = "";
    return;
  }

  sectionBrandElement.className = `section-brand ${brand.className}`;
  sectionBrandElement.setAttribute("aria-label", brand.ariaLabel);
  sectionBrandElement.innerHTML = brand.image
    ? `<img class="section-brand__image" src="${brand.image}" alt="${brand.ariaLabel}" />`
    : `<span class="section-brand__mark" aria-hidden="true"></span><span>${brand.label}</span>`;
}

function goHome() {
  state.currentView = "home";
  state.currentScenario = null;
  state.formData = {};
  state.draftData = null;
  renderApp();
}

function openScenario(type) {
  state.currentView = "scenario";
  state.currentScenario = type;
  state.formData = {};
  state.draftData = null;
  renderApp();
}

function showDraft(draftData) {
  state.currentView = "draft";
  state.draftData = draftData;
  renderApp();
}

function toggleSettingsPanel() {
  state.settingsOpen = !state.settingsOpen;
  renderSettingsPanel();
}

function updateBreadcrumb() {
  const parts = ["Hjem"];

  if (state.currentScenario === "nano") {
    parts.push("NANO-innlogging");
  }

  if (state.currentScenario === "workday") {
    parts.push("Workday-innlogging");

    if (state.formData.workdayType === "job-profile") {
      parts.push("Jobbprofil-velger");
    }
  }

  if (state.currentScenario === "user-s") {
    parts.push("User S");

    if (state.formData.userSType === "ngflyt") {
      parts.push("NGFLYT");
    }

    if (state.formData.userSType === "not-ngdata") {
      parts.push("Ikke NGdata-sak");

      if (state.formData.userSVendor) {
        parts.push(state.formData.userSVendor);
      }
    }
  }

  if (state.currentView === "draft") {
    parts.push("Utkast");
  }

  breadcrumbElement.textContent = parts.join(" > ");
  breadcrumbElement.classList.toggle("hidden", !state.settings.showBreadcrumbs);
}

function renderHome() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>Hva gjelder feilen?</h1>

      <div class="home-grid">
        <button class="card-button" type="button" data-scenario="nano" aria-label="NANO-innlogging">
          <strong>NANO</strong>
        </button>

        <button class="card-button" type="button" data-scenario="workday" aria-label="Workday-innlogging">
          <strong>Workday</strong>
        </button>

        <button class="card-button" type="button" data-scenario="user-s" aria-label="User-S">
          <strong>User-S</strong>
        </button>
      </div>
    </section>
  `;

  const scenarioButtons = appElement.querySelectorAll("[data-scenario]");

  scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openScenario(button.dataset.scenario);
    });
  });
}

function renderScenario() {
  if (state.currentScenario === "nano") {
    renderNanoScenario();
    return;
  }

  if (state.currentScenario === "workday") {
    renderWorkdayScenario();
    return;
  }

  if (state.currentScenario === "user-s") {
    renderUserSScenario();
  }
}

function renderUserSScenario() {
  const userSType = state.formData.userSType;

  if (!userSType) {
    renderUserSTypePicker();
    return;
  }

  if (userSType === "ngflyt") {
    renderUserSNgflytOptions();
    return;
  }

  if (userSType === "not-ngdata") {
    renderUserSNotNgdataOptions();
  }
}

function renderUserSTypePicker() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>User-S</h1>

      <div class="home-grid">
        <button class="card-button" type="button" data-user-s-type="ngflyt">
          <strong>NGFLYT</strong>
        </button>

        <button class="card-button" type="button" data-user-s-type="not-ngdata">
          <strong>Ikke NGdata-sak</strong>
        </button>
      </div>

      <div class="actions">
        <button id="back-to-home-from-user-s" class="secondary-button" type="button">Tilbake</button>
      </div>
    </section>
  `;

  const typeButtons = appElement.querySelectorAll("[data-user-s-type]");
  const backButton = document.getElementById("back-to-home-from-user-s");

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.formData = {
        ...state.formData,
        userSType: button.dataset.userSType,
        userSVendor: null
      };
      renderApp();
    });
  });

  backButton.addEventListener("click", goHome);
}

function renderUserSNgflytOptions() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>NGFLYT</h1>

      <div class="home-grid">
        <button class="card-button" type="button" data-ngflyt-option="same-password">
          <strong>Med samme passord</strong>
        </button>

        <button class="card-button" type="button" data-ngflyt-option="new-password">
          <strong>Med nytt passord</strong>
        </button>
      </div>

      <div class="actions">
        <button id="back-to-user-s-options" class="secondary-button" type="button">Tilbake</button>
      </div>
    </section>
  `;

  const optionButtons = appElement.querySelectorAll("[data-ngflyt-option]");
  const backButton = document.getElementById("back-to-user-s-options");

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const draftData = buildNgflytDraft(button.dataset.ngflytOption);
      showDraft(draftData);
    });
  });

  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      userSType: null,
      userSVendor: null
    };
    renderApp();
  });
}

function renderUserSNotNgdataOptions() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>Ikke NGdata-sak</h1>

      <div class="home-grid">
        ${notNgdataVendors
          .map(
            (vendor) => `
              <button class="card-button" type="button" data-not-ngdata-vendor="${escapeAttribute(vendor)}">
                <strong>${escapeHtml(vendor)}</strong>
              </button>
            `
          )
          .join("")}
      </div>

      <div class="actions">
        <button id="back-to-user-s-from-not-ngdata" class="secondary-button" type="button">Tilbake</button>
      </div>
    </section>
  `;

  const vendorButtons = appElement.querySelectorAll("[data-not-ngdata-vendor]");
  const backButton = document.getElementById("back-to-user-s-from-not-ngdata");

  vendorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const vendor = button.dataset.notNgdataVendor;
      state.formData = {
        ...state.formData,
        userSVendor: vendor
      };
      const draftData = buildNotNgdataVendorDraft(vendor);
      showDraft(draftData);
    });
  });

  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      userSType: null,
      userSVendor: null
    };
    renderApp();
  });
}

function renderNanoScenario() {
  const nanoType = state.formData.nanoType;

  if (!nanoType) {
    renderNanoTypePicker();
    return;
  }

  if (nanoType === "login") {
    renderNanoForm();
    return;
  }

  if (nanoType === "reactivation") {
    renderNanoReactivationForm();
  }
}

function renderWorkdayScenario() {
  const workdayType = state.formData.workdayType;

  if (!workdayType) {
    renderWorkdayTypePicker();
    return;
  }

  if (workdayType === "employee") {
    renderWorkdayEmployeeStatusPicker();
    return;
  }

  if (workdayType === "candidate") {
    renderWorkdayCandidateOptions();
    return;
  }

  if (workdayType === "job-profile") {
    renderJobProfileCalculator();
  }
}

function renderNanoForm() {
  const formData = state.formData;

  appElement.innerHTML = `
    <section class="panel">
      <h1>NANO-innlogging</h1>

      <form id="nano-form" class="form-grid">
        <div class="field-group">
          <label for="nano-username">Brukernavn</label>
          <input id="nano-username" name="username" type="text" autocomplete="off" value="${escapeAttribute(formData.username || "")}" />
        </div>

        <div class="field-group">
          <label for="nano-spoke">Spoke / miljø</label>
          <select id="nano-spoke" name="spoke">
            <option value="">Velg org</option>
            ${renderNanoOrganizationOptions(formData.spoke)}
          </select>
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Lag utkast</button>
          <button id="back-to-nano-type-picker" class="secondary-button" type="button">Tilbake</button>
        </div>

        <div id="nano-error" class="error-message hidden"></div>
      </form>
    </section>
  `;

  const nanoForm = document.getElementById("nano-form");
  const backButton = document.getElementById("back-to-nano-type-picker");
  nanoForm.addEventListener("submit", handleNanoSubmit);
  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      nanoType: null,
      username: "",
      spoke: ""
    };
    renderApp();
  });
}

function renderNanoTypePicker() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>NANO</h1>

      <div class="home-grid">
        <button class="card-button" type="button" data-nano-type="login">
          <strong>Innlogging</strong>
        </button>

        <button class="card-button card-button--info" type="button" data-nano-type="reactivation">
          <strong>Reaktivering</strong>
          <span>Pending user action</span>
        </button>
      </div>
    </section>
  `;

  const typeButtons = appElement.querySelectorAll("[data-nano-type]");

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.formData = {
        ...state.formData,
        nanoType: button.dataset.nanoType,
        username: "",
        name: "",
        spoke: ""
      };
      renderApp();
    });
  });
}

function renderNanoReactivationForm() {
  const formData = state.formData;

  appElement.innerHTML = `
    <section class="panel">
      <h1>Reaktivering</h1>

      <form id="nano-reactivation-form" class="form-grid">
        <div class="field-group">
          <label for="nano-reactivation-name">Navn</label>
          <input id="nano-reactivation-name" name="name" type="text" autocomplete="off" value="${escapeAttribute(formData.name || "")}" />
        </div>

        <div class="field-group">
          <label for="nano-reactivation-username">Brukernavn</label>
          <input id="nano-reactivation-username" name="username" type="text" autocomplete="off" value="${escapeAttribute(formData.username || "")}" />
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Lag utkast</button>
          <button id="back-to-nano-options" class="secondary-button" type="button">Tilbake</button>
        </div>

        <div id="nano-reactivation-error" class="error-message hidden"></div>
      </form>
    </section>
  `;

  const form = document.getElementById("nano-reactivation-form");
  const backButton = document.getElementById("back-to-nano-options");

  form.addEventListener("submit", handleNanoReactivationSubmit);
  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      nanoType: null,
      username: "",
      name: ""
    };
    renderApp();
  });
}

function renderWorkdayForm() {
  const formData = state.formData;
  const showSpokeField = formData.employeeStatus === "active";

  appElement.innerHTML = `
    <section class="panel">
      <h1>Workday-innlogging</h1>

      <form id="workday-form" class="form-grid">
        <div class="field-group">
          <label for="workday-username">Brukernavn</label>
          <input id="workday-username" name="username" type="text" autocomplete="off" value="${escapeAttribute(formData.username || "")}" />
        </div>

        <div id="workday-spoke-field" class="field-group ${showSpokeField ? "" : "hidden"}">
          <label for="workday-spoke">Spoke</label>
          <select id="workday-spoke" name="spoke">
            <option value="">Velg spoke</option>
            ${renderNanoOrganizationOptions(formData.spoke)}
          </select>
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Lag utkast</button>
          <button id="back-to-employee-status" class="secondary-button" type="button">Tilbake</button>
        </div>

        <div id="workday-error" class="error-message hidden"></div>
      </form>
    </section>
  `;

  const workdayForm = document.getElementById("workday-form");
  const backButton = document.getElementById("back-to-employee-status");

  workdayForm.addEventListener("submit", handleWorkdaySubmit);
  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      employeeStatus: null,
      username: "",
      spoke: ""
    };
    renderApp();
  });
}

function renderWorkdayEmployeeStatusPicker() {
  if (!state.formData.employeeStatus) {
    appElement.innerHTML = `
      <section class="panel">
        <h1>Workday-innlogging</h1>

        <div class="home-grid">
          <button class="card-button card-button--danger" type="button" data-employee-status="former">
            <strong>Markert som (sluttet)</strong>
          </button>

          <button class="card-button card-button--success" type="button" data-employee-status="active">
            <strong>Brukeren er ansatt (aktiv) i Workday</strong>
          </button>
        </div>

        <div class="actions">
          <button id="back-to-workday-type-picker" class="secondary-button" type="button">Tilbake</button>
        </div>
      </section>
    `;

    const statusButtons = appElement.querySelectorAll("[data-employee-status]");
    const backButton = document.getElementById("back-to-workday-type-picker");

    statusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        state.formData = {
          ...state.formData,
          employeeStatus: button.dataset.employeeStatus,
          username: "",
          spoke: ""
        };
        renderApp();
      });
    });

    backButton.addEventListener("click", () => {
      state.formData = {};
      renderApp();
    });

    return;
  }

  renderWorkdayForm();
}

function renderWorkdayTypePicker() {
  appElement.innerHTML = `
    <section class="panel">
      <h1>Workday</h1>

      <p class="lead">Velg om du skal håndtere innlogging, kandidatprofil eller finne riktig jobbprofil.</p>

      <div class="home-grid">
        <button class="card-button" type="button" data-workday-type="employee">
          <strong>Ansatt bruker</strong>
        </button>

        <button class="card-button" type="button" data-workday-type="candidate">
          <strong>Kandidat-profil</strong>
        </button>

        <button class="card-button card-button--info" type="button" data-workday-type="job-profile">
          <strong>Jobbprofil-velger</strong>
          <span>Finn korrekt jobbprofil steg for steg</span>
        </button>
      </div>

      <div class="actions">
        <button id="back-to-home-from-workday" class="secondary-button" type="button">Tilbake</button>
      </div>
    </section>
  `;

  const typeButtons = appElement.querySelectorAll("[data-workday-type]");
  const backButton = document.getElementById("back-to-home-from-workday");

  typeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.formData = {
        workdayType: button.dataset.workdayType
      };
      renderApp();
    });
  });

  backButton.addEventListener("click", goHome);
}

function renderJobProfileCalculator() {
  const filters = state.formData.jobProfileFilters || {};
  const selectedRole = ["manager", "apprentice"].includes(filters.role) ? filters.role : "employee";
  const selectedArea = filters.area || "store";
  const selectedAge = filters.age || "not-relevant";
  const selectedCertification = ["not-relevant", "apprentice"].includes(filters.certification)
    ? "unmarked"
    : filters.certification || "unmarked";
  const selectedPay = filters.pay || "not-relevant";

  appElement.innerHTML = `
    <section class="panel calculator-panel">
      <div class="calculator-header">
        <div>
          <p class="eyebrow">Workday-verktøy</p>
          <h1>Jobbprofil-velger</h1>
          <p class="lead">Svar på spørsmålene for å snevre inn til jobbprofilene som passer behovet.</p>
        </div>
      </div>

      <form id="job-profile-calculator-form" class="calculator-form">
        <div class="calculator-grid">
          <div class="field-group">
            <label for="job-profile-area">Arbeidsområde</label>
            <select id="job-profile-area" name="area">
              ${jobProfileAreaOptions
                .map(
                  (option) =>
                    `<option value="${option.value}" ${isSelected(selectedArea, option.value)}>${escapeHtml(option.label)}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="field-group">
            <label for="job-profile-role">Rolle</label>
            <select id="job-profile-role" name="role">
              <option value="employee" ${isSelected(selectedRole, "employee")}>Medarbeider</option>
              <option value="manager" ${isSelected(selectedRole, "manager")}>Leder</option>
              <option value="apprentice" ${isSelected(selectedRole, "apprentice")}>Lærling</option>
            </select>
          </div>

          <div class="field-group ${selectedRole === "apprentice" ? "hidden" : ""}">
            <label for="job-profile-certification">Fagbrev</label>
            <select id="job-profile-certification" name="certification">
              <option value="unmarked" ${isSelected(selectedCertification, "unmarked")}>Umerket</option>
              <option value="with" ${isSelected(selectedCertification, "with")}>Med fagbrev</option>
              <option value="without" ${isSelected(selectedCertification, "without")}>Uten fagbrev</option>
            </select>
          </div>

          <div class="field-group">
            <label for="job-profile-pay">Lønnstype</label>
              <select id="job-profile-pay" name="pay">
              <option value="not-relevant" ${isSelected(selectedPay, "not-relevant")}>Urelevant</option>
              <option value="Salary" ${isSelected(selectedPay, "Salary")}>Månedslønn</option>
              <option value="Hourly" ${isSelected(selectedPay, "Hourly")}>Timelønn</option>
            </select>
          </div>

          <div class="field-group ${["manager", "apprentice"].includes(selectedRole) ? "hidden" : ""}">
            <label for="job-profile-age">Alder</label>
            <select id="job-profile-age" name="age">
              <option value="not-relevant" ${isSelected(selectedAge, "not-relevant")}>Ikke relevant</option>
              <option value="over-18" ${isSelected(selectedAge, "over-18")}>Over 18 år</option>
              <option value="under-18" ${isSelected(selectedAge, "under-18")}>Under 18 år</option>
            </select>
          </div>
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Finn jobbprofil</button>
          <button id="back-to-workday-types-from-calculator" class="secondary-button" type="button">Tilbake</button>
        </div>
      </form>

      ${filters.submitted ? renderJobProfileResults(filters) : renderJobProfileIntro()}
    </section>
  `;

  document.getElementById("job-profile-calculator-form").addEventListener("submit", handleJobProfileCalculatorSubmit);
  document.getElementById("job-profile-area").addEventListener("change", handleJobProfileFilterChange);
  document.getElementById("job-profile-role").addEventListener("change", handleJobProfileFilterChange);
  document.getElementById("back-to-workday-types-from-calculator").addEventListener("click", () => {
    state.formData = {};
    renderApp();
  });

  bindJobProfileCopyButtons(appElement);
  appElement.querySelectorAll("[data-job-profile-version-select]").forEach((select) => {
    select.addEventListener("change", () => handleJobProfileVersionChange(select));
  });
  bindJobProfileSuggestionToggles(appElement);
}

function bindJobProfileCopyButtons(container) {
  container.querySelectorAll("[data-copy-job-profile]").forEach((button) => {
    button.addEventListener("click", () => copyJobProfileToClipboard(button));
  });
}

function bindJobProfileSuggestionToggles(container) {
  container.querySelectorAll("[data-job-profile-suggestion]").forEach((suggestion) => {
    const infoButton = suggestion.querySelector("[data-job-profile-info-toggle]");

    if (!infoButton) {
      return;
    }

    infoButton.addEventListener("click", () => {
      setJobProfileSuggestionExpanded(suggestion, !suggestion.classList.contains("is-expanded"));
    });
  });
}

function setJobProfileSuggestionExpanded(suggestion, expanded) {
  if (expanded) {
    suggestion.parentElement?.querySelectorAll("[data-job-profile-suggestion].is-expanded").forEach((otherSuggestion) => {
      if (otherSuggestion !== suggestion) {
        otherSuggestion.classList.remove("is-expanded");
        const otherInfoButton = otherSuggestion.querySelector("[data-job-profile-info-toggle]");
        otherInfoButton?.setAttribute("aria-expanded", "false");
        if (otherInfoButton) {
          otherInfoButton.textContent = "Mer info";
        }
      }
    });
  }

  suggestion.classList.toggle("is-expanded", expanded);
  const infoButton = suggestion.querySelector("[data-job-profile-info-toggle]");
  infoButton?.setAttribute("aria-expanded", String(expanded));
  if (infoButton) {
    infoButton.textContent = expanded ? "Mindre info" : "Mer info";
  }
}

function handleJobProfileFilterChange() {
  const filters = state.formData.jobProfileFilters || {};
  const areaElement = document.getElementById("job-profile-area");
  const roleElement = document.getElementById("job-profile-role");
  const role = roleElement.value;
  const area = areaElement.value === "all" ? "store" : areaElement.value;
  const age = document.getElementById("job-profile-age").value;

  state.formData.jobProfileFilters = {
    area,
    role,
    age,
    certification: ["not-relevant", "apprentice"].includes(filters.certification)
      ? "unmarked"
      : filters.certification || "unmarked",
    pay: document.getElementById("job-profile-pay").value,
    submitted: false
  };
  renderApp();
}

function renderJobProfileIntro() {
  return `
    <p class="calculator-prompt">Velg kriterier og trykk «Finn jobbprofil».</p>
  `;
}

function handleJobProfileCalculatorSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const role = formData.get("role");
  const area = formData.get("area") || "store";
  const age = formData.get("age");
  const certification = formData.get("certification") || "unmarked";

  state.formData.jobProfileFilters = {
    area,
    role,
    age: ["manager", "apprentice"].includes(role) ? "not-relevant" : age,
    certification: role === "apprentice" ? "unmarked" : certification,
    pay: formData.get("pay"),
    submitted: true
  };
  renderApp();
}

function renderJobProfileResults(filters) {
  const matches = findJobProfileMatches(filters);
  const suggestions = groupJobProfileMatches(matches, filters);

  if (!suggestions.length) {
    return `
      <section class="calculator-results">
        <div class="results-header">
          <div>
            <p class="eyebrow">Resultat</p>
            <h2>Ingen direkte treff</h2>
          </div>
        </div>
        <p class="calculator-empty">Kombinasjonen finnes ikke i grunnlaget. Prøv andre kriterier eller bytt arbeidsområde.</p>
      </section>
    `;
  }

  const areaLabel = jobProfileAreaOptions.find((option) => option.value === filters.area)?.label || (filters.area === "all" ? "Alle områder" : filters.area);
  const roleLabel = filters.role === "apprentice" ? "Lærling" : filters.role === "manager" ? "Leder" : "Medarbeider";
  const payLabel = filters.pay === "Hourly" ? "Timelønn" : filters.pay === "Salary" ? "Månedslønn" : "Urelevant";
  const ageLabel = filters.age === "under-18" ? "Under 18 år" : filters.age === "over-18" ? "Over 18 år" : "Ikke relevant";

  return `
    <section class="calculator-results" aria-live="polite">
      <div class="results-header">
        <div>
          <p class="eyebrow">Resultat</p>
          <h2>${suggestions.length} ${suggestions.length === 1 ? "forslag" : "forslag"} funnet</h2>
        </div>
        <span class="result-count">${escapeHtml(areaLabel)} · ${roleLabel} · ${payLabel} · ${ageLabel}</span>
      </div>
      <div class="job-profile-suggestions">
        ${suggestions.map((suggestion, index) => renderJobProfileSuggestion(suggestion, index)).join("")}
      </div>
    </section>
  `;
}

function groupJobProfileMatches(matches, filters = {}) {
  const groups = new Map();
  const splitByPay = filters.pay === "not-relevant";

  matches.forEach((profile) => {
    const groupKey = splitByPay ? `${profile.baseProfile}::${profile.pay}` : profile.baseProfile;

    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        name: profile.baseProfile,
        variants: []
      });
    }

    groups.get(groupKey).variants.push(profile);
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      variants: group.variants.sort(
        (first, second) =>
          getJobProfileLevelNumber(first.level) - getJobProfileLevelNumber(second.level) ||
          first.payLabel.localeCompare(second.payLabel)
      )
    }))
    .sort((first, second) => {
      const workerDifference = second.variants[0].workers - first.variants[0].workers;
      const nameDifference = first.name.localeCompare(second.name);
      const payOrder = { Salary: 1, Hourly: 2 };
      const payDifference = (payOrder[first.variants[0].pay] || 99) - (payOrder[second.variants[0].pay] || 99);

      return workerDifference || nameDifference || payDifference;
    });
}

function renderJobProfileSuggestion(group, index) {
  const firstProfile = group.variants[0];
  const selectId = `job-profile-version-${index}`;
  const detailsId = `job-profile-details-${index}`;
  const versionPicker = group.variants.length > 1
    ? `<select id="${selectId}" class="job-profile-version-select" data-job-profile-version-select aria-label="Velg jobbprofilversjon for ${escapeAttribute(group.name)}">
        ${group.variants
          .map(
            (profile) =>
              `<option value="${escapeAttribute(profile.code)}" data-profile-name="${escapeAttribute(profile.profile)}" ${isSelected(profile.code, firstProfile.code) && profile.profile === firstProfile.profile ? "selected" : ""}>${escapeHtml(profile.profile)}</option>`
          )
          .join("")}
      </select>`
    : `<h3 class="job-profile-version-title">${escapeHtml(firstProfile.profile)}</h3>`;

  return `
    <article class="job-profile-suggestion" data-job-profile-suggestion>
      <div class="job-profile-suggestion__header">
        ${versionPicker}
        <button type="button" class="job-profile-info-button" data-job-profile-info-toggle aria-expanded="false" aria-controls="${detailsId}">Mer info</button>
      </div>
      <div id="${detailsId}" class="job-profile-result" data-job-profile-details>
        ${renderJobProfileResultContent(firstProfile)}
      </div>
    </article>
  `;
}

function renderJobProfileResultContent(profile) {
  const versionLabel = profile.level ? `Versjon ${getJobProfileLevelNumber(profile.level)}` : "";
  const profileMeta = [versionLabel, profile.payLabel, `Jobbkode ${profile.code}`].filter(Boolean).join(" · ");

  return `
    <div class="job-profile-result__header">
      <div>
        <p class="job-profile-result__eyebrow">${escapeHtml(profileMeta)}</p>
      </div>
      <button class="copy-small-button" type="button" data-copy-job-profile="${escapeAttribute(profile.code)}" data-copy-job-profile-name="${escapeAttribute(profile.profile)}">Kopier</button>
    </div>
    <div class="job-profile-result__meta">
      <span><strong>Jobbtittel:</strong> ${escapeHtml(profile.title)}</span>
      <span><strong>Lønnsgruppe:</strong> ${escapeHtml(profile.grade || "–")}</span>
      <span><strong>Rolle:</strong> ${escapeHtml(profile.managementLabel)}</span>
    </div>
    <p class="job-profile-result__classification">${escapeHtml(profile.classification)}</p>
  `;
}

function handleJobProfileVersionChange(select) {
  const selectedOption = select.options[select.selectedIndex];
  const profileName = selectedOption?.dataset.profileName;
  const profile =
    jobProfiles.find((item) => item.code === select.value && item.profile === profileName) ||
    jobProfiles.find((item) => item.code === select.value);
  const suggestion = select.closest("[data-job-profile-suggestion]");
  const details = suggestion?.querySelector("[data-job-profile-details]");

  if (!profile || !details) {
    return;
  }

  details.innerHTML = renderJobProfileResultContent(profile);
  bindJobProfileCopyButtons(details);
}

function includesJobProfilePhrase(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function findJobProfileMatches(filters) {
  const apprenticeSelected = filters.role === "apprentice";
  const unmarkedSelected = filters.certification === "unmarked" || filters.certification === "not-relevant";
  const certificationRelevant = filters.area === "store" && filters.role === "employee";
  const ageRelevant = !["manager", "apprentice"].includes(filters.role);

  const matches = jobProfiles.filter((profile) => {
    const jobProfileText = `${profile.rawProfile} ${profile.profile}`.toLowerCase();
    const isApprentice = includesJobProfilePhrase(jobProfileText, ["apprentice", "lærling"]);
    const hasCertification = includesJobProfilePhrase(jobProfileText, ["with certification", "med fagbrev"]);
    const lacksCertification = includesJobProfilePhrase(jobProfileText, ["without certification", "uten fagbrev"]);
    const isUnder18 = jobProfileText.includes("under 18");

    if (apprenticeSelected) {
      if (!isApprentice) {
        return false;
      }
    } else {
      if (unmarkedSelected && (isApprentice || hasCertification || lacksCertification)) {
        return false;
      }

      if (filters.role === "manager" && profile.rawManagement === "Individual Contributor") {
        return false;
      }

      if (filters.role === "employee" && profile.rawManagement !== "Individual Contributor") {
        return false;
      }
    }

    if (!matchesJobProfileArea(profile, filters.area)) {
      return false;
    }

    if (filters.pay !== "not-relevant" && profile.pay !== filters.pay) {
      return false;
    }

    if (ageRelevant && filters.age === "under-18" && !isUnder18) {
      return false;
    }

    if (ageRelevant && filters.age === "over-18" && isUnder18) {
      return false;
    }

    if (certificationRelevant && filters.certification === "with" && !hasCertification) {
      return false;
    }

    if (certificationRelevant && filters.certification === "without" && !lacksCertification) {
      return false;
    }

    return true;
  });

  return matches.sort((first, second) => second.workers - first.workers || first.profile.localeCompare(second.profile));
}

function matchesJobProfileArea(profile, area) {
  if (area === "all") {
    return true;
  }

  if (area === "administration") {
    return profile.rawGroup === "Administration";
  }

  const categoriesByArea = {
    store: ["Store", "Store Manager"],
    warehouse: ["Warehouse", "Warehouse Manager"],
    production: ["Factory", "Factory Manager"],
    maintenance: ["Maintenance", "Maintenance Manager"],
    transportation: ["Transportation", "Transportation Manager"]
  };

  if (categoriesByArea[area]) {
    return categoriesByArea[area].includes(profile.rawCategory);
  }

  return profile.rawCategory === "Non-field" && profile.rawGroup !== "Administration";
}


function renderWorkdayCandidateOptions() {
  const selectedOption = state.formData.candidateType;

  if (selectedOption === "standard") {
    const draftData = buildStandardCandidateDraft();
    showDraft(draftData);
    return;
  }

  if (selectedOption === "internal") {
    renderWorkdayInternalCandidateForm();
    return;
  }

  if (selectedOption === "former-employee") {
    renderWorkdayFormerEmployeeCandidateForm();
    return;
  }

  appElement.innerHTML = `
    <section class="panel">
      <h1>Kandidat-profil</h1>

      <div class="home-grid">
        <button class="card-button" type="button" data-candidate-type="standard">
          <strong>Vanlig kandidat-profilen</strong>
        </button>

        <button class="card-button card-button--info" type="button" data-candidate-type="internal">
          <strong>(Intern)-markering</strong>
        </button>

        <button class="card-button card-button--danger" type="button" data-candidate-type="former-employee">
          <strong>(Tidligere medarbeider)-markering</strong>
        </button>
      </div>

      <div class="actions">
        <button id="back-to-workday-types" class="secondary-button" type="button">Tilbake</button>
      </div>
    </section>
  `;

  const optionButtons = appElement.querySelectorAll("[data-candidate-type]");
  const backButton = document.getElementById("back-to-workday-types");

  optionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.formData = {
        ...state.formData,
        candidateType: button.dataset.candidateType
      };
      renderApp();
    });
  });

  backButton.addEventListener("click", () => {
    state.formData = {};
    renderApp();
  });
}

function renderWorkdayInternalCandidateForm() {
  const formData = state.formData;

  appElement.innerHTML = `
    <section class="panel">
      <h1>(Intern)-markering</h1>

      <form id="internal-candidate-form" class="form-grid">
        <div class="field-group">
          <label for="internal-candidate-username">Brukernavn</label>
          <input id="internal-candidate-username" name="username" type="text" autocomplete="off" value="${escapeAttribute(formData.username || "")}" />
        </div>

        <div class="field-group">
          <label for="internal-candidate-spoke">Spoke</label>
          <select id="internal-candidate-spoke" name="spoke">
            <option value="">Velg spoke</option>
            ${renderNanoOrganizationOptions(formData.spoke)}
          </select>
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Lag utkast</button>
          <button id="back-to-candidate-options" class="secondary-button" type="button">Tilbake</button>
        </div>

        <div id="internal-candidate-error" class="error-message hidden"></div>
      </form>
    </section>
  `;

  const form = document.getElementById("internal-candidate-form");
  const backButton = document.getElementById("back-to-candidate-options");

  form.addEventListener("submit", handleInternalCandidateSubmit);
  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      candidateType: null,
      username: "",
      spoke: ""
    };
    renderApp();
  });
}

function renderWorkdayFormerEmployeeCandidateForm() {
  const formData = state.formData;

  appElement.innerHTML = `
    <section class="panel">
      <h1>(Tidligere medarbeider)-markering</h1>

      <form id="former-employee-candidate-form" class="form-grid">
        <div class="field-group">
          <label for="former-employee-candidate-username">Brukernavn</label>
          <input id="former-employee-candidate-username" name="username" type="text" autocomplete="off" value="${escapeAttribute(formData.username || "")}" />
        </div>

        <div class="actions">
          <button class="primary-button" type="submit">Lag utkast</button>
          <button id="back-to-former-candidate-options" class="secondary-button" type="button">Tilbake</button>
        </div>

        <div id="former-employee-candidate-error" class="error-message hidden"></div>
      </form>
    </section>
  `;

  const form = document.getElementById("former-employee-candidate-form");
  const backButton = document.getElementById("back-to-former-candidate-options");

  form.addEventListener("submit", handleFormerEmployeeCandidateSubmit);
  backButton.addEventListener("click", () => {
    state.formData = {
      ...state.formData,
      candidateType: null,
      username: ""
    };
    renderApp();
  });
}

function renderDraft() {
  const draftData = state.draftData;

  appElement.innerHTML = `
    <section class="panel">
      <h1>Utkast</h1>
      <p class="draft-meta">${draftData.title}</p>

      <div class="draft-box" id="draft-text">${escapeHtml(draftData.body)}</div>

      <div class="actions">
        <button id="copy-draft-button" class="primary-button" type="button">Kopier utkast</button>
        <button id="back-button" class="secondary-button" type="button">Tilbake</button>
      </div>

      <div id="copy-status" class="status-message hidden">Utkast kopiert.</div>
    </section>
  `;

  const copyButton = document.getElementById("copy-draft-button");
  const backButton = document.getElementById("back-button");

  copyButton.addEventListener("click", copyDraftToClipboard);
  backButton.addEventListener("click", goBackToScenario);
}

function handleNanoSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const username = formData.get("username").trim();
  const spoke = formData.get("spoke").trim();

  if (!username || !spoke) {
    showError("nano-error", "Fyll inn alle feltene før du lager utkast.");
    return;
  }

  clearError("nano-error");

  state.formData = {
    ...state.formData,
    username,
    spoke
  };

  const draftData = buildNanoDraft(state.formData);
  showDraft(draftData);
}

function handleNanoReactivationSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const name = formData.get("name").trim();
  const username = formData.get("username").trim();

  if (!name || !username) {
    showError("nano-reactivation-error", "Fyll inn alle feltene før du lager utkast.");
    return;
  }

  clearError("nano-reactivation-error");

  state.formData = {
    ...state.formData,
    name,
    username
  };

  const draftData = buildNanoReactivationDraft(state.formData);
  showDraft(draftData);
}

function handleWorkdaySubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const username = formData.get("username").trim();
  const spoke = formData.get("spoke");
  const employeeStatus = state.formData.employeeStatus;

  if (!username || !employeeStatus) {
    showError("workday-error", "Fyll inn alle feltene før du lager utkast.");
    return;
  }

  if (employeeStatus === "active" && !spoke) {
    showError("workday-error", "Velg spoke for aktiv bruker.");
    return;
  }

  clearError("workday-error");

  state.formData = {
    ...state.formData,
    username,
    spoke
  };

  const draftData = buildWorkdayDraft(state.formData);
  showDraft(draftData);
}

function handleInternalCandidateSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const username = formData.get("username").trim();
  const spoke = formData.get("spoke");

  if (!username || !spoke) {
    showError("internal-candidate-error", "Fyll inn alle feltene før du lager utkast.");
    return;
  }

  clearError("internal-candidate-error");

  state.formData = {
    ...state.formData,
    username,
    spoke
  };

  const draftData = buildInternalCandidateDraft(state.formData);
  showDraft(draftData);
}

function handleFormerEmployeeCandidateSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const username = formData.get("username").trim();

  if (!username) {
    showError("former-employee-candidate-error", "Fyll inn brukernavn før du lager utkast.");
    return;
  }

  clearError("former-employee-candidate-error");

  state.formData = {
    ...state.formData,
    username
  };

  const draftData = buildFormerEmployeeCandidateDraft(state.formData);
  showDraft(draftData);
}

function buildNanoDraft(formData) {
  const nanoUrl = nanoOrganizationUrls[formData.spoke];
  const linkText = nanoUrl || "[Sett inn lenke, f.eks. ASKO Spoke]";

  return {
    title: "Hjem > NANO-innlogging > Utkast",
    body: [
      "Hei,",
      `For å logge inn på Nano, benytt følgende lenke: ${linkText}`,
      "",
      `Brukernavn: ${formData.username}`,
      "",
      "Vi har sendt en reaktiverings-e-post til din registrerte e-postadresse. Dersom du ikke finner e-posten i innboksen, ber vi deg kontrollere søppelpostmappen.",
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildNanoReactivationDraft(formData) {
  return {
    title: "Hjem > NANO-innlogging > Utkast",
    body: [
      "Hei,",
      `Vi har nå sendt reaktivering til NANO-brukeren til ${formData.name} / ${formData.username}. Mailen han mottok utløper om 1 time.`,
      "Om brukeren fortsatt ikke får tilgang, må vedkommende kontakte oss per telefon.",
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildWorkdayDraft(formData) {
  if (formData.employeeStatus === "former") {
    return {
      title: "Hjem > Workday-innlogging > Utkast",
      body: [
        "Hei,",
        `Brukernavn: ${formData.username}`,
        "",
        "For å logge inn på Workday, benytt følgende lenke:",
        "",
        "https://wd3.myworkday.com/norgesgruppen/d/home.htmld?redirect=n",
        "",
        "Logg inn med brukernavnet og passordet du benyttet da du var aktiv bruker.",
        "",
        'Dersom du ikke husker passordet ditt, kan du velge "Glemt passord" på innloggingssiden for å opprette et nytt passord.',
        "",
        ...standardClosingLines
      ].join("\n")
    };
  }

  const spokeUrl = workdaySpokeUrls[formData.spoke];

  if (formData.employeeStatus === "active" && spokeUrl) {
    return {
      title: "Hjem > Workday-innlogging > Utkast",
      body: [
        "Hei,",
        `Brukernavn: ${formData.username}`,
        "",
        "For å logge inn på Workday, benytt følgende lenke:",
        "",
        spokeUrl,
        "",
        ...standardClosingLines
      ].join("\n")
    };
  }

  return {
    title: "Hjem > Workday-innlogging > Utkast",
    body: [
      "Hei,",
      "Denne saken må vurderes manuelt før vi kan gi en sikker anbefaling.",
      "Send gjerne mer informasjon om brukerstatus, spoke og eksakt feilmelding.",
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildInternalCandidateDraft(formData) {
  const spokeUrl = workdaySpokeUrls[formData.spoke];

  return {
    title: "Hjem > Workday-innlogging > Utkast",
    body: [
      "Hei,",
      "Denne kandidatprofilen er markert som intern.",
      "Signeringsoppdraget går derfor til brukerens aktive Workday-bruker via spoke.",
      "",
      `Be brukeren logge inn via ${formData.spoke}: ${spokeUrl}`,
      `Brukernavn: ${formData.username}`,
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildFormerEmployeeCandidateDraft(formData) {
  return {
    title: "Hjem > Workday-innlogging > Utkast",
    body: [
      "Hei,",
      "For å logge inn på Workday, benytt følgende lenke:",
      "",
      "https://wd3.myworkday.com/norgesgruppen/d/home.htmld?redirect=n",
      "",
      "Logg inn med brukernavnet og passordet du benyttet da du var aktiv bruker.",
      "",
      `Brukernavn: ${formData.username}`,
      "",
      'Dersom du ikke husker passordet ditt, kan du velge "Glemt passord" på innloggingssiden for å opprette et nytt passord.',
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildStandardCandidateDraft() {
  return {
    title: "Hjem > Workday-innlogging > Utkast",
    body: [
      "Hei,",
      'For videre innlogging til kandidat-profilen, vennligst bruk informasjonen i e-posten du har mottatt fra NorgesGruppen vedr. fødselsnummer.',
      "",
      "Hvis du ikke finner e-posten, ber vi deg kontrollere innboks og søppelpost.",
      "",
      ...standardClosingLines
    ].join("\n")
  };
}

function buildNgflytDraft(passwordType) {
  const usesSamePassword = passwordType === "same-password";
  const titleSuffix = usesSamePassword ? "med samme passord" : "med nytt passord";
  const messageLine = usesSamePassword
    ? "Vi har gjenåpnet NGFlyt kontoen med samme passord."
    : "Vi har gjenåpnet NGFlyt kontoen med nytt passord.";

  return {
    title: `Hjem > User S > NGFLYT > ${titleSuffix}`,
    body: [
      "Hei,",
      messageLine,
      "",
      ...ngflytClosingLines
    ].join("\n")
  };
}

function buildNotNgdataVendorDraft(vendor) {
  return {
    title: `Hjem > User S > Ikke NGdata-sak > ${vendor}`,
    body: [
      "Hei,",
      `Dette ser ut til å være en sak som må håndteres av leverandøren ${vendor}.`,
      "",
      `Vennligst ta direkte kontakt med ${vendor} for videre bistand.`,
      "",
      ...standardClosingLines
    ].join("\n")
  };
}


function goBackToScenario() {
  state.currentView = "scenario";
  renderApp();
}

async function copyDraftToClipboard() {
  const copyStatus = document.getElementById("copy-status");
  const draftText = state.draftData.body;

  try {
    await navigator.clipboard.writeText(draftText);
    copyStatus.textContent = "Utkast kopiert.";
    copyStatus.classList.remove("hidden");
  } catch (error) {
    copyStatus.textContent = "Kopiering feilet. Marker teksten og kopier manuelt.";
    copyStatus.classList.remove("hidden");
  }
}

async function copyJobProfileToClipboard(button) {
  const profile = jobProfiles.find((item) => item.code === button.dataset.copyJobProfile);

  if (!profile) {
    return;
  }

  try {
    const profileName = button.dataset.copyJobProfileName || profile.profile;
    await navigator.clipboard.writeText(`${profile.code} - ${profileName}`);
    const originalLabel = button.textContent;
    button.textContent = "Kopiert";
    window.setTimeout(() => {
      button.textContent = originalLabel;
    }, 1600);
  } catch (error) {
    button.textContent = "Kopiering feilet";
  }
}

async function copyStandardClosingToClipboard() {
  if (!signatureButton) {
    return;
  }

  const originalLabel = "Med vennlig hilsen";

  try {
    await navigator.clipboard.writeText(standardClosingText);
    signatureButton.textContent = "Kopiert!";
  } catch (error) {
    signatureButton.textContent = "Kopiering feilet";
  }

  window.setTimeout(() => {
    signatureButton.textContent = originalLabel;
  }, 1600);
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function clearError(elementId) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderNanoOrganizationOptions(selectedValue) {
  return nanoOrganizations
    .map((organization) => {
      const selected = isSelected(selectedValue, organization);
      return `<option value="${escapeAttribute(organization)}" ${selected}>${escapeHtml(organization)}</option>`;
    })
    .join("");
}

function renderSettingsPanel() {
  removeExistingSettingsPanel();

  if (!state.settingsOpen) {
    return;
  }

  const panel = document.createElement("section");
  panel.className = "settings-panel";
  panel.innerHTML = `
    <div class="settings-panel__header">
      <h2>Innstillinger</h2>
      <button id="settings-close-button" class="secondary-button" type="button">Lukk</button>
    </div>

    <div class="settings-grid">
      <label class="settings-row" for="compact-width-toggle">
        <span>Kompakt bredde</span>
        <input id="compact-width-toggle" type="checkbox" ${state.settings.compactWidth ? "checked" : ""} />
      </label>

      <label class="settings-row" for="show-breadcrumbs-toggle">
        <span>Vis brødsmuler</span>
        <input id="show-breadcrumbs-toggle" type="checkbox" ${state.settings.showBreadcrumbs ? "checked" : ""} />
      </label>

      <div class="settings-row settings-row--stacked">
        <label for="theme-select">Tema</label>
        <select id="theme-select">
          <option value="day" ${isSelected(state.settings.theme, "day")}>Dagsmodus</option>
          <option value="night" ${isSelected(state.settings.theme, "night")}>Nattmodus</option>
        </select>
      </div>

      <div class="settings-row settings-row--stacked">
        <label for="button-size-select">Knappestørrelse</label>
        <select id="button-size-select">
          <option value="small" ${isSelected(state.settings.buttonSize, "small")}>Liten</option>
          <option value="medium" ${isSelected(state.settings.buttonSize, "medium")}>Medium</option>
          <option value="large" ${isSelected(state.settings.buttonSize, "large")}>Stor</option>
        </select>
      </div>
    </div>
  `;

  document.querySelector(".app-shell").append(panel);

  document.getElementById("settings-close-button").addEventListener("click", toggleSettingsPanel);
  document.getElementById("compact-width-toggle").addEventListener("change", handleCompactWidthToggle);
  document.getElementById("show-breadcrumbs-toggle").addEventListener("change", handleBreadcrumbToggle);
  document.getElementById("theme-select").addEventListener("change", handleThemeChange);
  document.getElementById("button-size-select").addEventListener("change", handleButtonSizeChange);
}

function removeExistingSettingsPanel() {
  const existingPanel = document.querySelector(".settings-panel");

  if (existingPanel) {
    existingPanel.remove();
  }
}

function handleButtonSizeChange(event) {
  state.settings.buttonSize = event.currentTarget.value;
  persistSettings();
  applySettings();
  renderApp();
}

function handleCompactWidthToggle(event) {
  state.settings.compactWidth = event.currentTarget.checked;
  persistSettings();
  applySettings();
}

function handleBreadcrumbToggle(event) {
  state.settings.showBreadcrumbs = event.currentTarget.checked;
  persistSettings();
  renderApp();
}

function handleThemeChange(event) {
  state.settings.theme = event.currentTarget.value;
  persistSettings();
  applySettings();
  renderApp();
}

function loadSettings() {
  try {
    const savedSettings = JSON.parse(localStorage.getItem(settingsStorageKey));

    return {
      ...defaultSettings,
      ...savedSettings
    };
  } catch (error) {
    return { ...defaultSettings };
  }
}

function persistSettings() {
  localStorage.setItem(settingsStorageKey, JSON.stringify(state.settings));
}

function applySettings() {
  document.body.dataset.theme = state.settings.theme;
  document.body.dataset.buttonSize = state.settings.buttonSize;
  document.body.dataset.compactWidth = state.settings.compactWidth ? "true" : "false";
}

function escapeAttribute(text) {
  return escapeHtml(text).replaceAll('"', "&quot;");
}

function isChecked(currentValue, expectedValue) {
  return currentValue === expectedValue ? "checked" : "";
}

function isSelected(currentValue, expectedValue) {
  return currentValue === expectedValue ? "selected" : "";
}
