var f = Object.defineProperty;
var w = (y, e, t) => e in y ? f(y, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : y[e] = t;
var c = (y, e, t) => (w(y, typeof e != "symbol" ? e + "" : e, t), t);
import { http as I } from "@tauri-apps/api";
class p extends Error {
  constructor(t, a) {
    super(t);
    c(this, "response");
    this.name = "Request Error", this.response = a;
  }
}
class R {
  constructor(e) {
    c(this, "key");
    c(this, "baseURL");
    c(this, "headers");
    var t, a;
    typeof e == "string" && (e = { key: e }), this.baseURL = (t = e.baseURL) != null ? t : "https://www.steamgriddb.com/api/v2", this.key = (a = e.key) != null ? a : "", this.headers = {}, e.headers && (this.headers = Object.assign({}, e.headers)), this.key ? this.headers.Authorization = `Bearer ${this.key}` : process.emitWarning("API Key not provided, some methods won't work.");
  }
  buildQuery(e) {
    const t = ["styles", "dimensions", "mimes", "types", "platformdata"], a = ["nsfw", "humor", "epilepsy", "oneoftag", "page"], i = {};
    return t.forEach((s) => {
      var n;
      (n = e[s]) != null && n.length && (i[s] = e[s].join(","));
    }), a.forEach((s) => {
      typeof e[s] < "u" && (i[s] = e[s]);
    }), i;
  }
  async handleRequest(e, t, a = {}, i = null) {
    var d, h, g, u, o, l, m;
    let s = null;
    Object.entries(a).length > 0 && (s = "", Object.entries(a).forEach(([G, $]) => {
      s = s.concat(`&${G}=${$}`);
    }), s = s.substring(1));
    let n = {
      headers: this.headers,
      method: e
    };
    i && (n = Object.assign({}, n, { formData: i }));
    let r = await I.fetch(`${this.baseURL}${t}${s ? `?${s}` : ""}`, n);
    if (r.ok) {
      if (r != null && r.data.success)
        return (d = r.data.data) != null ? d : r.data.success;
      throw new p((u = (g = (h = r.data) == null ? void 0 : h.errors) == null ? void 0 : g.join(", ")) != null ? u : "Unknown SteamGridDB error.", r);
    } else
      throw new p((m = (l = (o = r.data) == null ? void 0 : o.errors) == null ? void 0 : l.join(", ")) != null ? m : "SteamGridDB error.", r);
  }
  async searchGame(e) {
    return await this.handleRequest("GET", `/search/autocomplete/${encodeURIComponent(e)}`);
  }
  async getGame(e, t) {
    return t ? await this.handleRequest("GET", `/games/${e.type}/${e.id}`, this.buildQuery(t)) : await this.handleRequest("GET", `/games/${e.type}/${e.id}`);
  }
  async getGameById(e, t) {
    return this.getGame({ id: e, type: "id" }, t);
  }
  async getGameBySteamAppId(e, t) {
    return this.getGame({ id: e, type: "steam" }, t);
  }
  async getGrids(e) {
    return await this.handleRequest("GET", `/grids/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getGridsById(e, t, a, i, s, n, r, d, h) {
    return this.getGrids({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getGridsBySteamAppId(e, t, a, i, s, n, r, d, h) {
    return this.getGrids({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getHeroes(e) {
    return await this.handleRequest("GET", `/heroes/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getHeroesById(e, t, a, i, s, n, r, d, h) {
    return this.getHeroes({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getHeroesBySteamAppId(e, t, a, i, s, n, r, d, h) {
    return this.getHeroes({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getIcons(e) {
    return await this.handleRequest("GET", `/icons/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getIconsById(e, t, a, i, s, n, r, d, h) {
    return this.getIcons({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getIconsBySteamAppId(e, t, a, i, s, n, r, d, h) {
    return this.getIcons({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getLogos(e) {
    return await this.handleRequest("GET", `/logos/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getLogosById(e, t, a, i, s, n, r, d, h) {
    return this.getLogos({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async getLogosBySteamAppId(e, t, a, i, s, n, r, d, h) {
    return this.getLogos({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: s,
      nsfw: n,
      humor: r,
      epilepsy: d,
      page: h
    });
  }
  async deleteGrids(e) {
    const t = Array.isArray(e) ? e.join(",") : e.toString();
    return await this.handleRequest("DELETE", `/grids/${Array.isArray(t) ? t.join(",") : t}`);
  }
}
export {
  p as RequestError,
  R as SGDB
};
