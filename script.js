"use strict";

// Selainpuoli on pelkkää JavaScriptiä: ei Reactia, jQueryä eikä CSS-kirjastoja.
// Julkaistava staattisena sivustona: Metropolian API hoitaa tietojen tallennuksen.
// Demotilan saa käyttöön lisäämällä osoitteeseen ?demo=1.
const API_BASE = "https://media2.edu.metropolia.fi/restaurant/api/v1";
const API_ROOT = API_BASE.replace(/\/api\/v1\/?$/, "/");
const DEMO = new URLSearchParams(location.search).get("demo") === "1";
const dictionary = {
  fi: {
    heroSideLine1: "LOUNAS",
    heroSideLine2: "ON",
    heroSideLine3: "TAUKO.",
    heroSideSmall: "Hyvää ruokaa. Hyvä päivä.",
    footerBrand: "Opiskelijalounas",
    navRestaurants: "Ravintolat",
    navFavorites: "Suosikki",
    navProfile: "Oma profiili",
    navLogin: "Kirjaudu",
    navRegister: "Rekisteröidy",
    navLogout: "Kirjaudu ulos",
    eyebrow: "OPISKELIJAN LOUNASOPAS",
    heroText:
      "Löydä opiskelijaravintolat ja tarkista päivän tai koko viikon ruokalista yhdestä paikasta.",
    heroButton: "Tutustu ravintoloihin ↗",
    exploreLabel: "ETSINTÄ",
    restaurantsTitle: "Löydä ravintola",
    searchLabel: "Hae nimellä tai osoitteella",
    cityLabel: "Kaupunki",
    providerLabel: "Palveluntarjoaja",
    allCities: "Kaikki kaupungit",
    allProviders: "Kaikki tarjoajat",
    nearMe: "⌖ Näytä lähimmät",
    clearFilters: "Tyhjennä suodattimet",
    menuEmptyTitle: "Mitä tänään syötäisiin?",
    menuEmptyText: "Valitse ravintola, niin näet ruokalistan tässä.",
    menuLabel: "RUOKALISTA",
    dayMenu: "Päivä",
    weekMenu: "Viikko",
    locationTitle: "Sijainti kartalla",
    mapLink: "Avaa isompi kartta ↗",
    favoritesLabel: "OMAT VALINNAT",
    favoritesTitle: "Suosikkiravintola",
    favoritesIntro: "Koulun API tallentaa käyttäjälle yhden suosikkiravintolan.",
    welcomeBack: "TERVETULOA TAKAISIN",
    loginTitle: "Kirjaudu sisään",
    emailLabel: "Sähköposti",
    passwordLabel: "Salasana",
    loginSubmit: "Kirjaudu sisään",
    noAccount: "Eikö sinulla ole tiliä?",
    joinUs: "LIITY MUKAAN",
    registerTitle: "Luo käyttäjätili",
    nameLabel: "Käyttäjänimi",
    passwordHint: "Käytä vähintään 10 merkkiä.",
    registerSubmit: "Luo käyttäjätili",
    haveAccount: "Onko sinulla jo tili?",
    myDetails: "OMAT TIEDOT",
    profileTitle: "Oma profiili",
    avatarLabel: "Vaihda profiilikuva",
    avatarHint: "JPG, PNG tai WebP. Enintään 2 Mt.",
    saveAvatar: "Tallenna kuva",
    saveProfile: "Tallenna muutokset",
    footerTagline: "Hyvää opiskelupäivää, yksi lounas kerrallaan.",
    footerMeta:
      "Web-sovelluskehityksen yksilöprojekti · Alex Sviridenko TVT25-O",
    showMenu: "Näytä lista",
    favorite: "Valitse suosikiksi",
    unfavorite: "Poista suosikki",
    nearest: "Lähin",
    loading: "Haetaan ravintolatietoja…",
    loadingMenu: "Haetaan ruokalistaa…",
    count: (n) => `${n} ravintolaa`,
    emptyList: "Hakuehdoilla ei löytynyt ravintoloita.",
    loadError:
      "Ravintoloita ei voitu hakea. Tarkista API-asetukset tai verkkoyhteys.",
    menuError: "Ruokalistaa ei saatu haettua. Kokeile myöhemmin uudelleen.",
    emptyMenu: "Tälle ajanjaksolle ei ole julkaistu ruokalistaa.",
    noFavorites: "Et ole vielä valinnut suosikkiravintolaa.",
    loginForFavorites: "Kirjaudu sisään tallentaaksesi suosikkiravintolan.",
    loginRequired: "Kirjaudu sisään nähdäksesi suosikkisi tai profiilisi.",
    profileSaved: "Muutokset tallennettiin.",
    avatarSaved: "Profiilikuva tallennettiin.",
    geoDenied: "Sijaintia ei saatu. Voit silti hakea kaupungin perusteella.",
    geoUnavailable: "Selaimesi ei tue sijaintia.",
    nearbySorted: "Ravintolat järjestetty etäisyyden mukaan.",
    demoInfo:
      "DEMO: Kuvitteellisia ravintoloita ja ruokalistoja. Käyttäjätoiminnot edellyttävät oikeaa koulun APIa.",
    distance: (km) => `${km.toFixed(1).replace(".", ",")} km`,
    noDishes: "Ruokalistan sisältö puuttuu.",
    unknownCity: "Kaupunki ei tiedossa",
    unknownProvider: "Palveluntarjoaja ei tiedossa",
    genericError:
      "Toiminto epäonnistui. Tarkista yhteys koulun API-palvelimeen.",
    registerOk: "Käyttäjätili luotu. Aktivoi tili ennen kirjautumista.",
    activateAccount: "Avaa tilin aktivointilinkki",
    apiConnectionError:
      "Koulun API ei vastaa. Tarkista VPN-yhteys ja selaimen kehittäjätyökaluista mahdollinen CORS-esto.",
    loginError: "Kirjautuminen ei palauttanut tunnistautumistokenia.",
    guest: "Kirjaudu sisään",
    logoutDone: "Kirjauduit ulos.",
    searchPlaceholder: "Esim. kampus, kaupunki...",
    menuOpen: "Valitun ravintolan ruokalista",
    mapTitle: "Ravintolan sijainti kartalla",
  },
  en: {
    heroSideLine1: "LUNCH",
    heroSideLine2: "IS A",
    heroSideLine3: "BREAK.",
    heroSideSmall: "Good food. Good day.",
    footerBrand: "Student Lunch",
    navRestaurants: "Restaurants",
    navFavorites: "Favorite",
    navProfile: "My profile",
    navLogin: "Log in",
    navRegister: "Sign up",
    navLogout: "Log out",
    eyebrow: "STUDENT LUNCH GUIDE",
    heroText:
      "Find Finnish student restaurants and browse their daily or weekly lunch menus in one place.",
    heroButton: "Explore restaurants ↗",
    exploreLabel: "DISCOVER",
    restaurantsTitle: "Find a restaurant",
    searchLabel: "Search by name or address",
    cityLabel: "City",
    providerLabel: "Provider",
    allCities: "All cities",
    allProviders: "All providers",
    nearMe: "⌖ Find nearest",
    clearFilters: "Clear filters",
    menuEmptyTitle: "What's for lunch?",
    menuEmptyText: "Select a restaurant to see its menu here.",
    menuLabel: "LUNCH MENU",
    dayMenu: "Day",
    weekMenu: "Week",
    locationTitle: "Location on map",
    mapLink: "Open larger map ↗",
    favoritesLabel: "YOUR CHOICES",
    favoritesTitle: "Favorite restaurant",
    favoritesIntro: "The school API stores one favorite restaurant per account.",
    welcomeBack: "WELCOME BACK",
    loginTitle: "Log in",
    emailLabel: "Email",
    passwordLabel: "Password",
    loginSubmit: "Log in",
    noAccount: "Don't have an account?",
    joinUs: "JOIN US",
    registerTitle: "Create an account",
    nameLabel: "Username",
    passwordHint: "At least 10 characters.",
    registerSubmit: "Create account",
    haveAccount: "Already have an account?",
    myDetails: "YOUR DETAILS",
    profileTitle: "My profile",
    avatarLabel: "Change profile photo",
    avatarHint: "JPG, PNG or WebP. Maximum 2 MB.",
    saveAvatar: "Save photo",
    saveProfile: "Save changes",
    footerTagline: "Make every study day a little tastier.",
    footerMeta: "Web application assignment · Alex Sviridenko TVT25-O",
    showMenu: "View menu",
    favorite: "Set as favorite",
    unfavorite: "Remove favorite",
    nearest: "Nearest",
    loading: "Loading restaurants…",
    loadingMenu: "Loading menu…",
    count: (n) => `${n} restaurants`,
    emptyList: "No restaurants match your filters.",
    loadError:
      "Unable to load restaurants. Check API configuration and your network connection.",
    menuError: "Unable to load the menu. Please try again later.",
    emptyMenu: "No menu has been published for this period.",
    noFavorites: "You haven't chosen a favorite restaurant yet.",
    loginForFavorites: "Log in to save your favorite restaurant.",
    loginRequired: "Log in to see your favorites or profile.",
    profileSaved: "Your changes have been saved.",
    avatarSaved: "Your profile photo has been saved.",
    geoDenied: "Could not get your location. You can still filter by city.",
    geoUnavailable: "Geolocation is not supported by your browser.",
    nearbySorted: "Restaurants sorted by distance.",
    demoInfo:
      "DEMO: Fictional restaurants and menus. Account features require the actual school API.",
    distance: (km) => `${km.toFixed(1)} km`,
    noDishes: "Menu details are unavailable.",
    unknownCity: "City unknown",
    unknownProvider: "Provider unknown",
    genericError:
      "The request failed. Check your connection to the school API.",
    registerOk: "Account created. Activate it before logging in.",
    activateAccount: "Open account activation link",
    apiConnectionError:
      "The school API is unreachable. Check VPN access and browser developer tools for CORS errors.",
    loginError: "The login response did not include an access token.",
    guest: "Log in",
    logoutDone: "You have logged out.",
    searchPlaceholder: "E.g. campus, city...",
    menuOpen: "Selected restaurant menu",
    mapTitle: "Restaurant location on map",
  },
};

const demoRestaurants = [
  {
    id: "demo-1",
    name: "Malliravintola Keskusta",
    city: "Helsinki",
    provider: "Mallipalvelu",
    address: "Esimerkkikatu 1",
    latitude: 60.1699,
    longitude: 24.9384,
  },
  {
    id: "demo-2",
    name: "Malliravintola Kampus",
    city: "Espoo",
    provider: "Ruokamalli",
    address: "Mallitie 2",
    latitude: 60.1865,
    longitude: 24.8296,
  },
  {
    id: "demo-3",
    name: "Malliravintola Pohjoinen",
    city: "Vantaa",
    provider: "Mallipalvelu",
    address: "Näytekuja 3",
    latitude: 60.2934,
    longitude: 25.039,
  },
  {
    id: "demo-4",
    name: "Malliravintola Ranta",
    city: "Helsinki",
    provider: "Ruokamalli",
    address: "Testiranta 4",
    latitude: 60.1608,
    longitude: 24.9566,
  },
  {
    id: "demo-5",
    name: "Malliravintola Puisto",
    city: "Tampere",
    provider: "Esimerkkikeittiö",
    address: "Kokeilupolku 5",
    latitude: 61.4978,
    longitude: 23.7608,
  },
  {
    id: "demo-6",
    name: "Malliravintola Joki",
    city: "Turku",
    provider: "Esimerkkikeittiö",
    address: "Harjoitustie 6",
    latitude: 60.4518,
    longitude: 22.2666,
  },
];
const demoMenu = [
  {
    date: "Maanantai / Monday (demo)",
    courses: [
      { name: "Kasvislasagne", details: "L, G saatavilla" },
      { name: "Kasviskeitto", details: "Veg" },
    ],
  },
  {
    date: "Tiistai / Tuesday (demo)",
    courses: [
      { name: "Uunikala ja perunat", details: "L, G" },
      { name: "Tomaattipasta", details: "Veg" },
    ],
  },
  {
    date: "Keskiviikko / Wednesday (demo)",
    courses: [{ name: "Riisi ja kasviswok", details: "Veg" }],
  },
  {
    date: "Torstai / Thursday (demo)",
    courses: [{ name: "Hernekeitto ja leipä", details: "L" }],
  },
  {
    date: "Perjantai / Friday (demo)",
    courses: [{ name: "Uuniperuna ja täyte", details: "G saatavilla" }],
  },
];

const state = {
  language: localStorage.getItem("lunch-language") === "en" ? "en" : "fi",
  theme: ["dark", "light"].includes(localStorage.getItem("lunch-theme"))
    ? localStorage.getItem("lunch-theme")
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  restaurants: [],
  favorites: new Set(),
  user: null,
  token: sessionStorage.getItem("lunch-access-token") || "",
  selectedId: null,
  period: "day",
  page: "home",
  position: null,
  menuRequestId: 0,
};
const $ = (id) => document.getElementById(id);
const t = (key) => dictionary[state.language][key];
const el = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
};

function setLanguage(language) {
  state.language = language;
  document.documentElement.lang = language;
  localStorage.setItem("lunch-language", language);
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const translation = t(node.dataset.i18n);
    if (typeof translation === "string") node.textContent = translation;
  });
  const h1 = document.querySelector(".hero-copy h1");
  h1.replaceChildren(
    document.createTextNode(
      language === "fi" ? "Hyvä lounas. " : "Great lunch. ",
    ),
    el(
      "span",
      "accent-underline",
      language === "fi" ? "Helpommin." : "Made easy.",
    ),
  );
  $("lang-toggle").textContent = language === "fi" ? "EN" : "FI";
  $("lang-toggle").setAttribute(
    "aria-label",
    language === "fi" ? "Switch to English" : "Vaihda suomeksi",
  );
  $("search-input").placeholder = t("searchPlaceholder");
  $("restaurant-map").title = t("mapTitle");
  if (DEMO) $("demo-banner").textContent = t("demoInfo");
  refreshFilters();
  renderRestaurants();
  renderFavorites();
  if (state.selectedId) {
    showSelectedHeader();
    loadMenu();
  }
}
function setTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("lunch-theme", theme);
  $("theme-toggle").textContent = theme === "dark" ? "☀" : "◐";
  $("theme-toggle").setAttribute("aria-pressed", String(theme === "dark"));
  $("theme-toggle").setAttribute(
    "aria-label",
    theme === "dark" ? "Vaihda vaalea teema" : "Vaihda tumma teema",
  );
}
function toggleMobileMenu(open) {
  $("main-nav").classList.toggle("is-open", open);
  $("menu-toggle").setAttribute("aria-expanded", String(open));
  $("menu-toggle").textContent = open ? "✕" : "☰";
}
function navigate(page) {
  if ((page === "favorites" || page === "profile") && !state.user && !DEMO) {
    page = "login";
    $("login-status").textContent = t("loginRequired");
  }
  // Demotila ei koskaan väitä käyttäjää kirjautuneeksi.
  if ((page === "favorites" || page === "profile") && !state.user && DEMO) {
    if (page === "favorites")
      $("favorites-status").textContent = t("loginForFavorites");
    else page = "login";
  }
  state.page = page;
  document
    .querySelectorAll(".page")
    .forEach((node) => (node.hidden = node.id !== `${page}-page`));
  toggleMobileMenu(false);
  if (page === "favorites") renderFavorites();
  if (page === "profile") updateProfileForm();
  if (page !== "home") window.scrollTo({ top: 0, behavior: "instant" });
  const heading =
    document.querySelector(`#${page}-page h1`) || $("restaurants-title");
  if (heading && page !== "home") {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

// Suorat HTTPS-kutsut koulun REST-rajapintaan. Ei Expressiä, MariaDB:tä eikä evästeistuntoa.
async function api(
  path,
  { method = "GET", data = null, formData = null, requiresAuth = false } = {},
) {
  const headers = { Accept: "application/json" };
  if (requiresAuth) {
    if (!state.token) throw new Error(t("loginRequired"));
    headers.Authorization = `Bearer ${state.token}`;
  }
  const options = { method, headers };
  if (data !== null) {
    headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(data);
  }
  if (formData) options.body = formData; // Selaimen annetaan asettaa multipart-raja.
  const controller = new AbortController();
  options.signal = controller.signal;
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    // Kaikki API-polut ovat absoluuttisia, jotta myös GitHub Pages /repo/-polku toimii.
    const response = await fetch(`${API_BASE}${path}`, options);
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(payload.message || payload.error || `HTTP ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return payload;
  } catch (error) {
    if (error instanceof TypeError || error.name === "AbortError") {
      throw new Error(t("apiConnectionError"));
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

// API:n käyttäjädata voi tulla kirjautumisessa data-oliona tai token-pyynnössä suoraan.
function normalizeUser(payload) {
  const user = payload?.data ?? payload?.user ?? payload;
  if (!user || typeof user !== "object" || !user.username) {
    throw new Error(t("genericError"));
  }
  return user;
}

function getFavoriteId(user) {
  const value = user?.favouriteRestaurant;
  if (!value) return null;
  if (typeof value === "object") return String(value._id ?? value.id ?? "") || null;
  return String(value);
}

function syncFavorite() {
  const id = getFavoriteId(state.user);
  state.favorites = new Set(id ? [id] : []);
}

function avatarUrls(avatar) {
  if (typeof avatar !== "string" || !avatar.trim()) return [];
  const file = avatar.trim();
  const origin = new URL(API_BASE).origin;
  if (/^https?:\/\//i.test(file)) {
    const absolute = new URL(file);
    // Ulkopuoliselle osoitteelle ei luovuteta käyttäjän mahdollisesti yksityistä avataria.
    return absolute.origin === origin ? [absolute.href] : [];
  }
  if (file.startsWith("/")) return [new URL(file, origin).href];
  const encoded = file.split("/").map(encodeURIComponent).join("/");
  return [new URL(`uploads/${encoded}`, API_ROOT).href, `${origin}/uploads/${encoded}`];
}

function normalizeRestaurants(payload) {
  const root = payload?.data ?? payload;
  const array = Array.isArray(root)
    ? root
    : root?.restaurants || root?.results || [];
  if (!Array.isArray(array)) throw new Error("Unexpected restaurants payload");
  const seen = new Set();
  return array
    .map((item) => {
      const id = String(item._id ?? item.id ?? item.restaurant_id ?? "");
      if (!id || seen.has(id)) return null;
      seen.add(id);
      const coords = item.location?.coordinates ?? item.coordinates;
      const latValue =
        item.latitude ??
        item.lat ??
        item.location?.lat ??
        (Array.isArray(coords) ? coords[1] : coords?.latitude);
      const lonValue =
        item.longitude ??
        item.lon ??
        item.lng ??
        item.location?.lng ??
        (Array.isArray(coords) ? coords[0] : coords?.longitude);
      const latitude =
        latValue == null || latValue === "" ? NaN : Number(latValue);
      const longitude =
        lonValue == null || lonValue === "" ? NaN : Number(lonValue);
      const cityRaw = item.city ?? item.municipality ?? "";
      const providerRaw =
        item.company ?? item.companyName ?? item.provider ?? "";
      return {
        id,
        name: String(item.name || item.restaurant || "Ravintola"),
        city: String(
          typeof cityRaw === "object" ? cityRaw?.name || "" : cityRaw,
        ),
        provider: String(
          typeof providerRaw === "object"
            ? providerRaw?.name || ""
            : providerRaw,
        ),
        address: String(
          item.address?.street || item.address || item.streetAddress || "",
        ),
        latitude:
          Number.isFinite(latitude) && latitude >= -90 && latitude <= 90
            ? latitude
            : null,
        longitude:
          Number.isFinite(longitude) && longitude >= -180 && longitude <= 180
            ? longitude
            : null,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name, "fi"));
}
async function loadRestaurants() {
  $("restaurant-status").textContent = t("loading");
  try {
    state.restaurants = DEMO
      ? demoRestaurants
      : normalizeRestaurants(await api("/restaurants"));
    $("restaurant-status").textContent = "";
    refreshFilters();
    renderRestaurants();
    renderFavorites();
  } catch (error) {
    console.error("Restaurant API error:", error);
    $("restaurant-status").textContent = t("loadError");
    $("results-count").textContent = "";
  }
}
function refreshFilters() {
  [
    ["city-filter", "city", "allCities"],
    ["provider-filter", "provider", "allProviders"],
  ].forEach(([id, field, label]) => {
    const select = $(id),
      previous = select.value;
    const values = [
      ...new Set(state.restaurants.map((r) => r[field]).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b, state.language));
    select.replaceChildren(
      new Option(t(label), ""),
      ...values.map((v) => new Option(v, v)),
    );
    select.value = values.includes(previous) ? previous : "";
  });
}
function degreesToRadians(n) {
  return (n * Math.PI) / 180;
}
function distanceInKm(a, b) {
  const latDiff = degreesToRadians(b.latitude - a.latitude),
    lonDiff = degreesToRadians(b.longitude - a.longitude);
  const h =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(degreesToRadians(a.latitude)) *
      Math.cos(degreesToRadians(b.latitude)) *
      Math.sin(lonDiff / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.min(1, Math.sqrt(h)));
}
function filteredRestaurants(onlyFavorites = false) {
  const search = $("search-input")
    .value.toLocaleLowerCase(state.language)
    .trim();
  const city = $("city-filter").value,
    provider = $("provider-filter").value;
  const matching = state.restaurants.filter(
    (r) =>
      (!onlyFavorites || state.favorites.has(r.id)) &&
      (!search ||
        `${r.name} ${r.city} ${r.address}`
          .toLocaleLowerCase(state.language)
          .includes(search)) &&
      (!city || r.city === city) &&
      (!provider || r.provider === provider),
  );
  if (state.position)
    matching.sort((a, b) => {
      const da =
        a.latitude === null || a.longitude === null
          ? Infinity
          : distanceInKm(state.position, a);
      const db =
        b.latitude === null || b.longitude === null
          ? Infinity
          : distanceInKm(state.position, b);
      return da - db;
    });
  return matching;
}
function makeRestaurantCard(restaurant, nearestId) {
  const card = el("article", "restaurant-card");
  if (state.selectedId === restaurant.id) card.classList.add("is-selected");
  const meta = el("div", "restaurant-meta");
  if (nearestId === restaurant.id)
    meta.append(el("span", "pill pill-near", t("nearest")));
  meta.append(el("span", "pill", restaurant.city || t("unknownCity")));
  card.append(
    meta,
    el("h3", "", restaurant.name),
    el("p", "muted", restaurant.provider || t("unknownProvider")),
  );
  if (restaurant.address) card.append(el("p", "muted", restaurant.address));
  if (
    state.position &&
    restaurant.latitude !== null &&
    restaurant.longitude !== null
  )
    card.append(
      el("p", "muted", t("distance")(distanceInKm(state.position, restaurant))),
    );
  const actions = el("div", "card-actions");
  const menuBtn = el("button", "btn btn-outline", t("showMenu"));
  menuBtn.type = "button";
  menuBtn.addEventListener("click", () => selectRestaurant(restaurant.id));
  const favoriteBtn = el(
    "button",
    "fav-button",
    state.favorites.has(restaurant.id) ? "♥" : "♡",
  );
  favoriteBtn.type = "button";
  favoriteBtn.setAttribute(
    "aria-label",
    `${state.favorites.has(restaurant.id) ? t("unfavorite") : t("favorite")}: ${restaurant.name}`,
  );
  favoriteBtn.setAttribute(
    "aria-pressed",
    String(state.favorites.has(restaurant.id)),
  );
  favoriteBtn.addEventListener("click", () => toggleFavorite(restaurant.id));
  actions.append(menuBtn, favoriteBtn);
  card.append(actions);
  return card;
}
function renderRestaurants() {
  const list = $("restaurant-list");
  list.replaceChildren();
  if (!state.restaurants.length) return;
  const restaurants = filteredRestaurants();
  $("results-count").textContent = t("count")(restaurants.length);
  $("restaurant-status").textContent = restaurants.length ? "" : t("emptyList");
  const nearest = state.position
    ? restaurants.find((r) => r.latitude !== null && r.longitude !== null)?.id
    : null;
  restaurants.forEach((r) => list.append(makeRestaurantCard(r, nearest)));
}
function renderFavorites() {
  const list = $("favorites-list");
  list.replaceChildren();
  if (!state.user) {
    $("favorites-status").textContent = t("loginForFavorites");
    return;
  }
  const restaurants = state.restaurants.filter((r) =>
    state.favorites.has(r.id),
  );
  $("favorites-status").textContent = restaurants.length
    ? ""
    : t("noFavorites");
  restaurants.forEach((r) => list.append(makeRestaurantCard(r, null)));
}

async function selectRestaurant(id) {
  // Siirrytään ravintolasivulle, jos ollaan suosikeissa.
  if (state.page !== "home") {
    navigate("home");
  }

  // Tallennetaan valittu ravintola.
  state.selectedId = id;

  // Näytetään ruokalistapaneeli.
  $("menu-empty").hidden = true;
  $("menu-content").hidden = false;

  // Päivitetään ravintolan tiedot ja listat.
  showSelectedHeader();
  renderRestaurants();
  renderFavorites();

  // Haetaan valitun ravintolan ruokalista.
  await loadMenu();

  // Siirrytään ruokalistan kohdalle.
  $("menu-panel").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function showSelectedHeader() {
  const r = state.restaurants.find((item) => item.id === state.selectedId);
  if (!r) return;
  $("selected-name").textContent = r.name;
  $("selected-location").textContent = [r.address, r.city]
    .filter(Boolean)
    .join(", ");
  $("map-area").hidden = r.latitude === null || r.longitude === null;
  if (r.latitude !== null && r.longitude !== null) {
    const { latitude: lat, longitude: lon } = r;
    const bbox = [lon - 0.013, lat - 0.007, lon + 0.013, lat + 0.007]
      .map((n) => n.toFixed(6))
      .join(",");
    $("restaurant-map").src =
      `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lon}`;
    $("map-link").href =
      `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;
  }
}
function normalizeMenu(payload) {
  const root = payload?.data ?? payload;
  const candidate =
    root?.days ??
    root?.menus ??
    root?.menu ??
    root?.weeklyMenu ??
    root?.dailyMenu ??
    root;
  const days = Array.isArray(candidate) ? candidate : [candidate];
  return days
    .flatMap((day, index) => {
      if (!day) return [];
      const rawCourses = Array.isArray(day)
        ? day
        : (day.courses ??
          day.items ??
          day.meals ??
          day.menuItems ??
          day.menu ??
          []);
      const list = Array.isArray(rawCourses)
        ? rawCourses
        : typeof rawCourses === "object"
          ? Object.values(rawCourses).flat()
          : [];
      const courses = list
        .map((item) => {
          if (typeof item === "string") {
            return { name: item, details: "", price: "" };
          }
          const title =
            item?.name ??
            item?.title ??
            item?.food ??
            item?.course ??
            item?.name_fi ??
            "";
          const name =
            typeof title === "object"
              ? title[state.language] || title.fi || Object.values(title)[0]
              : title;
          const detail = item?.details ?? item?.diets ?? item?.dietCodes ?? "";
          return {
            name: String(name ?? ""),
            details: Array.isArray(detail)
              ? detail.join(", ")
              : String(detail ?? ""),
            price: item?.price == null ? "" : String(item.price),
          };
        })
        .filter((item) => item.name.trim());
      const date =
        day.date ??
        day.day ??
        day.weekday ??
        (state.period === "day"
          ? state.language === "fi"
            ? "Tänään"
            : "Today"
          : `#${index + 1}`);
      return [{ date: String(date), courses }];
    })
    .filter((day) => day.courses.length);
}
async function loadMenu() {
  const id = state.selectedId;
  if (!id) return;
  const requestId = ++state.menuRequestId;
  $("menu-items").replaceChildren();
  $("menu-status").textContent = t("loadingMenu");
  try {
    const payload = DEMO
      ? state.period === "day"
        ? demoMenu.slice(0, 1)
        : demoMenu
      : await api(
          `/restaurants/${state.period === "day" ? "daily" : "weekly"}/${encodeURIComponent(id)}/${state.language}`,
        );
    if (state.selectedId !== id || requestId !== state.menuRequestId) return;
    const days = normalizeMenu(payload);
    $("menu-status").textContent = days.length ? "" : t("emptyMenu");
    days.forEach((day) => {
      const section = el("section", "menu-day"),
        heading = el("h4", "", day.date),
        items = el("ul", "dish-list");
      day.courses.forEach((course) => {
        const li = el("li"),
          name = el("span", "dish-name", course.name);
        li.append(name);
        if (course.details)
          li.append(el("span", "dish-detail", course.details));
        if (course.price) li.append(el("span", "dish-price", course.price));
        items.append(li);
      });
      section.append(heading, items);
      $("menu-items").append(section);
    });
  } catch (error) {
    console.error("Menu API error:", error);
    if (requestId === state.menuRequestId)
      $("menu-status").textContent = t("menuError");
  }
}
async function loadSession() {
  if (!state.token) {
    updateNav();
    renderFavorites();
    return;
  }
  try {
    state.user = normalizeUser(await api("/users/token", { requiresAuth: true }));
    syncFavorite();
  } catch (error) {
    console.warn("Token check failed:", error);
    // Tyhjennetään istunto vain, kun API nimenomaan hylkää tunnistautumisen.
    // Jos VPN/CORS-ongelma katkaisee yhteyden, pidetään token tallessa uutta yritystä varten.
    if (error.status === 401 || error.status === 403) {
      sessionStorage.removeItem("lunch-access-token");
      state.token = "";
    }
    state.user = null;
    state.favorites.clear();
  }
  updateNav();
  renderRestaurants();
  renderFavorites();
}
function updateNav() {
  const loggedIn = Boolean(state.user);
  $("login-nav").hidden = loggedIn;
  $("register-nav").hidden = loggedIn;
  $("profile-nav").hidden = !loggedIn;
  $("logout-button").hidden = !loggedIn;
}
function updateProfileForm() {
  if (!state.user) return;
  $("profile-username").value = state.user.username || "";
  $("profile-email").value = state.user.email || "";
  const sources = avatarUrls(state.user.avatar);
  const img = $("profile-avatar");
  img.onerror = null;
  img.hidden = sources.length === 0;
  $("avatar-placeholder").hidden = sources.length > 0;
  if (sources.length) {
    let index = 0;
    img.onerror = () => {
      index += 1;
      if (index < sources.length) img.src = sources[index];
      else {
        img.hidden = true;
        $("avatar-placeholder").hidden = false;
      }
    };
    img.src = sources[index];
  } else img.removeAttribute("src");
}
async function toggleFavorite(id) {
  if (!state.user) {
    navigate("login");
    $("login-status").textContent = t("loginForFavorites");
    return;
  }
  const deleting = state.favorites.has(id);
  try {
    // API tarjoaa yhden favoriteRestaurant-kentän. Tallennus tapahtuu käyttäjätilille.
    const value = deleting ? null : id;
    const result = await api("/users", {
      method: "PUT",
      requiresAuth: true,
      data: { favouriteRestaurant: value },
    });
    state.user = { ...state.user, ...(result?.data || {}), favouriteRestaurant: value };
    syncFavorite();
    renderRestaurants();
    renderFavorites();
  } catch (error) {
    alert(error.message || t("genericError"));
  }
}
async function submitAuth(event, action) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = $(action + "-status");
  status.replaceChildren();
  const values = Object.fromEntries(new FormData(form));
  try {
    if (action === "register") {
      const result = await api("/users", { method: "POST", data: values });
      form.reset();
      status.append(document.createTextNode(result.message || t("registerOk")));
      // API voi palauttaa aktivointilinkin; sitä ei saa sekoittaa kirjautumistokeniin.
      if (result.activationUrl) {
        try {
          const url = new URL(result.activationUrl, API_ROOT);
          if (url.protocol === "https:" && url.origin === new URL(API_BASE).origin) {
            const link = el("a", "", t("activateAccount"));
            link.href = url.href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            status.append(document.createTextNode(" "), link);
          }
        } catch { /* Palvelimen virheellistä linkkiä ei näytetä. */ }
      }
      return;
    }

    // Kirjautuminen käyttää username-kenttää, ei sähköpostiosoitetta.
    const result = await api("/auth/login", {
      method: "POST",
      data: { username: values.username, password: values.password },
    });
    if (typeof result.token !== "string" || !result.token) {
      throw new Error(result.message || t("loginError"));
    }
    state.token = result.token;
    sessionStorage.setItem("lunch-access-token", state.token);
    try {
      state.user = normalizeUser(result);
    } catch {
      state.user = normalizeUser(await api("/users/token", { requiresAuth: true }));
    }
    syncFavorite();
    form.reset();
    updateNav();
    navigate("home");
    renderRestaurants();
    renderFavorites();
  } catch (error) {
    status.textContent = error.message || t("genericError");
  }
}
async function submitProfile(event) {
  event.preventDefault();
  const status = $("profile-status");
  status.textContent = "";
  try {
    const result = await api("/users", {
      method: "PUT",
      requiresAuth: true,
      data: Object.fromEntries(new FormData(event.currentTarget)),
    });
    state.user = { ...state.user, ...(result?.data || {}) };
    status.textContent = t("profileSaved");
    updateProfileForm();
  } catch (error) {
    status.textContent = error.message || t("genericError");
  }
}
async function submitAvatar(event) {
  event.preventDefault();
  const status = $("avatar-status");
  const form = event.currentTarget;
  status.textContent = "";
  const file = $("avatar-file").files[0];
  if (!file) return;
  if (file.size > 2 * 1024 * 1024 ||
      !["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    status.textContent = t("avatarHint");
    return;
  }
  try {
    const result = await api("/users/avatar", {
      method: "POST",
      formData: new FormData(form),
      requiresAuth: true,
    });
    const newAvatar = result?.data?.avatar;
    if (newAvatar) state.user = { ...state.user, avatar: newAvatar };
    else state.user = normalizeUser(await api("/users/token", { requiresAuth: true }));
    updateProfileForm();
    form.reset();
    status.textContent = t("avatarSaved");
  } catch (error) {
    status.textContent = error.message || t("genericError");
  }
}

function registerEvents() {
  $("lang-toggle").addEventListener("click", () =>
    setLanguage(state.language === "fi" ? "en" : "fi"),
  );
  $("theme-toggle").addEventListener("click", () =>
    setTheme(state.theme === "dark" ? "light" : "dark"),
  );
  $("menu-toggle").addEventListener("click", () =>
    toggleMobileMenu(!$("main-nav").classList.contains("is-open")),
  );
  document
    .querySelectorAll("[data-page]")
    .forEach((node) =>
      node.addEventListener("click", () => navigate(node.dataset.page)),
    );
  document
    .querySelector("[data-home]")
    .addEventListener("click", () => navigate("home"));
  ["search-input", "city-filter", "provider-filter"].forEach((id) =>
    $(id).addEventListener(
      id === "search-input" ? "input" : "change",
      renderRestaurants,
    ),
  );
  $("reset-filters").addEventListener("click", () => {
    $("search-input").value = "";
    $("city-filter").value = "";
    $("provider-filter").value = "";
    state.position = null;
    renderRestaurants();
  });
  $("near-me").addEventListener("click", () => {
    if (!navigator.geolocation) {
      $("restaurant-status").textContent = t("geoUnavailable");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        state.position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        renderRestaurants();
        $("restaurant-status").textContent = t("nearbySorted");
      },
      () => {
        $("restaurant-status").textContent = t("geoDenied");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    );
  });
  document.querySelectorAll("[data-period]").forEach((button) =>
    button.addEventListener("click", () => {
      state.period = button.dataset.period;
      document.querySelectorAll("[data-period]").forEach((btn) => {
        const active = btn.dataset.period === state.period;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", String(active));
      });
      loadMenu();
    }),
  );
  $("login-form").addEventListener("submit", (event) =>
    submitAuth(event, "login"),
  );
  $("register-form").addEventListener("submit", (event) =>
    submitAuth(event, "register"),
  );
  $("profile-form").addEventListener("submit", submitProfile);
  $("avatar-form").addEventListener("submit", submitAvatar);
  $("logout-button").addEventListener("click", () => {
    // Koulun API:ssa ei ole logout-endpointia: poistetaan JWT selaimen istunnosta.
    sessionStorage.removeItem("lunch-access-token");
    state.token = "";
    state.user = null;
    state.favorites.clear();
    updateNav();
    navigate("home");
    renderRestaurants();
    renderFavorites();
  });
}

registerEvents();
setTheme(state.theme);
setLanguage(state.language);
if (DEMO) {
  $("demo-banner").hidden = false;
}
loadSession();
loadRestaurants();
