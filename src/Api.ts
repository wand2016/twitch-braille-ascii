/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  id: number;
  twitch_id: number;
  name: string;
  display_name?: string | null;
  avatar?: string | null;
  max_emoticons: number;
  is_donor?: boolean;
  badges?: number[];
  emote_sets?: number[];
}

export interface Badge {
  id: number;
  name: string;
  title: string;
  slot: number;
  replaces?: string | null;
  color?: string | null;
  image: string;
  urls: { "1": string; "2"?: string | null; "4"?: string | null };
  css?: string | null;
}

export interface Emote {
  id: number;
  name: string;
  height: number;
  width: number;
  public: boolean;
  hidden: boolean;
  modifier: boolean;
  offset?: string | null;
  margins?: string | null;
  css?: string | null;
  owner?: { _id: number; name: string; display_name?: string | null };
  urls?: { "1": string };
  animated?: { "1": string };
  status?: number;
  usage_count?: number;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  last_updated?: string;
}

export interface EmoteSet {
  id: number;
  _type: number;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  css?: string | null;
  emoticons: Emote[];
}

export interface Room {
  _id: number;
  twitch_id: number;
  id: string;
  is_group?: boolean;
  display_name?: string | null;
  set: number;
  moderator_badge?: string | null;
  vip_badge?: { "1": string; "2"?: string | null; "4"?: string | null };
  mod_urls?: { "1": string; "2"?: string | null; "4"?: string | null };
  user_badges?: object;
  user_badge_ids?: object;
  css?: string | null;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.frankerfacez.com";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
        ...(requestParams.headers || {}),
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FrankerFaceZ
 * @version 1.0
 * @termsOfService https://www.frankerfacez.com/terms
 * @baseUrl https://api.frankerfacez.com
 *
 * Get emotes. Set emotes. Be one with the emotes.
 *
 * ## Deprecated
 *
 * Version 1 of the FrankerFaceZ is deprecated and not receiving any feature
 * updates. Version 2 of the API, when released, will do everything version 1
 * does and more, and do it better.
 *
 * Version 1 of the API will not be removed when version 2 drops, and we have
 * no timeline to remove version 1. It can be safely used in applications.
 *
 *
 * ## Rate Limits
 *
 * > Please note that rate limits make us of oauth tokens, which are not currently
 * > supported by this limited API update. Once APIv2 is ready, oauth tokens will
 * > be more readily available. Until that time, please contact Stendec in the
 * > FrankerFaceZ Discord server if rate limits are presenting you an issue.
 *
 * FrankerFaceZ uses rate limits to help prevent our API from being
 * overloaded. We use the [generic cell rate algorithm](https://en.wikipedia.org/wiki/Generic_cell_rate_algorithm),
 * which is a leaky bucket-type limiter.
 *
 * The default limits are as follows:
 *
 * | Condition | Fill Rate | Bucket Size |
 * |-----------|-----------|-------------|
 * | User token is provided | 800 points per user per OAuth client | 800 points |
 * | App token is provided | 300 points per OAuth Client | 300 points |
 * | No token | 120 points per IP address | 120 points |
 *
 * **Note:** Limits are *not* per IP address when an app token or user token is provided.
 *
 * If you exhaust your available points, an error is returned: HTTP 429 Too Many Requests
 *
 * When you make an API request, you will receive a set of headers
 * containing information pertaining to rate limiting:
 *
 * | Header | Description |
 * |--------|-------------|
 * | `RateLimit-Limit` | The maximum number of points you can spend within one minute. |
 * | `RateLimit-Remaining` | The remaining points in your bucket. |
 * | `RateLimit-Reset` | The number of seconds remaining until your bucket will refill to maximum capacity. |
 * | `Retry-After` | The number of seconds until you should retry. Only sent if a request was denied due to an exhausted capacity. |
 *
 * If you require a higher rate limit, please ask in the general development channel of our Discord.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  v1 = {
    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserDetail
     * @summary Get a user by name
     * @request GET:/v1/user/{userName}
     */
    userDetail: (userName: string, params: RequestParams = {}) =>
      this.request<{ user?: User; badges?: object; sets?: object }, any>({
        path: `/v1/user/${userName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserDetail2
     * @summary Get a user by name, without extra data
     * @request GET:/v1/_user/{userName}
     * @originalName userDetail
     * @duplicate
     */
    userDetail2: (userName: string, params: RequestParams = {}) =>
      this.request<{ user?: User }, any>({
        path: `/v1/_user/${userName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserIdDetail
     * @summary Get a user by Twitch ID
     * @request GET:/v1/user/id/{twitchID}
     */
    userIdDetail: (twitchId: number, params: RequestParams = {}) =>
      this.request<{ user?: User; badges?: object; sets?: object }, any>({
        path: `/v1/user/id/${twitchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserIdDetail2
     * @summary Get a user by Twitch ID, without extra data
     * @request GET:/v1/_user/id/{twitchID}
     * @originalName userIdDetail
     * @duplicate
     */
    userIdDetail2: (twitchId: number, params: RequestParams = {}) =>
      this.request<{ user?: User }, any>({
        path: `/v1/_user/id/${twitchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserIdDetail3
     * @summary Get a user by FFZ ID
     * @request GET:/v1/user/_id/{userID}
     * @originalName userIdDetail
     * @duplicate
     */
    userIdDetail3: (userId: number, params: RequestParams = {}) =>
      this.request<{ user?: User; badges?: object; sets?: object }, any>({
        path: `/v1/user/_id/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Users
     * @name UserIdDetail4
     * @summary Get a user by FFZ ID, without extra data
     * @request GET:/v1/_user/_id/{userID}
     * @originalName userIdDetail
     * @duplicate
     */
    userIdDetail4: (userId: number, params: RequestParams = {}) =>
      this.request<{ user?: User }, any>({
        path: `/v1/_user/_id/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description This uses a random sample of channels using an emote to recommend emotes that other channels with this emote are also using. **Rate Limit Cost:** 5 points
     *
     * @tags Emotes
     * @name EmoteRecommendDetail
     * @summary [WIP] Get recommended emotes to an emote
     * @request GET:/v1/emote/{emoteID}/recommend
     */
    emoteRecommendDetail: (emoteId: number, query?: { page?: number; per_page?: number }, params: RequestParams = {}) =>
      this.request<{ pages: number; total: number; recommendations: { score: number; emote: Emote }[] }, any>({
        path: `/v1/emote/${emoteId}/recommend`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 30 points
     *
     * @tags Emotes
     * @name EmoteSimilarDetail
     * @summary [WIP] Get similar emotes (by image) to an emote
     * @request GET:/v1/emote/{emoteID}/similar
     */
    emoteSimilarDetail: (
      emoteId: number,
      query?: { similarity?: number; unapproved?: boolean; page?: number; per_page?: number },
      params: RequestParams = {},
    ) =>
      this.request<{ pages: number; total: number; emotes: { distance: number; emote: Emote }[] }, any>({
        path: `/v1/emote/${emoteId}/similar`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emotes
     * @name EmoteDetail
     * @summary Get an emote by ID
     * @request GET:/v1/emote/{emoteID}
     */
    emoteDetail: (emoteId: number, params: RequestParams = {}) =>
      this.request<{ emote: Emote }, any>({
        path: `/v1/emote/${emoteId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emotes
     * @name EmotesList
     * @summary Get emotes in bulk
     * @request GET:/v1/emotes
     */
    emotesList: (
      query?: {
        q?: string | null;
        owner?: string | null;
        sensitive?: boolean;
        sort?: string;
        private?: boolean | "on" | "off";
        animated?: boolean | "on" | "off";
        high_dpi?: string;
        page?: number;
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          _links?: { next?: string; self?: string; prev?: string };
          _pages: number;
          _total: number;
          emoticons: Emote[];
        },
        any
      >({
        path: `/v1/emotes`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emotes
     * @name EmoticonsList
     * @summary Get emotes in bulk
     * @request GET:/v1/emoticons
     */
    emoticonsList: (
      query?: {
        q?: string | null;
        owner?: string | null;
        sensitive?: boolean;
        sort?: string;
        private?: boolean | "on" | "off";
        animated?: boolean | "on" | "off";
        high_dpi?: string;
        page?: number;
        per_page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          _links?: { next?: string; self?: string; prev?: string };
          _pages: number;
          _total: number;
          emoticons: Emote[];
        },
        any
      >({
        path: `/v1/emoticons`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Badges
     * @name BadgeDetail
     * @summary Get a badge by ID or name
     * @request GET:/v1/badge/{badgeID}
     */
    badgeDetail: (badgeId: string, params: RequestParams = {}) =>
      this.request<{ badge?: Badge; users?: object }, any>({
        path: `/v1/badge/${badgeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Badges
     * @name BadgeDetail2
     * @summary Get a badge by ID or name (plain)
     * @request GET:/v1/_badge/{badgeID}
     * @originalName badgeDetail
     * @duplicate
     */
    badgeDetail2: (badgeId: string, params: RequestParams = {}) =>
      this.request<{ badge?: Badge; users?: object }, any>({
        path: `/v1/_badge/${badgeId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Badges
     * @name BadgesList
     * @summary Get all badges (with user names)
     * @request GET:/v1/badges
     */
    badgesList: (params: RequestParams = {}) =>
      this.request<{ badges?: Badge[]; users?: object }, any>({
        path: `/v1/badges`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Badges
     * @name BadgesList2
     * @summary Get all badges (plain)
     * @request GET:/v1/_badges
     * @originalName badgesList
     * @duplicate
     */
    badgesList2: (params: RequestParams = {}) =>
      this.request<{ badges?: Badge[] }, any>({
        path: `/v1/_badges`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Badges
     * @name BadgesIdsList
     * @summary Get all badges (with user IDs)
     * @request GET:/v1/badges/ids
     */
    badgesIdsList: (params: RequestParams = {}) =>
      this.request<{ badges?: Badge[]; users?: object }, any>({
        path: `/v1/badges/ids`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomIdDetail
     * @summary Get a room by Twitch ID
     * @request GET:/v1/room/id/{twitchID}
     */
    roomIdDetail: (twitchId: number, params: RequestParams = {}) =>
      this.request<{ room?: Room; sets?: object }, any>({
        path: `/v1/room/id/${twitchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomIdDetail2
     * @summary Get a room by FFZ ID
     * @request GET:/v1/room/_id/{userID}
     * @originalName roomIdDetail
     * @duplicate
     */
    roomIdDetail2: (userId: number, params: RequestParams = {}) =>
      this.request<{ room?: Room; sets?: object }, any>({
        path: `/v1/room/_id/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomDetail
     * @summary Get a room by Twitch login
     * @request GET:/v1/room/{roomName}
     */
    roomDetail: (roomName: string, params: RequestParams = {}) =>
      this.request<{ room?: Room; sets?: object }, any>({
        path: `/v1/room/${roomName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomIdDetail3
     * @summary Get a room by Twitch ID (plain)
     * @request GET:/v1/_room/id/{twitchID}
     * @originalName roomIdDetail
     * @duplicate
     */
    roomIdDetail3: (twitchId: number, params: RequestParams = {}) =>
      this.request<{ room?: Room }, any>({
        path: `/v1/_room/id/${twitchId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomIdDetail4
     * @summary Get a room by FFZ ID (plain)
     * @request GET:/v1/_room/_id/{userID}
     * @originalName roomIdDetail
     * @duplicate
     */
    roomIdDetail4: (userId: number, params: RequestParams = {}) =>
      this.request<{ room?: Room }, any>({
        path: `/v1/_room/_id/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomDetail2
     * @summary Get a room by Twitch login (plain)
     * @request GET:/v1/_room/{roomName}
     * @originalName roomDetail
     * @duplicate
     */
    roomDetail2: (roomName: string, params: RequestParams = {}) =>
      this.request<{ room?: Room }, any>({
        path: `/v1/_room/${roomName}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomDetail
     * @summary Get multiple rooms by Twitch login
     * @request GET:/v1/multi_room/{roomNames}
     */
    multiRoomDetail: (roomNames: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[]; sets?: object }, any>({
        path: `/v1/multi_room/${roomNames}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomIdDetail
     * @summary Get multiple rooms by Twitch ID
     * @request GET:/v1/multi_room/id/{roomIDs}
     */
    multiRoomIdDetail: (roomIDs: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[]; sets?: object }, any>({
        path: `/v1/multi_room/id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomIdDetail2
     * @summary Get multiple rooms by FFZ ID
     * @request GET:/v1/multi_room/_id/{roomIDs}
     * @originalName multiRoomIdDetail
     * @duplicate
     */
    multiRoomIdDetail2: (roomIDs: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[]; sets?: object }, any>({
        path: `/v1/multi_room/_id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomDetail2
     * @summary Get multiple rooms by Twitch login (plain)
     * @request GET:/v1/_multi_room/{roomNames}
     * @originalName multiRoomDetail
     * @duplicate
     */
    multiRoomDetail2: (roomNames: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[] }, any>({
        path: `/v1/_multi_room/${roomNames}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomIdDetail3
     * @summary Get multiple rooms by Twitch ID (plain)
     * @request GET:/v1/_multi_room/id/{roomIDs}
     * @originalName multiRoomIdDetail
     * @duplicate
     */
    multiRoomIdDetail3: (roomIDs: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[] }, any>({
        path: `/v1/_multi_room/id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name MultiRoomIdDetail4
     * @summary Get multiple rooms by FFZ ID (plain)
     * @request GET:/v1/_multi_room/_id/{roomIDs}
     * @originalName multiRoomIdDetail
     * @duplicate
     */
    multiRoomIdDetail4: (roomIDs: string, params: RequestParams = {}) =>
      this.request<{ rooms?: Room[] }, any>({
        path: `/v1/_multi_room/_id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomsDetail
     * @summary Get limited info for multiple rooms by Twitch login
     * @request GET:/v1/rooms/{roomNames}
     */
    roomsDetail: (roomNames: string, params: RequestParams = {}) =>
      this.request<
        {
          template?: { static: string; animated: string };
          emotes: {
            id: number;
            name: string;
            animated: boolean;
            sizes: number[];
            width?: number;
            height?: number;
            owner?: { _id: number; name: string; display_name?: string | null };
          }[];
          rooms: { _id: number; id: number; login: string; emotes: number[] }[];
        },
        any
      >({
        path: `/v1/rooms/${roomNames}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomsIdDetail
     * @summary Get limited info for multiple rooms by Twitch ID
     * @request GET:/v1/rooms/id/{roomIDs}
     */
    roomsIdDetail: (roomIDs: string, params: RequestParams = {}) =>
      this.request<
        {
          template?: { static: string; animated: string };
          emotes: {
            id: number;
            name: string;
            animated: boolean;
            sizes: number[];
            width?: number;
            height?: number;
            owner?: { _id: number; name: string; display_name?: string | null };
          }[];
          rooms: { _id: number; id: number; login: string; emotes: number[] }[];
        },
        any
      >({
        path: `/v1/rooms/id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Rooms
     * @name RoomsIdDetail2
     * @summary Get limited info for multiple rooms by FFZ ID
     * @request GET:/v1/rooms/_id/{roomIDs}
     * @originalName roomsIdDetail
     * @duplicate
     */
    roomsIdDetail2: (roomIDs: string, params: RequestParams = {}) =>
      this.request<
        {
          template?: { static: string; animated: string };
          emotes: {
            id: number;
            name: string;
            animated: boolean;
            sizes: number[];
            width?: number;
            height?: number;
            owner?: { _id: number; name: string; display_name?: string | null };
          }[];
          rooms: { _id: number; id: number; login: string; emotes: number[] }[];
        },
        any
      >({
        path: `/v1/rooms/_id/${roomIDs}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emote Sets
     * @name SetGlobalList
     * @summary Get all globally applicable emote sets
     * @request GET:/v1/set/global
     */
    setGlobalList: (params: RequestParams = {}) =>
      this.request<{ default_sets: number[]; sets: object; users: object }, any>({
        path: `/v1/set/global`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emote Sets
     * @name SetGlobalList2
     * @summary Get all globally applicable emote sets, without any extra data
     * @request GET:/v1/_set/global
     * @originalName setGlobalList
     * @duplicate
     */
    setGlobalList2: (params: RequestParams = {}) =>
      this.request<{ default_sets: number[] }, any>({
        path: `/v1/_set/global`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emote Sets
     * @name GetV1
     * @summary Get an emote set by ID
     * @request GET:/v1/set/{setID}
     */
    getV1: (setId: number, params: RequestParams = {}) =>
      this.request<{ set: EmoteSet; users: object }, any>({
        path: `/v1/set/${setId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description **Rate Limit Cost:** 1 point
     *
     * @tags Emote Sets
     * @name SetDetail
     * @summary Get an emote set by ID, without a users list
     * @request GET:/v1/_set/{setID}
     */
    setDetail: (setId: number, params: RequestParams = {}) =>
      this.request<{ set: EmoteSet }, any>({
        path: `/v1/_set/${setId}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
