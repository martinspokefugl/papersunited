"use strict";

const counties = [
  "Agder", "Akershus", "Buskerud", "Finnmark", "Innlandet", "Møre og Romsdal",
  "Nordland", "Oslo", "Rogaland", "Telemark", "Troms", "Trøndelag", "Vestfold",
  "Vestland", "Østfold",
];
const categoryNames = { national: "Landsdekkende", regional: "Regional", local: "Lokal", specialist: "Fag & nisje" };
// The directory contains links, not republished articles or live news feeds.
const newspapers = [
  ["aftenposten", "Aftenposten", "aftenposten.no", "national", "Oslo", "Oslo", "Innsikt og nyheter fra Norge og verden."],
  ["vg", "VG", "vg.no", "national", "Oslo", "Oslo", "Nyheter, sport og underholdning.", "bold red"],
  ["dagbladet", "Dagbladet", "dagbladet.no", "national", "Oslo", "Oslo", "Nyheter og meninger som engasjerer.", "bold red"],
  ["nrk", "NRK", "nrk.no", "national", "Oslo", "Oslo", "Nyheter fra hele Norge og verden.", "bold"],
  ["dn", "Dagens Næringsliv", "dn.no", "national", "Oslo", "Oslo", "Økonomi, næringsliv og samfunn.", "blue"],
  ["dagsavisen", "Dagsavisen", "dagsavisen.no", "national", "Oslo", "Oslo", "Nyheter, kultur og tydelige meninger."],
  ["klassekampen", "Klassekampen", "klassekampen.no", "national", "Oslo", "Oslo", "Politikk, kultur og kritiske perspektiver."],
  ["morgenbladet", "Morgenbladet", "morgenbladet.no", "national", "Oslo", "Oslo", "En ukeavis for kultur, politikk og forskning."],
  ["nettavisen", "Nettavisen", "nettavisen.no", "national", "Oslo", "Oslo", "Nyheter, økonomi og sport på nett.", "bold"],
  ["vl", "Vårt Land", "vl.no", "national", "Oslo", "Oslo", "Religion, verdier og samfunn."],
  ["bt", "Bergens Tidende", "bt.no", "regional", "Vestland", "Bergen", "Nyheter og perspektiver fra Vestlandet."],
  ["ba", "Bergensavisen", "ba.no", "local", "Vestland", "Bergen", "Tett på livet og menneskene i Bergen.", "bold red"],
  ["sta", "Stavanger Aftenblad", "aftenbladet.no", "regional", "Rogaland", "Stavanger", "Nyheter fra Stavanger og Rogaland."],
  ["adresseavisen", "Adresseavisen", "adressa.no", "regional", "Trøndelag", "Trondheim", "Trønderske nyheter og store perspektiver."],
  ["fvn", "Fædrelandsvennen", "fvn.no", "regional", "Agder", "Kristiansand", "Sørlandets nyheter, kultur og debatt."],
  ["nordlys", "Nordlys", "nordlys.no", "regional", "Troms", "Tromsø", "Nyheter og meninger fra Nord-Norge.", "red"],
  ["itromso", "iTromsø", "itromso.no", "local", "Troms", "Tromsø", "Små og store historier fra Tromsø.", "blue"],
  ["ht", "Harstad Tidende", "ht.no", "local", "Troms", "Harstad", "Nyheter fra Harstad og Hålogaland."],
  ["framtid", "Framtid i Nord", "framtidinord.no", "local", "Troms", "Nordreisa", "Lokalavisen for Nord-Troms."],
  ["altaposten", "Altaposten", "altaposten.no", "local", "Finnmark", "Alta", "Hverdagsliv og nyheter fra Alta."],
  ["ifinnmark", "iFinnmark", "ifinnmark.no", "regional", "Finnmark", "Hammerfest", "Nyheter fra hele Finnmark.", "blue"],
  ["sagat", "Ságat", "sagat.no", "local", "Finnmark", "Karasjok", "Samiske nyheter på norsk."],
  ["an", "Avisa Nordland", "an.no", "regional", "Nordland", "Bodø", "Aktuelt fra Bodø og Salten."],
  ["lofotposten", "Lofotposten", "lofotposten.no", "local", "Nordland", "Svolvær", "Lofotens egne historier og nyheter."],
  ["helgelendingen", "Helgelendingen", "helg.no", "local", "Nordland", "Mosjøen", "Tett på folk og nyheter på Helgeland."],
  ["ranablad", "Rana Blad", "ranablad.no", "local", "Nordland", "Mo i Rana", "Lokale nyheter fra Rana."],
  ["smp", "Sunnmørsposten", "smp.no", "regional", "Møre og Romsdal", "Ålesund", "Nyheter fra Ålesund og Sunnmøre."],
  ["rbnett", "Romsdals Budstikke", "rbnett.no", "local", "Møre og Romsdal", "Molde", "Nært på nyhetene i Romsdal."],
  ["tk", "Tidens Krav", "tk.no", "local", "Møre og Romsdal", "Kristiansund", "Nyheter fra Kristiansund og Nordmøre."],
  ["t-a", "Trønder-Avisa", "t-a.no", "regional", "Trøndelag", "Steinkjer", "Nyheter og debatt fra Trøndelag."],
  ["nidaros", "Nidaros", "nidaros.no", "local", "Trøndelag", "Trondheim", "Lokalavisen for byen og folket."],
  ["retten", "Arbeidets Rett", "retten.no", "local", "Trøndelag", "Røros", "Nyheter fra Røros og fjellregionen."],
  ["gd", "Gudbrandsdølen Dagningen", "gd.no", "local", "Innlandet", "Lillehammer", "Nyheter fra Lillehammer og Gudbrandsdalen."],
  ["ha", "Hamar Arbeiderblad", "h-a.no", "local", "Innlandet", "Hamar", "Lokalt fra Hamar og Hedmarken."],
  ["oa", "Oppland Arbeiderblad", "oa.no", "local", "Innlandet", "Gjøvik", "Nyheter fra Gjøvik, Toten og Land."],
  ["ostlendingen", "Østlendingen", "ostlendingen.no", "local", "Innlandet", "Elverum", "Nyheter fra Østerdalen og omegn."],
  ["rb", "Romerikes Blad", "rb.no", "local", "Akershus", "Lillestrøm", "Lokale nyheter fra hele Romerike."],
  ["budstikka", "Budstikka", "budstikka.no", "local", "Akershus", "Asker og Bærum", "Tett på Asker og Bærum."],
  ["oblad", "Østlandets Blad", "oblad.no", "local", "Akershus", "Nordre Follo", "Nyheter og hverdagsliv fra Follo."],
  ["aao", "Avisa Oslo", "avisaoslo.no", "local", "Oslo", "Oslo", "Nyhetene fra byen og bydelene.", "bold"],
  ["dt", "Drammens Tidende", "dt.no", "local", "Buskerud", "Drammen", "Nyheter fra Drammen og distriktet."],
  ["lp", "Laagendalsposten", "laagendalsposten.no", "local", "Buskerud", "Kongsberg", "Kongsberg og Numedal, nært og lokalt."],
  ["ringblad", "Ringerikes Blad", "ringblad.no", "local", "Buskerud", "Hønefoss", "Lokale nyheter fra Ringerike og Hole."],
  ["fb", "Fredriksstad Blad", "f-b.no", "local", "Østfold", "Fredrikstad", "Små og store saker fra Fredrikstad."],
  ["sa", "Sarpsborg Arbeiderblad", "sa.no", "local", "Østfold", "Sarpsborg", "Nyheter fra Sarpsborg og omegn."],
  ["moss", "Moss Avis", "moss-avis.no", "local", "Østfold", "Moss", "Lokalavisen for Moss og distriktet."],
  ["tb", "Tønsbergs Blad", "tb.no", "local", "Vestfold", "Tønsberg", "Nyheter fra Tønsberg og Færder."],
  ["sb", "Sandefjords Blad", "sb.no", "local", "Vestfold", "Sandefjord", "Tett på det som skjer i Sandefjord."],
  ["op", "Østlands-Posten", "op.no", "local", "Vestfold", "Larvik", "Lokale nyheter fra Larvik og Lardal."],
  ["ta", "Telemarksavisa", "ta.no", "regional", "Telemark", "Skien", "Nyheter og meninger fra Telemark."],
  ["varden", "Varden", "varden.no", "regional", "Telemark", "Skien", "Lokale perspektiver fra Telemark."],
  ["kv", "Kragerø Blad Vestmar", "kv.no", "local", "Telemark", "Kragerø", "Nyheter fra Kragerø og Drangedal."],
  ["agderposten", "Agderposten", "agderposten.no", "regional", "Agder", "Arendal", "Nyheter fra Arendal og østre Agder."],
  ["lister", "Lister", "lister24.no", "local", "Agder", "Farsund", "Nyheter fra Lister-regionen."],
  ["havis", "Haugesunds Avis", "h-avis.no", "local", "Rogaland", "Haugesund", "Aktuelt fra Haugalandet og Sunnhordland."],
  ["dalane", "Dalane Tidende", "dalane-tidende.no", "local", "Rogaland", "Egersund", "Lokale historier fra Dalane."],
  ["jaerbladet", "Jærbladet", "jbl.no", "local", "Rogaland", "Bryne", "Nyheter fra Jæren."],
  ["firda", "Firda", "firda.no", "local", "Vestland", "Førde", "Nyheter fra Sunnfjord og Ytre Sogn."],
  ["sogn", "Sogn Avis", "sognavis.no", "local", "Vestland", "Leikanger", "Nyheter fra bygdene langs Sognefjorden."],
  ["sunnhordland", "Sunnhordland", "sunnhordland.no", "local", "Vestland", "Stord", "Nyheter fra Stord og Sunnhordland."],
  ["e24", "E24", "e24.no", "specialist", "Oslo", "Oslo", "Økonomi og næringsliv, fra børs til hverdag.", "bold red"],
  ["tu", "Teknisk Ukeblad", "tu.no", "specialist", "Oslo", "Oslo", "Teknologi, industri og ingeniørkunst.", "blue"],
  ["nationen", "Nationen", "nationen.no", "specialist", "Oslo", "Oslo", "Landbruk, distrikt og næringsliv."],
  ["altinget", "Altinget", "altinget.no", "specialist", "Oslo", "Oslo", "Politikk og innsikt i beslutningene."],
  ["fiskeribladet", "Fiskeribladet", "fiskeribladet.no", "specialist", "Vestland", "Bergen", "Nyheter om fiskeri og havbruk.", "blue"],
].map(([id, name, domain, category, county, city, description, style = ""]) => ({
  id, name, url: `https://www.${domain}`, category, county, city, description, style,
}));

const storageKey = "papers-united-favorites";
const knownIds = new Set(newspapers.map(paper => paper.id));
let favorites = new Set();
let storageAvailable = true;
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(stored)) favorites = new Set(stored.filter(id => knownIds.has(id)));
} catch {
  storageAvailable = false;
}
const state = { search: "", county: "", category: "all", favoritesOnly: false };
const grid = document.querySelector("#newspapers");
const search = document.querySelector("#search");
const countySelect = document.querySelector("#county");
const categoryButtons = [...document.querySelectorAll("[data-category]")];
const allButton = document.querySelector("#all-papers");
const favoritesButton = document.querySelector("#favorites");
const normalize = value => value.toLocaleLowerCase("nb").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/æ/g, "ae").replace(/ø/g, "o");

for (const county of counties) {
  const option = document.createElement("option");
  option.value = county;
  option.textContent = county;
  countySelect.append(option);
}
document.querySelector("#total-count").textContent = newspapers.length;

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function externalLink(paper, className, text) {
  const link = element("a", className, text);
  link.href = paper.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  const label = text === paper.name ? paper.name : `${text} – ${paper.name}`;
  link.setAttribute("aria-label", `${label} – åpnes i ny fane`);
  return link;
}

function updateFavoriteButton(button, paper) {
  const saved = favorites.has(paper.id);
  button.textContent = saved ? "♥" : "♡";
  button.setAttribute("aria-pressed", String(saved));
  button.setAttribute("aria-label", `${saved ? "Fjern" : "Lagre"} ${paper.name} ${saved ? "fra" : "som"} favoritt`);
}

function render() {
  const terms = normalize(state.search.trim()).split(/\s+/).filter(Boolean);
  const visible = newspapers.filter(paper => {
    const haystack = normalize(`${paper.name} ${paper.city} ${paper.county} ${paper.description} ${categoryNames[paper.category]}`);
    return (!state.favoritesOnly || favorites.has(paper.id))
      && (!state.county || paper.county === state.county)
      && (state.category === "all" || paper.category === state.category)
      && terms.every(term => haystack.includes(term));
  });
  document.querySelector("#favorite-count").textContent = favorites.size;
  document.querySelector("#results-count").textContent = `Viser ${visible.length} av ${newspapers.length} aviser${state.favoritesOnly ? " · Mine favoritter" : ""}`;
  allButton.classList.toggle("active", !state.favoritesOnly);
  allButton.setAttribute("aria-pressed", String(!state.favoritesOnly));
  favoritesButton.classList.toggle("active", state.favoritesOnly);
  favoritesButton.setAttribute("aria-pressed", String(state.favoritesOnly));
  categoryButtons.forEach(button => {
    const active = button.dataset.category === state.category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  const fragment = document.createDocumentFragment();
  for (const paper of visible) {
    const card = element("article", "newspaper-card");
    const top = element("div", "card-top");
    const badge = element("span", `badge ${paper.category}`, categoryNames[paper.category]);
    const favorite = element("button", "favorite-button");
    favorite.type = "button";
    favorite.dataset.id = paper.id;
    updateFavoriteButton(favorite, paper);
    const heading = element("h3", paper.style.split(" ").map(style => `wordmark-${style}`).join(" "));
    heading.append(externalLink(paper, "", paper.name));
    top.append(badge, favorite);
    const bottom = element("div", "card-bottom");
    bottom.append(element("span", "location", paper.category === "national" ? "Norge" : paper.city), externalLink(paper, "visit-link", "Besøk avis ↗"));
    card.append(top, heading, element("p", "card-description", paper.description), bottom);
    fragment.append(card);
  }
  grid.replaceChildren(fragment);
  document.querySelector("#empty-state").hidden = visible.length > 0;
  document.querySelector("#empty-message").textContent = state.favoritesOnly && favorites.size === 0
    ? "Trykk på hjertet ved en avis for å bygge din egen avishylle."
    : "Prøv et annet søkeord, eller nullstill filtrene for å se hele avishyllen.";
  document.querySelector("#storage-note").hidden = storageAvailable;
}

function reset() {
  Object.assign(state, { search: "", county: "", category: "all", favoritesOnly: false });
  search.value = "";
  countySelect.value = "";
  render();
}

search.addEventListener("input", () => { state.search = search.value; render(); });
countySelect.addEventListener("change", () => { state.county = countySelect.value; render(); });
categoryButtons.forEach(button => button.addEventListener("click", () => {
  state.category = button.dataset.category;
  render();
}));
allButton.addEventListener("click", () => { state.favoritesOnly = false; render(); });
favoritesButton.addEventListener("click", () => { state.favoritesOnly = true; render(); });
document.querySelector("#reset").addEventListener("click", reset);
document.querySelector("#empty-reset").addEventListener("click", () => { reset(); search.focus(); });
grid.addEventListener("click", event => {
  const button = event.target.closest(".favorite-button");
  if (!button) return;
  const id = button.dataset.id;
  const buttons = [...grid.querySelectorAll(".favorite-button")];
  const index = buttons.indexOf(button);
  if (favorites.has(id)) favorites.delete(id);
  else favorites.add(id);
  try {
    localStorage.setItem(storageKey, JSON.stringify([...favorites]));
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  render();
  const nextButtons = [...grid.querySelectorAll(".favorite-button")];
  const focusTarget = nextButtons.find(item => item.dataset.id === id)
    || nextButtons[Math.min(index, nextButtons.length - 1)]
    || document.querySelector("#empty-reset");
  focusTarget.focus({ preventScroll: true });
});
render();
