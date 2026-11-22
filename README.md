# Opiskelijalounas – Metropolian API-versio

Responsiivinen opiskelijaravintoloiden hakupalvelu. Tämä versio **ei käytä omaa tietokantaa, Node/Express-palvelinta tai frontend-frameworkia**. HTML, CSS ja Vanilla JavaScript toimivat GitHub Pagesissa. Sovellus kutsuu Metropolian REST APIa suoraan selaimesta.

## Toiminnot

- Opiskelijaravintoloiden listaus, nimen/osoitteen haku ja suodatus kaupungin tai palveluntarjoajan perusteella
- Päivän ja viikon ruokalista (hinnat ja ruokavaliomerkinnät, jos rajapinta palauttaa ne)
- OpenStreetMap-kartta sekä käyttäjän sijaintiin perustuva lähimmän ravintolan näyttö
- Käyttäjän rekisteröinti, aktivointilinkki (jos API palauttaa sen), kirjautuminen käyttäjänimellä ja uloskirjautuminen
- Yksi käyttäjätiliin tallennettu suosikkiravintola (API:n `favouriteRestaurant`-kentän mukaisesti)
- Profiilin käyttäjänimen ja sähköpostin päivitys ja avatar-kuvan lähetys
- Suomen- ja englanninkielinen käyttöliittymä, tumma ja vaalea teema, mobiiliresponsiivisuus

## Tiedostot

| Tiedosto | Tarkoitus |
| --- | --- |
| `index.html` | Sivun rakenne, lomakkeet ja saavutettavuuden perusrakenne |
| `style.css` | Ulkoasu ja responsiivisuus |
| `script.js` | Käyttöliittymälogiikka ja Metropolian API-kutsut |
| `.github/workflows/static.yml` | GitHub Pages -julkaisutyönkulku |
| `docs/KOODIN_SELISTYS.md` | Selitykset koodista ja API:n toiminnasta |
| `docs/TESTAUS.md` | Testausohjeet ja rajoitukset |
| `package.json` | Valinnainen JavaScript-syntaksitarkistus (`npm run check`), ei ajonaikaisia riippuvuuksia |

## Sovelluksen käynnistäminen

Sovellusta ei tarvitse asentaa `npm install` -komennolla eikä MariaDB:tä tarvita.

1. Avaa projektikansio VS Codessa.
2. Käynnistä paikallinen staattinen palvelin esimerkiksi komennolla `python -m http.server 8000` (käytössä voi olla myös VS Code Live Server).
3. Avaa `http://localhost:8000/`.
4. Liity tarvittaessa koulun verkkoon/VPN:ään, jotta voit käyttää APIa.
5. Valinnainen: tarkista JavaScriptin syntaksi komennolla `npm run check` (Node.js tarvitaan vain tähän tarkistukseen).

Sivun ulkoasua voi tarkastella ilman oikeaa APIa osoitteessa `http://localhost:8000/?demo=1`. Demotila käyttää fiktiivisiä ravintoloita ja ruokalistoja; se **ei todenna** oikeaa API-yhteyttä tai käyttäjätoimintoja.

## GitHub Pages -julkaisu

1. Siirrä tämän projektin tiedostot GitHub-repositorion juureen. Älä siirrä vanhoja `.env`-, `server.js`-, `database/`- tai `node_modules/`-tiedostoja.
2. Tee commit ja puske koodi `main`-haaraan.
3. Avaa GitHubissa repositorio → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. `.github/workflows/static.yml` julkaisee sivuston automaattisesti `main`-haaran päivityksistä. Näet julkaisun **Actions**-välilehdellä.
5. Avaa GitHub Pages -osoite (tyypillisesti `https://KAYTTAJA.github.io/REPOSITORIO/`).

`index.html` käyttää suhteellisia polkuja `style.css` ja `script.js`, joten se toimii myös GitHub Pagesin repo-alipolussa.

### Huomio: VPN ja CORS

**GitHub Pages -sivusto voidaan julkaista julkisesti, mutta se ei tee koulun APIsta julkista.** Jos API toimii vain koulun verkosta tai VPN:llä, sivun käyttäjällä pitää olla pääsy sinne. Lisäksi API-palvelimen on sallittava CORS-pyynnöt GitHub Pages -domainista; erityisesti kirjautumisen ja `Authorization`-otsaketta käyttävien pyyntöjen `OPTIONS`-esitarkistukset. GitHub Pages ei pysty korjaamaan palvelimen VPN- tai CORS-rajoituksia. Näistä tarvittaessa sovitaan API:n ylläpitäjän/opettajan kanssa.

Tässä ympäristössä APIa ei pystytty tavoittamaan, joten **tuotantoyhteys, CORS, oikean palvelimen rekisteröinti/aktivointi, suosikin poisto ja avatarin lopullinen URL pitää testata koulun verkossa**. Älä väitä niitä testatuiksi ennen oikeaa testiä.

## Käytetyt API-polut

API-perusosoite `script.js`:ssa:

```text
https://media2.edu.metropolia.fi/restaurant/api/v1
```

| Toiminto | HTTP | Polku |
| --- | --- | --- |
| Ravintolalista | GET | `/restaurants` |
| Päivän ruokalista | GET | `/restaurants/daily/:id/:lang` |
| Viikon ruokalista | GET | `/restaurants/weekly/:id/:lang` |
| Rekisteröinti | POST | `/users` |
| Kirjautuminen | POST | `/auth/login` |
| Kirjautuneen tiedot | GET | `/users/token` |
| Profiilin ja suosikin päivitys | PUT | `/users` |
| Profiilikuva | POST | `/users/avatar` |

### JWT-kirjautumisen idea

- `POST /auth/login` palauttaa `token`-kentän. Sovellus tallentaa tunnisteen selaimen `sessionStorage`-muistiin, joka tyhjennetään välilehden istunnon päättyessä.
- Suojatuissa pyynnöissä lähetetään HTTP-otsake `Authorization: Bearer <token>`.
- Sivun latautuessa `/users/token` hakee käyttäjän tiedot ja tarkistaa istunnon.
- **Uloskirjautuminen** poistaa selaimen tokenin; dokumentaatiossa ei ole erillistä uloskirjautumisrajapintaa.
- Salasanaa ei tallenneta selaimen muistiin. Token on silti luottamuksellinen: selaimen XSS-haavoittuvuudet voivat altistaa sen, joten rajapinnasta saatua tekstiä lisätään DOMiin `textContent`-käytännöllä.

## Rajoitukset suhteessa vanhaan versioon

Koulun APIssa käyttäjäkohtainen suosikki on **yksi** ravintola. Vanhan MariaDB-version usean suosikin listaa ei voi säilyttää pilveen tallennettuna ilman toista tallennusratkaisua. Tässä toteutuksessa suosikin vaihto korvaa edellisen. Suosikin poistoon lähetetään `favouriteRestaurant: null`; palvelimen tuki on varmistettava oikealla testillä. Rekisteröinnin palauttama `activationUrl` näytetään, jos se on turvallinen HTTPS-linkki.

## Tarkistukset

Katso `docs/TESTAUS.md`. Ennen palautusta testaa selaimessa myös DevTools → Network: osoitteet ovat `media2.edu.metropolia.fi/restaurant/api/v1/...` eivätkä enää `/api?action=...`.
