import { http } from "@tauri-apps/api";
import type { SGDBOptions, SGDBGame, SGDBAuthor, SGDBImage, SGDBImageOptions } from "steamgriddb";

export type TauriRequest = {
  data: string,
  headers: Record<string, string>,
  ok: boolean,
  rawHeaders: Record<string, string[]>,
  status: number,
  url: string
}

export class RequestError extends Error {
  response: TauriRequest;

  constructor(message: string, response: TauriRequest) {
    super(message);
    this.name = "Request Error"
    this.response = response;
  }
}

/**
 * Tauri compatible wrapper for the SteamGridDB API.
 */
export class SGDB {
  private readonly key: string;
  private readonly baseURL: string;
  private readonly headers: Record<string, any>;

  /**
   * Creates a new SGDB instance.
   * @param options The api key or SGDB options.
   */
  constructor(options: SGDBOptions | string) {
    // Allow passing just the API key as a string
    if (typeof options === "string") {
      options = { key: options };
    }

    this.baseURL = options.baseURL ?? "https://www.steamgriddb.com/api/v2";
    this.key = options.key ?? "";
    this.headers = {};

    if (options.headers) {
      this.headers = Object.assign({}, options.headers);
    }

    if (this.key) {
      this.headers.Authorization = `Bearer ${this.key}`;
    } else {
      process.emitWarning("API Key not provided, some methods won't work.");
    }
  }

  private buildQuery(options: any): { [key: string]: string; } {
    const multiParams = ["styles", "dimensions", "mimes", "types"];
    const singleParams = ["nsfw", "humor", "epilepsy", "oneoftag", "page"];
    const params: any = {};

    multiParams.forEach((queryParam) => {
      if (options[queryParam]?.length) {
        params[queryParam] = options[queryParam].join(",");
      }
    });

    singleParams.forEach((queryParam) => {
      if (typeof options[queryParam] !== "undefined") {
        params[queryParam] = options[queryParam];
      }
    });
    return params;
  }

  /**
   * General request function for intereacting with the SteamGridDB api.
   * @param method The http method.
   * @param url The api request url.
   * @param params Optional request parameters.
   * @param formData Optional form data.
   * @returns A promise resolving to the request's result.
   */
  async handleRequest(method: http.HttpVerb, url: string, params: { [key: string]: string; } = {}, formData = null): Promise<any> {
    let options = {
      headers: this.headers,
      method,
      params: params
    };

    if (formData) {
      options = Object.assign({}, options, { formData: formData });
    }

    let response = await http.fetch<any>(`${this.baseURL}/temp/${url}`, options);

    if (response.ok) {
      if (response?.data.success) {
        return response.data.data ?? response.data.success;
      } else {
        throw new RequestError(response.data?.errors?.join(", ") ?? "Unknown SteamGridDB error.", response);
      }
    } else {
      throw new RequestError(response.data?.errors?.join(", ") ?? "SteamGridDB error.", response);
    }
  }

  /**
   * Gets a list of possible matches for a query.
   * @param query The search query.
   * @returns A promise resolving to a list of possible matches.
   */
  async searchGame(query: string): Promise<SGDBGame[]> {
    return await this.handleRequest("GET", `/search/autocomplete/${encodeURIComponent(query)}`);
  }

  /**
   * Gets information for a game.
   * @param options The SGDB request options
   * @returns A promise resolving to the game's information.
   */
  async getGame(options: any): Promise<SGDBGame> {
    return await this.handleRequest("GET", `/games/${options.type}/${options.id}`);
  }

  /**
   * Gets information for a game given its id.
   * @param id The game's id.
   * @returns A promise resolving to the game's information.
   */
  async getGameById(id: number): Promise<SGDBGame> {
    return this.getGame({id: id, type: "id"});
  }

  /**
   * Gets information for a steam game given its id.
   * @param id The game's id.
   * @returns A promise resolving to the game's information.
   */
  async getGameBySteamAppId(id: number): Promise<SGDBGame> {
    return this.getGame({id: id, type: "steam"});
  }

  /**
   * Gets grids for a game given its platform and id.
   * @param options The SGDB request options.
   * @returns A promise resolving to the game's grids.
   */
  async getGrids(options: SGDBImageOptions): Promise<SGDBImage[]> {
    return await this.handleRequest("GET", `/grids/${options.type}/${options.id}`, this.buildQuery(options));
  }

  /**
   * Gets a list of grids based on the provided game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of grids for the desired game matching the provided filters.
   */
  async getGridsById(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getGrids({
      type: "game",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets a list of grids based on the provided steam game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of grids for the desired steam game matching the provided filters.
   */
  async getGridsBySteamAppId(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getGrids({
      type: "steam",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets heros for a game given its platform and id.
   * @param options The SGDB request options.
   * @returns A promise resolving to the game's heros.
   */
  async getHeroes(options: SGDBImageOptions): Promise<SGDBImage[]> {
    return await this.handleRequest("GET", `/heroes/${options.type}/${options.id}`, this.buildQuery(options));
  }

  /**
   * Gets a list of heroes based on the provided game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images
   * @param humor Whether the result should include humor images
   * @returns A promise resolving to a list of heroes for the desired game matching the provided filters.
   */
  async getHeroesById(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getHeroes({
      type: "game",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets a list of heroes based on the provided steam game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images
   * @param humor Whether the result should include humor images
   * @returns A promise resolving to a list of heroes for the desired steam game matching the provided filters.
   */
  async getHeroesBySteamAppId(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getHeroes({
      type: "steam",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets icons for a game given its platform and id.
   * @param options The SGDB request options.
   * @returns A promise resolving to the game's icons.
   */
  async getIcons(options: SGDBImageOptions): Promise<SGDBImage[]> {
    return await this.handleRequest("GET", `/icons/${options.type}/${options.id}`, this.buildQuery(options));
  }

  /**
   * Gets a list of icons based on the provided game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of heroes for the desired game matching the provided filters.
   */
  async getIconsById(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getIcons({
      type: "game",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets a list of icons based on the provided steam game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of icons for the desired steam game matching the provided filters.
   */
  async getIconsBySteamAppId(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getIcons({
      type: "steam",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets logos for a game given its platform and id.
   * @param options The SGDB request options.
   * @returns A promise resolving to the game's logos.
   */
  async getLogos(options: SGDBImageOptions): Promise<SGDBImage[]> {
    return await this.handleRequest("GET", `/logos/${options.type}/${options.id}`, this.buildQuery(options));
  }

  /**
   * Gets a list of logos based on the provided game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of logos for the desired game matching the provided filters.
   */
  async getLogosById(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getLogos({
      type: "game",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Gets a list of logos based on the provided steam game id and filters.
   * @param id The game's id.
   * @param styles List of styles to include.
   * @param dimensions List of dimensions to include.
   * @param mimes List of mimes to include.
   * @param types List of types to include.
   * @param nsfw Whether the result should include nsfw images.
   * @param humor Whether the result should include humor images.
   * @returns A promise resolving to a list of logos for the desired steam game matching the provided filters.
   */
  async getLogosBySteamAppId(
    id: number,
    styles?: string[],
    dimensions?: string[],
    mimes?: string[],
    types?: string[],
    nsfw?: string,
    humor?: string
  ): Promise<SGDBImage[]> {
    return this.getLogos({
      type: "steam",
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * Deletes the provided grids from SteamGridDB.
   * @param ids Id or list of ids of grids to delete.
   * @returns A promise resolving to true if the operation succeeded.
   */
  async deleteGrids(ids:number|number[]):Promise<boolean> {
    const gridIds = Array.isArray(ids) ? ids.join(",") : ids.toString();

    return await this.handleRequest("DELETE", `/grids/${Array.isArray(gridIds) ? gridIds.join(",") : gridIds}`);
  }
}