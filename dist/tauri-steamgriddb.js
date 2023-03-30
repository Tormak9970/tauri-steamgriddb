var p = Object.defineProperty;
var G = (h, e, t) => e in h ? p(h, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : h[e] = t;
var y = (h, e, t) => (G(h, typeof e != "symbol" ? e + "" : e, t), t);
import { http as w } from "@tauri-apps/api";
class $ {
  constructor(e) {
    y(this, "key");
    y(this, "baseURL");
    y(this, "headers");
    var t, r;
    typeof e == "string" && (e = { key: e }), this.baseURL = (t = e.baseURL) != null ? t : "https://www.steamgriddb.com/api/v2", this.key = (r = e.key) != null ? r : "", this.headers = {}, e.headers && (this.headers = Object.assign({}, e.headers)), this.key ? this.headers.Authorization = `Bearer ${this.key}` : process.emitWarning("API Key not provided, some methods won't work.");
  }
  buildQuery(e) {
    const t = ["styles", "dimensions", "mimes", "types"], r = ["nsfw", "humor", "epilepsy", "oneoftag", "page"], i = {};
    return t.forEach((s) => {
      var a;
      (a = e[s]) != null && a.length && (i[s] = e[s].join(","));
    }), r.forEach((s) => {
      typeof e[s] < "u" && (i[s] = e[s]);
    }), i;
  }
  async handleRequest(e, t, r = {}, i = null) {
    var n, g, c, u, m, o, l;
    let s = {
      headers: this.headers,
      method: e,
      params: r
    };
    i && (s = Object.assign({}, s, { formData: i }));
    let a;
    try {
      a = await w.fetch(`${this.baseURL}${t}`, s);
    } catch (d) {
      throw d.message = (c = (g = (n = d.response.data) == null ? void 0 : n.errors) == null ? void 0 : g.join(", ")) != null ? c : d.message, d;
    }
    if (a != null && a.data.success)
      return (u = a.data.data) != null ? u : a.data.success;
    throw new Error((l = (o = (m = a.data) == null ? void 0 : m.errors) == null ? void 0 : o.join(", ")) != null ? l : "Unknown SteamGridDB error.");
  }
  async searchGame(e) {
    return await this.handleRequest("GET", `/search/autocomplete/${encodeURIComponent(e)}`);
  }
  async getGame(e) {
    return await this.handleRequest("GET", `/games/${e.type}/${e.id}`);
  }
  async getGameById(e) {
    return this.getGame({ id: e, type: "id" });
  }
  async getGameBySteamAppId(e) {
    return this.getGame({ id: e, type: "steam" });
  }
  async getGrids(e) {
    return await this.handleRequest("GET", `/grids/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getGridsById(e, t, r, i, s, a, n) {
    return this.getGrids({
      type: "game",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getGridsBySteamAppId(e, t, r, i, s, a, n) {
    return this.getGrids({
      type: "steam",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getHeroes(e) {
    return await this.handleRequest("GET", `/heroes/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getHeroesById(e, t, r, i, s, a, n) {
    return this.getHeroes({
      type: "game",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getHeroesBySteamAppId(e, t, r, i, s, a, n) {
    return this.getHeroes({
      type: "steam",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getIcons(e) {
    return await this.handleRequest("GET", `/icons/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getIconsById(e, t, r, i, s, a, n) {
    return this.getIcons({
      type: "game",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getIconsBySteamAppId(e, t, r, i, s, a, n) {
    return this.getIcons({
      type: "steam",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getLogos(e) {
    return await this.handleRequest("GET", `/logos/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getLogosById(e, t, r, i, s, a, n) {
    return this.getLogos({
      type: "game",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
  async getLogosBySteamAppId(e, t, r, i, s, a, n) {
    return this.getLogos({
      type: "steam",
      id: e,
      styles: t,
      dimensions: r,
      mimes: i,
      types: s,
      nsfw: a,
      humor: n
    });
  }
}
export {
  $ as SGDB
};
