# Koodin selitys opettajalle

## 1. Sovelluksen rakenne

- `index.html` määrittelee sivut, painikkeet ja lomakkeet.
- `style.css` antaa sivulle ulkoasun ja mukauttaa sen puhelimelle.
- `script.js` tekee toiminnallisuuden Vanilla JavaScriptillä: tapahtumankuuntelijat, sivujen vaihtaminen, API-kutsut ja tulosten näyttö.
- GitHub Pages palauttaa nämä staattiset tiedostot selaimeen. Erillistä Express-palvelinta tai MariaDB-tietokantaa ei enää ole.

## 2. Mitä API tarkoittaa?

Selain tekee HTTPS-pyynnön Metropolian REST API -palvelimeen. API palauttaa JSON-muotoisen vastauksen. Esimerkiksi `GET /restaurants` palauttaa ravintolat ja `GET /restaurants/daily/:id/:lang` palauttaa valitun ravintolan päivän ruokalistan.

`api()` on yhteinen apufunktio, joka asettaa HTTP-metodin, otsakkeet ja tarvittaessa JSON- tai FormData-sisällön. `fetch()` lähettää pyynnön. Vastaus luetaan `response.json()`-metodilla. Virhetilanteissa näytetään käyttäjälle virheilmoitus.

## 3. Mitä `state` tarkoittaa?

`state` on JavaScript-olio, johon tallennetaan sivulla tarvittavat senhetkiset tiedot: valittu kieli, ravintolat, valittu ravintola, päivän/viikon valinta, käyttäjä, hänen yksi suosikkinsa ja JWT-token. `state`-muutosten jälkeen käyttöliittymä päivittyy `renderRestaurants()`, `renderFavorites()` tai `updateNav()` -funktioilla.

## 4. Miten ravintolat ja ruokalistat näytetään?

1. `loadRestaurants()` hakee `GET /restaurants`.
2. `normalizeRestaurants()` muuttaa vastauksen käyttöliittymän ymmärtämään muotoon. Koordinaattien järjestys on APIssa `[pituusaste, leveysaste]`.
3. `refreshFilters()` rakentaa kaupunki- ja palveluntarjoajavalinnat.
4. `filteredRestaurants()` hakee ja suodattaa ravintolat.
5. `renderRestaurants()` rakentaa ravintolakortit DOMiin turvallisesti `textContent`-arvoilla.
6. Ravintolan valinta käynnistää `loadMenu()`-funktion, joka kutsuu päivä- tai viikkoruokalistan endpointia.
7. `normalizeMenu()` muuntaa API-vastauksen muotoon `{date, courses}` ja käyttöliittymä näyttää ruoat, hinnat ja ruokavaliomerkinnät.

## 5. Miten kirjautuminen toimii?

1. Kirjautumislomakkeessa käyttäjä antaa **käyttäjänimen ja salasanan**.
2. `submitAuth()` lähettää ne `POST /auth/login` -osoitteeseen.
3. API palauttaa JWT-tokenin; sitä säilytetään `sessionStorage`-muistissa (ei salasanaa).
4. Kun käyttäjätietoja halutaan hakea tai päivittää, `api()` lisää otsakkeen `Authorization: Bearer <token>`.
5. Sivun päivityksessä `loadSession()` tarkistaa tokenin API:n `GET /users/token` -pyynnöllä.
6. Uloskirjautuminen poistaa tokenin ja tyhjentää käyttäjän tiedot käyttöliittymästä.

## 6. Miten rekisteröinti, profiili ja suosikki toimivat?

- Rekisteröinti: `POST /users` lähettää `username`, `password`, `email`. API voi palauttaa aktivointilinkin. Rekisteröinti ei automaattisesti tarkoita kirjautumista.
- Profiilin muokkaus: `PUT /users` lähettää käyttäjänimen ja sähköpostin sekä JWT-otsakkeen.
- Suosikin asettaminen: `PUT /users` lähettää `favouriteRestaurant`-kenttään ravintolan `_id`-arvon. Toinen suosikki korvaa edellisen; dokumentaatio kuvaa vain yhden kentän.
- Suosikin poisto: samaan kenttään lähetetään `null`. Tämän pitää olla API-palvelimella sallittua; kokeile koulun verkossa.
- Profiilikuva: `POST /users/avatar` lähettää `multipart/form-data` -sisällön. API:n dokumentaatio kertoo tiedostojen löytyvän `/uploads`-kansiosta, mutta lopullinen URL pitää tarkistaa oikealla avatar-latauksella.

## 7. Miksi GitHub Pages toimii?

GitHub Pages voi julkaista HTML-, CSS- ja JavaScript-tiedostot, mutta ei aja omaa Express-palvelinta tai MariaDB:tä. Kun tiedot ovat koulun APIssa, selain voi pyytää niitä suoraan verkosta. **Ehto:** selain saa yhteyden APIin (tarvittaessa VPN) ja palvelin sallii pyynnöt CORS-asetuksissaan.

## 8. Käyttöliittymän lisätoiminnot

- `setLanguage()` vaihtaa suomen ja englannin.
- `setTheme()` vaihtaa tumman ja vaalean teeman.
- `distanceInKm()` laskee etäisyyden koordinaateista Haversinen kaavalla.
- `showSelectedHeader()` näyttää kartan OpenStreetMapin upotuksena.
- `registerEvents()` liittää käyttäjän painallukset ja lomakkeet oikeisiin funktioihin.
