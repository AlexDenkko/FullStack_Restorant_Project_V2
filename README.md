# 🍽️ Opiskelijalounas – Metropolian API-versio

Responsiivinen verkkosovellus suomalaisten opiskelijaravintoloiden etsimiseen ja niiden päivä- ja viikkoruokalistojen selaamiseen. Käyttäjä voi myös kirjautua sisään, hallita profiiliaan ja valita suosikkiravintolan.

**Toteutus:** HTML5, CSS3 ja Vanilla JavaScript (ES6+). Sovellus käyttää Metropolian REST API:a suoraan selaimesta – **ei omaa MariaDB-tietokantaa, Node.js/Express-taustapalvelinta eikä frontend-frameworkia**.

**🌐 [Avaa sovellus GitHub Pagesissa](https://alexdenkko.github.io/FullStack_Restorant_Project_V2/)**

> [!IMPORTANT]
> Metropolian API voi vaatia koulun verkon tai VPN-yhteyden. Brave-selaimessa API-yhteys voi lisäksi vaatia **Local network access** -luvan. Katso [API-yhteyden ongelmat](#-api-yhteyden-ongelmat-github-pagesissa).

## ✨ Ominaisuudet

- Ravintoloiden listaus, haku nimellä tai osoitteella sekä suodatus kaupungin ja palveluntarjoajan mukaan
- Päivän ja viikon ruokalistat, hinnat ja ruokavaliomerkinnät API:n tietojen mukaan
- OpenStreetMap-kartta, käyttäjän sijainti ja lähimmän ravintolan näyttö
- Rekisteröinti, kirjautuminen käyttäjänimellä ja uloskirjautuminen
- Yksi käyttäjätiliin tallennettu suosikkiravintola
- Profiilitietojen päivitys ja avatar-kuvan lähetys
- Suomen- ja englanninkielinen käyttöliittymä, vaalea ja tumma teema sekä responsiivinen ulkoasu

## 🛠️ Teknologiat

| Teknologia | Käyttötarkoitus |
| --- | --- |
| HTML5 ja CSS3 | Sivuston rakenne, ulkoasu ja responsiivisuus |
| Vanilla JavaScript (ES6+) | Käyttöliittymälogiikka ja DOM-käsittely |
| Fetch API | HTTP-pyynnöt Metropolian REST API:in |
| JWT ja `sessionStorage` | Kirjautumistunnisteen käsittely selainistunnossa |
| OpenStreetMap ja Geolocation API | Kartta ja sijaintitoiminnot |
| Git, GitHub ja GitHub Actions | Versionhallinta ja automaattinen julkaisu |
| GitHub Pages | Staattisen sovelluksen julkaisu |

## 📁 Projektin rakenne

| Tiedosto | Tarkoitus |
| --- | --- |
| `index.html` | Sivun rakenne ja lomakkeet |
| `style.css` | Ulkoasu, teemat ja responsiivisuus |
| `script.js` | Käyttöliittymälogiikka ja API-kutsut |
| `.github/workflows/static.yml` | GitHub Pages -julkaisutyönkulku |
| `docs/KOODIN_SELISTYS.md` | Koodin ja API-toimintojen selitykset |
| `docs/TESTAUS.md` | Testausohjeet ja rajoitukset |
| `package.json` | Valinnainen syntaksitarkistus komennolla `npm run check` |

## 🚀 Käynnistäminen paikallisesti

1. Kloonaa repositorio tai lataa projektitiedostot ja avaa kansio VS Codessa.
2. Käynnistä staattinen palvelin esimerkiksi **Live Server** -laajennuksella tai komennolla:

   ```bash
   python -m http.server 8000
   ```

3. Avaa selaimessa **http://localhost:8000/**.
4. Yhdistä tarvittaessa Metropolian VPN:ään, jotta API toimii.
5. Halutessasi tarkista JavaScriptin syntaksi:

   ```bash
   npm run check
   ```

**Huom.** `npm install` tai `npm start` ei ole tarpeen sovelluksen ajamiseen. Node.js tarvitaan vain valinnaiseen tarkistukseen.

**Demotila:** `http://localhost:8000/?demo=1` näyttää fiktiivisiä ravintoloita ja ruokalistoja. Se ei vahvista oikean API:n tai käyttäjätoimintojen toimivuutta.

## 🌍 GitHub Pages -julkaisu

1. Siirrä projektin tiedostot repositorion juureen. Älä julkaise vanhan version `.env`-, `server.js`-, `database/`- tai `node_modules/`-tiedostoja.
2. Tee commit ja puske muutokset `main`-haaraan.
3. Avaa GitHubissa **Settings → Pages → Build and deployment** ja valitse **Source: GitHub Actions**.
4. Tiedoston `.github/workflows/static.yml` työnkulku julkaisee sivuston automaattisesti. Seuraa suoritusta **Actions**-välilehdeltä.

Suhteelliset tiedostopolut (`style.css`, `script.js`) toimivat myös GitHub Pagesin repositorio-alipolussa.

## ⚠️ API-yhteyden ongelmat GitHub Pagesissa

GitHub Pages julkaisee käyttöliittymän julkisesti, mutta **ei poista Metropolian API:n verkkorajoituksia**. API-kutsut lähtevät käyttäjän selaimesta, joten koulun VPN ja selaimen käyttöoikeudet voivat olla tarpeen.

### Vaatimukset

1. Yhdistä **Metropolian VPN:ään**, jos et ole koulun verkossa.
2. Avaa [GitHub Pages -sovellus](https://alexdenkko.github.io/FullStack_Restorant_Project_V2/).
3. Jos ravintolat eivät lataudu, tarkista selaimen **Local network access** -käyttöoikeus.

### Brave-selaimen korjausohje

Brave voi näyttää virheen:

```text
Access to fetch at 'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
from origin 'https://alexdenkko.github.io' has been blocked by CORS policy:
Permission was denied for this request to access the `local` address space.
```

Korjaus:

1. Avaa **Brave Settings → Privacy and security → Site and Shields Settings**.
2. Valitse **Recent activity** -kohdasta `alexdenkko.github.io`.
3. Etsi **Local network access** ja vaihda asetukseksi **Allow**, jos luotat sivustoon.
4. Palaa sovellukseen ja päivitä sivu painamalla **Ctrl + Shift + R**.

**Tämä ratkaisu on vahvistettu toimivaksi Brave-selaimessa Metropolian VPN-yhteydellä.** Selainten valikot ja käyttöoikeuksien nimet voivat vaihdella.

> [!NOTE]
> Local Network Access -lupa ratkaisee selaimen paikallisen verkon eston, mutta API-palvelimen omat CORS-asetukset voivat silti rajoittaa pyyntöjä. Anna lupa vain luotetuille sivustoille; älä poista selaimen yleisiä tietoturvasuojauksia käytöstä.

### Miten yhteys toimii?

```text
Käyttäjän selain
   ├── Lataa HTML-, CSS- ja JS-tiedostot GitHub Pagesista
   └── Lähettää fetch()-pyynnöt Metropolian REST API:in
          └── API palauttaa ravintola-, ruokalista- ja käyttäjätiedot
```

GitHub Pages ei ole API:n välityspalvelin, vaan pyynnöt kulkevat suoraan selaimesta koulun palvelimelle.

## 🔌 Metropolian REST API

**Perusosoite:** `https://media2.edu.metropolia.fi/restaurant/api/v1`

**Dokumentaatio:** https://media2.edu.metropolia.fi/restaurant/ (voi edellyttää VPN-yhteyttä)

| Toiminto | Metodi | Polku |
| --- | --- | --- |
| Ravintolalista | GET | `/restaurants` |
| Päivän ruokalista | GET | `/restaurants/daily/:id/:lang` |
| Viikon ruokalista | GET | `/restaurants/weekly/:id/:lang` |
| Rekisteröinti | POST | `/users` |
| Kirjautuminen | POST | `/auth/login` |
| Kirjautuneen käyttäjän tiedot | GET | `/users/token` |
| Profiilin ja suosikin päivitys | PUT | `/users` |
| Profiilikuvan lataaminen | POST | `/users/avatar` |

Esimerkki ravintoloiden hakemisesta:

```javascript
const response = await fetch(
  'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
);
const data = await response.json();
```

## 🔐 Kirjautuminen ja tietoturva

- `POST /auth/login` palauttaa JWT-tokenin onnistuneen kirjautumisen yhteydessä.
- Sovellus tallentaa tokenin `sessionStorage`-muistiin selainistunnon ajaksi.
- Suojatuissa pyynnöissä käytetään otsaketta `Authorization: Bearer <token>`.
- Sivun latautuessa `GET /users/token` tarkistaa tokenin ja hakee käyttäjän tiedot.
- Uloskirjautuminen poistaa selaimeen tallennetun tokenin. API-dokumentaatiossa ei ole erillistä uloskirjautumisreittiä.
- Salasanaa ei tallenneta selaimen muistiin. JWT-token on luottamuksellinen; esimerkiksi XSS-haavoittuvuus voi vaarantaa sen.
- API:sta saatava teksti lisätään käyttöliittymään turvallisesti esimerkiksi `textContent`-ominaisuudella.

## ⭐ Suosikkiravintola

Metropolian API:n `favouriteRestaurant`-kenttä sisältää **yhden ravintolan tunnisteen**, ei listaa. Uuden suosikin valitseminen korvaa edellisen.

Vanhan MariaDB-version useita suosikkeja ei siksi tallenneta käyttäjätilille tässä toteutuksessa. Suosikin poistossa lähetetään `favouriteRestaurant: null`; palvelimen tuki on vielä varmistettava oikealla testillä.

## 🧪 Testaus ja rajoitukset

**Vahvistettu:** GitHub Pages -sivusto sekä ravintolatietojen API-yhteys toimivat Brave-selaimessa Metropolian VPN-yhteydellä, kun Local Network Access on sallittu.

**Erikseen testattavat:** rekisteröinti ja aktivointi, kirjautuminen, suosikin poistaminen, profiilin päivitys, avatarin lopullinen URL sekä muut käyttäjätoiminnot oikeaa API:a vasten. Älä merkitse niitä hyväksytysti testatuiksi ennen varmistusta.

Muita huomioita:

- API-yhteys riippuu koulun verkon ja palvelimen saatavuudesta.
- Muut selaimet voivat käsitellä paikallisen verkon käyttöoikeuksia eri tavoin.
- Yhden suosikkiravintolan rajoitus tulee koulun API:n tietomallista.
- Rekisteröinnin palauttama `activationUrl` näytetään, jos se on turvallinen HTTPS-linkki.

Lisätietoja: [`docs/TESTAUS.md`](docs/TESTAUS.md) ja [`docs/KOODIN_SELISTYS.md`](docs/KOODIN_SELISTYS.md).

---

## 📌 Yhteenveto

Opiskelijalounas on responsiivinen, Vanilla JavaScriptillä toteutettu opiskelijaravintolasovellus. Se hyödyntää Metropolian REST API:a suoraan selaimesta ja julkaistaan GitHub Pagesissa ilman omaa tietokantaa tai taustapalvelinta.
