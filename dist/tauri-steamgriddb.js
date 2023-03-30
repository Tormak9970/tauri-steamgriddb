var p = Object.defineProperty;
var G = (d, e, t) => e in d ? p(d, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[e] = t;
var h = (d, e, t) => (G(d, typeof e != "symbol" ? e + "" : e, t), t);
import { http as w } from "@tauri-apps/api";
class l extends Error {
  constructor(t, a) {
    super(t);
    h(this, "response");
    this.name = "Request Error", this.response = a;
  }
}
class R {
  constructor(e) {
    h(this, "key");
    h(this, "baseURL");
    h(this, "headers");
    var t, a;
    typeof e == "string" && (e = { key: e }), this.baseURL = (t = e.baseURL) != null ? t : "https://www.steamgriddb.com/api/v2", this.key = (a = e.key) != null ? a : "", this.headers = {}, e.headers && (this.headers = Object.assign({}, e.headers)), this.key ? this.headers.Authorization = `Bearer ${this.key}` : process.emitWarning("API Key not provided, some methods won't work.");
  }
  buildQuery(e) {
    const t = ["styles", "dimensions", "mimes", "types"], a = ["nsfw", "humor", "epilepsy", "oneoftag", "page"], i = {};
    return t.forEach((r) => {
      var s;
      (s = e[r]) != null && s.length && (i[r] = e[r].join(","));
    }), a.forEach((r) => {
      typeof e[r] < "u" && (i[r] = e[r]);
    }), i;
  }
  async handleRequest(e, t, a = {}, i = null) {
    var n, y, c, g, u, o, m;
    let r = {
      headers: this.headers,
      method: e,
      params: a
    };
    i && (r = Object.assign({}, r, { formData: i }));
    let s = await w.fetch(`${this.baseURL}/temp/${t}`, r);
    if (s.ok) {
      if (s != null && s.data.success)
        return (n = s.data.data) != null ? n : s.data.success;
      throw new l((g = (c = (y = s.data) == null ? void 0 : y.errors) == null ? void 0 : c.join(", ")) != null ? g : "Unknown SteamGridDB error.", s);
    } else
      throw new l((m = (o = (u = s.data) == null ? void 0 : u.errors) == null ? void 0 : o.join(", ")) != null ? m : "SteamGridDB error.", s);
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
  async getGridsById(e, t, a, i, r, s, n) {
    return this.getGrids({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getGridsBySteamAppId(e, t, a, i, r, s, n) {
    return this.getGrids({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getHeroes(e) {
    return await this.handleRequest("GET", `/heroes/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getHeroesById(e, t, a, i, r, s, n) {
    return this.getHeroes({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getHeroesBySteamAppId(e, t, a, i, r, s, n) {
    return this.getHeroes({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getIcons(e) {
    return await this.handleRequest("GET", `/icons/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getIconsById(e, t, a, i, r, s, n) {
    return this.getIcons({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getIconsBySteamAppId(e, t, a, i, r, s, n) {
    return this.getIcons({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getLogos(e) {
    return await this.handleRequest("GET", `/logos/${e.type}/${e.id}`, this.buildQuery(e));
  }
  async getLogosById(e, t, a, i, r, s, n) {
    return this.getLogos({
      type: "game",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async getLogosBySteamAppId(e, t, a, i, r, s, n) {
    return this.getLogos({
      type: "steam",
      id: e,
      styles: t,
      dimensions: a,
      mimes: i,
      types: r,
      nsfw: s,
      humor: n
    });
  }
  async deleteGrids(e) {
    const t = Array.isArray(e) ? e.join(",") : e.toString();
    return await this.handleRequest("DELETE", `/grids/${Array.isArray(t) ? t.join(",") : t}`);
  }
}
export {
  l as RequestError,
  R as SGDB
};
