# Testaus – uusi API-versio

## Paikallisesti tarkistettavat asiat

1. `node --check script.js` tai `npm run check` – JavaScript-syntaksi.
2. Avaa sivu paikallisen HTTP-palvelimen kautta ja tarkista, että CSS latautuu, valikko vaihtaa sivua ja kieli-/teemavalinnat toimivat.
3. `?demo=1`: ravintolakortit, suodattimet, päivä-/viikkoruokalistat ja kartta ovat testattavissa fiktiivisillä tiedoilla.
4. Tarkista sivun toiminta kapeassa mobiilinäkymässä sekä selaimen Console-virheet.
5. Tarkista, ettei julkaistavassa projektissa ole `.env`-tiedostoa, MariaDB-yhteyttä tai Express-palvelinta.

## Tehdyt simuloidut selaintestit (22.11.2026)

Chrome/Playwright-testissä API-kutsut korvattiin paikallisilla JSON-testivastauksilla. Nämä **eivät ole oikean koulupalvelimen integraatiotestejä**. Testissä toimivat ravintolalista, hakukenttä, päivä- ja viikkoruokalistat, rekisteröinti ja aktivointilinkin näyttö, JWT-kirjautuminen, yhden suosikin tallennus/vaihto/poisto, profiilin muokkaus, avatarin lähetys ja uloskirjautuminen. Sivun JavaScriptistä ei tullut käsittelemättömiä virheitä. 390 px mobiilinäkymässä ei ollut vaakasuuntaista ylivuotoa, ja mobiilivalikko avautui.

`node --check script.js` läpäistiin. Testiympäristössä oikeaa Metropolian APIa ei voitu tavoittaa.

## Koulun verkossa / VPN:n kautta tehtävät oikeat integraatiotestit

- [ ] `GET /restaurants` – ravintolat latautuvat, filtterit ja haku toimivat.
- [ ] `GET /restaurants/daily/:id/fi` – oikean ravintolan päivän ruokalista latautuu.
- [ ] `GET /restaurants/weekly/:id/fi` – viikon ruokalista latautuu.
- [ ] `POST /users` – rekisteröinti palauttaa onnistumisen ja mahdollisen aktivointilinkin.
- [ ] `POST /auth/login` – oikea käyttäjätunnus + salasana palauttavat JWT-tokenin.
- [ ] `GET /users/token` – sivun päivityksen jälkeen tunnus kelpaa.
- [ ] `PUT /users` – käyttäjänimen/sähköpostin muokkaus tallentuu.
- [ ] `PUT /users` – `favouriteRestaurant` tallentuu ja korvaa edellisen.
- [ ] `PUT /users` – suosikin poisto `null`-arvolla toimii (jos API sallii).
- [ ] `POST /users/avatar` – kuvan lataaminen ja näkyminen profiilissa.
- [ ] Uloskirjautumisen jälkeen suojatut toiminnot eivät ole käytettävissä.
- [ ] GitHub Pages -osoitteesta tehtävät API-pyynnöt toimivat ilman CORS-virhettä.
- [ ] Tarkista yhteyden toimivuus ilman koulun VPN:ää (rajapinta voi olla rajoitettu).

## Mitä testit todistavat ja mitä eivät?

Staattisten tiedostojen tarkistus ja `?demo=1` eivät todista, että oikea API toimii. Jos GitHub Pages -osoitteen Network-välilehdellä näkyy CORS-virhe tai API-osoite ei aukea ilman VPN:ää, ongelma on API-palvelimen verkko-/CORS-rajoituksissa eikä välttämättä JavaScript-koodissa. Älä käytä julkista CORS-proxyä käyttäjätunnusten tai JWT-tokenien välittämiseen.
