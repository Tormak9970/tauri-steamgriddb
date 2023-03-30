declare module '@tormak/tauri-steamgriddb' {
  import type { SGDBOptions, SGDBGame, SGDBImage, SGDBImageOptions } from "steamgriddb";

  type TauriRequest = {
    data: string,
    headers: Record<string, string>,
    ok: boolean,
    rawHeaders: Record<string, string[]>,
    status: number,
    url: string
  }

  class RequestError extends Error {
    response: TauriRequest;

    constructor(message: string, response: TauriRequest);
  }

  /**
   * Tauri compatible wrapper for the SteamGridDB API.
   */
  class SGDB {
    private readonly key: string;
    private readonly baseURL: string;
    private readonly headers: Record<string, any>;

    /**
     * Creates a new SGDB instance.
     * @param options The api key or SGDB options
     */
    constructor(options: SGDBOptions | string);

    private buildQuery(options: any): { [key: string]: string; };

    /**
     * General request function for intereacting with the SteamGridDB api.
     * @param method The http method.
     * @param url The api request url.
     * @param params Optional request parameters.
     * @param formData Optional form data.
     * @returns A promise resolving to the request's result.
     */
    // @ts-ignore
    handleRequest(method: http.HttpVerb, url: string, params: { [key: string]: string; }, formData): Promise<any>;

    /**
     * Gets a list of possible matches for a query.
     * @param query The search query.
     * @returns A promise resolving to a list of possible matches.
     */
    searchGame(query: string): Promise<SGDBGame[]>;

    /**
     * Gets information for a game.
     * @param options The SGDB request options
     * @returns A promise resolving to the game's information.
     */
    getGame(options: any): Promise<SGDBGame>;

    /**
     * Gets information for a game given its id.
     * @param id The game's id.
     * @returns A promise resolving to the game's information.
     */
    getGameById(id: number): Promise<SGDBGame>;

    /**
     * Gets information for a steam game given its id.
     * @param id The game's id.
     * @returns A promise resolving to the game's information.
     */
    getGameBySteamAppId(id: number): Promise<SGDBGame>;

    /**
     * Gets grids for a game given its platform and id.
     * @param options The SGDB request options
     * @returns A promise resolving to the game's grids.
     */
    getGrids(options: SGDBImageOptions): Promise<SGDBImage[]>;

    /**
     * Gets a list of grids based on the provided game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of grids for the desired game matching the provided filters.
     */
    getGridsById(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets a list of grids based on the provided steam game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of grids for the desired steam game matching the provided filters.
     */
    getGridsBySteamAppId(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets heros for a game given its platform and id.
     * @param options The SGDB request options
     * @returns A promise resolving to the game's heros.
     */
    getHeroes(options: SGDBImageOptions): Promise<SGDBImage[]>;

    /**
     * Gets a list of heroes based on the provided game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of heroes for the desired game matching the provided filters.
     */
    getHeroesById(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets a list of heroes based on the provided steam game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of heroes for the desired steam game matching the provided filters.
     */
    getHeroesBySteamAppId(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets icons for a game given its platform and id.
     * @param options The SGDB request options
     * @returns A promise resolving to the game's icons.
     */
    getIcons(options: SGDBImageOptions): Promise<SGDBImage[]>;

    /**
     * Gets a list of icons based on the provided game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of heroes for the desired game matching the provided filters.
     */
    getIconsById(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets a list of icons based on the provided steam game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of icons for the desired steam game matching the provided filters.
     */
    getIconsBySteamAppId(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets logos for a game given its platform and id.
     * @param options The SGDB request options
     * @returns A promise resolving to the game's logos.
     */
    getLogos(options: SGDBImageOptions): Promise<SGDBImage[]>;

    /**
     * Gets a list of logos based on the provided game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of logos for the desired game matching the provided filters.
     */
    getLogosById(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;

    /**
     * Gets a list of logos based on the provided steam game id and filters.
     * @param id The game's id.
     * @param styles List of styles to include.
     * @param dimensions List of dimensions to include,
     * @param mimes List of mimes to include.
     * @param types List of types to include,
     * @param nsfw Whether the result should include nsfw images
     * @param humor Whether the result should include humor  images
     * @returns A promise resolving to a list of logos for the desired steam game matching the provided filters.
     */
    getLogosBySteamAppId(
      id: number,
      styles?: string[],
      dimensions?: string[],
      mimes?: string[],
      types?: string[],
      nsfw?: string,
      humor?: string
    ): Promise<SGDBImage[]>;
  }
}
