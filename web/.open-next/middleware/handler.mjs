
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "4.2.0";globalThis.nextVersion = "16.4.6";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// ../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js
var require_dist = __commonJS({
  "../node_modules/.pnpm/cookie@1.1.1/node_modules/cookie/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseCookie = parseCookie;
    exports.parse = parseCookie;
    exports.stringifyCookie = stringifyCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    exports.parseSetCookie = parseSetCookie;
    exports.stringifySetCookie = stringifySetCookie;
    exports.serialize = stringifySetCookie;
    var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
    var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
    var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
    var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
    var maxAgeRegExp = /^-?\d+$/;
    var __toString = Object.prototype.toString;
    var NullObject = /* @__PURE__ */ (() => {
      const C = function() {
      };
      C.prototype = /* @__PURE__ */ Object.create(null);
      return C;
    })();
    function parseCookie(str, options) {
      const obj = new NullObject();
      const len = str.length;
      if (len < 2)
        return obj;
      const dec = options?.decode || decode;
      let index = 0;
      do {
        const eqIdx = eqIndex(str, index, len);
        if (eqIdx === -1)
          break;
        const endIdx = endIndex(str, index, len);
        if (eqIdx > endIdx) {
          index = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        const key = valueSlice(str, index, eqIdx);
        if (obj[key] === void 0) {
          obj[key] = dec(valueSlice(str, eqIdx + 1, endIdx));
        }
        index = endIdx + 1;
      } while (index < len);
      return obj;
    }
    function stringifyCookie(cookie, options) {
      const enc = options?.encode || encodeURIComponent;
      const cookieStrings = [];
      for (const name of Object.keys(cookie)) {
        const val = cookie[name];
        if (val === void 0)
          continue;
        if (!cookieNameRegExp.test(name)) {
          throw new TypeError(`cookie name is invalid: ${name}`);
        }
        const value = enc(val);
        if (!cookieValueRegExp.test(value)) {
          throw new TypeError(`cookie val is invalid: ${val}`);
        }
        cookieStrings.push(`${name}=${value}`);
      }
      return cookieStrings.join("; ");
    }
    function stringifySetCookie(_name, _val, _opts) {
      const cookie = typeof _name === "object" ? _name : { ..._opts, name: _name, value: String(_val) };
      const options = typeof _val === "object" ? _val : _opts;
      const enc = options?.encode || encodeURIComponent;
      if (!cookieNameRegExp.test(cookie.name)) {
        throw new TypeError(`argument name is invalid: ${cookie.name}`);
      }
      const value = cookie.value ? enc(cookie.value) : "";
      if (!cookieValueRegExp.test(value)) {
        throw new TypeError(`argument val is invalid: ${cookie.value}`);
      }
      let str = cookie.name + "=" + value;
      if (cookie.maxAge !== void 0) {
        if (!Number.isInteger(cookie.maxAge)) {
          throw new TypeError(`option maxAge is invalid: ${cookie.maxAge}`);
        }
        str += "; Max-Age=" + cookie.maxAge;
      }
      if (cookie.domain) {
        if (!domainValueRegExp.test(cookie.domain)) {
          throw new TypeError(`option domain is invalid: ${cookie.domain}`);
        }
        str += "; Domain=" + cookie.domain;
      }
      if (cookie.path) {
        if (!pathValueRegExp.test(cookie.path)) {
          throw new TypeError(`option path is invalid: ${cookie.path}`);
        }
        str += "; Path=" + cookie.path;
      }
      if (cookie.expires) {
        if (!isDate(cookie.expires) || !Number.isFinite(cookie.expires.valueOf())) {
          throw new TypeError(`option expires is invalid: ${cookie.expires}`);
        }
        str += "; Expires=" + cookie.expires.toUTCString();
      }
      if (cookie.httpOnly) {
        str += "; HttpOnly";
      }
      if (cookie.secure) {
        str += "; Secure";
      }
      if (cookie.partitioned) {
        str += "; Partitioned";
      }
      if (cookie.priority) {
        const priority = typeof cookie.priority === "string" ? cookie.priority.toLowerCase() : void 0;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError(`option priority is invalid: ${cookie.priority}`);
        }
      }
      if (cookie.sameSite) {
        const sameSite = typeof cookie.sameSite === "string" ? cookie.sameSite.toLowerCase() : cookie.sameSite;
        switch (sameSite) {
          case true:
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError(`option sameSite is invalid: ${cookie.sameSite}`);
        }
      }
      return str;
    }
    function parseSetCookie(str, options) {
      const dec = options?.decode || decode;
      const len = str.length;
      const endIdx = endIndex(str, 0, len);
      const eqIdx = eqIndex(str, 0, endIdx);
      const setCookie = eqIdx === -1 ? { name: "", value: dec(valueSlice(str, 0, endIdx)) } : {
        name: valueSlice(str, 0, eqIdx),
        value: dec(valueSlice(str, eqIdx + 1, endIdx))
      };
      let index = endIdx + 1;
      while (index < len) {
        const endIdx2 = endIndex(str, index, len);
        const eqIdx2 = eqIndex(str, index, endIdx2);
        const attr = eqIdx2 === -1 ? valueSlice(str, index, endIdx2) : valueSlice(str, index, eqIdx2);
        const val = eqIdx2 === -1 ? void 0 : valueSlice(str, eqIdx2 + 1, endIdx2);
        switch (attr.toLowerCase()) {
          case "httponly":
            setCookie.httpOnly = true;
            break;
          case "secure":
            setCookie.secure = true;
            break;
          case "partitioned":
            setCookie.partitioned = true;
            break;
          case "domain":
            setCookie.domain = val;
            break;
          case "path":
            setCookie.path = val;
            break;
          case "max-age":
            if (val && maxAgeRegExp.test(val))
              setCookie.maxAge = Number(val);
            break;
          case "expires":
            if (!val)
              break;
            const date = new Date(val);
            if (Number.isFinite(date.valueOf()))
              setCookie.expires = date;
            break;
          case "priority":
            if (!val)
              break;
            const priority = val.toLowerCase();
            if (priority === "low" || priority === "medium" || priority === "high") {
              setCookie.priority = priority;
            }
            break;
          case "samesite":
            if (!val)
              break;
            const sameSite = val.toLowerCase();
            if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
              setCookie.sameSite = sameSite;
            }
            break;
        }
        index = endIdx2 + 1;
      }
      return setCookie;
    }
    function endIndex(str, min, len) {
      const index = str.indexOf(";", min);
      return index === -1 ? len : index;
    }
    function eqIndex(str, min, max) {
      const index = str.indexOf("=", min);
      return index < max ? index : -1;
    }
    function valueSlice(str, min, max) {
      let start = min;
      let end = max;
      do {
        const code = str.charCodeAt(start);
        if (code !== 32 && code !== 9)
          break;
      } while (++start < end);
      while (end > start) {
        const code = str.charCodeAt(end - 1);
        if (code !== 32 && code !== 9)
          break;
        end--;
      }
      return str.slice(start, end);
    }
    function decode(str) {
      if (str.indexOf("%") === -1)
        return str;
      try {
        return decodeURIComponent(str);
      } catch (e) {
        return str;
      }
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]";
    }
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/util.js
function parseSetCookieHeader(cookies) {
  if (!cookies) {
    return [];
  }
  if (typeof cookies === "string") {
    return cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim());
  }
  return cookies;
}
function getQueryFromIterator(it) {
  const query = {};
  for (const [key, value] of it) {
    if (key in query) {
      if (Array.isArray(query[key])) {
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    } else {
      query[key] = value;
    }
  }
  return query;
}
var init_util = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var import_cookie, NULL_BODY_STATUSES, converter, edge_default;
var init_edge = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    import_cookie = __toESM(require_dist(), 1);
    init_util();
    init_utils();
    NULL_BODY_STATUSES = /* @__PURE__ */ new Set([101, 103, 204, 205, 304]);
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = getQueryFromSearchParams(searchParams);
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const body = shouldHaveBody ? Buffer2.from(await event.arrayBuffer()) : void 0;
        const cookieHeader = event.headers.get("cookie");
        const cookies = cookieHeader ? import_cookie.default.parse(cookieHeader) : {};
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          if (key === "set-cookie" && typeof value === "string") {
            const cookies = parseSetCookieHeader(value);
            for (const cookie of cookies) {
              headers.append(key, cookie);
            }
            continue;
          }
          if (Array.isArray(value)) {
            for (const v of value) {
              headers.append(key, v);
            }
          } else {
            headers.set(key, value);
          }
        }
        const body = NULL_BODY_STATUSES.has(result.statusCode) ? null : result.body;
        return new Response(body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
function initializeOnce() {
  if (initialized)
    return;
  cachedOrigins = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
  const functions = globalThis.openNextConfig.functions ?? {};
  for (const key in functions) {
    if (key !== "default") {
      const value = functions[key];
      const regexes = [];
      for (const pattern of value.patterns) {
        const regexPattern = `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`;
        regexes.push(new RegExp(regexPattern));
      }
      cachedPatterns.push({
        key,
        patterns: value.patterns,
        regexes
      });
    }
  }
  initialized = true;
}
var cachedOrigins, cachedPatterns, initialized, envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    cachedPatterns = [];
    initialized = false;
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          initializeOnce();
          for (const { key, patterns, regexes } of cachedPatterns) {
            for (const regex of regexes) {
              if (regex.test(_path)) {
                debug("Using origin", key, patterns);
                return cachedOrigins[key];
              }
            }
          }
          if (_path.startsWith("/_next/image") && cachedOrigins.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return cachedOrigins.imageOptimizer;
          }
          if (cachedOrigins.default) {
            debug("Using default origin", cachedOrigins.default, _path);
            return cachedOrigins.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var resolver, dummy_default;
var init_dummy = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default = resolver;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
function toReadableStream(value, isBase64) {
  return new ReadableStream2({
    pull(controller) {
      controller.enqueue(Buffer.from(value, isBase64 ? "base64" : "utf8"));
      controller.close();
    }
  }, { highWaterMark: 0 });
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return new ReadableStream2({
      pull(controller) {
        maybeSomethingBuffer ??= Buffer.from("SOMETHING");
        controller.enqueue(maybeSomethingBuffer);
        controller.close();
      }
    }, { highWaterMark: 0 });
  }
  return new ReadableStream2({
    start(controller) {
      controller.close();
    }
  });
}
var maybeSomethingBuffer;
var init_stream = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => !["cf-connecting-ip", "x-forwarded-host"].includes(key.toLowerCase())));
        if (eventHeaders.host) {
          headers["x-forwarded-host"] = eventHeaders.host;
        }
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          const cur = responseHeaders[key];
          if (cur === void 0) {
            responseHeaders[key] = value;
          } else if (Array.isArray(cur)) {
            cur.push(value);
          } else {
            responseHeaders[key] = [cur, value];
          }
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge/chunks/[root-of-the-server]__11zk02vj3xkf2._.js
var require_root_of_the_server_11zk02vj3xkf2 = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__11zk02vj3xkf2._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__11zk02vj3xkf2._.js", 95437, (e) => e.a(async (t, s) => {
      try {
        var n = e.i(33991), i = e.i(92513);
        let t2 = await (0, n.f)(i.default, () => wasm_b1b6a44cda0ef428469235d0d537a6bf);
        e.s(["default", 0, t2]), s();
      } catch (e2) {
        s(e2);
      }
    }, true), 92513, function(e) {
      e.q("chunks/1oji__prisma_client_query_engine_bg_0athij3ijk6je.wasm");
    }, 31448, (e) => {
      "use strict";
      let t = Promise.resolve().then(() => e.i(95437));
      e.s(["default", 0, t]);
    }, 50416, (e, t, s) => {
      self._ENTRIES ||= {};
      let n = Promise.resolve().then(() => e.i(62407));
      n.catch(() => {
      }), self._ENTRIES.middleware_middleware = new Proxy(n, { get(e2, t2) {
        if ("then" === t2) return (t3, s3) => e2.then(t3, s3);
        let s2 = (...s3) => e2.then((e3) => (0, e3[t2])(...s3));
        return s2.then = (s3, n2) => e2.then((e3) => e3[t2]).then(s3, n2), s2;
      } });
    }, 33991, (e) => {
      "use strict";
      async function t(e2, t2) {
        let s;
        try {
          s = t2();
        } catch (e3) {
        }
        if (!s) throw Error(`dynamically loading WebAssembly is not supported in this runtime as global was not injected for chunk '${e2}'`);
        return s;
      }
      e.s(["f", 0, t]);
    }]);
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/edge/chunks/[root-of-the-server]__20wuf2xt1epdd._.js
var require_root_of_the_server_20wuf2xt1epdd = __commonJS({
  ".next/server/edge/chunks/[root-of-the-server]__20wuf2xt1epdd._.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__20wuf2xt1epdd._.js", 78500, (e, t, r) => {
      t.exports = e.x("node:async_hooks", () => (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports)));
    }, 51615, (e, t, r) => {
      t.exports = e.x("node:buffer", () => (init_node_buffer(), __toCommonJS(node_buffer_exports)));
    }, 88974, (e, t, r) => {
      t.exports = { ...e.r(83483) };
    }, 36782, (e, t, r) => {
      "use strict";
      let n;
      var i = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = Object.getOwnPropertyNames, s = Object.prototype.hasOwnProperty, l = {}, c = { QueryEngine: () => I, __wbg_Error_e83987f665cf5504: () => M, __wbg_Number_bb48ca12f395cd08: () => D, __wbg_String_8f0eb39a4a4c2f66: () => $, __wbg___wbindgen_bigint_get_as_i64_f3ebc5a755000afd: () => L, __wbg___wbindgen_boolean_get_6d5a1ee65bab5f68: () => j, __wbg___wbindgen_debug_string_df47ffb5e35e6763: () => q, __wbg___wbindgen_in_bb933bd9e1b3bc0f: () => U, __wbg___wbindgen_is_bigint_cb320707dcd35f0b: () => F, __wbg___wbindgen_is_function_ee8a6c5833c90377: () => V, __wbg___wbindgen_is_object_c818261d21f283a4: () => B, __wbg___wbindgen_is_string_fbb76cb2940daafd: () => H, __wbg___wbindgen_is_undefined_2d472862bd29a478: () => G, __wbg___wbindgen_jsval_eq_6b13ab83478b1c50: () => W, __wbg___wbindgen_jsval_loose_eq_b664b38a2f582147: () => J, __wbg___wbindgen_number_get_a20bf9b85341449d: () => z, __wbg___wbindgen_string_get_e4f06c90489ad01b: () => K, __wbg___wbindgen_throw_b855445ff6a94295: () => Q, __wbg__wbg_cb_unref_2454a539ea5790d9: () => X, __wbg_call_525440f72fbfc0ea: () => Y, __wbg_call_e762c39fa8ea36bf: () => Z, __wbg_crypto_805be4ce92f1e370: () => ee, __wbg_done_2042aa2670fb1db1: () => et, __wbg_entries_e171b586f8f6bdbf: () => er, __wbg_exec_fdeec61d47617356: () => en, __wbg_getRandomValues_f6a868620c8bab49: () => ei, __wbg_getTime_14776bfb48a1bff9: () => ea, __wbg_get_7bed016f185add81: () => eo, __wbg_get_ece95cf6585650d9: () => es, __wbg_get_efcb449f58ec27c2: () => el, __wbg_get_with_ref_key_1dc361bd10053bfe: () => ec, __wbg_has_787fafc980c3ccdb: () => eu, __wbg_instanceof_ArrayBuffer_70beb1189ca63b38: () => ed, __wbg_instanceof_Map_8579b5e2ab5437c7: () => eh, __wbg_instanceof_Promise_001fdd42afa1b7ef: () => ep, __wbg_instanceof_Uint8Array_20c8e73002f7af98: () => ef, __wbg_isArray_96e0af9891d0945d: () => eg, __wbg_isSafeInteger_d216eda7911dde36: () => em, __wbg_iterator_e5822695327a3c39: () => ey, __wbg_keys_b4d27b02ad14f4be: () => eb, __wbg_length_69bca3cb64fc8748: () => ev, __wbg_length_cdd215e10d9dd507: () => ew, __wbg_msCrypto_2ac4d17c4748234a: () => e_, __wbg_new_0_f9740686d739025c: () => eE, __wbg_new_1acc0b6eea89d040: () => eS, __wbg_new_23fa8b12a239f036: () => ex, __wbg_new_3c3d849046688a66: () => eP, __wbg_new_5a79be3ab53b8aa5: () => eT, __wbg_new_68651c719dcda04e: () => eA, __wbg_new_e17d9f43105b08be: () => eR, __wbg_new_from_slice_92f4d78ca282a2d2: () => eC, __wbg_new_no_args_ee98eee5275000a4: () => eO, __wbg_new_with_length_01aa0dc35aa13543: () => ek, __wbg_next_020810e0ae8ebcb0: () => eN, __wbg_next_2c826fe5dfec6b6a: () => eI, __wbg_node_ecc8306b9857f33d: () => eM, __wbg_now_793306c526e2e3b6: () => eD, __wbg_now_7fd00a794a07d388: () => e$, __wbg_now_b3f7572f6ef3d3a9: () => eL, __wbg_process_5cff2739921be718: () => ej, __wbg_prototypesetcall_2a6620b6922694b2: () => eq, __wbg_push_df81a39d04db858c: () => eU, __wbg_queueMicrotask_5a8a9131f3f0b37b: () => eF, __wbg_queueMicrotask_6d79674585219521: () => eV, __wbg_randomFillSync_d3c85af7e31cf1f8: () => eB, __wbg_require_0c566c6f2eef6c79: () => eH, __wbg_resolve_caf97c30b83f7053: () => eG, __wbg_setTimeout_5d6a1d4fc51ea450: () => eW, __wbg_set_3f1d0b984ed272ed: () => eJ, __wbg_set_907fb406c34a251d: () => ez, __wbg_set_c213c871859d6500: () => eK, __wbg_set_c2abbebe8b9ebee1: () => eQ, __wbg_set_wasm: () => h, __wbg_static_accessor_GLOBAL_89e1d9ac6a1b250e: () => eX, __wbg_static_accessor_GLOBAL_THIS_8b530f326a9e48ac: () => eY, __wbg_static_accessor_SELF_6fdf4b64710cc91b: () => eZ, __wbg_static_accessor_WINDOW_b45bfc5a37f6cfa2: () => e0, __wbg_subarray_480600f3d6a9f26c: () => e1, __wbg_then_4f46f6544e6b4a28: () => e2, __wbg_then_70d05cf780a18d77: () => e4, __wbg_valueOf_9eee4828c11458ca: () => e3, __wbg_value_692627309814bb8c: () => e6, __wbg_versions_a8e5a362e1f16442: () => e5, __wbindgen_cast_2241b6af4c4b2941: () => e8, __wbindgen_cast_4625c577ab2ec9ee: () => e9, __wbindgen_cast_7bf296c42657ff30: () => e7, __wbindgen_cast_9ae0607507abb057: () => te, __wbindgen_cast_cb9088102bce6b30: () => tt, __wbindgen_cast_d6cd19b81560fd6e: () => tr, __wbindgen_init_externref_table: () => tn, debug_panic: () => O, getBuildTimeInfo: () => C };
      for (var u in c) i(l, u, { get: c[u], enumerable: true });
      t.exports = ((e10, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let n2 of o(t2)) s.call(e10, n2) || void 0 === n2 || i(e10, n2, { get: () => t2[n2], enumerable: !(r2 = a(t2, n2)) || r2.enumerable });
        return e10;
      })(i({}, "__esModule", { value: true }), l);
      var d = () => {
      };
      function h(e10) {
        n = e10;
      }
      d.prototype = d;
      let p = null;
      function f() {
        return (null === p || 0 === p.byteLength) && (p = new Uint8Array(n.memory.buffer)), p;
      }
      let g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
      g.decode();
      let m = 0;
      function y(e10, t2) {
        var r2;
        return e10 >>>= 0, r2 = e10, (m += t2) >= 2146435072 && ((g = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })).decode(), m = t2), g.decode(f().subarray(r2, r2 + t2));
      }
      let b = 0, v = new TextEncoder();
      function w(e10, t2, r2) {
        if (void 0 === r2) {
          let r3 = v.encode(e10), n3 = t2(r3.length, 1) >>> 0;
          return f().subarray(n3, n3 + r3.length).set(r3), b = r3.length, n3;
        }
        let n2 = e10.length, i2 = t2(n2, 1) >>> 0, a2 = f(), o2 = 0;
        for (; o2 < n2; o2++) {
          let t3 = e10.charCodeAt(o2);
          if (t3 > 127) break;
          a2[i2 + o2] = t3;
        }
        if (o2 !== n2) {
          0 !== o2 && (e10 = e10.slice(o2)), i2 = r2(i2, n2, n2 = o2 + 3 * e10.length, 1) >>> 0;
          let t3 = f().subarray(i2 + o2, i2 + n2);
          o2 += v.encodeInto(e10, t3).written, i2 = r2(i2, n2, o2, 1) >>> 0;
        }
        return b = o2, i2;
      }
      "encodeInto" in v || (v.encodeInto = function(e10, t2) {
        let r2 = v.encode(e10);
        return t2.set(r2), { read: e10.length, written: r2.length };
      });
      let _ = null;
      function E() {
        return (null === _ || true === _.buffer.detached || void 0 === _.buffer.detached && _.buffer !== n.memory.buffer) && (_ = new DataView(n.memory.buffer)), _;
      }
      function S(e10) {
        return null == e10;
      }
      function x(e10) {
        let t2 = n.__externref_table_alloc();
        return n.__wbindgen_externrefs.set(t2, e10), t2;
      }
      function P(e10, t2) {
        try {
          return e10.apply(this, t2);
        } catch (t3) {
          let e11 = x(t3);
          n.__wbindgen_exn_store(e11);
        }
      }
      function T(e10, t2) {
        return e10 >>>= 0, f().subarray(e10 / 1, e10 / 1 + t2);
      }
      let A = typeof FinalizationRegistry > "u" ? { register: () => {
      }, unregister: () => {
      } } : new FinalizationRegistry((e10) => e10.dtor(e10.a, e10.b));
      function R(e10) {
        let t2 = n.__wbindgen_externrefs.get(e10);
        return n.__externref_table_dealloc(e10), t2;
      }
      function C() {
        return n.getBuildTimeInfo();
      }
      function O(e10) {
        var t2 = S(e10) ? 0 : w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = b;
        let i2 = n.debug_panic(t2, r2);
        if (i2[1]) throw R(i2[0]);
      }
      function k(e10, t2, r2) {
        n.wasm_bindgen__convert__closures_____invoke__ha235f3ea55a06a09(e10, t2, r2);
      }
      let N = typeof FinalizationRegistry > "u" ? { register: () => {
      }, unregister: () => {
      } } : new FinalizationRegistry((e10) => n.__wbg_queryengine_free(e10 >>> 0, 1));
      class I {
        __destroy_into_raw() {
          let e10 = this.__wbg_ptr;
          return this.__wbg_ptr = 0, N.unregister(this), e10;
        }
        free() {
          let e10 = this.__destroy_into_raw();
          n.__wbg_queryengine_free(e10, 0);
        }
        disconnect(e10, t2) {
          let r2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = b, a2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = b;
          return n.queryengine_disconnect(this.__wbg_ptr, r2, i2, a2, o2);
        }
        startTransaction(e10, t2, r2) {
          let i2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = b, o2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = b, l2 = w(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = b;
          return n.queryengine_startTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        commitTransaction(e10, t2, r2) {
          let i2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = b, o2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = b, l2 = w(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = b;
          return n.queryengine_commitTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        rollbackTransaction(e10, t2, r2) {
          let i2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = b, o2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), s2 = b, l2 = w(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), c2 = b;
          return n.queryengine_rollbackTransaction(this.__wbg_ptr, i2, a2, o2, s2, l2, c2);
        }
        constructor(e10, t2, r2) {
          let i2 = n.queryengine_new(e10, t2, r2);
          if (i2[2]) throw R(i2[1]);
          return this.__wbg_ptr = i2[0] >>> 0, N.register(this, this.__wbg_ptr, this), this;
        }
        query(e10, t2, r2, i2) {
          let a2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = b, s2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), l2 = b;
          var c2 = S(r2) ? 0 : w(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), u2 = b;
          let d2 = w(i2, n.__wbindgen_malloc, n.__wbindgen_realloc), h2 = b;
          return n.queryengine_query(this.__wbg_ptr, a2, o2, s2, l2, c2, u2, d2, h2);
        }
        trace(e10) {
          let t2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = b;
          return n.queryengine_trace(this.__wbg_ptr, t2, r2);
        }
        connect(e10, t2) {
          let r2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = b, a2 = w(t2, n.__wbindgen_malloc, n.__wbindgen_realloc), o2 = b;
          return n.queryengine_connect(this.__wbg_ptr, r2, i2, a2, o2);
        }
        metrics(e10) {
          let t2 = w(e10, n.__wbindgen_malloc, n.__wbindgen_realloc), r2 = b;
          return n.queryengine_metrics(this.__wbg_ptr, t2, r2);
        }
      }
      function M(e10, t2) {
        return Error(y(e10, t2));
      }
      function D(e10) {
        return Number(e10);
      }
      function $(e10, t2) {
        let r2 = w(String(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = b;
        E().setInt32(e10 + 4, i2, true), E().setInt32(e10 + 0, r2, true);
      }
      function L(e10, t2) {
        let r2 = "bigint" == typeof t2 ? t2 : void 0;
        E().setBigInt64(e10 + 8, S(r2) ? BigInt(0) : r2, true), E().setInt32(e10 + 0, !S(r2), true);
      }
      function j(e10) {
        let t2 = "boolean" == typeof e10 ? e10 : void 0;
        return S(t2) ? 16777215 : +!!t2;
      }
      function q(e10, t2) {
        let r2 = w((function e11(t3) {
          let r3, n2 = typeof t3;
          if ("number" == n2 || "boolean" == n2 || null == t3) return `${t3}`;
          if ("string" == n2) return `"${t3}"`;
          if ("symbol" == n2) {
            let e12 = t3.description;
            return null == e12 ? "Symbol" : `Symbol(${e12})`;
          }
          if ("function" == n2) {
            let e12 = t3.name;
            return "string" == typeof e12 && e12.length > 0 ? `Function(${e12})` : "Function";
          }
          if (Array.isArray(t3)) {
            let r4 = t3.length, n3 = "[";
            r4 > 0 && (n3 += e11(t3[0]));
            for (let i4 = 1; i4 < r4; i4++) n3 += ", " + e11(t3[i4]);
            return n3 + "]";
          }
          let i3 = /\[object ([^\]]+)\]/.exec(toString.call(t3));
          if (!i3 || !(i3.length > 1)) return toString.call(t3);
          if ("Object" == (r3 = i3[1])) try {
            return "Object(" + JSON.stringify(t3) + ")";
          } catch {
            return "Object";
          }
          return t3 instanceof Error ? `${t3.name}: ${t3.message}
${t3.stack}` : r3;
        })(t2), n.__wbindgen_malloc, n.__wbindgen_realloc), i2 = b;
        E().setInt32(e10 + 4, i2, true), E().setInt32(e10 + 0, r2, true);
      }
      function U(e10, t2) {
        return e10 in t2;
      }
      function F(e10) {
        return "bigint" == typeof e10;
      }
      function V(e10) {
        return "function" == typeof e10;
      }
      function B(e10) {
        return "object" == typeof e10 && null !== e10;
      }
      function H(e10) {
        return "string" == typeof e10;
      }
      function G(e10) {
        return void 0 === e10;
      }
      function W(e10, t2) {
        return e10 === t2;
      }
      function J(e10, t2) {
        return e10 == t2;
      }
      function z(e10, t2) {
        let r2 = "number" == typeof t2 ? t2 : void 0;
        E().setFloat64(e10 + 8, S(r2) ? 0 : r2, true), E().setInt32(e10 + 0, !S(r2), true);
      }
      function K(e10, t2) {
        let r2 = "string" == typeof t2 ? t2 : void 0;
        var i2 = S(r2) ? 0 : w(r2, n.__wbindgen_malloc, n.__wbindgen_realloc), a2 = b;
        E().setInt32(e10 + 4, a2, true), E().setInt32(e10 + 0, i2, true);
      }
      function Q(e10, t2) {
        throw Error(y(e10, t2));
      }
      function X(e10) {
        e10._wbg_cb_unref();
      }
      function Y() {
        return P(function(e10, t2, r2) {
          return e10.call(t2, r2);
        }, arguments);
      }
      function Z() {
        return P(function(e10, t2) {
          return e10.call(t2);
        }, arguments);
      }
      function ee(e10) {
        return e10.crypto;
      }
      function et(e10) {
        return e10.done;
      }
      function er(e10) {
        return Object.entries(e10);
      }
      function en(e10, t2, r2) {
        let n2 = e10.exec(y(t2, r2));
        return S(n2) ? 0 : x(n2);
      }
      function ei() {
        return P(function(e10, t2) {
          e10.getRandomValues(t2);
        }, arguments);
      }
      function ea(e10) {
        return e10.getTime();
      }
      function eo(e10, t2) {
        return e10[t2 >>> 0];
      }
      function es() {
        return P(function(e10, t2) {
          return e10[t2];
        }, arguments);
      }
      function el() {
        return P(function(e10, t2) {
          return Reflect.get(e10, t2);
        }, arguments);
      }
      function ec(e10, t2) {
        return e10[t2];
      }
      function eu() {
        return P(function(e10, t2) {
          return Reflect.has(e10, t2);
        }, arguments);
      }
      function ed(e10) {
        let t2;
        try {
          t2 = e10 instanceof ArrayBuffer;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function eh(e10) {
        let t2;
        try {
          t2 = e10 instanceof Map;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function ep(e10) {
        let t2;
        try {
          t2 = e10 instanceof Promise;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function ef(e10) {
        let t2;
        try {
          t2 = e10 instanceof Uint8Array;
        } catch {
          t2 = false;
        }
        return t2;
      }
      function eg(e10) {
        return Array.isArray(e10);
      }
      function em(e10) {
        return Number.isSafeInteger(e10);
      }
      function ey() {
        return Symbol.iterator;
      }
      function eb(e10) {
        return Object.keys(e10);
      }
      function ev(e10) {
        return e10.length;
      }
      function ew(e10) {
        return e10.length;
      }
      function e_(e10) {
        return e10.msCrypto;
      }
      function eE() {
        return /* @__PURE__ */ new Date();
      }
      function eS() {
        return {};
      }
      function ex(e10, t2, r2, n2) {
        return new RegExp(y(e10, t2), y(r2, n2));
      }
      function eP(e10, t2) {
        try {
          var r2 = { a: e10, b: t2 };
          return new Promise((e11, t3) => {
            let i2 = r2.a;
            r2.a = 0;
            try {
              var a2;
              return a2 = r2.b, void n.wasm_bindgen__convert__closures_____invoke__h1a2f20be69ab8911(i2, a2, e11, t3);
            } finally {
              r2.a = i2;
            }
          });
        } finally {
          r2.a = r2.b = 0;
        }
      }
      function eT(e10) {
        return new Uint8Array(e10);
      }
      function eA() {
        return /* @__PURE__ */ new Map();
      }
      function eR() {
        return [];
      }
      function eC(e10, t2) {
        return new Uint8Array(T(e10, t2));
      }
      function eO(e10, t2) {
        return new d(y(e10, t2));
      }
      function ek(e10) {
        return new Uint8Array(e10 >>> 0);
      }
      function eN() {
        return P(function(e10) {
          return e10.next();
        }, arguments);
      }
      function eI(e10) {
        return e10.next;
      }
      function eM(e10) {
        return e10.node;
      }
      function eD() {
        return Date.now();
      }
      function e$(e10) {
        return e10.now();
      }
      function eL() {
        return P(function() {
          return Date.now();
        }, arguments);
      }
      function ej(e10) {
        return e10.process;
      }
      function eq(e10, t2, r2) {
        Uint8Array.prototype.set.call(T(e10, t2), r2);
      }
      function eU(e10, t2) {
        return e10.push(t2);
      }
      function eF(e10) {
        return e10.queueMicrotask;
      }
      function eV(e10) {
        queueMicrotask(e10);
      }
      function eB() {
        return P(function(e10, t2) {
          e10.randomFillSync(t2);
        }, arguments);
      }
      function eH() {
        return P(function() {
          return t.require;
        }, arguments);
      }
      function eG(e10) {
        return Promise.resolve(e10);
      }
      function eW(e10, t2) {
        return setTimeout(e10, t2 >>> 0);
      }
      function eJ(e10, t2, r2) {
        e10[t2] = r2;
      }
      function ez(e10, t2, r2) {
        return e10.set(t2, r2);
      }
      function eK(e10, t2, r2) {
        e10[t2 >>> 0] = r2;
      }
      function eQ() {
        return P(function(e10, t2, r2) {
          return Reflect.set(e10, t2, r2);
        }, arguments);
      }
      function eX() {
        let t2 = e.g;
        return S(t2) ? 0 : x(t2);
      }
      function eY() {
        let e10 = typeof globalThis > "u" ? null : globalThis;
        return S(e10) ? 0 : x(e10);
      }
      function eZ() {
        let e10 = typeof self > "u" ? null : self;
        return S(e10) ? 0 : x(e10);
      }
      function e0() {
        return S(null) ? 0 : x(null);
      }
      function e1(e10, t2, r2) {
        return e10.subarray(t2 >>> 0, r2 >>> 0);
      }
      function e2(e10, t2) {
        return e10.then(t2);
      }
      function e4(e10, t2, r2) {
        return e10.then(t2, r2);
      }
      function e3(e10) {
        return e10.valueOf();
      }
      function e6(e10) {
        return e10.value;
      }
      function e5(e10) {
        return e10.versions;
      }
      function e8(e10, t2) {
        return y(e10, t2);
      }
      function e9(e10) {
        return BigInt.asUintN(64, e10);
      }
      function e7(e10, t2) {
        var r2;
        let i2, a2;
        return r2 = n.wasm_bindgen__closure__destroy__hf9ae564cf31e91c2, i2 = { a: e10, b: t2, cnt: 1, dtor: r2 }, (a2 = (...e11) => {
          i2.cnt++;
          let t3 = i2.a;
          i2.a = 0;
          try {
            return k(t3, i2.b, ...e11);
          } finally {
            i2.a = t3, a2._wbg_cb_unref();
          }
        })._wbg_cb_unref = () => {
          0 == --i2.cnt && (i2.dtor(i2.a, i2.b), i2.a = 0, A.unregister(i2));
        }, A.register(a2, i2, i2), a2;
      }
      function te(e10) {
        return e10;
      }
      function tt(e10, t2) {
        return T(e10, t2);
      }
      function tr(e10) {
        return e10;
      }
      function tn() {
        let e10 = n.__wbindgen_externrefs, t2 = e10.grow(4);
        e10.set(0, void 0), e10.set(t2 + 0, void 0), e10.set(t2 + 1, null), e10.set(t2 + 2, true), e10.set(t2 + 3, false);
      }
      Symbol.dispose && (I.prototype[Symbol.dispose] = I.prototype.free);
    }, 83483, (e, t, r) => {
      Object.defineProperty(r, "__esModule", { value: true });
      let { PrismaClientKnownRequestError: n, PrismaClientUnknownRequestError: i, PrismaClientRustPanicError: a, PrismaClientInitializationError: o, PrismaClientValidationError: s, getPrismaClient: l, sqltag: c, empty: u, join: d, raw: h, skip: p, Decimal: f, Debug: g, objectEnumValues: m, makeStrictEnum: y, Extensions: b, warnOnce: v, defineDmmfProperty: w, Public: _, getRuntime: E, createParam: S } = e.r(76221), x = {};
      r.Prisma = x, r.$Enums = {}, x.prismaVersion = { client: "6.19.3", engine: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, x.PrismaClientKnownRequestError = n, x.PrismaClientUnknownRequestError = i, x.PrismaClientRustPanicError = a, x.PrismaClientInitializationError = o, x.PrismaClientValidationError = s, x.Decimal = f, x.sql = c, x.empty = u, x.join = d, x.raw = h, x.validator = _.validator, x.getExtensionContext = b.getExtensionContext, x.defineExtension = b.defineExtension, x.DbNull = m.instances.DbNull, x.JsonNull = m.instances.JsonNull, x.AnyNull = m.instances.AnyNull, x.NullTypes = { DbNull: m.classes.DbNull, JsonNull: m.classes.JsonNull, AnyNull: m.classes.AnyNull }, r.Prisma.TransactionIsolationLevel = y({ ReadUncommitted: "ReadUncommitted", ReadCommitted: "ReadCommitted", RepeatableRead: "RepeatableRead", Serializable: "Serializable" }), r.Prisma.PersonScalarFieldEnum = { id: "id", mobile: "mobile", name: "name", email: "email", category: "category", division: "division", district: "district", upazila: "upazila", unionName: "unionName", mosqueName: "mosqueName", mosqueLat: "mosqueLat", mosqueLng: "mosqueLng", internalStars: "internalStars", totalPoints: "totalPoints", lastActiveAt: "lastActiveAt", redFlag: "redFlag", createdAt: "createdAt" }, r.Prisma.EventScalarFieldEnum = { id: "id", slug: "slug", title: "title", type: "type", description: "description", venue: "venue", startsAt: "startsAt", endsAt: "endsAt", applyOpensAt: "applyOpensAt", applyClosesAt: "applyClosesAt", seats: "seats", eligibility: "eligibility", formSchema: "formSchema", status: "status", bannerUrl: "bannerUrl" }, r.Prisma.ApplicationScalarFieldEnum = { id: "id", number: "number", eventId: "eventId", personId: "personId", answers: "answers", status: "status", autoScreenResult: "autoScreenResult", qrToken: "qrToken", checkedInAt: "checkedInAt", createdAt: "createdAt" }, r.Prisma.EnrollmentScalarFieldEnum = { id: "id", personId: "personId", eventId: "eventId", completedAt: "completedAt", certificateNo: "certificateNo" }, r.Prisma.MagicLinkScalarFieldEnum = { id: "id", shortCode: "shortCode", tokenHash: "tokenHash", personId: "personId", purpose: "purpose", payload: "payload", expiresAt: "expiresAt", usedCount: "usedCount" }, r.Prisma.ResourceScalarFieldEnum = { id: "id", title: "title", kind: "kind", fileUrl: "fileUrl", audience: "audience", publishAt: "publishAt" }, r.Prisma.ResourceViewScalarFieldEnum = { id: "id", resourceId: "resourceId", personId: "personId", action: "action", at: "at" }, r.Prisma.OnlineClassScalarFieldEnum = { id: "id", title: "title", startsAt: "startsAt", meetingUrl: "meetingUrl", audience: "audience" }, r.Prisma.AttendanceScalarFieldEnum = { id: "id", classId: "classId", personId: "personId", at: "at" }, r.Prisma.ActivityTypeScalarFieldEnum = { id: "id", code: "code", nameBn: "nameBn", points: "points" }, r.Prisma.SubmissionScalarFieldEnum = { id: "id", personId: "personId", activityCode: "activityCode", note: "note", photoUrls: "photoUrls", photoHash: "photoHash", pointsAwarded: "pointsAwarded", status: "status", month: "month", createdAt: "createdAt" }, r.Prisma.ReliefResponseScalarFieldEnum = { id: "id", personId: "personId", campaign: "campaign", willJoin: "willJoin", at: "at" }, r.Prisma.CallLogScalarFieldEnum = { id: "id", personId: "personId", byAdminId: "byAdminId", result: "result", note: "note", at: "at" }, r.Prisma.MessageLogScalarFieldEnum = { id: "id", personId: "personId", channel: "channel", body: "body", status: "status", error: "error", createdAt: "createdAt" }, r.Prisma.AdminUserScalarFieldEnum = { id: "id", email: "email", name: "name", role: "role", passwordHash: "passwordHash" }, r.Prisma.SettingScalarFieldEnum = { key: "key", value: "value" }, r.Prisma.AuditLogScalarFieldEnum = { id: "id", adminId: "adminId", action: "action", target: "target", at: "at" }, r.Prisma.PostScalarFieldEnum = { id: "id", kind: "kind", title: "title", body: "body", publishedAt: "publishedAt" }, r.Prisma.SortOrder = { asc: "asc", desc: "desc" }, r.Prisma.NullableJsonNullValueInput = { DbNull: x.DbNull, JsonNull: x.JsonNull }, r.Prisma.JsonNullValueInput = { JsonNull: x.JsonNull }, r.Prisma.QueryMode = { default: "default", insensitive: "insensitive" }, r.Prisma.NullsOrder = { first: "first", last: "last" }, r.Prisma.JsonNullValueFilter = { DbNull: x.DbNull, JsonNull: x.JsonNull, AnyNull: x.AnyNull }, r.PersonCategory = r.$Enums.PersonCategory = { IMAM: "IMAM", MADRASA_TEACHER: "MADRASA_TEACHER", MADRASA_MANAGER: "MADRASA_MANAGER", VOLUNTEER: "VOLUNTEER", OTHER: "OTHER" }, r.EventStatus = r.$Enums.EventStatus = { DRAFT: "DRAFT", UPCOMING: "UPCOMING", ONGOING: "ONGOING", COMPLETED: "COMPLETED", CANCELLED: "CANCELLED" }, r.ApplicationStatus = r.$Enums.ApplicationStatus = { PENDING: "PENDING", SHORTLISTED: "SHORTLISTED", SELECTED: "SELECTED", REJECTED: "REJECTED", WAITLIST: "WAITLIST" }, r.AdminRole = r.$Enums.AdminRole = { SUPER_ADMIN: "SUPER_ADMIN", OFFICER: "OFFICER", EDITOR: "EDITOR", MONITOR: "MONITOR" }, r.Prisma.ModelName = { Person: "Person", Event: "Event", Application: "Application", Enrollment: "Enrollment", MagicLink: "MagicLink", Resource: "Resource", ResourceView: "ResourceView", OnlineClass: "OnlineClass", Attendance: "Attendance", ActivityType: "ActivityType", Submission: "Submission", ReliefResponse: "ReliefResponse", CallLog: "CallLog", MessageLog: "MessageLog", AdminUser: "AdminUser", Setting: "Setting", AuditLog: "AuditLog", Post: "Post" };
      let P = { generator: { name: "client", provider: { fromEnvVar: null, value: "prisma-client-js" }, output: { value: "/home/didar-lahiry/Antigravity/Event management/node_modules/.pnpm/@prisma+client@6.19.3_prisma@6.19.3_typescript@5.9.3__typescript@5.9.3/node_modules/@prisma/client", fromEnvVar: null }, config: { engineType: "library" }, binaryTargets: [{ fromEnvVar: null, value: "debian-openssl-3.0.x", native: true }], previewFeatures: [], sourceFilePath: "/home/didar-lahiry/Antigravity/Event management/web/prisma/schema.prisma" }, relativeEnvPaths: { rootEnvPath: null, schemaEnvPath: "../../../../../../web/.env" }, relativePath: "../../../../../../web/prisma", clientVersion: "6.19.3", engineVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7", datasourceNames: ["db"], activeProvider: "postgresql", postinstall: false, inlineDatasources: { db: { url: { fromEnvVar: "DATABASE_URL", value: null } } }, inlineSchema: 'generator client {\n  provider = "prisma-client-js"\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\nenum PersonCategory {\n  IMAM\n  MADRASA_TEACHER\n  MADRASA_MANAGER\n  VOLUNTEER\n  OTHER\n}\n\nenum EventStatus {\n  DRAFT\n  UPCOMING\n  ONGOING\n  COMPLETED\n  CANCELLED\n}\n\nenum ApplicationStatus {\n  PENDING\n  SHORTLISTED\n  SELECTED\n  REJECTED\n  WAITLIST\n}\n\nenum AdminRole {\n  SUPER_ADMIN\n  OFFICER\n  EDITOR\n  MONITOR\n}\n\nmodel Person {\n  id            String           @id @default(cuid())\n  mobile        String           @unique\n  name          String\n  email         String?\n  category      PersonCategory   @default(IMAM)\n  division      String?\n  district      String?\n  upazila       String?\n  unionName     String?\n  mosqueName    String?\n  mosqueLat     Float?\n  mosqueLng     Float?\n  internalStars Int? // ADMIN ONLY\n  totalPoints   Int              @default(0)\n  lastActiveAt  DateTime?\n  redFlag       Boolean          @default(false)\n  createdAt     DateTime         @default(now())\n  applications  Application[]\n  enrollments   Enrollment[]\n  submissions   Submission[]\n  attendances   Attendance[]\n  magicLinks    MagicLink[]\n  callLogs      CallLog[]\n  resourceViews ResourceView[]\n  reliefReplies ReliefResponse[]\n  messages      MessageLog[]\n}\n\nmodel Event {\n  id            String        @id @default(cuid())\n  slug          String        @unique\n  title         String\n  type          String\n  description   String\n  venue         String?\n  startsAt      DateTime\n  endsAt        DateTime\n  applyOpensAt  DateTime\n  applyClosesAt DateTime\n  seats         Int?\n  eligibility   Json?\n  formSchema    Json\n  status        EventStatus   @default(DRAFT)\n  bannerUrl     String?\n  applications  Application[]\n  enrollments   Enrollment[]\n}\n\nmodel Application {\n  id               String            @id @default(cuid())\n  number           String            @unique\n  eventId          String\n  personId         String\n  answers          Json\n  status           ApplicationStatus @default(PENDING)\n  autoScreenResult Json?\n  qrToken          String?           @unique\n  checkedInAt      DateTime?\n  createdAt        DateTime          @default(now())\n  event            Event             @relation(fields: [eventId], references: [id])\n  person           Person            @relation(fields: [personId], references: [id])\n\n  @@unique([eventId, personId])\n}\n\nmodel Enrollment {\n  id            String    @id @default(cuid())\n  personId      String\n  eventId       String\n  completedAt   DateTime?\n  certificateNo String?   @unique\n  person        Person    @relation(fields: [personId], references: [id])\n  event         Event     @relation(fields: [eventId], references: [id])\n\n  @@unique([personId, eventId])\n}\n\nmodel MagicLink {\n  id        String   @id @default(cuid())\n  shortCode String   @unique\n  tokenHash String\n  personId  String\n  purpose   String\n  payload   Json?\n  expiresAt DateTime\n  usedCount Int      @default(0)\n  person    Person   @relation(fields: [personId], references: [id])\n}\n\nmodel Resource {\n  id        String         @id @default(cuid())\n  title     String\n  kind      String\n  fileUrl   String\n  audience  Json\n  publishAt DateTime\n  views     ResourceView[]\n}\n\nmodel ResourceView {\n  id         String   @id @default(cuid())\n  resourceId String\n  personId   String\n  action     String\n  at         DateTime @default(now())\n  resource   Resource @relation(fields: [resourceId], references: [id])\n  person     Person   @relation(fields: [personId], references: [id])\n}\n\nmodel OnlineClass {\n  id          String       @id @default(cuid())\n  title       String\n  startsAt    DateTime\n  meetingUrl  String\n  audience    Json\n  attendances Attendance[]\n}\n\nmodel Attendance {\n  id       String      @id @default(cuid())\n  classId  String\n  personId String\n  at       DateTime    @default(now())\n  class    OnlineClass @relation(fields: [classId], references: [id])\n  person   Person      @relation(fields: [personId], references: [id])\n\n  @@unique([classId, personId])\n}\n\nmodel ActivityType {\n  id     String @id @default(cuid())\n  code   String @unique\n  nameBn String\n  points Int\n}\n\nmodel Submission {\n  id            String   @id @default(cuid())\n  personId      String\n  activityCode  String\n  note          String?\n  photoUrls     String[]\n  photoHash     String?\n  pointsAwarded Int\n  status        String   @default("APPROVED")\n  month         String\n  createdAt     DateTime @default(now())\n  person        Person   @relation(fields: [personId], references: [id])\n\n  @@index([month, personId])\n}\n\nmodel ReliefResponse {\n  id       String   @id @default(cuid())\n  personId String\n  campaign String\n  willJoin Boolean\n  at       DateTime @default(now())\n  person   Person   @relation(fields: [personId], references: [id])\n}\n\nmodel CallLog {\n  id        String   @id @default(cuid())\n  personId  String\n  byAdminId String\n  result    String\n  note      String?\n  at        DateTime @default(now())\n  person    Person   @relation(fields: [personId], references: [id])\n}\n\nmodel MessageLog {\n  id        String   @id @default(cuid())\n  personId  String?\n  channel   String\n  body      String\n  status    String\n  error     String?\n  createdAt DateTime @default(now())\n  person    Person?  @relation(fields: [personId], references: [id])\n}\n\nmodel AdminUser {\n  id           String    @id @default(cuid())\n  email        String    @unique\n  name         String\n  role         AdminRole\n  passwordHash String\n}\n\nmodel Setting {\n  key   String @id\n  value Json\n}\n\nmodel AuditLog {\n  id      String   @id @default(cuid())\n  adminId String\n  action  String\n  target  String\n  at      DateTime @default(now())\n}\n\nmodel Post {\n  id          String    @id @default(cuid())\n  kind        String\n  title       String\n  body        String\n  publishedAt DateTime?\n}\n', inlineSchemaHash: "88aa6fbf030757866c2942f643500a9c62a8b40e40bd49af33c1e8792e550428", copyEngine: true };
      P.dirname = "/", P.runtimeDataModel = JSON.parse('{"models":{"Person":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"mobile","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"category","kind":"enum","type":"PersonCategory"},{"name":"division","kind":"scalar","type":"String"},{"name":"district","kind":"scalar","type":"String"},{"name":"upazila","kind":"scalar","type":"String"},{"name":"unionName","kind":"scalar","type":"String"},{"name":"mosqueName","kind":"scalar","type":"String"},{"name":"mosqueLat","kind":"scalar","type":"Float"},{"name":"mosqueLng","kind":"scalar","type":"Float"},{"name":"internalStars","kind":"scalar","type":"Int"},{"name":"totalPoints","kind":"scalar","type":"Int"},{"name":"lastActiveAt","kind":"scalar","type":"DateTime"},{"name":"redFlag","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"applications","kind":"object","type":"Application","relationName":"ApplicationToPerson"},{"name":"enrollments","kind":"object","type":"Enrollment","relationName":"EnrollmentToPerson"},{"name":"submissions","kind":"object","type":"Submission","relationName":"PersonToSubmission"},{"name":"attendances","kind":"object","type":"Attendance","relationName":"AttendanceToPerson"},{"name":"magicLinks","kind":"object","type":"MagicLink","relationName":"MagicLinkToPerson"},{"name":"callLogs","kind":"object","type":"CallLog","relationName":"CallLogToPerson"},{"name":"resourceViews","kind":"object","type":"ResourceView","relationName":"PersonToResourceView"},{"name":"reliefReplies","kind":"object","type":"ReliefResponse","relationName":"PersonToReliefResponse"},{"name":"messages","kind":"object","type":"MessageLog","relationName":"MessageLogToPerson"}],"dbName":null},"Event":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"venue","kind":"scalar","type":"String"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"endsAt","kind":"scalar","type":"DateTime"},{"name":"applyOpensAt","kind":"scalar","type":"DateTime"},{"name":"applyClosesAt","kind":"scalar","type":"DateTime"},{"name":"seats","kind":"scalar","type":"Int"},{"name":"eligibility","kind":"scalar","type":"Json"},{"name":"formSchema","kind":"scalar","type":"Json"},{"name":"status","kind":"enum","type":"EventStatus"},{"name":"bannerUrl","kind":"scalar","type":"String"},{"name":"applications","kind":"object","type":"Application","relationName":"ApplicationToEvent"},{"name":"enrollments","kind":"object","type":"Enrollment","relationName":"EnrollmentToEvent"}],"dbName":null},"Application":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"number","kind":"scalar","type":"String"},{"name":"eventId","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"answers","kind":"scalar","type":"Json"},{"name":"status","kind":"enum","type":"ApplicationStatus"},{"name":"autoScreenResult","kind":"scalar","type":"Json"},{"name":"qrToken","kind":"scalar","type":"String"},{"name":"checkedInAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"event","kind":"object","type":"Event","relationName":"ApplicationToEvent"},{"name":"person","kind":"object","type":"Person","relationName":"ApplicationToPerson"}],"dbName":null},"Enrollment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"eventId","kind":"scalar","type":"String"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"certificateNo","kind":"scalar","type":"String"},{"name":"person","kind":"object","type":"Person","relationName":"EnrollmentToPerson"},{"name":"event","kind":"object","type":"Event","relationName":"EnrollmentToEvent"}],"dbName":null},"MagicLink":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"shortCode","kind":"scalar","type":"String"},{"name":"tokenHash","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"purpose","kind":"scalar","type":"String"},{"name":"payload","kind":"scalar","type":"Json"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"usedCount","kind":"scalar","type":"Int"},{"name":"person","kind":"object","type":"Person","relationName":"MagicLinkToPerson"}],"dbName":null},"Resource":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"kind","kind":"scalar","type":"String"},{"name":"fileUrl","kind":"scalar","type":"String"},{"name":"audience","kind":"scalar","type":"Json"},{"name":"publishAt","kind":"scalar","type":"DateTime"},{"name":"views","kind":"object","type":"ResourceView","relationName":"ResourceToResourceView"}],"dbName":null},"ResourceView":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"resourceId","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"action","kind":"scalar","type":"String"},{"name":"at","kind":"scalar","type":"DateTime"},{"name":"resource","kind":"object","type":"Resource","relationName":"ResourceToResourceView"},{"name":"person","kind":"object","type":"Person","relationName":"PersonToResourceView"}],"dbName":null},"OnlineClass":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"startsAt","kind":"scalar","type":"DateTime"},{"name":"meetingUrl","kind":"scalar","type":"String"},{"name":"audience","kind":"scalar","type":"Json"},{"name":"attendances","kind":"object","type":"Attendance","relationName":"AttendanceToOnlineClass"}],"dbName":null},"Attendance":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"classId","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"at","kind":"scalar","type":"DateTime"},{"name":"class","kind":"object","type":"OnlineClass","relationName":"AttendanceToOnlineClass"},{"name":"person","kind":"object","type":"Person","relationName":"AttendanceToPerson"}],"dbName":null},"ActivityType":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"code","kind":"scalar","type":"String"},{"name":"nameBn","kind":"scalar","type":"String"},{"name":"points","kind":"scalar","type":"Int"}],"dbName":null},"Submission":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"activityCode","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"photoUrls","kind":"scalar","type":"String"},{"name":"photoHash","kind":"scalar","type":"String"},{"name":"pointsAwarded","kind":"scalar","type":"Int"},{"name":"status","kind":"scalar","type":"String"},{"name":"month","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"person","kind":"object","type":"Person","relationName":"PersonToSubmission"}],"dbName":null},"ReliefResponse":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"campaign","kind":"scalar","type":"String"},{"name":"willJoin","kind":"scalar","type":"Boolean"},{"name":"at","kind":"scalar","type":"DateTime"},{"name":"person","kind":"object","type":"Person","relationName":"PersonToReliefResponse"}],"dbName":null},"CallLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"byAdminId","kind":"scalar","type":"String"},{"name":"result","kind":"scalar","type":"String"},{"name":"note","kind":"scalar","type":"String"},{"name":"at","kind":"scalar","type":"DateTime"},{"name":"person","kind":"object","type":"Person","relationName":"CallLogToPerson"}],"dbName":null},"MessageLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"personId","kind":"scalar","type":"String"},{"name":"channel","kind":"scalar","type":"String"},{"name":"body","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"error","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"person","kind":"object","type":"Person","relationName":"MessageLogToPerson"}],"dbName":null},"AdminUser":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"AdminRole"},{"name":"passwordHash","kind":"scalar","type":"String"}],"dbName":null},"Setting":{"fields":[{"name":"key","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"Json"}],"dbName":null},"AuditLog":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"adminId","kind":"scalar","type":"String"},{"name":"action","kind":"scalar","type":"String"},{"name":"target","kind":"scalar","type":"String"},{"name":"at","kind":"scalar","type":"DateTime"}],"dbName":null},"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"kind","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"body","kind":"scalar","type":"String"},{"name":"publishedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}'), w(r.Prisma, P.runtimeDataModel), P.engineWasm = { getRuntime: async () => e.r(36782), getQueryEngineWasmModule: async () => {
        let t2 = (await Promise.resolve().then(() => e.i(31448))).default;
        return (await t2).default;
      } }, P.compilerWasm = void 0, P.injectableEdgeEnv = () => ({ parsed: { DATABASE_URL: "u" > typeof globalThis && globalThis.DATABASE_URL || "u" > typeof process && process.env && process.env.DATABASE_URL || void 0 } }), ("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG) && g.enable("u" > typeof globalThis && globalThis.DEBUG || "u" > typeof process && process.env && process.env.DEBUG || void 0), r.PrismaClient = l(P), Object.assign(r, x);
    }, 10475, (e, t, r) => {
      t.exports = { ...e.r(88974) };
    }, 76221, (e, t, r) => {
      "use strict";
      let n;
      var i = Object.create, a = Object.defineProperty, o = Object.getOwnPropertyDescriptor, s = Object.getOwnPropertyNames, l = Object.getPrototypeOf, c = Object.prototype.hasOwnProperty, u = (e10, t10) => () => (e10 && (t10 = e10(e10 = 0)), t10), d = (e10, t10) => () => (t10 || e10((t10 = { exports: {} }).exports, t10), t10.exports), h = (e10, t10) => {
        for (var r10 in t10) a(e10, r10, { get: t10[r10], enumerable: true });
      }, p = (e10, t10, r10, n10) => {
        if (t10 && "object" == typeof t10 || "function" == typeof t10) for (let i10 of s(t10)) c.call(e10, i10) || i10 === r10 || a(e10, i10, { get: () => t10[i10], enumerable: !(n10 = o(t10, i10)) || n10.enumerable });
        return e10;
      }, f = (e10, t10, r10) => (r10 = null != e10 ? i(l(e10)) : {}, p(!t10 && e10 && e10.__esModule ? r10 : a(r10, "default", { value: e10, enumerable: true }), e10));
      function g(e10, t10) {
        if ("utf8" === (t10 = t10.toLowerCase()) || "utf-8" === t10) return new S(P.encode(e10));
        if ("base64" === t10 || "base64url" === t10) return e10 = (e10 = e10.replace(/-/g, "+").replace(/_/g, "/")).replace(/[^A-Za-z0-9+/]/g, ""), new S([...atob(e10)].map((e11) => e11.charCodeAt(0)));
        if ("binary" === t10 || "ascii" === t10 || "latin1" === t10 || "latin-1" === t10) return new S([...e10].map((e11) => e11.charCodeAt(0)));
        if ("ucs2" === t10 || "ucs-2" === t10 || "utf16le" === t10 || "utf-16le" === t10) {
          let t11 = new S(2 * e10.length), r10 = new DataView(t11.buffer);
          for (let t12 = 0; t12 < e10.length; t12++) r10.setUint16(2 * t12, e10.charCodeAt(t12), true);
          return t11;
        }
        if ("hex" === t10) {
          let t11 = new S(e10.length / 2);
          for (let r10 = 0, n10 = 0; n10 < e10.length; n10 += 2, r10++) t11[r10] = parseInt(e10.slice(n10, n10 + 2), 16);
          return t11;
        }
        m(`encoding "${t10}"`);
      }
      function m(e10) {
        throw Error(`Buffer polyfill does not implement "${e10}"`);
      }
      function y(e10, t10) {
        if (!(e10 instanceof Uint8Array)) throw TypeError(`The "${t10}" argument must be an instance of Buffer or Uint8Array`);
      }
      function b(e10, t10, r10 = R + 1) {
        if (e10 < 0 || e10 > r10) {
          let n10 = RangeError(`The value of "${t10}" is out of range. It must be >= 0 && <= ${r10}. Received ${e10}`);
          throw n10.code = "ERR_OUT_OF_RANGE", n10;
        }
      }
      function v(e10, t10) {
        if ("number" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type number. Received type ${typeof e10}.`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function w(e10, t10) {
        if (!Number.isInteger(e10) || Number.isNaN(e10)) {
          let r10 = RangeError(`The value of "${t10}" is out of range. It must be an integer. Received ${e10}`);
          throw r10.code = "ERR_OUT_OF_RANGE", r10;
        }
      }
      function _(e10, t10) {
        if ("string" != typeof e10) {
          let r10 = TypeError(`The "${t10}" argument must be of type string. Received type ${typeof e10}`);
          throw r10.code = "ERR_INVALID_ARG_TYPE", r10;
        }
      }
      function E(e10, t10 = "utf8") {
        return S.from(e10, t10);
      }
      var S, x, P, T, A, R, C, O, k, N, I, M, D = u(() => {
        var e10;
        let t10, r10, n10, i10;
        S = class e11 extends Uint8Array {
          _isBuffer = true;
          get offset() {
            return this.byteOffset;
          }
          static alloc(t11, r11 = 0, n11 = "utf8") {
            return _(n11, "encoding"), e11.allocUnsafe(t11).fill(r11, n11);
          }
          static allocUnsafe(t11) {
            return e11.from(t11);
          }
          static allocUnsafeSlow(t11) {
            return e11.from(t11);
          }
          static isBuffer(e12) {
            return e12 && !!e12._isBuffer;
          }
          static byteLength(e12, t11 = "utf8") {
            if ("string" == typeof e12) return g(e12, t11).byteLength;
            if (e12 && e12.byteLength) return e12.byteLength;
            let r11 = TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
            throw r11.code = "ERR_INVALID_ARG_TYPE", r11;
          }
          static isEncoding(e12) {
            return A.includes(e12);
          }
          static compare(e12, t11) {
            y(e12, "buff1"), y(t11, "buff2");
            for (let r11 = 0; r11 < e12.length; r11++) {
              if (e12[r11] < t11[r11]) return -1;
              if (e12[r11] > t11[r11]) return 1;
            }
            return e12.length === t11.length ? 0 : e12.length > t11.length ? 1 : -1;
          }
          static from(t11, r11 = "utf8") {
            if (t11 && "object" == typeof t11 && "Buffer" === t11.type) return new e11(t11.data);
            if ("number" == typeof t11) return new e11(new Uint8Array(t11));
            if ("string" == typeof t11) return g(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { byteOffset: r12, byteLength: n11, buffer: i11 } = t11;
              return "map" in t11 && "function" == typeof t11.map ? new e11(t11.map((e12) => e12 % 256), r12, n11) : new e11(i11, r12, n11);
            }
            if (t11 && "object" == typeof t11 && ("length" in t11 || "byteLength" in t11 || "buffer" in t11)) return new e11(t11);
            throw TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
          }
          static concat(t11, r11) {
            if (0 === t11.length) return e11.alloc(0);
            let n11 = [].concat(...t11.map((e12) => [...e12])), i11 = e11.alloc(void 0 !== r11 ? r11 : n11.length);
            return i11.set(void 0 !== r11 ? n11.slice(0, r11) : n11), i11;
          }
          slice(e12 = 0, t11 = this.length) {
            return this.subarray(e12, t11);
          }
          subarray(t11 = 0, r11 = this.length) {
            return Object.setPrototypeOf(super.subarray(t11, r11), e11.prototype);
          }
          reverse() {
            return super.reverse(), this;
          }
          readIntBE(e12, t11) {
            v(e12, "offset"), w(e12, "offset"), b(e12, "offset", this.length - 1), v(t11, "byteLength"), w(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return 128 & r11.getUint8(0) && (n11 -= Math.pow(256, t11)), n11;
          }
          readIntLE(e12, t11) {
            v(e12, "offset"), w(e12, "offset"), b(e12, "offset", this.length - 1), v(t11, "byteLength"), w(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return 128 & r11.getUint8(t11 - 1) && (n11 -= Math.pow(256, t11)), n11;
          }
          readUIntBE(e12, t11) {
            v(e12, "offset"), w(e12, "offset"), b(e12, "offset", this.length - 1), v(t11, "byteLength"), w(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 = 256 * n11 + r11.getUint8(e13);
            return n11;
          }
          readUintBE(e12, t11) {
            return this.readUIntBE(e12, t11);
          }
          readUIntLE(e12, t11) {
            v(e12, "offset"), w(e12, "offset"), b(e12, "offset", this.length - 1), v(t11, "byteLength"), w(t11, "byteLength");
            let r11 = new DataView(this.buffer, e12, t11), n11 = 0;
            for (let e13 = 0; e13 < t11; e13++) n11 += r11.getUint8(e13) * Math.pow(256, e13);
            return n11;
          }
          readUintLE(e12, t11) {
            return this.readUIntLE(e12, t11);
          }
          writeIntBE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntBE(e12, t11, r11);
          }
          writeIntLE(e12, t11, r11) {
            return e12 = e12 < 0 ? e12 + Math.pow(256, r11) : e12, this.writeUIntLE(e12, t11, r11);
          }
          writeUIntBE(e12, t11, r11) {
            v(t11, "offset"), w(t11, "offset"), b(t11, "offset", this.length - 1), v(r11, "byteLength"), w(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = r11 - 1; t12 >= 0; t12--) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintBE(e12, t11, r11) {
            return this.writeUIntBE(e12, t11, r11);
          }
          writeUIntLE(e12, t11, r11) {
            v(t11, "offset"), w(t11, "offset"), b(t11, "offset", this.length - 1), v(r11, "byteLength"), w(r11, "byteLength");
            let n11 = new DataView(this.buffer, t11, r11);
            for (let t12 = 0; t12 < r11; t12++) n11.setUint8(t12, 255 & e12), e12 /= 256;
            return t11 + r11;
          }
          writeUintLE(e12, t11, r11) {
            return this.writeUIntLE(e12, t11, r11);
          }
          toJSON() {
            return { type: "Buffer", data: Array.from(this) };
          }
          swap16() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 2) e12.setUint16(t11, e12.getUint16(t11, true), false);
            return this;
          }
          swap32() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 4) e12.setUint32(t11, e12.getUint32(t11, true), false);
            return this;
          }
          swap64() {
            let e12 = new DataView(this.buffer, this.byteOffset, this.byteLength);
            for (let t11 = 0; t11 < this.length; t11 += 8) e12.setBigUint64(t11, e12.getBigUint64(t11, true), false);
            return this;
          }
          compare(t11, r11 = 0, n11 = t11.length, i11 = 0, a2 = this.length) {
            return y(t11, "target"), v(r11, "targetStart"), v(n11, "targetEnd"), v(i11, "sourceStart"), v(a2, "sourceEnd"), b(r11, "targetStart"), b(n11, "targetEnd", t11.length), b(i11, "sourceStart"), b(a2, "sourceEnd", this.length), e11.compare(this.slice(i11, a2), t11.slice(r11, n11));
          }
          equals(e12) {
            return y(e12, "otherBuffer"), this.length === e12.length && this.every((t11, r11) => t11 === e12[r11]);
          }
          copy(e12, t11 = 0, r11 = 0, n11 = this.length) {
            b(t11, "targetStart"), b(r11, "sourceStart", this.length), b(n11, "sourceEnd"), t11 >>>= 0, r11 >>>= 0, n11 >>>= 0;
            let i11 = 0;
            for (; r11 < n11 && void 0 !== this[r11] && void 0 !== e12[t11]; ) e12[t11] = this[r11], i11++, r11++, t11++;
            return i11;
          }
          write(e12, t11, r11, n11 = "utf8") {
            let i11 = "string" == typeof t11 ? 0 : t11 ?? 0, a2 = "string" == typeof r11 ? this.length - i11 : r11 ?? this.length - i11;
            return n11 = "string" == typeof t11 ? t11 : "string" == typeof r11 ? r11 : n11, v(i11, "offset"), v(a2, "length"), b(i11, "offset", this.length), b(a2, "length", this.length), ("ucs2" === n11 || "ucs-2" === n11 || "utf16le" === n11 || "utf-16le" === n11) && (a2 -= a2 % 2), g(e12, n11).copy(this, i11, 0, a2);
          }
          fill(t11 = 0, r11 = 0, n11 = this.length, i11 = "utf-8") {
            let a2 = "string" == typeof r11 ? 0 : r11, o2 = "string" == typeof n11 ? this.length : n11;
            if (i11 = "string" == typeof r11 ? r11 : "string" == typeof n11 ? n11 : i11, t11 = e11.from("number" == typeof t11 ? [t11] : t11 ?? [], i11), _(i11, "encoding"), b(a2, "offset", this.length), b(o2, "end", this.length), 0 !== t11.length) for (let e12 = a2; e12 < o2; e12 += t11.length) super.set(t11.slice(0, t11.length + e12 >= this.length ? this.length - e12 : t11.length), e12);
            return this;
          }
          includes(e12, t11 = null, r11 = "utf-8") {
            return -1 !== this.indexOf(e12, t11, r11);
          }
          lastIndexOf(e12, t11 = null, r11 = "utf-8") {
            return this.indexOf(e12, t11, r11, true);
          }
          indexOf(t11, r11 = null, n11 = "utf-8", i11 = false) {
            let a2 = i11 ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
            n11 = "string" == typeof r11 ? r11 : n11;
            let o2 = e11.from("number" == typeof t11 ? [t11] : t11, n11), s2 = "string" == typeof r11 ? 0 : r11;
            return s2 = Number.isNaN(s2 = "number" == typeof r11 ? s2 : null) ? null : s2, s2 ??= i11 ? this.length : 0, s2 = s2 < 0 ? this.length + s2 : s2, 0 === o2.length && false === i11 ? s2 >= this.length ? this.length : s2 : 0 === o2.length && true === i11 ? (s2 >= this.length ? this.length : s2) || this.length : a2((e12, t12) => (i11 ? t12 <= s2 : t12 >= s2) && this[t12] === o2[0] && o2.every((e13, r12) => this[t12 + r12] === e13));
          }
          toString(e12 = "utf8", t11 = 0, r11 = this.length) {
            if (t11 = t11 < 0 ? 0 : t11, e12 = e12.toString().toLowerCase(), r11 <= 0) return "";
            if ("utf8" === e12 || "utf-8" === e12) return T.decode(this.slice(t11, r11));
            if ("base64" === e12 || "base64url" === e12) {
              let t12 = btoa(this.reduce((e13, t13) => e13 + O(t13), ""));
              return "base64url" === e12 ? t12.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : t12;
            }
            if ("binary" === e12 || "ascii" === e12 || "latin1" === e12 || "latin-1" === e12) return this.slice(t11, r11).reduce((t12, r12) => t12 + O(r12 & ("ascii" === e12 ? 127 : 255)), "");
            if ("ucs2" === e12 || "ucs-2" === e12 || "utf16le" === e12 || "utf-16le" === e12) {
              let e13 = new DataView(this.buffer.slice(t11, r11));
              return Array.from({ length: e13.byteLength / 2 }, (t12, r12) => 2 * r12 + 1 < e13.byteLength ? O(e13.getUint16(2 * r12, true)) : "").join("");
            }
            if ("hex" === e12) return this.slice(t11, r11).reduce((e13, t12) => e13 + t12.toString(16).padStart(2, "0"), "");
            m(`encoding "${e12}"`);
          }
          toLocaleString() {
            return this.toString();
          }
          inspect() {
            return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
          }
        }, x = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, P = new TextEncoder(), T = new TextDecoder(), A = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], R = 4294967295, e10 = S.prototype, r10 = (t10 = Object.getOwnPropertyNames(DataView.prototype).filter((e11) => e11.startsWith("get") || e11.startsWith("set"))).map((e11) => e11.replace("get", "read").replace("set", "write")), n10 = (e11, r11) => function(n11 = 0) {
          return v(n11, "offset"), w(n11, "offset"), b(n11, "offset", this.length - 1), new DataView(this.buffer)[t10[e11]](n11, r11);
        }, i10 = (e11, r11) => function(n11, i11 = 0) {
          let a2 = x[t10[e11].match(/set(\w+\d+)/)[1].toLowerCase()];
          return v(i11, "offset"), w(i11, "offset"), b(i11, "offset", this.length - 1), (function(e12, t11, r12, n12) {
            if (e12 < r12 || e12 > n12) {
              let i12 = RangeError(`The value of "${t11}" is out of range. It must be >= ${r12} and <= ${n12}. Received ${e12}`);
              throw i12.code = "ERR_OUT_OF_RANGE", i12;
            }
          })(n11, "value", a2[0], a2[1]), new DataView(this.buffer)[t10[e11]](i11, n11, r11), i11 + parseInt(t10[e11].match(/\d+/)[0]) / 8;
        }, r10.forEach((t11, r11) => {
          t11.startsWith("read") && (e10[t11] = n10(r11, false), e10[t11 + "LE"] = n10(r11, true), e10[t11 + "BE"] = n10(r11, false)), t11.startsWith("write") && (e10[t11] = i10(r11, false), e10[t11 + "LE"] = i10(r11, true), e10[t11 + "BE"] = i10(r11, false)), [t11, t11 + "LE", t11 + "BE"].forEach((t12) => {
            t12.includes("Uint") && (e10[t12.replace("Uint", "UInt")] = e10[t12]), t12.includes("Float64") && (e10[t12.replace("Float64", "Double")] = e10[t12]), t12.includes("Float32") && (e10[t12.replace("Float32", "Float")] = e10[t12]);
          });
        }), C = new Proxy(E, { construct: (e11, [t11, r11]) => S.from(t11, r11), get: (e11, t11) => S[t11] }), O = String.fromCodePoint;
      }), $ = u(() => {
        k = { nextTick: (e10, ...t10) => {
          setTimeout(() => {
            e10(...t10);
          }, 0);
        }, env: {}, version: "", cwd: () => "/", stderr: {}, argv: ["/bin/node"], pid: 1e4 }, { cwd: N } = k;
      }), L = u(() => {
        globalThis.performance ?? Date.now();
      }), j = u(() => {
        (I = () => {
        }).prototype = I;
      }), q = u(() => {
        M = class {
          value;
          constructor(e10) {
            this.value = e10;
          }
          deref() {
            return this.value;
          }
        };
      });
      function U(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2 = e10.constructor, d2 = u2.precision;
        if (!e10.s || !t10.s) return t10.s || (t10 = new u2(e10)), en ? K(t10, d2) : t10;
        if (l2 = e10.d, c2 = t10.d, o2 = e10.e, i10 = t10.e, l2 = l2.slice(), a2 = o2 - i10) {
          for (a2 < 0 ? (n10 = l2, a2 = -a2, s2 = c2.length) : (n10 = c2, i10 = o2, s2 = l2.length), a2 > (s2 = (o2 = Math.ceil(d2 / eh)) > s2 ? o2 + 1 : s2 + 1) && (a2 = s2, n10.length = 1), n10.reverse(); a2--; ) n10.push(0);
          n10.reverse();
        }
        for ((s2 = l2.length) - (a2 = c2.length) < 0 && (a2 = s2, n10 = c2, c2 = l2, l2 = n10), r10 = 0; a2; ) r10 = (l2[--a2] = l2[a2] + c2[a2] + r10) / ed | 0, l2[a2] %= ed;
        for (r10 && (l2.unshift(r10), ++i10), s2 = l2.length; 0 == l2[--s2]; ) l2.pop();
        return t10.d = l2, t10.e = i10, en ? K(t10, d2) : t10;
      }
      function F(e10, t10, r10) {
        if (e10 !== ~~e10 || e10 < t10 || e10 > r10) throw Error(ea + e10);
      }
      function V(e10) {
        var t10, r10, n10, i10 = e10.length - 1, a2 = "", o2 = e10[0];
        if (i10 > 0) {
          for (a2 += o2, t10 = 1; t10 < i10; t10++) n10 = e10[t10] + "", (r10 = eh - n10.length) && (a2 += W(r10)), a2 += n10;
          n10 = (o2 = e10[t10]) + "", (r10 = eh - n10.length) && (a2 += W(r10));
        } else if (0 === o2) return "0";
        for (; o2 % 10 == 0; ) o2 /= 10;
        return a2 + o2;
      }
      function B(e10, t10) {
        var r10, n10, i10, a2, o2, s2 = 0, l2 = 0, c2 = e10.constructor, u2 = c2.precision;
        if (H(e10) > 16) throw Error(eo + H(e10));
        if (!e10.s) return new c2(eu);
        for (null == t10 ? (en = false, o2 = u2) : o2 = t10, a2 = new c2(0.03125); e10.abs().gte(0.1); ) e10 = e10.times(a2), l2 += 5;
        for (o2 += Math.log(el(2, l2)) / Math.LN10 * 2 + 5 | 0, r10 = n10 = i10 = new c2(eu), c2.precision = o2; ; ) {
          if (n10 = K(n10.times(e10), o2), r10 = r10.times(++s2), V((a2 = i10.plus(eg(n10, r10, o2))).d).slice(0, o2) === V(i10.d).slice(0, o2)) {
            for (; l2--; ) i10 = K(i10.times(i10), o2);
            return c2.precision = u2, null == t10 ? (en = true, K(i10, u2)) : i10;
          }
          i10 = a2;
        }
      }
      function H(e10) {
        for (var t10 = e10.e * eh, r10 = e10.d[0]; r10 >= 10; r10 /= 10) t10++;
        return t10;
      }
      function G(e10, t10, r10) {
        if (t10 > e10.LN10.sd()) throw en = true, r10 && (e10.precision = r10), Error(ei + "LN10 precision limit exceeded");
        return K(new e10(e10.LN10), t10);
      }
      function W(e10) {
        for (var t10 = ""; e10--; ) t10 += "0";
        return t10;
      }
      function J(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2, d2 = 1, h2 = e10, p2 = h2.d, f2 = h2.constructor, g2 = f2.precision;
        if (h2.s < 1) throw Error(ei + (h2.s ? "NaN" : "-Infinity"));
        if (h2.eq(eu)) return new f2(0);
        if (null == t10 ? (en = false, c2 = g2) : c2 = t10, h2.eq(10)) return null == t10 && (en = true), G(f2, c2);
        if (f2.precision = c2 += 10, n10 = (r10 = V(p2)).charAt(0), !(15e14 > Math.abs(a2 = H(h2)))) return l2 = G(f2, c2 + 2, g2).times(a2 + ""), h2 = J(new f2(n10 + "." + r10.slice(1)), c2 - 10).plus(l2), f2.precision = g2, null == t10 ? (en = true, K(h2, g2)) : h2;
        for (; n10 < 7 && 1 != n10 || 1 == n10 && r10.charAt(1) > 3; ) n10 = (r10 = V((h2 = h2.times(e10)).d)).charAt(0), d2++;
        for (a2 = H(h2), n10 > 1 ? (h2 = new f2("0." + r10), a2++) : h2 = new f2(n10 + "." + r10.slice(1)), s2 = o2 = h2 = eg(h2.minus(eu), h2.plus(eu), c2), u2 = K(h2.times(h2), c2), i10 = 3; ; ) {
          if (o2 = K(o2.times(u2), c2), V((l2 = s2.plus(eg(o2, new f2(i10), c2))).d).slice(0, c2) === V(s2.d).slice(0, c2)) return s2 = s2.times(2), 0 !== a2 && (s2 = s2.plus(G(f2, c2 + 2, g2).times(a2 + ""))), s2 = eg(s2, new f2(d2), c2), f2.precision = g2, null == t10 ? (en = true, K(s2, g2)) : s2;
          s2 = l2, i10 += 2;
        }
      }
      function z(e10, t10) {
        var r10, n10, i10;
        for ((r10 = t10.indexOf(".")) > -1 && (t10 = t10.replace(".", "")), (n10 = t10.search(/e/i)) > 0 ? (r10 < 0 && (r10 = n10), r10 += +t10.slice(n10 + 1), t10 = t10.substring(0, n10)) : r10 < 0 && (r10 = t10.length), n10 = 0; 48 === t10.charCodeAt(n10); ) ++n10;
        for (i10 = t10.length; 48 === t10.charCodeAt(i10 - 1); ) --i10;
        if (t10 = t10.slice(n10, i10)) {
          if (i10 -= n10, e10.e = es((r10 = r10 - n10 - 1) / eh), e10.d = [], n10 = (r10 + 1) % eh, r10 < 0 && (n10 += eh), n10 < i10) {
            for (n10 && e10.d.push(+t10.slice(0, n10)), i10 -= eh; n10 < i10; ) e10.d.push(+t10.slice(n10, n10 += eh));
            t10 = t10.slice(n10), n10 = eh - t10.length;
          } else n10 -= i10;
          for (; n10--; ) t10 += "0";
          if (e10.d.push(+t10), en && (e10.e > ep || e10.e < -ep)) throw Error(eo + r10);
        } else e10.s = 0, e10.e = 0, e10.d = [0];
        return e10;
      }
      function K(e10, t10, r10) {
        var n10, i10, a2, o2, s2, l2, c2, u2, d2 = e10.d;
        for (o2 = 1, a2 = d2[0]; a2 >= 10; a2 /= 10) o2++;
        if ((n10 = t10 - o2) < 0) n10 += eh, i10 = t10, c2 = d2[u2 = 0];
        else {
          if ((u2 = Math.ceil((n10 + 1) / eh)) >= (a2 = d2.length)) return e10;
          for (c2 = a2 = d2[u2], o2 = 1; a2 >= 10; a2 /= 10) o2++;
          n10 %= eh, i10 = n10 - eh + o2;
        }
        if (void 0 !== r10 && (s2 = c2 / (a2 = el(10, o2 - i10 - 1)) % 10 | 0, l2 = t10 < 0 || void 0 !== d2[u2 + 1] || c2 % a2, l2 = r10 < 4 ? (s2 || l2) && (0 == r10 || r10 == (e10.s < 0 ? 3 : 2)) : s2 > 5 || 5 == s2 && (4 == r10 || l2 || 6 == r10 && (n10 > 0 ? i10 > 0 ? c2 / el(10, o2 - i10) : 0 : d2[u2 - 1]) % 10 & 1 || r10 == (e10.s < 0 ? 8 : 7))), t10 < 1 || !d2[0]) return l2 ? (a2 = H(e10), d2.length = 1, t10 = t10 - a2 - 1, d2[0] = el(10, (eh - t10 % eh) % eh), e10.e = es(-t10 / eh) || 0) : (d2.length = 1, d2[0] = e10.e = e10.s = 0), e10;
        if (0 == n10 ? (d2.length = u2, a2 = 1, u2--) : (d2.length = u2 + 1, a2 = el(10, eh - n10), d2[u2] = i10 > 0 ? (c2 / el(10, o2 - i10) % el(10, i10) | 0) * a2 : 0), l2) for (; ; ) if (0 == u2) {
          (d2[0] += a2) == ed && (d2[0] = 1, ++e10.e);
          break;
        } else {
          if (d2[u2] += a2, d2[u2] != ed) break;
          d2[u2--] = 0, a2 = 1;
        }
        for (n10 = d2.length; 0 === d2[--n10]; ) d2.pop();
        if (en && (e10.e > ep || e10.e < -ep)) throw Error(eo + H(e10));
        return e10;
      }
      function Q(e10, t10) {
        var r10, n10, i10, a2, o2, s2, l2, c2, u2, d2, h2 = e10.constructor, p2 = h2.precision;
        if (!e10.s || !t10.s) return t10.s ? t10.s = -t10.s : t10 = new h2(e10), en ? K(t10, p2) : t10;
        if (l2 = e10.d, d2 = t10.d, n10 = t10.e, c2 = e10.e, l2 = l2.slice(), o2 = c2 - n10) {
          for ((u2 = o2 < 0) ? (r10 = l2, o2 = -o2, s2 = d2.length) : (r10 = d2, n10 = c2, s2 = l2.length), o2 > (i10 = Math.max(Math.ceil(p2 / eh), s2) + 2) && (o2 = i10, r10.length = 1), r10.reverse(), i10 = o2; i10--; ) r10.push(0);
          r10.reverse();
        } else {
          for ((u2 = (i10 = l2.length) < (s2 = d2.length)) && (s2 = i10), i10 = 0; i10 < s2; i10++) if (l2[i10] != d2[i10]) {
            u2 = l2[i10] < d2[i10];
            break;
          }
          o2 = 0;
        }
        for (u2 && (r10 = l2, l2 = d2, d2 = r10, t10.s = -t10.s), s2 = l2.length, i10 = d2.length - s2; i10 > 0; --i10) l2[s2++] = 0;
        for (i10 = d2.length; i10 > o2; ) {
          if (l2[--i10] < d2[i10]) {
            for (a2 = i10; a2 && 0 === l2[--a2]; ) l2[a2] = ed - 1;
            --l2[a2], l2[i10] += ed;
          }
          l2[i10] -= d2[i10];
        }
        for (; 0 === l2[--s2]; ) l2.pop();
        for (; 0 === l2[0]; l2.shift()) --n10;
        return l2[0] ? (t10.d = l2, t10.e = n10, en ? K(t10, p2) : t10) : new h2(0);
      }
      function X(e10, t10, r10) {
        var n10, i10 = H(e10), a2 = V(e10.d), o2 = a2.length;
        return t10 ? (r10 && (n10 = r10 - o2) > 0 ? a2 = a2.charAt(0) + "." + a2.slice(1) + W(n10) : o2 > 1 && (a2 = a2.charAt(0) + "." + a2.slice(1)), a2 = a2 + (i10 < 0 ? "e" : "e+") + i10) : i10 < 0 ? (a2 = "0." + W(-i10 - 1) + a2, r10 && (n10 = r10 - o2) > 0 && (a2 += W(n10))) : i10 >= o2 ? (a2 += W(i10 + 1 - o2), r10 && (n10 = r10 - i10 - 1) > 0 && (a2 = a2 + "." + W(n10))) : ((n10 = i10 + 1) < o2 && (a2 = a2.slice(0, n10) + "." + a2.slice(n10)), r10 && (n10 = r10 - o2) > 0 && (i10 + 1 === o2 && (a2 += "."), a2 += W(n10))), e10.s < 0 ? "-" + a2 : a2;
      }
      function Y(e10, t10) {
        if (e10.length > t10) return e10.length = t10, true;
      }
      function Z(e10) {
        if (!e10 || "object" != typeof e10) throw Error(ei + "Object expected");
        var t10, r10, n10, i10 = ["precision", 1, ee, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
        for (t10 = 0; t10 < i10.length; t10 += 3) if (void 0 !== (n10 = e10[r10 = i10[t10]])) if (es(n10) === n10 && n10 >= i10[t10 + 1] && n10 <= i10[t10 + 2]) this[r10] = n10;
        else throw Error(ea + r10 + ": " + n10);
        if (void 0 !== (n10 = e10[r10 = "LN10"])) if (n10 == Math.LN10) this[r10] = new this(n10);
        else throw Error(ea + r10 + ": " + n10);
        return this;
      }
      var ee, et, er, en, ei, ea, eo, es, el, ec, eu, ed, eh, ep, ef, eg, em, ey, eb, ev = u(() => {
        D(), $(), L(), j(), q(), ew(), ee = 1e9, et = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, en = true, ea = (ei = "[DecimalError] ") + "Invalid argument: ", eo = ei + "Exponent out of range: ", es = Math.floor, el = Math.pow, ec = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ed = 1e7, ep = es(9007199254740991 / (eh = 7)), (ef = {}).absoluteValue = ef.abs = function() {
          var e10 = new this.constructor(this);
          return e10.s && (e10.s = 1), e10;
        }, ef.comparedTo = ef.cmp = function(e10) {
          var t10, r10, n10, i10;
          if (e10 = new this.constructor(e10), this.s !== e10.s) return this.s || -e10.s;
          if (this.e !== e10.e) return this.e > e10.e ^ this.s < 0 ? 1 : -1;
          for (n10 = this.d.length, i10 = e10.d.length, t10 = 0, r10 = n10 < i10 ? n10 : i10; t10 < r10; ++t10) if (this.d[t10] !== e10.d[t10]) return this.d[t10] > e10.d[t10] ^ this.s < 0 ? 1 : -1;
          return n10 === i10 ? 0 : n10 > i10 ^ this.s < 0 ? 1 : -1;
        }, ef.decimalPlaces = ef.dp = function() {
          var e10 = this.d.length - 1, t10 = (e10 - this.e) * eh;
          if (e10 = this.d[e10]) for (; e10 % 10 == 0; e10 /= 10) t10--;
          return t10 < 0 ? 0 : t10;
        }, ef.dividedBy = ef.div = function(e10) {
          return eg(this, new this.constructor(e10));
        }, ef.dividedToIntegerBy = ef.idiv = function(e10) {
          var t10 = this.constructor;
          return K(eg(this, new t10(e10), 0, 1), t10.precision);
        }, ef.equals = ef.eq = function(e10) {
          return !this.cmp(e10);
        }, ef.exponent = function() {
          return H(this);
        }, ef.greaterThan = ef.gt = function(e10) {
          return this.cmp(e10) > 0;
        }, ef.greaterThanOrEqualTo = ef.gte = function(e10) {
          return this.cmp(e10) >= 0;
        }, ef.isInteger = ef.isint = function() {
          return this.e > this.d.length - 2;
        }, ef.isNegative = ef.isneg = function() {
          return this.s < 0;
        }, ef.isPositive = ef.ispos = function() {
          return this.s > 0;
        }, ef.isZero = function() {
          return 0 === this.s;
        }, ef.lessThan = ef.lt = function(e10) {
          return 0 > this.cmp(e10);
        }, ef.lessThanOrEqualTo = ef.lte = function(e10) {
          return 1 > this.cmp(e10);
        }, ef.logarithm = ef.log = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision, i10 = n10 + 5;
          if (void 0 === e10) e10 = new r10(10);
          else if ((e10 = new r10(e10)).s < 1 || e10.eq(eu)) throw Error(ei + "NaN");
          if (this.s < 1) throw Error(ei + (this.s ? "NaN" : "-Infinity"));
          return this.eq(eu) ? new r10(0) : (en = false, t10 = eg(J(this, i10), J(e10, i10), i10), en = true, K(t10, n10));
        }, ef.minus = ef.sub = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? Q(this, e10) : U(this, (e10.s = -e10.s, e10));
        }, ef.modulo = ef.mod = function(e10) {
          var t10, r10 = this.constructor, n10 = r10.precision;
          if (!(e10 = new r10(e10)).s) throw Error(ei + "NaN");
          return this.s ? (en = false, t10 = eg(this, e10, 0, 1).times(e10), en = true, this.minus(t10)) : K(new r10(this), n10);
        }, ef.naturalExponential = ef.exp = function() {
          return B(this);
        }, ef.naturalLogarithm = ef.ln = function() {
          return J(this);
        }, ef.negated = ef.neg = function() {
          var e10 = new this.constructor(this);
          return e10.s = -e10.s || 0, e10;
        }, ef.plus = ef.add = function(e10) {
          return e10 = new this.constructor(e10), this.s == e10.s ? U(this, e10) : Q(this, (e10.s = -e10.s, e10));
        }, ef.precision = ef.sd = function(e10) {
          var t10, r10, n10;
          if (void 0 !== e10 && !!e10 !== e10 && 1 !== e10 && 0 !== e10) throw Error(ea + e10);
          if (t10 = H(this) + 1, r10 = (n10 = this.d.length - 1) * eh + 1, n10 = this.d[n10]) {
            for (; n10 % 10 == 0; n10 /= 10) r10--;
            for (n10 = this.d[0]; n10 >= 10; n10 /= 10) r10++;
          }
          return e10 && t10 > r10 ? t10 : r10;
        }, ef.squareRoot = ef.sqrt = function() {
          var e10, t10, r10, n10, i10, a2, o2, s2 = this.constructor;
          if (this.s < 1) {
            if (!this.s) return new s2(0);
            throw Error(ei + "NaN");
          }
          for (e10 = H(this), en = false, 0 == (i10 = Math.sqrt(+this)) || 1 / 0 == i10 ? (((t10 = V(this.d)).length + e10) % 2 == 0 && (t10 += "0"), i10 = Math.sqrt(t10), e10 = es((e10 + 1) / 2) - (e10 < 0 || e10 % 2), n10 = new s2(t10 = 1 / 0 == i10 ? "5e" + e10 : (t10 = i10.toExponential()).slice(0, t10.indexOf("e") + 1) + e10)) : n10 = new s2(i10.toString()), i10 = o2 = (r10 = s2.precision) + 3; ; ) if (n10 = (a2 = n10).plus(eg(this, a2, o2 + 2)).times(0.5), V(a2.d).slice(0, o2) === (t10 = V(n10.d)).slice(0, o2)) {
            if (t10 = t10.slice(o2 - 3, o2 + 1), i10 == o2 && "4999" == t10) {
              if (K(a2, r10 + 1, 0), a2.times(a2).eq(this)) {
                n10 = a2;
                break;
              }
            } else if ("9999" != t10) break;
            o2 += 4;
          }
          return en = true, K(n10, r10);
        }, ef.times = ef.mul = function(e10) {
          var t10, r10, n10, i10, a2, o2, s2, l2, c2, u2 = this.constructor, d2 = this.d, h2 = (e10 = new u2(e10)).d;
          if (!this.s || !e10.s) return new u2(0);
          for (e10.s *= this.s, r10 = this.e + e10.e, (l2 = d2.length) < (c2 = h2.length) && (a2 = d2, d2 = h2, h2 = a2, o2 = l2, l2 = c2, c2 = o2), a2 = [], n10 = o2 = l2 + c2; n10--; ) a2.push(0);
          for (n10 = c2; --n10 >= 0; ) {
            for (t10 = 0, i10 = l2 + n10; i10 > n10; ) s2 = a2[i10] + h2[n10] * d2[i10 - n10 - 1] + t10, a2[i10--] = s2 % ed | 0, t10 = s2 / ed | 0;
            a2[i10] = (a2[i10] + t10) % ed | 0;
          }
          for (; !a2[--o2]; ) a2.pop();
          return t10 ? ++r10 : a2.shift(), e10.d = a2, e10.e = r10, en ? K(e10, u2.precision) : e10;
        }, ef.toDecimalPlaces = ef.todp = function(e10, t10) {
          var r10 = this, n10 = r10.constructor;
          return r10 = new n10(r10), void 0 === e10 ? r10 : (F(e10, 0, ee), void 0 === t10 ? t10 = n10.rounding : F(t10, 0, 8), K(r10, e10 + H(r10) + 1, t10));
        }, ef.toExponential = function(e10, t10) {
          var r10, n10 = this, i10 = n10.constructor;
          return void 0 === e10 ? r10 = X(n10, true) : (F(e10, 0, ee), void 0 === t10 ? t10 = i10.rounding : F(t10, 0, 8), r10 = X(n10 = K(new i10(n10), e10 + 1, t10), true, e10 + 1)), r10;
        }, ef.toFixed = function(e10, t10) {
          var r10, n10, i10 = this.constructor;
          return void 0 === e10 ? X(this) : (F(e10, 0, ee), void 0 === t10 ? t10 = i10.rounding : F(t10, 0, 8), r10 = X((n10 = K(new i10(this), e10 + H(this) + 1, t10)).abs(), false, e10 + H(n10) + 1), this.isneg() && !this.isZero() ? "-" + r10 : r10);
        }, ef.toInteger = ef.toint = function() {
          var e10 = this.constructor;
          return K(new e10(this), H(this) + 1, e10.rounding);
        }, ef.toNumber = function() {
          return +this;
        }, ef.toPower = ef.pow = function(e10) {
          var t10, r10, n10, i10, a2, o2, s2 = this, l2 = s2.constructor, c2 = +(e10 = new l2(e10));
          if (!e10.s) return new l2(eu);
          if (!(s2 = new l2(s2)).s) {
            if (e10.s < 1) throw Error(ei + "Infinity");
            return s2;
          }
          if (s2.eq(eu)) return s2;
          if (n10 = l2.precision, e10.eq(eu)) return K(s2, n10);
          if (o2 = (t10 = e10.e) >= (r10 = e10.d.length - 1), a2 = s2.s, o2) {
            if ((r10 = c2 < 0 ? -c2 : c2) <= 9007199254740991) {
              for (i10 = new l2(eu), t10 = Math.ceil(n10 / eh + 4), en = false; r10 % 2 && Y((i10 = i10.times(s2)).d, t10), 0 !== (r10 = es(r10 / 2)); ) Y((s2 = s2.times(s2)).d, t10);
              return en = true, e10.s < 0 ? new l2(eu).div(i10) : K(i10, n10);
            }
          } else if (a2 < 0) throw Error(ei + "NaN");
          return a2 = a2 < 0 && 1 & e10.d[Math.max(t10, r10)] ? -1 : 1, s2.s = 1, en = false, i10 = e10.times(J(s2, n10 + 12)), en = true, (i10 = B(i10)).s = a2, i10;
        }, ef.toPrecision = function(e10, t10) {
          var r10, n10, i10 = this, a2 = i10.constructor;
          return void 0 === e10 ? (r10 = H(i10), n10 = X(i10, r10 <= a2.toExpNeg || r10 >= a2.toExpPos)) : (F(e10, 1, ee), void 0 === t10 ? t10 = a2.rounding : F(t10, 0, 8), r10 = H(i10 = K(new a2(i10), e10, t10)), n10 = X(i10, e10 <= r10 || r10 <= a2.toExpNeg, e10)), n10;
        }, ef.toSignificantDigits = ef.tosd = function(e10, t10) {
          var r10 = this.constructor;
          return void 0 === e10 ? (e10 = r10.precision, t10 = r10.rounding) : (F(e10, 1, ee), void 0 === t10 ? t10 = r10.rounding : F(t10, 0, 8)), K(new r10(this), e10, t10);
        }, ef.toString = ef.valueOf = ef.val = ef.toJSON = ef[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = function() {
          var e10 = H(this), t10 = this.constructor;
          return X(this, e10 <= t10.toExpNeg || e10 >= t10.toExpPos);
        }, eg = /* @__PURE__ */ (function() {
          function e10(e11, t11) {
            var r11, n10 = 0, i10 = e11.length;
            for (e11 = e11.slice(); i10--; ) r11 = e11[i10] * t11 + n10, e11[i10] = r11 % ed | 0, n10 = r11 / ed | 0;
            return n10 && e11.unshift(n10), e11;
          }
          function t10(e11, t11, r11, n10) {
            var i10, a2;
            if (r11 != n10) a2 = r11 > n10 ? 1 : -1;
            else for (i10 = a2 = 0; i10 < r11; i10++) if (e11[i10] != t11[i10]) {
              a2 = e11[i10] > t11[i10] ? 1 : -1;
              break;
            }
            return a2;
          }
          function r10(e11, t11, r11) {
            for (var n10 = 0; r11--; ) e11[r11] -= n10, n10 = +(e11[r11] < t11[r11]), e11[r11] = n10 * ed + e11[r11] - t11[r11];
            for (; !e11[0] && e11.length > 1; ) e11.shift();
          }
          return function(n10, i10, a2, o2) {
            var s2, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, b2, v2, w2, _2, E2, S2, x2, P2 = n10.constructor, T2 = n10.s == i10.s ? 1 : -1, A2 = n10.d, R2 = i10.d;
            if (!n10.s) return new P2(n10);
            if (!i10.s) throw Error(ei + "Division by zero");
            for (l2 = n10.e - i10.e, S2 = R2.length, _2 = A2.length, f2 = (p2 = new P2(T2)).d = [], c2 = 0; R2[c2] == (A2[c2] || 0); ) ++c2;
            if (R2[c2] > (A2[c2] || 0) && --l2, (b2 = null == a2 ? a2 = P2.precision : o2 ? a2 + (H(n10) - H(i10)) + 1 : a2) < 0) return new P2(0);
            if (b2 = b2 / eh + 2 | 0, c2 = 0, 1 == S2) for (u2 = 0, R2 = R2[0], b2++; (c2 < _2 || u2) && b2--; c2++) v2 = u2 * ed + (A2[c2] || 0), f2[c2] = v2 / R2 | 0, u2 = v2 % R2 | 0;
            else {
              for ((u2 = ed / (R2[0] + 1) | 0) > 1 && (R2 = e10(R2, u2), A2 = e10(A2, u2), S2 = R2.length, _2 = A2.length), w2 = S2, m2 = (g2 = A2.slice(0, S2)).length; m2 < S2; ) g2[m2++] = 0;
              (x2 = R2.slice()).unshift(0), E2 = R2[0], R2[1] >= ed / 2 && ++E2;
              do
                u2 = 0, (s2 = t10(R2, g2, S2, m2)) < 0 ? (y2 = g2[0], S2 != m2 && (y2 = y2 * ed + (g2[1] || 0)), (u2 = y2 / E2 | 0) > 1 ? (u2 >= ed && (u2 = ed - 1), h2 = (d2 = e10(R2, u2)).length, m2 = g2.length, 1 == (s2 = t10(d2, g2, h2, m2)) && (u2--, r10(d2, S2 < h2 ? x2 : R2, h2))) : (0 == u2 && (s2 = u2 = 1), d2 = R2.slice()), (h2 = d2.length) < m2 && d2.unshift(0), r10(g2, d2, m2), -1 == s2 && (m2 = g2.length, (s2 = t10(R2, g2, S2, m2)) < 1 && (u2++, r10(g2, S2 < m2 ? x2 : R2, m2))), m2 = g2.length) : 0 === s2 && (u2++, g2 = [0]), f2[c2++] = u2, s2 && g2[0] ? g2[m2++] = A2[w2] || 0 : (g2 = [A2[w2]], m2 = 1);
              while ((w2++ < _2 || void 0 !== g2[0]) && b2--);
            }
            return f2[0] || f2.shift(), p2.e = l2, K(p2, o2 ? a2 + H(p2) + 1 : a2);
          };
        })(), eu = new (er = (function e10(t10) {
          var r10, n10, i10;
          function a2(e11) {
            if (!(this instanceof a2)) return new a2(e11);
            if (this.constructor = a2, e11 instanceof a2) {
              this.s = e11.s, this.e = e11.e, this.d = (e11 = e11.d) ? e11.slice() : e11;
              return;
            }
            if ("number" == typeof e11) {
              if (0 * e11 != 0) throw Error(ea + e11);
              if (e11 > 0) this.s = 1;
              else if (e11 < 0) e11 = -e11, this.s = -1;
              else {
                this.s = 0, this.e = 0, this.d = [0];
                return;
              }
              if (e11 === ~~e11 && e11 < 1e7) {
                this.e = 0, this.d = [e11];
                return;
              }
              return z(this, e11.toString());
            }
            if ("string" != typeof e11) throw Error(ea + e11);
            if (45 === e11.charCodeAt(0) ? (e11 = e11.slice(1), this.s = -1) : this.s = 1, ec.test(e11)) z(this, e11);
            else throw Error(ea + e11);
          }
          if (a2.prototype = ef, a2.ROUND_UP = 0, a2.ROUND_DOWN = 1, a2.ROUND_CEIL = 2, a2.ROUND_FLOOR = 3, a2.ROUND_HALF_UP = 4, a2.ROUND_HALF_DOWN = 5, a2.ROUND_HALF_EVEN = 6, a2.ROUND_HALF_CEIL = 7, a2.ROUND_HALF_FLOOR = 8, a2.clone = e10, a2.config = a2.set = Z, void 0 === t10 && (t10 = {}), t10) for (i10 = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], r10 = 0; r10 < i10.length; ) t10.hasOwnProperty(n10 = i10[r10++]) || (t10[n10] = this[n10]);
          return a2.config(t10), a2;
        })(et))(1), em = er;
      }), ew = u(() => {
        ev(), eb = ey = class extends em {
          static isDecimal(e10) {
            return e10 instanceof em;
          }
          static random(e10 = 20) {
            {
              let t10 = globalThis.crypto.getRandomValues(new Uint8Array(e10)).reduce((e11, t11) => e11 + t11, "");
              return new em(`0.${t10.slice(0, e10)}`);
            }
          }
        };
      });
      function e_() {
        return false;
      }
      function eE() {
        return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
      }
      function eS() {
        return eE();
      }
      function ex() {
        return [];
      }
      function eP(e10) {
        e10(null, []);
      }
      function eT() {
        return "";
      }
      function eA() {
        return "";
      }
      function eR() {
      }
      function eC() {
      }
      function eO() {
      }
      function ek() {
      }
      function eN() {
      }
      function eI() {
      }
      function eM() {
      }
      function eD() {
      }
      function e$() {
        return { close: () => {
        }, on: () => {
        }, removeAllListeners: () => {
        } };
      }
      function eL(e10, t10) {
        t10(null, eE());
      }
      var ej, eq = u(() => {
        D(), $(), L(), j(), q(), ew(), ej = { existsSync: e_, lstatSync: eE, stat: eL, statSync: eS, readdirSync: ex, readdir: eP, readlinkSync: eT, realpathSync: eA, chmodSync: eR, renameSync: eC, mkdirSync: eO, rmdirSync: ek, rmSync: eN, unlinkSync: eI, watchFile: eM, unwatchFile: eD, watch: e$, promises: {} };
      }), eU = d((e10, t10) => {
        t10.exports = { name: "@prisma/internals", version: "6.19.3", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", empathic: "2.0.0", "escape-string-regexp": "5.0.0", execa: "8.0.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "global-directory": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-engine-wasm": "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
      });
      function eF(...e10) {
        return e10.join("/");
      }
      function eV(...e10) {
        return e10.join("/");
      }
      function eB(e10) {
        let t10 = eH(e10), r10 = eG(e10), [n10, i10] = t10.split(".");
        return { root: "/", dir: r10, base: t10, ext: i10, name: n10 };
      }
      function eH(e10) {
        let t10 = e10.split("/");
        return t10[t10.length - 1];
      }
      function eG(e10) {
        return e10.split("/").slice(0, -1).join("/");
      }
      function eW(e10) {
        let t10 = e10.split("/").filter((e11) => "" !== e11 && "." !== e11), r10 = [];
        for (let e11 of t10) ".." === e11 ? r10.pop() : r10.push(e11);
        let n10 = r10.join("/");
        return e10.startsWith("/") ? "/" + n10 : n10;
      }
      var eJ, ez, eK = u(() => {
        D(), $(), L(), j(), q(), ew(), eJ = { basename: eH, delimiter: ":", dirname: eG, join: eV, normalize: eW, parse: eB, posix: { sep: "/" }, resolve: eF, sep: "/" };
      }), eQ = d((e10, t10) => {
        t10.exports = { name: "@prisma/engines-version", version: "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "c2990dca591cba766e3b7ef5d9e8a84796e47ab7" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
      }), eX = d((e10) => {
        D(), $(), L(), j(), q(), ew(), Object.defineProperty(e10, "__esModule", { value: true }), e10.enginesVersion = void 0, e10.enginesVersion = eQ().prisma.enginesVersion;
      }), eY = d((e10, t10) => {
        D(), $(), L(), j(), q(), ew(), t10.exports = (e11, t11 = 1, r10) => {
          if (r10 = { indent: " ", includeEmptyLines: false, ...r10 }, "string" != typeof e11) throw TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof e11}\``);
          if ("number" != typeof t11) throw TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof t11}\``);
          if ("string" != typeof r10.indent) throw TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r10.indent}\``);
          if (0 === t11) return e11;
          let n10 = r10.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
          return e11.replace(n10, r10.indent.repeat(t11));
        };
      }), eZ = d((e10, t10) => {
        D(), $(), L(), j(), q(), ew(), t10.exports = /* @__PURE__ */ (function() {
          function e11(e12, t11, r10, n10, i10) {
            return e12 < t11 || r10 < t11 ? e12 > r10 ? r10 + 1 : e12 + 1 : n10 === i10 ? t11 : t11 + 1;
          }
          return function(t11, r10) {
            if (t11 === r10) return 0;
            if (t11.length > r10.length) {
              var n10 = t11;
              t11 = r10, r10 = n10;
            }
            for (var i10 = t11.length, a2 = r10.length; i10 > 0 && t11.charCodeAt(i10 - 1) === r10.charCodeAt(a2 - 1); ) i10--, a2--;
            for (var o2 = 0; o2 < i10 && t11.charCodeAt(o2) === r10.charCodeAt(o2); ) o2++;
            if (i10 -= o2, a2 -= o2, 0 === i10 || a2 < 3) return a2;
            var s2, l2, c2, u2, d2, h2, p2, f2, g2, m2, y2, b2, v2 = 0, w2 = [];
            for (s2 = 0; s2 < i10; s2++) w2.push(s2 + 1), w2.push(t11.charCodeAt(o2 + s2));
            for (var _2 = w2.length - 1; v2 < a2 - 3; ) for (g2 = r10.charCodeAt(o2 + (l2 = v2)), m2 = r10.charCodeAt(o2 + (c2 = v2 + 1)), y2 = r10.charCodeAt(o2 + (u2 = v2 + 2)), b2 = r10.charCodeAt(o2 + (d2 = v2 + 3)), h2 = v2 += 4, s2 = 0; s2 < _2; s2 += 2) l2 = e11(p2 = w2[s2], l2, c2, g2, f2 = w2[s2 + 1]), c2 = e11(l2, c2, u2, m2, f2), u2 = e11(c2, u2, d2, y2, f2), h2 = e11(u2, d2, h2, b2, f2), w2[s2] = h2, d2 = u2, u2 = c2, c2 = l2, l2 = p2;
            for (; v2 < a2; ) for (g2 = r10.charCodeAt(o2 + (l2 = v2)), h2 = ++v2, s2 = 0; s2 < _2; s2 += 2) p2 = w2[s2], w2[s2] = h2 = e11(p2, l2, h2, g2, w2[s2 + 1]), l2 = p2;
            return h2;
          };
        })();
      }), e0 = u(() => {
        D(), $(), L(), j(), q(), ew();
      }), e1 = u(() => {
        D(), $(), L(), j(), q(), ew();
      }), e2 = u(() => {
        D(), $(), L(), j(), q(), ew(), ez = class {
          events = {};
          on(e10, t10) {
            return this.events[e10] || (this.events[e10] = []), this.events[e10].push(t10), this;
          }
          emit(e10, ...t10) {
            return !!this.events[e10] && (this.events[e10].forEach((e11) => {
              e11(...t10);
            }), true);
          }
        };
      }), e4 = {};
      h(e4, { DMMF: () => t9, Debug: () => t_, Decimal: () => eb, Extensions: () => e3, MetricsClient: () => r8, PrismaClientInitializationError: () => tK, PrismaClientKnownRequestError: () => tQ, PrismaClientRustPanicError: () => tX, PrismaClientUnknownRequestError: () => tY, PrismaClientValidationError: () => tZ, Public: () => e8, Sql: () => na, createParam: () => rK, defineDmmfProperty: () => r9, deserializeJsonResponse: () => nH, deserializeRawResult: () => i3, dmmfToRuntimeDataModel: () => t4, empty: () => nl, getPrismaClient: () => au, getRuntime: () => nY, join: () => no, makeStrictEnum: () => ap, makeTypedQueryFactory: () => nr, objectEnumValues: () => r$, raw: () => ns, serializeJsonQuery: () => r2, skip: () => rY, sqltag: () => nc, warnEnvConflicts: () => void 0, warnOnce: () => tz }), t.exports = p(a({}, "__esModule", { value: true }), e4), D(), $(), L(), j(), q(), ew();
      var e3 = {};
      function e6(e10) {
        return "function" == typeof e10 ? e10 : (t10) => t10.$extends(e10);
      }
      function e5(e10) {
        return e10;
      }
      h(e3, { defineExtension: () => e6, getExtensionContext: () => e5 }), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var e8 = {};
      function e9() {
        return (e10) => e10;
      }
      h(e8, { validator: () => e9 }), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var e7, te, tt, tr, tn = true;
      "u" > typeof k && ({ FORCE_COLOR: e7, NODE_DISABLE_COLORS: te, NO_COLOR: tt, TERM: tr } = k.env || {}, tn = k.stdout && k.stdout.isTTY);
      var ti = { enabled: !te && null == tt && "dumb" !== tr && (null != e7 && "0" !== e7 || tn) };
      function ta(e10, t10) {
        let r10 = RegExp(`\\x1b\\[${t10}m`, "g"), n10 = `\x1B[${e10}m`, i10 = `\x1B[${t10}m`;
        return function(e11) {
          return ti.enabled && null != e11 ? n10 + (~("" + e11).indexOf(i10) ? e11.replace(r10, i10 + n10) : e11) + i10 : e11;
        };
      }
      ta(0, 0);
      var to = ta(1, 22), ts = ta(2, 22), tl = (ta(3, 23), ta(4, 24)), tc = (ta(7, 27), ta(8, 28), ta(9, 29), ta(30, 39), ta(31, 39)), tu = ta(32, 39), td = ta(33, 39), th = ta(34, 39), tp = (ta(35, 39), ta(36, 39)), tf = (ta(37, 39), ta(90, 39));
      ta(90, 39), ta(40, 49), ta(41, 49), ta(42, 49), ta(43, 49), ta(44, 49), ta(45, 49), ta(46, 49), ta(47, 49), D(), $(), L(), j(), q(), ew();
      var tg = ["green", "yellow", "blue", "magenta", "cyan", "red"], tm = [], ty = Date.now(), tb = 0, tv = "u" > typeof k ? k.env : {};
      globalThis.DEBUG ??= tv.DEBUG ?? "", globalThis.DEBUG_COLORS ??= !tv.DEBUG_COLORS || "true" === tv.DEBUG_COLORS;
      var tw = { enable(e10) {
        "string" == typeof e10 && (globalThis.DEBUG = e10);
      }, disable() {
        let e10 = globalThis.DEBUG;
        return globalThis.DEBUG = "", e10;
      }, enabled(e10) {
        let t10 = globalThis.DEBUG.split(",").map((e11) => e11.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r10 = t10.some((t11) => "" !== t11 && "-" !== t11[0] && e10.match(RegExp(t11.split("*").join(".*") + "$"))), n10 = t10.some((t11) => "" !== t11 && "-" === t11[0] && e10.match(RegExp(t11.slice(1).split("*").join(".*") + "$")));
        return r10 && !n10;
      }, log: (...e10) => {
        let [t10, r10, ...n10] = e10;
        (console.warn ?? console.log)(`${t10} ${r10}`, ...n10);
      }, formatters: {} }, t_ = new Proxy(function(e10) {
        let t10 = { color: tg[tb++ % tg.length], enabled: tw.enabled(e10), namespace: e10, log: tw.log, extend: () => {
        } };
        return new Proxy((...e11) => {
          let { enabled: r10, namespace: n10, color: i10, log: a2 } = t10;
          if (0 !== e11.length && tm.push([n10, ...e11]), tm.length > 100 && tm.shift(), tw.enabled(n10) || r10) {
            let t11 = e11.map((e12) => "string" == typeof e12 ? e12 : (function(e13, t12 = 2) {
              let r12 = /* @__PURE__ */ new Set();
              return JSON.stringify(e13, (e14, t13) => {
                if ("object" == typeof t13 && null !== t13) {
                  if (r12.has(t13)) return "[Circular *]";
                  r12.add(t13);
                } else if ("bigint" == typeof t13) return t13.toString();
                return t13;
              }, t12);
            })(e12)), r11 = `+${Date.now() - ty}ms`;
            ty = Date.now(), a2(n10, ...t11, r11);
          }
        }, { get: (e11, r10) => t10[r10], set: (e11, r10, n10) => t10[r10] = n10 });
      }, { get: (e10, t10) => tw[t10], set: (e10, t10, r10) => tw[t10] = r10 });
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var tE = eU().version;
      function tS(e10) {
        let t10;
        return ("library" === (t10 = k.env.PRISMA_CLIENT_ENGINE_TYPE) ? "library" : "binary" === t10 ? "binary" : "client" === t10 ? "client" : void 0) || (e10?.config.engineType === "library" ? "library" : e10?.config.engineType === "binary" ? "binary" : e10?.config.engineType === "client" ? "client" : "library");
      }
      function tx(e10) {
        return "DriverAdapterError" === e10.name && "object" == typeof e10.cause;
      }
      function tP(e10) {
        return { ok: true, value: e10, map: (t10) => tP(t10(e10)), flatMap: (t10) => t10(e10) };
      }
      function tT(e10) {
        return { ok: false, error: e10, map: () => tT(e10), flatMap: () => tT(e10) };
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var tA = t_("driver-adapter-utils"), tR = class {
        registeredErrors = [];
        consumeError(e10) {
          return this.registeredErrors[e10];
        }
        registerNewError(e10) {
          let t10 = 0;
          for (; void 0 !== this.registeredErrors[t10]; ) t10++;
          return this.registeredErrors[t10] = { error: e10 }, t10;
        }
      }, tC = (e10, t10 = new tR()) => {
        var r10, n10;
        let i10 = { adapterName: e10.adapterName, errorRegistry: t10, queryRaw: tk(t10, e10.queryRaw.bind(e10)), executeRaw: tk(t10, e10.executeRaw.bind(e10)), executeScript: tk(t10, e10.executeScript.bind(e10)), dispose: tk(t10, e10.dispose.bind(e10)), provider: e10.provider, startTransaction: async (...r11) => (await tk(t10, e10.startTransaction.bind(e10))(...r11)).map((e11) => tO(t10, e11)) };
        return e10.getConnectionInfo && (r10 = t10, n10 = e10.getConnectionInfo.bind(e10), i10.getConnectionInfo = (...e11) => {
          try {
            return tP(n10(...e11));
          } catch (e12) {
            if (tA("[error@wrapSync]", e12), tx(e12)) return tT(e12.cause);
            return tT({ kind: "GenericJs", id: r10.registerNewError(e12) });
          }
        }), i10;
      }, tO = (e10, t10) => ({ adapterName: t10.adapterName, provider: t10.provider, options: t10.options, queryRaw: tk(e10, t10.queryRaw.bind(t10)), executeRaw: tk(e10, t10.executeRaw.bind(t10)), commit: tk(e10, t10.commit.bind(t10)), rollback: tk(e10, t10.rollback.bind(t10)) });
      function tk(e10, t10) {
        return async (...r10) => {
          try {
            return tP(await t10(...r10));
          } catch (t11) {
            if (tA("[error@wrapAsync]", t11), tx(t11)) return tT(t11.cause);
            return tT({ kind: "GenericJs", id: e10.registerNewError(t11) });
          }
        };
      }
      D(), $(), L(), j(), q(), ew();
      var tN = "prisma+postgres:";
      function tI(e10) {
        return e10?.toString().startsWith(`${tN}//`) ?? false;
      }
      var tM = {};
      h(tM, { error: () => tU, info: () => tq, log: () => tL, query: () => tF, should: () => t$, tags: () => tD, warn: () => tj }), D(), $(), L(), j(), q(), ew();
      var tD = { error: tc("prisma:error"), warn: td("prisma:warn"), info: tp("prisma:info"), query: th("prisma:query") }, t$ = { warn: () => !k.env.PRISMA_DISABLE_WARNINGS };
      function tL(...e10) {
        console.log(...e10);
      }
      function tj(e10, ...t10) {
        t$.warn() && console.warn(`${tD.warn} ${e10}`, ...t10);
      }
      function tq(e10, ...t10) {
        console.info(`${tD.info} ${e10}`, ...t10);
      }
      function tU(e10, ...t10) {
        console.error(`${tD.error} ${e10}`, ...t10);
      }
      function tF(e10, ...t10) {
        console.log(`${tD.query} ${e10}`, ...t10);
      }
      function tV(e10, t10) {
        if (!e10) throw Error(`${t10}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
      }
      function tB(e10, t10) {
        throw Error(t10);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var tH = (function({ onlyFirst: e10 = false } = {}) {
        return RegExp("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?(?:\\u0007|\\u001B\\u005C|\\u009C))|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))", e10 ? void 0 : "g");
      })();
      function tG(e10, t10) {
        let r10 = {};
        for (let n10 of Object.keys(e10)) r10[n10] = t10(e10[n10], n10);
        return r10;
      }
      function tW(e10, t10) {
        Object.defineProperty(e10, "name", { value: t10, configurable: true });
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var tJ = /* @__PURE__ */ new Set(), tz = (e10, t10, ...r10) => {
        tJ.has(e10) || (tJ.add(e10), tj(t10, ...r10));
      }, tK = class e10 extends Error {
        clientVersion;
        errorCode;
        retryable;
        constructor(t10, r10, n10) {
          super(t10), this.name = "PrismaClientInitializationError", this.clientVersion = r10, this.errorCode = n10, Error.captureStackTrace(e10);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientInitializationError";
        }
      };
      tW(tK, "PrismaClientInitializationError"), D(), $(), L(), j(), q(), ew();
      var tQ = class extends Error {
        code;
        meta;
        clientVersion;
        batchRequestIdx;
        constructor(e10, { code: t10, clientVersion: r10, meta: n10, batchRequestIdx: i10 }) {
          super(e10), this.name = "PrismaClientKnownRequestError", this.code = t10, this.clientVersion = r10, this.meta = n10, Object.defineProperty(this, "batchRequestIdx", { value: i10, enumerable: false, writable: true });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientKnownRequestError";
        }
      };
      tW(tQ, "PrismaClientKnownRequestError"), D(), $(), L(), j(), q(), ew();
      var tX = class extends Error {
        clientVersion;
        constructor(e10, t10) {
          super(e10), this.name = "PrismaClientRustPanicError", this.clientVersion = t10;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientRustPanicError";
        }
      };
      tW(tX, "PrismaClientRustPanicError"), D(), $(), L(), j(), q(), ew();
      var tY = class extends Error {
        clientVersion;
        batchRequestIdx;
        constructor(e10, { clientVersion: t10, batchRequestIdx: r10 }) {
          super(e10), this.name = "PrismaClientUnknownRequestError", this.clientVersion = t10, Object.defineProperty(this, "batchRequestIdx", { value: r10, writable: true, enumerable: false });
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientUnknownRequestError";
        }
      };
      tW(tY, "PrismaClientUnknownRequestError"), D(), $(), L(), j(), q(), ew();
      var tZ = class extends Error {
        name = "PrismaClientValidationError";
        clientVersion;
        constructor(e10, { clientVersion: t10 }) {
          super(e10), this.clientVersion = t10;
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientValidationError";
        }
      };
      tW(tZ, "PrismaClientValidationError"), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var t0 = class {
        _map = /* @__PURE__ */ new Map();
        get(e10) {
          return this._map.get(e10)?.value;
        }
        set(e10, t10) {
          this._map.set(e10, { value: t10 });
        }
        getOrCreate(e10, t10) {
          let r10 = this._map.get(e10);
          if (r10) return r10.value;
          let n10 = t10();
          return this.set(e10, n10), n10;
        }
      };
      function t1(e10) {
        return e10.substring(0, 1).toLowerCase() + e10.substring(1);
      }
      function t2(e10) {
        let t10;
        return { get: () => (t10 || (t10 = { value: e10() }), t10.value) };
      }
      function t4(e10) {
        return { models: t3(e10.models), enums: t3(e10.enums), types: t3(e10.types) };
      }
      function t3(e10) {
        let t10 = {};
        for (let { name: r10, ...n10 } of e10) t10[r10] = n10;
        return t10;
      }
      function t6(e10) {
        return e10 instanceof Date || "[object Date]" === Object.prototype.toString.call(e10);
      }
      function t5(e10) {
        return "Invalid Date" !== e10.toString();
      }
      function t8(e10) {
        return !!ey.isDecimal(e10) || null !== e10 && "object" == typeof e10 && "number" == typeof e10.s && "number" == typeof e10.e && "function" == typeof e10.toFixed && Array.isArray(e10.d);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var t9 = {};
      function t7(e10) {
        return { name: e10.name, values: e10.values.map((e11) => e11.name) };
      }
      h(t9, { ModelAction: () => re, datamodelEnumToSchemaEnum: () => t7 }), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var re = ((n = re || {}).findUnique = "findUnique", n.findUniqueOrThrow = "findUniqueOrThrow", n.findFirst = "findFirst", n.findFirstOrThrow = "findFirstOrThrow", n.findMany = "findMany", n.create = "create", n.createMany = "createMany", n.createManyAndReturn = "createManyAndReturn", n.update = "update", n.updateMany = "updateMany", n.updateManyAndReturn = "updateManyAndReturn", n.upsert = "upsert", n.delete = "delete", n.deleteMany = "deleteMany", n.groupBy = "groupBy", n.count = "count", n.aggregate = "aggregate", n.findRaw = "findRaw", n.aggregateRaw = "aggregateRaw", n);
      f(eY());
      var rt = { red: tc, gray: tf, dim: ts, bold: to, underline: tl, highlightSource: (e10) => e10.highlight() }, rr = { red: (e10) => e10, gray: (e10) => e10, dim: (e10) => e10, bold: (e10) => e10, underline: (e10) => e10, highlightSource: (e10) => e10 };
      function rn(e10) {
        let t10 = e10.showColors ? rt : rr;
        return (function({ functionName: e11, location: t11, message: r10, isPanic: n10, contextLines: i10, callArguments: a2 }, o2) {
          var s2;
          let l2, c2 = [""], u2 = t11 ? " in" : ":";
          if (n10 ? (c2.push(o2.red(`Oops, an unknown error occurred! This is ${o2.bold("on us")}, you did nothing wrong.`)), c2.push(o2.red(`It occurred in the ${o2.bold(`\`${e11}\``)} invocation${u2}`))) : c2.push(o2.red(`Invalid ${o2.bold(`\`${e11}\``)} invocation${u2}`)), t11 && c2.push(o2.underline((l2 = [(s2 = t11).fileName], s2.lineNumber && l2.push(String(s2.lineNumber)), s2.columnNumber && l2.push(String(s2.columnNumber)), l2.join(":")))), i10) {
            c2.push("");
            let e12 = [i10.toString()];
            a2 && (e12.push(a2), e12.push(o2.dim(")"))), c2.push(e12.join("")), a2 && c2.push("");
          } else c2.push(""), a2 && c2.push(a2), c2.push("");
          return c2.push(r10), c2.join(`
`);
        })("u" > typeof $getTemplateParameters ? $getTemplateParameters(e10, t10) : (function({ message: e11, originalMethod: t11, isPanic: r10, callArguments: n10 }) {
          return { functionName: `prisma.${t11}()`, message: e11, isPanic: r10 ?? false, callArguments: n10 };
        })(e10), t10);
      }
      D(), $(), L(), j(), q(), ew();
      var ri = f(eZ());
      function ra(e10) {
        let t10 = 0;
        return Array.isArray(e10.selectionPath) && (t10 += e10.selectionPath.length), Array.isArray(e10.argumentPath) && (t10 += e10.argumentPath.length), t10;
      }
      function ro(e10) {
        switch (e10.kind) {
          case "InvalidArgumentValue":
          case "ValueTooLarge":
            return 20;
          case "InvalidArgumentType":
            return 10;
          case "RequiredArgumentMissing":
            return -10;
          default:
            return 0;
        }
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var rs = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        isRequired = false;
        makeRequired() {
          return this.isRequired = true, this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.addMarginSymbol(t10(this.isRequired ? "+" : "?")), e10.write(t10(this.name)), this.isRequired || e10.write(t10("?")), e10.write(t10(": ")), "string" == typeof this.value ? e10.write(t10(this.value)) : e10.write(this.value);
        }
      };
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), e1(), D(), $(), L(), j(), q(), ew();
      var rl = class {
        constructor(e10 = 0, t10) {
          this.context = t10, this.currentIndent = e10;
        }
        lines = [];
        currentLine = "";
        currentIndent = 0;
        marginSymbol;
        afterNextNewLineCallback;
        write(e10) {
          return "string" == typeof e10 ? this.currentLine += e10 : e10.write(this), this;
        }
        writeJoined(e10, t10, r10 = (e11, t11) => t11.write(e11)) {
          let n10 = t10.length - 1;
          for (let i10 = 0; i10 < t10.length; i10++) r10(t10[i10], this), i10 !== n10 && this.write(e10);
          return this;
        }
        writeLine(e10) {
          return this.write(e10).newLine();
        }
        newLine() {
          this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
          let e10 = this.afterNextNewLineCallback;
          return this.afterNextNewLineCallback = void 0, e10?.(), this;
        }
        withIndent(e10) {
          return this.indent(), e10(this), this.unindent(), this;
        }
        afterNextNewline(e10) {
          return this.afterNextNewLineCallback = e10, this;
        }
        indent() {
          return this.currentIndent++, this;
        }
        unindent() {
          return this.currentIndent > 0 && this.currentIndent--, this;
        }
        addMarginSymbol(e10) {
          return this.marginSymbol = e10, this;
        }
        toString() {
          return this.lines.concat(this.indentedCurrentLine()).join(`
`);
        }
        getCurrentLineLength() {
          return this.currentLine.length;
        }
        indentedCurrentLine() {
          let e10 = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
          return this.marginSymbol ? this.marginSymbol + e10.slice(1) : e10;
        }
      };
      e0(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var rc = class {
        constructor(e10) {
          this.value = e10;
        }
        write(e10) {
          e10.write(this.value);
        }
        markAsError() {
          this.value.markAsError();
        }
      };
      D(), $(), L(), j(), q(), ew();
      var ru = (e10) => e10, rd = { bold: ru, red: ru, green: ru, dim: ru, enabled: false }, rh = { bold: to, red: tc, green: tu, dim: ts, enabled: true }, rp = { write(e10) {
        e10.writeLine(",");
      } };
      D(), $(), L(), j(), q(), ew();
      var rf = class {
        constructor(e10) {
          this.contents = e10;
        }
        isUnderlined = false;
        color = (e10) => e10;
        underline() {
          return this.isUnderlined = true, this;
        }
        setColor(e10) {
          return this.color = e10, this;
        }
        write(e10) {
          let t10 = e10.getCurrentLineLength();
          e10.write(this.color(this.contents)), this.isUnderlined && e10.afterNextNewline(() => {
            e10.write(" ".repeat(t10)).writeLine(this.color("~".repeat(this.contents.length)));
          });
        }
      };
      D(), $(), L(), j(), q(), ew();
      var rg = class {
        hasError = false;
        markAsError() {
          return this.hasError = true, this;
        }
      }, rm = class extends rg {
        items = [];
        addItem(e10) {
          return this.items.push(new rc(e10)), this;
        }
        getField(e10) {
          return this.items[e10];
        }
        getPrintWidth() {
          return 0 === this.items.length ? 2 : Math.max(...this.items.map((e10) => e10.value.getPrintWidth())) + 2;
        }
        write(e10) {
          0 === this.items.length ? this.writeEmpty(e10) : this.writeWithItems(e10);
        }
        writeEmpty(e10) {
          let t10 = new rf("[]");
          this.hasError && t10.setColor(e10.context.colors.red).underline(), e10.write(t10);
        }
        writeWithItems(e10) {
          let { colors: t10 } = e10.context;
          e10.writeLine("[").withIndent(() => e10.writeJoined(rp, this.items).newLine()).write("]"), this.hasError && e10.afterNextNewline(() => {
            e10.writeLine(t10.red("~".repeat(this.getPrintWidth())));
          });
        }
        asObject() {
        }
      }, ry = class e10 extends rg {
        fields = {};
        suggestions = [];
        addField(e11) {
          this.fields[e11.name] = e11;
        }
        addSuggestion(e11) {
          this.suggestions.push(e11);
        }
        getField(e11) {
          return this.fields[e11];
        }
        getDeepField(t10) {
          let [r10, ...n10] = t10, i10 = this.getField(r10);
          if (!i10) return;
          let a2 = i10;
          for (let t11 of n10) {
            let r11;
            if (a2.value instanceof e10 ? r11 = a2.value.getField(t11) : a2.value instanceof rm && (r11 = a2.value.getField(Number(t11))), !r11) return;
            a2 = r11;
          }
          return a2;
        }
        getDeepFieldValue(e11) {
          return 0 === e11.length ? this : this.getDeepField(e11)?.value;
        }
        hasField(e11) {
          return !!this.getField(e11);
        }
        removeAllFields() {
          this.fields = {};
        }
        removeField(e11) {
          delete this.fields[e11];
        }
        getFields() {
          return this.fields;
        }
        isEmpty() {
          return 0 === Object.keys(this.fields).length;
        }
        getFieldValue(e11) {
          return this.getField(e11)?.value;
        }
        getDeepSubSelectionValue(t10) {
          let r10 = this;
          for (let n10 of t10) {
            if (!(r10 instanceof e10)) return;
            let t11 = r10.getSubSelectionValue(n10);
            if (!t11) return;
            r10 = t11;
          }
          return r10;
        }
        getDeepSelectionParent(t10) {
          let r10 = this.getSelectionParent();
          if (!r10) return;
          let n10 = r10;
          for (let r11 of t10) {
            let t11 = n10.value.getFieldValue(r11);
            if (!t11 || !(t11 instanceof e10)) return;
            let i10 = t11.getSelectionParent();
            if (!i10) return;
            n10 = i10;
          }
          return n10;
        }
        getSelectionParent() {
          let e11 = this.getField("select")?.value.asObject();
          if (e11) return { kind: "select", value: e11 };
          let t10 = this.getField("include")?.value.asObject();
          if (t10) return { kind: "include", value: t10 };
        }
        getSubSelectionValue(e11) {
          return this.getSelectionParent()?.value.fields[e11].value;
        }
        getPrintWidth() {
          let e11 = Object.values(this.fields);
          return 0 == e11.length ? 2 : Math.max(...e11.map((e12) => e12.getPrintWidth())) + 2;
        }
        write(e11) {
          let t10 = Object.values(this.fields);
          0 === t10.length && 0 === this.suggestions.length ? this.writeEmpty(e11) : this.writeWithContents(e11, t10);
        }
        asObject() {
          return this;
        }
        writeEmpty(e11) {
          let t10 = new rf("{}");
          this.hasError && t10.setColor(e11.context.colors.red).underline(), e11.write(t10);
        }
        writeWithContents(e11, t10) {
          e11.writeLine("{").withIndent(() => {
            e11.writeJoined(rp, [...t10, ...this.suggestions]).newLine();
          }), e11.write("}"), this.hasError && e11.afterNextNewline(() => {
            e11.writeLine(e11.context.colors.red("~".repeat(this.getPrintWidth())));
          });
        }
      };
      D(), $(), L(), j(), q(), ew();
      var rb = class extends rg {
        constructor(e10) {
          super(), this.text = e10;
        }
        getPrintWidth() {
          return this.text.length;
        }
        write(e10) {
          let t10 = new rf(this.text);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10);
        }
        asObject() {
        }
      };
      D(), $(), L(), j(), q(), ew();
      var rv = class {
        fields = [];
        addField(e10, t10) {
          return this.fields.push({ write(r10) {
            let { green: n10, dim: i10 } = r10.context.colors;
            r10.write(n10(i10(`${e10}: ${t10}`))).addMarginSymbol(n10(i10("+")));
          } }), this;
        }
        write(e10) {
          let { colors: { green: t10 } } = e10.context;
          e10.writeLine(t10("{")).withIndent(() => {
            e10.writeJoined(rp, this.fields).newLine();
          }).write(t10("}")).addMarginSymbol(t10("+"));
        }
      };
      function rw(e10, t10, r10) {
        let n10 = [`Unknown argument \`${e10.red(t10)}\`.`], i10 = (function(e11, t11) {
          let r11 = 1 / 0, n11;
          for (let i11 of t11) {
            let t12 = (0, ri.default)(e11, i11);
            t12 > 3 || t12 < r11 && (r11 = t12, n11 = i11);
          }
          return n11;
        })(t10, r10);
        return i10 && n10.push(`Did you mean \`${e10.green(i10)}\`?`), r10.length > 0 && n10.push(rP(e10)), n10.join(" ");
      }
      function r_(e10, t10) {
        for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new rs(r10.name, "true"));
      }
      function rE(e10, t10) {
        let [r10, n10] = rx(e10), i10 = t10.arguments.getDeepSubSelectionValue(r10)?.asObject();
        if (!i10) return { parentKind: "unknown", fieldName: n10 };
        let a2 = i10.getFieldValue("select")?.asObject(), o2 = i10.getFieldValue("include")?.asObject(), s2 = i10.getFieldValue("omit")?.asObject(), l2 = a2?.getField(n10);
        return a2 && l2 ? { parentKind: "select", parent: a2, field: l2, fieldName: n10 } : (l2 = o2?.getField(n10), o2 && l2 ? { parentKind: "include", field: l2, parent: o2, fieldName: n10 } : (l2 = s2?.getField(n10), s2 && l2 ? { parentKind: "omit", field: l2, parent: s2, fieldName: n10 } : { parentKind: "unknown", fieldName: n10 }));
      }
      function rS(e10, t10) {
        if ("object" === t10.kind) for (let r10 of t10.fields) e10.hasField(r10.name) || e10.addSuggestion(new rs(r10.name, r10.typeNames.join(" | ")));
      }
      function rx(e10) {
        let t10 = [...e10], r10 = t10.pop();
        if (!r10) throw Error("unexpected empty path");
        return [t10, r10];
      }
      function rP({ green: e10, enabled: t10 }) {
        return "Available options are " + (t10 ? `listed in ${e10("green")}` : "marked with ?") + ".";
      }
      function rT(e10, t10) {
        if (1 === t10.length) return t10[0];
        let r10 = [...t10], n10 = r10.pop();
        return `${r10.join(", ")} ${e10} ${n10}`;
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var rA = class {
        modelName;
        name;
        typeName;
        isList;
        isEnum;
        constructor(e10, t10, r10, n10, i10) {
          this.modelName = e10, this.name = t10, this.typeName = r10, this.isList = n10, this.isEnum = i10;
        }
        _toGraphQLInputType() {
          let e10 = this.isList ? "List" : "", t10 = this.isEnum ? "Enum" : "";
          return `${e10}${t10}${this.typeName}FieldRefInput<${this.modelName}>`;
        }
      };
      function rR(e10) {
        return e10 instanceof rA;
      }
      D(), $(), L(), j(), q(), ew();
      var rC = /* @__PURE__ */ Symbol(), rO = /* @__PURE__ */ new WeakMap(), rk = class {
        constructor(e10) {
          e10 === rC ? rO.set(this, `Prisma.${this._getName()}`) : rO.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
        }
        _getName() {
          return this.constructor.name;
        }
        toString() {
          return rO.get(this);
        }
      }, rN = class extends rk {
        _getNamespace() {
          return "NullTypes";
        }
      }, rI = class extends rN {
        #e;
      };
      rL(rI, "DbNull");
      var rM = class extends rN {
        #e;
      };
      rL(rM, "JsonNull");
      var rD = class extends rN {
        #e;
      };
      rL(rD, "AnyNull");
      var r$ = { classes: { DbNull: rI, JsonNull: rM, AnyNull: rD }, instances: { DbNull: new rI(rC), JsonNull: new rM(rC), AnyNull: new rD(rC) } };
      function rL(e10, t10) {
        Object.defineProperty(e10, "name", { value: t10, configurable: true });
      }
      D(), $(), L(), j(), q(), ew();
      var rj = class {
        constructor(e10, t10) {
          this.name = e10, this.value = t10;
        }
        hasError = false;
        markAsError() {
          this.hasError = true;
        }
        getPrintWidth() {
          return this.name.length + this.value.getPrintWidth() + 2;
        }
        write(e10) {
          let t10 = new rf(this.name);
          this.hasError && t10.underline().setColor(e10.context.colors.red), e10.write(t10).write(": ").write(this.value);
        }
      }, rq = class {
        arguments;
        errorMessages = [];
        constructor(e10) {
          this.arguments = e10;
        }
        write(e10) {
          e10.write(this.arguments);
        }
        addErrorMessage(e10) {
          this.errorMessages.push(e10);
        }
        renderAllMessages(e10) {
          return this.errorMessages.map((t10) => t10(e10)).join(`
`);
        }
      };
      function rU(e10) {
        return new rq(rF(e10));
      }
      function rF(e10) {
        let t10 = new ry();
        for (let [r10, n10] of Object.entries(e10)) {
          let e11 = new rj(r10, (function e12(t11) {
            if ("string" == typeof t11) return new rb(JSON.stringify(t11));
            if ("number" == typeof t11 || "boolean" == typeof t11) return new rb(String(t11));
            if ("bigint" == typeof t11) return new rb(`${t11}n`);
            if (null === t11) return new rb("null");
            if (void 0 === t11) return new rb("undefined");
            if (t8(t11)) return new rb(`new Prisma.Decimal("${t11.toFixed()}")`);
            if (t11 instanceof Uint8Array) return new rb(C.isBuffer(t11) ? `Buffer.alloc(${t11.byteLength})` : `new Uint8Array(${t11.byteLength})`);
            if (t11 instanceof Date) {
              let e13 = t5(t11) ? t11.toISOString() : "Invalid Date";
              return new rb(`new Date("${e13}")`);
            }
            return t11 instanceof rk ? new rb(`Prisma.${t11._getName()}`) : rR(t11) ? new rb(`prisma.${t1(t11.modelName)}.$fields.${t11.name}`) : Array.isArray(t11) ? (function(t12) {
              let r11 = new rm();
              for (let n11 of t12) r11.addItem(e12(n11));
              return r11;
            })(t11) : "object" == typeof t11 ? rF(t11) : new rb(Object.prototype.toString.call(t11));
          })(n10));
          t10.addField(e11);
        }
        return t10;
      }
      function rV(e10, t10) {
        let r10 = "pretty" === t10 ? rh : rd;
        return { message: e10.renderAllMessages(r10), args: new rl(0, { colors: r10 }).write(e10).toString() };
      }
      function rB({ args: e10, errors: t10, errorFormat: r10, callsite: n10, originalMethod: i10, clientVersion: a2, globalOmit: o2 }) {
        let s2 = rU(e10);
        for (let e11 of t10) !(function e12(t11, r11, n11) {
          switch (t11.kind) {
            case "MutuallyExclusiveFields":
              let i11;
              h2 = t11, p2 = r11, (i11 = p2.arguments.getDeepSubSelectionValue(h2.selectionPath)?.asObject()) && (i11.getField(h2.firstField)?.markAsError(), i11.getField(h2.secondField)?.markAsError()), p2.addErrorMessage((e13) => `Please ${e13.bold("either")} use ${e13.green(`\`${h2.firstField}\``)} or ${e13.green(`\`${h2.secondField}\``)}, but ${e13.red("not both")} at the same time.`);
              break;
            case "IncludeOnScalar":
              !(function(e13, t12) {
                let [r12, n12] = rx(e13.selectionPath), i12 = e13.outputType, a4 = t12.arguments.getDeepSelectionParent(r12)?.value;
                if (a4 && (a4.getField(n12)?.markAsError(), i12)) for (let e14 of i12.fields) e14.isRelation && a4.addSuggestion(new rs(e14.name, "true"));
                t12.addErrorMessage((e14) => {
                  let t13 = `Invalid scalar field ${e14.red(`\`${n12}\``)} for ${e14.bold("include")} statement`;
                  return i12 ? t13 += ` on model ${e14.bold(i12.name)}. ${rP(e14)}` : t13 += ".", t13 += `
Note that ${e14.bold("include")} statements only accept relation fields.`;
                });
              })(t11, r11);
              break;
            case "EmptySelection":
              !(function(e13, t12, r12) {
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (n12) {
                  let r13 = n12.getField("omit")?.value.asObject();
                  if (r13) {
                    var i12, a4, o4 = e13, s4 = t12, l4 = r13;
                    for (let e14 of (l4.removeAllFields(), o4.outputType.fields)) l4.addSuggestion(new rs(e14.name, "false"));
                    s4.addErrorMessage((e14) => `The ${e14.red("omit")} statement includes every field of the model ${e14.bold(o4.outputType.name)}. At least one field must be included in the result`);
                    return;
                  }
                  if (n12.hasField("select")) {
                    let r14, n13, o5;
                    return i12 = e13, a4 = t12, r14 = i12.outputType, n13 = a4.arguments.getDeepSelectionParent(i12.selectionPath)?.value, o5 = n13?.isEmpty() ?? false, n13 && (n13.removeAllFields(), r_(n13, r14)), a4.addErrorMessage((e14) => o5 ? `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} must not be empty. ${rP(e14)}` : `The ${e14.red("`select`")} statement for type ${e14.bold(r14.name)} needs ${e14.bold("at least one truthy value")}.`);
                  }
                }
                r12?.[t1(e13.outputType.name)] ? (function(e14, t13) {
                  let r13 = new rv();
                  for (let t14 of e14.outputType.fields) t14.isRelation || r13.addField(t14.name, "false");
                  let n13 = new rs("omit", r13).makeRequired();
                  if (0 === e14.selectionPath.length) t13.arguments.addSuggestion(n13);
                  else {
                    let [r14, i13] = rx(e14.selectionPath), a5 = t13.arguments.getDeepSelectionParent(r14)?.value.asObject()?.getField(i13);
                    if (a5) {
                      let e15 = a5?.value.asObject() ?? new ry();
                      e15.addSuggestion(n13), a5.value = e15;
                    }
                  }
                  t13.addErrorMessage((t14) => `The global ${t14.red("omit")} configuration excludes every field of the model ${t14.bold(e14.outputType.name)}. At least one field must be included in the result`);
                })(e13, t12) : t12.addErrorMessage(() => `Unknown field at "${e13.selectionPath.join(".")} selection"`);
              })(t11, r11, n11);
              break;
            case "UnknownSelectionField":
              !(function(e13, t12) {
                let r12 = rE(e13.selectionPath, t12);
                if ("unknown" !== r12.parentKind) {
                  r12.field.markAsError();
                  let t13 = r12.parent;
                  switch (r12.parentKind) {
                    case "select":
                      r_(t13, e13.outputType);
                      break;
                    case "include":
                      var n12 = t13, i12 = e13.outputType;
                      for (let e14 of i12.fields) e14.isRelation && !n12.hasField(e14.name) && n12.addSuggestion(new rs(e14.name, "true"));
                      break;
                    case "omit":
                      var a4 = t13, o4 = e13.outputType;
                      for (let e14 of o4.fields) a4.hasField(e14.name) || e14.isRelation || a4.addSuggestion(new rs(e14.name, "true"));
                  }
                }
                t12.addErrorMessage((t13) => {
                  let n13 = [`Unknown field ${t13.red(`\`${r12.fieldName}\``)}`];
                  return "unknown" !== r12.parentKind && n13.push(`for ${t13.bold(r12.parentKind)} statement`), n13.push(`on model ${t13.bold(`\`${e13.outputType.name}\``)}.`), n13.push(rP(t13)), n13.join(" ");
                });
              })(t11, r11);
              break;
            case "InvalidSelectionValue":
              let a3;
              f2 = t11, g2 = r11, "unknown" !== (a3 = rE(f2.selectionPath, g2)).parentKind && a3.field.value.markAsError(), g2.addErrorMessage((e13) => `Invalid value for selection field \`${e13.red(a3.fieldName)}\`: ${f2.underlyingError}`);
              break;
            case "UnknownArgument":
              let o3, s3;
              m2 = t11, y2 = r11, o3 = m2.argumentPath[0], (s3 = y2.arguments.getDeepSubSelectionValue(m2.selectionPath)?.asObject()) && (s3.getField(o3)?.markAsError(), (function(e13, t12) {
                for (let r12 of t12) e13.hasField(r12.name) || e13.addSuggestion(new rs(r12.name, r12.typeNames.join(" | ")));
              })(s3, m2.arguments)), y2.addErrorMessage((e13) => rw(e13, o3, m2.arguments.map((e14) => e14.name)));
              break;
            case "UnknownInputField":
              !(function(e13, t12) {
                let [r12, n12] = rx(e13.argumentPath), i12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (i12) {
                  i12.getDeepField(e13.argumentPath)?.markAsError();
                  let t13 = i12.getDeepFieldValue(r12)?.asObject();
                  t13 && rS(t13, e13.inputType);
                }
                t12.addErrorMessage((t13) => rw(t13, n12, e13.inputType.fields.map((e14) => e14.name)));
              })(t11, r11);
              break;
            case "RequiredArgumentMissing":
              !(function(e13, t12) {
                let r12;
                t12.addErrorMessage((e14) => r12?.value instanceof rb && "null" === r12.value.text ? `Argument \`${e14.green(a4)}\` must not be ${e14.red("null")}.` : `Argument \`${e14.green(a4)}\` is missing.`);
                let n12 = t12.arguments.getDeepSubSelectionValue(e13.selectionPath)?.asObject();
                if (!n12) return;
                let [i12, a4] = rx(e13.argumentPath), o4 = new rv(), s4 = n12.getDeepFieldValue(i12)?.asObject();
                if (s4) {
                  if ((r12 = s4.getField(a4)) && s4.removeField(a4), 1 === e13.inputTypes.length && "object" === e13.inputTypes[0].kind) {
                    for (let t13 of e13.inputTypes[0].fields) o4.addField(t13.name, t13.typeNames.join(" | "));
                    s4.addSuggestion(new rs(a4, o4).makeRequired());
                  } else {
                    let t13 = e13.inputTypes.map(function e14(t14) {
                      return "list" === t14.kind ? `${e14(t14.elementType)}[]` : t14.name;
                    }).join(" | ");
                    s4.addSuggestion(new rs(a4, t13).makeRequired());
                  }
                  if (e13.dependentArgumentPath) {
                    n12.getDeepField(e13.dependentArgumentPath)?.markAsError();
                    let [, r13] = rx(e13.dependentArgumentPath);
                    t12.addErrorMessage((e14) => `Argument \`${e14.green(a4)}\` is required because argument \`${e14.green(r13)}\` was provided.`);
                  }
                }
              })(t11, r11);
              break;
            case "InvalidArgumentType":
              let l3, c3;
              b2 = t11, v2 = r11, l3 = b2.argument.name, (c3 = v2.arguments.getDeepSubSelectionValue(b2.selectionPath)?.asObject()) && c3.getDeepFieldValue(b2.argumentPath)?.markAsError(), v2.addErrorMessage((e13) => {
                let t12 = rT("or", b2.argument.typeNames.map((t13) => e13.green(t13)));
                return `Argument \`${e13.bold(l3)}\`: Invalid value provided. Expected ${t12}, provided ${e13.red(b2.inferredType)}.`;
              });
              break;
            case "InvalidArgumentValue":
              let u2, d2;
              w2 = t11, _2 = r11, u2 = w2.argument.name, (d2 = _2.arguments.getDeepSubSelectionValue(w2.selectionPath)?.asObject()) && d2.getDeepFieldValue(w2.argumentPath)?.markAsError(), _2.addErrorMessage((e13) => {
                let t12 = [`Invalid value for argument \`${e13.bold(u2)}\``];
                if (w2.underlyingError && t12.push(`: ${w2.underlyingError}`), t12.push("."), w2.argument.typeNames.length > 0) {
                  let r12 = rT("or", w2.argument.typeNames.map((t13) => e13.green(t13)));
                  t12.push(` Expected ${r12}.`);
                }
                return t12.join("");
              });
              break;
            case "ValueTooLarge":
              var h2, p2, f2, g2, m2, y2, b2, v2, w2, _2, E2 = t11, S2 = r11;
              let x2 = E2.argument.name, P2 = S2.arguments.getDeepSubSelectionValue(E2.selectionPath)?.asObject(), T2;
              if (P2) {
                let e13 = P2.getDeepField(E2.argumentPath)?.value;
                e13?.markAsError(), e13 instanceof rb && (T2 = e13.text);
              }
              S2.addErrorMessage((e13) => {
                let t12 = ["Unable to fit value"];
                return T2 && t12.push(e13.red(T2)), t12.push(`into a 64-bit signed integer for field \`${e13.bold(x2)}\``), t12.join(" ");
              });
              break;
            case "SomeFieldsMissing":
              var A2 = t11, R2 = r11;
              let C2 = A2.argumentPath[A2.argumentPath.length - 1], O2 = R2.arguments.getDeepSubSelectionValue(A2.selectionPath)?.asObject();
              if (O2) {
                let e13 = O2.getDeepFieldValue(A2.argumentPath)?.asObject();
                e13 && rS(e13, A2.inputType);
              }
              R2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(C2)}\` of type ${e13.bold(A2.inputType.name)} needs`];
                return 1 === A2.constraints.minFieldCount ? A2.constraints.requiredFields ? t12.push(`${e13.green("at least one of")} ${rT("or", A2.constraints.requiredFields.map((t13) => `\`${e13.bold(t13)}\``))} arguments.`) : t12.push(`${e13.green("at least one")} argument.`) : t12.push(`${e13.green(`at least ${A2.constraints.minFieldCount}`)} arguments.`), t12.push(rP(e13)), t12.join(" ");
              });
              break;
            case "TooManyFieldsGiven":
              var k2 = t11, N2 = r11;
              let I2 = k2.argumentPath[k2.argumentPath.length - 1], M2 = N2.arguments.getDeepSubSelectionValue(k2.selectionPath)?.asObject(), D2 = [];
              if (M2) {
                let e13 = M2.getDeepFieldValue(k2.argumentPath)?.asObject();
                e13 && (e13.markAsError(), D2 = Object.keys(e13.getFields()));
              }
              N2.addErrorMessage((e13) => {
                let t12 = [`Argument \`${e13.bold(I2)}\` of type ${e13.bold(k2.inputType.name)} needs`];
                return 1 === k2.constraints.minFieldCount && 1 == k2.constraints.maxFieldCount ? t12.push(`${e13.green("exactly one")} argument,`) : 1 == k2.constraints.maxFieldCount ? t12.push(`${e13.green("at most one")} argument,`) : t12.push(`${e13.green(`at most ${k2.constraints.maxFieldCount}`)} arguments,`), t12.push(`but you provided ${rT("and", D2.map((t13) => e13.red(t13)))}. Please choose`), 1 === k2.constraints.maxFieldCount ? t12.push("one.") : t12.push(`${k2.constraints.maxFieldCount}.`), t12.join(" ");
              });
              break;
            case "Union":
              let $2;
              ($2 = (function(e13) {
                if (0 === e13.length) return;
                let t12 = e13[0];
                for (let r12 = 1; r12 < e13.length; r12++) 0 > ((e14, t13) => {
                  let r13 = ra(e14), n12 = ra(t13);
                  return r13 !== n12 ? r13 - n12 : ro(e14) - ro(t13);
                })(t12, e13[r12]) && (t12 = e13[r12]);
                return t12;
              })((function(e13) {
                let t12 = /* @__PURE__ */ new Map(), r12 = [];
                for (let a4 of e13) {
                  var n12, i12;
                  if ("InvalidArgumentType" !== a4.kind) {
                    r12.push(a4);
                    continue;
                  }
                  let e14 = `${a4.selectionPath.join(".")}:${a4.argumentPath.join(".")}`, o4 = t12.get(e14);
                  o4 ? t12.set(e14, { ...a4, argument: { ...a4.argument, typeNames: (n12 = o4.argument.typeNames, i12 = a4.argument.typeNames, [...new Set(n12.concat(i12))]) } }) : t12.set(e14, a4);
                }
                return r12.push(...t12.values()), r12;
              })((function e13(t12) {
                return t12.errors.flatMap((t13) => "Union" === t13.kind ? e13(t13) : [t13]);
              })(t11)))) ? e12($2, r11, n11) : r11.addErrorMessage(() => "Unknown error");
              break;
            default:
              throw Error("not implemented: " + t11.kind);
          }
        })(e11, s2, o2);
        let { message: l2, args: c2 } = rV(s2, r10);
        throw new tZ(rn({ message: l2, callsite: n10, originalMethod: i10, showColors: "pretty" === r10, callArguments: c2 }), { clientVersion: a2 });
      }
      function rH(e10) {
        return e10.replace(/^./, (e11) => e11.toLowerCase());
      }
      function rG(e10, t10, r10) {
        return r10 ? tG(r10, ({ needs: e11, compute: r11 }, n10) => {
          var i10, a2, o2;
          let s2;
          return { name: n10, needs: e11 ? Object.keys(e11).filter((t11) => e11[t11]) : [], compute: (i10 = t10, a2 = n10, o2 = r11, (s2 = i10?.[a2]?.compute) ? (e12) => o2({ ...e12, [a2]: s2(e12) }) : o2) };
        }) : {};
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var rW = class {
        constructor(e10, t10) {
          this.extension = e10, this.previous = t10;
        }
        computedFieldsCache = new t0();
        modelExtensionsCache = new t0();
        queryCallbacksCache = new t0();
        clientExtensions = t2(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
        batchCallbacks = t2(() => {
          let e10 = this.previous?.getAllBatchQueryCallbacks() ?? [], t10 = this.extension.query?.$__internalBatch;
          return t10 ? e10.concat(t10) : e10;
        });
        getAllComputedFields(e10) {
          return this.computedFieldsCache.getOrCreate(e10, () => {
            var t10, r10, n10;
            let i10, a2, o2;
            return t10 = this.previous?.getAllComputedFields(e10), r10 = this.extension, i10 = rH(e10), r10.result && (r10.result.$allModels || r10.result[i10]) ? (n10 = { ...t10, ...rG(r10.name, t10, r10.result.$allModels), ...rG(r10.name, t10, r10.result[i10]) }, a2 = new t0(), o2 = (e11, t11) => a2.getOrCreate(e11, () => t11.has(e11) ? [e11] : (t11.add(e11), n10[e11] ? n10[e11].needs.flatMap((e12) => o2(e12, t11)) : [e11])), tG(n10, (e11) => ({ ...e11, needs: o2(e11.name, /* @__PURE__ */ new Set()) }))) : t10;
          });
        }
        getAllClientExtensions() {
          return this.clientExtensions.get();
        }
        getAllModelExtensions(e10) {
          return this.modelExtensionsCache.getOrCreate(e10, () => {
            let t10 = rH(e10);
            return this.extension.model && (this.extension.model[t10] || this.extension.model.$allModels) ? { ...this.previous?.getAllModelExtensions(e10), ...this.extension.model.$allModels, ...this.extension.model[t10] } : this.previous?.getAllModelExtensions(e10);
          });
        }
        getAllQueryCallbacks(e10, t10) {
          return this.queryCallbacksCache.getOrCreate(`${e10}:${t10}`, () => {
            let r10 = this.previous?.getAllQueryCallbacks(e10, t10) ?? [], n10 = [], i10 = this.extension.query;
            return i10 && (i10[e10] || i10.$allModels || i10[t10] || i10.$allOperations) ? (void 0 !== i10[e10] && (void 0 !== i10[e10][t10] && n10.push(i10[e10][t10]), void 0 !== i10[e10].$allOperations && n10.push(i10[e10].$allOperations)), "$none" !== e10 && void 0 !== i10.$allModels && (void 0 !== i10.$allModels[t10] && n10.push(i10.$allModels[t10]), void 0 !== i10.$allModels.$allOperations && n10.push(i10.$allModels.$allOperations)), void 0 !== i10[t10] && n10.push(i10[t10]), void 0 !== i10.$allOperations && n10.push(i10.$allOperations), r10.concat(n10)) : r10;
          });
        }
        getAllBatchQueryCallbacks() {
          return this.batchCallbacks.get();
        }
      }, rJ = class e10 {
        constructor(e11) {
          this.head = e11;
        }
        static empty() {
          return new e10();
        }
        static single(t10) {
          return new e10(new rW(t10));
        }
        isEmpty() {
          return void 0 === this.head;
        }
        append(t10) {
          return new e10(new rW(t10, this.head));
        }
        getAllComputedFields(e11) {
          return this.head?.getAllComputedFields(e11);
        }
        getAllClientExtensions() {
          return this.head?.getAllClientExtensions();
        }
        getAllModelExtensions(e11) {
          return this.head?.getAllModelExtensions(e11);
        }
        getAllQueryCallbacks(e11, t10) {
          return this.head?.getAllQueryCallbacks(e11, t10) ?? [];
        }
        getAllBatchQueryCallbacks() {
          return this.head?.getAllBatchQueryCallbacks() ?? [];
        }
      };
      D(), $(), L(), j(), q(), ew();
      var rz = class {
        constructor(e10) {
          this.name = e10;
        }
      };
      function rK(e10) {
        return new rz(e10);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var rQ = /* @__PURE__ */ Symbol(), rX = class {
        constructor(e10) {
          if (e10 !== rQ) throw Error("Skip instance can not be constructed directly");
        }
        ifUndefined(e10) {
          return void 0 === e10 ? rY : e10;
        }
      }, rY = new rX(rQ);
      function rZ(e10) {
        return e10 instanceof rX;
      }
      var r0 = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" }, r1 = "explicitly `undefined` values are not allowed";
      function r2({ modelName: e10, action: t10, args: r10, runtimeDataModel: n10, extensions: i10 = rJ.empty(), callsite: a2, clientMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: c2, globalOmit: u2 }) {
        let d2 = new r6({ runtimeDataModel: n10, modelName: e10, action: t10, rootArgs: r10, callsite: a2, extensions: i10, selectionPath: [], argumentPath: [], originalMethod: o2, errorFormat: s2, clientVersion: l2, previewFeatures: c2, globalOmit: u2 });
        return { modelName: e10, action: r0[t10], query: (function e11({ select: t11, include: r11, ...n11 } = {}, i11) {
          var a3, o3, s3, l3, c3, u3, d3;
          let h2, p2 = n11.omit;
          return delete n11.omit, { arguments: r4(n11, i11), selection: (a3 = t11, o3 = r11, s3 = p2, l3 = i11, a3 ? (o3 ? l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: l3.getSelectionPath() }) : s3 && l3.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: l3.getSelectionPath() }), (function(t12, r12) {
            let n12 = {}, i12 = r12.getComputedFields();
            for (let [a4, o4] of Object.entries((function(e12, t13) {
              if (!t13) return e12;
              let r13 = { ...e12 };
              for (let n13 of Object.values(t13)) if (e12[n13.name]) for (let e13 of n13.needs) r13[e13] = true;
              return r13;
            })(t12, i12))) {
              if (rZ(o4)) continue;
              let t13 = r12.nestSelection(a4);
              r3(o4, t13);
              let s4 = r12.findField(a4);
              if (!(i12?.[a4] && !s4)) {
                if (false === o4 || void 0 === o4 || rZ(o4)) {
                  n12[a4] = false;
                  continue;
                }
                if (true === o4) {
                  s4?.kind === "object" ? n12[a4] = e11({}, t13) : n12[a4] = true;
                  continue;
                }
                n12[a4] = e11(o4, t13);
              }
            }
            return n12;
          })(a3, l3)) : (c3 = l3, u3 = o3, d3 = s3, h2 = {}, c3.modelOrType && !c3.isRawAction() && (h2.$composites = true, h2.$scalars = true), u3 && (function(t12, r12, n12) {
            for (let [i12, a4] of Object.entries(r12)) {
              if (rZ(a4)) continue;
              let r13 = n12.nestSelection(i12);
              if (r3(a4, r13), false === a4 || void 0 === a4) {
                t12[i12] = false;
                continue;
              }
              let o4 = n12.findField(i12);
              if (o4 && "object" !== o4.kind && n12.throwValidationError({ kind: "IncludeOnScalar", selectionPath: n12.getSelectionPath().concat(i12), outputType: n12.getOutputTypeDescription() }), o4) {
                t12[i12] = e11(true === a4 ? {} : a4, r13);
                continue;
              }
              if (true === a4) {
                t12[i12] = true;
                continue;
              }
              t12[i12] = e11(a4, r13);
            }
          })(h2, u3, c3), (function(e12, t12, r12) {
            let n12 = r12.getComputedFields();
            for (let [i12, a4] of Object.entries((function(e13, t13) {
              if (!t13) return e13;
              let r13 = { ...e13 };
              for (let n13 of Object.values(t13)) if (!e13[n13.name]) for (let e14 of n13.needs) delete r13[e14];
              return r13;
            })({ ...r12.getGlobalOmit(), ...t12 }, n12))) {
              if (rZ(a4)) continue;
              r3(a4, r12.nestSelection(i12));
              let t13 = r12.findField(i12);
              n12?.[i12] && !t13 || (e12[i12] = !a4);
            }
          })(h2, d3, c3), h2)) };
        })(r10, d2) };
      }
      function r4(e10, t10) {
        if (e10.$type) return { $type: "Raw", value: e10 };
        let r10 = {};
        for (let n10 in e10) {
          let i10 = e10[n10], a2 = t10.nestArgument(n10);
          rZ(i10) || (void 0 !== i10 ? r10[n10] = (function e11(t11, r11) {
            var n11, i11;
            if (null === t11) return null;
            if ("string" == typeof t11 || "number" == typeof t11 || "boolean" == typeof t11) return t11;
            if ("bigint" == typeof t11) return { $type: "BigInt", value: String(t11) };
            if (t6(t11)) {
              if (t5(t11)) return { $type: "DateTime", value: t11.toISOString() };
              r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
            }
            if (t11 instanceof rz) return { $type: "Param", value: t11.name };
            if (rR(t11)) return { $type: "FieldRef", value: { _ref: t11.name, _container: t11.modelName } };
            if (Array.isArray(t11)) return (function(t12, r12) {
              let n12 = [];
              for (let i12 = 0; i12 < t12.length; i12++) {
                let a3 = r12.nestArgument(String(i12)), o2 = t12[i12];
                if (void 0 === o2 || rZ(o2)) {
                  let e12 = void 0 === o2 ? "undefined" : "Prisma.skip";
                  r12.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: a3.getSelectionPath(), argumentPath: a3.getArgumentPath(), argument: { name: `${r12.getArgumentName()}[${i12}]`, typeNames: [] }, underlyingError: `Can not use \`${e12}\` value within array. Use \`null\` or filter out \`${e12}\` values` });
                }
                n12.push(e11(o2, a3));
              }
              return n12;
            })(t11, r11);
            if (ArrayBuffer.isView(t11)) {
              let { buffer: e12, byteOffset: r12, byteLength: n12 } = t11;
              return { $type: "Bytes", value: C.from(e12, r12, n12).toString("base64") };
            }
            if ("object" == typeof (n11 = t11) && null !== n11 && true === n11.__prismaRawParameters__) return t11.values;
            if (t8(t11)) return { $type: "Decimal", value: t11.toFixed() };
            if (t11 instanceof rk) {
              if (t11 !== r$.instances[t11._getName()]) throw Error("Invalid ObjectEnumValue");
              return { $type: "Enum", value: t11._getName() };
            }
            return "object" == typeof (i11 = t11) && null !== i11 && "function" == typeof i11.toJSON ? t11.toJSON() : "object" == typeof t11 ? r4(t11, r11) : void r11.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: r11.getSelectionPath(), argumentPath: r11.getArgumentPath(), argument: { name: r11.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t11)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
          })(i10, a2) : t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: a2.getArgumentPath(), selectionPath: t10.getSelectionPath(), argument: { name: t10.getArgumentName(), typeNames: [] }, underlyingError: r1 }));
        }
        return r10;
      }
      function r3(e10, t10) {
        void 0 === e10 && t10.isPreviewFeatureOn("strictUndefinedChecks") && t10.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: t10.getSelectionPath(), underlyingError: r1 });
      }
      var r6 = class e10 {
        constructor(e11) {
          this.params = e11, this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
        }
        modelOrType;
        throwValidationError(e11) {
          rB({ errors: [e11], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
        }
        getSelectionPath() {
          return this.params.selectionPath;
        }
        getArgumentPath() {
          return this.params.argumentPath;
        }
        getArgumentName() {
          return this.params.argumentPath[this.params.argumentPath.length - 1];
        }
        getOutputTypeDescription() {
          if (!(!this.params.modelName || !this.modelOrType)) return { name: this.params.modelName, fields: this.modelOrType.fields.map((e11) => ({ name: e11.name, typeName: "boolean", isRelation: "object" === e11.kind })) };
        }
        isRawAction() {
          return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
        }
        isPreviewFeatureOn(e11) {
          return this.params.previewFeatures.includes(e11);
        }
        getComputedFields() {
          if (this.params.modelName) return this.params.extensions.getAllComputedFields(this.params.modelName);
        }
        findField(e11) {
          return this.modelOrType?.fields.find((t10) => t10.name === e11);
        }
        nestSelection(t10) {
          let r10 = this.findField(t10), n10 = r10?.kind === "object" ? r10.type : void 0;
          return new e10({ ...this.params, modelName: n10, selectionPath: this.params.selectionPath.concat(t10) });
        }
        getGlobalOmit() {
          return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[t1(this.params.modelName)] ?? {} : {};
        }
        shouldApplyGlobalOmit() {
          switch (this.params.action) {
            case "findFirst":
            case "findFirstOrThrow":
            case "findUniqueOrThrow":
            case "findMany":
            case "upsert":
            case "findUnique":
            case "createManyAndReturn":
            case "create":
            case "update":
            case "updateManyAndReturn":
            case "delete":
              return true;
            case "executeRaw":
            case "aggregateRaw":
            case "runCommandRaw":
            case "findRaw":
            case "createMany":
            case "deleteMany":
            case "groupBy":
            case "updateMany":
            case "count":
            case "aggregate":
            case "queryRaw":
              return false;
            default:
              tB(this.params.action, "Unknown action");
          }
        }
        nestArgument(t10) {
          return new e10({ ...this.params, argumentPath: this.params.argumentPath.concat(t10) });
        }
      };
      function r5(e10) {
        if (!e10._hasPreviewFlag("metrics")) throw new tZ("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: e10._clientVersion });
      }
      D(), $(), L(), j(), q(), ew();
      var r8 = class {
        _client;
        constructor(e10) {
          this._client = e10;
        }
        prometheus(e10) {
          return r5(this._client), this._client._engine.metrics({ format: "prometheus", ...e10 });
        }
        json(e10) {
          return r5(this._client), this._client._engine.metrics({ format: "json", ...e10 });
        }
      };
      function r9(e10, t10) {
        let r10 = t2(() => (function() {
          throw Error("Prisma.dmmf is not available when running in edge runtimes.");
        })());
        Object.defineProperty(e10, "dmmf", { get: () => r10.get() });
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var r7 = /* @__PURE__ */ new WeakMap(), ne = "$$PrismaTypedSql", nt = class {
        constructor(e10, t10) {
          r7.set(this, { sql: e10, values: t10 }), Object.defineProperty(this, ne, { value: ne });
        }
        get sql() {
          return r7.get(this).sql;
        }
        get values() {
          return r7.get(this).values;
        }
      };
      function nr(e10) {
        return (...t10) => new nt(e10, t10);
      }
      function nn(e10) {
        return null != e10 && e10[ne] === ne;
      }
      D(), $(), L(), j(), q(), ew();
      var ni = f(eQ());
      D(), $(), L(), j(), q(), ew(), e2(), eq(), eK(), D(), $(), L(), j(), q(), ew();
      var na = class e10 {
        constructor(t10, r10) {
          if (t10.length - 1 !== r10.length) throw 0 === t10.length ? TypeError("Expected at least 1 string") : TypeError(`Expected ${t10.length} strings to have ${t10.length - 1} values`);
          let n10 = r10.reduce((t11, r11) => t11 + (r11 instanceof e10 ? r11.values.length : 1), 0);
          this.values = Array(n10), this.strings = Array(n10 + 1), this.strings[0] = t10[0];
          let i10 = 0, a2 = 0;
          for (; i10 < r10.length; ) {
            let n11 = r10[i10++], o2 = t10[i10];
            if (n11 instanceof e10) {
              this.strings[a2] += n11.strings[0];
              let e11 = 0;
              for (; e11 < n11.values.length; ) this.values[a2++] = n11.values[e11++], this.strings[a2] = n11.strings[e11];
              this.strings[a2] += o2;
            } else this.values[a2++] = n11, this.strings[a2] = o2;
          }
        }
        get sql() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `?${this.strings[t10++]}`;
          return r10;
        }
        get statement() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `:${t10}${this.strings[t10++]}`;
          return r10;
        }
        get text() {
          let e11 = this.strings.length, t10 = 1, r10 = this.strings[0];
          for (; t10 < e11; ) r10 += `$${t10}${this.strings[t10++]}`;
          return r10;
        }
        inspect() {
          return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
        }
      };
      function no(e10, t10 = ",", r10 = "", n10 = "") {
        if (0 === e10.length) throw TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
        return new na([r10, ...Array(e10.length - 1).fill(t10), n10], e10);
      }
      function ns(e10) {
        return new na([e10], []);
      }
      var nl = ns("");
      function nc(e10, ...t10) {
        return new na(e10, t10);
      }
      function nu(e10) {
        return { getKeys: () => Object.keys(e10), getPropertyValue: (t10) => e10[t10] };
      }
      function nd(e10, t10) {
        return { getKeys: () => [e10], getPropertyValue: () => t10() };
      }
      function nh(e10) {
        let t10 = new t0();
        return { getKeys: () => e10.getKeys(), getPropertyValue: (r10) => t10.getOrCreate(r10, () => e10.getPropertyValue(r10)), getPropertyDescriptor: (t11) => e10.getPropertyDescriptor?.(t11) };
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var np = { enumerable: true, configurable: true, writable: true };
      function nf(e10) {
        let t10 = new Set(e10);
        return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => np, has: (e11, r10) => t10.has(r10), set: (e11, r10, n10) => t10.add(r10) && Reflect.set(e11, r10, n10), ownKeys: () => [...t10] };
      }
      var ng = /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom");
      function nm(e10, t10) {
        let r10 = (function(e11) {
          let t11 = /* @__PURE__ */ new Map();
          for (let r11 of e11) for (let e12 of r11.getKeys()) t11.set(e12, r11);
          return t11;
        })(t10), n10 = /* @__PURE__ */ new Set(), i10 = new Proxy(e10, { get(e11, t11) {
          if (n10.has(t11)) return e11[t11];
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyValue(t11) : e11[t11];
        }, has(e11, t11) {
          if (n10.has(t11)) return true;
          let i11 = r10.get(t11);
          return i11 ? i11.has?.(t11) ?? true : Reflect.has(e11, t11);
        }, ownKeys: (e11) => [.../* @__PURE__ */ new Set([...ny(Reflect.ownKeys(e11), r10), ...ny(Array.from(r10.keys()), r10), ...n10])], set: (e11, t11, i11) => r10.get(t11)?.getPropertyDescriptor?.(t11)?.writable !== false && (n10.add(t11), Reflect.set(e11, t11, i11)), getOwnPropertyDescriptor(e11, t11) {
          let n11 = Reflect.getOwnPropertyDescriptor(e11, t11);
          if (n11 && !n11.configurable) return n11;
          let i11 = r10.get(t11);
          return i11 ? i11.getPropertyDescriptor ? { ...np, ...i11?.getPropertyDescriptor(t11) } : np : n11;
        }, defineProperty: (e11, t11, r11) => (n10.add(t11), Reflect.defineProperty(e11, t11, r11)), getPrototypeOf: () => Object.prototype });
        return i10[ng] = function() {
          let e11 = { ...this };
          return delete e11[ng], e11;
        }, i10;
      }
      function ny(e10, t10) {
        return e10.filter((e11) => t10.get(e11)?.has?.(e11) ?? true);
      }
      function nb(e10) {
        return { getKeys: () => e10, has: () => false, getPropertyValue() {
        } };
      }
      function nv(e10, t10) {
        return { batch: e10, transaction: t10?.kind === "batch" ? { isolationLevel: t10.options.isolationLevel } : void 0 };
      }
      function nw({ error: e10, user_facing_error: t10 }, r10, n10) {
        var i10, a2;
        let o2;
        return t10.error_code ? new tQ((i10 = t10, a2 = n10, o2 = i10.message, ("postgresql" === a2 || "postgres" === a2 || "mysql" === a2) && "P2037" === i10.error_code && (o2 += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), o2), { code: t10.error_code, clientVersion: r10, meta: t10.meta, batchRequestIdx: t10.batch_request_idx }) : new tY(e10, { clientVersion: r10, batchRequestIdx: t10.batch_request_idx });
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var n_ = class {
        getLocation() {
          return null;
        }
      };
      function nE(e10) {
        return "function" == typeof $EnabledCallSite && "minimal" !== e10 ? new $EnabledCallSite() : new n_();
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var nS = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
      function nx(e10 = {}) {
        return Object.entries((function(e11 = {}) {
          return "boolean" == typeof e11._count ? { ...e11, _count: { _all: e11._count } } : e11;
        })(e10)).reduce((e11, [t10, r10]) => (void 0 !== nS[t10] ? e11.select[t10] = { select: r10 } : e11[t10] = r10, e11), { select: {} });
      }
      function nP(e10 = {}) {
        return (t10) => ("boolean" == typeof e10._count && (t10._count = t10._count._all), t10);
      }
      function nT(e10 = {}) {
        let { select: t10, ...r10 } = e10;
        return "object" == typeof t10 ? nx({ ...r10, _count: t10 }) : nx({ ...r10, _count: { _all: true } });
      }
      function nA(e10 = {}) {
        let t10 = nx(e10);
        if (Array.isArray(t10.by)) for (let e11 of t10.by) "string" == typeof e11 && (t10.select[e11] = true);
        else "string" == typeof t10.by && (t10.select[t10.by] = true);
        return t10;
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var nR = (e10) => Array.isArray(e10) ? e10 : e10.split("."), nC = (e10, t10) => nR(t10).reduce((e11, t11) => e11 && e11[t11], e10), nO = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"], nk = ["aggregate", "count", "groupBy"];
      function nN(e10, t10) {
        var r10, n10, i10, a2;
        let o2, s2, l2 = e10._extensions.getAllModelExtensions(t10) ?? {};
        return nm({}, [(r10 = e10, o2 = rH(n10 = t10), s2 = Object.keys(re).concat("count"), { getKeys: () => s2, getPropertyValue(e11) {
          var t11;
          let i11 = (t12) => (i12) => {
            let a3 = nE(r10._errorFormat);
            return r10._createPrismaPromise((s3) => {
              let l3 = { args: i12, dataPath: [], action: e11, model: n10, clientMethod: `${o2}.${e11}`, jsModelName: o2, transaction: s3, callsite: a3 };
              return r10._request({ ...l3, ...t12 });
            }, { action: e11, args: i12, model: n10 });
          };
          return nO.includes(e11) ? (function e12(t12, r11, n11, i12, a3, o3) {
            let s3 = t12._runtimeDataModel.models[r11].fields.reduce((e13, t13) => ({ ...e13, [t13.name]: t13 }), {});
            return (l3) => {
              var c2, u2;
              let d2, h2 = nE(t12._errorFormat), p2 = void 0 === i12 || void 0 === a3 ? [] : [...a3, "select", i12], f2 = void 0 === o3 ? l3 ?? {} : (d2 = l3 || true, nR(p2).reduceRight((e13, t13, r12, n12) => Object.assign({}, nC(o3, n12.slice(0, r12)), { [t13]: e13 }), d2)), g2 = n11({ dataPath: p2, callsite: h2 })(f2), m2 = (c2 = t12, u2 = r11, c2._runtimeDataModel.models[u2].fields.filter((e13) => "object" === e13.kind).map((e13) => e13.name));
              return new Proxy(g2, { get: (r12, i13) => m2.includes(i13) ? e12(t12, s3[i13].type, n11, i13, p2, f2) : r12[i13], ...nf([...m2, ...Object.getOwnPropertyNames(g2)]) });
            };
          })(r10, n10, i11) : (t11 = e11, nk.includes(t11)) ? "aggregate" === e11 ? (e12) => i11({ action: "aggregate", unpacker: nP(e12), argsMapper: nx })(e12) : "count" === e11 ? (e12) => i11({ action: "count", unpacker: (function(e13 = {}) {
            return "object" == typeof e13.select ? (t12) => nP(e13)(t12)._count : (t12) => nP(e13)(t12)._count._all;
          })(e12), argsMapper: nT })(e12) : "groupBy" === e11 ? (e12) => i11({ action: "groupBy", unpacker: /* @__PURE__ */ (function(e13 = {}) {
            return (t12) => ("boolean" == typeof e13?._count && t12.forEach((e14) => {
              e14._count = e14._count._all;
            }), t12);
          })(e12), argsMapper: nA })(e12) : void 0 : i11({});
        } }), (i10 = e10, a2 = t10, nh(nd("fields", () => {
          let e11, t11 = i10._runtimeDataModel.models[a2];
          return new Proxy({}, { get(t12, r11) {
            if (r11 in t12 || "symbol" == typeof r11) return t12[r11];
            let n11 = e11[r11];
            if (n11) return new rA(a2, r11, n11.type, n11.isList, "enum" === n11.kind);
          }, ...nf(Object.keys(e11 = (function(e12, t12) {
            let r11 = {};
            for (let n11 of e12) r11[n11[t12]] = n11;
            return r11;
          })(t11.fields.filter((e12) => !e12.relationName), "name"))) });
        }))), nu(l2), nd("name", () => t10), nd("$name", () => t10), nd("$parent", () => e10._appliedParent)]);
      }
      D(), $(), L(), j(), q(), ew();
      var nI = /* @__PURE__ */ Symbol();
      function nM(e10) {
        var t10, r10;
        let n10, i10, a2, o2, s2 = [(n10 = [...new Set(Object.getOwnPropertyNames(Object.getPrototypeOf((t10 = e10)._originalClient)))], { getKeys: () => n10, getPropertyValue: (e11) => t10[e11] }), (a2 = (i10 = Object.keys((r10 = e10)._runtimeDataModel.models)).map(rH), o2 = [...new Set(i10.concat(a2))], nh({ getKeys: () => o2, getPropertyValue(e11) {
          let t11 = e11.replace(/^./, (e12) => e12.toUpperCase());
          return void 0 !== r10._runtimeDataModel.models[t11] ? nN(r10, t11) : void 0 !== r10._runtimeDataModel.models[e11] ? nN(r10, e11) : void 0;
        }, getPropertyDescriptor(e11) {
          if (!a2.includes(e11)) return { enumerable: false };
        } })), nd(nI, () => e10), nd("$parent", () => e10._appliedParent)], l2 = e10._extensions.getAllClientExtensions();
        return l2 && s2.push(nu(l2)), nm(e10, s2);
      }
      function nD(e10) {
        if ("function" == typeof e10) return e10(this);
        if (e10.client?.__AccelerateEngine) {
          let t10 = e10.client.__AccelerateEngine;
          this._originalClient._engine = new t10(this._originalClient._accelerateEngineConfig);
        }
        return nM(Object.create(this._originalClient, { _extensions: { value: this._extensions.append(e10) }, _appliedParent: { value: this, configurable: true }, $on: { value: void 0 } }));
      }
      function n$({ visitor: e10, result: t10, args: r10, runtimeDataModel: n10, modelName: i10 }) {
        if (Array.isArray(t10)) {
          for (let a3 = 0; a3 < t10.length; a3++) t10[a3] = n$({ result: t10[a3], args: r10, modelName: i10, runtimeDataModel: n10, visitor: e10 });
          return t10;
        }
        let a2 = e10(t10, i10, r10) ?? t10;
        return r10.include && nL({ includeOrSelect: r10.include, result: a2, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), r10.select && nL({ includeOrSelect: r10.select, result: a2, parentModelName: i10, runtimeDataModel: n10, visitor: e10 }), a2;
      }
      function nL({ includeOrSelect: e10, result: t10, parentModelName: r10, runtimeDataModel: n10, visitor: i10 }) {
        for (let [a2, o2] of Object.entries(e10)) {
          if (!o2 || null == t10[a2] || rZ(o2)) continue;
          let e11 = n10.models[r10].fields.find((e12) => e12.name === a2);
          if (!e11 || "object" !== e11.kind || !e11.relationName) continue;
          let s2 = "object" == typeof o2 ? o2 : {};
          t10[a2] = n$({ visitor: i10, result: t10[a2], args: s2, modelName: e11.type, runtimeDataModel: n10 });
        }
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), ew(), D(), $(), L(), j(), q(), ew();
      var nj = ["$connect", "$disconnect", "$on", "$transaction", "$extends"];
      function nq(e10) {
        if ("object" != typeof e10 || null == e10 || e10 instanceof rk || rR(e10)) return e10;
        if (t8(e10)) return new eb(e10.toFixed());
        if (t6(e10)) return /* @__PURE__ */ new Date(+e10);
        if (ArrayBuffer.isView(e10)) return e10.slice(0);
        if (Array.isArray(e10)) {
          let t10 = e10.length, r10;
          for (r10 = Array(t10); t10--; ) r10[t10] = nq(e10[t10]);
          return r10;
        }
        if ("object" == typeof e10) {
          let t10 = {};
          for (let r10 in e10) "__proto__" === r10 ? Object.defineProperty(t10, r10, { value: nq(e10[r10]), configurable: true, enumerable: true, writable: true }) : t10[r10] = nq(e10[r10]);
          return t10;
        }
        tB(e10, "Unknown value");
      }
      var nU = (e10) => e10;
      function nF(e10 = nU, t10 = nU) {
        return (r10) => e10(t10(r10));
      }
      D(), $(), L(), j(), q(), ew();
      var nV = t_("prisma:client"), nB = { Vercel: "vercel", "Netlify CI": "netlify" };
      function nH(e10) {
        return null === e10 ? e10 : Array.isArray(e10) ? e10.map(nH) : "object" == typeof e10 ? null !== e10 && "object" == typeof e10 && "string" == typeof e10.$type ? (function({ $type: e11, value: t10 }) {
          switch (e11) {
            case "BigInt":
              return BigInt(t10);
            case "Bytes": {
              let { buffer: e12, byteOffset: r10, byteLength: n10 } = C.from(t10, "base64");
              return new Uint8Array(e12, r10, n10);
            }
            case "DateTime":
              return new Date(t10);
            case "Decimal":
              return new ey(t10);
            case "Json":
              return JSON.parse(t10);
            default:
              throw Error("Unknown tagged value");
          }
        })(e10) : null !== e10.constructor && "Object" !== e10.constructor.name ? e10 : (function(e11, t10) {
          let r10 = {};
          for (let n10 of Object.keys(e11)) r10[n10] = t10(e11[n10], n10);
          return r10;
        })(e10, nH) : e10;
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), ew(), D(), $(), L(), j(), q(), ew(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var nG = () => globalThis.process?.release?.name === "node", nW = () => !!globalThis.Bun || !!globalThis.process?.versions?.bun, nJ = () => !!globalThis.Deno, nz = () => "object" == typeof globalThis.Netlify, nK = () => "object" == typeof globalThis.EdgeRuntime, nQ = () => globalThis.navigator?.userAgent === "Cloudflare-Workers", nX = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
      function nY() {
        let e10 = [[nz, "netlify"], [nK, "edge-light"], [nQ, "workerd"], [nJ, "deno"], [nW, "bun"], [nG, "node"]].flatMap((e11) => e11[0]() ? [e11[1]] : []).at(0) ?? "";
        return { id: e10, prettyName: nX[e10] || e10, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e10) };
      }
      function nZ({ inlineDatasources: e10, overrideDatasources: t10, env: r10, clientVersion: n10 }) {
        let i10, a2 = Object.keys(e10)[0], o2 = e10[a2]?.url, s2 = t10[a2]?.url;
        if (void 0 === a2 ? i10 = void 0 : s2 ? i10 = s2 : o2?.value ? i10 = o2.value : o2?.fromEnvVar && (i10 = r10[o2.fromEnvVar]), o2?.fromEnvVar !== void 0 && void 0 === i10) throw "workerd" === nY().id ? new tK(`error: Environment variable not found: ${o2.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n10) : new tK(`error: Environment variable not found: ${o2.fromEnvVar}.`, n10);
        if (void 0 === i10) throw new tK("error: Missing URL environment variable, value, or override.", n10);
        return i10;
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var n0 = class extends Error {
        clientVersion;
        cause;
        constructor(e10, t10) {
          super(e10), this.clientVersion = t10.clientVersion, this.cause = t10.cause;
        }
        get [Symbol.toStringTag]() {
          return this.name;
        }
      }, n1 = class extends n0 {
        isRetryable;
        constructor(e10, t10) {
          super(e10, t10), this.isRetryable = t10.isRetryable ?? true;
        }
      };
      function n2(e10, t10) {
        return { ...e10, isRetryable: t10 };
      }
      D(), $(), L(), j(), q(), ew();
      var n4 = class extends n1 {
        name = "InvalidDatasourceError";
        code = "P6001";
        constructor(e10, t10) {
          super(e10, n2(t10, false));
        }
      };
      tW(n4, "InvalidDatasourceError"), D(), $(), L(), j(), q(), ew();
      var n3 = f(eX()), n6 = class {
        apiKey;
        tracingHelper;
        logLevel;
        logQueries;
        engineHash;
        constructor({ apiKey: e10, tracingHelper: t10, logLevel: r10, logQueries: n10, engineHash: i10 }) {
          this.apiKey = e10, this.tracingHelper = t10, this.logLevel = r10, this.logQueries = n10, this.engineHash = i10;
        }
        build({ traceparent: e10, transactionId: t10 } = {}) {
          let r10 = { Accept: "application/json", Authorization: `Bearer ${this.apiKey}`, "Content-Type": "application/json", "Prisma-Engine-Hash": this.engineHash, "Prisma-Engine-Version": n3.enginesVersion };
          this.tracingHelper.isEnabled() && (r10.traceparent = e10 ?? this.tracingHelper.getTraceParent()), t10 && (r10["X-Transaction-Id"] = t10);
          let n10 = this.#e();
          return n10.length > 0 && (r10["X-Capture-Telemetry"] = n10.join(", ")), r10;
        }
        #e() {
          let e10 = [];
          return this.tracingHelper.isEnabled() && e10.push("tracing"), this.logLevel && e10.push(this.logLevel), this.logQueries && e10.push("query"), e10;
        }
      };
      function n5(e10) {
        return new Date(1e3 * e10[0] + e10[1] / 1e6);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var n8 = class extends n1 {
        name = "ForcedRetryError";
        code = "P5001";
        constructor(e10) {
          super("This request must be retried", n2(e10, true));
        }
      };
      tW(n8, "ForcedRetryError"), D(), $(), L(), j(), q(), ew();
      var n9 = class extends n1 {
        name = "NotImplementedYetError";
        code = "P5004";
        constructor(e10, t10) {
          super(e10, n2(t10, false));
        }
      };
      tW(n9, "NotImplementedYetError"), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var n7 = class extends n1 {
        response;
        constructor(e10, t10) {
          super(e10, t10), this.response = t10.response;
          let r10 = this.response.headers.get("prisma-request-id");
          if (r10) {
            let e11 = `(The request id was: ${r10})`;
            this.message = this.message + " " + e11;
          }
        }
      }, ie = class extends n7 {
        name = "SchemaMissingError";
        code = "P5005";
        constructor(e10) {
          super("Schema needs to be uploaded", n2(e10, true));
        }
      };
      tW(ie, "SchemaMissingError"), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var it = "This request could not be understood by the server", ir = class extends n7 {
        name = "BadRequestError";
        code = "P5000";
        constructor(e10, t10, r10) {
          super(t10 || it, n2(e10, false)), r10 && (this.code = r10);
        }
      };
      tW(ir, "BadRequestError"), D(), $(), L(), j(), q(), ew();
      var ii = class extends n7 {
        name = "HealthcheckTimeoutError";
        code = "P5013";
        logs;
        constructor(e10, t10) {
          super("Engine not started: healthcheck timeout", n2(e10, true)), this.logs = t10;
        }
      };
      tW(ii, "HealthcheckTimeoutError"), D(), $(), L(), j(), q(), ew();
      var ia = class extends n7 {
        name = "EngineStartupError";
        code = "P5014";
        logs;
        constructor(e10, t10, r10) {
          super(t10, n2(e10, true)), this.logs = r10;
        }
      };
      tW(ia, "EngineStartupError"), D(), $(), L(), j(), q(), ew();
      var io = class extends n7 {
        name = "EngineVersionNotSupportedError";
        code = "P5012";
        constructor(e10) {
          super("Engine version is not supported", n2(e10, false));
        }
      };
      tW(io, "EngineVersionNotSupportedError"), D(), $(), L(), j(), q(), ew();
      var is = "Request timed out", il = class extends n7 {
        name = "GatewayTimeoutError";
        code = "P5009";
        constructor(e10, t10 = is) {
          super(t10, n2(e10, false));
        }
      };
      tW(il, "GatewayTimeoutError"), D(), $(), L(), j(), q(), ew();
      var ic = class extends n7 {
        name = "InteractiveTransactionError";
        code = "P5015";
        constructor(e10, t10 = "Interactive transaction error") {
          super(t10, n2(e10, false));
        }
      };
      tW(ic, "InteractiveTransactionError"), D(), $(), L(), j(), q(), ew();
      var iu = class extends n7 {
        name = "InvalidRequestError";
        code = "P5011";
        constructor(e10, t10 = "Request parameters are invalid") {
          super(t10, n2(e10, false));
        }
      };
      tW(iu, "InvalidRequestError"), D(), $(), L(), j(), q(), ew();
      var id = "Requested resource does not exist", ih = class extends n7 {
        name = "NotFoundError";
        code = "P5003";
        constructor(e10, t10 = id) {
          super(t10, n2(e10, false));
        }
      };
      tW(ih, "NotFoundError"), D(), $(), L(), j(), q(), ew();
      var ip = "Unknown server error", ig = class extends n7 {
        name = "ServerError";
        code = "P5006";
        logs;
        constructor(e10, t10, r10) {
          super(t10 || ip, n2(e10, true)), this.logs = r10;
        }
      };
      tW(ig, "ServerError"), D(), $(), L(), j(), q(), ew();
      var im = "Unauthorized, check your connection string", iy = class extends n7 {
        name = "UnauthorizedError";
        code = "P5007";
        constructor(e10, t10 = im) {
          super(t10, n2(e10, false));
        }
      };
      tW(iy, "UnauthorizedError"), D(), $(), L(), j(), q(), ew();
      var ib = "Usage exceeded, retry again later", iv = class extends n7 {
        name = "UsageExceededError";
        code = "P5008";
        constructor(e10, t10 = ib) {
          super(t10, n2(e10, true));
        }
      };
      async function iw(e10) {
        let t10;
        try {
          t10 = await e10.text();
        } catch {
          return { type: "EmptyError" };
        }
        try {
          let e11 = JSON.parse(t10);
          if ("string" == typeof e11) if ("InternalDataProxyError" === e11) return { type: "DataProxyError", body: e11 };
          else return { type: "UnknownTextError", body: e11 };
          if ("object" == typeof e11 && null !== e11) {
            if ("is_panic" in e11 && "message" in e11 && "error_code" in e11) return { type: "QueryEngineError", body: e11 };
            if ("EngineNotStarted" in e11 || "InteractiveTransactionMisrouted" in e11 || "InvalidRequestError" in e11) {
              let t11 = Object.values(e11)[0].reason;
              return "string" != typeof t11 || ["SchemaMissing", "EngineVersionNotSupported"].includes(t11) ? { type: "DataProxyError", body: e11 } : { type: "UnknownJsonError", body: e11 };
            }
          }
          return { type: "UnknownJsonError", body: e11 };
        } catch {
          return "" === t10 ? { type: "EmptyError" } : { type: "UnknownTextError", body: t10 };
        }
      }
      async function i_(e10, t10) {
        if (e10.ok) return;
        let r10 = { clientVersion: t10, response: e10 }, n10 = await iw(e10);
        if ("QueryEngineError" === n10.type) throw new tQ(n10.body.message, { code: n10.body.error_code, clientVersion: t10 });
        if ("DataProxyError" === n10.type) {
          if ("InternalDataProxyError" === n10.body) throw new ig(r10, "Internal Data Proxy error");
          if ("EngineNotStarted" in n10.body) {
            if ("SchemaMissing" === n10.body.EngineNotStarted.reason) return new ie(r10);
            if ("EngineVersionNotSupported" === n10.body.EngineNotStarted.reason) throw new io(r10);
            if ("EngineStartupError" in n10.body.EngineNotStarted.reason) {
              let { msg: e11, logs: t11 } = n10.body.EngineNotStarted.reason.EngineStartupError;
              throw new ia(r10, e11, t11);
            }
            if ("KnownEngineStartupError" in n10.body.EngineNotStarted.reason) {
              let { msg: e11, error_code: r11 } = n10.body.EngineNotStarted.reason.KnownEngineStartupError;
              throw new tK(e11, t10, r11);
            }
            if ("HealthcheckTimeout" in n10.body.EngineNotStarted.reason) {
              let { logs: e11 } = n10.body.EngineNotStarted.reason.HealthcheckTimeout;
              throw new ii(r10, e11);
            }
          }
          if ("InteractiveTransactionMisrouted" in n10.body) throw new ic(r10, { IDParseError: "Could not parse interactive transaction ID", NoQueryEngineFoundError: "Could not find Query Engine for the specified host and transaction ID", TransactionStartError: "Could not start interactive transaction" }[n10.body.InteractiveTransactionMisrouted.reason]);
          if ("InvalidRequestError" in n10.body) throw new iu(r10, n10.body.InvalidRequestError.reason);
        }
        if (401 === e10.status || 403 === e10.status) throw new iy(r10, iE(im, n10));
        if (404 === e10.status) return new ih(r10, iE(id, n10));
        if (429 === e10.status) throw new iv(r10, iE(ib, n10));
        if (504 === e10.status) throw new il(r10, iE(is, n10));
        if (e10.status >= 500) throw new ig(r10, iE(ip, n10));
        if (e10.status >= 400) throw new ir(r10, iE(it, n10));
      }
      function iE(e10, t10) {
        return "EmptyError" === t10.type ? e10 : `${e10}: ${JSON.stringify(t10)}`;
      }
      tW(iv, "UsageExceededError"), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var iS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var ix = class extends n1 {
        name = "RequestError";
        code = "P5010";
        constructor(e10, t10) {
          super(`Cannot fetch data from service:
${e10}`, n2(t10, true));
        }
      };
      async function iP(e10, t10, r10 = (e11) => e11) {
        let { clientVersion: n10, ...i10 } = t10, a2 = r10(fetch);
        try {
          return await a2(e10, i10);
        } catch (e11) {
          throw new ix(e11.message ?? "Unknown error", { clientVersion: n10, cause: e11 });
        }
      }
      tW(ix, "RequestError");
      var iT = /^[1-9][0-9]*\.[0-9]+\.[0-9]+$/, iA = t_("prisma:client:dataproxyEngine");
      async function iR(e10, t10) {
        let r10 = t10.clientVersion ?? "unknown";
        if (k.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION) return k.env.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION || globalThis.PRISMA_CLIENT_DATA_PROXY_CLIENT_VERSION;
        if (e10.includes("accelerate") && "0.0.0" !== r10 && "in-memory" !== r10) return r10;
        let [n10, i10] = r10?.split("-") ?? [];
        if (void 0 === i10 && iT.test(n10)) return n10;
        if (void 0 !== i10 || "0.0.0" === r10 || "in-memory" === r10) {
          var a2;
          let e11, [t11] = "7.1.1-3.c2990dca591cba766e3b7ef5d9e8a84796e47ab7".split("-") ?? [], [n11, i11, o2] = t11.split("."), s2 = (a2 = `<=${n11}.${i11}.${o2}`, encodeURI(`https://unpkg.com/prisma@${a2}/package.json`)), l2 = await iP(s2, { clientVersion: r10 });
          if (!l2.ok) throw Error(`Failed to fetch stable Prisma version, unpkg.com status ${l2.status} ${l2.statusText}, response body: ${await l2.text() || "<empty body>"}`);
          let c2 = await l2.text();
          iA("length of body fetched from unpkg.com", c2.length);
          try {
            e11 = JSON.parse(c2);
          } catch (e12) {
            throw console.error("JSON.parse error: body fetched from unpkg.com: ", c2), e12;
          }
          return e11.version;
        }
        throw new n9("Only `major.minor.patch` versions are supported by Accelerate.", { clientVersion: r10 });
      }
      async function iC(e10, t10) {
        let r10 = await iR(e10, t10);
        return iA("version", r10), r10;
      }
      var iO = t_("prisma:client:dataproxyEngine"), ik = class {
        name = "DataProxyEngine";
        inlineSchema;
        inlineSchemaHash;
        inlineDatasources;
        config;
        logEmitter;
        env;
        clientVersion;
        engineHash;
        tracingHelper;
        remoteClientVersion;
        host;
        headerBuilder;
        startPromise;
        protocol;
        constructor(e10) {
          (function(e11) {
            if (e11.generator?.previewFeatures.some((e12) => e12.toLowerCase().includes("metrics"))) throw new tK("The `metrics` preview feature is not yet available with Accelerate.\nPlease remove `metrics` from the `previewFeatures` in your schema.\n\nMore information about Accelerate: https://pris.ly/d/accelerate", e11.clientVersion);
          })(e10), this.config = e10, this.env = e10.env, this.inlineSchema = (function(e11) {
            let t10 = new TextEncoder().encode(e11), r10 = "", n10 = t10.byteLength, i10 = n10 % 3, a2 = n10 - i10, o2, s2, l2, c2, u2;
            for (let e12 = 0; e12 < a2; e12 += 3) o2 = (16515072 & (u2 = t10[e12] << 16 | t10[e12 + 1] << 8 | t10[e12 + 2])) >> 18, s2 = (258048 & u2) >> 12, l2 = (4032 & u2) >> 6, c2 = 63 & u2, r10 += iS[o2] + iS[s2] + iS[l2] + iS[c2];
            return 1 == i10 ? (o2 = (252 & (u2 = t10[a2])) >> 2, s2 = (3 & u2) << 4, r10 += iS[o2] + iS[s2] + "==") : 2 == i10 && (o2 = (64512 & (u2 = t10[a2] << 8 | t10[a2 + 1])) >> 10, s2 = (1008 & u2) >> 4, l2 = (15 & u2) << 2, r10 += iS[o2] + iS[s2] + iS[l2] + "="), r10;
          })(e10.inlineSchema), this.inlineDatasources = e10.inlineDatasources, this.inlineSchemaHash = e10.inlineSchemaHash, this.clientVersion = e10.clientVersion, this.engineHash = e10.engineVersion, this.logEmitter = e10.logEmitter, this.tracingHelper = e10.tracingHelper;
        }
        apiKey() {
          return this.headerBuilder.apiKey;
        }
        version() {
          return this.engineHash;
        }
        async start() {
          void 0 !== this.startPromise && await this.startPromise, this.startPromise = (async () => {
            let { apiKey: e10, url: t10 } = this.getURLAndAPIKey();
            this.host = t10.host, this.protocol = t10.protocol, this.headerBuilder = new n6({ apiKey: e10, tracingHelper: this.tracingHelper, logLevel: this.config.logLevel ?? "error", logQueries: this.config.logQueries, engineHash: this.engineHash }), this.remoteClientVersion = await iC(this.host, this.config), iO("host", this.host), iO("protocol", this.protocol);
          })(), await this.startPromise;
        }
        async stop() {
        }
        propagateResponseExtensions(e10) {
          e10?.logs?.length && e10.logs.forEach((e11) => {
            switch (e11.level) {
              case "debug":
              case "trace":
                iO(e11);
                break;
              case "error":
              case "warn":
              case "info":
                this.logEmitter.emit(e11.level, { timestamp: n5(e11.timestamp), message: e11.attributes.message ?? "", target: e11.target ?? "BinaryEngine" });
                break;
              case "query":
                this.logEmitter.emit("query", { query: e11.attributes.query ?? "", timestamp: n5(e11.timestamp), duration: e11.attributes.duration_ms ?? 0, params: e11.attributes.params ?? "", target: e11.target ?? "BinaryEngine" });
                break;
              default:
                e11.level;
            }
          }), e10?.traces?.length && this.tracingHelper.dispatchEngineSpans(e10.traces);
        }
        onBeforeExit() {
          throw Error('"beforeExit" hook is not applicable to the remote query engine');
        }
        async url(e10) {
          return await this.start(), `${this.protocol}//${this.host}/${this.remoteClientVersion}/${this.inlineSchemaHash}/${e10}`;
        }
        async uploadSchema() {
          return this.tracingHelper.runInChildSpan({ name: "schemaUpload", internal: true }, async () => {
            let e10 = await iP(await this.url("schema"), { method: "PUT", headers: this.headerBuilder.build(), body: this.inlineSchema, clientVersion: this.clientVersion });
            e10.ok || iO("schema response status", e10.status);
            let t10 = await i_(e10, this.clientVersion);
            if (t10) throw this.logEmitter.emit("warn", { message: `Error while uploading schema: ${t10.message}`, timestamp: /* @__PURE__ */ new Date(), target: "" }), t10;
            this.logEmitter.emit("info", { message: `Schema (re)uploaded (hash: ${this.inlineSchemaHash})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
          });
        }
        request(e10, { traceparent: t10, interactiveTransaction: r10, customDataProxyFetch: n10 }) {
          return this.requestInternal({ body: e10, traceparent: t10, interactiveTransaction: r10, customDataProxyFetch: n10 });
        }
        async requestBatch(e10, { traceparent: t10, transaction: r10, customDataProxyFetch: n10 }) {
          let i10 = r10?.kind === "itx" ? r10.options : void 0, a2 = nv(e10, r10);
          return (await this.requestInternal({ body: a2, customDataProxyFetch: n10, interactiveTransaction: i10, traceparent: t10 })).map((e11) => (e11.extensions && this.propagateResponseExtensions(e11.extensions), "errors" in e11 ? this.convertProtocolErrorsToClientError(e11.errors) : e11));
        }
        requestInternal({ body: e10, traceparent: t10, customDataProxyFetch: r10, interactiveTransaction: n10 }) {
          return this.withRetry({ actionGerund: "querying", callback: async ({ logHttpCall: i10 }) => {
            let a2 = n10 ? `${n10.payload.endpoint}/graphql` : await this.url("graphql");
            i10(a2);
            let o2 = await iP(a2, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10, transactionId: n10?.id }), body: JSON.stringify(e10), clientVersion: this.clientVersion }, r10);
            o2.ok || iO("graphql response status", o2.status), await this.handleError(await i_(o2, this.clientVersion));
            let s2 = await o2.json();
            if (s2.extensions && this.propagateResponseExtensions(s2.extensions), "errors" in s2) throw this.convertProtocolErrorsToClientError(s2.errors);
            return "batchResult" in s2 ? s2.batchResult : s2;
          } });
        }
        async transaction(e10, t10, r10) {
          return this.withRetry({ actionGerund: `${{ start: "starting", commit: "committing", rollback: "rolling back" }[e10]} transaction`, callback: async ({ logHttpCall: n10 }) => {
            if ("start" === e10) {
              let e11 = JSON.stringify({ max_wait: r10.maxWait, timeout: r10.timeout, isolation_level: r10.isolationLevel }), i10 = await this.url("transaction/start");
              n10(i10);
              let a2 = await iP(i10, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10.traceparent }), body: e11, clientVersion: this.clientVersion });
              await this.handleError(await i_(a2, this.clientVersion));
              let o2 = await a2.json(), { extensions: s2 } = o2;
              return s2 && this.propagateResponseExtensions(s2), { id: o2.id, payload: { endpoint: o2["data-proxy"].endpoint } };
            }
            {
              let i10 = `${r10.payload.endpoint}/${e10}`;
              n10(i10);
              let a2 = await iP(i10, { method: "POST", headers: this.headerBuilder.build({ traceparent: t10.traceparent }), clientVersion: this.clientVersion });
              await this.handleError(await i_(a2, this.clientVersion));
              let { extensions: o2 } = await a2.json();
              o2 && this.propagateResponseExtensions(o2);
              return;
            }
          } });
        }
        getURLAndAPIKey() {
          return (function(e10) {
            let t10 = { clientVersion: e10.clientVersion }, r10 = Object.keys(e10.inlineDatasources)[0], n10 = nZ({ inlineDatasources: e10.inlineDatasources, overrideDatasources: e10.overrideDatasources, clientVersion: e10.clientVersion, env: { ...e10.env, ..."u" > typeof k ? k.env : {} } }), i10;
            try {
              i10 = new URL(n10);
            } catch {
              throw new n4(`Error validating datasource \`${r10}\`: the URL must start with the protocol \`prisma://\``, t10);
            }
            let { protocol: a2, searchParams: o2 } = i10;
            if ("prisma:" !== a2 && a2 !== tN) throw new n4(`Error validating datasource \`${r10}\`: the URL must start with the protocol \`prisma://\` or \`prisma+postgres://\``, t10);
            let s2 = o2.get("api_key");
            if (null === s2 || s2.length < 1) throw new n4(`Error validating datasource \`${r10}\`: the URL must contain a valid API key`, t10);
            let l2 = !(function(e11) {
              if (!tI(e11)) return false;
              let { host: t11 } = new URL(e11);
              return t11.includes("localhost") || t11.includes("127.0.0.1") || t11.includes("[::1]");
            })(i10) ? "https:" : "http:";
            return k.env.TEST_CLIENT_ENGINE_REMOTE_EXECUTOR && i10.searchParams.has("use_http") && (l2 = "http:"), { apiKey: s2, url: new URL(i10.href.replace(a2, l2)) };
          })({ clientVersion: this.clientVersion, env: this.env, inlineDatasources: this.inlineDatasources, overrideDatasources: this.config.overrideDatasources });
        }
        metrics() {
          throw new n9("Metrics are not yet supported for Accelerate", { clientVersion: this.clientVersion });
        }
        async withRetry(e10) {
          for (let t10 = 0; ; t10++) {
            let r10 = (e11) => {
              this.logEmitter.emit("info", { message: `Calling ${e11} (n=${t10})`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            };
            try {
              return await e10.callback({ logHttpCall: r10 });
            } catch (n10) {
              if (!(n10 instanceof n1) || !n10.isRetryable) throw n10;
              if (t10 >= 3) throw n10 instanceof n8 ? n10.cause : n10;
              this.logEmitter.emit("warn", { message: `Attempt ${t10 + 1}/3 failed for ${e10.actionGerund}: ${n10.message ?? "(unknown)"}`, timestamp: /* @__PURE__ */ new Date(), target: "" });
              let r11 = await (function(e11) {
                let t11 = 50 * Math.pow(2, e11), r12 = Math.ceil(Math.random() * t11) - Math.ceil(t11 / 2), n11 = t11 + r12;
                return new Promise((e12) => setTimeout(() => e12(n11), n11));
              })(t10);
              this.logEmitter.emit("warn", { message: `Retrying after ${r11}ms`, timestamp: /* @__PURE__ */ new Date(), target: "" });
            }
          }
        }
        async handleError(e10) {
          if (e10 instanceof ie) throw await this.uploadSchema(), new n8({ clientVersion: this.clientVersion, cause: e10 });
          if (e10) throw e10;
        }
        convertProtocolErrorsToClientError(e10) {
          return 1 === e10.length ? nw(e10[0], this.config.clientVersion, this.config.activeProvider) : new tY(JSON.stringify(e10), { clientVersion: this.config.clientVersion });
        }
        applyPendingMigrations() {
          throw Error("Method not implemented.");
        }
      };
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var iN, iI = { async loadLibrary(e10) {
        let { clientVersion: t10, adapter: r10, engineWasm: n10 } = e10;
        if (void 0 === r10) throw new tK(`The \`adapter\` option for \`PrismaClient\` is required in this context (${nY().prettyName})`, t10);
        if (void 0 === n10) throw new tK("WASM engine was unexpectedly `undefined`", t10);
        return void 0 === iN && (iN = (async () => {
          let e11 = await n10.getRuntime(), r11 = await n10.getQueryEngineWasmModule();
          if (null == r11) throw new tK("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", t10);
          let i10 = new WebAssembly.Instance(r11, { "./query_engine_bg.js": e11 }), a2 = i10.exports.__wbindgen_start;
          return e11.__wbg_set_wasm(i10.exports), a2(), e11.QueryEngine;
        })()), { debugPanic: () => Promise.reject("{}"), dmmf: () => Promise.resolve("{}"), version: () => ({ commit: "unknown", version: "unknown" }), QueryEngine: await iN };
      } }, iM = t_("prisma:client:libraryEngine"), iD = 1n, i$ = class {
        name = "LibraryEngine";
        engine;
        libraryInstantiationPromise;
        libraryStartingPromise;
        libraryStoppingPromise;
        libraryStarted;
        executingQueryPromise;
        config;
        QueryEngineConstructor;
        libraryLoader;
        library;
        logEmitter;
        libQueryEnginePath;
        binaryTarget;
        datasourceOverrides;
        datamodel;
        logQueries;
        logLevel;
        lastQuery;
        loggerRustPanic;
        tracingHelper;
        adapterPromise;
        versionInfo;
        constructor(e10, t10) {
          this.libraryLoader = t10 ?? iI, this.config = e10, this.libraryStarted = false, this.logQueries = e10.logQueries ?? false, this.logLevel = e10.logLevel ?? "error", this.logEmitter = e10.logEmitter, this.datamodel = e10.inlineSchema, this.tracingHelper = e10.tracingHelper, e10.enableDebugLogs && (this.logLevel = "debug");
          let r10 = Object.keys(e10.overrideDatasources)[0], n10 = e10.overrideDatasources[r10]?.url;
          void 0 !== r10 && void 0 !== n10 && (this.datasourceOverrides = { [r10]: n10 }), this.libraryInstantiationPromise = this.instantiateLibrary();
        }
        wrapEngine(e10) {
          return { applyPendingMigrations: e10.applyPendingMigrations?.bind(e10), commitTransaction: this.withRequestId(e10.commitTransaction.bind(e10)), connect: this.withRequestId(e10.connect.bind(e10)), disconnect: this.withRequestId(e10.disconnect.bind(e10)), metrics: e10.metrics?.bind(e10), query: this.withRequestId(e10.query.bind(e10)), rollbackTransaction: this.withRequestId(e10.rollbackTransaction.bind(e10)), sdlSchema: e10.sdlSchema?.bind(e10), startTransaction: this.withRequestId(e10.startTransaction.bind(e10)), trace: e10.trace.bind(e10), free: e10.free?.bind(e10) };
        }
        withRequestId(e10) {
          return async (...t10) => {
            let r10, n10 = (r10 = iD++, iD > 0xffffffffffffffffn && (iD = 1n), r10).toString();
            try {
              return await e10(...t10, n10);
            } finally {
              if (this.tracingHelper.isEnabled()) {
                let e11 = await this.engine?.trace(n10);
                if (e11) {
                  let t11 = JSON.parse(e11);
                  this.tracingHelper.dispatchEngineSpans(t11.spans);
                }
              }
            }
          };
        }
        async applyPendingMigrations() {
          throw Error("Cannot call this method from this type of engine instance");
        }
        async transaction(e10, t10, r10) {
          var n10;
          await this.start();
          let i10 = await this.adapterPromise, a2 = JSON.stringify(t10), o2;
          if ("start" === e10) {
            let e11 = JSON.stringify({ max_wait: r10.maxWait, timeout: r10.timeout, isolation_level: r10.isolationLevel });
            o2 = await this.engine?.startTransaction(e11, a2);
          } else "commit" === e10 ? o2 = await this.engine?.commitTransaction(r10.id, a2) : "rollback" === e10 && (o2 = await this.engine?.rollbackTransaction(r10.id, a2));
          let s2 = this.parseEngineResponse(o2);
          if ("object" == typeof (n10 = s2) && null !== n10 && void 0 !== n10.error_code) {
            let e11 = this.getExternalAdapterError(s2, i10?.errorRegistry);
            throw e11 ? e11.error : new tQ(s2.message, { code: s2.error_code, clientVersion: this.config.clientVersion, meta: s2.meta });
          }
          if ("string" == typeof s2.message) throw new tY(s2.message, { clientVersion: this.config.clientVersion });
          return s2;
        }
        async instantiateLibrary() {
          if (iM("internalSetup"), this.libraryInstantiationPromise) return this.libraryInstantiationPromise;
          this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
        }
        async getCurrentBinaryTarget() {
        }
        parseEngineResponse(e10) {
          if (!e10) throw new tY("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
          try {
            return JSON.parse(e10);
          } catch {
            throw new tY("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
          }
        }
        async loadEngine() {
          if (!this.engine) {
            this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
            try {
              let e10 = new M(this);
              this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tC));
              let t10 = await this.adapterPromise;
              t10 && iM("Using driver adapter: %O", t10), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: k.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (t11) => {
                e10.deref()?.logger(t11);
              }, t10));
            } catch (t10) {
              let e10 = this.parseInitError(t10.message);
              throw "string" == typeof e10 ? t10 : new tK(e10.message, this.config.clientVersion, e10.error_code);
            }
          }
        }
        logger(e10) {
          let t10 = this.parseEngineResponse(e10);
          t10 && (t10.level = t10?.level.toLowerCase() ?? "unknown", "query" === t10.item_type && "query" in t10 ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: t10.query, params: t10.params, duration: Number(t10.duration_ms), target: t10.module_path }) : ("level" in t10 && "error" === t10.level && t10.message, this.logEmitter.emit(t10.level, { timestamp: /* @__PURE__ */ new Date(), message: t10.message, target: t10.module_path })));
        }
        parseInitError(e10) {
          try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
        parseRequestError(e10) {
          try {
            return JSON.parse(e10);
          } catch {
          }
          return e10;
        }
        onBeforeExit() {
          throw Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
        }
        async start() {
          if (this.libraryInstantiationPromise || (this.libraryInstantiationPromise = this.instantiateLibrary()), await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise) return iM(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
          if (this.libraryStarted) return;
          let e10 = async () => {
            iM("library starting");
            try {
              let e11 = { traceparent: this.tracingHelper.getTraceParent() };
              await this.engine?.connect(JSON.stringify(e11)), this.libraryStarted = true, this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(tC)), await this.adapterPromise, iM("library started");
            } catch (t10) {
              let e11 = this.parseInitError(t10.message);
              throw "string" == typeof e11 ? t10 : new tK(e11.message, this.config.clientVersion, e11.error_code);
            } finally {
              this.libraryStartingPromise = void 0;
            }
          };
          return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e10), this.libraryStartingPromise;
        }
        async stop() {
          if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise) return iM("library is already stopping"), this.libraryStoppingPromise;
          if (!this.libraryStarted) {
            await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0;
            return;
          }
          let e10 = async () => {
            await new Promise((e12) => setImmediate(e12)), iM("library stopping");
            let e11 = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.disconnect(JSON.stringify(e11)), this.engine?.free && this.engine.free(), this.engine = void 0, this.libraryStarted = false, this.libraryStoppingPromise = void 0, this.libraryInstantiationPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, iM("library stopped");
          };
          return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e10), this.libraryStoppingPromise;
        }
        version() {
          return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
        }
        debugPanic(e10) {
          return this.library?.debugPanic(e10);
        }
        async request(e10, { traceparent: t10, interactiveTransaction: r10 }) {
          iM(`sending request, this.libraryStarted: ${this.libraryStarted}`);
          let n10 = JSON.stringify({ traceparent: t10 }), i10 = JSON.stringify(e10);
          try {
            await this.start();
            let e11 = await this.adapterPromise;
            this.executingQueryPromise = this.engine?.query(i10, n10, r10?.id), this.lastQuery = i10;
            let t11 = this.parseEngineResponse(await this.executingQueryPromise);
            if (t11.errors) throw 1 === t11.errors.length ? this.buildQueryError(t11.errors[0], e11?.errorRegistry) : new tY(JSON.stringify(t11.errors), { clientVersion: this.config.clientVersion });
            if (this.loggerRustPanic) throw this.loggerRustPanic;
            return { data: t11 };
          } catch (t11) {
            if (t11 instanceof tK) throw t11;
            "GenericFailure" === t11.code && t11.message?.startsWith("PANIC:");
            let e11 = this.parseRequestError(t11.message);
            throw "string" == typeof e11 ? t11 : new tY(`${e11.message}
${e11.backtrace}`, { clientVersion: this.config.clientVersion });
          }
        }
        async requestBatch(e10, { transaction: t10, traceparent: r10 }) {
          iM("requestBatch");
          let n10 = nv(e10, t10);
          await this.start();
          let i10 = await this.adapterPromise;
          this.lastQuery = JSON.stringify(n10), this.executingQueryPromise = this.engine?.query(this.lastQuery, JSON.stringify({ traceparent: r10 }), (function(e11) {
            if (e11?.kind === "itx") return e11.options.id;
          })(t10));
          let a2 = await this.executingQueryPromise, o2 = this.parseEngineResponse(a2);
          if (o2.errors) throw 1 === o2.errors.length ? this.buildQueryError(o2.errors[0], i10?.errorRegistry) : new tY(JSON.stringify(o2.errors), { clientVersion: this.config.clientVersion });
          let { batchResult: s2, errors: l2 } = o2;
          if (Array.isArray(s2)) return s2.map((e11) => e11.errors && e11.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(e11.errors[0], i10?.errorRegistry) : { data: e11 });
          throw l2 && 1 === l2.length ? Error(l2[0].error) : Error(JSON.stringify(o2));
        }
        buildQueryError(e10, t10) {
          e10.user_facing_error.is_panic;
          let r10 = this.getExternalAdapterError(e10.user_facing_error, t10);
          return r10 ? r10.error : nw(e10, this.config.clientVersion, this.config.activeProvider);
        }
        getExternalAdapterError(e10, t10) {
          if ("P2036" === e10.error_code && t10) {
            let r10 = e10.meta?.id;
            tV("number" == typeof r10, "Malformed external JS error received from the engine");
            let n10 = t10.consumeError(r10);
            return tV(n10, "External error with reported id was not registered"), n10;
          }
        }
        async metrics(e10) {
          await this.start();
          let t10 = await this.engine.metrics(JSON.stringify(e10));
          return "prometheus" === e10.format ? t10 : this.parseEngineResponse(t10);
        }
      };
      D(), $(), L(), j(), q(), ew();
      var iL = class {
        constructor(e10) {
          return new Proxy(this, { get(t10, r10) {
            throw new tZ(`In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters`, e10);
          } });
        }
      };
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var ij = (e10) => ({ command: e10 });
      function iq(e10) {
        try {
          return iU(e10, "fast");
        } catch {
          return iU(e10, "slow");
        }
      }
      function iU(e10, t10) {
        return JSON.stringify(e10.map((e11) => (function e12(t11, r10) {
          var n10;
          if (Array.isArray(t11)) return t11.map((t12) => e12(t12, r10));
          if ("bigint" == typeof t11) return { prisma__type: "bigint", prisma__value: t11.toString() };
          if (t6(t11)) return { prisma__type: "date", prisma__value: t11.toJSON() };
          if (eb.isDecimal(t11)) return { prisma__type: "decimal", prisma__value: t11.toJSON() };
          if (C.isBuffer(t11)) return { prisma__type: "bytes", prisma__value: t11.toString("base64") };
          if ((n10 = t11) instanceof ArrayBuffer || n10 instanceof SharedArrayBuffer || "object" == typeof n10 && null !== n10 && ("ArrayBuffer" === n10[Symbol.toStringTag] || "SharedArrayBuffer" === n10[Symbol.toStringTag])) return { prisma__type: "bytes", prisma__value: C.from(t11).toString("base64") };
          if (ArrayBuffer.isView(t11)) {
            let { buffer: e13, byteOffset: r11, byteLength: n11 } = t11;
            return { prisma__type: "bytes", prisma__value: C.from(e13, r11, n11).toString("base64") };
          }
          return "object" == typeof t11 && "slow" === r10 ? iF(t11) : t11;
        })(e11, t10)));
      }
      function iF(e10) {
        if ("object" != typeof e10 || null === e10) return e10;
        if ("function" == typeof e10.toJSON) return e10.toJSON();
        if (Array.isArray(e10)) return e10.map(iV);
        let t10 = {};
        for (let r10 of Object.keys(e10)) t10[r10] = iV(e10[r10]);
        return t10;
      }
      function iV(e10) {
        return "bigint" == typeof e10 ? e10.toString() : iF(e10);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), ew();
      var iB = /^(\s*alter\s)/i, iH = t_("prisma:client");
      function iG(e10, t10, r10, n10) {
        if (("postgresql" === e10 || "cockroachdb" === e10) && r10.length > 0 && iB.exec(t10)) throw Error(`Running ALTER using ${n10} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
      }
      var iW = ({ clientMethod: e10, activeProvider: t10 }) => (r10) => {
        let n10 = "", i10;
        if (nn(r10)) n10 = r10.sql, i10 = { values: iq(r10.values), __prismaRawParameters__: true };
        else if (Array.isArray(r10)) {
          let [e11, ...t11] = r10;
          n10 = e11, i10 = { values: iq(t11 || []), __prismaRawParameters__: true };
        } else switch (t10) {
          case "sqlite":
          case "mysql":
            n10 = r10.sql, i10 = { values: iq(r10.values), __prismaRawParameters__: true };
            break;
          case "cockroachdb":
          case "postgresql":
          case "postgres":
            n10 = r10.text, i10 = { values: iq(r10.values), __prismaRawParameters__: true };
            break;
          case "sqlserver":
            n10 = r10.strings.reduce((e11, t11, r11) => `${e11}@P${r11}${t11}`), i10 = { values: iq(r10.values), __prismaRawParameters__: true };
            break;
          default:
            throw Error(`The ${t10} provider does not support ${e10}`);
        }
        return i10?.values ? iH(`prisma.${e10}(${n10}, ${i10.values})`) : iH(`prisma.${e10}(${n10})`), { query: n10, parameters: i10 };
      }, iJ = { requestArgsToMiddlewareArgs: (e10) => [e10.strings, ...e10.values], middlewareArgsToRequestArgs(e10) {
        let [t10, ...r10] = e10;
        return new na(t10, r10);
      } }, iz = { requestArgsToMiddlewareArgs: (e10) => [e10], middlewareArgsToRequestArgs: (e10) => e10[0] };
      function iK(e10) {
        return function(t10, r10) {
          let n10, i10 = (r11 = e10) => {
            try {
              return void 0 === r11 || r11?.kind === "itx" ? n10 ??= iQ(t10(r11)) : iQ(t10(r11));
            } catch (e11) {
              return Promise.reject(e11);
            }
          };
          return { get spec() {
            return r10;
          }, then: (e11, t11) => i10().then(e11, t11), catch: (e11) => i10().catch(e11), finally: (e11) => i10().finally(e11), requestTransaction(e11) {
            let t11 = i10(e11);
            return t11.requestTransaction ? t11.requestTransaction(e11) : t11;
          }, [Symbol.toStringTag]: "PrismaPromise" };
        };
      }
      function iQ(e10) {
        return "function" == typeof e10.then ? e10 : Promise.resolve(e10);
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var iX = tE.split(".")[0], iY = { isEnabled: () => false, getTraceParent: () => "00-10-10-00", dispatchEngineSpans() {
      }, getActiveContext() {
      }, runInChildSpan: (e10, t10) => t10() }, iZ = class {
        isEnabled() {
          return this.getGlobalTracingHelper().isEnabled();
        }
        getTraceParent(e10) {
          return this.getGlobalTracingHelper().getTraceParent(e10);
        }
        dispatchEngineSpans(e10) {
          return this.getGlobalTracingHelper().dispatchEngineSpans(e10);
        }
        getActiveContext() {
          return this.getGlobalTracingHelper().getActiveContext();
        }
        runInChildSpan(e10, t10) {
          return this.getGlobalTracingHelper().runInChildSpan(e10, t10);
        }
        getGlobalTracingHelper() {
          let e10 = globalThis[`V${iX}_PRISMA_INSTRUMENTATION`], t10 = globalThis.PRISMA_INSTRUMENTATION;
          return e10?.helper ?? t10?.helper ?? iY;
        }
      };
      function i0(e10) {
        return "number" == typeof e10.batchRequestIdx;
      }
      function i1(e10) {
        return `(${Object.keys(e10).sort().map((t10) => {
          let r10 = e10[t10];
          return "object" == typeof r10 && null !== r10 ? `(${t10} ${i1(r10)})` : t10;
        }).join(" ")})`;
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var i2 = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
      D(), $(), L(), j(), q(), ew();
      var i4 = class {
        constructor(e10) {
          this.options = e10, this.batches = {};
        }
        batches;
        tickActive = false;
        request(e10) {
          let t10 = this.options.batchBy(e10);
          return t10 ? (this.batches[t10] || (this.batches[t10] = [], this.tickActive || (this.tickActive = true, k.nextTick(() => {
            this.dispatchBatches(), this.tickActive = false;
          }))), new Promise((r10, n10) => {
            this.batches[t10].push({ request: e10, resolve: r10, reject: n10 });
          })) : this.options.singleLoader(e10);
        }
        dispatchBatches() {
          for (let e10 in this.batches) {
            let t10 = this.batches[e10];
            delete this.batches[e10], 1 === t10.length ? this.options.singleLoader(t10[0].request).then((e11) => {
              e11 instanceof Error ? t10[0].reject(e11) : t10[0].resolve(e11);
            }).catch((e11) => {
              t10[0].reject(e11);
            }) : (t10.sort((e11, t11) => this.options.batchOrder(e11.request, t11.request)), this.options.batchLoader(t10.map((e11) => e11.request)).then((e11) => {
              if (e11 instanceof Error) for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
              else for (let r10 = 0; r10 < t10.length; r10++) {
                let n10 = e11[r10];
                n10 instanceof Error ? t10[r10].reject(n10) : t10[r10].resolve(n10);
              }
            }).catch((e11) => {
              for (let r10 = 0; r10 < t10.length; r10++) t10[r10].reject(e11);
            }));
          }
        }
        get [Symbol.toStringTag]() {
          return "DataLoader";
        }
      };
      function i3(e10) {
        let t10 = [], r10 = (function(e11) {
          let t11 = {};
          for (let r11 = 0; r11 < e11.columns.length; r11++) t11[e11.columns[r11]] = null;
          return t11;
        })(e10);
        for (let n10 = 0; n10 < e10.rows.length; n10++) {
          let i10 = e10.rows[n10], a2 = { ...r10 };
          for (let t11 = 0; t11 < i10.length; t11++) a2[e10.columns[t11]] = (function e11(t12, r11) {
            if (null === r11) return r11;
            switch (t12) {
              case "bigint":
                return BigInt(r11);
              case "bytes": {
                let { buffer: e12, byteOffset: t13, byteLength: n11 } = C.from(r11, "base64");
                return new Uint8Array(e12, t13, n11);
              }
              case "decimal":
                return new eb(r11);
              case "datetime":
              case "date":
                return new Date(r11);
              case "time":
                return /* @__PURE__ */ new Date(`1970-01-01T${r11}Z`);
              case "bigint-array":
                return r11.map((t13) => e11("bigint", t13));
              case "bytes-array":
                return r11.map((t13) => e11("bytes", t13));
              case "decimal-array":
                return r11.map((t13) => e11("decimal", t13));
              case "datetime-array":
                return r11.map((t13) => e11("datetime", t13));
              case "date-array":
                return r11.map((t13) => e11("date", t13));
              case "time-array":
                return r11.map((t13) => e11("time", t13));
              default:
                return r11;
            }
          })(e10.types[t11], i10[t11]);
          t10.push(a2);
        }
        return t10;
      }
      D(), $(), L(), j(), q(), ew(), ew();
      var i6 = t_("prisma:client:request_handler"), i5 = class {
        client;
        dataloader;
        logEmitter;
        constructor(e10, t10) {
          var r10;
          this.logEmitter = t10, this.client = e10, this.dataloader = new i4({ batchLoader: (r10 = async ({ requests: e11, customDataProxyFetch: t11 }) => {
            let { transaction: r11, otelParentCtx: n10 } = e11[0], i10 = e11.map((e12) => e12.protocolQuery), a2 = this.client._tracingHelper.getTraceParent(n10), o2 = e11.some((e12) => i2[e12.protocolQuery.action]);
            return (await this.client._engine.requestBatch(i10, { traceparent: a2, transaction: (function(e12) {
              if (e12) {
                if ("batch" === e12.kind) return { kind: "batch", options: { isolationLevel: e12.isolationLevel } };
                if ("itx" === e12.kind) return { kind: "itx", options: i8(e12) };
                tB(e12, "Unknown transaction kind");
              }
            })(r11), containsWrite: o2, customDataProxyFetch: t11 })).map((t12, r12) => {
              if (t12 instanceof Error) return t12;
              try {
                return this.mapQueryEngineResult(e11[r12], t12);
              } catch (e12) {
                return e12;
              }
            });
          }, (e11) => {
            let t11 = { requests: e11 }, n10 = e11[0].extensions.getAllBatchQueryCallbacks();
            return n10.length ? (function e12(t12, r11, n11, i10) {
              if (n11 === r11.length) return i10(t12);
              let a2 = t12.customDataProxyFetch, o2 = t12.requests[0].transaction;
              return r11[n11]({ args: { queries: t12.requests.map((e13) => ({ model: e13.modelName, operation: e13.action, args: e13.args })), transaction: o2 ? { isolationLevel: "batch" === o2.kind ? o2.isolationLevel : void 0 } : void 0 }, __internalParams: t12, query(o3, s2 = t12) {
                let l2 = s2.customDataProxyFetch;
                return s2.customDataProxyFetch = nF(a2, l2), e12(s2, r11, n11 + 1, i10);
              } });
            })(t11, n10, 0, r10) : r10(t11);
          }), singleLoader: async (e11) => {
            let t11 = e11.transaction?.kind === "itx" ? i8(e11.transaction) : void 0, r11 = await this.client._engine.request(e11.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: t11, isWrite: i2[e11.protocolQuery.action], customDataProxyFetch: e11.customDataProxyFetch });
            return this.mapQueryEngineResult(e11, r11);
          }, batchBy: (e11) => e11.transaction?.id ? `transaction-${e11.transaction.id}` : (function(e12) {
            if ("findUnique" !== e12.action && "findUniqueOrThrow" !== e12.action) return;
            let t11 = [];
            return e12.modelName && t11.push(e12.modelName), e12.query.arguments && t11.push(i1(e12.query.arguments)), t11.push(i1(e12.query.selection)), t11.join("");
          })(e11.protocolQuery), batchOrder: (e11, t11) => e11.transaction?.kind === "batch" && t11.transaction?.kind === "batch" ? e11.transaction.index - t11.transaction.index : 0 });
        }
        async request(e10) {
          try {
            return await this.dataloader.request(e10);
          } catch (o2) {
            let { clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2 } = e10;
            this.handleAndLogRequestError({ error: o2, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2, globalOmit: e10.globalOmit });
          }
        }
        mapQueryEngineResult({ dataPath: e10, unpacker: t10 }, r10) {
          let n10 = r10?.data, i10 = this.unpack(n10, e10, t10);
          return k.env.PRISMA_CLIENT_GET_TIME ? { data: i10 } : i10;
        }
        handleAndLogRequestError(e10) {
          try {
            this.handleRequestError(e10);
          } catch (t10) {
            throw this.logEmitter && this.logEmitter.emit("error", { message: t10.message, target: e10.clientMethod, timestamp: /* @__PURE__ */ new Date() }), t10;
          }
        }
        handleRequestError({ error: e10, clientMethod: t10, callsite: r10, transaction: n10, args: i10, modelName: a2, globalOmit: o2 }) {
          var s2, l2, c2;
          if (i6(e10), s2 = e10, l2 = n10, i0(s2) && l2?.kind === "batch" && s2.batchRequestIdx !== l2.index) throw e10;
          e10 instanceof tQ && ("P2009" === (c2 = e10).code || "P2012" === c2.code) && rB({ args: i10, errors: [(function e11(t11) {
            if ("Union" === t11.kind) return { kind: "Union", errors: t11.errors.map(e11) };
            if (Array.isArray(t11.selectionPath)) {
              let [, ...e12] = t11.selectionPath;
              return { ...t11, selectionPath: e12 };
            }
            return t11;
          })(e10.meta)], callsite: r10, errorFormat: this.client._errorFormat, originalMethod: t10, clientVersion: this.client._clientVersion, globalOmit: o2 });
          let u2 = e10.message;
          if (r10 && (u2 = rn({ callsite: r10, originalMethod: t10, isPanic: e10.isPanic, showColors: "pretty" === this.client._errorFormat, message: u2 })), u2 = this.sanitizeMessage(u2), e10.code) {
            let t11 = a2 ? { modelName: a2, ...e10.meta } : e10.meta;
            throw new tQ(u2, { code: e10.code, clientVersion: this.client._clientVersion, meta: t11, batchRequestIdx: e10.batchRequestIdx });
          }
          if (e10.isPanic) throw new tX(u2, this.client._clientVersion);
          if (e10 instanceof tY) throw new tY(u2, { clientVersion: this.client._clientVersion, batchRequestIdx: e10.batchRequestIdx });
          if (e10 instanceof tK) throw new tK(u2, this.client._clientVersion);
          if (e10 instanceof tX) throw new tX(u2, this.client._clientVersion);
          throw e10.clientVersion = this.client._clientVersion, e10;
        }
        sanitizeMessage(e10) {
          return this.client._errorFormat && "pretty" !== this.client._errorFormat ? (function(e11) {
            if ("string" != typeof e11) throw TypeError(`Expected a \`string\`, got \`${typeof e11}\``);
            return e11.replace(tH, "");
          })(e10) : e10;
        }
        unpack(e10, t10, r10) {
          if (!e10 || (e10.data && (e10 = e10.data), !e10)) return e10;
          let n10 = Object.keys(e10)[0], i10 = nC(Object.values(e10)[0], t10.filter((e11) => "select" !== e11 && "include" !== e11)), a2 = "queryRaw" === n10 ? i3(i10) : nH(i10);
          return r10 ? r10(a2) : a2;
        }
        get [Symbol.toStringTag]() {
          return "RequestHandler";
        }
      };
      function i8(e10) {
        return { id: e10.id, payload: e10.payload };
      }
      D(), $(), L(), j(), q(), ew(), D(), $(), L(), j(), q(), ew();
      var i9 = f(eZ());
      D(), $(), L(), j(), q(), ew();
      var i7 = class extends Error {
        constructor(e10) {
          super(e10 + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
        }
        get [Symbol.toStringTag]() {
          return "PrismaClientConstructorValidationError";
        }
      };
      tW(i7, "PrismaClientConstructorValidationError");
      var ae = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"], at = ["pretty", "colorless", "minimal"], ar = ["info", "query", "warn", "error"], an = { datasources: (e10, { datasourceNames: t10 }) => {
        if (e10) {
          if ("object" != typeof e10 || Array.isArray(e10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for "datasources" provided to PrismaClient constructor`);
          for (let [r10, n10] of Object.entries(e10)) {
            if (!t10.includes(r10)) {
              let e11 = ai(r10, t10) || ` Available datasources: ${t10.join(", ")}`;
              throw new i7(`Unknown datasource ${r10} provided to PrismaClient constructor.${e11}`);
            }
            if ("object" != typeof n10 || Array.isArray(n10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            if (n10 && "object" == typeof n10) for (let [t11, i10] of Object.entries(n10)) {
              if ("url" !== t11) throw new i7(`Invalid value ${JSON.stringify(e10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if ("string" != typeof i10) throw new i7(`Invalid value ${JSON.stringify(i10)} for datasource "${r10}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
          }
        }
      }, adapter: (e10, t10) => {
        if (!e10 && "client" === tS(t10.generator)) throw new i7('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
        if (null !== e10) {
          if (void 0 === e10) throw new i7('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
          if ("binary" === tS(t10.generator)) throw new i7('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
        }
      }, datasourceUrl: (e10) => {
        if ("u" > typeof e10 && "string" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
      }, errorFormat: (e10) => {
        if (e10) {
          if ("string" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "errorFormat" provided to PrismaClient constructor.`);
          if (!at.includes(e10)) {
            let t10 = ai(e10, at);
            throw new i7(`Invalid errorFormat ${e10} provided to PrismaClient constructor.${t10}`);
          }
        }
      }, log: (e10) => {
        if (e10) {
          if (!Array.isArray(e10)) throw new i7(`Invalid value ${JSON.stringify(e10)} for "log" provided to PrismaClient constructor.`);
          for (let r10 of e10) {
            t10(r10);
            let e11 = { level: t10, emit: (e12) => {
              let t11 = ["stdout", "event"];
              if (!t11.includes(e12)) {
                let r11 = ai(e12, t11);
                throw new i7(`Invalid value ${JSON.stringify(e12)} for "emit" in logLevel provided to PrismaClient constructor.${r11}`);
              }
            } };
            if (r10 && "object" == typeof r10) for (let [t11, n10] of Object.entries(r10)) if (e11[t11]) e11[t11](n10);
            else throw new i7(`Invalid property ${t11} for "log" provided to PrismaClient constructor`);
          }
        }
        function t10(e11) {
          if ("string" == typeof e11 && !ar.includes(e11)) {
            let t11 = ai(e11, ar);
            throw new i7(`Invalid log level "${e11}" provided to PrismaClient constructor.${t11}`);
          }
        }
      }, transactionOptions: (e10) => {
        if (!e10) return;
        let t10 = e10.maxWait;
        if (null != t10 && t10 <= 0) throw new i7(`Invalid value ${t10} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
        let r10 = e10.timeout;
        if (null != r10 && r10 <= 0) throw new i7(`Invalid value ${r10} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
      }, omit: (e10, t10) => {
        if ("object" != typeof e10) throw new i7('"omit" option is expected to be an object.');
        if (null === e10) throw new i7('"omit" option can not be `null`');
        let r10 = [];
        for (let [a2, o2] of Object.entries(e10)) {
          var n10, i10;
          let e11 = (n10 = a2, aa((i10 = t10.runtimeDataModel).models, n10) ?? aa(i10.types, n10));
          if (!e11) {
            r10.push({ kind: "UnknownModel", modelKey: a2 });
            continue;
          }
          for (let [t11, n11] of Object.entries(o2)) {
            let i11 = e11.fields.find((e12) => e12.name === t11);
            if (!i11) {
              r10.push({ kind: "UnknownField", modelKey: a2, fieldName: t11 });
              continue;
            }
            if (i11.relationName) {
              r10.push({ kind: "RelationInOmit", modelKey: a2, fieldName: t11 });
              continue;
            }
            "boolean" != typeof n11 && r10.push({ kind: "InvalidFieldValue", modelKey: a2, fieldName: t11 });
          }
        }
        if (r10.length > 0) throw new i7((function(e11, t11) {
          let r11 = rU(e11);
          for (let e12 of t11) switch (e12.kind) {
            case "UnknownModel":
              r11.arguments.getField(e12.modelKey)?.markAsError(), r11.addErrorMessage(() => `Unknown model name: ${e12.modelKey}.`);
              break;
            case "UnknownField":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => `Model "${e12.modelKey}" does not have a field named "${e12.fieldName}".`);
              break;
            case "RelationInOmit":
              r11.arguments.getDeepField([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
              break;
            case "InvalidFieldValue":
              r11.arguments.getDeepFieldValue([e12.modelKey, e12.fieldName])?.markAsError(), r11.addErrorMessage(() => "Omit field option value must be a boolean.");
          }
          let { message: n11, args: i11 } = rV(r11, "colorless");
          return `Error validating "omit" option:

${i11}

${n11}`;
        })(e10, r10));
      }, __internal: (e10) => {
        if (!e10) return;
        let t10 = ["debug", "engine", "configOverride"];
        if ("object" != typeof e10) throw new i7(`Invalid value ${JSON.stringify(e10)} for "__internal" to PrismaClient constructor`);
        for (let [r10] of Object.entries(e10)) if (!t10.includes(r10)) {
          let e11 = ai(r10, t10);
          throw new i7(`Invalid property ${JSON.stringify(r10)} for "__internal" provided to PrismaClient constructor.${e11}`);
        }
      } };
      function ai(e10, t10) {
        if (0 === t10.length || "string" != typeof e10) return "";
        let r10 = (function(e11, t11) {
          if (0 === t11.length) return null;
          let r11 = t11.map((t12) => ({ value: t12, distance: (0, i9.default)(e11, t12) }));
          r11.sort((e12, t12) => e12.distance < t12.distance ? -1 : 1);
          let n10 = r11[0];
          return n10.distance < 3 ? n10.value : null;
        })(e10, t10);
        return r10 ? ` Did you mean "${r10}"?` : "";
      }
      function aa(e10, t10) {
        let r10 = Object.keys(e10).find((e11) => t1(e11) === t10);
        if (r10) return e10[r10];
      }
      D(), $(), L(), j(), q(), ew();
      var ao = t_("prisma:client");
      "object" == typeof globalThis && (globalThis.NODE_CLIENT = true);
      var as = { requestArgsToMiddlewareArgs: (e10) => e10, middlewareArgsToRequestArgs: (e10) => e10 }, al = /* @__PURE__ */ Symbol.for("prisma.client.transaction.id"), ac = { id: 0, nextId() {
        return ++this.id;
      } };
      function au(e10) {
        class t10 {
          _originalClient = this;
          _runtimeDataModel;
          _requestHandler;
          _connectionPromise;
          _disconnectionPromise;
          _engineConfig;
          _accelerateEngineConfig;
          _clientVersion;
          _errorFormat;
          _tracingHelper;
          _previewFeatures;
          _activeProvider;
          _globalOmit;
          _extensions;
          _engine;
          _appliedParent;
          _createPrismaPromise = iK();
          constructor(t11) {
            let r10;
            (function({ postinstall: e11, ciName: t12, clientVersion: r11, generator: n11 }) {
              if (nV("checkPlatformCaching:postinstall", e11), nV("checkPlatformCaching:ciName", t12), true === e11 && !(n11?.output && "string" == typeof (n11.output.fromEnvVar ?? n11.output.value)) && t12 && t12 in nB) {
                let e12 = `Prisma has detected that this project was built on ${t12}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${nB[t12]}-build`;
                throw console.error(e12), new tK(e12, r11);
              }
            })(e10 = t11?.__internal?.configOverride?.(e10) ?? e10), t11 && (function(e11, t12) {
              for (let [r11, n11] of Object.entries(e11)) {
                if (!ae.includes(r11)) {
                  let e12 = ai(r11, ae);
                  throw new i7(`Unknown property ${r11} provided to PrismaClient constructor.${e12}`);
                }
                an[r11](n11, t12);
              }
              if (e11.datasourceUrl && e11.datasources) throw new i7('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
            })(t11, e10);
            let n10 = new ez().on("error", () => {
            });
            if (this._extensions = rJ.empty(), this._previewFeatures = (function({ generator: e11 }) {
              return e11?.previewFeatures ?? [];
            })(e10), this._clientVersion = e10.clientVersion ?? "6.19.3", this._activeProvider = e10.activeProvider, this._globalOmit = t11?.omit, this._tracingHelper = new iZ(), e10.relativeEnvPaths && (e10.relativeEnvPaths.rootEnvPath && eJ.resolve(e10.dirname, e10.relativeEnvPaths.rootEnvPath), e10.relativeEnvPaths.schemaEnvPath && eJ.resolve(e10.dirname, e10.relativeEnvPaths.schemaEnvPath)), t11?.adapter) {
              r10 = t11.adapter;
              let n11 = "postgresql" === e10.activeProvider || "cockroachdb" === e10.activeProvider ? "postgres" : e10.activeProvider;
              if (r10.provider !== n11) throw new tK(`The Driver Adapter \`${r10.adapterName}\`, based on \`${r10.provider}\`, is not compatible with the provider \`${n11}\` specified in the Prisma schema.`, this._clientVersion);
              if (t11.datasources || void 0 !== t11.datasourceUrl) throw new tK("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
            }
            let i10 = e10.injectableEdgeEnv?.();
            try {
              var a2, o2;
              let s2 = t11 ?? {}, l2 = s2.__internal ?? {}, c2 = true === l2.debug;
              c2 && t_.enable("prisma:client");
              let u2 = eJ.resolve(e10.dirname, e10.relativePath);
              ej.existsSync(u2) || (u2 = e10.dirname), ao("dirname", e10.dirname), ao("relativePath", e10.relativePath), ao("cwd", u2);
              let d2 = l2.engine || {};
              if (s2.errorFormat ? this._errorFormat = s2.errorFormat : "production" === k.env.NODE_ENV ? this._errorFormat = "minimal" : (k.env.NO_COLOR, this._errorFormat = "colorless"), this._runtimeDataModel = e10.runtimeDataModel, this._engineConfig = { cwd: u2, dirname: e10.dirname, enableDebugLogs: c2, allowTriggerPanic: d2.allowTriggerPanic, prismaPath: d2.binaryPath ?? void 0, engineEndpoint: d2.endpoint, generator: e10.generator, showColors: "pretty" === this._errorFormat, logLevel: s2.log && (a2 = s2.log, "string" == typeof a2 ? a2 : a2.reduce((e11, t12) => {
                let r11 = "string" == typeof t12 ? t12 : t12.level;
                return "query" === r11 ? e11 : e11 && ("info" === t12 || "info" === e11) ? "info" : r11;
              }, void 0)), logQueries: s2.log && !!("string" == typeof s2.log ? "query" === s2.log : s2.log.find((e11) => "string" == typeof e11 ? "query" === e11 : "query" === e11.level)), env: i10?.parsed ?? {}, flags: [], engineWasm: e10.engineWasm, compilerWasm: e10.compilerWasm, clientVersion: e10.clientVersion, engineVersion: e10.engineVersion, previewFeatures: this._previewFeatures, activeProvider: e10.activeProvider, inlineSchema: e10.inlineSchema, overrideDatasources: (o2 = e10.datasourceNames, s2 ? s2.datasources ? s2.datasources : s2.datasourceUrl ? { [o2[0]]: { url: s2.datasourceUrl } } : {} : {}), inlineDatasources: e10.inlineDatasources, inlineSchemaHash: e10.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: s2.transactionOptions?.maxWait ?? 2e3, timeout: s2.transactionOptions?.timeout ?? 5e3, isolationLevel: s2.transactionOptions?.isolationLevel }, logEmitter: n10, isBundled: e10.isBundled, adapter: r10 }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: nZ, getBatchRequestPayload: nv, prismaGraphQLToJSError: nw, PrismaClientUnknownRequestError: tY, PrismaClientInitializationError: tK, PrismaClientKnownRequestError: tQ, debug: t_("prisma:client:accelerateEngine"), engineVersion: ni.version, clientVersion: e10.clientVersion } }, ao("clientVersion", e10.clientVersion), this._engine = (function({ copyEngine: e11 = true }, t12) {
                let r11;
                try {
                  r11 = nZ({ inlineDatasources: t12.inlineDatasources, overrideDatasources: t12.overrideDatasources, env: { ...t12.env, ...k.env }, clientVersion: t12.clientVersion });
                } catch {
                }
                let { ok: n11, isUsing: i11, diagnostics: a3 } = (function({ url: e12, adapter: t13, copyEngine: r12, targetBuildType: n12 }) {
                  let i12 = [], a4 = [], o3 = (e13) => {
                    let t14 = e13.join(`
`);
                    a4.push({ _tag: "error", value: t14 });
                  }, s3 = !!e12?.startsWith("prisma://"), l3 = tI(e12), c3 = !!t13, u3 = s3 || l3;
                  !c3 && r12 && u3 && "client" !== n12 && "wasm-compiler-edge" !== n12 && i12.push({ _tag: "warning", value: ["recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)"] });
                  let d3 = u3 || !r12;
                  c3 && (d3 || "edge" === n12) && ("edge" === n12 ? o3(["Prisma Client was configured to use the `adapter` option but it was imported via its `/edge` endpoint.", "Please either remove the `/edge` endpoint or remove the `adapter` from the Prisma Client constructor."]) : u3 ? o3(["You've provided both a driver adapter and an Accelerate database URL. Driver adapters currently cannot connect to Accelerate.", "Please provide either a driver adapter with a direct database URL or an Accelerate URL and no driver adapter."]) : r12 || o3(["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."]));
                  let h2 = { accelerate: d3, ppg: l3, driverAdapters: c3 };
                  return a4.length > 0 ? { ok: false, diagnostics: { warnings: i12, errors: a4 }, isUsing: h2 } : { ok: true, diagnostics: { warnings: i12 }, isUsing: h2 };
                })({ url: r11, adapter: t12.adapter, copyEngine: e11, targetBuildType: "wasm-engine-edge" });
                for (let e12 of a3.warnings) tz(...e12.value);
                if (!n11) throw new tZ(a3.errors[0].value, { clientVersion: t12.clientVersion });
                return tS(t12.generator), (i11.accelerate || i11.ppg) && i11.driverAdapters, i11.accelerate ? new ik(t12) : i11.driverAdapters ? new i$(t12) : new iL({ clientVersion: t12.clientVersion });
              })(e10, this._engineConfig), this._requestHandler = new i5(this, n10), s2.log) for (let e11 of s2.log) {
                let t12 = "string" == typeof e11 ? e11 : "stdout" === e11.emit ? e11.level : null;
                t12 && this.$on(t12, (e12) => {
                  tM.log(`${tM.tags[t12] ?? ""}`, e12.message || e12.query);
                });
              }
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
            return this._appliedParent = nM(this);
          }
          get [Symbol.toStringTag]() {
            return "PrismaClient";
          }
          $on(e11, t11) {
            return "beforeExit" === e11 ? this._engine.onBeforeExit(t11) : e11 && this._engineConfig.logEmitter.on(e11, t11), this;
          }
          $connect() {
            try {
              return this._engine.start();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            }
          }
          async $disconnect() {
            try {
              await this._engine.stop();
            } catch (e11) {
              throw e11.clientVersion = this._clientVersion, e11;
            } finally {
              tm.length = 0;
            }
          }
          $executeRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "executeRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: iW({ clientMethod: t11, activeProvider: i10 }), callsite: nE(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $executeRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) {
                let [n10, i10] = ad(e11, t11);
                return iG(this._activeProvider, n10.text, n10.values, Array.isArray(e11) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(r10, "$executeRaw", n10, i10);
              }
              throw new tZ("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
            });
          }
          $executeRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => (iG(this._activeProvider, e11, t11, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(r10, "$executeRawUnsafe", [e11, ...t11])));
          }
          $runCommandRaw(t11) {
            if ("mongodb" !== e10.activeProvider) throw new tZ(`The ${e10.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
            return this._createPrismaPromise((e11) => this._request({ args: t11, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: ij, callsite: nE(this._errorFormat), transaction: e11 }));
          }
          async $queryRawInternal(e11, t11, r10, n10) {
            let i10 = this._activeProvider;
            return this._request({ action: "queryRaw", args: r10, transaction: e11, clientMethod: t11, argsMapper: iW({ clientMethod: t11, activeProvider: i10 }), callsite: nE(this._errorFormat), dataPath: [], middlewareArgsMapper: n10 });
          }
          $queryRaw(e11, ...t11) {
            return this._createPrismaPromise((r10) => {
              if (void 0 !== e11.raw || void 0 !== e11.sql) return this.$queryRawInternal(r10, "$queryRaw", ...ad(e11, t11));
              throw new tZ("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
            });
          }
          $queryRawTyped(e11) {
            return this._createPrismaPromise((t11) => {
              if (!this._hasPreviewFlag("typedSql")) throw new tZ("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
              return this.$queryRawInternal(t11, "$queryRawTyped", e11);
            });
          }
          $queryRawUnsafe(e11, ...t11) {
            return this._createPrismaPromise((r10) => this.$queryRawInternal(r10, "$queryRawUnsafe", [e11, ...t11]));
          }
          _transactionWithArray({ promises: e11, options: t11 }) {
            var r10;
            let n10 = ac.nextId(), i10 = (function(e12, t12 = () => {
            }) {
              let r11, n11 = new Promise((e13) => r11 = e13);
              return { then: (i11) => (0 == --e12 && r11(t12()), i11?.(n11)) };
            })(e11.length);
            return 0 === (r10 = e11.map((e12, r11) => {
              if (e12?.[Symbol.toStringTag] !== "PrismaPromise") throw Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
              let a2 = t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel;
              return e12.requestTransaction?.({ kind: "batch", id: n10, index: r11, isolationLevel: a2, lock: i10 }) ?? e12;
            })).length ? Promise.resolve([]) : new Promise((e12, t12) => {
              let n11 = Array(r10.length), i11 = null, a2 = false, o2 = 0, s2 = () => {
                a2 || ++o2 === r10.length && (a2 = true, i11 ? t12(i11) : e12(n11));
              }, l2 = (e13) => {
                a2 || (a2 = true, t12(e13));
              };
              for (let e13 = 0; e13 < r10.length; e13++) r10[e13].then((t13) => {
                n11[e13] = t13, s2();
              }, (t13) => {
                i0(t13) ? t13.batchRequestIdx === e13 ? l2(t13) : (i11 || (i11 = t13), s2()) : l2(t13);
              });
            });
          }
          async _transactionWithCallback({ callback: e11, options: t11 }) {
            let r10 = { traceparent: this._tracingHelper.getTraceParent() }, n10 = { maxWait: t11?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: t11?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: t11?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, i10 = await this._engine.transaction("start", r10, n10), a2;
            try {
              let t12 = { kind: "itx", ...i10 };
              a2 = await e11(this._createItxClient(t12)), await this._engine.transaction("commit", r10, i10);
            } catch (e12) {
              throw await this._engine.transaction("rollback", r10, i10).catch(() => {
              }), e12;
            }
            return a2;
          }
          _createItxClient(e11) {
            return nm(nM(nm(this[nI] ? this[nI] : this, [nd("_appliedParent", () => this._appliedParent._createItxClient(e11)), nd("_createPrismaPromise", () => iK(e11)), nd(al, () => e11.id)])), [nb(nj)]);
          }
          $transaction(e11, t11) {
            let r10;
            return r10 = "function" == typeof e11 ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? () => {
              throw Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
            } : () => this._transactionWithCallback({ callback: e11, options: t11 }) : () => this._transactionWithArray({ promises: e11, options: t11 }), this._tracingHelper.runInChildSpan({ name: "transaction", attributes: { method: "$transaction" } }, r10);
          }
          _request(e11) {
            e11.otelParentCtx = this._tracingHelper.getActiveContext();
            let t11 = e11.middlewareArgsMapper ?? as, r10 = { args: t11.requestArgsToMiddlewareArgs(e11.args), dataPath: e11.dataPath, runInTransaction: !!e11.transaction, action: e11.action, model: e11.model }, n10 = { operation: { name: "operation", attributes: { method: r10.action, model: r10.model, name: r10.model ? `${r10.model}.${r10.action}` : r10.action } } }, i10 = async (r11) => {
              let { runInTransaction: n11, args: i11, ...a2 } = r11, o2 = { ...e11, ...a2 };
              i11 && (o2.args = t11.middlewareArgsToRequestArgs(i11)), void 0 !== e11.transaction && false === n11 && delete o2.transaction;
              let s2 = await (function(e12, t12) {
                let { jsModelName: r12, action: n12, clientMethod: i12 } = t12;
                if (e12._extensions.isEmpty()) return e12._executeRequest(t12);
                let a3 = e12._extensions.getAllQueryCallbacks(r12 ?? "$none", r12 ? n12 : i12);
                return (function e13(t13, r13, n13, i13 = 0) {
                  return t13._createPrismaPromise((a4) => {
                    let o3 = r13.customDataProxyFetch;
                    return "transaction" in r13 && void 0 !== a4 && (r13.transaction?.kind === "batch" && r13.transaction.lock.then(), r13.transaction = a4), i13 === n13.length ? t13._executeRequest(r13) : n13[i13]({ model: r13.model, operation: r13.model ? r13.action : r13.clientMethod, args: (function(e14) {
                      var t14, r14;
                      if (e14 instanceof na) {
                        return new na((t14 = e14).strings, t14.values);
                      }
                      if (nn(e14)) {
                        return new nt((r14 = e14).sql, r14.values);
                      }
                      if (Array.isArray(e14)) {
                        let t15 = [e14[0]];
                        for (let r15 = 1; r15 < e14.length; r15++) t15[r15] = nq(e14[r15]);
                        return t15;
                      }
                      let n14 = {};
                      for (let t15 in e14) n14[t15] = nq(e14[t15]);
                      return n14;
                    })(r13.args ?? {}), __internalParams: r13, query: (a5, s3 = r13) => {
                      let l2 = s3.customDataProxyFetch;
                      return s3.customDataProxyFetch = nF(o3, l2), s3.args = a5, e13(t13, s3, n13, i13 + 1);
                    } });
                  });
                })(e12, t12, a3);
              })(this, o2);
              return o2.model ? (function({ result: e12, modelName: t12, args: r12, extensions: n12, runtimeDataModel: i12, globalOmit: a3 }) {
                return n12.isEmpty() || null == e12 || "object" != typeof e12 || !i12.models[t12] ? e12 : n$({ result: e12, args: r12 ?? {}, modelName: t12, runtimeDataModel: i12, visitor: (e13, t13, r13) => {
                  let i13 = rH(t13);
                  return (function({ result: e14, modelName: t14, select: r14, omit: n13, extensions: i14 }) {
                    let a4 = i14.getAllComputedFields(t14);
                    if (!a4) return e14;
                    let o3 = [], s3 = [];
                    for (let t15 of Object.values(a4)) {
                      if (n13) {
                        if (n13[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => n13[e16]);
                        e15.length > 0 && s3.push(nb(e15));
                      } else if (r14) {
                        if (!r14[t15.name]) continue;
                        let e15 = t15.needs.filter((e16) => !r14[e16]);
                        e15.length > 0 && s3.push(nb(e15));
                      }
                      (function(e15, t16) {
                        return t16.every((t17) => Object.prototype.hasOwnProperty.call(e15, t17));
                      })(e14, t15.needs) && o3.push((function(e15, t16) {
                        return nh(nd(e15.name, () => e15.compute(t16)));
                      })(t15, nm(e14, o3)));
                    }
                    return o3.length > 0 || s3.length > 0 ? nm(e14, [...o3, ...s3]) : e14;
                  })({ result: e13, modelName: i13, select: r13.select, omit: r13.select ? void 0 : { ...a3?.[i13], ...r13.omit }, extensions: n12 });
                } });
              })({ result: s2, modelName: o2.model, args: o2.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : s2;
            };
            return this._tracingHelper.runInChildSpan(n10.operation, () => i10(r10));
          }
          async _executeRequest({ args: e11, clientMethod: t11, dataPath: r10, callsite: n10, action: i10, model: a2, argsMapper: o2, transaction: s2, unpacker: l2, otelParentCtx: c2, customDataProxyFetch: u2 }) {
            try {
              e11 = o2 ? o2(e11) : e11;
              let d2 = this._tracingHelper.runInChildSpan({ name: "serialize" }, () => r2({ modelName: a2, runtimeDataModel: this._runtimeDataModel, action: i10, args: e11, clientMethod: t11, callsite: n10, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
              return t_.enabled("prisma:client") && (ao("Prisma Client call:"), ao(`prisma.${t11}(${(function(e12) {
                if (void 0 === e12) return "";
                let t12 = rU(e12);
                return new rl(0, { colors: rd }).write(t12).toString();
              })(e11)})`), ao("Generated request:"), ao(JSON.stringify(d2, null, 2) + `
`)), s2?.kind === "batch" && await s2.lock, this._requestHandler.request({ protocolQuery: d2, modelName: a2, action: i10, clientMethod: t11, dataPath: r10, callsite: n10, args: e11, extensions: this._extensions, transaction: s2, unpacker: l2, otelParentCtx: c2, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: u2 });
            } catch (e12) {
              throw e12.clientVersion = this._clientVersion, e12;
            }
          }
          $metrics = new r8(this);
          _hasPreviewFlag(e11) {
            return !!this._engineConfig.previewFeatures?.includes(e11);
          }
          $applyPendingMigrations() {
            return this._engine.applyPendingMigrations();
          }
          $extends = nD;
        }
        return t10;
      }
      function ad(e10, t10) {
        var r10;
        return Array.isArray(r10 = e10) && Array.isArray(r10.raw) ? [new na(e10, t10), iJ] : [e10, iz];
      }
      D(), $(), L(), j(), q(), ew();
      var ah = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
      function ap(e10) {
        return new Proxy(e10, { get(e11, t10) {
          if (t10 in e11) return e11[t10];
          if (!ah.has(t10)) throw TypeError(`Invalid enum value: ${String(t10)}`);
        } });
      }
      D(), $(), L(), j(), q(), ew(), ew();
    }, 11439, (e, t, r) => {
      "use strict";
      var n = Object.defineProperty, i = Object.getOwnPropertyDescriptor, a = Object.getOwnPropertyNames, o = Object.prototype.hasOwnProperty, s = {}, l = { RequestCookies: () => g, ResponseCookies: () => m, parseCookie: () => d, parseSetCookie: () => h, stringifyCookie: () => u };
      for (var c in l) n(s, c, { get: l[c], enumerable: true });
      function u(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function d(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2) continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function h(e2) {
        if (!e2) return;
        let [[t2, r2], ...n2] = d(e2), { domain: i2, expires: a2, httponly: o2, maxage: s2, path: l2, samesite: c2, secure: u2, partitioned: h2, priority: g2 } = Object.fromEntries(n2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        {
          var m2, y, b = { name: t2, value: decodeURIComponent(r2), domain: i2, ...a2 && { expires: new Date(a2) }, ...o2 && { httpOnly: true }, ..."string" == typeof s2 && { maxAge: Number(s2) }, path: l2, ...c2 && { sameSite: p.includes(m2 = (m2 = c2).toLowerCase()) ? m2 : void 0 }, ...u2 && { secure: true }, ...g2 && { priority: f.includes(y = (y = g2).toLowerCase()) ? y : void 0 }, ...h2 && { partitioned: true } };
          let e3 = {};
          for (let t3 in b) b[t3] && (e3[t3] = b[t3]);
          return e3;
        }
      }
      t.exports = ((e2, t2, r2) => {
        if (t2 && "object" == typeof t2 || "function" == typeof t2) for (let s2 of a(t2)) o.call(e2, s2) || void 0 === s2 || n(e2, s2, { get: () => t2[s2], enumerable: !(r2 = i(t2, s2)) || r2.enumerable });
        return e2;
      })(n({}, "__esModule", { value: true }), s);
      var p = ["strict", "lax", "none"], f = ["low", "medium", "high"], g = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2) for (let [e3, r2] of d(t2)) this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length) return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => u(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => u(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, m = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : (function(e4) {
            if (!e4) return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); ) s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); ) if ("," === (r3 = e4.charAt(s2))) {
                for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; ) s2 += 1;
                s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
              } else s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          })(i2)) {
            let t3 = h(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length) return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, (function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          })({ name: t2, value: r2, ...n2 })), (function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = u(r3);
              t3.append("set-cookie", e4);
            }
          })(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(u).join("; ");
        }
      };
    }, 30616, (e, t, r) => {
      (() => {
        "use strict";
        let r2, n, i, a, o;
        var s, l, c, u, d, h, p, f, g, m, y, b, v, w, _, E, S = { 912: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ContextAPI = void 0;
          let n2 = r3(108), i2 = r3(221), a2 = r3(44), o2 = "context", s2 = new n2.NoopContextManager();
          t2.ContextAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalContextManager(e4) {
              return (0, i2.registerGlobal)(o2, e4, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e4, t3, r4, ...n3) {
              return this._getContextManager().with(e4, t3, r4, ...n3);
            }
            bind(e4, t3) {
              return this._getContextManager().bind(e4, t3);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o2) || s2;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          };
        }, 44: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagAPI = void 0;
          let n2 = r3(757), i2 = r3(412), a2 = r3(711), o2 = r3(221);
          t2.DiagAPI = class e3 {
            constructor() {
              function e4(e5) {
                return function(...t4) {
                  let r4 = (0, o2.getGlobal)("diag");
                  if (r4) return r4[e5](...t4);
                };
              }
              let t3 = this;
              t3.setLogger = (e5, r4 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s2, l2;
                if (e5 === t3) {
                  let e6 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t3.error(null != (n3 = e6.stack) ? n3 : e6.message), false;
                }
                "number" == typeof r4 && (r4 = { logLevel: r4 });
                let c2 = (0, o2.getGlobal)("diag"), u2 = (0, i2.createLogLevelDiagLogger)(null != (s2 = r4.logLevel) ? s2 : a2.DiagLogLevel.INFO, e5);
                if (c2 && !r4.suppressOverrideMessage) {
                  let e6 = null != (l2 = Error().stack) ? l2 : "<failed to generate stacktrace>";
                  c2.warn(`Current logger will be overwritten from ${e6}`), u2.warn(`Current logger will overwrite one already registered from ${e6}`);
                }
                return (0, o2.registerGlobal)("diag", u2, t3, true);
              }, t3.disable = () => {
                (0, o2.unregisterGlobal)("diag", t3);
              }, t3.createComponentLogger = (e5) => new n2.DiagComponentLogger(e5), t3.verbose = e4("verbose"), t3.debug = e4("debug"), t3.info = e4("info"), t3.warn = e4("warn"), t3.error = e4("error");
            }
            static instance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
          };
        }, 262: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.MetricsAPI = void 0;
          let n2 = r3(586), i2 = r3(221), a2 = r3(44), o2 = "metrics";
          t2.MetricsAPI = class e3 {
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalMeterProvider(e4) {
              return (0, i2.registerGlobal)(o2, e4, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o2) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e4, t3, r4) {
              return this.getMeterProvider().getMeter(e4, t3, r4);
            }
            disable() {
              (0, i2.unregisterGlobal)(o2, a2.DiagAPI.instance());
            }
          };
        }, 25: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.PropagationAPI = void 0;
          let n2 = r3(221), i2 = r3(19), a2 = r3(92), o2 = r3(398), s2 = r3(504), l2 = r3(44), c2 = "propagation", u2 = new i2.NoopTextMapPropagator();
          t2.PropagationAPI = class e3 {
            constructor() {
              this.createBaggage = s2.createBaggage, this.getBaggage = o2.getBaggage, this.getActiveBaggage = o2.getActiveBaggage, this.setBaggage = o2.setBaggage, this.deleteBaggage = o2.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalPropagator(e4) {
              return (0, n2.registerGlobal)(c2, e4, l2.DiagAPI.instance());
            }
            inject(e4, t3, r4 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e4, t3, r4);
            }
            extract(e4, t3, r4 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e4, t3, r4);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(c2, l2.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(c2) || u2;
            }
          };
        }, 397: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceAPI = void 0;
          let n2 = r3(221), i2 = r3(498), a2 = r3(477), o2 = r3(793), s2 = r3(44), l2 = "trace";
          t2.TraceAPI = class e3 {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o2.deleteSpan, this.getSpan = o2.getSpan, this.getActiveSpan = o2.getActiveSpan, this.getSpanContext = o2.getSpanContext, this.setSpan = o2.setSpan, this.setSpanContext = o2.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new e3()), this._instance;
            }
            setGlobalTracerProvider(e4) {
              let t3 = (0, n2.registerGlobal)(l2, this._proxyTracerProvider, s2.DiagAPI.instance());
              return t3 && this._proxyTracerProvider.setDelegate(e4), t3;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l2) || this._proxyTracerProvider;
            }
            getTracer(e4, t3) {
              return this.getTracerProvider().getTracer(e4, t3);
            }
            disable() {
              (0, n2.unregisterGlobal)(l2, s2.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          };
        }, 398: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.deleteBaggage = t2.setBaggage = t2.getActiveBaggage = t2.getBaggage = void 0;
          let n2 = r3(912), i2 = (0, r3(23).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t2.getBaggage = a2, t2.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t2.setBaggage = function(e3, t3) {
            return e3.setValue(i2, t3);
          }, t2.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 152: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BaggageImpl = void 0, t2.BaggageImpl = class e3 {
            constructor(e4) {
              this._entries = e4 ? new Map(e4) : /* @__PURE__ */ new Map();
            }
            getEntry(e4) {
              let t3 = this._entries.get(e4);
              if (t3) return Object.assign({}, t3);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e4, t3]) => [e4, t3]);
            }
            setEntry(t3, r3) {
              let n2 = new e3(this._entries);
              return n2._entries.set(t3, r3), n2;
            }
            removeEntry(t3) {
              let r3 = new e3(this._entries);
              return r3._entries.delete(t3), r3;
            }
            removeEntries(...t3) {
              let r3 = new e3(this._entries);
              for (let e4 of t3) r3._entries.delete(e4);
              return r3;
            }
            clear() {
              return new e3();
            }
          };
        }, 647: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataSymbol = void 0, t2.baggageEntryMetadataSymbol = /* @__PURE__ */ Symbol("BaggageEntryMetadata");
        }, 504: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.baggageEntryMetadataFromString = t2.createBaggage = void 0;
          let n2 = r3(44), i2 = r3(152), a2 = r3(647), o2 = n2.DiagAPI.instance();
          t2.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t2.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o2.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 778: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.context = void 0, t2.context = r3(912).ContextAPI.getInstance();
        }, 108: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopContextManager = void 0;
          let n2 = r3(23);
          t2.NoopContextManager = class {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t3, r4, ...n3) {
              return t3.call(r4, ...n3);
            }
            bind(e3, t3) {
              return t3;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          };
        }, 23: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ROOT_CONTEXT = t2.createContextKey = void 0, t2.createContextKey = function(e3) {
            return Symbol.for(e3);
          }, t2.ROOT_CONTEXT = new class e3 {
            constructor(t3) {
              let r3 = this;
              r3._currentContext = t3 ? new Map(t3) : /* @__PURE__ */ new Map(), r3.getValue = (e4) => r3._currentContext.get(e4), r3.setValue = (t4, n2) => {
                let i2 = new e3(r3._currentContext);
                return i2._currentContext.set(t4, n2), i2;
              }, r3.deleteValue = (t4) => {
                let n2 = new e3(r3._currentContext);
                return n2._currentContext.delete(t4), n2;
              };
            }
          }();
        }, 304: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.diag = void 0, t2.diag = r3(44).DiagAPI.instance();
        }, 757: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagComponentLogger = void 0;
          let n2 = r3(221);
          function i2(e3, t3, r4) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3) return r4.unshift(t3), i3[e3](...r4);
          }
          t2.DiagComponentLogger = class {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return i2("debug", this._namespace, e3);
            }
            error(...e3) {
              return i2("error", this._namespace, e3);
            }
            info(...e3) {
              return i2("info", this._namespace, e3);
            }
            warn(...e3) {
              return i2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return i2("verbose", this._namespace, e3);
            }
          };
        }, 83: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagConsoleLogger = void 0;
          let r3 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          t2.DiagConsoleLogger = class {
            constructor() {
              for (let e3 = 0; e3 < r3.length; e3++) this[r3[e3].n] = /* @__PURE__ */ (function(e4) {
                return function(...t3) {
                  if (console) {
                    let r4 = console[e4];
                    if ("function" != typeof r4 && (r4 = console.log), "function" == typeof r4) return r4.apply(console, t3);
                  }
                };
              })(r3[e3].c);
            }
          };
        }, 412: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createLogLevelDiagLogger = void 0;
          let n2 = r3(711);
          t2.createLogLevelDiagLogger = function(e3, t3) {
            function r4(r5, n3) {
              let i2 = t3[r5];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t3) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t3 = t3 || {}, { error: r4("error", n2.DiagLogLevel.ERROR), warn: r4("warn", n2.DiagLogLevel.WARN), info: r4("info", n2.DiagLogLevel.INFO), debug: r4("debug", n2.DiagLogLevel.DEBUG), verbose: r4("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 711: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.DiagLogLevel = void 0, (r3 = t2.DiagLogLevel || (t2.DiagLogLevel = {}))[r3.NONE = 0] = "NONE", r3[r3.ERROR = 30] = "ERROR", r3[r3.WARN = 50] = "WARN", r3[r3.INFO = 60] = "INFO", r3[r3.DEBUG = 70] = "DEBUG", r3[r3.VERBOSE = 80] = "VERBOSE", r3[r3.ALL = 9999] = "ALL";
        }, 221: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.unregisterGlobal = t2.getGlobal = t2.registerGlobal = void 0;
          let n2 = r3(678), i2 = r3(652), a2 = r3(662), o2 = i2.VERSION.split(".")[0], s2 = /* @__PURE__ */ Symbol.for(`opentelemetry.js.api.${o2}`), l2 = n2._globalThis;
          t2.registerGlobal = function(e3, t3, r4, n3 = false) {
            var a3;
            let o3 = l2[s2] = null != (a3 = l2[s2]) ? a3 : { version: i2.VERSION };
            if (!n3 && o3[e3]) {
              let t4 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r4.error(t4.stack || t4.message), false;
            }
            if (o3.version !== i2.VERSION) {
              let t4 = Error(`@opentelemetry/api: Registration of version v${o3.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r4.error(t4.stack || t4.message), false;
            }
            return o3[e3] = t3, r4.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t2.getGlobal = function(e3) {
            var t3, r4;
            let n3 = null == (t3 = l2[s2]) ? void 0 : t3.version;
            if (n3 && (0, a2.isCompatible)(n3)) return null == (r4 = l2[s2]) ? void 0 : r4[e3];
          }, t2.unregisterGlobal = function(e3, t3) {
            t3.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r4 = l2[s2];
            r4 && delete r4[e3];
          };
        }, 662: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.isCompatible = t2._makeCompatibilityCheck = void 0;
          let n2 = r3(652), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t3 = /* @__PURE__ */ new Set([e3]), r4 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3) return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease) return function(t4) {
              return t4 === e3;
            };
            function o2(e4) {
              return r4.add(e4), false;
            }
            return function(e4) {
              if (t3.has(e4)) return true;
              if (r4.has(e4)) return false;
              let n4 = e4.match(i2);
              if (!n4) return o2(e4);
              let s2 = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              if (null != s2.prerelease || a3.major !== s2.major) return o2(e4);
              if (0 === a3.major) return a3.minor === s2.minor && a3.patch <= s2.patch ? (t3.add(e4), true) : o2(e4);
              return a3.minor <= s2.minor ? (t3.add(e4), true) : o2(e4);
            };
          }
          t2._makeCompatibilityCheck = a2, t2.isCompatible = a2(n2.VERSION);
        }, 120: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.metrics = void 0, t2.metrics = r3(262).MetricsAPI.getInstance();
        }, 532: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ValueType = void 0, (r3 = t2.ValueType || (t2.ValueType = {}))[r3.INT = 0] = "INT", r3[r3.DOUBLE = 1] = "DOUBLE";
        }, 440: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createNoopMeter = t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t2.NOOP_OBSERVABLE_GAUGE_METRIC = t2.NOOP_OBSERVABLE_COUNTER_METRIC = t2.NOOP_UP_DOWN_COUNTER_METRIC = t2.NOOP_HISTOGRAM_METRIC = t2.NOOP_COUNTER_METRIC = t2.NOOP_METER = t2.NoopObservableUpDownCounterMetric = t2.NoopObservableGaugeMetric = t2.NoopObservableCounterMetric = t2.NoopObservableMetric = t2.NoopHistogramMetric = t2.NoopUpDownCounterMetric = t2.NoopCounterMetric = t2.NoopMetric = t2.NoopMeter = void 0;
          class r3 {
            createHistogram(e3, r4) {
              return t2.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r4) {
              return t2.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r4) {
              return t2.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r4) {
              return t2.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r4) {
              return t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t3) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t2.NoopMeter = r3;
          class n2 {
          }
          t2.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t3) {
            }
          }
          t2.NoopUpDownCounterMetric = a2;
          class o2 extends n2 {
            record(e3, t3) {
            }
          }
          t2.NoopHistogramMetric = o2;
          class s2 {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t2.NoopObservableMetric = s2;
          class l2 extends s2 {
          }
          t2.NoopObservableCounterMetric = l2;
          class c2 extends s2 {
          }
          t2.NoopObservableGaugeMetric = c2;
          class u2 extends s2 {
          }
          t2.NoopObservableUpDownCounterMetric = u2, t2.NOOP_METER = new r3(), t2.NOOP_COUNTER_METRIC = new i2(), t2.NOOP_HISTOGRAM_METRIC = new o2(), t2.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t2.NOOP_OBSERVABLE_COUNTER_METRIC = new l2(), t2.NOOP_OBSERVABLE_GAUGE_METRIC = new c2(), t2.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new u2(), t2.createNoopMeter = function() {
            return t2.NOOP_METER;
          };
        }, 586: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NOOP_METER_PROVIDER = t2.NoopMeterProvider = void 0;
          let n2 = r3(440);
          class i2 {
            getMeter(e3, t3, r4) {
              return n2.NOOP_METER;
            }
          }
          t2.NoopMeterProvider = i2, t2.NOOP_METER_PROVIDER = new i2();
        }, 678: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(59), t2);
        }, 460: (t2, r3) => {
          Object.defineProperty(r3, "__esModule", { value: true }), r3._globalThis = void 0, r3._globalThis = "object" == typeof globalThis ? globalThis : e.g;
        }, 59: function(e2, t2, r3) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t3[r4];
            } });
          } : function(e3, t3, r4, n3) {
            void 0 === n3 && (n3 = r4), e3[n3] = t3[r4];
          }), i2 = this && this.__exportStar || function(e3, t3) {
            for (var r4 in e3) "default" === r4 || Object.prototype.hasOwnProperty.call(t3, r4) || n2(t3, e3, r4);
          };
          Object.defineProperty(t2, "__esModule", { value: true }), i2(r3(460), t2);
        }, 27: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.propagation = void 0, t2.propagation = r3(25).PropagationAPI.getInstance();
        }, 19: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTextMapPropagator = void 0, t2.NoopTextMapPropagator = class {
            inject(e3, t3) {
            }
            extract(e3, t3) {
              return e3;
            }
            fields() {
              return [];
            }
          };
        }, 92: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.defaultTextMapSetter = t2.defaultTextMapGetter = void 0, t2.defaultTextMapGetter = { get(e3, t3) {
            if (null != e3) return e3[t3];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t2.defaultTextMapSetter = { set(e3, t3, r3) {
            null != e3 && (e3[t3] = r3);
          } };
        }, 816: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.trace = void 0, t2.trace = r3(397).TraceAPI.getInstance();
        }, 374: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NonRecordingSpan = void 0;
          let n2 = r3(546);
          t2.NonRecordingSpan = class {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t3) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t3) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t3) {
            }
          };
        }, 637: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracer = void 0;
          let n2 = r3(912), i2 = r3(793), a2 = r3(374), o2 = r3(477), s2 = n2.ContextAPI.getInstance();
          t2.NoopTracer = class {
            startSpan(e3, t3, r4 = s2.active()) {
              var n3;
              if (null == t3 ? void 0 : t3.root) return new a2.NonRecordingSpan();
              let l2 = r4 && (0, i2.getSpanContext)(r4);
              return "object" == typeof (n3 = l2) && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o2.isSpanContextValid)(l2) ? new a2.NonRecordingSpan(l2) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t3, r4, n3) {
              let a3, o3, l2;
              if (arguments.length < 2) return;
              2 == arguments.length ? l2 = t3 : 3 == arguments.length ? (a3 = t3, l2 = r4) : (a3 = t3, o3 = r4, l2 = n3);
              let c2 = null != o3 ? o3 : s2.active(), u2 = this.startSpan(e3, a3, c2), d2 = (0, i2.setSpan)(c2, u2);
              return s2.with(d2, l2, void 0, u2);
            }
          };
        }, 76: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.NoopTracerProvider = void 0;
          let n2 = r3(637);
          t2.NoopTracerProvider = class {
            getTracer(e3, t3, r4) {
              return new n2.NoopTracer();
            }
          };
        }, 779: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracer = void 0;
          let n2 = new (r3(637)).NoopTracer();
          t2.ProxyTracer = class {
            constructor(e3, t3, r4, n3) {
              this._provider = e3, this.name = t3, this.version = r4, this.options = n3;
            }
            startSpan(e3, t3, r4) {
              return this._getTracer().startSpan(e3, t3, r4);
            }
            startActiveSpan(e3, t3, r4, n3) {
              let i2 = this._getTracer();
              return Reflect.apply(i2.startActiveSpan, i2, arguments);
            }
            _getTracer() {
              if (this._delegate) return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          };
        }, 498: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.ProxyTracerProvider = void 0;
          let n2 = r3(779), i2 = new (r3(76)).NoopTracerProvider();
          t2.ProxyTracerProvider = class {
            getTracer(e3, t3, r4) {
              var i3;
              return null != (i3 = this.getDelegateTracer(e3, t3, r4)) ? i3 : new n2.ProxyTracer(this, e3, t3, r4);
            }
            getDelegate() {
              var e3;
              return null != (e3 = this._delegate) ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t3, r4) {
              var n3;
              return null == (n3 = this._delegate) ? void 0 : n3.getTracer(e3, t3, r4);
            }
          };
        }, 312: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SamplingDecision = void 0, (r3 = t2.SamplingDecision || (t2.SamplingDecision = {}))[r3.NOT_RECORD = 0] = "NOT_RECORD", r3[r3.RECORD = 1] = "RECORD", r3[r3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
        }, 793: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.getSpanContext = t2.setSpanContext = t2.deleteSpan = t2.setSpan = t2.getActiveSpan = t2.getSpan = void 0;
          let n2 = r3(23), i2 = r3(374), a2 = r3(912), o2 = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s2(e3) {
            return e3.getValue(o2) || void 0;
          }
          function l2(e3, t3) {
            return e3.setValue(o2, t3);
          }
          t2.getSpan = s2, t2.getActiveSpan = function() {
            return s2(a2.ContextAPI.getInstance().active());
          }, t2.setSpan = l2, t2.deleteSpan = function(e3) {
            return e3.deleteValue(o2);
          }, t2.setSpanContext = function(e3, t3) {
            return l2(e3, new i2.NonRecordingSpan(t3));
          }, t2.getSpanContext = function(e3) {
            var t3;
            return null == (t3 = s2(e3)) ? void 0 : t3.spanContext();
          };
        }, 285: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceStateImpl = void 0;
          let n2 = r3(240);
          t2.TraceStateImpl = class e3 {
            constructor(e4) {
              this._internalState = /* @__PURE__ */ new Map(), e4 && this._parse(e4);
            }
            set(e4, t3) {
              let r4 = this._clone();
              return r4._internalState.has(e4) && r4._internalState.delete(e4), r4._internalState.set(e4, t3), r4;
            }
            unset(e4) {
              let t3 = this._clone();
              return t3._internalState.delete(e4), t3;
            }
            get(e4) {
              return this._internalState.get(e4);
            }
            serialize() {
              return this._keys().reduce((e4, t3) => (e4.push(t3 + "=" + this.get(t3)), e4), []).join(",");
            }
            _parse(e4) {
              !(e4.length > 512) && (this._internalState = e4.split(",").reverse().reduce((e5, t3) => {
                let r4 = t3.trim(), i2 = r4.indexOf("=");
                if (-1 !== i2) {
                  let a2 = r4.slice(0, i2), o2 = r4.slice(i2 + 1, t3.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o2) && e5.set(a2, o2);
                }
                return e5;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let t3 = new e3();
              return t3._internalState = new Map(this._internalState), t3;
            }
          };
        }, 240: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.validateValue = t2.validateKey = void 0;
          let r3 = "[_0-9a-z-*/]", n2 = `[a-z]${r3}{0,255}`, i2 = `[a-z0-9]${r3}{0,240}@[a-z]${r3}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o2 = /^[ -~]{0,255}[!-~]$/, s2 = /,|=/;
          t2.validateKey = function(e3) {
            return a2.test(e3);
          }, t2.validateValue = function(e3) {
            return o2.test(e3) && !s2.test(e3);
          };
        }, 87: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.createTraceState = void 0;
          let n2 = r3(285);
          t2.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 546: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.INVALID_SPAN_CONTEXT = t2.INVALID_TRACEID = t2.INVALID_SPANID = void 0;
          let n2 = r3(731);
          t2.INVALID_SPANID = "0000000000000000", t2.INVALID_TRACEID = "00000000000000000000000000000000", t2.INVALID_SPAN_CONTEXT = { traceId: t2.INVALID_TRACEID, spanId: t2.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 613: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanKind = void 0, (r3 = t2.SpanKind || (t2.SpanKind = {}))[r3.INTERNAL = 0] = "INTERNAL", r3[r3.SERVER = 1] = "SERVER", r3[r3.CLIENT = 2] = "CLIENT", r3[r3.PRODUCER = 3] = "PRODUCER", r3[r3.CONSUMER = 4] = "CONSUMER";
        }, 477: (e2, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.wrapSpanContext = t2.isSpanContextValid = t2.isValidSpanId = t2.isValidTraceId = void 0;
          let n2 = r3(546), i2 = r3(374), a2 = /^([0-9a-f]{32})$/i, o2 = /^[0-9a-f]{16}$/i;
          function s2(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l2(e3) {
            return o2.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t2.isValidTraceId = s2, t2.isValidSpanId = l2, t2.isSpanContextValid = function(e3) {
            return s2(e3.traceId) && l2(e3.spanId);
          }, t2.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 854: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.SpanStatusCode = void 0, (r3 = t2.SpanStatusCode || (t2.SpanStatusCode = {}))[r3.UNSET = 0] = "UNSET", r3[r3.OK = 1] = "OK", r3[r3.ERROR = 2] = "ERROR";
        }, 731: (e2, t2) => {
          var r3;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.TraceFlags = void 0, (r3 = t2.TraceFlags || (t2.TraceFlags = {}))[r3.NONE = 0] = "NONE", r3[r3.SAMPLED = 1] = "SAMPLED";
        }, 652: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.VERSION = void 0, t2.VERSION = "1.6.0";
        } }, x = {};
        function P(e2) {
          var t2 = x[e2];
          if (void 0 !== t2) return t2.exports;
          var r3 = x[e2] = { exports: {} }, n2 = true;
          try {
            S[e2].call(r3.exports, r3, r3.exports, P), n2 = false;
          } finally {
            n2 && delete x[e2];
          }
          return r3.exports;
        }
        P.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/@opentelemetry/api/";
        var T = {};
        Object.defineProperty(T, "__esModule", { value: true }), T.trace = T.propagation = T.metrics = T.diag = T.context = T.INVALID_SPAN_CONTEXT = T.INVALID_TRACEID = T.INVALID_SPANID = T.isValidSpanId = T.isValidTraceId = T.isSpanContextValid = T.createTraceState = T.TraceFlags = T.SpanStatusCode = T.SpanKind = T.SamplingDecision = T.ProxyTracerProvider = T.ProxyTracer = T.defaultTextMapSetter = T.defaultTextMapGetter = T.ValueType = T.createNoopMeter = T.DiagLogLevel = T.DiagConsoleLogger = T.ROOT_CONTEXT = T.createContextKey = T.baggageEntryMetadataFromString = void 0, s = P(504), Object.defineProperty(T, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
          return s.baggageEntryMetadataFromString;
        } }), l = P(23), Object.defineProperty(T, "createContextKey", { enumerable: true, get: function() {
          return l.createContextKey;
        } }), Object.defineProperty(T, "ROOT_CONTEXT", { enumerable: true, get: function() {
          return l.ROOT_CONTEXT;
        } }), c = P(83), Object.defineProperty(T, "DiagConsoleLogger", { enumerable: true, get: function() {
          return c.DiagConsoleLogger;
        } }), u = P(711), Object.defineProperty(T, "DiagLogLevel", { enumerable: true, get: function() {
          return u.DiagLogLevel;
        } }), d = P(440), Object.defineProperty(T, "createNoopMeter", { enumerable: true, get: function() {
          return d.createNoopMeter;
        } }), h = P(532), Object.defineProperty(T, "ValueType", { enumerable: true, get: function() {
          return h.ValueType;
        } }), p = P(92), Object.defineProperty(T, "defaultTextMapGetter", { enumerable: true, get: function() {
          return p.defaultTextMapGetter;
        } }), Object.defineProperty(T, "defaultTextMapSetter", { enumerable: true, get: function() {
          return p.defaultTextMapSetter;
        } }), f = P(779), Object.defineProperty(T, "ProxyTracer", { enumerable: true, get: function() {
          return f.ProxyTracer;
        } }), g = P(498), Object.defineProperty(T, "ProxyTracerProvider", { enumerable: true, get: function() {
          return g.ProxyTracerProvider;
        } }), m = P(312), Object.defineProperty(T, "SamplingDecision", { enumerable: true, get: function() {
          return m.SamplingDecision;
        } }), y = P(613), Object.defineProperty(T, "SpanKind", { enumerable: true, get: function() {
          return y.SpanKind;
        } }), b = P(854), Object.defineProperty(T, "SpanStatusCode", { enumerable: true, get: function() {
          return b.SpanStatusCode;
        } }), v = P(731), Object.defineProperty(T, "TraceFlags", { enumerable: true, get: function() {
          return v.TraceFlags;
        } }), w = P(87), Object.defineProperty(T, "createTraceState", { enumerable: true, get: function() {
          return w.createTraceState;
        } }), _ = P(477), Object.defineProperty(T, "isSpanContextValid", { enumerable: true, get: function() {
          return _.isSpanContextValid;
        } }), Object.defineProperty(T, "isValidTraceId", { enumerable: true, get: function() {
          return _.isValidTraceId;
        } }), Object.defineProperty(T, "isValidSpanId", { enumerable: true, get: function() {
          return _.isValidSpanId;
        } }), E = P(546), Object.defineProperty(T, "INVALID_SPANID", { enumerable: true, get: function() {
          return E.INVALID_SPANID;
        } }), Object.defineProperty(T, "INVALID_TRACEID", { enumerable: true, get: function() {
          return E.INVALID_TRACEID;
        } }), Object.defineProperty(T, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
          return E.INVALID_SPAN_CONTEXT;
        } }), r2 = P(778), Object.defineProperty(T, "context", { enumerable: true, get: function() {
          return r2.context;
        } }), n = P(304), Object.defineProperty(T, "diag", { enumerable: true, get: function() {
          return n.diag;
        } }), i = P(120), Object.defineProperty(T, "metrics", { enumerable: true, get: function() {
          return i.metrics;
        } }), a = P(27), Object.defineProperty(T, "propagation", { enumerable: true, get: function() {
          return a.propagation;
        } }), o = P(816), Object.defineProperty(T, "trace", { enumerable: true, get: function() {
          return o.trace;
        } }), T.default = { context: r2.context, diag: n.diag, metrics: i.metrics, propagation: a.propagation, trace: o.trace }, t.exports = T;
      })();
    }, 93056, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/cookie/");
        var e2, r2, n, i, a = {};
        a.parse = function(t2, r3) {
          if ("string" != typeof t2) throw TypeError("argument str must be a string");
          for (var i2 = {}, a2 = t2.split(n), o = (r3 || {}).decode || e2, s = 0; s < a2.length; s++) {
            var l = a2[s], c = l.indexOf("=");
            if (!(c < 0)) {
              var u = l.substr(0, c).trim(), d = l.substr(++c, l.length).trim();
              '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[u] && (i2[u] = (function(e3, t3) {
                try {
                  return t3(e3);
                } catch (t4) {
                  return e3;
                }
              })(d, o));
            }
          }
          return i2;
        }, a.serialize = function(e3, t2, n2) {
          var a2 = n2 || {}, o = a2.encode || r2;
          if ("function" != typeof o) throw TypeError("option encode is invalid");
          if (!i.test(e3)) throw TypeError("argument name is invalid");
          var s = o(t2);
          if (s && !i.test(s)) throw TypeError("argument val is invalid");
          var l = e3 + "=" + s;
          if (null != a2.maxAge) {
            var c = a2.maxAge - 0;
            if (isNaN(c) || !isFinite(c)) throw TypeError("option maxAge is invalid");
            l += "; Max-Age=" + Math.floor(c);
          }
          if (a2.domain) {
            if (!i.test(a2.domain)) throw TypeError("option domain is invalid");
            l += "; Domain=" + a2.domain;
          }
          if (a2.path) {
            if (!i.test(a2.path)) throw TypeError("option path is invalid");
            l += "; Path=" + a2.path;
          }
          if (a2.expires) {
            if ("function" != typeof a2.expires.toUTCString) throw TypeError("option expires is invalid");
            l += "; Expires=" + a2.expires.toUTCString();
          }
          if (a2.httpOnly && (l += "; HttpOnly"), a2.secure && (l += "; Secure"), a2.sameSite) switch ("string" == typeof a2.sameSite ? a2.sameSite.toLowerCase() : a2.sameSite) {
            case true:
            case "strict":
              l += "; SameSite=Strict";
              break;
            case "lax":
              l += "; SameSite=Lax";
              break;
            case "none":
              l += "; SameSite=None";
              break;
            default:
              throw TypeError("option sameSite is invalid");
          }
          return l;
        }, e2 = decodeURIComponent, r2 = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, t.exports = a;
      })();
    }, 14606, (e, t, r) => {
      var n = { 226: (e2, t2, r2) => {
        "use strict";
        var n2 = r2(302), i2 = r2(551);
        function a2() {
          this.pending = null, this.pendingTotal = 0, this.blockSize = this.constructor.blockSize, this.outSize = this.constructor.outSize, this.hmacStrength = this.constructor.hmacStrength, this.padLength = this.constructor.padLength / 8, this.endian = "big", this._delta8 = this.blockSize / 8, this._delta32 = this.blockSize / 32;
        }
        t2.BlockHash = a2, a2.prototype.update = function(e3, t3) {
          if (e3 = n2.toArray(e3, t3), this.pending ? this.pending = this.pending.concat(e3) : this.pending = e3, this.pendingTotal += e3.length, this.pending.length >= this._delta8) {
            var r3 = (e3 = this.pending).length % this._delta8;
            this.pending = e3.slice(e3.length - r3, e3.length), 0 === this.pending.length && (this.pending = null), e3 = n2.join32(e3, 0, e3.length - r3, this.endian);
            for (var i3 = 0; i3 < e3.length; i3 += this._delta32) this._update(e3, i3, i3 + this._delta32);
          }
          return this;
        }, a2.prototype.digest = function(e3) {
          return this.update(this._pad()), i2(null === this.pending), this._digest(e3);
        }, a2.prototype._pad = function() {
          var e3 = this.pendingTotal, t3 = this._delta8, r3 = t3 - (e3 + this.padLength) % t3, n3 = Array(r3 + this.padLength);
          n3[0] = 128;
          for (var i3 = 1; i3 < r3; i3++) n3[i3] = 0;
          if (e3 <<= 3, "big" === this.endian) {
            for (var a3 = 8; a3 < this.padLength; a3++) n3[i3++] = 0;
            n3[i3++] = 0, n3[i3++] = 0, n3[i3++] = 0, n3[i3++] = 0, n3[i3++] = e3 >>> 24 & 255, n3[i3++] = e3 >>> 16 & 255, n3[i3++] = e3 >>> 8 & 255, n3[i3++] = 255 & e3;
          } else for (n3[i3++] = 255 & e3, n3[i3++] = e3 >>> 8 & 255, n3[i3++] = e3 >>> 16 & 255, n3[i3++] = e3 >>> 24 & 255, n3[i3++] = 0, n3[i3++] = 0, n3[i3++] = 0, n3[i3++] = 0, a3 = 8; a3 < this.padLength; a3++) n3[i3++] = 0;
          return n3;
        };
      }, 563: (e2, t2, r2) => {
        "use strict";
        var n2 = r2(302), i2 = r2(226), a2 = r2(101), o = r2(551), s = n2.sum32, l = n2.sum32_4, c = n2.sum32_5, u = a2.ch32, d = a2.maj32, h = a2.s0_256, p = a2.s1_256, f = a2.g0_256, g = a2.g1_256, m = i2.BlockHash, y = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
        function b() {
          if (!(this instanceof b)) return new b();
          m.call(this), this.h = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], this.k = y, this.W = Array(64);
        }
        n2.inherits(b, m), e2.exports = b, b.blockSize = 512, b.outSize = 256, b.hmacStrength = 192, b.padLength = 64, b.prototype._update = function(e3, t3) {
          for (var r3 = this.W, n3 = 0; n3 < 16; n3++) r3[n3] = e3[t3 + n3];
          for (; n3 < r3.length; n3++) r3[n3] = l(g(r3[n3 - 2]), r3[n3 - 7], f(r3[n3 - 15]), r3[n3 - 16]);
          var i3 = this.h[0], a3 = this.h[1], m2 = this.h[2], y2 = this.h[3], b2 = this.h[4], v = this.h[5], w = this.h[6], _ = this.h[7];
          for (o(this.k.length === r3.length), n3 = 0; n3 < r3.length; n3++) {
            var E = c(_, p(b2), u(b2, v, w), this.k[n3], r3[n3]), S = s(h(i3), d(i3, a3, m2));
            _ = w, w = v, v = b2, b2 = s(y2, E), y2 = m2, m2 = a3, a3 = i3, i3 = s(E, S);
          }
          this.h[0] = s(this.h[0], i3), this.h[1] = s(this.h[1], a3), this.h[2] = s(this.h[2], m2), this.h[3] = s(this.h[3], y2), this.h[4] = s(this.h[4], b2), this.h[5] = s(this.h[5], v), this.h[6] = s(this.h[6], w), this.h[7] = s(this.h[7], _);
        }, b.prototype._digest = function(e3) {
          return "hex" === e3 ? n2.toHex32(this.h, "big") : n2.split32(this.h, "big");
        };
      }, 101: (e2, t2, r2) => {
        "use strict";
        var n2 = r2(302).rotr32;
        function i2(e3, t3, r3) {
          return e3 & t3 ^ e3 & r3 ^ t3 & r3;
        }
        t2.ft_1 = function(e3, t3, r3, n3) {
          var a2;
          return 0 === e3 ? (a2 = t3) & r3 ^ ~a2 & n3 : 1 === e3 || 3 === e3 ? t3 ^ r3 ^ n3 : 2 === e3 ? i2(t3, r3, n3) : void 0;
        }, t2.ch32 = function(e3, t3, r3) {
          return e3 & t3 ^ ~e3 & r3;
        }, t2.maj32 = i2, t2.p32 = function(e3, t3, r3) {
          return e3 ^ t3 ^ r3;
        }, t2.s0_256 = function(e3) {
          return n2(e3, 2) ^ n2(e3, 13) ^ n2(e3, 22);
        }, t2.s1_256 = function(e3) {
          return n2(e3, 6) ^ n2(e3, 11) ^ n2(e3, 25);
        }, t2.g0_256 = function(e3) {
          return n2(e3, 7) ^ n2(e3, 18) ^ e3 >>> 3;
        }, t2.g1_256 = function(e3) {
          return n2(e3, 17) ^ n2(e3, 19) ^ e3 >>> 10;
        };
      }, 302: (e2, t2, r2) => {
        "use strict";
        var n2 = r2(551);
        function i2(e3) {
          return (e3 >>> 24 | e3 >>> 8 & 65280 | e3 << 8 & 16711680 | (255 & e3) << 24) >>> 0;
        }
        function a2(e3) {
          return 1 === e3.length ? "0" + e3 : e3;
        }
        function o(e3) {
          if (7 === e3.length) return "0" + e3;
          if (6 === e3.length) return "00" + e3;
          if (5 === e3.length) return "000" + e3;
          if (4 === e3.length) return "0000" + e3;
          if (3 === e3.length) return "00000" + e3;
          else if (2 === e3.length) return "000000" + e3;
          else if (1 === e3.length) return "0000000" + e3;
          else return e3;
        }
        t2.inherits = r2(638), t2.toArray = function(e3, t3) {
          if (Array.isArray(e3)) return e3.slice();
          if (!e3) return [];
          var r3 = [];
          if ("string" == typeof e3) if (t3) {
            if ("hex" === t3) for ((e3 = e3.replace(/[^a-z0-9]+/gi, "")).length % 2 != 0 && (e3 = "0" + e3), i3 = 0; i3 < e3.length; i3 += 2) r3.push(parseInt(e3[i3] + e3[i3 + 1], 16));
          } else for (var n3 = 0, i3 = 0; i3 < e3.length; i3++) {
            var a3, o2, s = e3.charCodeAt(i3);
            s < 128 ? r3[n3++] = s : (s < 2048 ? r3[n3++] = s >> 6 | 192 : ((a3 = e3, o2 = i3, (64512 & a3.charCodeAt(o2)) != 55296 || o2 < 0 || o2 + 1 >= a3.length ? 1 : (64512 & a3.charCodeAt(o2 + 1)) != 56320) ? r3[n3++] = s >> 12 | 224 : (s = 65536 + ((1023 & s) << 10) + (1023 & e3.charCodeAt(++i3)), r3[n3++] = s >> 18 | 240, r3[n3++] = s >> 12 & 63 | 128), r3[n3++] = s >> 6 & 63 | 128), r3[n3++] = 63 & s | 128);
          }
          else for (i3 = 0; i3 < e3.length; i3++) r3[i3] = 0 | e3[i3];
          return r3;
        }, t2.toHex = function(e3) {
          for (var t3 = "", r3 = 0; r3 < e3.length; r3++) t3 += a2(e3[r3].toString(16));
          return t3;
        }, t2.htonl = i2, t2.toHex32 = function(e3, t3) {
          for (var r3 = "", n3 = 0; n3 < e3.length; n3++) {
            var a3 = e3[n3];
            "little" === t3 && (a3 = i2(a3)), r3 += o(a3.toString(16));
          }
          return r3;
        }, t2.zero2 = a2, t2.zero8 = o, t2.join32 = function(e3, t3, r3, i3) {
          var a3, o2 = r3 - t3;
          n2(o2 % 4 == 0);
          for (var s = Array(o2 / 4), l = 0, c = t3; l < s.length; l++, c += 4) a3 = "big" === i3 ? e3[c] << 24 | e3[c + 1] << 16 | e3[c + 2] << 8 | e3[c + 3] : e3[c + 3] << 24 | e3[c + 2] << 16 | e3[c + 1] << 8 | e3[c], s[l] = a3 >>> 0;
          return s;
        }, t2.split32 = function(e3, t3) {
          for (var r3 = Array(4 * e3.length), n3 = 0, i3 = 0; n3 < e3.length; n3++, i3 += 4) {
            var a3 = e3[n3];
            "big" === t3 ? (r3[i3] = a3 >>> 24, r3[i3 + 1] = a3 >>> 16 & 255, r3[i3 + 2] = a3 >>> 8 & 255, r3[i3 + 3] = 255 & a3) : (r3[i3 + 3] = a3 >>> 24, r3[i3 + 2] = a3 >>> 16 & 255, r3[i3 + 1] = a3 >>> 8 & 255, r3[i3] = 255 & a3);
          }
          return r3;
        }, t2.rotr32 = function(e3, t3) {
          return e3 >>> t3 | e3 << 32 - t3;
        }, t2.rotl32 = function(e3, t3) {
          return e3 << t3 | e3 >>> 32 - t3;
        }, t2.sum32 = function(e3, t3) {
          return e3 + t3 >>> 0;
        }, t2.sum32_3 = function(e3, t3, r3) {
          return e3 + t3 + r3 >>> 0;
        }, t2.sum32_4 = function(e3, t3, r3, n3) {
          return e3 + t3 + r3 + n3 >>> 0;
        }, t2.sum32_5 = function(e3, t3, r3, n3, i3) {
          return e3 + t3 + r3 + n3 + i3 >>> 0;
        }, t2.sum64 = function(e3, t3, r3, n3) {
          var i3 = e3[t3], a3 = n3 + e3[t3 + 1] >>> 0;
          e3[t3] = +(a3 < n3) + r3 + i3 >>> 0, e3[t3 + 1] = a3;
        }, t2.sum64_hi = function(e3, t3, r3, n3) {
          return +(t3 + n3 >>> 0 < t3) + e3 + r3 >>> 0;
        }, t2.sum64_lo = function(e3, t3, r3, n3) {
          return t3 + n3 >>> 0;
        }, t2.sum64_4_hi = function(e3, t3, r3, n3, i3, a3, o2, s) {
          var l, c = t3;
          return e3 + r3 + i3 + o2 + (l = 0 + +((c = c + n3 >>> 0) < t3) + +((c = c + a3 >>> 0) < a3) + +((c = c + s >>> 0) < s)) >>> 0;
        }, t2.sum64_4_lo = function(e3, t3, r3, n3, i3, a3, o2, s) {
          return t3 + n3 + a3 + s >>> 0;
        }, t2.sum64_5_hi = function(e3, t3, r3, n3, i3, a3, o2, s, l, c) {
          var u, d = t3;
          return e3 + r3 + i3 + o2 + l + (u = 0 + +((d = d + n3 >>> 0) < t3) + +((d = d + a3 >>> 0) < a3) + +((d = d + s >>> 0) < s) + +((d = d + c >>> 0) < c)) >>> 0;
        }, t2.sum64_5_lo = function(e3, t3, r3, n3, i3, a3, o2, s, l, c) {
          return t3 + n3 + a3 + s + c >>> 0;
        }, t2.rotr64_hi = function(e3, t3, r3) {
          return (t3 << 32 - r3 | e3 >>> r3) >>> 0;
        }, t2.rotr64_lo = function(e3, t3, r3) {
          return (e3 << 32 - r3 | t3 >>> r3) >>> 0;
        }, t2.shr64_hi = function(e3, t3, r3) {
          return e3 >>> r3;
        }, t2.shr64_lo = function(e3, t3, r3) {
          return (e3 << 32 - r3 | t3 >>> r3) >>> 0;
        };
      }, 638: (e2) => {
        "function" == typeof Object.create ? e2.exports = function(e3, t2) {
          t2 && (e3.super_ = t2, e3.prototype = Object.create(t2.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }));
        } : e2.exports = function(e3, t2) {
          if (t2) {
            e3.super_ = t2;
            var r2 = function() {
            };
            r2.prototype = t2.prototype, e3.prototype = new r2(), e3.prototype.constructor = e3;
          }
        };
      }, 551: (e2) => {
        function t2(e3, t3) {
          if (!e3) throw Error(t3 || "Assertion failed");
        }
        e2.exports = t2, t2.equal = function(e3, t3, r2) {
          if (e3 != t3) throw Error(r2 || "Assertion failed: " + e3 + " != " + t3);
        };
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2](r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/hash.js/sha256/", t.exports = a(563);
    }, 4210, (e, t, r) => {
      (() => {
        "use strict";
        let e2, r2, n, i, a;
        var o = { 234: (e3) => {
          var t2 = Object.prototype.hasOwnProperty, r3 = "~";
          function n2() {
          }
          function i2(e4, t3, r4) {
            this.fn = e4, this.context = t3, this.once = r4 || false;
          }
          function a2(e4, t3, n3, a3, o3) {
            if ("function" != typeof n3) throw TypeError("The listener must be a function");
            var s3 = new i2(n3, a3 || e4, o3), l2 = r3 ? r3 + t3 : t3;
            return e4._events[l2] ? e4._events[l2].fn ? e4._events[l2] = [e4._events[l2], s3] : e4._events[l2].push(s3) : (e4._events[l2] = s3, e4._eventsCount++), e4;
          }
          function o2(e4, t3) {
            0 == --e4._eventsCount ? e4._events = new n2() : delete e4._events[t3];
          }
          function s2() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r3 = false)), s2.prototype.eventNames = function() {
            var e4, n3, i3 = [];
            if (0 === this._eventsCount) return i3;
            for (n3 in e4 = this._events) t2.call(e4, n3) && i3.push(r3 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e4)) : i3;
          }, s2.prototype.listeners = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            if (!n3) return [];
            if (n3.fn) return [n3.fn];
            for (var i3 = 0, a3 = n3.length, o3 = Array(a3); i3 < a3; i3++) o3[i3] = n3[i3].fn;
            return o3;
          }, s2.prototype.listenerCount = function(e4) {
            var t3 = r3 ? r3 + e4 : e4, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s2.prototype.emit = function(e4, t3, n3, i3, a3, o3) {
            var s3 = r3 ? r3 + e4 : e4;
            if (!this._events[s3]) return false;
            var l2, c2, u = this._events[s3], d = arguments.length;
            if (u.fn) {
              switch (u.once && this.removeListener(e4, u.fn, void 0, true), d) {
                case 1:
                  return u.fn.call(u.context), true;
                case 2:
                  return u.fn.call(u.context, t3), true;
                case 3:
                  return u.fn.call(u.context, t3, n3), true;
                case 4:
                  return u.fn.call(u.context, t3, n3, i3), true;
                case 5:
                  return u.fn.call(u.context, t3, n3, i3, a3), true;
                case 6:
                  return u.fn.call(u.context, t3, n3, i3, a3, o3), true;
              }
              for (c2 = 1, l2 = Array(d - 1); c2 < d; c2++) l2[c2 - 1] = arguments[c2];
              u.fn.apply(u.context, l2);
            } else {
              var h, p = u.length;
              for (c2 = 0; c2 < p; c2++) switch (u[c2].once && this.removeListener(e4, u[c2].fn, void 0, true), d) {
                case 1:
                  u[c2].fn.call(u[c2].context);
                  break;
                case 2:
                  u[c2].fn.call(u[c2].context, t3);
                  break;
                case 3:
                  u[c2].fn.call(u[c2].context, t3, n3);
                  break;
                case 4:
                  u[c2].fn.call(u[c2].context, t3, n3, i3);
                  break;
                default:
                  if (!l2) for (h = 1, l2 = Array(d - 1); h < d; h++) l2[h - 1] = arguments[h];
                  u[c2].fn.apply(u[c2].context, l2);
              }
            }
            return true;
          }, s2.prototype.on = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, false);
          }, s2.prototype.once = function(e4, t3, r4) {
            return a2(this, e4, t3, r4, true);
          }, s2.prototype.removeListener = function(e4, t3, n3, i3) {
            var a3 = r3 ? r3 + e4 : e4;
            if (!this._events[a3]) return this;
            if (!t3) return o2(this, a3), this;
            var s3 = this._events[a3];
            if (s3.fn) s3.fn !== t3 || i3 && !s3.once || n3 && s3.context !== n3 || o2(this, a3);
            else {
              for (var l2 = 0, c2 = [], u = s3.length; l2 < u; l2++) (s3[l2].fn !== t3 || i3 && !s3[l2].once || n3 && s3[l2].context !== n3) && c2.push(s3[l2]);
              c2.length ? this._events[a3] = 1 === c2.length ? c2[0] : c2 : o2(this, a3);
            }
            return this;
          }, s2.prototype.removeAllListeners = function(e4) {
            var t3;
            return e4 ? (t3 = r3 ? r3 + e4 : e4, this._events[t3] && o2(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s2.prototype.off = s2.prototype.removeListener, s2.prototype.addListener = s2.prototype.on, s2.prefixed = r3, s2.EventEmitter = s2, e3.exports = s2;
        }, 274: (e3) => {
          e3.exports = (e4, t2) => (t2 = t2 || (() => {
          }), e4.then((e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => e5), (e5) => new Promise((e6) => {
            e6(t2());
          }).then(() => {
            throw e5;
          })));
        }, 294: (e3, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e4, t3, r3) {
            let n2 = 0, i2 = e4.length;
            for (; i2 > 0; ) {
              let a2 = i2 / 2 | 0, o2 = n2 + a2;
              0 >= r3(e4[o2], t3) ? (n2 = ++o2, i2 -= a2 + 1) : i2 = a2;
            }
            return n2;
          };
        }, 838: (e3, t2, r3) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r3(294);
          t2.default = class {
            constructor() {
              this._queue = [];
            }
            enqueue(e4, t3) {
              let r4 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e4 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) return void this._queue.push(r4);
              let i2 = n2.default(this._queue, r4, (e5, t4) => t4.priority - e5.priority);
              this._queue.splice(i2, 0, r4);
            }
            dequeue() {
              let e4 = this._queue.shift();
              return null == e4 ? void 0 : e4.run;
            }
            filter(e4) {
              return this._queue.filter((t3) => t3.priority === e4.priority).map((e5) => e5.run);
            }
            get size() {
              return this._queue.length;
            }
          };
        }, 138: (e3, t2, r3) => {
          let n2 = r3(274);
          class i2 extends Error {
            constructor(e4) {
              super(e4), this.name = "TimeoutError";
            }
          }
          let a2 = (e4, t3, r4) => new Promise((a3, o2) => {
            if ("number" != typeof t3 || t3 < 0) throw TypeError("Expected `milliseconds` to be a positive number");
            if (1 / 0 === t3) return void a3(e4);
            let s2 = setTimeout(() => {
              if ("function" == typeof r4) {
                try {
                  a3(r4());
                } catch (e5) {
                  o2(e5);
                }
                return;
              }
              let n3 = "string" == typeof r4 ? r4 : `Promise timed out after ${t3} milliseconds`, s3 = r4 instanceof Error ? r4 : new i2(n3);
              "function" == typeof e4.cancel && e4.cancel(), o2(s3);
            }, t3);
            n2(e4.then(a3, o2), () => {
              clearTimeout(s2);
            });
          });
          e3.exports = a2, e3.exports.default = a2, e3.exports.TimeoutError = i2;
        } }, s = {};
        function l(e3) {
          var t2 = s[e3];
          if (void 0 !== t2) return t2.exports;
          var r3 = s[e3] = { exports: {} }, n2 = true;
          try {
            o[e3](r3, r3.exports, l), n2 = false;
          } finally {
            n2 && delete s[e3];
          }
          return r3.exports;
        }
        l.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/p-queue/";
        var c = {};
        Object.defineProperty(c, "__esModule", { value: true }), e2 = l(234), r2 = l(138), n = l(838), i = () => {
        }, a = new r2.TimeoutError(), c.default = class extends e2 {
          constructor(e3) {
            var t2, r3, a2, o2;
            if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = i, this._resolveIdle = i, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: n.default }, e3)).intervalCap && e3.intervalCap >= 1)) throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null != (r3 = null == (t2 = e3.intervalCap) ? void 0 : t2.toString()) ? r3 : ""}\` (${typeof e3.intervalCap})`);
            if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0)) throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null != (o2 = null == (a2 = e3.interval) ? void 0 : a2.toString()) ? o2 : ""}\` (${typeof e3.interval})`);
            this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = 1 / 0 === e3.intervalCap || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
          }
          get _doesIntervalAllowAnother() {
            return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
          }
          get _doesConcurrentAllowAnother() {
            return this._pendingCount < this._concurrency;
          }
          _next() {
            this._pendingCount--, this._tryToStartAnother(), this.emit("next");
          }
          _resolvePromises() {
            this._resolveEmpty(), this._resolveEmpty = i, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = i, this.emit("idle"));
          }
          _onResumeInterval() {
            this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
          }
          _isIntervalPaused() {
            let e3 = Date.now();
            if (void 0 === this._intervalId) {
              let t2 = this._intervalEnd - e3;
              if (!(t2 < 0)) return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                this._onResumeInterval();
              }, t2)), true;
              this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
            }
            return false;
          }
          _tryToStartAnother() {
            if (0 === this._queue.size) return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
            if (!this._isPaused) {
              let e3 = !this._isIntervalPaused();
              if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                let t2 = this._queue.dequeue();
                return !!t2 && (this.emit("active"), t2(), e3 && this._initializeIntervalIfNeeded(), true);
              }
            }
            return false;
          }
          _initializeIntervalIfNeeded() {
            this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
              this._onInterval();
            }, this._interval), this._intervalEnd = Date.now() + this._interval);
          }
          _onInterval() {
            0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
          }
          _processQueue() {
            for (; this._tryToStartAnother(); ) ;
          }
          get concurrency() {
            return this._concurrency;
          }
          set concurrency(e3) {
            if (!("number" == typeof e3 && e3 >= 1)) throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
            this._concurrency = e3, this._processQueue();
          }
          async add(e3, t2 = {}) {
            return new Promise((n2, i2) => {
              let o2 = async () => {
                this._pendingCount++, this._intervalCount++;
                try {
                  let o3 = void 0 === this._timeout && void 0 === t2.timeout ? e3() : r2.default(Promise.resolve(e3()), void 0 === t2.timeout ? this._timeout : t2.timeout, () => {
                    (void 0 === t2.throwOnTimeout ? this._throwOnTimeout : t2.throwOnTimeout) && i2(a);
                  });
                  n2(await o3);
                } catch (e4) {
                  i2(e4);
                }
                this._next();
              };
              this._queue.enqueue(o2, t2), this._tryToStartAnother(), this.emit("add");
            });
          }
          async addAll(e3, t2) {
            return Promise.all(e3.map(async (e4) => this.add(e4, t2)));
          }
          start() {
            return this._isPaused && (this._isPaused = false, this._processQueue()), this;
          }
          pause() {
            this._isPaused = true;
          }
          clear() {
            this._queue = new this._queueClass();
          }
          async onEmpty() {
            if (0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveEmpty;
              this._resolveEmpty = () => {
                t2(), e3();
              };
            });
          }
          async onIdle() {
            if (0 !== this._pendingCount || 0 !== this._queue.size) return new Promise((e3) => {
              let t2 = this._resolveIdle;
              this._resolveIdle = () => {
                t2(), e3();
              };
            });
          }
          get size() {
            return this._queue.size;
          }
          sizeBy(e3) {
            return this._queue.filter(e3).length;
          }
          get pending() {
            return this._pendingCount;
          }
          get isPaused() {
            return this._isPaused;
          }
          get timeout() {
            return this._timeout;
          }
          set timeout(e3) {
            this._timeout = e3;
          }
        }, t.exports = c;
      })();
    }, 89639, (e, t, r) => {
      !(function() {
        "use strict";
        var e2 = { 431: function(e3) {
          function t2(e4) {
            if ("string" != typeof e4) throw TypeError("Path must be a string. Received " + JSON.stringify(e4));
          }
          function r3(e4, t3) {
            for (var r4, n3 = "", i = 0, a = -1, o = 0, s = 0; s <= e4.length; ++s) {
              if (s < e4.length) r4 = e4.charCodeAt(s);
              else if (47 === r4) break;
              else r4 = 47;
              if (47 === r4) {
                if (a === s - 1 || 1 === o) ;
                else if (a !== s - 1 && 2 === o) {
                  if (n3.length < 2 || 2 !== i || 46 !== n3.charCodeAt(n3.length - 1) || 46 !== n3.charCodeAt(n3.length - 2)) {
                    if (n3.length > 2) {
                      var l = n3.lastIndexOf("/");
                      if (l !== n3.length - 1) {
                        -1 === l ? (n3 = "", i = 0) : i = (n3 = n3.slice(0, l)).length - 1 - n3.lastIndexOf("/"), a = s, o = 0;
                        continue;
                      }
                    } else if (2 === n3.length || 1 === n3.length) {
                      n3 = "", i = 0, a = s, o = 0;
                      continue;
                    }
                  }
                  t3 && (n3.length > 0 ? n3 += "/.." : n3 = "..", i = 2);
                } else n3.length > 0 ? n3 += "/" + e4.slice(a + 1, s) : n3 = e4.slice(a + 1, s), i = s - a - 1;
                a = s, o = 0;
              } else 46 === r4 && -1 !== o ? ++o : o = -1;
            }
            return n3;
          }
          var n2 = { resolve: function() {
            for (var e4, n3, i = "", a = false, o = arguments.length - 1; o >= -1 && !a; o--) o >= 0 ? n3 = arguments[o] : (void 0 === e4 && (e4 = ""), n3 = e4), t2(n3), 0 !== n3.length && (i = n3 + "/" + i, a = 47 === n3.charCodeAt(0));
            if (i = r3(i, !a), a) if (i.length > 0) return "/" + i;
            else return "/";
            return i.length > 0 ? i : ".";
          }, normalize: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            var n3 = 47 === e4.charCodeAt(0), i = 47 === e4.charCodeAt(e4.length - 1);
            return (0 !== (e4 = r3(e4, !n3)).length || n3 || (e4 = "."), e4.length > 0 && i && (e4 += "/"), n3) ? "/" + e4 : e4;
          }, isAbsolute: function(e4) {
            return t2(e4), e4.length > 0 && 47 === e4.charCodeAt(0);
          }, join: function() {
            if (0 == arguments.length) return ".";
            for (var e4, r4 = 0; r4 < arguments.length; ++r4) {
              var i = arguments[r4];
              t2(i), i.length > 0 && (void 0 === e4 ? e4 = i : e4 += "/" + i);
            }
            return void 0 === e4 ? "." : n2.normalize(e4);
          }, relative: function(e4, r4) {
            if (t2(e4), t2(r4), e4 === r4 || (e4 = n2.resolve(e4)) === (r4 = n2.resolve(r4))) return "";
            for (var i = 1; i < e4.length && 47 === e4.charCodeAt(i); ++i) ;
            for (var a = e4.length, o = a - i, s = 1; s < r4.length && 47 === r4.charCodeAt(s); ++s) ;
            for (var l = r4.length - s, c = o < l ? o : l, u = -1, d = 0; d <= c; ++d) {
              if (d === c) {
                if (l > c) {
                  if (47 === r4.charCodeAt(s + d)) return r4.slice(s + d + 1);
                  else if (0 === d) return r4.slice(s + d);
                } else o > c && (47 === e4.charCodeAt(i + d) ? u = d : 0 === d && (u = 0));
                break;
              }
              var h = e4.charCodeAt(i + d);
              if (h !== r4.charCodeAt(s + d)) break;
              47 === h && (u = d);
            }
            var p = "";
            for (d = i + u + 1; d <= a; ++d) (d === a || 47 === e4.charCodeAt(d)) && (0 === p.length ? p += ".." : p += "/..");
            return p.length > 0 ? p + r4.slice(s + u) : (s += u, 47 === r4.charCodeAt(s) && ++s, r4.slice(s));
          }, _makeLong: function(e4) {
            return e4;
          }, dirname: function(e4) {
            if (t2(e4), 0 === e4.length) return ".";
            for (var r4 = e4.charCodeAt(0), n3 = 47 === r4, i = -1, a = true, o = e4.length - 1; o >= 1; --o) if (47 === (r4 = e4.charCodeAt(o))) {
              if (!a) {
                i = o;
                break;
              }
            } else a = false;
            return -1 === i ? n3 ? "/" : "." : n3 && 1 === i ? "//" : e4.slice(0, i);
          }, basename: function(e4, r4) {
            if (void 0 !== r4 && "string" != typeof r4) throw TypeError('"ext" argument must be a string');
            t2(e4);
            var n3, i = 0, a = -1, o = true;
            if (void 0 !== r4 && r4.length > 0 && r4.length <= e4.length) {
              if (r4.length === e4.length && r4 === e4) return "";
              var s = r4.length - 1, l = -1;
              for (n3 = e4.length - 1; n3 >= 0; --n3) {
                var c = e4.charCodeAt(n3);
                if (47 === c) {
                  if (!o) {
                    i = n3 + 1;
                    break;
                  }
                } else -1 === l && (o = false, l = n3 + 1), s >= 0 && (c === r4.charCodeAt(s) ? -1 == --s && (a = n3) : (s = -1, a = l));
              }
              return i === a ? a = l : -1 === a && (a = e4.length), e4.slice(i, a);
            }
            for (n3 = e4.length - 1; n3 >= 0; --n3) if (47 === e4.charCodeAt(n3)) {
              if (!o) {
                i = n3 + 1;
                break;
              }
            } else -1 === a && (o = false, a = n3 + 1);
            return -1 === a ? "" : e4.slice(i, a);
          }, extname: function(e4) {
            t2(e4);
            for (var r4 = -1, n3 = 0, i = -1, a = true, o = 0, s = e4.length - 1; s >= 0; --s) {
              var l = e4.charCodeAt(s);
              if (47 === l) {
                if (!a) {
                  n3 = s + 1;
                  break;
                }
                continue;
              }
              -1 === i && (a = false, i = s + 1), 46 === l ? -1 === r4 ? r4 = s : 1 !== o && (o = 1) : -1 !== r4 && (o = -1);
            }
            return -1 === r4 || -1 === i || 0 === o || 1 === o && r4 === i - 1 && r4 === n3 + 1 ? "" : e4.slice(r4, i);
          }, format: function(e4) {
            var t3, r4;
            if (null === e4 || "object" != typeof e4) throw TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e4);
            return t3 = e4.dir || e4.root, r4 = e4.base || (e4.name || "") + (e4.ext || ""), t3 ? t3 === e4.root ? t3 + r4 : t3 + "/" + r4 : r4;
          }, parse: function(e4) {
            t2(e4);
            var r4, n3 = { root: "", dir: "", base: "", ext: "", name: "" };
            if (0 === e4.length) return n3;
            var i = e4.charCodeAt(0), a = 47 === i;
            a ? (n3.root = "/", r4 = 1) : r4 = 0;
            for (var o = -1, s = 0, l = -1, c = true, u = e4.length - 1, d = 0; u >= r4; --u) {
              if (47 === (i = e4.charCodeAt(u))) {
                if (!c) {
                  s = u + 1;
                  break;
                }
                continue;
              }
              -1 === l && (c = false, l = u + 1), 46 === i ? -1 === o ? o = u : 1 !== d && (d = 1) : -1 !== o && (d = -1);
            }
            return -1 === o || -1 === l || 0 === d || 1 === d && o === l - 1 && o === s + 1 ? -1 !== l && (0 === s && a ? n3.base = n3.name = e4.slice(1, l) : n3.base = n3.name = e4.slice(s, l)) : (0 === s && a ? (n3.name = e4.slice(1, o), n3.base = e4.slice(1, l)) : (n3.name = e4.slice(s, o), n3.base = e4.slice(s, l)), n3.ext = e4.slice(o, l)), s > 0 ? n3.dir = e4.slice(0, s - 1) : a && (n3.dir = "/"), n3;
          }, sep: "/", delimiter: ":", win32: null, posix: null };
          n2.posix = n2, e3.exports = n2;
        } }, r2 = {};
        function n(t2) {
          var i = r2[t2];
          if (void 0 !== i) return i.exports;
          var a = r2[t2] = { exports: {} }, o = true;
          try {
            e2[t2](a, a.exports, n), o = false;
          } finally {
            o && delete r2[t2];
          }
          return a.exports;
        }
        n.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/path-browserify/", t.exports = n(431);
      })();
    }, 64116, (e, t, r) => {
      (() => {
        "use strict";
        "u" > typeof __nccwpck_require__ && (__nccwpck_require__.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/path-to-regexp/");
        var e2 = {};
        (() => {
          function t2(e3, t3) {
            void 0 === t3 && (t3 = {});
            for (var r3 = (function(e4) {
              for (var t4 = [], r4 = 0; r4 < e4.length; ) {
                var n3 = e4[r4];
                if ("*" === n3 || "+" === n3 || "?" === n3) {
                  t4.push({ type: "MODIFIER", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("\\" === n3) {
                  t4.push({ type: "ESCAPED_CHAR", index: r4++, value: e4[r4++] });
                  continue;
                }
                if ("{" === n3) {
                  t4.push({ type: "OPEN", index: r4, value: e4[r4++] });
                  continue;
                }
                if ("}" === n3) {
                  t4.push({ type: "CLOSE", index: r4, value: e4[r4++] });
                  continue;
                }
                if (":" === n3) {
                  for (var i2 = "", a3 = r4 + 1; a3 < e4.length; ) {
                    var o3 = e4.charCodeAt(a3);
                    if (o3 >= 48 && o3 <= 57 || o3 >= 65 && o3 <= 90 || o3 >= 97 && o3 <= 122 || 95 === o3) {
                      i2 += e4[a3++];
                      continue;
                    }
                    break;
                  }
                  if (!i2) throw TypeError("Missing parameter name at ".concat(r4));
                  t4.push({ type: "NAME", index: r4, value: i2 }), r4 = a3;
                  continue;
                }
                if ("(" === n3) {
                  var s3 = 1, l2 = "", a3 = r4 + 1;
                  if ("?" === e4[a3]) throw TypeError('Pattern cannot start with "?" at '.concat(a3));
                  for (; a3 < e4.length; ) {
                    if ("\\" === e4[a3]) {
                      l2 += e4[a3++] + e4[a3++];
                      continue;
                    }
                    if (")" === e4[a3]) {
                      if (0 == --s3) {
                        a3++;
                        break;
                      }
                    } else if ("(" === e4[a3] && (s3++, "?" !== e4[a3 + 1])) throw TypeError("Capturing groups are not allowed at ".concat(a3));
                    l2 += e4[a3++];
                  }
                  if (s3) throw TypeError("Unbalanced pattern at ".concat(r4));
                  if (!l2) throw TypeError("Missing pattern at ".concat(r4));
                  t4.push({ type: "PATTERN", index: r4, value: l2 }), r4 = a3;
                  continue;
                }
                t4.push({ type: "CHAR", index: r4, value: e4[r4++] });
              }
              return t4.push({ type: "END", index: r4, value: "" }), t4;
            })(e3), n2 = t3.prefixes, a2 = void 0 === n2 ? "./" : n2, o2 = t3.delimiter, s2 = void 0 === o2 ? "/#?" : o2, l = [], c = 0, u = 0, d = "", h = function(e4) {
              if (u < r3.length && r3[u].type === e4) return r3[u++].value;
            }, p = function(e4) {
              var t4 = h(e4);
              if (void 0 !== t4) return t4;
              var n3 = r3[u], i2 = n3.type, a3 = n3.index;
              throw TypeError("Unexpected ".concat(i2, " at ").concat(a3, ", expected ").concat(e4));
            }, f = function() {
              for (var e4, t4 = ""; e4 = h("CHAR") || h("ESCAPED_CHAR"); ) t4 += e4;
              return t4;
            }, g = function(e4) {
              for (var t4 = 0; t4 < s2.length; t4++) {
                var r4 = s2[t4];
                if (e4.indexOf(r4) > -1) return true;
              }
              return false;
            }, m = function(e4) {
              var t4 = l[l.length - 1], r4 = e4 || (t4 && "string" == typeof t4 ? t4 : "");
              if (t4 && !r4) throw TypeError('Must have text between two parameters, missing text after "'.concat(t4.name, '"'));
              return !r4 || g(r4) ? "[^".concat(i(s2), "]+?") : "(?:(?!".concat(i(r4), ")[^").concat(i(s2), "])+?");
            }; u < r3.length; ) {
              var y = h("CHAR"), b = h("NAME"), v = h("PATTERN");
              if (b || v) {
                var w = y || "";
                -1 === a2.indexOf(w) && (d += w, w = ""), d && (l.push(d), d = ""), l.push({ name: b || c++, prefix: w, suffix: "", pattern: v || m(w), modifier: h("MODIFIER") || "" });
                continue;
              }
              var _ = y || h("ESCAPED_CHAR");
              if (_) {
                d += _;
                continue;
              }
              if (d && (l.push(d), d = ""), h("OPEN")) {
                var w = f(), E = h("NAME") || "", S = h("PATTERN") || "", x = f();
                p("CLOSE"), l.push({ name: E || (S ? c++ : ""), pattern: E && !S ? m(w) : S, prefix: w, suffix: x, modifier: h("MODIFIER") || "" });
                continue;
              }
              p("END");
            }
            return l;
          }
          function r2(e3, t3) {
            void 0 === t3 && (t3 = {});
            var r3 = a(t3), n2 = t3.encode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2, o2 = t3.validate, s2 = void 0 === o2 || o2, l = e3.map(function(e4) {
              if ("object" == typeof e4) return new RegExp("^(?:".concat(e4.pattern, ")$"), r3);
            });
            return function(t4) {
              for (var r4 = "", n3 = 0; n3 < e3.length; n3++) {
                var a2 = e3[n3];
                if ("string" == typeof a2) {
                  r4 += a2;
                  continue;
                }
                var o3 = t4 ? t4[a2.name] : void 0, c = "?" === a2.modifier || "*" === a2.modifier, u = "*" === a2.modifier || "+" === a2.modifier;
                if (Array.isArray(o3)) {
                  if (!u) throw TypeError('Expected "'.concat(a2.name, '" to not repeat, but got an array'));
                  if (0 === o3.length) {
                    if (c) continue;
                    throw TypeError('Expected "'.concat(a2.name, '" to not be empty'));
                  }
                  for (var d = 0; d < o3.length; d++) {
                    var h = i2(o3[d], a2);
                    if (s2 && !l[n3].test(h)) throw TypeError('Expected all "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                    r4 += a2.prefix + h + a2.suffix;
                  }
                  continue;
                }
                if ("string" == typeof o3 || "number" == typeof o3) {
                  var h = i2(String(o3), a2);
                  if (s2 && !l[n3].test(h)) throw TypeError('Expected "'.concat(a2.name, '" to match "').concat(a2.pattern, '", but got "').concat(h, '"'));
                  r4 += a2.prefix + h + a2.suffix;
                  continue;
                }
                if (!c) {
                  var p = u ? "an array" : "a string";
                  throw TypeError('Expected "'.concat(a2.name, '" to be ').concat(p));
                }
              }
              return r4;
            };
          }
          function n(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            var n2 = r3.decode, i2 = void 0 === n2 ? function(e4) {
              return e4;
            } : n2;
            return function(r4) {
              var n3 = e3.exec(r4);
              if (!n3) return false;
              for (var a2 = n3[0], o2 = n3.index, s2 = /* @__PURE__ */ Object.create(null), l = 1; l < n3.length; l++) !(function(e4) {
                if (void 0 !== n3[e4]) {
                  var r5 = t3[e4 - 1];
                  "*" === r5.modifier || "+" === r5.modifier ? s2[r5.name] = n3[e4].split(r5.prefix + r5.suffix).map(function(e5) {
                    return i2(e5, r5);
                  }) : s2[r5.name] = i2(n3[e4], r5);
                }
              })(l);
              return { path: a2, index: o2, params: s2 };
            };
          }
          function i(e3) {
            return e3.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
          }
          function a(e3) {
            return e3 && e3.sensitive ? "" : "i";
          }
          function o(e3, t3, r3) {
            void 0 === r3 && (r3 = {});
            for (var n2 = r3.strict, o2 = void 0 !== n2 && n2, s2 = r3.start, l = r3.end, c = r3.encode, u = void 0 === c ? function(e4) {
              return e4;
            } : c, d = r3.delimiter, h = r3.endsWith, p = "[".concat(i(void 0 === h ? "" : h), "]|$"), f = "[".concat(i(void 0 === d ? "/#?" : d), "]"), g = void 0 === s2 || s2 ? "^" : "", m = 0; m < e3.length; m++) {
              var y = e3[m];
              if ("string" == typeof y) g += i(u(y));
              else {
                var b = i(u(y.prefix)), v = i(u(y.suffix));
                if (y.pattern) if (t3 && t3.push(y), b || v) if ("+" === y.modifier || "*" === y.modifier) {
                  var w = "*" === y.modifier ? "?" : "";
                  g += "(?:".concat(b, "((?:").concat(y.pattern, ")(?:").concat(v).concat(b, "(?:").concat(y.pattern, "))*)").concat(v, ")").concat(w);
                } else g += "(?:".concat(b, "(").concat(y.pattern, ")").concat(v, ")").concat(y.modifier);
                else {
                  if ("+" === y.modifier || "*" === y.modifier) throw TypeError('Can not repeat "'.concat(y.name, '" without a prefix and suffix'));
                  g += "(".concat(y.pattern, ")").concat(y.modifier);
                }
                else g += "(?:".concat(b).concat(v, ")").concat(y.modifier);
              }
            }
            if (void 0 === l || l) o2 || (g += "".concat(f, "?")), g += r3.endsWith ? "(?=".concat(p, ")") : "$";
            else {
              var _ = e3[e3.length - 1], E = "string" == typeof _ ? f.indexOf(_[_.length - 1]) > -1 : void 0 === _;
              o2 || (g += "(?:".concat(f, "(?=").concat(p, "))?")), E || (g += "(?=".concat(f, "|").concat(p, ")"));
            }
            return new RegExp(g, a(r3));
          }
          function s(e3, r3, n2) {
            if (e3 instanceof RegExp) {
              var i2;
              if (!r3) return e3;
              for (var l = /\((?:\?<(.*?)>)?(?!\?)/g, c = 0, u = l.exec(e3.source); u; ) r3.push({ name: u[1] || c++, prefix: "", suffix: "", modifier: "", pattern: "" }), u = l.exec(e3.source);
              return e3;
            }
            return Array.isArray(e3) ? (i2 = e3.map(function(e4) {
              return s(e4, r3, n2).source;
            }), new RegExp("(?:".concat(i2.join("|"), ")"), a(n2))) : o(t2(e3, n2), r3, n2);
          }
          Object.defineProperty(e2, "__esModule", { value: true }), e2.pathToRegexp = e2.tokensToRegexp = e2.regexpToFunction = e2.match = e2.tokensToFunction = e2.compile = e2.parse = void 0, e2.parse = t2, e2.compile = function(e3, n2) {
            return r2(t2(e3, n2), n2);
          }, e2.tokensToFunction = r2, e2.match = function(e3, t3) {
            var r3 = [];
            return n(s(e3, r3, t3), r3, t3);
          }, e2.regexpToFunction = n, e2.tokensToRegexp = o, e2.pathToRegexp = s;
        })(), t.exports = e2;
      })();
    }, 81747, (e, t, r) => {
      "use strict";
      var n = { H: null, A: null };
      function i(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++) t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var a = Array.isArray;
      function o() {
      }
      var s = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.fragment"), u = /* @__PURE__ */ Symbol.for("react.strict_mode"), d = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.forward_ref"), p = /* @__PURE__ */ Symbol.for("react.suspense"), f = /* @__PURE__ */ Symbol.for("react.memo"), g = /* @__PURE__ */ Symbol.for("react.lazy"), m = /* @__PURE__ */ Symbol.for("react.activity"), y = /* @__PURE__ */ Symbol.for("react.view_transition"), b = Symbol.iterator, v = Object.prototype.hasOwnProperty, w = Object.assign;
      function _(e2, t2, r2) {
        var n2 = r2.ref;
        return { $$typeof: s, type: e2, key: t2, ref: void 0 !== n2 ? n2 : null, props: r2 };
      }
      function E(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === s;
      }
      var S = /\/+/g;
      function x(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function P(e2, t2, r2) {
        if (null == e2) return e2;
        var n2 = [], c2 = 0;
        return !(function e3(t3, r3, n3, c3, u2) {
          var d2, h2, p2, f2 = typeof t3;
          ("undefined" === f2 || "boolean" === f2) && (t3 = null);
          var m2 = false;
          if (null === t3) m2 = true;
          else switch (f2) {
            case "bigint":
            case "string":
            case "number":
              m2 = true;
              break;
            case "object":
              switch (t3.$$typeof) {
                case s:
                case l:
                  m2 = true;
                  break;
                case g:
                  return e3((m2 = t3._init)(t3._payload), r3, n3, c3, u2);
              }
          }
          if (m2) return u2 = u2(t3), m2 = "" === c3 ? "." + x(t3, 0) : c3, a(u2) ? (n3 = "", null != m2 && (n3 = m2.replace(S, "$&/") + "/"), e3(u2, r3, n3, "", function(e4) {
            return e4;
          })) : null != u2 && (E(u2) && (d2 = u2, h2 = n3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(S, "$&/") + "/") + m2, u2 = _(d2.type, h2, d2.props)), r3.push(u2)), 1;
          m2 = 0;
          var y2 = "" === c3 ? "." : c3 + ":";
          if (a(t3)) for (var v2 = 0; v2 < t3.length; v2++) f2 = y2 + x(c3 = t3[v2], v2), m2 += e3(c3, r3, n3, f2, u2);
          else if ("function" == typeof (v2 = null === (p2 = t3) || "object" != typeof p2 ? null : "function" == typeof (p2 = b && p2[b] || p2["@@iterator"]) ? p2 : null)) for (t3 = v2.call(t3), v2 = 0; !(c3 = t3.next()).done; ) f2 = y2 + x(c3 = c3.value, v2++), m2 += e3(c3, r3, n3, f2, u2);
          else if ("object" === f2) {
            if ("function" == typeof t3.then) return e3((function(e4) {
              switch (e4.status) {
                case "fulfilled":
                  return e4.value;
                case "rejected":
                  throw e4.reason;
                default:
                  switch ("string" == typeof e4.status ? e4.then(o, o) : (e4.status = "pending", e4.then(function(t4) {
                    "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                  }, function(t4) {
                    "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                  })), e4.status) {
                    case "fulfilled":
                      return e4.value;
                    case "rejected":
                      throw e4.reason;
                  }
              }
              throw e4;
            })(t3), r3, n3, c3, u2);
            throw Error(i(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        })(e2, n2, "", "", function(e3) {
          return t2.call(r2, e3, c2++);
        }), n2;
      }
      function T(e2) {
        if (-1 === e2._status) {
          var t2 = (0, e2._result)();
          t2.then(function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = r2, void 0 === t2.status && (t2.status = "fulfilled", t2.value = r2));
          }, function(r2) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = r2, void 0 === t2.status && (t2.status = "rejected", t2.reason = r2));
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status) return e2._result.default;
        throw e2._result;
      }
      function A() {
        return /* @__PURE__ */ new WeakMap();
      }
      function R() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      r.Activity = m, r.Children = { map: P, forEach: function(e2, t2, r2) {
        P(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return P(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return P(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!E(e2)) throw Error(i(143));
        return e2;
      } }, r.Fragment = c, r.Profiler = d, r.StrictMode = u, r.Suspense = p, r.ViewTransition = y, r.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = n, r.cache = function(e2) {
        return function() {
          var t2 = n.A;
          if (!t2) return e2.apply(null, arguments);
          var r2 = t2.getCacheForType(A);
          void 0 === (t2 = r2.get(e2)) && (t2 = R(), r2.set(e2, t2)), r2 = 0;
          for (var i2 = arguments.length; r2 < i2; r2++) {
            var a2 = arguments[r2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = R(), o2.set(a2, t2));
            } else null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = R(), o2.set(a2, t2));
          }
          if (1 === t2.s) return t2.v;
          if (2 === t2.s) throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (r2 = t2).s = 1, r2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, r.cacheSignal = function() {
        var e2 = n.A;
        return e2 ? e2.cacheSignal() : null;
      }, r.captureOwnerStack = function() {
        return null;
      }, r.cloneElement = function(e2, t2, r2) {
        if (null == e2) throw Error(i(267, e2));
        var n2 = w({}, e2.props), a2 = e2.key;
        if (null != t2) for (o2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) v.call(t2, o2) && "key" !== o2 && "__self" !== o2 && "__source" !== o2 && ("ref" !== o2 || void 0 !== t2.ref) && (n2[o2] = t2[o2]);
        var o2 = arguments.length - 2;
        if (1 === o2) n2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          n2.children = s2;
        }
        return _(e2.type, a2, n2);
      }, r.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2) for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2) v.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2) i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++) s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps) for (n2 in o2 = e2.defaultProps) void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return _(e2, a2, i2);
      }, r.createRef = function() {
        return { current: null };
      }, r.forwardRef = function(e2) {
        return { $$typeof: h, render: e2 };
      }, r.isValidElement = E, r.lazy = function(e2) {
        return { $$typeof: g, _payload: { _status: -1, _result: e2 }, _init: T };
      }, r.memo = function(e2, t2) {
        return { $$typeof: f, type: e2, compare: void 0 === t2 ? null : t2 };
      }, r.use = function(e2) {
        return n.H.use(e2);
      }, r.useCallback = function(e2, t2) {
        return n.H.useCallback(e2, t2);
      }, r.useDebugValue = function() {
      }, r.useId = function() {
        return n.H.useId();
      }, r.useMemo = function(e2, t2) {
        return n.H.useMemo(e2, t2);
      }, r.version = "19.3.0-canary-278794d7-20261002";
    }, 35423, (e, t, r) => {
      "use strict";
      t.exports = e.r(81747);
    }, 28755, (e, t, r) => {
      var n = { 943: function(t2, r2) {
        !(function(n2) {
          "use strict";
          var i2 = "function", a2 = "undefined", o = "object", s = "string", l = "major", c = "model", u = "name", d = "type", h = "vendor", p = "version", f = "architecture", g = "console", m = "mobile", y = "tablet", b = "smarttv", v = "wearable", w = "embedded", _ = "Amazon", E = "Apple", S = "ASUS", x = "BlackBerry", P = "Browser", T = "Chrome", A = "Firefox", R = "Google", C = "Huawei", O = "Microsoft", k = "Motorola", N = "Opera", I = "Samsung", M = "Sharp", D = "Sony", $ = "Xiaomi", L = "Zebra", j = "Facebook", q = "Chromium OS", U = "Mac OS", F = function(e2, t3) {
            var r3 = {};
            for (var n3 in e2) t3[n3] && t3[n3].length % 2 == 0 ? r3[n3] = t3[n3].concat(e2[n3]) : r3[n3] = e2[n3];
            return r3;
          }, V = function(e2) {
            for (var t3 = {}, r3 = 0; r3 < e2.length; r3++) t3[e2[r3].toUpperCase()] = e2[r3];
            return t3;
          }, B = function(e2, t3) {
            return typeof e2 === s && -1 !== H(t3).indexOf(H(e2));
          }, H = function(e2) {
            return e2.toLowerCase();
          }, G = function(e2, t3) {
            if (typeof e2 === s) return e2 = e2.replace(/^\s\s*/, ""), typeof t3 === a2 ? e2 : e2.substring(0, 350);
          }, W = function(e2, t3) {
            for (var r3, n3, a3, s2, l2, c2, u2 = 0; u2 < t3.length && !l2; ) {
              var d2 = t3[u2], h2 = t3[u2 + 1];
              for (r3 = n3 = 0; r3 < d2.length && !l2 && d2[r3]; ) if (l2 = d2[r3++].exec(e2)) for (a3 = 0; a3 < h2.length; a3++) c2 = l2[++n3], typeof (s2 = h2[a3]) === o && s2.length > 0 ? 2 === s2.length ? typeof s2[1] == i2 ? this[s2[0]] = s2[1].call(this, c2) : this[s2[0]] = s2[1] : 3 === s2.length ? typeof s2[1] !== i2 || s2[1].exec && s2[1].test ? this[s2[0]] = c2 ? c2.replace(s2[1], s2[2]) : void 0 : this[s2[0]] = c2 ? s2[1].call(this, c2, s2[2]) : void 0 : 4 === s2.length && (this[s2[0]] = c2 ? s2[3].call(this, c2.replace(s2[1], s2[2])) : void 0) : this[s2] = c2 || void 0;
              u2 += 2;
            }
          }, J = function(e2, t3) {
            for (var r3 in t3) if (typeof t3[r3] === o && t3[r3].length > 0) {
              for (var n3 = 0; n3 < t3[r3].length; n3++) if (B(t3[r3][n3], e2)) return "?" === r3 ? void 0 : r3;
            } else if (B(t3[r3], e2)) return "?" === r3 ? void 0 : r3;
            return e2;
          }, z = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, K = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [p, [u, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [p, [u, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [u, p], [/opios[\/ ]+([\w\.]+)/i], [p, [u, N + " Mini"]], [/\bopr\/([\w\.]+)/i], [p, [u, N]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [u, p], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [p, [u, "UC" + P]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [p, [u, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [p, [u, "WeChat"]], [/konqueror\/([\w\.]+)/i], [p, [u, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [p, [u, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [p, [u, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[u, /(.+)/, "$1 Secure " + P], p], [/\bfocus\/([\w\.]+)/i], [p, [u, A + " Focus"]], [/\bopt\/([\w\.]+)/i], [p, [u, N + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [p, [u, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [p, [u, "Dolphin"]], [/coast\/([\w\.]+)/i], [p, [u, N + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [p, [u, "MIUI " + P]], [/fxios\/([-\w\.]+)/i], [p, [u, A]], [/\bqihu|(qi?ho?o?|360)browser/i], [[u, "360 " + P]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[u, /(.+)/, "$1 " + P], p], [/(comodo_dragon)\/([\w\.]+)/i], [[u, /_/g, " "], p], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [u, p], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [u], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[u, j], p], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [u, p], [/\bgsa\/([\w\.]+) .*safari\//i], [p, [u, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [p, [u, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [p, [u, T + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[u, T + " WebView"], p], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [p, [u, "Android " + P]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [u, p], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [p, [u, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [p, u], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [u, [p, J, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [u, p], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[u, "Netscape"], p], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [p, [u, A + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [u, p], [/(cobalt)\/([\w\.]+)/i], [u, [p, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[f, "amd64"]], [/(ia32(?=;))/i], [[f, H]], [/((?:i[346]|x)86)[;\)]/i], [[f, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[f, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[f, "armhf"]], [/windows (ce|mobile); ppc;/i], [[f, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[f, /ower/, "", H]], [/(sun4\w)[;\)]/i], [[f, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[f, H]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [c, [h, I], [d, y]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [c, [h, I], [d, m]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [c, [h, E], [d, m]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [c, [h, E], [d, y]], [/(macintosh);/i], [c, [h, E]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [c, [h, M], [d, m]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [c, [h, C], [d, y]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [c, [h, C], [d, m]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[c, /_/g, " "], [h, $], [d, m]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[c, /_/g, " "], [h, $], [d, y]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [c, [h, "OPPO"], [d, m]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [c, [h, "Vivo"], [d, m]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [c, [h, "Realme"], [d, m]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [c, [h, k], [d, m]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [c, [h, k], [d, y]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [c, [h, "LG"], [d, y]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [c, [h, "LG"], [d, m]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [c, [h, "Lenovo"], [d, y]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[c, /_/g, " "], [h, "Nokia"], [d, m]], [/(pixel c)\b/i], [c, [h, R], [d, y]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [c, [h, R], [d, m]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [c, [h, D], [d, m]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[c, "Xperia Tablet"], [h, D], [d, y]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [c, [h, "OnePlus"], [d, m]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [c, [h, _], [d, y]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[c, /(.+)/g, "Fire Phone $1"], [h, _], [d, m]], [/(playbook);[-\w\),; ]+(rim)/i], [c, h, [d, y]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [c, [h, x], [d, m]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [c, [h, S], [d, y]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [c, [h, S], [d, m]], [/(nexus 9)/i], [c, [h, "HTC"], [d, y]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [h, [c, /_/g, " "], [d, m]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [c, [h, "Acer"], [d, y]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [c, [h, "Meizu"], [d, m]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [h, c, [d, m]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [h, c, [d, y]], [/(surface duo)/i], [c, [h, O], [d, y]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [c, [h, "Fairphone"], [d, m]], [/(u304aa)/i], [c, [h, "AT&T"], [d, m]], [/\bsie-(\w*)/i], [c, [h, "Siemens"], [d, m]], [/\b(rct\w+) b/i], [c, [h, "RCA"], [d, y]], [/\b(venue[\d ]{2,7}) b/i], [c, [h, "Dell"], [d, y]], [/\b(q(?:mv|ta)\w+) b/i], [c, [h, "Verizon"], [d, y]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [c, [h, "Barnes & Noble"], [d, y]], [/\b(tm\d{3}\w+) b/i], [c, [h, "NuVision"], [d, y]], [/\b(k88) b/i], [c, [h, "ZTE"], [d, y]], [/\b(nx\d{3}j) b/i], [c, [h, "ZTE"], [d, m]], [/\b(gen\d{3}) b.+49h/i], [c, [h, "Swiss"], [d, m]], [/\b(zur\d{3}) b/i], [c, [h, "Swiss"], [d, y]], [/\b((zeki)?tb.*\b) b/i], [c, [h, "Zeki"], [d, y]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[h, "Dragon Touch"], c, [d, y]], [/\b(ns-?\w{0,9}) b/i], [c, [h, "Insignia"], [d, y]], [/\b((nxa|next)-?\w{0,9}) b/i], [c, [h, "NextBook"], [d, y]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[h, "Voice"], c, [d, m]], [/\b(lvtel\-)?(v1[12]) b/i], [[h, "LvTel"], c, [d, m]], [/\b(ph-1) /i], [c, [h, "Essential"], [d, m]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [c, [h, "Envizen"], [d, y]], [/\b(trio[-\w\. ]+) b/i], [c, [h, "MachSpeed"], [d, y]], [/\btu_(1491) b/i], [c, [h, "Rotor"], [d, y]], [/(shield[\w ]+) b/i], [c, [h, "Nvidia"], [d, y]], [/(sprint) (\w+)/i], [h, c, [d, m]], [/(kin\.[onetw]{3})/i], [[c, /\./g, " "], [h, O], [d, m]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [c, [h, L], [d, y]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [c, [h, L], [d, m]], [/smart-tv.+(samsung)/i], [h, [d, b]], [/hbbtv.+maple;(\d+)/i], [[c, /^/, "SmartTV"], [h, I], [d, b]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[h, "LG"], [d, b]], [/(apple) ?tv/i], [h, [c, E + " TV"], [d, b]], [/crkey/i], [[c, T + "cast"], [h, R], [d, b]], [/droid.+aft(\w)( bui|\))/i], [c, [h, _], [d, b]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [c, [h, M], [d, b]], [/(bravia[\w ]+)( bui|\))/i], [c, [h, D], [d, b]], [/(mitv-\w{5}) bui/i], [c, [h, $], [d, b]], [/Hbbtv.*(technisat) (.*);/i], [h, c, [d, b]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[h, G], [c, G], [d, b]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[d, b]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [h, c, [d, g]], [/droid.+; (shield) bui/i], [c, [h, "Nvidia"], [d, g]], [/(playstation [345portablevi]+)/i], [c, [h, D], [d, g]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [c, [h, O], [d, g]], [/((pebble))app/i], [h, c, [d, v]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [c, [h, E], [d, v]], [/droid.+; (glass) \d/i], [c, [h, R], [d, v]], [/droid.+; (wt63?0{2,3})\)/i], [c, [h, L], [d, v]], [/(quest( 2| pro)?)/i], [c, [h, j], [d, v]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [h, [d, w]], [/(aeobc)\b/i], [c, [h, _], [d, w]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [c, [d, m]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [c, [d, y]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[d, y]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[d, m]], [/(android[-\w\. ]{0,9});.+buil/i], [c, [h, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [p, [u, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [p, [u, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [u, p], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [p, u]], os: [[/microsoft (windows) (vista|xp)/i], [u, p], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [u, [p, J, z]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[u, "Windows"], [p, J, z]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[p, /_/g, "."], [u, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[u, U], [p, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [p, u], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [u, p], [/\(bb(10);/i], [p, [u, x]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [p, [u, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [p, [u, A + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [p, [u, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [p, [u, "watchOS"]], [/crkey\/([\d\.]+)/i], [p, [u, T + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[u, q], p], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [u, p], [/(sunos) ?([\w\.\d]*)/i], [[u, "Solaris"], p], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [u, p]] }, Q = function(e2, t3) {
            if (typeof e2 === o && (t3 = e2, e2 = void 0), !(this instanceof Q)) return new Q(e2, t3).getResult();
            var r3 = typeof n2 !== a2 && n2.navigator ? n2.navigator : void 0, g2 = e2 || (r3 && r3.userAgent ? r3.userAgent : ""), b2 = r3 && r3.userAgentData ? r3.userAgentData : void 0, v2 = t3 ? F(K, t3) : K, w2 = r3 && r3.userAgent == g2;
            return this.getBrowser = function() {
              var e3, t4 = {};
              return t4[u] = void 0, t4[p] = void 0, W.call(t4, g2, v2.browser), t4[l] = typeof (e3 = t4[p]) === s ? e3.replace(/[^\d\.]/g, "").split(".")[0] : void 0, w2 && r3 && r3.brave && typeof r3.brave.isBrave == i2 && (t4[u] = "Brave"), t4;
            }, this.getCPU = function() {
              var e3 = {};
              return e3[f] = void 0, W.call(e3, g2, v2.cpu), e3;
            }, this.getDevice = function() {
              var e3 = {};
              return e3[h] = void 0, e3[c] = void 0, e3[d] = void 0, W.call(e3, g2, v2.device), w2 && !e3[d] && b2 && b2.mobile && (e3[d] = m), w2 && "Macintosh" == e3[c] && r3 && typeof r3.standalone !== a2 && r3.maxTouchPoints && r3.maxTouchPoints > 2 && (e3[c] = "iPad", e3[d] = y), e3;
            }, this.getEngine = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, W.call(e3, g2, v2.engine), e3;
            }, this.getOS = function() {
              var e3 = {};
              return e3[u] = void 0, e3[p] = void 0, W.call(e3, g2, v2.os), w2 && !e3[u] && b2 && "Unknown" != b2.platform && (e3[u] = b2.platform.replace(/chrome os/i, q).replace(/macos/i, U)), e3;
            }, this.getResult = function() {
              return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
            }, this.getUA = function() {
              return g2;
            }, this.setUA = function(e3) {
              return g2 = typeof e3 === s && e3.length > 350 ? G(e3, 350) : e3, this;
            }, this.setUA(g2), this;
          };
          if (Q.VERSION = "1.0.35", Q.BROWSER = V([u, p, l]), Q.CPU = V([f]), Q.DEVICE = V([c, h, d, g, m, b, y, v, w]), Q.ENGINE = Q.OS = V([u, p]), typeof r2 !== a2) t2.exports && (r2 = t2.exports = Q), r2.UAParser = Q;
          else if (typeof define === i2 && define.amd) e.r, void 0 !== Q && e.v(Q);
          else typeof n2 !== a2 && (n2.UAParser = Q);
          var X = typeof n2 !== a2 && (n2.jQuery || n2.Zepto);
          if (X && !X.ua) {
            var Y = new Q();
            X.ua = Y.getResult(), X.ua.get = function() {
              return Y.getUA();
            }, X.ua.set = function(e2) {
              Y.setUA(e2);
              var t3 = Y.getResult();
              for (var r3 in t3) X.ua[r3] = t3[r3];
            };
          }
        })(this);
      } }, i = {};
      function a(e2) {
        var t2 = i[e2];
        if (void 0 !== t2) return t2.exports;
        var r2 = i[e2] = { exports: {} }, o = true;
        try {
          n[e2].call(r2.exports, r2, r2.exports, a), o = false;
        } finally {
          o && delete i[e2];
        }
        return r2.exports;
      }
      a.ab = "/ROOT/node_modules/.pnpm/next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node@20.19.43_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/ua-parser-js/", t.exports = a(943);
    }, 36294, (e, t, r) => {
    }, 62407, (e) => {
      "use strict";
      let t, r, n, i;
      async function a() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      e.i(36294);
      let o = null;
      async function s() {
        if ("phase-production-build" === process.env.NEXT_PHASE) return;
        o || (o = a());
        let e10 = await o;
        if (null == e10 ? void 0 : e10.register) try {
          await e10.register();
        } catch (e11) {
          throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
        }
      }
      async function l(...e10) {
        let t10 = await a();
        try {
          var r10;
          await (null == t10 || null == (r10 = t10.onRequestError) ? void 0 : r10.call(t10, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let c = null;
      function u() {
        return c || (c = s()), c;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== e.g.process && (process.env = e.g.process.env, e.g.process = process);
      try {
        Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
          let t10 = new Proxy(function() {
          }, { get(t11, r10) {
            if ("then" === r10) return {};
            throw Error(d(e10));
          }, construct() {
            throw Error(d(e10));
          }, apply(r10, n2, i2) {
            if ("function" == typeof i2[0]) return i2[0](t10);
            throw Error(d(e10));
          } });
          return new Proxy({}, { get: () => t10 });
        }, enumerable: false, configurable: false });
      } catch {
      }
      u();
      class h extends Error {
        constructor({ page: e10 }) {
          super(`The middleware "${e10}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class p extends Error {
        constructor() {
          super("The request.page has been deprecated in favour of `URLPattern`.\n  Read more: https://nextjs.org/docs/messages/middleware-request-page\n  ");
        }
      }
      class f extends Error {
        constructor() {
          super("The request.ua has been removed in favour of `userAgent` function.\n  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent\n  ");
        }
      }
      let g = "x-prerender-revalidate", m = "x-prerender-revalidate-if-generated", y = ".segments", b = ".segment.rsc", v = ".rsc", w = ".json", _ = ".meta", E = "x-next-cache-tags", S = "x-next-revalidated-tags", x = "_N_T_", P = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", apiNode: "api-node", apiEdge: "api-edge", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser", pagesDirBrowser: "pages-dir-browser", pagesDirEdge: "pages-dir-edge", pagesDirNode: "pages-dir-node" };
      function T(e10) {
        var t10, r10, n2, i2, a2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e10.length && /\s/.test(e10.charAt(s2)); ) s2 += 1;
          return s2 < e10.length;
        }
        for (; s2 < e10.length; ) {
          for (t10 = s2, a2 = false; l2(); ) if ("," === (r10 = e10.charAt(s2))) {
            for (n2 = s2, s2 += 1, l2(), i2 = s2; s2 < e10.length && "=" !== (r10 = e10.charAt(s2)) && ";" !== r10 && "," !== r10; ) s2 += 1;
            s2 < e10.length && "=" === e10.charAt(s2) ? (a2 = true, s2 = i2, o2.push(e10.substring(t10, n2)), t10 = s2) : s2 = n2 + 1;
          } else s2 += 1;
          (!a2 || s2 >= e10.length) && o2.push(e10.substring(t10, e10.length));
        }
        return o2;
      }
      function A(e10) {
        let t10 = {}, r10 = [];
        if (e10) for (let [n2, i2] of e10.entries()) "set-cookie" === n2.toLowerCase() ? (r10.push(...T(i2)), t10[n2] = 1 === r10.length ? r10[0] : r10) : t10[n2] = i2;
        return t10;
      }
      function R(e10) {
        try {
          return String(new URL(String(e10)));
        } catch (t10) {
          throw Error(`URL is malformed "${String(e10)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t10 });
        }
      }
      ({ ...P, GROUP: { builtinReact: [P.reactServerComponents, P.actionBrowser], serverOnly: [P.reactServerComponents, P.actionBrowser, P.instrument, P.middleware], neutralTarget: [P.apiNode, P.apiEdge], clientOnly: [P.serverSideRendering, P.appPagesBrowser], bundled: [P.reactServerComponents, P.actionBrowser, P.serverSideRendering, P.appPagesBrowser, P.shared, P.instrument, P.middleware], appPages: [P.reactServerComponents, P.serverSideRendering, P.appPagesBrowser, P.actionBrowser] } });
      let C = /* @__PURE__ */ Symbol("response"), O = /* @__PURE__ */ Symbol("passThrough"), k = /* @__PURE__ */ Symbol("waitUntil");
      class N {
        constructor(e10, t10) {
          this[O] = false, this[k] = t10 ? { kind: "external", function: t10 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[C] || (this[C] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[O] = true;
        }
        waitUntil(e10) {
          if ("external" === this[k].kind) return (0, this[k].function)(e10);
          this[k].promises.push(e10);
        }
      }
      class I extends N {
        constructor(e10) {
          var t10;
          super(e10.request, null == (t10 = e10.context) ? void 0 : t10.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new h({ page: this.sourcePage });
        }
        respondWith() {
          throw new h({ page: this.sourcePage });
        }
      }
      function M(e10) {
        return 47 === e10.charCodeAt(e10.length - 1) && e10.length > 1 ? e10.slice(0, -1) : e10;
      }
      function D(e10) {
        let t10 = e10.indexOf("#"), r10 = e10.indexOf("?"), n2 = r10 > -1 && (t10 < 0 || r10 < t10);
        return n2 || t10 > -1 ? { pathname: e10.substring(0, n2 ? r10 : t10), query: n2 ? e10.substring(r10, t10 > -1 ? t10 : void 0) : "", hash: t10 > -1 ? e10.slice(t10) : "" } : { pathname: e10, query: "", hash: "" };
      }
      function $(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: i2 } = D(e10);
        return `${t10}${r10}${n2}${i2}`;
      }
      function L(e10, t10) {
        if (!e10.startsWith("/") || !t10) return e10;
        let { pathname: r10, query: n2, hash: i2 } = D(e10);
        return `${r10}${t10}${n2}${i2}`;
      }
      function j(e10, t10) {
        if ("string" != typeof e10) return false;
        let { pathname: r10 } = D(e10);
        return r10 === t10 || r10.startsWith(t10 + "/");
      }
      let q = /* @__PURE__ */ new WeakMap();
      function U(e10, t10) {
        let r10;
        if (!t10) return { pathname: e10 };
        let n2 = q.get(t10);
        n2 || (n2 = t10.map((e11) => e11.toLowerCase()), q.set(t10, n2));
        let i2 = e10.split("/", 2);
        if (!i2[1]) return { pathname: e10 };
        let a2 = i2[1].toLowerCase(), o2 = n2.indexOf(a2);
        return o2 < 0 ? { pathname: e10 } : (r10 = t10[o2], { pathname: e10 = e10.slice(r10.length + 1) || "/", detectedLocale: r10 });
      }
      let F = /^(?:127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)$/;
      function V(e10, t10) {
        let r10 = new URL(String(e10), t10 && String(t10));
        return F.test(r10.hostname) && (r10.hostname = "localhost"), r10;
      }
      let B = /* @__PURE__ */ Symbol("NextURLInternal");
      class H {
        constructor(e10, t10, r10) {
          let n2, i2;
          "object" == typeof t10 && "pathname" in t10 || "string" == typeof t10 ? (n2 = t10, i2 = r10 || {}) : i2 = r10 || t10 || {}, this[B] = { url: V(e10, n2 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e10, t10, r10, n2, i2;
          let a2 = (function(e11, t11) {
            let { basePath: r11, i18n: n3, trailingSlash: i3 } = t11.nextConfig ?? {}, a3 = { pathname: e11, trailingSlash: "/" !== e11 ? e11.endsWith("/") : i3 };
            r11 && j(a3.pathname, r11) && (a3.pathname = (function(e12, t12) {
              if (!j(e12, t12)) return e12;
              let r12 = e12.slice(t12.length);
              return r12.startsWith("/") ? r12 : `/${r12}`;
            })(a3.pathname, r11), a3.basePath = r11);
            let o3 = a3.pathname;
            if (a3.pathname.startsWith("/_next/data/") && a3.pathname.endsWith(".json")) {
              let e12 = a3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/");
              a3.buildId = e12[0], o3 = "index" !== e12[1] ? `/${e12.slice(1).join("/")}` : "/", true === t11.parseData && (a3.pathname = o3);
            }
            if (n3) {
              let e12 = t11.i18nProvider ? t11.i18nProvider.analyze(a3.pathname) : U(a3.pathname, n3.locales);
              a3.locale = e12.detectedLocale, a3.pathname = e12.pathname ?? a3.pathname, !e12.detectedLocale && a3.buildId && (e12 = t11.i18nProvider ? t11.i18nProvider.analyze(o3) : U(o3, n3.locales)).detectedLocale && (a3.locale = e12.detectedLocale);
            }
            return a3;
          })(this[B].url.pathname, { nextConfig: this[B].options.nextConfig, parseData: true, i18nProvider: this[B].options.i18nProvider }), o2 = (function(e11, t11) {
            let r11;
            if (t11?.host && !Array.isArray(t11.host)) r11 = t11.host.toString().split(":", 1)[0];
            else {
              if (!e11.hostname) return;
              r11 = e11.hostname;
            }
            return r11.toLowerCase();
          })(this[B].url, this[B].options.headers);
          this[B].domainLocale = this[B].options.i18nProvider ? this[B].options.i18nProvider.detectDomainLocale(o2) : (function(e11, t11, r11) {
            if (e11) {
              for (let n3 of (r11 && (r11 = r11.toLowerCase()), e11)) if (t11 === n3.domain?.split(":", 1)[0].toLowerCase() || r11 === n3.defaultLocale.toLowerCase() || n3.locales?.some((e12) => e12.toLowerCase() === r11)) return n3;
            }
          })(null == (t10 = this[B].options.nextConfig) || null == (e10 = t10.i18n) ? void 0 : e10.domains, o2);
          let s2 = (null == (r10 = this[B].domainLocale) ? void 0 : r10.defaultLocale) || (null == (i2 = this[B].options.nextConfig) || null == (n2 = i2.i18n) ? void 0 : n2.defaultLocale);
          this[B].url.pathname = a2.pathname, this[B].defaultLocale = s2, this[B].basePath = a2.basePath ?? "", this[B].buildId = a2.buildId, this[B].locale = a2.locale ?? s2, this[B].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e10;
          let t10;
          return t10 = (function(e11, t11, r10, n2) {
            if (!t11 || t11 === r10) return e11;
            let i2 = e11.toLowerCase();
            return !n2 && (j(i2, "/api") || j(i2, `/${t11.toLowerCase()}`)) ? e11 : $(e11, `/${t11}`);
          })((e10 = { basePath: this[B].basePath, buildId: this[B].buildId, defaultLocale: this[B].options.forceLocale ? void 0 : this[B].defaultLocale, locale: this[B].locale, pathname: this[B].url.pathname, trailingSlash: this[B].trailingSlash }).pathname, e10.locale, e10.buildId ? void 0 : e10.defaultLocale, e10.ignorePrefix), (e10.buildId || !e10.trailingSlash) && (t10 = M(t10)), e10.buildId && (t10 = L($(t10, `/_next/data/${e10.buildId}`), "/" === e10.pathname ? "index.json" : ".json")), t10 = $(t10, e10.basePath), !e10.buildId && e10.trailingSlash ? t10.endsWith("/") ? t10 : L(t10, "/") : M(t10);
        }
        formatSearch() {
          return this[B].url.search;
        }
        get buildId() {
          return this[B].buildId;
        }
        set buildId(e10) {
          this[B].buildId = e10;
        }
        get locale() {
          return this[B].locale ?? "";
        }
        set locale(e10) {
          var t10, r10;
          if (!this[B].locale || !(null == (r10 = this[B].options.nextConfig) || null == (t10 = r10.i18n) ? void 0 : t10.locales.includes(e10))) throw TypeError(`The NextURL configuration includes no locale "${e10}"`);
          this[B].locale = e10;
        }
        get defaultLocale() {
          return this[B].defaultLocale;
        }
        get domainLocale() {
          return this[B].domainLocale;
        }
        get searchParams() {
          return this[B].url.searchParams;
        }
        get host() {
          return this[B].url.host;
        }
        set host(e10) {
          this[B].url.host = e10;
        }
        get hostname() {
          return this[B].url.hostname;
        }
        set hostname(e10) {
          this[B].url.hostname = e10;
        }
        get port() {
          return this[B].url.port;
        }
        set port(e10) {
          this[B].url.port = e10;
        }
        get protocol() {
          return this[B].url.protocol;
        }
        set protocol(e10) {
          this[B].url.protocol = e10;
        }
        get href() {
          let e10 = this.formatPathname(), t10 = this.formatSearch();
          return `${this.protocol}//${this.host}${e10}${t10}${this.hash}`;
        }
        set href(e10) {
          this[B].url = V(e10), this.analyze();
        }
        get origin() {
          return this[B].url.origin;
        }
        get pathname() {
          return this[B].url.pathname;
        }
        set pathname(e10) {
          this[B].url.pathname = e10;
        }
        get hash() {
          return this[B].url.hash;
        }
        set hash(e10) {
          this[B].url.hash = e10;
        }
        get search() {
          return this[B].url.search;
        }
        set search(e10) {
          this[B].url.search = e10;
        }
        get password() {
          return this[B].url.password;
        }
        set password(e10) {
          this[B].url.password = e10;
        }
        get username() {
          return this[B].url.username;
        }
        set username(e10) {
          this[B].url.username = e10;
        }
        get basePath() {
          return this[B].basePath;
        }
        set basePath(e10) {
          this[B].basePath = e10.startsWith("/") ? e10 : `/${e10}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new H(String(this), this[B].options);
        }
      }
      var G, W, J, z, K, Q, X, Y, Z, ee, et, er, en, ei, ea, eo, es, el, ec, eu, ed, eh, ep = e.i(11439);
      let ef = /* @__PURE__ */ Symbol("internal request");
      class eg extends Request {
        constructor(e10, t10 = {}) {
          let r10 = "string" != typeof e10 && "url" in e10 ? e10.url : String(e10);
          R(r10), e10 instanceof Request ? super(e10, t10) : super(r10, t10);
          let n2 = new H(r10, { headers: A(this.headers), nextConfig: t10.nextConfig });
          this[ef] = { cookies: new ep.RequestCookies(this.headers), nextUrl: n2, url: n2.toString() };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[ef].cookies;
        }
        get nextUrl() {
          return this[ef].nextUrl;
        }
        get page() {
          throw new p();
        }
        get ua() {
          throw new f();
        }
        get url() {
          return this[ef].url;
        }
      }
      class em {
        static get(e10, t10, r10) {
          let n2 = Reflect.get(e10, t10, r10);
          return "function" == typeof n2 ? n2.bind(e10) : n2;
        }
        static set(e10, t10, r10, n2) {
          return Reflect.set(e10, t10, r10, n2);
        }
        static has(e10, t10) {
          return Reflect.has(e10, t10);
        }
        static deleteProperty(e10, t10) {
          return Reflect.deleteProperty(e10, t10);
        }
      }
      let ey = /* @__PURE__ */ Symbol("internal response"), eb = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function ev(e10, t10) {
        var r10;
        if (null == e10 || null == (r10 = e10.request) ? void 0 : r10.headers) {
          if (!(e10.request.headers instanceof Headers)) throw Error("request.headers must be an instance of Headers");
          let r11 = [];
          for (let [n2, i2] of e10.request.headers) t10.set("x-middleware-request-" + n2, i2), r11.push(n2);
          t10.set("x-middleware-override-headers", r11.join(","));
        }
      }
      class ew extends Response {
        constructor(e10, t10 = {}) {
          super(e10, t10);
          let r10 = this.headers, n2 = new Proxy(new ep.ResponseCookies(r10), { get(e11, n3, i2) {
            switch (n3) {
              case "delete":
              case "set":
                return (...i3) => {
                  let a2 = Reflect.apply(e11[n3], e11, i3), o2 = new Headers(r10);
                  return a2 instanceof ep.ResponseCookies && r10.set("x-middleware-set-cookie", a2.getAll().map((e12) => (0, ep.stringifyCookie)(e12)).join(",")), ev(t10, o2), a2;
                };
              default:
                return em.get(e11, n3, i2);
            }
          } });
          this[ey] = { cookies: n2, url: t10.url ? new H(t10.url, { headers: A(r10), nextConfig: t10.nextConfig }) : void 0 };
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[ey].cookies;
        }
        static json(e10, t10) {
          let r10 = Response.json(e10, t10);
          return new ew(r10.body, r10);
        }
        static redirect(e10, t10) {
          let r10 = "number" == typeof t10 ? t10 : (null == t10 ? void 0 : t10.status) ?? 307;
          if (!eb.has(r10)) throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t10 ? t10 : {}, i2 = new Headers(null == n2 ? void 0 : n2.headers);
          return i2.set("Location", R(e10)), new ew(null, { ...n2, headers: i2, status: r10 });
        }
        static rewrite(e10, t10) {
          let r10 = new Headers(null == t10 ? void 0 : t10.headers);
          return r10.set("x-middleware-rewrite", R(e10)), ev(t10, r10), new ew(null, { ...t10, headers: r10 });
        }
        static next(e10) {
          let t10 = new Headers(null == e10 ? void 0 : e10.headers);
          return t10.set("x-middleware-next", "1"), ev(e10, t10), new ew(null, { ...e10, headers: t10 });
        }
      }
      function e_(e10, t10) {
        let r10 = "string" == typeof t10 ? new URL(t10) : t10, n2 = new URL(e10, t10), i2 = n2.origin === r10.origin;
        return { url: i2 ? n2.toString().slice(r10.origin.length) : n2.toString(), isRelative: i2 };
      }
      let eE = "next-router-prefetch", eS = ["rsc", "next-router-state-tree", eE, "next-hmr-refresh", "next-router-segment-prefetch"], ex = "_rsc";
      function eP(e10) {
        return e10.startsWith("/") ? e10 : `/${e10}`;
      }
      function eT(e10) {
        return eP(e10.split("/").reduce((e11, t10, r10, n2) => t10 ? "(" === t10[0] && t10.endsWith(")") || "@" === t10[0] || ("page" === t10 || "route" === t10) && r10 === n2.length - 1 ? e11 : `${e11}/${t10}` : e11, ""));
      }
      class eA extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new eA();
        }
      }
      class eR extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t10, r10, n2) {
            if ("symbol" == typeof r10) return em.get(t10, r10, n2);
            let i2 = r10.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== a2) return em.get(t10, a2, n2);
          }, set(t10, r10, n2, i2) {
            if ("symbol" == typeof r10) return em.set(t10, r10, n2, i2);
            let a2 = r10.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return em.set(t10, o2 ?? r10, n2, i2);
          }, has(t10, r10) {
            if ("symbol" == typeof r10) return em.has(t10, r10);
            let n2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== i2 && em.has(t10, i2);
          }, deleteProperty(t10, r10) {
            if ("symbol" == typeof r10) return em.deleteProperty(t10, r10);
            let n2 = r10.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === i2 || em.deleteProperty(t10, i2);
          } });
        }
        static seal(e10, t10) {
          let r10, n2 = t10 && t10.size > 0 ? (e11) => t10.has(e11.toLowerCase()) : null, i2 = new Proxy(e10, { get(e11, t11, n3) {
            switch (t11) {
              case "append":
              case "delete":
              case "set":
                return eA.callable;
              case Symbol.iterator:
                return r10[Symbol.iterator];
              case "get":
              case "has":
              case "getSetCookie":
              case "keys":
              case "values":
              case "entries":
              case "forEach":
                return r10[t11];
              default:
                return em.get(e11, t11, n3);
            }
          } });
          return r10 = n2 ? /* @__PURE__ */ (function(e11, t11, r11) {
            function* n3() {
              for (let t12 of e11.entries()) r11(t12[0]) || (yield t12);
            }
            return { entries: n3, [Symbol.iterator]: n3, get: (t12) => r11(t12) ? null : e11.get(t12), has: (t12) => !r11(t12) && e11.has(t12), getSetCookie: () => r11("set-cookie") ? [] : e11.getSetCookie(), *keys() {
              for (let t12 of e11.keys()) r11(t12) || (yield t12);
            }, *values() {
              for (let [, e12] of n3()) yield e12;
            }, forEach(e12, r12) {
              for (let [i3, a2] of n3()) e12.call(r12, a2, i3, t11);
            } };
          })(e10, i2, n2) : { get: e10.get.bind(e10), has: e10.has.bind(e10), getSetCookie: e10.getSetCookie.bind(e10), keys: e10.keys.bind(e10), values: e10.values.bind(e10), entries: e10.entries.bind(e10), [Symbol.iterator]: e10[Symbol.iterator].bind(e10), forEach(t11, r11) {
            for (let [n3, a2] of e10.entries()) t11.call(r11, a2, n3, i2);
          } }, i2;
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => em.get(e11, t10, r10) });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new eR(e10);
        }
        append(e10, t10) {
          let r10 = this.headers[e10];
          "string" == typeof r10 ? this.headers[e10] = [r10, t10] : Array.isArray(r10) ? r10.push(t10) : this.headers[e10] = t10;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t10 = this.headers[e10];
          return void 0 !== t10 ? this.merge(t10) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t10) {
          this.headers[e10] = t10;
        }
        forEach(e10, t10) {
          for (let [r10, n2] of this.entries()) e10.call(t10, n2, r10, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase(), r10 = this.get(t10);
            yield [t10, r10];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = e10.toLowerCase();
            yield t10;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t10 = this.get(e10);
            yield t10;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      let eC = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class eO {
        disable() {
          throw eC;
        }
        getStore() {
        }
        run() {
          throw eC;
        }
        exit() {
          throw eC;
        }
        enterWith() {
          throw eC;
        }
        static bind(e10) {
          return e10;
        }
      }
      let ek = "u" > typeof globalThis && globalThis.AsyncLocalStorage;
      function eN(e10) {
        let t10 = /* @__PURE__ */ Symbol.for(`@next/${e10}@16.4.6`), r10 = globalThis;
        return r10[t10] ??= ek ? new ek() : new eO();
      }
      let eI = eN("work-async-storage");
      class eM extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new eM();
        }
      }
      class eD {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t10, r10) {
            switch (t10) {
              case "clear":
              case "delete":
              case "set":
                return eM.callable;
              default:
                return em.get(e11, t10, r10);
            }
          } });
        }
        static fresh(e10) {
          return new Proxy(e10, { get: (e11, t10, r10) => em.get(e11, t10, r10) });
        }
      }
      let e$ = /* @__PURE__ */ Symbol.for("next.mutated.cookies");
      class eL {
        static wrap(e10, t10) {
          let r10 = new ep.ResponseCookies(new Headers());
          for (let t11 of e10.getAll()) r10.set(t11);
          let n2 = [], i2 = /* @__PURE__ */ new Set(), a2 = () => {
            let e11 = eI.getStore();
            if (e11 && (e11.pathWasRevalidated = 1), n2 = r10.getAll().filter((e12) => i2.has(e12.name)), t10) {
              let e12 = [];
              for (let t11 of n2) {
                let r11 = new ep.ResponseCookies(new Headers());
                r11.set(t11), e12.push(r11.toString());
              }
              t10(e12);
            }
          }, o2 = new Proxy(r10, { get(e11, t11, r11) {
            switch (t11) {
              case e$:
                return n2;
              case "delete":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.delete(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              case "set":
                return function(...t12) {
                  i2.add("string" == typeof t12[0] ? t12[0] : t12[0].name);
                  try {
                    return e11.set(...t12), o2;
                  } finally {
                    a2();
                  }
                };
              default:
                return em.get(e11, t11, r11);
            }
          } });
          return o2;
        }
      }
      function ej(e10, t10) {
        if ("action" !== e10.phase) throw new eM();
      }
      var eq = ((G = eq || {}).handleRequest = "BaseServer.handleRequest", G.run = "BaseServer.run", G.pipe = "BaseServer.pipe", G.getStaticHTML = "BaseServer.getStaticHTML", G.render = "BaseServer.render", G.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", G.renderToResponse = "BaseServer.renderToResponse", G.renderToHTML = "BaseServer.renderToHTML", G.renderError = "BaseServer.renderError", G.renderErrorToResponse = "BaseServer.renderErrorToResponse", G.renderErrorToHTML = "BaseServer.renderErrorToHTML", G.render404 = "BaseServer.render404", G), eU = ((W = eU || {}).loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", W.loadComponents = "LoadComponents.loadComponents", W.loadRouteModule = "LoadComponents.loadRouteModule", W), eF = ((J = eF || {}).loadModule = "Instrumentation.loadModule", J.register = "Instrumentation.register", J), eV = ((z = eV || {}).getRequestHandler = "NextServer.getRequestHandler", z.getRequestHandlerWithMetadata = "NextServer.getRequestHandlerWithMetadata", z.getServer = "NextServer.getServer", z.getServerRequestHandler = "NextServer.getServerRequestHandler", z.createServer = "createServer.createServer", z), eB = ((K = eB || {}).compression = "NextNodeServer.compression", K.getBuildId = "NextNodeServer.getBuildId", K.createComponentTree = "NextNodeServer.createComponentTree", K.clientComponentLoading = "NextNodeServer.clientComponentLoading", K.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", K.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", K.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", K.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", K.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", K.sendRenderResult = "NextNodeServer.sendRenderResult", K.proxyRequest = "NextNodeServer.proxyRequest", K.runApi = "NextNodeServer.runApi", K.render = "NextNodeServer.render", K.renderHTML = "NextNodeServer.renderHTML", K.imageOptimizer = "NextNodeServer.imageOptimizer", K.getPagePath = "NextNodeServer.getPagePath", K.getRoutesManifest = "NextNodeServer.getRoutesManifest", K.findPageComponents = "NextNodeServer.findPageComponents", K.getFontManifest = "NextNodeServer.getFontManifest", K.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", K.getRequestHandler = "NextNodeServer.getRequestHandler", K.renderToHTML = "NextNodeServer.renderToHTML", K.renderError = "NextNodeServer.renderError", K.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", K.render404 = "NextNodeServer.render404", K.startResponse = "NextNodeServer.startResponse", K.route = "route", K.onProxyReq = "onProxyReq", K.apiResolver = "apiResolver", K.internalFetch = "internalFetch", K), eH = ((Q = eH || {}).startServer = "startServer.startServer", Q), eG = ((X = eG || {}).getServerSideProps = "Render.getServerSideProps", X.getStaticProps = "Render.getStaticProps", X.renderToString = "Render.renderToString", X.renderDocument = "Render.renderDocument", X.createBodyResult = "Render.createBodyResult", X), eW = ((Y = eW || {}).renderToString = "AppRender.renderToString", Y.renderToReadableStream = "AppRender.renderToReadableStream", Y.getBodyResult = "AppRender.getBodyResult", Y.fetch = "AppRender.fetch", Y.waitShellReady = "AppRender.waitShellReady", Y.renderToNodeFizzStream = "AppRender.renderToNodeFizzStream", Y.instantInsights = "AppRender.instantInsights", Y.instantInsightsPrepareValidation = "AppRender.instantInsights.prepareValidation", Y.instantInsightsRunValidation = "AppRender.instantInsights.runValidation", Y), eJ = ((Z = eJ || {}).ensurePage = "DevBundlerService.ensurePage", Z), ez = ((ee = ez || {}).executeRoute = "Router.executeRoute", ee), eK = ((et = eK || {}).runHandler = "Node.runHandler", et), eQ = ((er = eQ || {}).runHandler = "AppRouteRouteHandlers.runHandler", er), eX = ((en = eX || {}).loadUserland = "AppRouteRouteModule.loadUserland", en), eY = ((ei = eY || {}).prepare = "RouteModule.prepare", ei.loadManifests = "RouteModule.loadManifests", ei), eZ = ((ea = eZ || {}).generateMetadata = "ResolveMetadata.generateMetadata", ea.generateViewport = "ResolveMetadata.generateViewport", ea), e0 = ((eo = e0 || {}).execute = "Middleware.execute", eo), e1 = ((es = e1 || {}).request = "Next.request", es);
      let e2 = /* @__PURE__ */ new Set(["Middleware.execute", "Next.request", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "LoadComponents.loadRouteModule", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "AppRouteRouteModule.loadUserland", "RouteModule.prepare", "Instrumentation.loadModule", "Instrumentation.register", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"]), e4 = /* @__PURE__ */ new Set(["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"]);
      function e3(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let e6 = process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      function e5() {
      }
      /* @__PURE__ */ Symbol.for("@next/local-span-recorder");
      let { context: e8, propagation: e9, trace: e7, SpanStatusCode: te, SpanKind: tt, ROOT_CONTEXT: tr } = t = e.r(30616);
      class tn extends Error {
        constructor(e10, t10) {
          super(), this.bubble = e10, this.result = t10;
        }
      }
      let ti = (e10, t10, r10) => {
        "object" == typeof t10 && null !== t10 && t10 instanceof tn && t10.bubble ? e10.setAttribute("next.bubble", true) : (t10 && (e10.recordException(t10), e10.setAttribute("error.type", t10.name)), e10.setStatus({ code: te.ERROR, message: null == t10 ? void 0 : t10.message })), e10.end(r10);
      }, ta = /* @__PURE__ */ new Map(), to = t.createContextKey("next.rootSpanId"), ts = 0, tl = { set(e10, t10, r10) {
        e10.push({ key: t10, value: r10 });
      } }, tc = (i = new class e {
        getTracerInstance() {
          return e7.getTracer("next.js", "16.4.6");
        }
        isOpenTelemetryEnabled() {
          var e10, t10;
          let r10 = e7.getSpan(e8.active());
          if (null == r10 ? void 0 : r10.isRecording()) return true;
          let n2 = e7.getTracerProvider();
          return !("getDelegate" in n2) || (null == n2.getDelegate || null == (t10 = n2.getDelegate.call(n2)) || null == (e10 = t10.constructor) ? void 0 : e10.name) !== "NoopTracerProvider";
        }
        getContext() {
          return e8;
        }
        getTracePropagationData() {
          let e10 = e8.active(), t10 = [];
          return e9.inject(e10, t10, tl), t10;
        }
        getTraceContextHeaders() {
          let e10 = e8.active();
          if (!e7.getSpanContext(e10) || !this.isOpenTelemetryEnabled()) return;
          let t10 = {};
          e9.inject(e10, t10);
          let { traceparent: r10, tracestate: n2 } = t10;
          if (r10) return { traceparent: r10, tracestate: n2 };
        }
        hasActiveSpanContext() {
          let e10 = e7.getSpanContext(e8.active());
          return !!(e10 && e7.isSpanContextValid(e10));
        }
        getActiveScopeSpan() {
          let e10 = e5(), t10 = null == e10 ? void 0 : e10.getActiveLocalSpan();
          return t10 && (null == e10 ? void 0 : e10.isOpenTelemetryIsolatedSpan(t10)) ? t10 : e7.getSpan(e8.active());
        }
        withPropagatedContext(e10, t10, r10, n2 = false) {
          let i2 = e8.active();
          if (!e6 && !this.isOpenTelemetryEnabled() && !e7.getSpanContext(i2)) return t10();
          if (n2) {
            let n3 = e9.extract(tr, e10, r10);
            if (e7.getSpanContext(n3)) return e8.with(n3, t10);
            let a3 = e9.extract(i2, e10, r10);
            return e8.with(a3, t10);
          }
          if (e7.getSpanContext(i2)) return t10();
          let a2 = e9.extract(i2, e10, r10);
          return e8.with(a2, t10);
        }
        trace(...e10) {
          let [t10, r10, n2] = e10, i2 = !!e6 || this.isOpenTelemetryEnabled(), a2 = e5(), o2 = (null == a2 ? void 0 : a2.isLocalSpanRecordingEnabled()) ?? false;
          if (!i2 && !o2) return "function" == typeof r10 ? r10() : n2();
          let { fn: s2, options: l2 } = "function" == typeof r10 ? { fn: r10, options: {} } : { fn: n2, options: { ...r10 } }, c2 = l2.spanName ?? t10, u2 = l2.parentSpan ?? this.getActiveScopeSpan(), d2 = u2 && (null == a2 ? void 0 : a2.isOpenTelemetryIsolatedSpan(u2)) ? u2 : void 0, h2 = !d2 && (e2.has(t10) || "1" === process.env.NEXT_OTEL_VERBOSE);
          if (!(h2 || (null == a2 ? void 0 : a2.isRequestInsightsEnabled())) || l2.hideSpan) return s2();
          let p2 = d2 ? e8.active() : this.getSpanContext(u2);
          p2 || (p2 = (null == e8 ? void 0 : e8.active()) ?? tr);
          let f2 = p2.getValue(to), g2 = "number" != typeof f2 || !ta.has(f2), m2 = ts++;
          return l2.attributes = { "next.span_category": "nextjs", "next.span_name": c2, "next.span_type": t10, ...l2.attributes }, e8.with(p2.setValue(to, m2), () => this.runWithActiveSpan(c2, l2, p2, i2 && h2, o2, d2, (e11) => {
            let r11;
            e6 && t10 && e4.has(t10) && (r11 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0);
            let n3 = false, i3 = () => {
              !n3 && (n3 = true, ta.delete(m2), r11 && performance.measure(`${e6}:next-${(t10.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: r11, end: performance.now() }));
            };
            if (g2 && ta.set(m2, new Map(Object.entries(l2.attributes ?? {}))), s2.length > 1) try {
              return s2(e11, (t11) => {
                t11 ? ti(e11, t11, l2.endTime) : e11.end(l2.endTime);
              });
            } catch (t11) {
              throw ti(e11, t11, l2.endTime), t11;
            } finally {
              i3();
            }
            try {
              let t11 = s2(e11);
              if (e3(t11)) return t11.then((t12) => (e11.end(l2.endTime), t12)).catch((t12) => {
                throw ti(e11, t12, l2.endTime), t12;
              }).finally(i3);
              return e11.end(l2.endTime), i3(), t11;
            } catch (t11) {
              throw ti(e11, t11, l2.endTime), i3(), t11;
            }
          }));
        }
        runWithActiveSpan(e10, t10, r10, n2, i2, a2, o2) {
          if (n2) return this.getTracerInstance().startActiveSpan(e10, t10, (n3) => o2(i2 ? this.createLocalRecordingSpan(e10, t10, r10, n3, a2) : n3));
          let s2 = this.createLocalRecordingSpan(e10, t10, r10, void 0, a2), l2 = e5();
          return l2.withLocalSpan(s2, () => l2.isOpenTelemetryIsolatedSpan(s2) ? o2(s2) : e8.with(e7.setSpan(e8.active(), s2), o2, void 0, s2));
        }
        createLocalRecordingSpan(e10, t10, r10, n2, i2) {
          let a2 = (null == i2 ? void 0 : i2.spanContext()) ?? e7.getSpanContext(r10), o2 = null == n2 ? void 0 : n2.spanContext();
          return e5().createLocalSpan({ name: e10, attributes: t10.attributes, links: t10.links, startTime: t10.startTime, delegateSpan: n2, traceId: (null == o2 ? void 0 : o2.traceId) ?? (null == a2 ? void 0 : a2.traceId), spanId: null == o2 ? void 0 : o2.spanId, parentSpanId: null == a2 ? void 0 : a2.spanId, isolateOpenTelemetry: void 0 !== i2 });
        }
        wrap(...e10) {
          let t10 = this, [r10, n2, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return e2.has(r10) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, o2 = arguments[a2];
            if ("function" != typeof o2) return t10.trace(r10, e11, () => i2.apply(this, arguments));
            {
              let n3 = t10.getContext().bind(e8.active(), o2);
              return t10.trace(r10, e11, (e12, t11) => (arguments[a2] = function(e13) {
                return null == t11 || t11(e13), n3.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t10, r10] = e10, n2 = r10 ? { ...r10, attributes: { "next.span_category": "nextjs", ...r10.attributes } } : { attributes: { "next.span_category": "nextjs" } }, i2 = e5(), a2 = n2.parentSpan ?? this.getActiveScopeSpan(), o2 = a2 && (null == i2 ? void 0 : i2.isOpenTelemetryIsolatedSpan(a2)) ? a2 : void 0, s2 = (o2 ? void 0 : this.getSpanContext(a2)) ?? e8.active();
          if (!(null == i2 ? void 0 : i2.isLocalSpanRecordingEnabled())) return this.getTracerInstance().startSpan(t10, n2, s2);
          let l2 = !o2 && this.isOpenTelemetryEnabled() ? this.getTracerInstance().startSpan(t10, n2, s2) : void 0;
          return this.createLocalRecordingSpan(t10, n2, s2, l2, o2);
        }
        getSpanContext(e10) {
          return e10 ? e7.setSpan(e8.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = e8.active().getValue(to);
          return ta.get(e10);
        }
        setRootSpanAttribute(e10, t10) {
          let r10 = e8.active().getValue(to), n2 = ta.get(r10);
          n2 && !n2.has(e10) && n2.set(e10, t10);
        }
        withSpan(e10, t10) {
          let r10 = e5();
          return (null == r10 ? void 0 : r10.isLocalRecordingSpan(e10)) ? r10.withLocalSpan(e10, () => r10.isOpenTelemetryIsolatedSpan(e10) ? t10() : e8.with(e7.setSpan(e8.active(), e10), t10)) : e8.with(e7.setSpan(e8.active(), e10), t10);
        }
      }(), () => i), tu = "__prerender_bypass";
      /* @__PURE__ */ Symbol("__next_preview_data"), Symbol(tu);
      class td {
        constructor(e10, t10, r10, n2) {
          var i2;
          let a2 = e10 && (function(e11, t11) {
            if ("function" == typeof e11.get) {
              let r11 = eR.from(e11);
              return { isOnDemandRevalidate: r11.get(g) === t11.previewModeId, revalidateOnlyGenerated: r11.has(m) };
            }
            return { isOnDemandRevalidate: e11[g] === t11.previewModeId, revalidateOnlyGenerated: e11.hasOwnProperty(m) };
          })(t10, e10).isOnDemandRevalidate, o2 = null == (i2 = r10.get(tu)) ? void 0 : i2.value;
          this._isEnabled = !!(!a2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        get isEnabled() {
          return this._isEnabled;
        }
        enable() {
          if (!this._previewModeId) throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: tu, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" }), this._isEnabled = true;
        }
        disable() {
          this._mutableCookies.set({ name: tu, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) }), this._isEnabled = false;
        }
      }
      let th = new Set([...eS, "x-nextjs-request-id", "x-nextjs-html-request-id"].map((e10) => e10.toLowerCase()));
      function tp(e10, t10) {
        if ("x-middleware-set-cookie" in e10 && "string" == typeof e10["x-middleware-set-cookie"]) {
          let r10 = e10["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of T(r10)) n2.append("set-cookie", e11);
          for (let e11 of new ep.ResponseCookies(n2).getAll()) t10.set(e11);
        }
      }
      let tf = eN("work-unit-async-storage");
      function tg(e10) {
        switch (e10.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            return e10.resumeDataCache;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "build-time-generator":
            return null;
          default:
            return e10;
        }
      }
      var tm = e.i(4210);
      class ty extends Error {
        constructor(e10, t10) {
          super(`Invariant: ${e10.endsWith(".") ? e10 : e10 + "."} This is a bug in Next.js.`, t10), this.name = "InvariantError";
        }
      }
      var tb = e.i(51615);
      function tv() {
      }
      new TextEncoder();
      let tw = new TextEncoder();
      function t_(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(tw.encode(e10)), t10.close();
        } });
      }
      function tE(e10) {
        return new ReadableStream({ start(t10) {
          t10.enqueue(e10), t10.close();
        } });
      }
      async function tS(e10, t10) {
        let r10 = new TextDecoder("utf-8", { fatal: true }), n2 = "";
        for await (let i2 of e10) {
          if (null == t10 ? void 0 : t10.aborted) return n2;
          n2 += r10.decode(i2, { stream: true });
        }
        return n2 + r10.decode();
      }
      process.env.NEXT_PRIVATE_DEBUG_CACHE, /* @__PURE__ */ Symbol.for("@next/cache-handlers");
      let tx = /* @__PURE__ */ Symbol.for("@next/cache-handlers-map"), tP = /* @__PURE__ */ Symbol.for("@next/cache-handlers-set");
      /* @__PURE__ */ Symbol.for("@next/custom-cache-handlers-registration"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-private"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-built-in"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-fronts"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-dev-tiered"), /* @__PURE__ */ Symbol.for("@next/cache-handlers-memory-disabled");
      let tT = globalThis;
      function tA() {
        let e10 = tT[tx];
        if (e10) return e10.entries();
      }
      async function tR(e10, t10) {
        if (!e10) return t10();
        let r10 = tC(e10);
        try {
          return await t10();
        } finally {
          var n2, i2, a2, o2;
          let t11, s2, l2, c2, u2 = (n2 = r10, i2 = tC(e10), t11 = new Map(n2.pendingRevalidatedTags.map((e11) => {
            let t12 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "";
            return [`${e11.tag}:${t12}`, e11.revalidatedAt];
          })), s2 = new Set(n2.pendingRevalidateWrites), { pendingRevalidatedTags: i2.pendingRevalidatedTags.filter((e11) => {
            let r11 = "object" == typeof e11.profile ? JSON.stringify(e11.profile) : e11.profile || "", n3 = t11.get(`${e11.tag}:${r11}`);
            return void 0 === n3 || e11.revalidatedAt > n3;
          }), pendingRevalidates: Object.fromEntries(Object.entries(i2.pendingRevalidates).filter(([e11]) => !(e11 in n2.pendingRevalidates))), pendingRevalidateWrites: i2.pendingRevalidateWrites.filter((e11) => !s2.has(e11)) });
          await (a2 = e10, l2 = [], (c2 = (null == (o2 = u2) ? void 0 : o2.pendingRevalidatedTags) ?? a2.pendingRevalidatedTags ?? []).length > 0 && l2.push(tO(c2, a2.incrementalCache, a2)), l2.push(...Object.values((null == o2 ? void 0 : o2.pendingRevalidates) ?? a2.pendingRevalidates ?? {})), l2.push(...(null == o2 ? void 0 : o2.pendingRevalidateWrites) ?? a2.pendingRevalidateWrites ?? []), 0 !== l2.length && Promise.all(l2).then(() => void 0));
        }
      }
      function tC(e10) {
        return { pendingRevalidatedTags: e10.pendingRevalidatedTags ? e10.pendingRevalidatedTags.map((e11) => ({ ...e11 })) : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function tO(e10, t10, r10) {
        if (0 === e10.length) return;
        let n2 = (function() {
          let e11 = tT[tP];
          if (e11) return Array.from(e11);
        })() ?? [], i2 = [], a2 = /* @__PURE__ */ new Map();
        for (let t11 of e10) {
          let e11, r11 = t11.profile;
          for (let [t12] of a2) if ("string" == typeof t12 && "string" == typeof r11 && t12 === r11 || "object" == typeof t12 && "object" == typeof r11 && JSON.stringify(t12) === JSON.stringify(r11) || t12 === r11) {
            e11 = t12;
            break;
          }
          let n3 = e11 || r11;
          a2.has(n3) || a2.set(n3, []), a2.get(n3).push(t11.tag);
        }
        for (let [e11, o2] of a2) {
          let a3;
          if (e11) {
            let t11;
            if ("object" == typeof e11) t11 = e11;
            else if ("string" == typeof e11 && !(t11 = null == r10 ? void 0 : r10.cacheLifeProfiles[e11])) throw Error(`Invalid profile provided "${e11}" must be configured under cacheLife in next.config or be "max"`);
            t11 && (a3 = { expire: t11.expire });
          }
          for (let t11 of n2) e11 ? i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2, a3)) : i2.push(null == t11.updateTags ? void 0 : t11.updateTags.call(t11, o2));
          t10 && i2.push(t10.revalidateTag(o2, a3));
        }
        await Promise.all(i2);
      }
      let tk = eN("after-task-async-storage");
      class tN {
        constructor({ waitUntil: e10, onClose: t10, onTaskError: r10 }) {
          this.isRequestClosed = false, this.initialOnCloseError = null, this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t10, this.onTaskError = r10, this.callbackQueue = new tm.default(), this.callbackQueue.pause();
          try {
            t10(() => {
              for (let e11 of (this.isRequestClosed = true, this.workUnitStores)) e11.phase = "after";
            });
          } catch (e11) {
            this.initialOnCloseError = { error: e11 };
          }
        }
        after(e10, t10) {
          if (this.initialOnCloseError) throw new ty("An onClose call failed, which means after() can't work correctly.", { cause: this.initialOnCloseError.error });
          if (this.workUnitStores.add(t10), e3(e10)) this.addThenable(e10);
          else if ("function" == typeof e10) this.addCallback(e10, t10);
          else throw Error("`after()`: Argument must be a promise or a function");
        }
        addThenable(e10) {
          this.waitUntil || tI(), this.waitUntil(new Promise((t10) => {
            e10.then(() => {
              t10();
            }, (e11) => {
              t10(), this.reportTaskError("promise", e11);
            });
          }));
        }
        addCallback(e10, t10) {
          var r10;
          this.waitUntil || tI();
          let n2 = tk.getStore(), i2 = n2 ? n2.rootTaskSpawnPhase : t10.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let a2 = (r10 = async () => {
            try {
              await tk.run({ rootTaskSpawnPhase: i2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          }, ek ? ek.bind(r10) : eO.bind(r10));
          this.callbackQueue.add(a2);
        }
        async runCallbacksOnClose() {
          return this.isRequestClosed ? await new Promise((e10) => {
            setTimeout(e10, 0);
          }) : await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size) return;
          let e10 = eI.getStore();
          if (!e10) throw new ty("Missing workStore in AfterContext.runCallbacks");
          return tR(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t10) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t10), this.onTaskError) try {
            null == this.onTaskError || this.onTaskError.call(this, t10);
          } catch (e11) {
            console.error(new ty("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
          }
        }
      }
      function tI() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      function tM(e10) {
        let t10, r10 = { then: (n2, i2) => (t10 || (t10 = Promise.resolve(e10())), t10.then((e11) => {
          r10.value = e11;
        }).catch(() => {
        }), t10.then(n2, i2)) };
        return r10;
      }
      class tD {
        onClose(e10) {
          if (this.isClosed) throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed) throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      let t$ = "x-middleware-override-headers", tL = "x-middleware-request-";
      function tj(e10) {
        let [, t10, r10] = (null == e10 ? void 0 : e10.toLowerCase().split("-")) ?? [];
        return t10 && r10 ? `${t10}-${r10}` : void 0;
      }
      function tq(e10) {
        return "traceparent" === e10 || "tracestate" === e10;
      }
      function tU(e10, t10, r10) {
        e10.set(tL + "traceparent", r10.traceparent), t10.push("traceparent"), r10.tracestate ? (e10.set(tL + "tracestate", r10.tracestate), t10.push("tracestate")) : e10.delete(tL + "tracestate"), e10.set(t$, t10.join(","));
      }
      function tF() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID || "", previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let tV = /* @__PURE__ */ Symbol.for("@next/request-context"), tB = /[^\t\x20-\x7e]/, tH = /[^\t\x20-\x7e]+/g;
      function tG(e10) {
        return tB.test(e10) ? e10.replace(tH, (e11) => encodeURIComponent(e11)) : e10;
      }
      async function tW(e10, t10, r10) {
        let n2 = /* @__PURE__ */ new Set();
        for (let t11 of ((e11) => {
          let t12 = ["/layout"];
          if (e11.startsWith("/")) {
            let r11 = e11.indexOf("/", 1);
            for (; ; ) {
              -1 === r11 && (r11 = e11.length);
              let n3 = e11.slice(0, r11);
              if (n3 && (n3.endsWith("/page") || n3.endsWith("/route") || (n3 = `${n3}${!n3.endsWith("/") ? "/" : ""}layout`), t12.push(n3)), r11 === e11.length) break;
              r11 = e11.indexOf("/", r11 + 1);
            }
          }
          return t12;
        })(e10)) t11 = tG(`${x}${t11}`), n2.add(t11);
        if (t10 && (!r10 || 0 === r10.size)) {
          let e11 = tG(`${x}${t10}`);
          n2.add(e11);
        }
        n2.has(`${x}/`) && n2.add(`${x}/index`), n2.has(`${x}/index`) && n2.add(`${x}/`);
        let i2 = Array.from(n2);
        return { tags: i2, expirationsByCacheKind: (function(e11) {
          let t11 = /* @__PURE__ */ new Map(), r11 = tA();
          if (r11) for (let [n3, i3] of r11) "getExpiration" in i3 && t11.set(n3, tM(async () => i3.getExpiration(e11)));
          return t11;
        })(i2) };
      }
      let tJ = /* @__PURE__ */ Symbol.for("NextInternalRequestMeta"), tz = { get default() {
        throw new ty("Proxy does not support `use cache`, so reading its `default` cacheLife profile is unexpected.");
      } };
      class tK extends eg {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new h({ page: this.sourcePage });
        }
        respondWith() {
          throw new h({ page: this.sourcePage });
        }
        waitUntil() {
          throw new h({ page: this.sourcePage });
        }
      }
      let tQ = { keys: (e10) => Array.from(e10.keys()), get: (e10, t10) => e10.get(t10) ?? void 0 }, tX = (e10, t10) => tc().withPropagatedContext(e10.headers, t10, tQ), tY = false;
      async function tZ(t10) {
        var r10, n2, i2, a2, o2, s2;
        let l2, c2, d2, h2, p2, f2, g2;
        !(function() {
          if (!tY && (tY = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: t11, wrapRequestHandler: r11 } = e.r(31318);
            t11(), tX = r11(tX);
          }
        })(), await u();
        let m2 = void 0 !== globalThis.__BUILD_MANIFEST;
        t10.request.url = t10.request.url.replace(/\.rsc($|\?)/, "$1");
        let y2 = t10.bypassNextUrl ? new URL(t10.request.url) : new H(t10.request.url, { headers: t10.request.headers, nextConfig: t10.request.nextConfig });
        for (let e10 of [...y2.searchParams.keys()]) {
          let t11 = y2.searchParams.getAll(e10), r11 = (function(e11) {
            for (let t12 of ["nxtP", "nxtI"]) if (e11 !== t12 && e11.startsWith(t12)) return e11.substring(t12.length);
            return null;
          })(e10);
          if (r11) {
            for (let e11 of (y2.searchParams.delete(r11), t11)) y2.searchParams.append(r11, e11);
            y2.searchParams.delete(e10);
          }
        }
        let b2 = process.env.__NEXT_BUILD_ID || "";
        "buildId" in y2 && (b2 = y2.buildId || "", y2.buildId = "");
        let v2 = (function(e10) {
          let t11 = new Headers();
          for (let [r11, n3] of Object.entries(e10)) for (let e11 of Array.isArray(n3) ? n3 : [n3]) void 0 !== e11 && ("number" == typeof e11 && (e11 = e11.toString()), t11.append(r11, e11));
          return t11;
        })(t10.request.headers), w2 = v2.has("x-nextjs-data"), _2 = "1" === v2.get("rsc");
        w2 && "/index" === y2.pathname && (y2.pathname = "/");
        let E2 = /* @__PURE__ */ new Map();
        if (!m2) for (let e10 of eS) {
          let t11 = v2.get(e10);
          null !== t11 && (E2.set(e10, t11), v2.delete(e10));
        }
        let S2 = y2.searchParams.get(ex), x2 = new tK({ page: t10.page, input: ((f2 = (p2 = "string" == typeof y2) ? new URL(y2) : y2).searchParams.delete(ex), p2 ? f2.toString() : f2).toString(), init: { body: t10.request.body, headers: v2, method: t10.request.method, nextConfig: t10.request.nextConfig, signal: t10.request.signal } });
        t10.request.requestMeta && (o2 = t10.request.requestMeta, x2[tJ] = o2), w2 && Object.defineProperty(x2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCacheShared && t10.IncrementalCache && (globalThis.__incrementalCache = new t10.IncrementalCache({ CurCacheHandler: t10.incrementalCacheHandler, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: t10.request.headers, previewProps: tF(), prerenderManifest: { version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: tF() } }));
        let P2 = t10.request.waitUntil ?? (null == (r10 = null == (g2 = globalThis[tV]) ? void 0 : g2.get()) ? void 0 : r10.waitUntil), T2 = new I({ request: x2, page: t10.page, context: P2 ? { waitUntil: P2 } : void 0 }), A2 = "/middleware" === (s2 = t10.page) || "/src/middleware" === s2 || "/proxy" === s2 || "/src/proxy" === s2;
        if ((l2 = await tX(x2, () => {
          if (A2) {
            let e10 = T2.waitUntil.bind(T2), r11 = new tD(), n3 = tc(), i3 = () => {
              let i4 = new Headers(x2.headers);
              return (d2 = (function(e11, t11) {
                if (!t11) return;
                let r12 = e11.get("traceparent"), n4 = tj(r12);
                if (r12 && n4 && n4 === tj(t11.traceparent)) {
                  let t12 = e11.get("tracestate");
                  return t12 ? { traceparent: r12, tracestate: t12 } : { traceparent: r12, tracestate: void 0 };
                }
                return t11;
              })(i4, n3.getTraceContextHeaders())) && (h2 = i4), n3.trace(e0.execute, { spanName: `middleware ${x2.method}`, startTime: t10.emitInstrumentationSpans ? t10.requestStartTime : void 0, attributes: { "http.target": x2.nextUrl.pathname, "http.method": x2.method } }, async () => {
                null == t10.emitInstrumentationSpans || t10.emitInstrumentationSpans.call(t10);
                try {
                  var n4, i5, a3, o3, s3, l3;
                  let u2 = tF(), d3 = await tW("/", x2.nextUrl.pathname, null), h3 = (a3 = x2.nextUrl, o3 = (e11) => {
                    c2 = e11;
                  }, s3 = void 0, (function(e11) {
                    let { phase: t11, headers: r12, onUpdateCookies: n5, url: i6, rootParams: a4, implicitTags: o4, resumeDataCache: s4, previewProps: l4, isHmrRefresh: c3, serverComponentsHmrCache: u3, hmrRefreshHash: d4, stagedFallbackParams: h4 } = e11, p4 = {};
                    return { type: "request", phase: t11, implicitTags: o4, url: { pathname: i6.pathname, search: i6.search ?? "" }, rootParams: a4, get headers() {
                      return p4.headers || (p4.headers = eR.seal(eR.from(r12), th)), p4.headers;
                    }, get cookies() {
                      if (!p4.cookies) {
                        let e12 = new ep.RequestCookies(eR.from(r12));
                        tp(r12, e12), p4.cookies = eD.seal(e12);
                      }
                      return p4.cookies;
                    }, set cookies(e12) {
                      p4.cookies = e12;
                    }, get mutableCookies() {
                      if (!p4.mutableCookies) {
                        let e12, t12 = (e12 = new ep.RequestCookies(eR.from(r12)), eL.wrap(e12, n5));
                        tp(r12, t12), p4.mutableCookies = t12;
                      }
                      return p4.mutableCookies;
                    }, get userspaceMutableCookies() {
                      if (!p4.userspaceMutableCookies) {
                        var e12;
                        let t12;
                        e12 = this, p4.userspaceMutableCookies = t12 = new Proxy(e12.mutableCookies, { get(r13, n6, i7) {
                          switch (n6) {
                            case "delete":
                              return function(...n7) {
                                return ej(e12, "cookies().delete"), r13.delete(...n7), t12;
                              };
                            case "set":
                              return function(...n7) {
                                return ej(e12, "cookies().set"), r13.set(...n7), t12;
                              };
                            default:
                              return em.get(r13, n6, i7);
                          }
                        } });
                      }
                      return p4.userspaceMutableCookies;
                    }, get draftMode() {
                      return p4.draftMode || (p4.draftMode = new td(l4, r12, this.cookies, this.mutableCookies)), p4.draftMode;
                    }, resumeDataCache: s4 ?? null, isHmrRefresh: c3, serverComponentsHmrCache: u3 || globalThis.__serverComponentsHmrCache, hmrRefreshHash: d4, stagedFallbackParams: h4, usedDynamic: false };
                  })({ phase: "action", headers: x2.headers, onUpdateCookies: o3, url: a3, rootParams: {}, implicitTags: d3, resumeDataCache: null, previewProps: u2, isHmrRefresh: false, serverComponentsHmrCache: void 0, hmrRefreshHash: s3, stagedFallbackParams: null })), p3 = (l3 = { page: "/", renderOpts: { cacheLifeProfiles: tz, staticPageGenerationTimeout: 0, cacheComponents: false, validationLevel: "warning", experimental: { isRoutePPREnabled: false, authInterrupts: !!(null == (i5 = t10.request.nextConfig) || null == (n4 = i5.experimental) ? void 0 : n4.authInterrupts), useCacheTimeout: 0, durableUseCacheEntries: false }, waitUntil: e10, onClose: r11.onClose.bind(r11), onAfterTaskError: void 0 }, isPrefetchRequest: "1" === x2.headers.get(eE), buildId: b2 ?? "", deploymentId: false, previouslyRevalidatedTags: [] }, (function({ page: e11, renderOpts: t11, isPrefetchRequest: r12, buildId: n5, deploymentId: i6, previouslyRevalidatedTags: a4, nonce: o4 }, s4) {
                    let l4 = { page: e11, route: eT(e11), incrementalCache: t11.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: t11.cacheLifeProfiles, useCacheTimeout: t11.experimental.useCacheTimeout, durableUseCacheEntries: t11.experimental.durableUseCacheEntries, staticPageGenerationTimeout: t11.staticPageGenerationTimeout, isBuildTimePrerendering: t11.isBuildTimePrerendering, fetchCache: t11.fetchCache, isOnDemandRevalidate: t11.isOnDemandRevalidate, requestId: void 0, htmlRequestId: void 0, isDraftMode: t11.isDraftMode, isPrefetchRequest: r12, buildId: n5, deploymentId: i6, reactLoadableManifest: (null == t11 ? void 0 : t11.reactLoadableManifest) || {}, assetPrefix: (null == t11 ? void 0 : t11.assetPrefix) || "", nonce: o4, afterContext: (function(e12) {
                      let { waitUntil: t12, onClose: r13, onAfterTaskError: n6 } = e12;
                      return new tN({ waitUntil: t12, onClose: r13, onTaskError: n6 });
                    })(t11), cacheComponentsEnabled: t11.cacheComponents, validationLevel: t11.validationLevel, previouslyRevalidatedTags: a4, requestStartTime: performance.timeOrigin + performance.now(), refreshTagsByCacheKind: (function() {
                      let e12 = /* @__PURE__ */ new Map(), t12 = tA();
                      if (t12) for (let [r13, n6] of t12) "refreshTags" in n6 && e12.set(r13, tM(async () => n6.refreshTags()));
                      return e12;
                    })(), runInCleanSnapshot: ek ? ek.snapshot() : function(e12, ...t12) {
                      return e12(...t12);
                    }, shouldTrackFetchMetrics: s4, clientComponentLoadTracker: void 0, reactServerErrorsByDigest: /* @__PURE__ */ new Map() };
                    return t11.store = l4, l4;
                  })(l3, false));
                  return await eI.run(p3, () => tf.run(h3, t10.handler, x2, T2));
                } finally {
                  setTimeout(() => {
                    r11.dispatchClose();
                  }, 0);
                }
              });
            };
            return n3.isOpenTelemetryEnabled() && !n3.hasActiveSpanContext() ? n3.trace(e1.request, { spanName: x2.method, kind: tt.SERVER, startTime: t10.requestStartTime, attributes: { "http.target": x2.nextUrl.pathname, "http.method": x2.method } }, i3) : i3();
          }
          return t10.handler(x2, T2);
        })) && !(l2 instanceof Response)) throw TypeError("Expected an instance of Response to be returned");
        l2 && !A2 && l2.headers.has("x-middleware-set-cookie") && (l2 = new Response(l2.body, l2)).headers.delete("x-middleware-set-cookie"), l2 && c2 && l2.headers.set("set-cookie", c2);
        let R2 = null == l2 ? void 0 : l2.headers.get("x-middleware-rewrite");
        if (l2 && R2 && (_2 || !m2)) {
          let e10 = new H(R2, { forceLocale: true, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          m2 || e10.host !== x2.nextUrl.host || (e10.buildId = b2 || e10.buildId, l2.headers.set("x-middleware-rewrite", String(e10)));
          let { url: r11, isRelative: o3 } = e_(e10.toString(), y2.toString());
          !m2 && w2 && l2.headers.set("x-nextjs-rewrite", r11);
          let s3 = !o3 && (null == (a2 = t10.request.nextConfig) || null == (i2 = a2.experimental) || null == (n2 = i2.clientParamParsingOrigins) ? void 0 : n2.some((t11) => new RegExp(t11).test(e10.origin)));
          _2 && (o3 || s3) && (y2.pathname !== e10.pathname && l2.headers.set("x-nextjs-rewritten-path", e10.pathname), y2.search !== e10.search && l2.headers.set("x-nextjs-rewritten-query", e10.search.slice(1)));
        }
        if (l2 && R2 && _2 && S2) {
          let e10 = new URL(R2);
          e10.searchParams.has(ex) || (e10.searchParams.set(ex, S2), l2.headers.set("x-middleware-rewrite", e10.toString()));
        }
        let C2 = null == l2 ? void 0 : l2.headers.get("Location");
        if (l2 && C2 && !m2) {
          let e10 = new H(C2, { forceLocale: false, headers: t10.request.headers, nextConfig: t10.request.nextConfig });
          l2 = new Response(l2.body, l2), e10.host === y2.host && (e10.buildId = b2 || e10.buildId, l2.headers.set("Location", e_(e10, y2).url)), w2 && (l2.headers.delete("Location"), l2.headers.set("x-nextjs-redirect", e_(e10.toString(), y2.toString()).url));
        }
        let O2 = l2 || ew.next();
        h2 && (function(e10, t11, r11) {
          if (!r11 || !e10.has("x-middleware-next") && !e10.has("x-middleware-rewrite")) return;
          let n3 = e10.get(t$);
          if (!n3) {
            if (t11.get("traceparent") === r11.traceparent && t11.get("tracestate") === (r11.tracestate ?? null)) return;
            let n4 = [];
            for (let [r12, i4] of t11) tq(r12) || (e10.set(tL + r12, i4), n4.push(r12));
            tU(e10, n4, r11);
            return;
          }
          let i3 = n3.split(",").map((e11) => e11.trim()).filter(Boolean);
          i3.includes("traceparent") && e10.get(tL + "traceparent") !== t11.get("traceparent") || tU(e10, i3.filter((e11) => !tq(e11)), r11);
        })(O2.headers, h2, d2);
        let N2 = O2.headers.get("x-middleware-override-headers"), M2 = [];
        if (N2) {
          for (let [e10, t11] of E2) O2.headers.set(`x-middleware-request-${e10}`, t11), M2.push(e10);
          M2.length > 0 && O2.headers.set("x-middleware-override-headers", N2 + "," + M2.join(","));
        }
        return { response: O2, waitUntil: ("internal" === T2[k].kind ? Promise.all(T2[k].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: x2.fetchMetrics };
      }
      let t0 = ["(..)(..)", "(.)", "(..)", "(...)"], t1 = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, t2 = /\/\[[^/]+\](?=\/|$)/;
      class t4 {
        constructor(e10 = []) {
          this.normalizers = e10;
        }
        push(e10) {
          this.normalizers.push(e10);
        }
        normalize(e10) {
          return this.normalizers.reduce((e11, t10) => t10.normalize(e11), e10);
        }
      }
      class t3 {
        normalize(e10) {
          return e10.replace(/%5F/g, "_");
        }
      }
      var t6 = ((el = {}).PAGES = "PAGES", el.PAGES_API = "PAGES_API", el.APP_PAGE = "APP_PAGE", el.APP_ROUTE = "APP_ROUTE", el.IMAGE = "IMAGE", el);
      let t5 = "route-cache", t8 = new class extends t4 {
        constructor() {
          super([{ normalize: eT }, new t3()]);
        }
        normalize(e10) {
          return super.normalize(e10);
        }
      }();
      function t9(e10, t10, r10, n2) {
        if (!r10) return false;
        let i2 = null === r10.dataRoute ? t6.APP_ROUTE : r10.dataRoute.endsWith(".json") ? t6.PAGES : r10.dataRoute.endsWith(".rsc") ? t6.APP_PAGE : void 0;
        return i2 === t10.kind && (("srcRoute" in r10 ? r10.srcRoute : r10.fallbackSourceRoute) ?? (i2 === t6.PAGES ? U(e10, n2).pathname : e10)) === (i2 === t6.PAGES ? t10.sourceRoute : t8.normalize(t10.sourceRoute));
      }
      function t7(t10, r10) {
        let n2;
        if (!r10) throw new ty("Response cache requires a source route");
        let { sourceRoute: i2 } = r10;
        return n2 = e.r(14606)().update(new TextEncoder().encode(i2)).digest("hex"), `/${t5}/${r10.kind}/${n2}/$${/^\/index(\/|$)/.test(t10) && !(function(e10, t11 = true) {
          return (void 0 !== e10.split("/").find((e11) => t0.find((t12) => e11.startsWith(t12))) && (e10 = (function(e11) {
            let t12, r11, n3;
            for (let i3 of e11.split("/")) if (r11 = t0.find((e12) => i3.startsWith(e12))) {
              [t12, n3] = e11.split(r11, 2);
              break;
            }
            if (!t12 || !r11 || !n3) throw Error(`Invalid interception route: ${e11}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`);
            switch (t12 = eT(t12), r11) {
              case "(.)":
                n3 = "/" === t12 ? `/${n3}` : t12 + "/" + n3;
                break;
              case "(..)":
                if ("/" === t12) throw Error(`Invalid interception route: ${e11}. Cannot use (..) marker at the root level, use (.) instead.`);
                n3 = t12.split("/").slice(0, -1).concat(n3).join("/");
                break;
              case "(...)":
                n3 = "/" + n3;
                break;
              case "(..)(..)":
                let i3 = t12.split("/");
                if (i3.length <= 2) throw Error(`Invalid interception route: ${e11}. Cannot use (..)(..) marker at the root level or one level up.`);
                n3 = i3.slice(0, -2).concat(n3).join("/");
                break;
              default:
                throw Error("Invariant: unexpected marker");
            }
            return { interceptingRoute: t12, interceptedRoute: n3 };
          })(e10).interceptedRoute), t11) ? t2.test(e10) : t1.test(e10);
        })(t10) ? `/index${t10}` : "/" === t10 ? "/index" : eP(t10)}`;
      }
      var re = ((ec = {}).APP_PAGE = "APP_PAGE", ec.APP_ROUTE = "APP_ROUTE", ec.PAGES = "PAGES", ec.FETCH = "FETCH", ec.REDIRECT = "REDIRECT", ec.IMAGE = "IMAGE", ec), rt = ((eu = {}).APP_PAGE = "APP_PAGE", eu.APP_ROUTE = "APP_ROUTE", eu.PAGES = "PAGES", eu.FETCH = "FETCH", eu.IMAGE = "IMAGE", eu);
      function rr() {
        let e10, t10, r10 = new Promise((r11, n2) => {
          e10 = r11, t10 = n2;
        });
        return { resolve: e10, reject: t10, promise: r10 };
      }
      class rn {
        constructor(e10, t10, r10) {
          this.prev = null, this.next = null, this.key = e10, this.data = t10, this.size = r10;
        }
      }
      class ri {
        constructor() {
          this.prev = null, this.next = null;
        }
      }
      class ra {
        constructor(e10, t10, r10) {
          this.cache = /* @__PURE__ */ new Map(), this.totalSize = 0, this.maxSize = e10, this.calculateSize = t10, this.onEvict = r10, this.head = new ri(), this.tail = new ri(), this.head.next = this.tail, this.tail.prev = this.head;
        }
        addToHead(e10) {
          e10.prev = this.head, e10.next = this.head.next, this.head.next.prev = e10, this.head.next = e10;
        }
        removeNode(e10) {
          e10.prev.next = e10.next, e10.next.prev = e10.prev;
        }
        moveToHead(e10) {
          this.removeNode(e10), this.addToHead(e10);
        }
        removeTail() {
          let e10 = this.tail.prev;
          return this.removeNode(e10), e10;
        }
        set(e10, t10) {
          let r10 = (null == this.calculateSize ? void 0 : this.calculateSize.call(this, t10, e10)) ?? 1;
          if (r10 <= 0) throw Error(`LRUCache: calculateSize returned ${r10}, but size must be > 0. Items with size 0 would never be evicted, causing unbounded cache growth.`);
          if (r10 > this.maxSize) return console.warn("Single item size exceeds maxSize"), false;
          let n2 = this.cache.get(e10);
          if (n2) n2.data = t10, this.totalSize = this.totalSize - n2.size + r10, n2.size = r10, this.moveToHead(n2);
          else {
            let n3 = new rn(e10, t10, r10);
            this.cache.set(e10, n3), this.addToHead(n3), this.totalSize += r10;
          }
          for (; this.totalSize > this.maxSize && this.cache.size > 0; ) {
            let e11 = this.removeTail();
            this.cache.delete(e11.key), this.totalSize -= e11.size, null == this.onEvict || this.onEvict.call(this, e11.key, e11.data);
          }
          return true;
        }
        has(e10) {
          return this.cache.has(e10);
        }
        get(e10) {
          let t10 = this.cache.get(e10);
          if (t10) return this.moveToHead(t10), t10.data;
        }
        *[Symbol.iterator]() {
          let e10 = this.head.next;
          for (; e10 && e10 !== this.tail; ) {
            let t10 = e10;
            yield [t10.key, t10.data], e10 = e10.next;
          }
        }
        remove(e10) {
          let t10 = this.cache.get(e10);
          t10 && (this.removeNode(t10), this.cache.delete(e10), this.totalSize -= t10.size);
        }
        get size() {
          return this.cache.size;
        }
        get currentSize() {
          return this.totalSize;
        }
      }
      let { env: ro, stdout: rs } = (null == (eh = globalThis) ? void 0 : eh.process) ?? {}, rl = ro && !ro.NO_COLOR && (ro.FORCE_COLOR || (null == rs ? void 0 : rs.isTTY) && !ro.CI && "dumb" !== ro.TERM);
      (null == rs ? void 0 : rs.isTTY) || ro.NEXT_PRIVATE_PROMPT_OUTPUT;
      let rc = (e10, t10, r10, n2) => {
        let i2 = e10.substring(0, n2) + r10, a2 = e10.substring(n2 + t10.length), o2 = a2.indexOf(t10);
        return ~o2 ? i2 + rc(a2, t10, r10, o2) : i2 + a2;
      }, ru = (e10, t10, r10 = e10) => rl ? (n2) => {
        let i2 = "" + n2, a2 = i2.indexOf(t10, e10.length);
        return ~a2 ? e10 + rc(i2, t10, r10, a2) + t10 : e10 + i2 + t10;
      } : String, rd = ru("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m");
      ru("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"), ru("\x1B[3m", "\x1B[23m"), ru("\x1B[4m", "\x1B[24m"), ru("\x1B[7m", "\x1B[27m"), ru("\x1B[8m", "\x1B[28m"), ru("\x1B[9m", "\x1B[29m"), ru("\x1B[30m", "\x1B[39m");
      let rh = ru("\x1B[31m", "\x1B[39m"), rp = ru("\x1B[32m", "\x1B[39m"), rf = ru("\x1B[33m", "\x1B[39m");
      ru("\x1B[34m", "\x1B[39m");
      let rg = ru("\x1B[35m", "\x1B[39m");
      ru("\x1B[38;2;173;127;168m", "\x1B[39m"), ru("\x1B[36m", "\x1B[39m");
      let rm = ru("\x1B[37m", "\x1B[39m");
      ru("\x1B[90m", "\x1B[39m"), ru("\x1B[40m", "\x1B[49m"), ru("\x1B[41m", "\x1B[49m"), ru("\x1B[42m", "\x1B[49m"), ru("\x1B[43m", "\x1B[49m"), ru("\x1B[44m", "\x1B[49m"), ru("\x1B[45m", "\x1B[49m"), ru("\x1B[46m", "\x1B[49m"), ru("\x1B[47m", "\x1B[49m"), rm(rd("\u25CB")), rh(rd("\u2A2F")), rf(rd("\u26A0")), rm(rd(" ")), rp(rd("\u2713")), rg(rd("\xBB")), new ra(1e4, (e10) => e10.length), new ra(1e4, (e10) => e10.length);
      let ry = "ResponseAborted";
      class rb extends Error {
        constructor(...e10) {
          super(...e10), this.name = ry;
        }
      }
      function rv(e10) {
        return (null == e10 ? void 0 : e10.name) === "AbortError" || (null == e10 ? void 0 : e10.name) === ry;
      }
      let rw = "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX;
      async function r_(e10, t10, r10, n2) {
        try {
          let i2, { errored: a2, destroyed: o2 } = t10;
          if (a2 || o2) return;
          let s2 = (i2 = new AbortController(), t10.once("close", () => {
            t10.writableFinished || i2.abort(new rb());
          }), i2), l2 = (function(e11, t11, r11) {
            let n3 = false, i3 = rr();
            function a3() {
              i3.resolve();
            }
            e11.on("drain", a3), e11.once("close", () => {
              e11.off("drain", a3), i3.resolve();
            });
            let o3 = rr();
            return e11.once("finish", () => {
              o3.resolve();
            }), new WritableStream({ write: async (t12) => {
              if (!n3) {
                if (n3 = true, rw) {
                  let e12 = null == r11 ? void 0 : r11.snapshot();
                  e12 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e12.clientComponentLoadStart, end: e12.clientComponentLoadStart + e12.clientComponentLoadTimes });
                }
                e11.flushHeaders(), tc().trace(eB.startResponse, { spanName: "start response" }, () => void 0);
              }
              try {
                let r12 = e11.write(t12);
                "flush" in e11 && "function" == typeof e11.flush && e11.flush(), r12 || (await i3.promise, i3 = rr());
              } catch (t13) {
                throw e11.end(), Error("failed to write chunk to response", { cause: t13 });
              }
            }, abort: (t12) => {
              e11.writableFinished || e11.destroy(t12);
            }, close: async () => {
              if (t11 && await t11, !e11.writableFinished) return e11.end(), o3.promise;
            } });
          })(t10, r10, n2);
          await e10.pipeTo(l2, { signal: s2.signal });
        } catch (e11) {
          if (rv(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      async function rE(e10, t10, r10, n2) {
        try {
          let { errored: i2, destroyed: a2 } = t10;
          if (i2 || a2) return;
          let o2 = false, s2 = rr(), l2 = false, c2 = () => {
            l2 && !e10.destroyed && (l2 = false, e10.resume());
          };
          t10.on("drain", c2), t10.once("close", () => {
            t10.off("drain", c2), e10.destroy(), s2.resolve();
          }), e10.on("data", (r11) => {
            if (!o2) {
              if (o2 = true, "performance" in globalThis && process.env.NEXT_OTEL_PERFORMANCE_PREFIX) {
                let e11 = null == n2 ? void 0 : n2.snapshot();
                e11 && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-client-component-loading`, { start: e11.clientComponentLoadStart, end: e11.clientComponentLoadStart + e11.clientComponentLoadTimes });
              }
              t10.flushHeaders(), tc().trace(eB.startResponse, { spanName: "start response" }, () => void 0);
            }
            let i3 = t10.write(r11);
            "flush" in t10 && "function" == typeof t10.flush && t10.flush(), i3 || (l2 = true, e10.pause());
          }), e10.on("end", async () => {
            r10 && await r10, t10.writableFinished || t10.end(), s2.resolve();
          }), e10.on("error", (e11) => {
            rv(e11) || t10.destroy(e11), s2.resolve();
          }), await s2.promise;
        } catch (e11) {
          if (rv(e11)) return;
          throw Error("failed to pipe response", { cause: e11 });
        }
      }
      function rS(e10) {
        return null !== e10 && "object" == typeof e10 && "function" == typeof e10.pipe && "function" == typeof e10.on && !(e10 instanceof ReadableStream);
      }
      class rx {
        static #t = this.EMPTY = new rx(null, { metadata: {}, contentType: null });
        static fromStatic(e10, t10) {
          return new rx(e10, { metadata: {}, contentType: t10 });
        }
        constructor(e10, { contentType: t10, waitUntil: r10, metadata: n2 }) {
          this.response = e10, this.contentType = t10, this.metadata = n2, this.waitUntil = r10;
        }
        assignMetadata(e10) {
          Object.assign(this.metadata, e10);
        }
        get isNull() {
          return null === this.response;
        }
        get isDynamic() {
          return "string" != typeof this.response;
        }
        toUnchunkedString(e10 = false) {
          if (null === this.response) return "";
          if ("string" != typeof this.response) {
            if (!e10) throw new ty("dynamic responses cannot be unchunked. This is a bug in Next.js");
            return tS(this.readable);
          }
          return this.response;
        }
        get readable() {
          if (null === this.response) return new ReadableStream({ start(e10) {
            e10.close();
          } });
          if ("string" == typeof this.response) return t_(this.response);
          if (tb.Buffer.isBuffer(this.response)) return tE(this.response);
          if (Array.isArray(this.response)) return (function(...e10) {
            if (0 === e10.length) return new ReadableStream({ start(e11) {
              e11.close();
            } });
            if (1 === e10.length) return e10[0];
            let { readable: t10, writable: r10 } = new TransformStream(), n2 = e10[0].pipeTo(r10, { preventClose: true }), i2 = 1;
            for (; i2 < e10.length - 1; i2++) {
              let t11 = e10[i2];
              n2 = n2.then(() => t11.pipeTo(r10, { preventClose: true }));
            }
            let a2 = e10[i2];
            return (n2 = n2.then(() => a2.pipeTo(r10))).catch(tv), t10;
          })(...this.response);
          if (rS(this.response)) throw new ty("Node.js Readable cannot be converted to a web stream in the edge runtime");
          return this.response;
        }
        coerce() {
          if (null === this.response) return [];
          if ("string" == typeof this.response) return [t_(this.response)];
          if (Array.isArray(this.response)) return this.response;
          if (tb.Buffer.isBuffer(this.response)) return [tE(this.response)];
          if (!rS(this.response)) return [this.response];
          throw new ty("Node.js Readable cannot be converted to a web stream in the edge runtime");
        }
        pipeThrough(e10) {
          this.response = this.readable.pipeThrough(e10);
        }
        unshift(e10) {
          this.response = this.coerce(), this.response.unshift(e10);
        }
        push(e10) {
          this.response = this.coerce(), this.response.push(e10);
        }
        async pipeTo(e10) {
          try {
            await this.readable.pipeTo(e10, { preventClose: true }), this.waitUntil && await this.waitUntil, await e10.close();
          } catch (t10) {
            if (rv(t10)) return void await e10.abort(t10);
            throw t10;
          }
        }
        async pipeToNodeResponse(e10) {
          null !== this.response && "string" != typeof this.response && !tb.Buffer.isBuffer(this.response) && !Array.isArray(this.response) && rS(this.response) ? await rE(this.response, e10, this.waitUntil, this.metadata.clientComponentLoadTracker) : await r_(this.readable, e10, this.waitUntil, this.metadata.clientComponentLoadTracker);
        }
      }
      function rP(e10, t10) {
        if (!e10) return t10;
        let r10 = parseInt(e10, 10);
        return Number.isFinite(r10) && r10 > 0 ? r10 : t10;
      }
      rP(process.env.NEXT_PRIVATE_RESPONSE_CACHE_TTL, 1e4), rP(process.env.NEXT_PRIVATE_RESPONSE_CACHE_MAX_SIZE, 150);
      var rT = e.i(39907);
      let rA = /* @__PURE__ */ new Map(), rR = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rA.get(r10), n2 = null == e11 ? void 0 : e11.expired;
          if ("number" == typeof n2 && n2 <= performance.timeOrigin + performance.now() && n2 > t10) return true;
        }
        return false;
      }, rC = (e10, t10) => {
        for (let r10 of e10) {
          let e11 = rA.get(r10), n2 = (null == e11 ? void 0 : e11.stale) ?? 0;
          if ("number" == typeof n2 && n2 > t10) return true;
        }
        return false;
      };
      class rO {
        constructor(e10) {
          this.fs = e10, this.tasks = [];
        }
        findOrCreateTask(e10) {
          for (let t11 of this.tasks) if (t11[0] === e10) return t11;
          let t10 = this.fs.mkdir(e10);
          t10.catch(() => {
          });
          let r10 = [e10, t10, []];
          return this.tasks.push(r10), r10;
        }
        append(e10, t10) {
          let r10 = this.findOrCreateTask(rT.default.dirname(e10)), n2 = r10[1].then(() => this.fs.writeFile(e10, t10));
          n2.catch(() => {
          }), r10[2].push(n2);
        }
        wait() {
          return Promise.all(this.tasks.flatMap((e10) => e10[2]));
        }
      }
      function rk(e10) {
        return (null == e10 ? void 0 : e10.length) || 0;
      }
      class rN {
        static #t = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        static #r = this.seedReads = /* @__PURE__ */ new Map();
        constructor(e10) {
          if (this.fs = e10.fs, this.flushToDisk = e10.flushToDisk, this.serverDistDir = e10.serverDistDir, this.revalidatedTags = e10.revalidatedTags, e10.maxMemoryCacheSize) if (rN.memoryCache) rN.debug && console.log("FileSystemCache: memory store already initialized");
          else {
            var t10;
            rN.debug && console.log("FileSystemCache: using memory store for fetch cache"), t10 = e10.maxMemoryCacheSize, r || (r = new ra(t10, function({ value: e11 }, t11) {
              var r10, n2;
              let i2;
              if (e11) if (e11.kind === re.REDIRECT) i2 = JSON.stringify(e11.props).length;
              else if (e11.kind === re.IMAGE) throw Error("invariant image should not be incremental-cache");
              else i2 = e11.kind === re.FETCH ? JSON.stringify(e11.data || "").length : e11.kind === re.APP_ROUTE ? e11.body.length : e11.kind === re.APP_PAGE ? Math.max(1, e11.html.length + rk(e11.rscData) + ((null == (r10 = e11.postponed) ? void 0 : r10.length) || 0) + (function(e12) {
                if (!e12) return 0;
                let t12 = 0;
                for (let [r11, n3] of e12) t12 += r11.length + rk(n3);
                return t12;
              })(e11.segmentData)) : e11.html.length + ((null == (n2 = JSON.stringify(e11.pageData)) ? void 0 : n2.length) || 0);
              else i2 = 25;
              return t11.length + i2;
            })), rN.memoryCache = r;
          }
          else rN.debug && console.log("FileSystemCache: not using memory store for fetch cache");
        }
        resetRequestCache() {
        }
        getSeedReadState(e10) {
          return rN.seedReads.get(`${this.serverDistDir}:${e10}`);
        }
        beginSeedRead(e10) {
          let t10 = `${this.serverDistDir}:${e10}`, r10 = rN.seedReads.get(t10);
          return r10 || (r10 = { readers: 0, version: 0 }, rN.seedReads.set(t10, r10)), r10.readers++, { stateKey: t10, state: r10, version: r10.version };
        }
        finishSeedRead(e10, t10) {
          t10.readers--, 0 !== t10.readers || t10.promotion || rN.seedReads.delete(e10);
        }
        async revalidateTag(e10, t10) {
          if (e10 = "string" == typeof e10 ? [e10] : e10, rN.debug && console.log("FileSystemCache: revalidateTag", e10, t10), 0 === e10.length) return;
          let r10 = Date.now();
          for (let n2 of e10) {
            let e11 = rA.get(n2) || {};
            if (t10) {
              let i2 = { ...e11 };
              i2.stale = r10, void 0 !== t10.expire && (i2.expired = r10 + 1e3 * t10.expire), rA.set(n2, i2);
            } else rA.set(n2, { ...e11, expired: r10 });
          }
        }
        async get(...e10) {
          var t10, r10, n2, i2, a2, o2, s2, l2, c2, u2;
          let d2, [h2, p2] = e10, { kind: f2 } = p2, g2 = null == (t10 = rN.memoryCache) ? void 0 : t10.get(h2), m2 = null == (r10 = this.getSeedReadState(h2)) ? void 0 : r10.promotion;
          !g2 && m2 && (await m2, g2 = null == (s2 = rN.memoryCache) ? void 0 : s2.get(h2)), rN.debug && (f2 === rt.FETCH ? console.log("FileSystemCache: get", h2, p2.tags, f2, !!g2) : console.log("FileSystemCache: get", h2, f2, !!g2));
          let y2 = f2 === rt.PAGES || f2 === rt.APP_PAGE || f2 === rt.APP_ROUTE;
          if (!g2 && y2 && h2.startsWith(`/${t5}/`), (null == g2 || null == (n2 = g2.value) ? void 0 : n2.kind) === re.APP_PAGE || (null == g2 || null == (i2 = g2.value) ? void 0 : i2.kind) === re.APP_ROUTE || (null == g2 || null == (a2 = g2.value) ? void 0 : a2.kind) === re.PAGES) {
            let e11 = null == (l2 = g2.value.headers) ? void 0 : l2[E];
            if ("string" == typeof e11) {
              let t11 = e11.split(",");
              if (t11.length > 0 && rR(t11, g2.lastModified)) return rN.debug && console.log("FileSystemCache: expired tags", t11), d2 && this.finishSeedRead(d2.stateKey, d2.state), null;
            }
          } else if ((null == g2 || null == (o2 = g2.value) ? void 0 : o2.kind) === re.FETCH) {
            let e11 = p2.kind === rt.FETCH ? [...p2.tags || [], ...p2.softTags || []] : [];
            if (e11.some((e12) => this.revalidatedTags.includes(e12))) return rN.debug && console.log("FileSystemCache: was revalidated", e11), null;
            if (rR(e11, g2.lastModified)) return rN.debug && console.log("FileSystemCache: expired tags", e11), null;
          }
          if (d2 && g2) {
            let { stateKey: e11, state: t11, version: r11 } = d2;
            try {
              t11.version === r11 && (await this.promoteSeed(h2, h2, g2, p2, e11, t11, r11), t11.version !== r11 || (null == (c2 = rN.memoryCache) ? void 0 : c2.get(h2)) || null == (u2 = rN.memoryCache) || u2.set(h2, g2));
            } finally {
              this.finishSeedRead(e11, t11);
            }
          }
          return g2 ?? null;
        }
        async promoteSeed(e10, t10, r10, n2, i2, a2, o2) {
          let s2 = this.fs.writeFileAtomic;
          if (!this.flushToDisk || !s2 || !r10.value) return;
          if (a2.promotion) return void await a2.promotion;
          let l2 = (async () => {
            let i3 = r10.value;
            if (!i3 || a2.version !== o2 || i3.kind !== re.PAGES && i3.kind !== re.APP_PAGE && i3.kind !== re.APP_ROUTE) return;
            let l3 = n2.kind, c2 = this.getFilePath(i3.kind === re.APP_ROUTE ? `${e10}.body` : `${e10}.html`, l3);
            if (this.fs.existsSync(c2)) return;
            let u2 = this.getFilePath(i3.kind === re.APP_ROUTE ? `${t10}.body` : `${t10}.html`, l3), d2 = u2.replace(i3.kind === re.APP_ROUTE ? /\.body$/ : /\.html$/, _), h2 = JSON.parse(await this.fs.readFile(d2, "utf8"));
            h2.routeCacheLastModified = r10.lastModified;
            let p2 = [];
            i3.kind !== re.PAGES || n2.isFallback ? i3.kind === re.APP_PAGE && (n2.isFallback || n2.isRoutePPREnabled && null != h2.postponed || p2.push({ path: this.getFilePath(`${e10}${v}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${v}`, l3)) }), p2.push(...await Promise.all((h2.segmentPaths ?? []).map(async (r11) => ({ path: this.getFilePath(e10 + y + r11 + b, l3), data: await this.fs.readFile(this.getFilePath(t10 + y + r11 + b, l3)) }))))) : p2.push({ path: this.getFilePath(`${e10}${w}`, l3), data: await this.fs.readFile(this.getFilePath(`${t10}${w}`, l3)) });
            let f2 = new rO(this.fs);
            for (let e11 of p2) f2.append(e11.path, e11.data);
            if (await f2.wait(), a2.version !== o2) return;
            let g2 = c2.replace(i3.kind === re.APP_ROUTE ? /\.body$/ : /\.html$/, _);
            await this.fs.mkdir(rT.default.dirname(g2)), await this.fs.writeFile(g2, JSON.stringify(h2)), a2.version !== o2 || this.fs.existsSync(c2) || await s2.call(this.fs, c2, await this.fs.readFile(u2));
          })();
          a2.promotion = l2.catch((e11) => {
            rN.debug && console.log("FileSystemCache: failed to promote build seed", e11);
          });
          try {
            await a2.promotion;
          } finally {
            a2.promotion && (a2.promotion = void 0), 0 === a2.readers && rN.seedReads.delete(i2);
          }
        }
        async set(e10, t10, r10) {
          var n2;
          let i2 = r10.fetchCache ? void 0 : r10.cacheControl, a2 = this.getSeedReadState(e10);
          if (a2 && a2.version++, null == (n2 = rN.memoryCache) || n2.set(e10, { value: t10, lastModified: Date.now(), cacheControl: i2 }), rN.debug && console.log("FileSystemCache: set", e10), !this.flushToDisk || !t10) return;
          await (null == a2 ? void 0 : a2.promotion);
          let o2 = new rO(this.fs);
          if (t10.kind === re.APP_ROUTE) {
            let r11 = this.getFilePath(`${e10}.body`, rt.APP_ROUTE);
            o2.append(r11, t10.body);
            let n3 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0, cacheControl: i2 };
            o2.append(r11.replace(/\.body$/, _), JSON.stringify(n3, null, 2));
          } else if (t10.kind === re.PAGES || t10.kind === re.APP_PAGE) {
            let n3 = t10.kind === re.APP_PAGE, a3 = this.getFilePath(`${e10}.html`, n3 ? rt.APP_PAGE : rt.PAGES);
            if (o2.append(a3, t10.html), r10.fetchCache || r10.isFallback || r10.isRoutePPREnabled || o2.append(this.getFilePath(`${e10}${n3 ? v : w}`, n3 ? rt.APP_PAGE : rt.PAGES), n3 ? t10.rscData : JSON.stringify(t10.pageData)), (null == t10 ? void 0 : t10.kind) === re.APP_PAGE) {
              let e11;
              if (t10.segmentData) {
                e11 = [];
                let r12 = a3.replace(/\.html$/, y);
                for (let [n4, i3] of t10.segmentData) {
                  e11.push(n4);
                  let t11 = r12 + n4 + b;
                  o2.append(t11, i3);
                }
              }
              let r11 = { headers: t10.headers, status: t10.status, postponed: t10.postponed, segmentPaths: e11, prefetchHints: void 0, cacheControl: i2 };
              o2.append(a3.replace(/\.html$/, _), JSON.stringify(r11));
            } else {
              let e11 = { headers: t10.headers, status: t10.status, postponed: void 0, segmentPaths: void 0, prefetchHints: void 0 };
              o2.append(a3.replace(/\.html$/, _), JSON.stringify(e11));
            }
          } else if (t10.kind === re.FETCH) {
            let n3 = this.getFilePath(e10, rt.FETCH);
            o2.append(n3, JSON.stringify({ ...t10, tags: r10.fetchCache ? r10.tags : [] }));
          }
          await o2.wait();
        }
        getFilePath(e10, t10) {
          let r10;
          switch (t10) {
            case rt.FETCH:
              r10 = rT.default.join(this.serverDistDir, "..", "cache", "fetch-cache");
              break;
            case rt.PAGES:
              r10 = rT.default.join(this.serverDistDir, "pages");
              break;
            case rt.IMAGE:
            case rt.APP_PAGE:
            case rt.APP_ROUTE:
              r10 = rT.default.join(this.serverDistDir, "app");
              break;
            default:
              throw Error(`Unexpected file path kind: ${t10}`);
          }
          (t10 === rt.PAGES || t10 === rt.APP_PAGE || t10 === rt.APP_ROUTE) && e10.startsWith(`/${t5}/`) && (r10 = rT.default.join(this.serverDistDir, "."));
          let n2 = rT.default.join(r10, e10);
          if (!(n2.startsWith(r10 + rT.default.sep) || n2 === r10)) throw Error(`Invalid file path: ${n2}`);
          return n2;
        }
      }
      class rI {
        static #t = this.cacheControls = /* @__PURE__ */ new Map();
        constructor(e10, t10) {
          this.prerenderManifest = e10, this.locales = t10;
        }
        get(e10, t10) {
          let r10 = rI.cacheControls.get(t7(e10, t10));
          if (r10) return r10;
          let n2 = this.prerenderManifest.routes[e10];
          if (n2 && t9(e10, t10, n2, this.locales)) {
            let { initialRevalidateSeconds: e11, initialExpireSeconds: t11 } = n2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
          let i2 = t10.kind === t6.PAGES ? U(e10, this.locales).pathname : e10, a2 = this.prerenderManifest.dynamicRoutes[i2];
          if (a2 && t9(e10, t10, a2, this.locales)) {
            let { fallbackRevalidate: e11, fallbackExpire: t11 } = a2;
            if (void 0 !== e11) return { revalidate: e11, expire: t11 };
          }
        }
        set(e10, t10) {
          rI.cacheControls.set(e10, t10);
        }
        clear() {
          rI.cacheControls.clear();
        }
      }
      function rM(e10) {
        let t10 = "buffer" in e10 ? new Uint8Array(e10.buffer, e10.byteOffset, e10.byteLength) : new Uint8Array(e10), r10 = "";
        for (let e11 of t10) r10 += e11.toString(16).padStart(2, "0");
        return r10;
      }
      async function rD(e10) {
        {
          let t10 = new TextEncoder().encode(e10);
          return rM(await crypto.subtle.digest("SHA-256", t10));
        }
      }
      e.i(64116);
      class r$ {
        static #t = this.debug = !!process.env.NEXT_PRIVATE_DEBUG_CACHE;
        constructor({ fs: e10, dev: t10, flushToDisk: r10, minimalMode: n2, serverDistDir: i2, requestHeaders: a2, maxMemoryCacheSize: o2, previewProps: s2, prerenderManifest: l2, fetchCacheKeyPrefix: c2, CurCacheHandler: u2, allowedRevalidateHeaderKeys: d2, locales: h2 }) {
          var p2;
          this.locks = /* @__PURE__ */ new Map(), this.hasCustomCacheHandler = !!u2;
          let f2 = /* @__PURE__ */ Symbol.for("@next/cache-handlers"), m2 = globalThis;
          if (u2) r$.debug && console.log("IncrementalCache: using custom cache handler", u2.name);
          else {
            let t11 = m2[f2];
            (null == t11 ? void 0 : t11.FetchCache) ? (u2 = t11.FetchCache, r$.debug && console.log("IncrementalCache: using global FetchCache cache handler")) : e10 && i2 && (r$.debug && console.log("IncrementalCache: using filesystem cache handler"), u2 = rN);
          }
          process.env.__NEXT_TEST_MAX_ISR_CACHE && (o2 = parseInt(process.env.__NEXT_TEST_MAX_ISR_CACHE, 10)), this.dev = t10, this.disableForTestmode = "true" === process.env.NEXT_PRIVATE_TEST_PROXY, this.minimalMode = n2, this.requestHeaders = a2, this.allowedRevalidateHeaderKeys = d2, this.previewProps = s2, this.prerenderManifest = l2, this.locales = h2, this.cacheControls = new rI(this.prerenderManifest, h2), this.fetchCacheKeyPrefix = c2;
          let y2 = [];
          a2[g] === this.previewProps.previewModeId && (this.isOnDemandRevalidate = true), n2 && (y2 = this.revalidatedTags = (p2 = this.previewProps.previewModeId, "string" == typeof a2[S] && a2["x-next-revalidate-tag-token"] === p2 ? a2[S].split(",") : [])), u2 && (this.cacheHandler = new u2({ dev: t10, fs: e10, flushToDisk: r10, serverDistDir: i2, revalidatedTags: y2, maxMemoryCacheSize: o2, _requestHeaders: a2, fetchCacheKeyPrefix: c2 }));
        }
        calculateRevalidate(e10, t10, r10, n2) {
          if (r10) return Math.floor(performance.timeOrigin + performance.now() - 1e3);
          let i2 = e10 ? e10.revalidate : !n2 && 1;
          return "number" == typeof i2 ? 1e3 * i2 + t10 : i2;
        }
        resetRequestCache() {
          var e10, t10;
          null == (t10 = this.cacheHandler) || null == (e10 = t10.resetRequestCache) || e10.call(t10);
        }
        async lock(e10) {
          for (; ; ) {
            let t11 = this.locks.get(e10);
            if (r$.debug && console.log("IncrementalCache: lock get", e10, !!t11), !t11) break;
            await t11;
          }
          let { resolve: t10, promise: r10 } = rr();
          return r$.debug && console.log("IncrementalCache: successfully locked", e10), this.locks.set(e10, r10), () => {
            t10(), this.locks.delete(e10);
          };
        }
        async revalidateTag(e10, t10) {
          var r10;
          return null == (r10 = this.cacheHandler) ? void 0 : r10.revalidateTag(e10, t10);
        }
        async generateSimpleCacheKey(e10) {
          return rD(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10]));
        }
        async generateCacheKey(e10, t10 = {}) {
          let r10 = [], n2 = new TextEncoder(), i2 = null, a2 = t10.body;
          if (a2) if ("object" == typeof a2 && "byteLength" in a2) r10.push(`bytes:${rM(a2)}`), t10._ogBody = a2;
          else if ("function" == typeof a2.getReader) {
            let e11 = [];
            try {
              await a2.pipeTo(new WritableStream({ write(t11) {
                e11.push("string" == typeof t11 ? n2.encode(t11) : t11);
              } }));
              let i3 = e11.reduce((e12, t11) => e12 + t11.length, 0), o3 = new Uint8Array(i3), s2 = 0;
              for (let t11 of e11) o3.set(t11, s2), s2 += t11.length;
              r10.push(`bytes:${rM(o3)}`), t10._ogBody = o3;
            } catch (e12) {
              console.error("Problem reading body", e12);
            }
          } else if ("function" == typeof a2.keys) for (let [e11, n3] of (i2 = "[object FormData]" === String(a2) ? "multipart/form-data; boundary=" : "application/x-www-form-urlencoded;charset=UTF-8", t10._ogBody = a2, a2.entries())) r10.push(`key:${e11}`), "string" == typeof n3 ? r10.push(`str:${n3}`) : r10.push("file", n3.name, n3.type, `bytes:${rM(await n3.arrayBuffer())}`);
          else if ("function" == typeof a2.arrayBuffer) {
            let e11 = await a2.arrayBuffer();
            r10.push("blob", a2.type, `bytes:${rM(e11)}`), t10._ogBody = new Blob([e11], { type: a2.type }), i2 = a2.type;
          } else if ("string" == typeof a2) r10.push(`str:${a2}`), t10._ogBody = a2, i2 = "text/plain;charset=UTF-8";
          else throw Error(`Unsupported body type: ${typeof a2}`);
          let o2 = "function" == typeof (t10.headers || {}).keys ? Object.fromEntries(t10.headers) : Object.assign({}, t10.headers);
          return "traceparent" in o2 && delete o2.traceparent, "tracestate" in o2 && delete o2.tracestate, rD(JSON.stringify(["v4", this.fetchCacheKeyPrefix || "", e10, t10.method, i2, o2, t10.mode, t10.redirect, t10.credentials, t10.referrer, t10.referrerPolicy, t10.integrity, t10.cache, r10]));
        }
        async get(e10, t10) {
          var r10, n2, i2, a2, o2, s2, l2;
          let c2, u2;
          if (t10.kind === rt.IMAGE) throw new ty("Images must use the image optimizer cache");
          if (t10.kind === rt.FETCH) {
            let r11 = tf.getStore(), n3 = r11 ? tg(r11) : null;
            if (n3) {
              let r12 = n3.fetch.get(e10);
              if ((null == r12 ? void 0 : r12.kind) === re.FETCH) {
                let n4 = eI.getStore();
                if (![...t10.tags || [], ...t10.softTags || []].some((e11) => {
                  var t11, r13;
                  return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == n4 || null == (r13 = n4.pendingRevalidatedTags) ? void 0 : r13.some((t12) => t12.tag === e11));
                })) return r$.debug && console.log("IncrementalCache: rdc:hit", e10), { isStale: false, value: r12 };
                r$.debug && console.log("IncrementalCache: rdc:revalidated-tag", e10);
              } else r$.debug && console.log("IncrementalCache: rdc:miss", e10);
            } else r$.debug && console.log("IncrementalCache: rdc:no-resume-data");
          }
          if (this.disableForTestmode || this.dev && (t10.kind !== rt.FETCH || "no-cache" === this.requestHeaders["cache-control"])) return null;
          let d2 = e10, h2 = t10;
          if (t10.kind !== rt.FETCH) {
            let { route: r11, ...n3 } = t10;
            d2 = t7(e10, r11), h2 = n3;
          }
          let p2 = await (null == (r10 = this.cacheHandler) ? void 0 : r10.get(d2, h2));
          if (t10.kind === rt.FETCH) {
            if (!p2) return null;
            if ((null == (i2 = p2.value) ? void 0 : i2.kind) !== re.FETCH) throw new ty(`Expected cached value for cache key ${JSON.stringify(e10)} to be a "FETCH" kind, got ${JSON.stringify(null == (a2 = p2.value) ? void 0 : a2.kind)} instead.`);
            let r11 = eI.getStore(), n3 = [...t10.tags || [], ...t10.softTags || []];
            if (n3.some((e11) => {
              var t11, n4;
              return (null == (t11 = this.revalidatedTags) ? void 0 : t11.includes(e11)) || (null == r11 || null == (n4 = r11.pendingRevalidatedTags) ? void 0 : n4.some((t12) => t12.tag === e11));
            })) return r$.debug && console.log("IncrementalCache: expired tag", e10), null;
            let o3 = tf.getStore();
            if (o3) {
              let t11 = tg(o3);
              (null == t11 ? void 0 : t11.mutable) && (r$.debug && console.log("IncrementalCache: rdc:set", e10), t11.fetch.set(e10, p2.value));
            }
            let s3 = t10.revalidate || p2.value.revalidate, l3 = (performance.timeOrigin + performance.now() - (p2.lastModified || 0)) / 1e3 > s3, c3 = p2.value.data;
            return rR(n3, p2.lastModified) ? null : (rC(n3, p2.lastModified) && (l3 = true), { isStale: l3, value: { kind: re.FETCH, data: c3, revalidate: s3 } });
          }
          if ((null == p2 || null == (n2 = p2.value) ? void 0 : n2.kind) === re.FETCH) throw new ty(`Expected cached value for cache key ${JSON.stringify(e10)} not to be a ${JSON.stringify(t10.kind)} kind, got "FETCH" instead.`);
          let f2 = null, { isFallback: g2 } = t10, m2 = this.cacheControls.get(e10, t10.route);
          if ((null == p2 ? void 0 : p2.cacheControl) && (m2 = p2.cacheControl, this.cacheControls.set(d2, m2)), (null == p2 ? void 0 : p2.lastModified) === -1) c2 = -1, u2 = -31536e6;
          else {
            let e11 = performance.timeOrigin + performance.now(), r11 = (null == p2 ? void 0 : p2.lastModified) || e11;
            u2 = this.calculateRevalidate(m2, r11, this.dev ?? false, t10.isFallback);
            let n3 = "number" == typeof (null == m2 ? void 0 : m2.expire) ? 1e3 * m2.expire + r11 : void 0;
            if (void 0 !== n3 && n3 < e11) c2 = -1;
            else if (void 0 === (c2 = false !== u2 && u2 < e11 || void 0) && ((null == p2 || null == (o2 = p2.value) ? void 0 : o2.kind) === re.APP_PAGE || (null == p2 || null == (s2 = p2.value) ? void 0 : s2.kind) === re.APP_ROUTE)) {
              let e12 = null == (l2 = p2.value.headers) ? void 0 : l2[E];
              if ("string" == typeof e12) {
                let t11 = e12.split(",");
                t11.length > 0 && (rR(t11, r11) ? c2 = -1 : rC(t11, r11) && (c2 = true));
              }
            }
          }
          return p2 && (f2 = { isStale: c2, cacheControl: m2, revalidateAfter: u2, value: p2.value, isFallback: g2 }), !p2 && this.prerenderManifest.notFoundRoutes.includes(e10) && t9(e10, t10.route, this.prerenderManifest.routes[e10], this.locales) && (f2 = { isStale: c2, value: null, cacheControl: m2, revalidateAfter: u2, isFallback: g2 }, this.set(e10, f2.value, { ...t10, cacheControl: m2 })), f2;
        }
        async set(e10, t10, r10) {
          if ("kind" in r10 && r10.kind === rt.IMAGE) throw new ty("Images must use the image optimizer cache");
          if ((null == t10 ? void 0 : t10.kind) === re.FETCH) {
            let r11 = tf.getStore(), n3 = r11 ? tg(r11) : null;
            (null == n3 ? void 0 : n3.mutable) && (r$.debug && console.log("IncrementalCache: rdc:set", e10), n3.fetch.set(e10, t10));
          }
          if (this.disableForTestmode || this.dev && !r10.fetchCache) return;
          let n2 = e10, i2 = r10;
          if (!r10.fetchCache) {
            let { route: t11, ...a3 } = r10;
            if (!t11) throw new ty("Response cache requires a source route");
            n2 = t7(e10, t11), i2 = a3;
          }
          let a2 = JSON.stringify(t10).length;
          if (r10.fetchCache && a2 > 2097152 && !this.hasCustomCacheHandler && !r10.isImplicitBuildTimeCache) {
            let t11 = `Failed to set Next.js data cache for ${r10.fetchUrl || e10}, items over 2MB can not be cached (${a2} bytes)`;
            if (this.dev) throw Error(t11);
            console.warn(t11);
            return;
          }
          try {
            var o2;
            !r10.fetchCache && r10.cacheControl && this.cacheControls.set(n2, r10.cacheControl), await (null == (o2 = this.cacheHandler) ? void 0 : o2.set(n2, t10, i2));
          } catch (t11) {
            console.warn("Failed to update prerender cache for", e10, t11);
          }
        }
      }
      e.i(28755);
      var rL = ((ed = {})[ed.Before = 1] = "Before", ed[ed.ShellStatic = 10] = "ShellStatic", ed[ed.PrefetchStatic_prefetchApi = 11] = "PrefetchStatic_prefetchApi", ed[ed.PrefetchStatic = 12] = "PrefetchStatic", ed[ed.NavigationStatic = 13] = "NavigationStatic", ed[ed.Static = 14] = "Static", ed[ed.ShellRuntime = 20] = "ShellRuntime", ed[ed.PrefetchRuntime_prefetchApi = 21] = "PrefetchRuntime_prefetchApi", ed[ed.PrefetchRuntime = 22] = "PrefetchRuntime", ed[ed.NavigationRuntime = 23] = "NavigationRuntime", ed[ed.Dynamic = 30] = "Dynamic", ed[ed.Abandoned = 40] = "Abandoned", ed);
      function rj() {
      }
      /* @__PURE__ */ new WeakMap(), process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA, process.env.NEXT_PRIVATE_DEBUG_RUNTIME_DATA;
      class rq extends Promise {
        #n;
        static get [Symbol.species]() {
          return Promise;
        }
        static from(e10, t10) {
          let r10 = new rq(e10.then.bind(e10));
          return r10.#n = t10, Promise.prototype.then.call(r10, void 0, rj), r10;
        }
        then(e10, t10) {
          let r10 = this.#n;
          if (r10) try {
            r10();
          } catch (e11) {
            console.error(e11);
          }
          return Promise.prototype.then.call(this, e10, t10);
        }
        constructor(...e10) {
          super(...e10), this.#n = null;
        }
      }
      rL.ShellRuntime, rL.PrefetchStatic_prefetchApi, rL.PrefetchRuntime_prefetchApi, rL.PrefetchStatic, rL.PrefetchRuntime, rL.PrefetchRuntime, eN("action-async-storage");
      class rU extends Error {
        static code = "ERR_JOSE_GENERIC";
        code = "ERR_JOSE_GENERIC";
        constructor(e10, t10) {
          super(e10, t10), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
        }
      }
      class rF extends rU {
        static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      class rV extends rU {
        static code = "ERR_JWT_EXPIRED";
        code = "ERR_JWT_EXPIRED";
        claim;
        reason;
        payload;
        constructor(e10, t10, r10 = "unspecified", n2 = "unspecified") {
          super(e10, { cause: { claim: r10, reason: n2, payload: t10 } }), this.claim = r10, this.reason = n2, this.payload = t10;
        }
      }
      class rB extends rU {
        static code = "ERR_JOSE_ALG_NOT_ALLOWED";
        code = "ERR_JOSE_ALG_NOT_ALLOWED";
      }
      class rH extends rU {
        static code = "ERR_JOSE_NOT_SUPPORTED";
        code = "ERR_JOSE_NOT_SUPPORTED";
      }
      class rG extends rU {
        static code = "ERR_JWS_INVALID";
        code = "ERR_JWS_INVALID";
      }
      class rW extends rU {
        static code = "ERR_JWT_INVALID";
        code = "ERR_JWT_INVALID";
      }
      class rJ extends rU {
        static code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
        constructor(e10 = "signature verification failed", t10) {
          super(e10, t10);
        }
      }
      let rz = [["verify"], ["sign"]];
      function rK(e10) {
        let t10 = { name: "HMAC", hash: `SHA-${e10}` };
        return { kty: ["oct"], secret: true, subtle: t10, signing: t10, usages: rz };
      }
      function rQ(e10, t10) {
        let r10 = { name: t10 ? "RSA-PSS" : "RSASSA-PKCS1-v1_5", hash: `SHA-${e10}` };
        return { kty: ["RSA"], subtle: r10, signing: t10 ? { ...r10, saltLength: t10 } : r10, usages: rz, minRsaBits: 2048 };
      }
      function rX(e10, t10) {
        return { kty: ["EC"], crv: e10, subtle: { name: "ECDSA", namedCurve: e10 }, signing: { name: "ECDSA", hash: `SHA-${t10}` }, usages: rz };
      }
      function rY() {
        let e10 = { name: "Ed25519" };
        return { kty: ["OKP"], crv: "Ed25519", subtle: e10, signing: e10, usages: rz };
      }
      function rZ(e10) {
        let t10 = { name: `ML-DSA-${e10}` };
        return { kty: ["AKP"], subtle: t10, signing: t10, usages: rz };
      }
      let r0 = (function(e10) {
        let t10 = { __proto__: null };
        for (let r10 in e10) t10[r10] = { ...e10[r10], alg: r10 };
        return t10;
      })({ HS256: rK(256), HS384: rK(384), HS512: rK(512), RS256: rQ(256), RS384: rQ(384), RS512: rQ(512), PS256: rQ(256, 32), PS384: rQ(384, 48), PS512: rQ(512, 64), ES256: rX("P-256", 256), ES384: rX("P-384", 384), ES512: rX("P-521", 512), EdDSA: rY(), Ed25519: rY(), "ML-DSA-44": rZ(44), "ML-DSA-65": rZ(65), "ML-DSA-87": rZ(87) }), r1 = new TextEncoder(), r2 = new TextDecoder(), r4 = new TextDecoder("utf-8", { fatal: true }), r3 = /[^\x00-\x7f]/;
      function r6(e10) {
        if ("string" == typeof e10 && e10.length >= 128) {
          if (r3.test(e10)) throw TypeError("non-ASCII string encountered in encode()");
          return r1.encode(e10);
        }
        let t10 = new Uint8Array(e10.length);
        for (let r10 = 0; r10 < e10.length; r10++) {
          let n2 = e10.charCodeAt(r10);
          if (n2 > 127) throw TypeError("non-ASCII string encountered in encode()");
          t10[r10] = n2;
        }
        return t10;
      }
      function r5(e10) {
        try {
          return (function(e11, t10 = false) {
            if (Uint8Array.fromBase64) return Uint8Array.fromBase64(e11, { alphabet: t10 ? "base64url" : "base64" });
            if (t10) {
              if (e11.includes("+") || e11.includes("/")) throw TypeError("Invalid base64url");
              e11 = e11.replace(/-/g, "+").replace(/_/g, "/");
            }
            let r10 = atob(e11), n2 = new Uint8Array(r10.length);
            for (let e12 = 0; e12 < r10.length; e12++) n2[e12] = r10.charCodeAt(e12);
            return n2;
          })("string" == typeof e10 ? e10 : r2.decode(e10), true);
        } catch (e11) {
          throw TypeError("The input to be decoded is not correctly encoded.", { cause: e11 });
        }
      }
      function r8(e10) {
        if ("object" != typeof e10 || null === e10 || "[object Object]" !== Object.prototype.toString.call(e10)) return false;
        let t10 = Object.getPrototypeOf(e10);
        return null === t10 || null === Object.getPrototypeOf(t10);
      }
      function r9(e10, t10, r10) {
        try {
          return r5(e10);
        } catch (e11) {
          throw new r10(`Failed to base64url decode the ${t10}`, { cause: e11 });
        }
      }
      let r7 = { __proto__: null, b64: true };
      async function ne(e10, t10, r10) {
        let i2, a2, { alg: o2, secret: s2 } = e10, l2 = "decrypt" === r10 || "sign" === r10;
        if (s2 && t10 instanceof Uint8Array) return t10;
        if (r8(t10)) {
          if ("string" != typeof (i2 = (function(e11) {
            let t11 = { __proto__: null, ...e11 };
            if (void 0 !== t11.ext && "boolean" != typeof t11.ext) throw TypeError('"ext" (Extractable) Parameter must be a boolean');
            if (void 0 !== t11.key_ops) {
              let e12 = t11.key_ops, r11 = Array.isArray(e12) ? [...e12] : void 0;
              if (!r11 || r11.some((e13) => "string" != typeof e13) || new Set(r11).size !== r11.length) throw TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
              t11.key_ops = r11;
            }
            return t11;
          })(t10)).kty) throw ni(o2, t10, s2);
          if (!(s2 ? "oct" === i2.kty && "string" == typeof i2.k : "oct" !== i2.kty && (l2 ? "AKP" === i2.kty && "string" == typeof i2.priv || "string" == typeof i2.d : void 0 === i2.d && void 0 === i2.priv))) throw TypeError(s2 ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${l2 ? "private" : "public"} JWK`);
          if (((e11, t11, r11) => {
            let { alg: n2 } = e11;
            if (void 0 !== t11.use) {
              let e12 = "sign" === r11 || "verify" === r11 ? "sig" : "enc";
              if (t11.use !== e12) throw TypeError(`Invalid key for this operation, its "use" must be "${e12}" when present`);
            }
            if (void 0 !== t11.alg && t11.alg !== n2) throw TypeError(`Invalid key for this operation, its "alg" must be "${n2}" when present`);
            if (Array.isArray(t11.key_ops)) {
              let n3 = "encrypt" === r11 || "decrypt" === r11 ? e11.ops?.[+("encrypt" !== r11)] : r11;
              if (n3 && !t11.key_ops.includes(n3)) throw TypeError(`Invalid key for this operation, its "key_ops" must include "${n3}" when present`);
            }
          })(e10, i2, r10), "oct" === i2.kty) return r5(i2.k);
          if (!Object.isFrozen(t10)) {
            let { key_ops: e11 } = t10;
            Array.isArray(e11) && Object.freeze(e11), Object.freeze(t10);
          }
        } else {
          if (!nn(t10)) throw ni(o2, t10, s2);
          let e11 = s2 ? "secret" : l2 ? "private" : "public";
          if (t10.type !== e11 && (s2 || ["secret", "public", "private"].includes(t10.type))) throw TypeError(`${t10[Symbol.toStringTag]} instances must be of type "${e11}" for the ${o2} algorithm`);
          if (nr(t10)) return t10;
          if ("secret" === (a2 = t10).type) return a2.export();
        }
        let c2 = (n ||= /* @__PURE__ */ new WeakMap()).get(t10);
        if (c2?.[o2]) return c2[o2];
        if (c2 || n.set(t10, c2 = {}), a2 && "function" == typeof a2.toCryptoKey) {
          let t11 = "public" === a2.type, r11 = nt[a2.asymmetricKeyDetails?.namedCurve], n2 = e10.resolve?.({ crv: r11, asymmetricKeyType: a2.asymmetricKeyType }) ?? e10.subtle;
          return c2[o2] = a2.toCryptoKey(n2, t11, e10.usages[+!t11]);
        }
        return (i2 ??= a2.export({ format: "jwk" })).alg = o2, c2[o2] = await no(e10, i2);
      }
      let nt = { __proto__: null, prime256v1: "P-256", secp384r1: "P-384", secp521r1: "P-521" }, nr = (e10) => {
        if (e10?.[Symbol.toStringTag] === "CryptoKey") return true;
        try {
          return e10 instanceof CryptoKey;
        } catch {
          return false;
        }
      }, nn = (e10) => nr(e10) || e10?.[Symbol.toStringTag] === "KeyObject";
      function ni(e10, t10, r10) {
        let n2 = ["CryptoKey", "KeyObject", "JSON Web Key"];
        return r10 && n2.push("Uint8Array"), TypeError((function(e11, t11, ...r11) {
          if (r11.length > 2) {
            let t12 = r11.pop();
            e11 += `one of type ${r11.join(", ")}, or ${t12}.`;
          } else 2 === r11.length ? e11 += `one of type ${r11[0]} or ${r11[1]}.` : e11 += `of type ${r11[0]}.`;
          return null == t11 ? e11 += ` Received ${t11}` : "function" == typeof t11 && t11.name ? e11 += ` Received function ${t11.name}` : "object" == typeof t11 && null != t11 && t11.constructor?.name && (e11 += ` Received an instance of ${t11.constructor.name}`), e11;
        })(`Key for the ${e10} algorithm must be `, t10, ...n2));
      }
      let na = (e10, t10 = "algorithm.name") => TypeError(`CryptoKey does not support this operation, its ${t10} must be ${e10}`);
      async function no(e10, t10, r10) {
        if (!e10.kty.includes(t10.kty)) throw new rH('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
        let n2 = e10.resolve?.({ kty: t10.kty, crv: t10.crv }) ?? e10.subtle, i2 = !!(t10.d || t10.priv), a2 = { ...t10, ext: r10 ?? t10.ext };
        return "AKP" !== a2.kty && delete a2.alg, delete a2.use, crypto.subtle.importKey("jwk", a2, n2, a2.ext ?? !i2, t10.key_ops ?? e10.usages[+!!i2]);
      }
      async function ns(e10, t10, r10, n2 = false) {
        return e10 instanceof Uint8Array && (e10 = await crypto.subtle.importKey("raw", e10, t10, n2, [r10])), (function(e11, t11, r11) {
          let n3 = e11.algorithm;
          if (n3.name !== t11.name) throw na(t11.name);
          if (t11.hash && n3.hash?.name !== t11.hash) throw na(t11.hash, "algorithm.hash");
          if (t11.namedCurve && n3.namedCurve !== t11.namedCurve) throw na(t11.namedCurve, "algorithm.namedCurve");
          if (void 0 !== t11.length && n3.length !== t11.length) throw na(t11.length, "algorithm.length");
          if (r11 && !e11.usages.includes(r11)) throw TypeError(`CryptoKey does not support this operation, its usages must include ${r11}.`);
        })(e10, t10, r10), e10;
      }
      function nl(e10) {
        try {
          return r6(e10);
        } catch (e11) {
          throw new rG("JWS Compact Serialization payload must use only ASCII characters", { cause: e11 });
        }
      }
      async function nc(e10, t10, r10, n2, i2) {
        let { protected: a2, header: o2, payload: s2 } = e10, l2 = i2 ?? (void 0 === a2 ? {} : (function(e11, t11, r11) {
          let n3;
          try {
            n3 = JSON.parse(r4.decode(r5(e11)));
          } catch (e12) {
            throw new t11(r11, { cause: e12 });
          }
          if (!r8(n3)) throw new t11(r11);
          return n3;
        })(a2, rG, "JWS Protected Header is invalid"));
        if (!(function(...e11) {
          let t11 = /* @__PURE__ */ new Set();
          for (let r11 of e11) if (r11) for (let e12 of Object.keys(r11)) {
            if (t11.has(e12)) return false;
            t11.add(e12);
          }
          return true;
        })(l2, o2)) throw new rG("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
        let c2 = { ...l2, ...o2 }, u2 = (function(e11, t11) {
          if (t11.includes("b64")) {
            let t12 = e11.b64;
            if ("boolean" != typeof t12) throw new rG('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
            return t12;
          }
          return true;
        })(l2, (function(e11, t11, r11, n3, i3) {
          if (void 0 !== i3.crit && n3?.crit === void 0) throw new e11('"crit" (Critical) Header Parameter MUST be integrity protected');
          if (!n3 || void 0 === n3.crit) return [];
          if (!Array.isArray(n3.crit) || 0 === n3.crit.length || n3.crit.some((e12) => "string" != typeof e12 || 0 === e12.length)) throw new e11('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
          let a3 = void 0 === r11 ? t11 : { __proto__: null, ...r11, ...t11 };
          for (let t12 of n3.crit) {
            if (!(t12 in a3)) throw new rH(`Extension Header Parameter "${t12}" is not recognized`);
            if (!Object.hasOwn(i3, t12) || void 0 === i3[t12]) throw new e11(`Extension Header Parameter "${t12}" is missing`);
            if (a3[t12] && (!Object.hasOwn(n3, t12) || void 0 === n3[t12])) throw new e11(`Extension Header Parameter "${t12}" MUST be integrity protected`);
          }
          return n3.crit;
        })(rG, r7, t10[1], l2, c2)), { alg: d2 } = c2;
        if ("string" != typeof d2 || !d2) throw new rG('JWS "alg" (Algorithm) Header Parameter missing or invalid');
        if (t10[0] && !t10[0].has(d2)) throw new rB('"alg" (Algorithm) Header Parameter value not allowed');
        if (u2) {
          if ("string" != typeof s2) throw new rG("JWS Payload must be a string");
        } else if ("string" != typeof s2 && !(s2 instanceof Uint8Array)) throw new rG("JWS Payload must be a string or an Uint8Array instance");
        let h2 = u2 || "string" != typeof s2 ? s2 : n2(s2), p2 = false;
        "function" == typeof r10 && (r10 = await r10(l2, e10), p2 = true);
        let f2 = (function(e11) {
          let t11 = "string" == typeof e11 ? r0[e11] : void 0;
          if (!t11) throw new rH(`alg ${e11} is not supported either by JOSE or your javascript runtime`);
          return t11;
        })(d2), g2 = (function(...e11) {
          let t11 = new Uint8Array(e11.reduce((e12, { length: t12 }) => e12 + t12, 0)), r11 = 0;
          for (let n3 of e11) t11.set(n3, r11), r11 += n3.length;
          return t11;
        })(void 0 !== a2 ? r6(a2) : new Uint8Array(), r6("."), "string" == typeof h2 ? t10[2] ??= (function(e11, t11, r11) {
          try {
            return r6(e11);
          } catch (e12) {
            throw new r11(`The ${t11} is not a valid base64url string`, { cause: e12 });
          }
        })(h2, "payload", rG) : h2), m2 = r9(e10.signature, "signature", rG), y2 = await ne(f2, r10, "verify"), b2 = await ns(y2, f2.subtle, "verify");
        f2.minRsaBits && (function(e11, t11) {
          let { modulusLength: r11 } = t11.algorithm;
          if ("number" != typeof r11 || r11 < 2048) throw TypeError(`${e11} requires key modulusLength to be 2048 bits or larger`);
        })(f2.alg, b2);
        let v2 = false;
        try {
          v2 = await crypto.subtle.verify(f2.signing, b2, m2, g2);
        } catch (e11) {
          throw new rJ(void 0, { cause: e11 });
        }
        if (!v2) throw new rJ();
        let w2 = { payload: "string" == typeof h2 ? r9(h2, "payload", rG) : h2 };
        return void 0 !== a2 && (w2.protectedHeader = l2), void 0 !== o2 && (w2.unprotectedHeader = o2), p2 ? [{ ...w2, key: y2 }, u2] : [w2, u2];
      }
      async function nu(e10, t10, r10) {
        if (e10 instanceof Uint8Array && (e10 = r2.decode(e10)), "string" != typeof e10) throw new rG("Compact JWS must be a string or Uint8Array");
        let { 0: n2, 1: i2, 2: a2, length: o2 } = e10.split(".");
        if (3 !== o2) throw new rG("Invalid Compact JWS");
        return nc({ payload: i2, protected: n2, signature: a2 }, t10, r10, nl);
      }
      let nd = { s: 1, m: 60, h: 3600, d: 86400, w: 604800, y: 31557600 }, nh = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, np = "check_failed";
      function nf() {
        throw TypeError("Invalid time period format");
      }
      function ng(e10) {
        "string" != typeof e10 && nf();
        let t10 = nh.exec(e10);
        (!t10 || t10[4] && t10[1]) && nf();
        let r10 = Math.round(parseFloat(t10[2]) * nd[t10[3][0].toLowerCase()]);
        return Number.isFinite(r10) || nf(), "-" === t10[1] || "ago" === t10[4] ? -r10 : r10;
      }
      function nm(e10, t10) {
        if (!Number.isFinite(t10)) throw TypeError(`Invalid ${e10} input`);
        return t10;
      }
      let ny = (e10) => {
        let t10 = e10.toLowerCase();
        return e10.includes("/") ? t10 : `application/${t10}`;
      };
      function nb(e10, t10, r10 = false) {
        let n2 = e10[t10];
        if (!(void 0 === n2 && !r10)) {
          if ("number" != typeof n2) throw new rF(`"${t10}" claim must be a number`, e10, t10, "invalid");
          return n2;
        }
      }
      function nv(e10, t10) {
        throw new rF(`unexpected "${t10}" claim value`, e10, t10, np);
      }
      async function nw(e10, t10, r10) {
        let [n2, i2] = await nu(e10, [r10 && (function(e11, t11) {
          if (void 0 !== t11 && (!Array.isArray(t11) || t11.some((e12) => "string" != typeof e12))) throw TypeError(`"${e11}" option must be an array of strings`);
          return void 0 === t11 ? void 0 : new Set(t11);
        })("algorithms", r10.algorithms), r10?.crit], t10);
        if (!i2) throw new rW("JWTs MUST NOT use unencoded payload");
        let a2 = (function(e11, t11, r11 = {}) {
          let n3, i3, a3;
          try {
            n3 = JSON.parse(r4.decode(t11));
          } catch (e12) {
            throw new rW("JWT Claims Set must be a top-level JSON object", { cause: e12 });
          }
          if (!r8(n3)) throw new rW("JWT Claims Set must be a top-level JSON object");
          let { typ: o2 } = r11;
          if (void 0 !== o2 && ("string" != typeof e11.typ || ny(e11.typ) !== ny(o2))) throw new rF('unexpected "typ" JWT header value', n3, "typ", np);
          let { requiredClaims: s2 = [], issuer: l2, subject: c2, audience: u2, maxTokenAge: d2 } = r11, h2 = [...s2];
          for (let e12 of (void 0 !== d2 && h2.push("iat"), void 0 !== u2 && h2.push("aud"), void 0 !== c2 && h2.push("sub"), void 0 !== l2 && h2.push("iss"), new Set(h2.reverse()))) if (!Object.hasOwn(n3, e12)) throw new rF(`missing required "${e12}" claim`, n3, e12, "missing");
          void 0 === l2 || (Array.isArray(l2) ? l2 : [l2]).includes(n3.iss) || nv(n3, "iss"), void 0 !== c2 && n3.sub !== c2 && nv(n3, "sub"), void 0 === u2 || (i3 = n3.aud, a3 = "string" == typeof u2 ? [u2] : u2, "string" == typeof i3 ? a3.includes(i3) : !!Array.isArray(i3) && a3.some((e12) => i3.includes(e12))) || nv(n3, "aud");
          let { clockTolerance: p2 } = r11, f2 = 0;
          if ("string" == typeof p2) f2 = ng(p2);
          else if (void 0 !== p2) {
            if ("number" != typeof p2) throw TypeError("Invalid clockTolerance option type");
            f2 = p2;
          }
          if (nm("clockTolerance option", f2), f2 < 0) throw TypeError("Invalid clockTolerance option input");
          let { currentDate: g2 } = r11, m2 = nm("currentDate option", Math.floor((void 0 === g2 ? /* @__PURE__ */ new Date() : g2).getTime() / 1e3)), y2 = nb(n3, "iat", void 0 !== d2), b2 = nb(n3, "nbf");
          if (void 0 !== b2 && b2 > m2 + f2) throw new rF('"nbf" claim timestamp check failed', n3, "nbf", np);
          let v2 = nb(n3, "exp");
          if (void 0 !== v2 && v2 <= m2 - f2) throw new rV('"exp" claim timestamp check failed', n3, "exp", np);
          if (void 0 !== d2) {
            let e12 = m2 - y2, t12 = nm("maxTokenAge option", "number" == typeof d2 ? d2 : ng(d2));
            if (t12 < 0) throw TypeError("Invalid maxTokenAge option input");
            if (e12 - f2 > t12) throw new rV('"iat" claim timestamp check failed (too far in the past)', n3, "iat", np);
            if (e12 < -f2) throw new rF('"iat" claim timestamp check failed (it should be in the past)', n3, "iat", np);
          }
          return n3;
        })(n2.protectedHeader, n2.payload, r10);
        return { ...n2, payload: a2 };
      }
      var n_ = e.i(35423);
      let nE = { current: null }, nS = "function" == typeof n_.cache ? n_.cache : (e10) => e10, nx = console.warn;
      function nP(e10) {
        return function(...t10) {
          nx(e10(...t10));
        };
      }
      nS((e10) => {
        try {
          nx(nE.current);
        } finally {
          nE.current = null;
        }
      }), /* @__PURE__ */ new WeakMap(), nP(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`cookies()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }), /* @__PURE__ */ new WeakMap(), nP(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`headers()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }), /* @__PURE__ */ new WeakMap(), nP(function(e10, t10) {
        let r10 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r10}used ${t10}. \`draftMode()\` returns a Promise and must be unwrapped with \`await\` or \`React.use()\` before accessing its properties. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      });
      var nT = e.i(10475);
      async function nA(e10) {
        if (!e10) return null;
        try {
          let t10, { payload: r10 } = await nw(e10, (t10 = process.env.AUTH_SECRET || process.env.SESSION_SECRET || "as-sunnah-foundation-secure-sprint4-jwt-key-2026", new TextEncoder().encode(t10)));
          if (!r10.adminId || !r10.email) return null;
          return { adminId: String(r10.adminId), email: String(r10.email), name: String(r10.name || "\u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8"), role: r10.role || nT.AdminRole.SUPER_ADMIN };
        } catch {
          return null;
        }
      }
      async function nR(e10) {
        let { pathname: t10 } = e10.nextUrl, r10 = t10.replace(/\/+$/, "") || "/", n2 = e10.headers.get("authorization"), i2 = n2?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim(), a2 = e10.cookies.get("asf_admin_session")?.value, o2 = i2 || a2, s2 = o2 ? await nA(o2) : null;
        if ("/admin/login" === r10) {
          if (s2) {
            let t11 = new URL((function(e11, t12 = "/admin/applications") {
              if (!e11 || "string" != typeof e11) return t12;
              let r11 = e11.trim();
              return !r11.startsWith("/") || r11.startsWith("//") || r11.startsWith("/\\") || r11.includes("://") || r11.startsWith("/\\\\") ? t12 : r11;
            })(e10.nextUrl.searchParams.get("from"), "/admin/applications"), e10.url);
            return ew.redirect(t11);
          }
          return ew.next();
        }
        if ("/api/admin/auth" === r10 || r10.startsWith("/api/admin/auth/")) return ew.next();
        if ("/api/auth/magic-link/create" === r10) return s2 ? ew.next() : ew.json({ success: false, error: "\u0985\u09A8\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u0985\u09CD\u09AF\u09BE\u0995\u09CD\u09B8\u09C7\u09B8\u0964 \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09AE\u09CD\u09AF\u09BE\u099C\u09BF\u0995 \u09B2\u09BF\u0982\u0995 \u09A4\u09C8\u09B0\u09BF \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8\u0964" }, { status: 401 });
        if ("/api/admin" === r10 || r10.startsWith("/api/admin/")) return s2 ? ew.next() : ew.json({ success: false, error: "\u0985\u09A8\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u0985\u09CD\u09AF\u09BE\u0995\u09CD\u09B8\u09C7\u09B8\u0964 \u0985\u09CD\u09AF\u09BE\u09A1\u09AE\u09BF\u09A8 \u09B2\u0997\u0987\u09A8 \u0986\u09AC\u09B6\u09CD\u09AF\u0995\u0964" }, { status: 401 });
        if ("/admin" === r10) {
          if (!s2) {
            let t11 = new URL("/admin/login", e10.url);
            return t11.searchParams.set("from", "/admin/applications"), ew.redirect(t11);
          }
          return ew.redirect(new URL("/admin/applications", e10.url));
        }
        if (r10.startsWith("/admin/") && !s2) {
          let t11 = e10.nextUrl.pathname + e10.nextUrl.search, r11 = new URL("/admin/login", e10.url);
          return r11.searchParams.set("from", t11), ew.redirect(r11);
        }
        return ew.next();
      }
      e.s(["config", 0, { matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*", "/api/auth/magic-link/create"] }, "middleware", 0, nR], 94421);
      let nC = { ...e.i(94421) }, nO = "/middleware", nk = nC.middleware || nC.default;
      if ("function" != typeof nk) throw new class extends Error {
        constructor(e10) {
          super(e10), this.stack = "";
        }
      }(`The Middleware file "${nO}" must export a function named \`middleware\` or a default function.`);
      let nN = async (e10) => {
        let t10, r10;
        try {
          return await tZ({ ...e10, IncrementalCache: r$, incrementalCacheHandler: null, page: nO, handler: async (...e11) => {
            try {
              return await nk(...e11);
            } catch (i2) {
              let t11 = e11[0], r11 = new URL(t11.url), n2 = r11.pathname + r11.search;
              throw await l(i2, { path: n2, method: t11.method, headers: Object.fromEntries(t11.headers.entries()) }, { routerKind: "Pages Router", routePath: "/proxy", routeType: "proxy", revalidateReason: void 0 }), i2;
            }
          }, emitInstrumentationSpans: t10, requestStartTime: r10 });
        } catch (e11) {
          try {
            null == t10 || t10();
          } catch {
          }
          throw e11;
        }
      };
      async function nI(e10, t10) {
        let r10 = await nN({ request: { url: e10.url, method: e10.method, headers: A(e10.headers), nextConfig: { basePath: "", i18n: "", trailingSlash: false, experimental: { cacheLife: { default: { stale: 300, revalidate: 900, expire: 4294967294 }, seconds: { stale: 30, revalidate: 1, expire: 60 }, minutes: { stale: 300, revalidate: 60, expire: 3600 }, hours: { stale: 300, revalidate: 3600, expire: 86400 }, days: { stale: 300, revalidate: 86400, expire: 604800 }, weeks: { stale: 300, revalidate: 604800, expire: 2592e3 }, max: { stale: 300, revalidate: 2592e3, expire: 31536e3 } }, authInterrupts: false, clientParamParsingOrigins: [] } }, page: { name: nO }, body: "GET" !== e10.method && "HEAD" !== e10.method ? e10.body ?? void 0 : void 0, waitUntil: t10.waitUntil, requestMeta: t10.requestMeta, signal: t10.signal || new AbortController().signal } });
        return null == t10.waitUntil || t10.waitUntil.call(t10, r10.waitUntil), r10.response;
      }
      e.s(["default", 0, nN, "handler", 0, nI], 62407);
    }, 39907, (e, t, r) => {
      t.exports = e.r(89639);
    }, 11847, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { getTestReqInfo: function() {
        return l;
      }, withRequest: function() {
        return s;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = new (e.r(78500)).AsyncLocalStorage();
      function o(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (!r2) return;
        let n2 = t2.url(e2);
        return { url: n2, proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function s(e2, t2, r2) {
        let n2 = o(e2, t2);
        return n2 ? a.run(n2, r2) : r2();
      }
      function l(e2, t2) {
        let r2 = a.getStore();
        return r2 || (e2 && t2 ? o(e2, t2) : void 0);
      }
    }, 76610, (e, t, r) => {
      "use strict";
      var n = e.i(51615);
      Object.defineProperty(r, "__esModule", { value: true });
      var i = { handleFetch: function() {
        return u;
      }, interceptFetch: function() {
        return d;
      }, reader: function() {
        return s;
      } };
      for (var a in i) Object.defineProperty(r, a, { enumerable: true, get: i[a] });
      let o = e.r(11847), s = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function l(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d2, referrer: h, referrerPolicy: p } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", (function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++) if (e3[t3].length > 0) {
            e3 = e3.slice(t3);
            break;
          }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        })()]], body: o2 ? n.Buffer.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: c2, mode: u2, redirect: d2, referrer: h, referrerPolicy: p } };
      }
      function c(e2, t2) {
        return t2.headers.set("next-test-internal", "1"), e2(t2);
      }
      async function u(e2, t2) {
        let r2 = (0, o.getTestReqInfo)(t2, s);
        if (!r2) return c(e2, t2);
        let { testData: i2, proxyPort: a2 } = r2, u2 = await l(i2, t2), d2 = await e2(`http://localhost:${a2}`, { method: "POST", body: JSON.stringify(u2), headers: { "next-test-internal": "1" }, next: { internal: true } });
        if (!d2.ok) throw Error(`Proxy request failed: ${d2.status}`);
        let h = await d2.json(), { api: p } = h;
        switch (p) {
          case "continue":
            return c(e2, t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
          case "fetch":
            return (function(e3) {
              let { status: t3, headers: r3, body: i3 } = e3.response;
              return new Response(i3 ? n.Buffer.from(i3, "base64") : null, { status: t3, headers: new Headers(r3) });
            })(h);
          default:
            return p;
        }
      }
      function d(t2) {
        return e.g.fetch = function(e2, r2) {
          var n2;
          return (null == r2 || null == (n2 = r2.next) ? void 0 : n2.internal) ? t2(e2, r2) : u(t2, new Request(e2, r2));
        }, () => {
          e.g.fetch = t2;
        };
      }
    }, 31318, (e, t, r) => {
      "use strict";
      Object.defineProperty(r, "__esModule", { value: true });
      var n = { interceptTestApis: function() {
        return s;
      }, wrapRequestHandler: function() {
        return l;
      } };
      for (var i in n) Object.defineProperty(r, i, { enumerable: true, get: n[i] });
      let a = e.r(11847), o = e.r(76610);
      function s() {
        return (0, o.interceptFetch)(e.g.fetch);
      }
      function l(e2) {
        return (t2, r2) => (0, a.withRequest)(t2, o.reader, () => e2(t2, r2));
      }
    }]);
  }
});

// .next/server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js
var require_igt_next_dist_esm_build_templates_edge_wrapper_16fitzwc6vw_y = __commonJS({
  ".next/server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js"() {
    "use strict";
    (globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js", { otherChunks: ["chunks/[root-of-the-server]__11zk02vj3xkf2._.js", "chunks/[root-of-the-server]__20wuf2xt1epdd._.js"], runtimeModuleIds: [50416] }]), (() => {
      let e;
      var t, r = globalThis.TURBOPACK;
      if (void 0 === r) r = [];
      else if (!Array.isArray(r)) return;
      var n = ((t = n || {})[t.Runtime = 0] = "Runtime", t[t.Parent = 1] = "Parent", t[t.Update = 2] = "Update", t);
      let o = /* @__PURE__ */ new WeakMap();
      function u(e2, t2) {
        this.m = e2, this.e = t2;
      }
      let i = u.prototype, l = Object.prototype.hasOwnProperty, s = "u" > typeof Symbol && Symbol.toStringTag;
      function a(e2, t2, r2) {
        l.call(e2, t2) || Object.defineProperty(e2, t2, r2);
      }
      function f(e2, t2) {
        let r2 = e2.get(t2);
        return void 0 === r2 && (r2 = c(t2), e2.set(t2, r2)), r2;
      }
      function c(e2) {
        return { exports: {}, error: void 0, id: e2, namespaceObject: void 0 };
      }
      function p(e2, t2, r2) {
        a(e2, "__esModule", { value: true }), s && a(e2, s, { value: "Module" });
        let n2 = 0;
        for (; n2 < t2.length; ) {
          let r3 = t2[n2++], o2 = t2[n2++];
          if ("number" == typeof o2) if (0 === o2) a(e2, r3, { value: t2[n2++], enumerable: true, writable: false });
          else throw Error(`unexpected tag: ${o2}`);
          else "function" == typeof t2[n2] ? a(e2, r3, { get: o2, set: t2[n2++], enumerable: true }) : a(e2, r3, { get: o2, enumerable: true });
        }
        r2 || Object.seal(e2);
      }
      function h(e2, t2, r2) {
        let n2, o2;
        null != t2 ? o2 = (n2 = f(this.c, t2)).exports : (n2 = this.m, o2 = this.e), n2.namespaceObject = o2, p(o2, e2, r2);
      }
      function d(e2, t2, r2, n2) {
        let o2 = Reflect.getOwnPropertyDescriptor(r2, n2);
        if (o2) {
          if ("value" in o2) return void e2.push(t2, 0, o2.value);
          if (o2.get) return void e2.push(t2, o2.get);
        }
        e2.push(t2, () => r2[n2]);
      }
      function m(e2, t2) {
        (null != t2 ? f(this.c, t2) : this.m).exports = e2;
      }
      i.s = h, i.S = function(e2, t2) {
        let r2 = [], n2 = 0;
        for (; n2 < e2.length; ) {
          let t3 = e2[n2++], o2 = n2;
          for (; n2 < e2.length && 0 !== e2[n2]; ) n2++;
          let u2 = n2;
          n2++;
          let i2 = "string" == typeof t3 || "number" == typeof t3 ? O.call(this, t3) : t3;
          if (u2 - o2 == 1) {
            let t4 = e2[o2].split(",");
            for (let e3 = 0; e3 < t4.length; e3 += 2) d(r2, t4[e3], i2, t4[e3 + 1]);
          } else for (let t4 = o2; t4 < u2; t4 += 2) d(r2, e2[t4], i2, e2[t4 + 1]);
        }
        h.call(this, r2, t2);
      }, i.j = function(e2, t2) {
        let r2, n2;
        null != t2 ? n2 = (r2 = f(this.c, t2)).exports : (r2 = this.m, n2 = this.e);
        let u2 = (function(e3, t3) {
          let r3 = o.get(e3);
          if (!r3) {
            o.set(e3, r3 = []);
            let n3 = (e4) => {
              if ("default" !== e4) {
                for (let t4 of r3) if (l.call(t4, e4)) return t4;
              }
            };
            e3.exports = e3.namespaceObject = new Proxy(t3, { get(e4, t4) {
              if (l.call(e4, t4) || "default" === t4 || "__esModule" === t4) return Reflect.get(e4, t4);
              let r4 = n3(t4);
              return r4 && Reflect.get(r4, t4);
            }, set: () => false, defineProperty: () => false, deleteProperty: () => false, has: (e4, t4) => !!Reflect.has(e4, t4) || "default" !== t4 && "__esModule" !== t4 && void 0 !== n3(t4), ownKeys(e4) {
              let t4 = Reflect.ownKeys(e4);
              for (let e5 of r3) for (let r4 of Reflect.ownKeys(e5)) "default" === r4 || t4.includes(r4) || t4.push(r4);
              return t4;
            }, getOwnPropertyDescriptor(e4, t4) {
              let r4 = Reflect.getOwnPropertyDescriptor(e4, t4);
              if (r4 || "default" === t4 || "__esModule" === t4) return r4;
              let o2 = n3(t4);
              if (o2) return { enumerable: true, configurable: true, get: () => Reflect.get(o2, t4) };
            } });
          }
          return r3;
        })(r2, n2);
        "object" == typeof e2 && null !== e2 && u2.push(e2);
      }, i.v = m, i.n = function(e2, t2) {
        let r2;
        (r2 = null != t2 ? f(this.c, t2) : this.m).exports = r2.namespaceObject = e2;
      };
      let y = Object.getPrototypeOf ? (e2) => Object.getPrototypeOf(e2) : (e2) => e2.__proto__, b = [null, y({}), y([]), y(y)];
      function g(e2, t2, r2) {
        let n2 = [], o2 = -1;
        for (let t3 = e2; ("object" == typeof t3 || "function" == typeof t3) && !b.includes(t3); t3 = y(t3)) for (let r3 of Object.getOwnPropertyNames(t3)) n2.push(r3, /* @__PURE__ */ (function(e3, t4) {
          return () => e3[t4];
        })(e2, r3)), -1 === o2 && "default" === r3 && (o2 = n2.length - 1);
        return r2 && o2 >= 0 || (o2 >= 0 ? n2.splice(o2, 1, 0, e2) : n2.push("default", 0, e2)), p(t2, n2), t2;
      }
      function w(e2) {
        return "function" == typeof e2 ? function(...t2) {
          return e2.apply(this, t2);
        } : /* @__PURE__ */ Object.create(null);
      }
      function O(e2) {
        let t2 = D(e2, this.m);
        if (t2.namespaceObject) return t2.namespaceObject;
        let r2 = t2.exports;
        return t2.namespaceObject = g(r2, w(r2), r2 && r2.__esModule);
      }
      function _(e2) {
        let t2 = e2.indexOf("#");
        -1 !== t2 && (e2 = e2.substring(0, t2));
        let r2 = e2.indexOf("?");
        return -1 !== r2 && (e2 = e2.substring(0, r2)), e2;
      }
      function k(e2) {
        return "string" == typeof e2 ? e2 : e2.path;
      }
      i.i = O, i.A = function(e2) {
        return this.r(e2)(O.bind(this));
      }, i.t = "function" == typeof __require ? __require : function() {
        throw Error("Unexpected use of runtime require");
      }, i.r = function(e2) {
        return D(e2, this.m).exports;
      }, i.f = function(e2) {
        function t2(t3) {
          if (t3 = _(t3), l.call(e2, t3)) return e2[t3].module();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }
        return t2.keys = () => Object.keys(e2), t2.resolve = (t3) => {
          if (t3 = _(t3), l.call(e2, t3)) return e2[t3].id();
          let r2 = Error(`Cannot find module '${t3}'`);
          throw r2.code = "MODULE_NOT_FOUND", r2;
        }, t2.import = async (e3) => await t2(e3), t2;
      };
      let j = function(e2) {
        let t2 = new URL(e2, "x:/"), r2 = {};
        for (let e3 in t2) r2[e3] = t2[e3];
        for (let t3 in r2.href = e2, r2.pathname = e2.replace(/[?#].*/, ""), r2.origin = r2.protocol = "", r2.toString = r2.toJSON = (...t4) => e2, r2) Object.defineProperty(this, t3, { enumerable: true, configurable: true, value: r2[t3] });
      };
      function v(e2, t2) {
        throw Error(`Invariant: ${t2(e2)}`);
      }
      j.prototype = URL.prototype, i.U = j, i.z = function(e2) {
        throw Error("dynamic usage of require is not supported");
      }, i.g = globalThis;
      let C = /* @__PURE__ */ Symbol("turbopack queues"), P = /* @__PURE__ */ Symbol("turbopack exports"), R = /* @__PURE__ */ Symbol("turbopack error");
      function U() {
        let e2, t2;
        return { promise: new Promise((r2, n2) => {
          t2 = n2, e2 = r2;
        }), resolve: e2, reject: t2 };
      }
      function x(e2) {
        e2 && 1 !== e2.status && (e2.status = 1, e2.forEach((e3) => e3.queueCount--), e2.forEach((e3) => e3.queueCount-- ? e3.queueCount++ : e3()));
      }
      i.a = function(e2, t2) {
        let r2 = this.m, n2 = t2 ? Object.assign([], { status: -1 }) : void 0, o2 = /* @__PURE__ */ new Set(), { resolve: u2, reject: i2, promise: l2 } = U(), s2 = Object.assign(l2, { [P]: r2.exports, [C]: (e3) => {
          n2 && e3(n2), o2.forEach(e3), s2.catch(() => {
          });
        } }), a2 = { get: () => s2, set(e3) {
          e3 !== s2 && (s2[P] = e3);
        } };
        Object.defineProperty(r2, "exports", a2), Object.defineProperty(r2, "namespaceObject", a2), e2(function(e3) {
          let t3 = e3.map((e4) => {
            if (null !== e4 && "object" == typeof e4) {
              if (C in e4) return e4;
              if (null != e4 && "object" == typeof e4 && "then" in e4 && "function" == typeof e4.then) {
                let t4 = Object.assign([], { status: 0 }), r4 = { [P]: {}, [C]: (e5) => e5(t4) };
                return e4.then((e5) => {
                  r4[P] = e5, x(t4);
                }, (e5) => {
                  r4[R] = e5, x(t4);
                }), r4;
              }
            }
            return { [P]: e4, [C]: () => {
            } };
          }), r3 = () => t3.map((e4) => {
            if (e4[R]) throw e4[R];
            return e4[P];
          }), { promise: u3, resolve: i3 } = U(), l3 = Object.assign(() => i3(r3), { queueCount: 0 });
          function s3(e4) {
            e4 !== n2 && !o2.has(e4) && (o2.add(e4), e4 && 0 === e4.status && (l3.queueCount++, e4.push(l3)));
          }
          return t3.map((e4) => e4[C](s3)), l3.queueCount ? u3 : r3();
        }, function(e3) {
          e3 ? i2(s2[R] = e3) : u2(s2[P]), x(n2);
        }), n2 && -1 === n2.status && (n2.status = 0);
      };
      let M = u.prototype, $ = "string" == typeof TURBOPACK_CHUNK_BASE_PATH ? TURBOPACK_CHUNK_BASE_PATH : "", E = /* @__PURE__ */ new Map();
      i.M = E;
      let T = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), q = /* @__PURE__ */ new Map();
      async function S(e2, t2, r2) {
        let n2;
        if ("string" == typeof r2) return (function(e3, t3, r3) {
          return B(e3, t3, r3);
        })(e2, t2, H(r2));
        let o2 = r2.included || [], u2 = o2.map((e3) => !!E.has(e3) || T.get(e3));
        if (u2.length > 0 && u2.every((e3) => e3)) return void await Promise.all(u2);
        for (let u3 of (n2 = B(e2, t2, H(r2.path)), o2)) T.has(u3) || T.set(u3, n2);
        await n2;
      }
      M.l = function(e2) {
        return S(n.Parent, this.m.id, e2);
      };
      let K = Promise.resolve(void 0), N = /* @__PURE__ */ new WeakMap();
      function B(t2, r2, o2) {
        let u2 = e.loadChunkCached(t2, o2), i2 = N.get(u2);
        if (void 0 === i2) {
          let e2 = N.set.bind(N, u2, K);
          i2 = u2.then(e2).catch((e3) => {
            let u3;
            switch (t2) {
              case n.Runtime:
                u3 = `as a runtime dependency of chunk ${r2}`;
                break;
              case n.Parent:
                u3 = `from module ${r2}`;
                break;
              case n.Update:
                u3 = "from an HMR update";
                break;
              default:
                v(t2, (e4) => `Unknown source type: ${e4}`);
            }
            let i3 = Error(`Failed to load chunk ${o2} ${u3}${e3 ? `: ${e3}` : ""}`, e3 ? { cause: e3 } : void 0);
            throw i3.name = "ChunkLoadError", i3;
          }), N.set(u2, i2);
        }
        return i2;
      }
      M.L = function(e2) {
        var t2, r2;
        return t2 = n.Parent, r2 = this.m.id, B(t2, r2, e2);
      };
      M.R = function(e2) {
        let t2 = this.r(e2);
        return t2?.default ?? t2;
      }, M.P = function(e2) {
        return `/ROOT/${e2 ?? ""}`;
      }, M.F = function(e2, t2) {
        return `file:///${encodeURIComponent(t2 ?? "ROOT")}/${e2.split("/").map(encodeURIComponent).join("/")}`;
      }, M.q = function(e2, t2) {
        m.call(this, `${e2}`, t2);
      };
      let I = /[^A-Za-z0-9\-_.!~*'()/]/;
      function H(e2, t2 = $) {
        let r2 = I.test(e2) ? e2.split("/").map(encodeURIComponent).join("/") : e2;
        return `${t2}${r2}`;
      }
      M.b = $, M.X = "", M.h = H;
      let L = /* @__PURE__ */ new Map();
      i.c = L;
      let D = (e2, t2) => {
        let r2 = L.get(e2);
        if (r2) {
          if (r2.error) throw r2.error;
          return r2;
        }
        return z(e2, n.Parent, t2.id);
      };
      function z(e2, t2, r2) {
        let n2 = E.get(e2);
        if ("function" != typeof n2) throw Error((function(e3, t3, r3) {
          let n3;
          switch (t3) {
            case 0:
              n3 = `as a runtime entry of chunk ${r3}`;
              break;
            case 1:
              n3 = `because it was required from module ${r3}`;
              break;
            case 2:
              n3 = "because of an HMR update";
              break;
            default:
              v(t3, (e4) => `Unknown source type: ${e4}`);
          }
          return `Module ${e3} was instantiated ${n3}, but the module factory is not available.`;
        })(e2, t2, r2));
        let o2 = c(e2), i2 = o2.exports;
        L.set(e2, o2);
        let l2 = new u(o2, i2);
        try {
          n2(l2, o2, i2);
        } catch (e3) {
          throw o2.error = e3, e3;
        }
        return o2.namespaceObject && o2.exports !== o2.namespaceObject && g(o2.exports, o2.namespaceObject), o2;
      }
      function F(t2) {
        let r2;
        if (!Array.isArray(t2)) return e.registerChunk(void 0, t2);
        let n2 = (function(e2) {
          if ("string" == typeof e2) return e2;
          if (e2) return { src: e2.getAttribute("src") };
          if ("u" > typeof TURBOPACK_NEXT_CHUNK_URLS) return { src: TURBOPACK_NEXT_CHUNK_URLS.pop() };
          throw Error("chunk path empty but not in a worker");
        })(t2[0]);
        return 2 === t2.length ? r2 = t2[1] : (r2 = void 0, !(function(e2, t3) {
          let r3 = 1;
          for (; r3 < e2.length; ) {
            let n3, o2 = r3 + 1;
            for (; o2 < e2.length && "function" != typeof e2[o2]; ) o2++;
            if (o2 === e2.length) throw Error("malformed chunk format, expected a factory function");
            let u2 = e2[o2];
            for (let u3 = r3; u3 < o2; u3++) {
              let r4 = e2[u3], o3 = t3.get(r4);
              if (o3) {
                n3 = o3;
                break;
              }
            }
            let i2 = n3 ?? u2, l2 = false;
            for (let n4 = r3; n4 < o2; n4++) {
              let r4 = e2[n4];
              t3.has(r4) || (l2 || (i2 === u2 && Object.defineProperty(u2, "name", { value: "module evaluation" }), l2 = true), t3.set(r4, i2));
            }
            r3 = o2 + 1;
          }
        })(t2, E)), e.registerChunk(n2, r2);
      }
      function W(e2, t2, r2 = false) {
        let n2;
        try {
          n2 = t2();
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return !r2 || n2.__esModule ? n2 : g(n2, w(n2), true);
      }
      i.y = async function(e2) {
        let t2;
        try {
          t2 = await import(e2);
        } catch (t3) {
          throw Error(`Failed to load external module ${e2}: ${t3}`);
        }
        return t2 && t2.__esModule && t2.default && "default" in t2.default ? g(t2.default, w(t2), true) : t2;
      }, W.resolve = (e2, t2) => __require.resolve(e2, t2), i.x = W, e = { registerChunk(e2, t2) {
        if (null == e2) throw Error("inline entry registration is not supported");
        let r2 = (function(e3) {
          if ("string" == typeof e3) return e3;
          let t3 = decodeURIComponent(e3.src.replace(/[?#].*$/, ""));
          return t3.startsWith($) ? t3.slice($.length) : t3;
        })(e2);
        X.add(r2), (function(e3) {
          let t3 = J.get(e3);
          if (null != t3) {
            for (let r3 of t3) r3.requiredChunks.delete(e3), 0 === r3.requiredChunks.size && Z(r3.runtimeModuleIds, r3.chunkPath);
            J.delete(e3);
          }
        })(r2), null != t2 && (0 === t2.otherChunks.length ? Z(t2.runtimeModuleIds, r2) : (function(e3, t3, r3) {
          let n2 = /* @__PURE__ */ new Set(), o2 = { runtimeModuleIds: r3, chunkPath: e3, requiredChunks: n2 };
          for (let e4 of t3) {
            let t4 = k(e4);
            if (X.has(t4)) continue;
            n2.add(t4);
            let r4 = J.get(t4);
            null == r4 && (r4 = /* @__PURE__ */ new Set(), J.set(t4, r4)), r4.add(o2);
          }
          0 === o2.requiredChunks.size && Z(o2.runtimeModuleIds, o2.chunkPath);
        })(r2, t2.otherChunks.filter((e3) => (function(e4) {
          let t3, r3 = e4.indexOf("?");
          if (-1 !== r3) t3 = r3;
          else {
            let r4 = e4.indexOf("#");
            t3 = -1 !== r4 ? r4 : e4.length;
          }
          return t3 >= 3 && e4.startsWith(".js", t3 - 3);
        })(k(e3))), t2.runtimeModuleIds));
      }, loadChunkCached(e2, t2) {
        throw Error("chunk loading is not supported");
      } };
      let X = /* @__PURE__ */ new Set(), J = /* @__PURE__ */ new Map();
      function Z(e2, t2) {
        for (let r2 of e2) !(function(e3, t3) {
          let r3 = L.get(t3);
          if (r3) {
            if (r3.error) throw r3.error;
            return;
          }
          z(t3, n.Runtime, e3);
        })(t2, r2);
      }
      globalThis.TURBOPACK = { push: F }, r.forEach(F);
    })();
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
import __onw_wasm_b1b6a44cda0ef428469235d0d537a6bf__ from "./wasm/wasm_b1b6a44cda0ef428469235d0d537a6bf.wasm";
async function edgeFunctionHandler(request) {
  const path3 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(path3);
  } catch {
  }
  const correspondingRoute = routes.find((route) => route.regex.some((r) => {
    const regex = new RegExp(r);
    return regex.test(path3) || decodedPath !== void 0 && regex.test(decodedPath);
  }));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/auth\\/magic-link\\/create(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$"] }];
    globalThis.wasm_b1b6a44cda0ef428469235d0d537a6bf = __onw_wasm_b1b6a44cda0ef428469235d0d537a6bf__;
    require_root_of_the_server_11zk02vj3xkf2();
    require_root_of_the_server_20wuf2xt1epdd();
    require_igt_next_dist_esm_build_templates_edge_wrapper_16fitzwc6vw_y();
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var OPEN_NEXT_CACHE_HEADER = "x-opennext-cache";
var CACHE_TAGS_HEADER = "x-next-cache-tags";
var ISR_HEADER = "x-isr";
var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/requestCache.js
var RequestCache = class {
  _caches = /* @__PURE__ */ new Map();
  /**
   * Returns the Map registered under `key`.
   * If no Map exists yet for that key, a new empty Map is created, stored, and returned.
   * Repeated calls with the same key always return the **same** Map instance.
   */
  getOrCreate(key) {
    let cache = this._caches.get(key);
    if (!cache) {
      cache = /* @__PURE__ */ new Map();
      this._caches.set(key, cache);
    }
    return cache;
  }
};

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/promise.js
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  /**
   * Create a deferred promise tracked by this runner.
   *
   * @returns The tracked promise and its resolve/reject functions.
   */
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.add(detachedPromise.promise);
    return detachedPromise;
  }
  /**
   * Track background work and handle failures immediately.
   *
   * @param promise Work to await, including work registered during an active drain.
   * @returns Nothing; failures are logged rather than propagated.
   */
  add(promise) {
    this.promises.push(promise.then(() => {
    }, error));
  }
  /**
   * Drain tracked work, including additions made while earlier work is pending.
   *
   * Work started after the drain has settled still needs a new runtime waitUntil.
   * @returns Resolves when all work registered during this drain has settled.
   */
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    let awaited = 0;
    while (awaited < this.promises.length) {
      const batch = this.promises.slice(awaited);
      awaited = this.promises.length;
      await Promise.all(batch);
    }
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = /* @__PURE__ */ Symbol.for("@vercel/request-context");
  const nextAfterContext = {
    get: () => {
      const store = globalThis.__openNextAls.getStore();
      return {
        waitUntil: store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise))
      };
    }
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil, requestId = Math.random().toString(36) }, fn) {
  return globalThis.__openNextAls.run({
    requestId,
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil,
    writtenTags: /* @__PURE__ */ new Set(),
    requestCache: new RequestCache()
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const handlerConfig = config[handler3.type];
  const override = handlerConfig && "override" in handlerConfig ? handlerConfig.override : void 0;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto2 from "node:crypto";
import { parse as parseQs, stringify as stringifyQs } from "node:querystring";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "images.unsplash.com" }, { "protocol": "https", "hostname": "assunnah.foundation" }, { "protocol": "https", "hostname": "*.assunnah.foundation" }, { "protocol": "https", "hostname": "*.r2.cloudflarestorage.com" }, { "protocol": "https", "hostname": "pub-*.r2.dev" }, { "protocol": "https", "hostname": "*.cloudflare.com" }], "qualities": [75], "unoptimized": true, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/didar-lahiry/Antigravity/Event management", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "deprecated": {}, "experimental": { "agentUpgrade": "security", "agentFeedback": false, "coldCacheBadge": false, "collapseAdapterRoutes": true, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "parallelRouteMetadata": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "reactBrowserBailout": true, "useOffline": false, "varyParams": true, "optimisticRouting": true, "concurrentRouterQueue": false, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptMozjpeg": true, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "useCacheStaticRootParamTracking": false, "globalNotFound": false, "explicitParallelRouteChildren": true, "strictRouteMatching": true, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "disableResumeDataCacheCompression": false, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "exposeRuntimeErrorsToHMR": false, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackStaleOutputMaxAge": 6048e5, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackSharedRuntime": true, "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "rules": { "*.css": { "loaders": ["@tailwindcss/turbopack"], "as": "*.css" } }, "root": "/home/didar-lahiry/Antigravity/Event management" }, "repoRoot": "/home/didar-lahiry/Antigravity/Event management", "distDirRoot": ".next" };
var BuildId = "VdwBIu5GB2q7VAlfr8-xy";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/applications", "regex": "^/admin/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/applications(?:/)?$" }, { "page": "/admin/automation", "regex": "^/admin/automation(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/automation(?:/)?$" }, { "page": "/admin/checkin", "regex": "^/admin/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/checkin(?:/)?$" }, { "page": "/admin/launch", "regex": "^/admin/launch(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/launch(?:/)?$" }, { "page": "/admin/login", "regex": "^/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/login(?:/)?$" }, { "page": "/admin/monitoring", "regex": "^/admin/monitoring(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/monitoring(?:/)?$" }, { "page": "/admin/relief", "regex": "^/admin/relief(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/relief(?:/)?$" }, { "page": "/admin/submissions", "regex": "^/admin/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/submissions(?:/)?$" }, { "page": "/admin/whatsapp", "regex": "^/admin/whatsapp(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/whatsapp(?:/)?$" }, { "page": "/api/admin/applications", "regex": "^/api/admin/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/applications(?:/)?$" }, { "page": "/api/admin/applications/bulk", "regex": "^/api/admin/applications/bulk(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/applications/bulk(?:/)?$" }, { "page": "/api/admin/auth/login", "regex": "^/api/admin/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/login(?:/)?$" }, { "page": "/api/admin/auth/logout", "regex": "^/api/admin/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/logout(?:/)?$" }, { "page": "/api/admin/auth/me", "regex": "^/api/admin/auth/me(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/me(?:/)?$" }, { "page": "/api/admin/automation", "regex": "^/api/admin/automation(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation(?:/)?$" }, { "page": "/api/admin/automation/call", "regex": "^/api/admin/automation/call(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/call(?:/)?$" }, { "page": "/api/admin/automation/settings", "regex": "^/api/admin/automation/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/settings(?:/)?$" }, { "page": "/api/admin/automation/trigger", "regex": "^/api/admin/automation/trigger(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/trigger(?:/)?$" }, { "page": "/api/admin/relief", "regex": "^/api/admin/relief(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief(?:/)?$" }, { "page": "/api/admin/relief/broadcast", "regex": "^/api/admin/relief/broadcast(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief/broadcast(?:/)?$" }, { "page": "/api/admin/relief/respond", "regex": "^/api/admin/relief/respond(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief/respond(?:/)?$" }, { "page": "/api/admin/reports/summary", "regex": "^/api/admin/reports/summary(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/reports/summary(?:/)?$" }, { "page": "/api/admin/settings/whatsapp", "regex": "^/api/admin/settings/whatsapp(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/settings/whatsapp(?:/)?$" }, { "page": "/api/admin/submissions", "regex": "^/api/admin/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/submissions(?:/)?$" }, { "page": "/api/admin/trainees", "regex": "^/api/admin/trainees(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/trainees(?:/)?$" }, { "page": "/api/applications", "regex": "^/api/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/applications(?:/)?$" }, { "page": "/api/applications/prefill", "regex": "^/api/applications/prefill(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/applications/prefill(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/magic-link/create", "regex": "^/api/auth/magic\\-link/create(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/magic\\-link/create(?:/)?$" }, { "page": "/api/auth/otp/send", "regex": "^/api/auth/otp/send(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/otp/send(?:/)?$" }, { "page": "/api/auth/otp/verify", "regex": "^/api/auth/otp/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/otp/verify(?:/)?$" }, { "page": "/api/auth/session", "regex": "^/api/auth/session(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/session(?:/)?$" }, { "page": "/api/certificates/verify", "regex": "^/api/certificates/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/certificates/verify(?:/)?$" }, { "page": "/api/checkin", "regex": "^/api/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/checkin(?:/)?$" }, { "page": "/api/contact", "regex": "^/api/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/contact(?:/)?$" }, { "page": "/api/health", "regex": "^/api/health(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/health(?:/)?$" }, { "page": "/api/newsletter", "regex": "^/api/newsletter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/newsletter(?:/)?$" }, { "page": "/api/portal/certificates", "regex": "^/api/portal/certificates(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/certificates(?:/)?$" }, { "page": "/api/portal/classes/attend", "regex": "^/api/portal/classes/attend(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/classes/attend(?:/)?$" }, { "page": "/api/portal/profile", "regex": "^/api/portal/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/profile(?:/)?$" }, { "page": "/api/portal/submissions", "regex": "^/api/portal/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/submissions(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/checkin", "regex": "^/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/checkin(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/events", "regex": "^/events(?:/)?$", "routeKeys": {}, "namedRegex": "^/events(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/gallery", "regex": "^/gallery(?:/)?$", "routeKeys": {}, "namedRegex": "^/gallery(?:/)?$" }, { "page": "/manifest.webmanifest", "regex": "^/manifest\\.webmanifest(?:/)?$", "routeKeys": {}, "namedRegex": "^/manifest\\.webmanifest(?:/)?$" }, { "page": "/notices", "regex": "^/notices(?:/)?$", "routeKeys": {}, "namedRegex": "^/notices(?:/)?$" }, { "page": "/portal", "regex": "^/portal(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal(?:/)?$" }, { "page": "/portal/certificates", "regex": "^/portal/certificates(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/certificates(?:/)?$" }, { "page": "/portal/login", "regex": "^/portal/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/login(?:/)?$" }, { "page": "/portal/submissions", "regex": "^/portal/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/submissions(?:/)?$" }, { "page": "/portal/submissions/new", "regex": "^/portal/submissions/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/submissions/new(?:/)?$" }, { "page": "/verify-certificate", "regex": "^/verify\\-certificate(?:/)?$", "routeKeys": {}, "namedRegex": "^/verify\\-certificate(?:/)?$" }], "dynamic": [{ "page": "/api/admin/applications/[id]/status", "regex": "^/api/admin/applications/([^/]+?)/status(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/applications/(?<nxtPid>[^/]+?)/status(?:/)?$" }, { "page": "/api/admin/submissions/[id]/status", "regex": "^/api/admin/submissions/([^/]+?)/status(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/submissions/(?<nxtPid>[^/]+?)/status(?:/)?$" }, { "page": "/api/admin/trainees/[id]/call-log", "regex": "^/api/admin/trainees/([^/]+?)/call\\-log(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/trainees/(?<nxtPid>[^/]+?)/call\\-log(?:/)?$" }, { "page": "/api/admin/trainees/[id]/rating", "regex": "^/api/admin/trainees/([^/]+?)/rating(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/trainees/(?<nxtPid>[^/]+?)/rating(?:/)?$" }, { "page": "/events/[slug]", "regex": "^/events/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/events/[slug]/apply", "regex": "^/events/([^/]+?)/apply(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)/apply(?:/)?$" }, { "page": "/events/[slug]/apply/success", "regex": "^/events/([^/]+?)/apply/success(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)/apply/success(?:/)?$" }, { "page": "/m/[code]", "regex": "^/m/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcode": "nxtPcode" }, "namedRegex": "^/m/(?<nxtPcode>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [{ "source": "/:path*", "headers": [{ "key": "X-Content-Type-Options", "value": "nosniff" }, { "key": "X-Frame-Options", "value": "SAMEORIGIN" }, { "key": "X-XSS-Protection", "value": "1; mode=block" }, { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }, { "key": "Permissions-Policy", "value": "camera=*, microphone=(), geolocation=()" }], "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))?(?:/)?$" }];
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 9351, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/manifest.webmanifest": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/manifest+json", "x-next-cache-tags": "_N_T_/layout,_N_T_/manifest.webmanifest/layout,_N_T_/manifest.webmanifest/route,_N_T_/manifest.webmanifest" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/manifest.webmanifest", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "525bd15bca8a843ea0c47495a265bdc7", "previewModeSigningKey": "6db05b887a1739797854c2e5cf9d3cdd5fc76f600f59002886ac76fae0703a09", "previewModeEncryptionKey": "d49ab6b3a99cd2f12aa1cbe7a918dca62c4cc8997d39eb315ab64deea9fd6867" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__11zk02vj3xkf2._.js", "server/edge/chunks/[root-of-the-server]__20wuf2xt1epdd._.js", "server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/admin" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/auth\\/magic-link\\/create(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/auth/magic-link/create" }], "wasm": [{ "name": "wasm_b1b6a44cda0ef428469235d0d537a6bf", "filePath": "server/edge/chunks/1oji__prisma_client_query_engine_bg_0athij3ijk6je.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "VdwBIu5GB2q7VAlfr8-xy", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "QSt3rmbjHSxhpwUA0k8wxZhErX5ETHE7RRFSsJf6aA0=", "__NEXT_PREVIEW_MODE_ID": "525bd15bca8a843ea0c47495a265bdc7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "d49ab6b3a99cd2f12aa1cbe7a918dca62c4cc8997d39eb315ab64deea9fd6867", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "6db05b887a1739797854c2e5cf9d3cdd5fc76f600f59002886ac76fae0703a09" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathsManifest = { "/_global-error/page": "app/_global-error/page.js", "/_not-found/page": "app/_not-found/page.js", "/about/page": "app/about/page.js", "/admin/applications/page": "app/admin/applications/page.js", "/admin/automation/page": "app/admin/automation/page.js", "/admin/checkin/page": "app/admin/checkin/page.js", "/admin/launch/page": "app/admin/launch/page.js", "/admin/login/page": "app/admin/login/page.js", "/admin/monitoring/page": "app/admin/monitoring/page.js", "/admin/page": "app/admin/page.js", "/admin/relief/page": "app/admin/relief/page.js", "/admin/submissions/page": "app/admin/submissions/page.js", "/admin/whatsapp/page": "app/admin/whatsapp/page.js", "/api/admin/applications/[id]/status/route": "app/api/admin/applications/[id]/status/route.js", "/api/admin/applications/bulk/route": "app/api/admin/applications/bulk/route.js", "/api/admin/applications/route": "app/api/admin/applications/route.js", "/api/admin/auth/login/route": "app/api/admin/auth/login/route.js", "/api/admin/auth/logout/route": "app/api/admin/auth/logout/route.js", "/api/admin/auth/me/route": "app/api/admin/auth/me/route.js", "/api/admin/automation/call/route": "app/api/admin/automation/call/route.js", "/api/admin/automation/route": "app/api/admin/automation/route.js", "/api/admin/automation/settings/route": "app/api/admin/automation/settings/route.js", "/api/admin/automation/trigger/route": "app/api/admin/automation/trigger/route.js", "/api/admin/relief/broadcast/route": "app/api/admin/relief/broadcast/route.js", "/api/admin/relief/respond/route": "app/api/admin/relief/respond/route.js", "/api/admin/relief/route": "app/api/admin/relief/route.js", "/api/admin/reports/summary/route": "app/api/admin/reports/summary/route.js", "/api/admin/settings/whatsapp/route": "app/api/admin/settings/whatsapp/route.js", "/api/admin/submissions/[id]/status/route": "app/api/admin/submissions/[id]/status/route.js", "/api/admin/submissions/route": "app/api/admin/submissions/route.js", "/api/admin/trainees/[id]/call-log/route": "app/api/admin/trainees/[id]/call-log/route.js", "/api/admin/trainees/[id]/rating/route": "app/api/admin/trainees/[id]/rating/route.js", "/api/admin/trainees/route": "app/api/admin/trainees/route.js", "/api/applications/prefill/route": "app/api/applications/prefill/route.js", "/api/applications/route": "app/api/applications/route.js", "/api/auth/logout/route": "app/api/auth/logout/route.js", "/api/auth/magic-link/create/route": "app/api/auth/magic-link/create/route.js", "/api/auth/otp/send/route": "app/api/auth/otp/send/route.js", "/api/auth/otp/verify/route": "app/api/auth/otp/verify/route.js", "/api/auth/session/route": "app/api/auth/session/route.js", "/api/certificates/verify/route": "app/api/certificates/verify/route.js", "/api/checkin/route": "app/api/checkin/route.js", "/api/contact/route": "app/api/contact/route.js", "/api/health/route": "app/api/health/route.js", "/api/newsletter/route": "app/api/newsletter/route.js", "/api/portal/certificates/route": "app/api/portal/certificates/route.js", "/api/portal/classes/attend/route": "app/api/portal/classes/attend/route.js", "/api/portal/profile/route": "app/api/portal/profile/route.js", "/api/portal/submissions/route": "app/api/portal/submissions/route.js", "/blog/page": "app/blog/page.js", "/checkin/page": "app/checkin/page.js", "/contact/page": "app/contact/page.js", "/events/[slug]/apply/page": "app/events/[slug]/apply/page.js", "/events/[slug]/apply/success/page": "app/events/[slug]/apply/success/page.js", "/events/[slug]/page": "app/events/[slug]/page.js", "/events/page": "app/events/page.js", "/favicon.ico/route": "app/favicon.ico/route.js", "/gallery/page": "app/gallery/page.js", "/m/[code]/route": "app/m/[code]/route.js", "/manifest.webmanifest/route": "app/manifest.webmanifest/route.js", "/notices/page": "app/notices/page.js", "/page": "app/page.js", "/portal/certificates/page": "app/portal/certificates/page.js", "/portal/login/page": "app/portal/login/page.js", "/portal/page": "app/portal/page.js", "/portal/submissions/new/page": "app/portal/submissions/new/page.js", "/portal/submissions/page": "app/portal/submissions/page.js", "/verify-certificate/page": "app/verify-certificate/page.js" };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/applications/page": "/admin/applications", "/admin/automation/page": "/admin/automation", "/admin/checkin/page": "/admin/checkin", "/admin/launch/page": "/admin/launch", "/admin/login/page": "/admin/login", "/admin/monitoring/page": "/admin/monitoring", "/admin/page": "/admin", "/admin/relief/page": "/admin/relief", "/admin/submissions/page": "/admin/submissions", "/admin/whatsapp/page": "/admin/whatsapp", "/api/admin/applications/[id]/status/route": "/api/admin/applications/[id]/status", "/api/admin/applications/bulk/route": "/api/admin/applications/bulk", "/api/admin/applications/route": "/api/admin/applications", "/api/admin/auth/login/route": "/api/admin/auth/login", "/api/admin/auth/logout/route": "/api/admin/auth/logout", "/api/admin/auth/me/route": "/api/admin/auth/me", "/api/admin/automation/call/route": "/api/admin/automation/call", "/api/admin/automation/route": "/api/admin/automation", "/api/admin/automation/settings/route": "/api/admin/automation/settings", "/api/admin/automation/trigger/route": "/api/admin/automation/trigger", "/api/admin/relief/broadcast/route": "/api/admin/relief/broadcast", "/api/admin/relief/respond/route": "/api/admin/relief/respond", "/api/admin/relief/route": "/api/admin/relief", "/api/admin/reports/summary/route": "/api/admin/reports/summary", "/api/admin/settings/whatsapp/route": "/api/admin/settings/whatsapp", "/api/admin/submissions/[id]/status/route": "/api/admin/submissions/[id]/status", "/api/admin/submissions/route": "/api/admin/submissions", "/api/admin/trainees/[id]/call-log/route": "/api/admin/trainees/[id]/call-log", "/api/admin/trainees/[id]/rating/route": "/api/admin/trainees/[id]/rating", "/api/admin/trainees/route": "/api/admin/trainees", "/api/applications/prefill/route": "/api/applications/prefill", "/api/applications/route": "/api/applications", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/magic-link/create/route": "/api/auth/magic-link/create", "/api/auth/otp/send/route": "/api/auth/otp/send", "/api/auth/otp/verify/route": "/api/auth/otp/verify", "/api/auth/session/route": "/api/auth/session", "/api/certificates/verify/route": "/api/certificates/verify", "/api/checkin/route": "/api/checkin", "/api/contact/route": "/api/contact", "/api/health/route": "/api/health", "/api/newsletter/route": "/api/newsletter", "/api/portal/certificates/route": "/api/portal/certificates", "/api/portal/classes/attend/route": "/api/portal/classes/attend", "/api/portal/profile/route": "/api/portal/profile", "/api/portal/submissions/route": "/api/portal/submissions", "/blog/page": "/blog", "/checkin/page": "/checkin", "/contact/page": "/contact", "/events/[slug]/apply/page": "/events/[slug]/apply", "/events/[slug]/apply/success/page": "/events/[slug]/apply/success", "/events/[slug]/page": "/events/[slug]", "/events/page": "/events", "/favicon.ico/route": "/favicon.ico", "/gallery/page": "/gallery", "/m/[code]/route": "/m/[code]", "/manifest.webmanifest/route": "/manifest.webmanifest", "/notices/page": "/notices", "/page": "/", "/portal/certificates/page": "/portal/certificates", "/portal/login/page": "/portal/login", "/portal/page": "/portal", "/portal/submissions/new/page": "/portal/submissions/new", "/portal/submissions/page": "/portal/submissions", "/verify-certificate/page": "/verify-certificate" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = "VdwBIu5GB2q7VAlfr8-xy";
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";
init_util();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();
import { ReadableStream as ReadableStream3 } from "node:stream/web";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/binary.js
var commonBinaryMimeTypes = /* @__PURE__ */ new Set([
  "application/octet-stream",
  // Docs
  "application/epub+zip",
  "application/msword",
  "application/pdf",
  "application/rtf",
  "application/vnd.amazon.ebook",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // Fonts
  "font/otf",
  "font/woff",
  "font/woff2",
  // Images
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/vnd.microsoft.icon",
  "image/webp",
  // Audio
  "audio/3gpp",
  "audio/aac",
  "audio/basic",
  "audio/flac",
  "audio/mpeg",
  "audio/ogg",
  "audio/wavaudio/webm",
  "audio/x-aiff",
  "audio/x-midi",
  "audio/x-wav",
  // Video
  "video/3gpp",
  "video/mp2t",
  "video/mpeg",
  "video/ogg",
  "video/quicktime",
  "video/webm",
  "video/x-msvideo",
  // Archives
  "application/java-archive",
  "application/vnd.apple.installer+xml",
  "application/x-7z-compressed",
  "application/x-apple-diskimage",
  "application/x-bzip",
  "application/x-bzip2",
  "application/x-gzip",
  "application/x-java-archive",
  "application/x-rar-compressed",
  "application/x-tar",
  "application/x-zip",
  "application/zip",
  // Serialized data
  "application/x-protobuf"
]);
function isBinaryContentType(contentType) {
  if (!contentType)
    return false;
  const value = contentType.split(";")[0];
  return commonBinaryMimeTypes.has(value);
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_stream();
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path3) {
  return NextConfig.i18n?.locales.includes(path3.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectDomainLocale({ hostname, detectedLocale }) {
  const i18n = NextConfig.i18n;
  const domains = i18n?.domains;
  if (!domains) {
    return;
  }
  const lowercasedLocale = detectedLocale?.toLowerCase();
  for (const domain of domains) {
    const domainHostname = domain.domain.split(":", 1)[0].toLowerCase();
    if (hostname === domainHostname || lowercasedLocale === domain.defaultLocale.toLowerCase() || domain.locales?.some((locale) => lowercasedLocale === locale.toLowerCase())) {
      return domain;
    }
  }
}
function detectLocale(internalEvent, i18n) {
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  if (i18n.localeDetection === false) {
    return domainLocale?.defaultLocale ?? i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale,
    domainLocale
  });
  return domainLocale?.defaultLocale ?? cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}
function handleLocaleRedirect(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n || i18n.localeDetection === false || internalEvent.rawPath !== "/") {
    return false;
  }
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  const detectedLocale = detectLocale(internalEvent, i18n);
  const domainLocale = detectDomainLocale({
    hostname: internalEvent.headers.host
  });
  const preferredDomain = detectDomainLocale({
    detectedLocale: preferredLocale
  });
  if (domainLocale && preferredDomain) {
    const isPDomain = preferredDomain.domain === domainLocale.domain;
    const isPLocale = preferredDomain.defaultLocale === preferredLocale;
    if (!isPDomain || !isPLocale) {
      const scheme = `http${preferredDomain.http ? "" : "s"}`;
      const rlocale = isPLocale ? "" : preferredLocale;
      return {
        type: "core",
        statusCode: 307,
        headers: {
          Location: `${scheme}://${preferredDomain.domain}/${rlocale}`
        },
        body: emptyReadableStream(),
        isBase64Encoded: false
      };
    }
  }
  const defaultLocale = domainLocale?.defaultLocale ?? i18n.defaultLocale;
  if (detectedLocale.toLowerCase() !== defaultLocale.toLowerCase()) {
    const nextUrl = constructNextUrl(internalEvent.url, `/${detectedLocale}${NextConfig.trailingSlash ? "/" : ""}`);
    const queryString = convertToQueryString(internalEvent.query);
    return {
      type: "core",
      statusCode: 307,
      headers: {
        Location: `${nextUrl}${queryString}`
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateShardId(rawPath, maxConcurrency, prefix) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `${prefix}-${randomInt}`;
}
function generateMessageGroupId(rawPath) {
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  return generateShardId(rawPath, maxConcurrency, "revalidate");
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (!pattern.test(url))
    return false;
  if (host) {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.host !== host;
    } catch {
      return !url.includes(host);
    }
  }
  return true;
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  return getQueryFromIterator(new URLSearchParams(query).entries());
}
function getUrlParts(url, isExternal2) {
  const hashIndex = url.indexOf("#");
  const hash = hashIndex === -1 ? "" : url.slice(hashIndex);
  const urlWithoutHash = hashIndex === -1 ? url : url.slice(0, hashIndex);
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = urlWithoutHash.match(regex2);
    return {
      hostname: "",
      pathname: urlWithoutHash.startsWith("/") ? `/${match3?.[1] ?? ""}` : "",
      protocol: "",
      queryString: match3?.[2] ?? "",
      hash
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s?]+)(\/[^?]*)?(\?.*)?/;
  const match2 = urlWithoutHash.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? "",
    hash
  };
}
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const searchParams = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => searchParams.append(key, entry));
    } else {
      searchParams.append(key, value);
    }
  });
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str, { isPath } = {}) {
  const result = str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
  return isPath ? result : result.replaceAll("+", "_\xB54_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)").replaceAll("_\xB54_", "+");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  return new ReadableStream3({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
}
function normalizeLocationHeader(location, baseUrl, encodeQuery = false) {
  if (!URL.canParse(location)) {
    return location;
  }
  const locationURL = new URL(location);
  const origin = new URL(baseUrl).origin;
  let search = locationURL.search;
  if (encodeQuery && search) {
    search = `?${stringifyQs(parseQs(search.slice(1)))}`;
  }
  const href = `${locationURL.origin}${locationURL.pathname}${search}${locationURL.hash}`;
  if (locationURL.origin === origin) {
    return href.slice(origin.length);
  }
  return href;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash as createHash3 } from "node:crypto";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/normalize-path.js
import path2 from "node:path";
function normalizeRepeatedSlashes(url) {
  const urlNoQuery = url.host + url.pathname;
  return `${url.protocol}//${urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/")}${url.search}`;
}
function escapePathDelimiters(segment, escapeEncoded) {
  return segment.replace(new RegExp(`([/#?]${escapeEncoded ? "|%(2f|23|3f|5c)" : ""})`, "gi"), (char) => encodeURIComponent(char));
}
function decodePathParams(pathname) {
  return pathname.split("/").map((segment) => escapePathDelimiters(decodeURIComponent(segment), true)).join("/");
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_stream();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();
import { Buffer as Buffer3 } from "node:buffer";
import { createHash } from "node:crypto";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/semver.js
function compareSemver(v1, operator, v2) {
  let versionDiff = 0;
  if (v1 === "latest") {
    versionDiff = 1;
  } else {
    if (/^[^\d]/.test(v1)) {
      v1 = v1.substring(1);
    }
    if (/^[^\d]/.test(v2)) {
      v2 = v2.substring(1);
    }
    const [major1, minor1 = 0, patch1 = 0] = v1.split(".").map(Number);
    const [major2, minor2 = 0, patch2 = 0] = v2.split(".").map(Number);
    if (Number.isNaN(major1) || Number.isNaN(major2)) {
      throw new Error("The major version is required.");
    }
    if (major1 !== major2) {
      versionDiff = major1 - major2;
    } else if (minor1 !== minor2) {
      versionDiff = minor1 - minor2;
    } else if (patch1 !== patch2) {
      versionDiff = patch1 - patch2;
    }
  }
  switch (operator) {
    case "=":
      return versionDiff === 0;
    case ">=":
      return versionDiff >= 0;
    case "<=":
      return versionDiff <= 0;
    case ">":
      return versionDiff > 0;
    case "<":
      return versionDiff < 0;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/cache.js
async function isStale(key, tags, lastModified) {
  if (!compareSemver(globalThis.nextVersion, ">=", "16.0.0")) {
    return false;
  }
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.isStale?.(tags, lastModified) ?? false;
  }
  return await globalThis.tagCache.isStale?.(key, lastModified) ?? false;
}
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return tags.length === 0 ? false : await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
async function reportTagCacheResult(entry, result) {
  try {
    await entry.onTagCacheResult?.(result);
  } catch (e) {
    error("Failed to report the tag cache result", e);
  }
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    const cacheTags = value.meta?.headers?.[CACHE_TAGS_HEADER]?.split(",") ?? [];
    return cacheTags;
  } catch (e) {
    return [];
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/routeCacheKey.js
import { createHash as createHash2 } from "node:crypto";
var ROUTE_CACHE_DIRECTORY = "route-cache";
var DYNAMIC_ROUTE_REGEX = /\/\[[^/]+?\](?=\/|$)/;
function useRouteCacheKeys(nextVersion) {
  return compareSemver(nextVersion, ">=", "15.5.27") && compareSemver(nextVersion, "<", "16.0.0") || compareSemver(nextVersion, ">=", "16.3.8");
}
function normalizePagePath(page) {
  if (/^\/index(\/|$)/.test(page) && !DYNAMIC_ROUTE_REGEX.test(page)) {
    return `/index${page}`;
  }
  if (page === "/") {
    return "/index";
  }
  return page.startsWith("/") ? page : `/${page}`;
}
function normalizeAppPath(entry) {
  const pathname = entry.split("/").reduce((acc, segment, index, segments) => {
    if (!segment)
      return acc;
    if (segment.startsWith("(") && segment.endsWith(")"))
      return acc;
    if (segment.startsWith("@"))
      return acc;
    if ((segment === "page" || segment === "route") && index === segments.length - 1) {
      return acc;
    }
    return `${acc}/${segment}`;
  }, "");
  return pathname === "" ? "/" : pathname;
}
function compareAppPaths(a, b) {
  const aHasSlot = a.includes("/@");
  const bHasSlot = b.includes("/@");
  if (aHasSlot && !bHasSlot)
    return -1;
  if (!aHasSlot && bHasSlot)
    return 1;
  return a.localeCompare(b);
}
function selectAppPageEntry(route, appPaths) {
  let entry;
  for (const appPath of appPaths) {
    if (normalizeAppPath(appPath).replace(/%5F/g, "_") !== route)
      continue;
    if (entry === void 0 || compareAppPaths(entry, appPath) < 0) {
      entry = appPath;
    }
  }
  return entry;
}
function getRouteCacheOwner(sourceRoute, { appPaths, pagesManifest }) {
  const appEntry = selectAppPageEntry(sourceRoute, appPaths);
  if (appEntry) {
    return {
      kind: appEntry.endsWith("/route") ? "APP_ROUTE" : "APP_PAGE",
      sourceRoute: appEntry
    };
  }
  if (Object.hasOwn(pagesManifest, sourceRoute)) {
    return { kind: "PAGES", sourceRoute };
  }
  return void 0;
}
function normalizeLocalePath(pathname, locales) {
  const segment = pathname.split("/", 2)[1]?.toLowerCase();
  const locale = locales?.find((l) => l.toLowerCase() === segment);
  if (!locale) {
    return pathname;
  }
  return pathname.slice(locale.length + 1) || "/";
}
function getDynamicRouteCachePathname(pathname, locales) {
  if (normalizeLocalePath(pathname, locales) !== "/index") {
    return pathname;
  }
  return pathname.slice(0, -"/index".length) || "/";
}
function getPrerenderRouteCacheKey(pathname, manifests) {
  const { routes, dynamicRoutes } = manifests.prerenderManifest;
  const prerender = Object.hasOwn(routes, pathname) ? routes[pathname] : void 0;
  const fallback = !prerender && Object.hasOwn(dynamicRoutes, pathname) ? dynamicRoutes[pathname] : void 0;
  if (!prerender && !fallback) {
    return void 0;
  }
  const sourceRoute = prerender ? prerender.srcRoute : fallback?.fallbackSourceRoute ?? pathname;
  let owner;
  if (sourceRoute) {
    owner = getRouteCacheOwner(sourceRoute, manifests);
  } else {
    owner = getRouteCacheOwner(pathname, manifests);
    if (!owner && manifests.locales?.length) {
      const pagesOwner = getRouteCacheOwner(normalizeLocalePath(pathname, manifests.locales), manifests);
      owner = pagesOwner?.kind === "PAGES" ? pagesOwner : void 0;
    }
  }
  return owner ? getRouteCacheKey(pathname, owner) : void 0;
}
function getRouteCacheKey(pathname, owner) {
  const source = createHash2("sha256").update(owner.sourceRoute).digest("hex");
  return `/${ROUTE_CACHE_DIRECTORY}/${owner.kind}/${source}/$${normalizePagePath(pathname)}`;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path3) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path3));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher([
  ...RoutesManifest.routes.static,
  ...getStaticAPIRoutes()
]);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);
function getStaticAPIRoutes() {
  const createRouteDefinition = (route) => ({
    page: route,
    regex: `^${route}(?:/)?$`
  });
  const dynamicRoutePages = new Set(RoutesManifest.routes.dynamic.map(({ page }) => page));
  const pagesStaticAPIRoutes = Object.keys(PagesManifest).filter((route) => route.startsWith("/api/") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  const appPathsStaticAPIRoutes = Object.values(AppPathRoutesManifest).filter((route) => (route.startsWith("/api/") || route === "/api") && !dynamicRoutePages.has(route)).map(createRouteDefinition);
  return [...pagesStaticAPIRoutes, ...appPathsStaticAPIRoutes];
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
function computeFinalRevalidate(path3, revalidate) {
  const routes = PrerenderManifest?.routes ?? {};
  const effectiveRevalidate = revalidate === void 0 && Object.hasOwn(routes, path3) ? routes[path3].initialRevalidateSeconds : revalidate;
  return effectiveRevalidate === void 0 || effectiveRevalidate === false ? CACHE_ONE_YEAR : effectiveRevalidate;
}
function getCacheTiming(path3, revalidate, lastModified) {
  const finalRevalidate = computeFinalRevalidate(path3, revalidate);
  const isSSG = finalRevalidate === CACHE_ONE_YEAR;
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const remainingTtl = Math.max(finalRevalidate - age, 1);
  return {
    revalidate,
    isSSG,
    remainingTtl,
    isStaleFromTime: !isSSG && remainingTtl === 1
  };
}
var VARY_HEADER = "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Router-Segment-Prefetch, Next-Url";
var NEXT_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
var NEXT_PRERENDER_HEADER = "x-nextjs-prerender";
var NEXT_POSTPONED_HEADER = "x-nextjs-postponed";
var MIDDLEWARE_SET_COOKIE_HEADER = "x-middleware-set-cookie";
function getCachedResponseHeaders(headers) {
  const result = {};
  for (const [key, value] of Object.entries(headers ?? {})) {
    const lowerKey = key.toLowerCase();
    if (value === void 0 || lowerKey === MIDDLEWARE_SET_COOKIE_HEADER || lowerKey === CACHE_TAGS_HEADER) {
      continue;
    }
    result[key] = value;
  }
  return result;
}
async function computeCacheControl(timing, body, host, lastModified, isStaleFromTag, revalidationPath, revalidationKey) {
  const { revalidate, isSSG, remainingTtl, isStaleFromTime } = timing;
  const hash = (str) => createHash3("md5").update(str).digest("hex");
  const etag = `"${hash(body)}"`;
  if (revalidate === 0) {
    return {
      [CACHE_CONTROL_HEADER]: NO_STORE_CACHE_CONTROL,
      [OPEN_NEXT_CACHE_HEADER]: "ERROR",
      etag
    };
  }
  const isStale2 = isStaleFromTime || isStaleFromTag;
  if (!isSSG || isStaleFromTag) {
    const sMaxAge = isStaleFromTag ? 1 : remainingTtl;
    debug("sMaxAge", {
      remainingTtl,
      lastModified,
      revalidate,
      isStaleFromTag
    });
    if (isStale2) {
      let url = NextConfig.trailingSlash && revalidationPath !== "/" ? `${revalidationPath}/` : revalidationPath;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: {
          host,
          url,
          eTag: etag,
          lastModified: lastModified ?? Date.now()
        },
        // The body differs per request type and per segment, so it must not be part of the id.
        MessageDeduplicationId: hash(`${revalidationKey}-${lastModified}`),
        MessageGroupId: generateMessageGroupId(revalidationKey)
      });
    }
    return {
      [CACHE_CONTROL_HEADER]: `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      [OPEN_NEXT_CACHE_HEADER]: isStale2 ? "STALE" : "HIT",
      etag
    };
  }
  return {
    [CACHE_CONTROL_HEADER]: `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    [OPEN_NEXT_CACHE_HEADER]: "HIT",
    etag
  };
}
function getBodyForAppRouter(event, cachedValue) {
  if (cachedValue.type !== "app") {
    throw new Error("getBodyForAppRouter called with non-app cache value");
  }
  const segmentHeader = event.headers[NEXT_SEGMENT_PREFETCH_HEADER];
  if (typeof segmentHeader === "string" && cachedValue.segmentData) {
    if (Object.hasOwn(cachedValue.segmentData, segmentHeader)) {
      return {
        body: cachedValue.segmentData[segmentHeader],
        additionalHeaders: {
          [NEXT_PRERENDER_HEADER]: "1",
          [NEXT_POSTPONED_HEADER]: "2"
        }
      };
    }
    return void 0;
  }
  if (cachedValue.rsc === void 0) {
    return void 0;
  }
  return { body: cachedValue.rsc, additionalHeaders: {} };
}
async function generateResult(event, timing, cachedValue, lastModified, isStaleFromTag, revalidationPath, revalidationKey) {
  debug("Returning result from experimental cache");
  let body;
  let type = "application/octet-stream";
  let isDataRequest = false;
  let additionalHeaders = {};
  if (cachedValue.type === "app") {
    isDataRequest = event.headers.rsc === "1";
    if (isDataRequest) {
      const appRouterResult = getBodyForAppRouter(event, cachedValue);
      body = appRouterResult?.body;
      additionalHeaders = appRouterResult?.additionalHeaders ?? {};
    } else {
      body = cachedValue.html;
    }
    type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
  } else if (cachedValue.type === "page") {
    isDataRequest = Boolean(event.query.__nextDataReq);
    body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
    type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
  } else {
    throw new Error("generateResult called with unsupported cache value type, only 'app' and 'page' are supported");
  }
  if (body === void 0) {
    debug("Missing body in the cache entry, falling back to the server");
    return void 0;
  }
  const cacheControl = await computeCacheControl(timing, body, event.headers.host, lastModified, isStaleFromTag, revalidationPath, revalidationKey);
  const statusCode = computeStatusCode(event.rewriteStatusCode, cachedValue.meta?.status);
  const headers = {
    ...cacheControl,
    "content-type": type,
    ...getCachedResponseHeaders(cachedValue.meta?.headers),
    vary: VARY_HEADER,
    ...additionalHeaders
  };
  fixCacheControlForError(headers, statusCode);
  return {
    type: "core",
    statusCode,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers
  };
}
function computeStatusCode(rewriteStatusCode, cachedStatusCode) {
  if (cachedStatusCode !== void 0 && cachedStatusCode !== 200) {
    return cachedStatusCode;
  }
  return rewriteStatusCode ?? cachedStatusCode ?? 200;
}
var routeCacheManifests;
function getRouteCacheManifests() {
  routeCacheManifests ??= {
    prerenderManifest: {
      routes: PrerenderManifest?.routes ?? {},
      dynamicRoutes: PrerenderManifest?.dynamicRoutes ?? {}
    },
    appPaths: Object.keys(AppPathsManifest ?? {}),
    pagesManifest: PagesManifest ?? {},
    locales: NextConfig.i18n?.locales
  };
  return routeCacheManifests;
}
function getCacheKey(event, localizedPath, resolvedRoutes) {
  if (!useRouteCacheKeys(globalThis.nextVersion)) {
    const isISR = Object.keys(PrerenderManifest?.routes ?? {}).includes(localizedPath) || Object.values(PrerenderManifest?.dynamicRoutes ?? {}).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
    if (!isISR)
      return void 0;
    return localizedPath === "/" ? "/index" : localizedPath;
  }
  const manifests = getRouteCacheManifests();
  if (Object.hasOwn(manifests.prerenderManifest.routes, localizedPath)) {
    const manifestKey = getPrerenderRouteCacheKey(localizedPath, manifests);
    const selectedRoute = resolvedRoutes?.[0];
    if (resolvedRoutes && !selectedRoute)
      return void 0;
    if (!selectedRoute)
      return manifestKey;
    const selectedOwner = getRouteCacheOwner(selectedRoute.route, manifests);
    if (!selectedOwner)
      return void 0;
    const selectedKey = getRouteCacheKey(localizedPath, selectedOwner);
    return selectedKey === manifestKey ? manifestKey : void 0;
  }
  const dynamicRoute = resolvedRoutes ? resolvedRoutes[0] : dynamicRouteMatcher(event.rawPath)[0];
  const dynamicPrerender = dynamicRoute ? manifests.prerenderManifest.dynamicRoutes[dynamicRoute.route] : void 0;
  if (!dynamicRoute || !dynamicPrerender || dynamicPrerender.fallback !== null) {
    return void 0;
  }
  const owner = getRouteCacheOwner(dynamicRoute.route, manifests);
  return owner ? getRouteCacheKey(getDynamicRouteCachePathname(localizedPath, manifests.locales), owner) : void 0;
}
async function cacheInterceptor(event, resolvedRoutes) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers[PRERENDER_REVALIDATE_HEADER]))
    return event;
  if (event.method !== "GET" && event.method !== "HEAD")
    return event;
  const cookies = event.headers.cookie || "";
  const hasPreviewData = cookies.includes("__prerender_bypass") || cookies.includes("__next_preview_data");
  if (hasPreviewData) {
    debug("Preview mode detected, passing through to handler");
    return event;
  }
  const basePath = NextConfig.basePath;
  const pathWithoutBasePath = !basePath ? event.rawPath : event.rawPath === basePath ? "/" : event.rawPath.startsWith(`${basePath}/`) ? event.rawPath.slice(basePath.length) : event.rawPath;
  let localizedPath = localizePath({ ...event, rawPath: pathWithoutBasePath });
  localizedPath = localizedPath.replace(/\/$/, "");
  const revalidationPath = localizedPath || "/";
  try {
    localizedPath = decodePathParams(localizedPath) || "/";
  } catch {
    return event;
  }
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const cacheKey = getCacheKey(event, localizedPath, resolvedRoutes);
  debug("cacheKey", cacheKey);
  if (cacheKey) {
    try {
      const cachedData = await globalThis.incrementalCache.get(cacheKey);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      const { lastModified } = cachedData;
      const tags = getTagsFromValue(cachedData.value);
      const isRevalidated = !cachedData.shouldBypassTagCache && (cachedData.value.type === "app" || cachedData.value.type === "route") && await hasBeenRevalidated(cacheKey, tags, cachedData);
      const isStaleFromTag = !isRevalidated && !cachedData.shouldBypassTagCache && await isStale(cacheKey, tags, lastModified ?? Date.now());
      const timing = getCacheTiming(localizedPath, cachedData.value.revalidate, lastModified);
      await reportTagCacheResult(cachedData, {
        hasBeenRevalidated: isRevalidated,
        isStaleFromTag,
        isStaleFromTime: timing.isStaleFromTime
      });
      if (isRevalidated) {
        return event;
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page": {
          const result = await generateResult(event, timing, cachedData.value, lastModified, isStaleFromTag, revalidationPath, cacheKey);
          return result ?? event;
        }
        case "redirect": {
          const cacheControl = await computeCacheControl(timing, "", host, lastModified, isStaleFromTag, revalidationPath, cacheKey);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...getCachedResponseHeaders(cachedData.value.meta?.headers),
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        case "route": {
          const cacheControl = await computeCacheControl(timing, cachedData.value.body, host, lastModified, isStaleFromTag, revalidationPath, cacheKey);
          const isBinary = isBinaryContentType(String(cachedData.value.meta?.headers?.["content-type"]));
          const statusCode = computeStatusCode(event.rewriteStatusCode, cachedData.value.meta?.status);
          const headers = {
            ...cacheControl,
            ...getCachedResponseHeaders(cachedData.value.meta?.headers),
            vary: VARY_HEADER
          };
          fixCacheControlForError(headers, statusCode);
          return {
            type: "core",
            statusCode,
            body: toReadableStream(cachedData.value.body, isBinary),
            headers,
            isBase64Encoded: isBinary
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// ../node_modules/.pnpm/path-to-regexp@6.3.0/node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path3 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path3 += prefix;
        prefix = "";
      }
      if (path3) {
        result.push(path3);
        path3 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path3 += value;
      continue;
    }
    if (path3) {
      result.push(path3);
      path3 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path3 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path3 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path3 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path3 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path3;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path3 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path3, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path3, keys) {
  if (!keys)
    return path3;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path3.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path3.source);
  }
  return path3;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path3) {
    return pathToRegexp(path3, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path3, keys, options) {
  return tokensToRegexp(parse2(path3, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path3, keys, options) {
  if (path3 instanceof RegExp)
    return regexpToRegexp(path3, keys);
  if (Array.isArray(path3))
    return arrayToRegexp(path3, keys, options);
  return stringToRegexp(path3, keys, options);
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();
var compiledRegExps = /* @__PURE__ */ new Map();
function getCompiledRegExp(pattern, flags2 = "") {
  const key = `/${pattern}/${flags2}`;
  let regExp = compiledRegExps.get(key);
  if (!regExp) {
    regExp = new RegExp(pattern, flags2);
    compiledRegExps.set(key, regExp);
  }
  regExp.lastIndex = 0;
  return regExp;
}
function matchHasValue(value, pattern) {
  if (!value)
    return false;
  if (!pattern)
    return true;
  const candidate = Array.isArray(value) ? value.at(-1) : value;
  return candidate !== void 0 && getCompiledRegExp(`^${pattern}$`).test(candidate);
}
function getHostname(headers) {
  return headers.host?.split(":", 1)[0].toLowerCase();
}
function getSafeParamName(name) {
  return name.replaceAll(/[^a-zA-Z]/g, "");
}
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return matchHasValue(headers[redirect.key.toLowerCase()], redirect.value);
    case "cookie":
      return matchHasValue(cookies[redirect.key], redirect.value);
    case "query":
      return matchHasValue(query[redirect.key], redirect.value);
    case "host":
      return matchHasValue(getHostname(headers), redirect.value);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value) {
    let key;
    let value;
    switch (has.type) {
      case "header":
        key = has.key.toLowerCase();
        value = headers[key];
        break;
      case "cookie":
        key = has.key;
        value = cookies[key];
        break;
      case "query":
        key = has.key;
        value = query[key];
        break;
      case "host":
        return {};
    }
    return value ? { [getSafeParamName(key)]: value } : {};
  }
  const matcher = getCompiledRegExp(`^${has.value}$`);
  const fromSource = (value, implicitKey) => {
    const matches = value.match(matcher);
    if (matches?.groups)
      return matches.groups;
    return implicitKey && matches?.[0] ? { [implicitKey]: matches[0] } : {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return fromSource(Array.isArray(query[has.key]) ? query[has.key].at(-1) ?? "" : query[has.key] ?? "");
    case "host":
      return fromSource(getHostname(headers) ?? "", "host");
  }
};
function compileNonPath(value, params) {
  if (!value.includes(":"))
    return value;
  let compiledValue = value;
  for (const key of Object.keys(params)) {
    if (!compiledValue.includes(`:${key}`))
      continue;
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    compiledValue = compiledValue.replace(getCompiledRegExp(`:${escapedKey}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(getCompiledRegExp(`:${escapedKey}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(getCompiledRegExp(`:${escapedKey}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(getCompiledRegExp(`:${escapedKey}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
  }
  compiledValue = compiledValue.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replaceAll("--ESCAPED_PARAM_PLUS", "+").replaceAll("--ESCAPED_PARAM_COLON", ":").replaceAll("--ESCAPED_PARAM_QUESTION", "?").replaceAll("--ESCAPED_PARAM_ASTERISKS", "*");
  return compile(`/${compiledValue}`, { validate: false })(params).slice(1);
}
function compileQueryString(queryString, params) {
  return queryString.split("&").map((part) => {
    const separator = part.indexOf("=");
    if (separator === -1)
      return part;
    const key = part.slice(0, separator + 1);
    return `${key}${compileNonPath(part.slice(separator + 1), params)}`;
  }).join("&");
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const computeHas = computeParamHas(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path3 = locale === false ? event.rawPath : localizedRawPath;
    if (getCompiledRegExp(regex).test(path3) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path3);
      const params = {
        ..._match ? _match.params : {},
        ...has?.reduce((acc, cur) => {
          return Object.assign(acc, computeHas(cur));
        }, {})
      };
      const hasParams = Object.keys(params).length > 0;
      headers.forEach((h) => {
        try {
          const key = hasParams ? compileNonPath(h.key, params) : h.key;
          const value = hasParams ? compileNonPath(h.value, params) : h.value;
          requestHeaders[key.toLowerCase()] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key.toLowerCase()] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites, appendParamsToQuery = true) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path3 = route.locale === false ? rawPath : localizedRawPath;
    return getCompiledRegExp(route.regex).test(path3) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString, hash } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    debug("urlParts", { pathname, protocol, hostname, queryString, hash });
    const compileOptions = { validate: false };
    const toDestinationPath = compile(escapeRegex(pathname, { isPath: true }), compileOptions);
    const toDestinationHost = compile(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1"), { ...compileOptions, encode: encodeURIComponent });
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source, { isPath: true })))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    const queryParams = Object.fromEntries(Object.entries(params).filter(([key]) => key !== "nextInternalLocale"));
    const destinationParams = [
      ...parse2(escapeRegex(`${pathname}${hash}`, { isPath: true })),
      ...hostname ? parse2(escapeRegex(hostname).replace(/:(\d+)$/, "\\:$1")) : []
    ].flatMap((token) => typeof token === "string" ? [] : [String(token.name)]);
    let rewrittenQuery = queryString;
    let rewrittenHost = hostname;
    let rewrittenHash = hash;
    let rewrittenPath = unescapeRegex(toDestinationPath(params));
    if (pathname.startsWith("/") && !rewrittenPath.startsWith("/")) {
      rewrittenPath = `/${rewrittenPath}`;
    }
    if (isUsingParams) {
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = compileQueryString(queryString, params);
      rewrittenHash = compileNonPath(hash, params);
    }
    if (NextConfig.i18n && !isExternalRewrite) {
      const strippedPathLocale = rewrittenPath.replace(getCompiledRegExp(`^/(${NextConfig.i18n.locales.join("|")})`), "");
      if (strippedPathLocale.startsWith("/api/")) {
        rewrittenPath = strippedPathLocale;
      }
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    const destinationQuery = convertFromQueryString(rewrittenQuery);
    finalQuery = {
      ...query,
      ...!appendParamsToQuery || Object.keys(queryParams).some((key) => destinationParams.includes(key)) ? {} : queryParams,
      ...destinationQuery
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    rewrittenUrl += rewrittenHash;
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      query: finalQuery,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleBeforeFilesRewrites(event, rewrites) {
  let result = {
    internalEvent: event,
    __rewrite: void 0,
    isExternalRewrite: false
  };
  for (const rewrite of rewrites) {
    const rewriteResult = handleRewrites(result.internalEvent, [rewrite]);
    if (!rewriteResult.__rewrite)
      continue;
    result = rewriteResult;
    if (result.isExternalRewrite)
      break;
  }
  return result;
}
function handleRepeatedSlashRedirect(event) {
  if (event.rawPath.match(/(\\|\/\/)/)) {
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: normalizeRepeatedSlashes(new URL(event.url))
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
  return false;
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && // Data requests (`/_next/data/<buildId>/*.json`) are never redirected, as with Next.js.
  // The header is set by `fixDataPage`, a client supplied value is removed by the routing handler.
  // The `__nextDataReq` query parameter can not be used as it is set by the client.
  event.headers["x-nextjs-data"] !== "1" && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const repeatedSlashRedirect = handleRepeatedSlashRedirect(event);
  if (repeatedSlashRedirect)
    return repeatedSlashRedirect;
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const localeRedirect = handleLocaleRedirect(event);
  if (localeRedirect)
    return localeRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal), false);
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const basePath = NextConfig.basePath ?? "";
  const dataPattern = `${basePath}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = `${basePath}${rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/")}`;
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      headers: {
        ...internalEvent.headers,
        "x-nextjs-data": "1"
      },
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes = {}, routes = {} } = prerenderManifest ?? {};
  const prerenderedFallbackRoutes = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false);
  const routeFallback = prerenderedFallbackRoutes.some(([, { routeRegex }]) => getCompiledRegExp(routeRegex).test(rawPath));
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  let localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  if (
    // Not if localizedPath is "/" tho, because that would not make it find `isPregenerated` below since it would be try to match an empty string.
    localizedPath !== "/" && NextConfig.trailingSlash && localizedPath.endsWith("/")
  ) {
    localizedPath = localizedPath.slice(0, -1);
  }
  const matchedStaticRoute = staticRouteMatcher(localizedPath);
  const prerenderedFallbackRoutesName = prerenderedFallbackRoutes.map(([name]) => name);
  const matchedDynamicRoute = dynamicRouteMatcher(localizedPath).filter(({ route }) => !prerenderedFallbackRoutesName.includes(route));
  let isPregenerated = false;
  try {
    isPregenerated = Object.hasOwn(routes, decodePathParams(localizedPath));
  } catch {
  }
  if (routeFallback && !isPregenerated && matchedStaticRoute.length === 0 && matchedDynamicRoute.length === 0) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_util();
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
var REDIRECTS = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var MIDDLEWARE_SET_COOKIE_HEADER2 = "x-middleware-set-cookie";
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, initialSearch, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers[ISR_HEADER] && headers[PRERENDER_REVALIDATE_HEADER] === PrerenderManifest?.preview?.previewModeId)
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(normalizedPath);
  } catch {
  }
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath) || decodedPath !== void 0 && r.test(decodedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = initialSearch;
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  let middlewareSetCookie;
  const filteredHeaders = [
    "x-middleware-override-headers",
    "x-middleware-next",
    "x-middleware-rewrite",
    "x-middleware-redirect",
    "x-middleware-refresh",
    // We need to drop `content-encoding` because it will be decoded
    "content-encoding"
  ];
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    const normalizedKey = key.toLowerCase();
    if (normalizedKey.startsWith(xMiddlewareKey)) {
      const k = normalizedKey.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (filteredHeaders.includes(normalizedKey))
        return;
      if (normalizedKey === MIDDLEWARE_SET_COOKIE_HEADER2) {
        middlewareSetCookie = value;
        return;
      }
      if (normalizedKey === "set-cookie")
        return;
      if (REDIRECTS.has(statusCode) && normalizedKey === "location") {
        resHeaders[normalizedKey] = normalizeLocationHeader(value, internalEvent.url);
      } else {
        resHeaders[normalizedKey] = value;
      }
    }
  });
  const setCookies = responseHeaders.getSetCookie().flatMap((maybeCompoundCookie) => parseSetCookieHeader(maybeCompoundCookie));
  if (setCookies.length > 0) {
    resHeaders["set-cookie"] = setCookies;
  }
  const overrideHeaders = responseHeaders.get("x-middleware-override-headers");
  const overriddenHeaders = overrideHeaders === null ? void 0 : new Set(overrideHeaders.split(",").map((key) => key.trim().toLowerCase()));
  const newHeaders = Object.fromEntries([...Object.entries(internalEvent.headers), ...Object.entries(reqHeaders)].map(([key, value]) => [key.toLowerCase(), value]).filter(([key]) => !overriddenHeaders || overriddenHeaders.has(key)));
  if (middlewareSetCookie !== void 0) {
    newHeaders[MIDDLEWARE_SET_COOKIE_HEADER2] = middlewareSetCookie;
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let isExternalRewrite = false;
  let middlewareQuery = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQuery = getQueryFromSearchParams(rewriteUrlObject.searchParams);
      if ("__nextDataReq" in internalEvent.query) {
        middlewareQuery.__nextDataReq = internalEvent.query.__nextDataReq;
      }
    }
  }
  if (!rewriteUrl && !responseHeaders.get("x-middleware-next")) {
    const body = result.body ?? emptyReadableStream();
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: newHeaders,
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQuery,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite,
    rewriteStatusCode: rewriteUrl && !isExternalRewrite ? statusCode : void 0
  };
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/routeParamPlaceholder.js
var PLACEHOLDER_REGEX = /\[\[\.\.\.[^\]]+\]\]|\[(?:\.\.\.)?[^\]]+\]/g;
var OPENING_BRACKET_REGEX = /\[|%5b/i;
function hasRouteParamPlaceholder(pathname) {
  if (!OPENING_BRACKET_REGEX.test(pathname)) {
    return false;
  }
  const placeholders = new Set(dynamicRouteMatcher(pathname).filter(({ type }) => type === "app").flatMap(({ route }) => route.match(PLACEHOLDER_REGEX) ?? []));
  return placeholders.size > 0 && pathname.split("/").some((segment) => placeholders.has(safeDecode(segment)));
}
function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return "";
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var NEXT_CONFIG_HEADER_PREFIX = `${INTERNAL_HEADER_PREFIX}next-config-response-`;
var NEXT_CONFIG_HEADER_PREFIX_LEN = NEXT_CONFIG_HEADER_PREFIX.length;
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var INTERNAL_HEADER_REWRITE_STATUS_CODE = `${INTERNAL_HEADER_PREFIX}rewrite-status-code`;
var INTERNAL_EVENT_REQUEST_ID = `${INTERNAL_HEADER_PREFIX}request-id`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
var NEXT_INTERNAL_HEADERS = [
  "x-middleware-rewrite",
  "x-middleware-redirect",
  "x-middleware-set-cookie",
  "x-middleware-skip",
  "x-middleware-override-headers",
  "x-middleware-next",
  "x-now-route-matches",
  "x-matched-path",
  "x-nextjs-data",
  "x-next-resume-state-length",
  "next-resume"
];
function applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders) {
  const isResult = isInternalResult(eventOrResult);
  const headers = eventOrResult.headers;
  const addHeaders = (source, keyPrefix) => {
    for (const [key, value] of Object.entries(source)) {
      if (value) {
        headers[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
      }
    }
  };
  addHeaders(middlewareHeaders, isResult ? "" : MIDDLEWARE_HEADER_PREFIX);
  addHeaders(nextConfigHeaders, isResult ? "" : NEXT_CONFIG_HEADER_PREFIX);
}
async function routingHandler(event, { assetResolver }) {
  try {
    for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
      const value = event.headers[openNextGeoName];
      if (value) {
        event.headers[nextGeoName] = value;
      }
    }
    for (const key of Object.keys(event.headers)) {
      const lowerCaseKey = key.toLowerCase();
      if (lowerCaseKey.startsWith(INTERNAL_HEADER_PREFIX) || lowerCaseKey.startsWith(MIDDLEWARE_HEADER_PREFIX) || NEXT_INTERNAL_HEADERS.includes(lowerCaseKey)) {
        delete event.headers[key];
      }
    }
    let nextConfigHeaders = getNextConfigHeaders(event, ConfigHeaders);
    let eventOrResult = fixDataPage(event, BuildId);
    if (isInternalResult(eventOrResult)) {
      return eventOrResult;
    }
    const redirect = handleRedirects(eventOrResult, RoutesManifest.redirects);
    if (redirect) {
      redirect.headers.Location = normalizeLocationHeader(redirect.headers.Location, event.url, true);
      debug("redirect", redirect);
      return redirect;
    }
    const middlewareEventOrResult = await handleMiddleware(
      eventOrResult,
      // We need to pass the initial search without any decoding
      // TODO: we'd need to refactor InternalEvent to include the initial querystring directly
      // Should be done in another PR because it is a breaking change
      new URL(event.url).search
    );
    if (isInternalResult(middlewareEventOrResult)) {
      return middlewareEventOrResult;
    }
    const middlewareHeadersPrioritized = globalThis.openNextConfig.dangerous?.middlewareHeadersOverrideNextConfigHeaders ?? false;
    const middlewareHeaders = middlewareEventOrResult.responseHeaders ?? {};
    if (middlewareHeadersPrioritized) {
      nextConfigHeaders = Object.fromEntries(Object.entries(nextConfigHeaders).filter(([key]) => !Object.hasOwn(middlewareHeaders, key)));
    }
    let isExternalRewrite = middlewareEventOrResult.isExternalRewrite ?? false;
    eventOrResult = middlewareEventOrResult;
    if (!isExternalRewrite) {
      const beforeRewrite = handleBeforeFilesRewrites(eventOrResult, RoutesManifest.rewrites.beforeFiles);
      eventOrResult = beforeRewrite.internalEvent;
      isExternalRewrite = beforeRewrite.isExternalRewrite;
      if (!isExternalRewrite) {
        const assetResult = await assetResolver?.maybeGetAssetResult?.(eventOrResult);
        if (assetResult) {
          applyResponseHeaders(assetResult, nextConfigHeaders, middlewareHeaders);
          return assetResult;
        }
      }
    }
    const foundStaticRoute = staticRouteMatcher(eventOrResult.rawPath);
    const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
    if (!(isStaticRoute || isExternalRewrite)) {
      const afterRewrite = handleRewrites(eventOrResult, RoutesManifest.rewrites.afterFiles);
      eventOrResult = afterRewrite.internalEvent;
      isExternalRewrite = afterRewrite.isExternalRewrite;
    }
    let isISR = false;
    if (!isExternalRewrite) {
      const fallbackResult = handleFallbackFalse(eventOrResult, PrerenderManifest);
      eventOrResult = fallbackResult.event;
      isISR = fallbackResult.isISR;
    }
    const foundDynamicRoute = dynamicRouteMatcher(eventOrResult.rawPath);
    const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
    if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
      const fallbackRewrites = handleRewrites(eventOrResult, RoutesManifest.rewrites.fallback);
      eventOrResult = fallbackRewrites.internalEvent;
      isExternalRewrite = fallbackRewrites.isExternalRewrite;
    }
    const isNextImageRoute = eventOrResult.rawPath.startsWith("/_next/image");
    const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
    let resolvedRoutes = [
      ...staticRouteMatcher(eventOrResult.rawPath),
      ...dynamicRouteMatcher(eventOrResult.rawPath)
    ];
    if (!(isRouteFoundBeforeAllRewrites || isNextImageRoute || // We need to check again once all rewrites have been applied
    staticRouteMatcher(eventOrResult.rawPath).length > 0 || dynamicRouteMatcher(eventOrResult.rawPath).length > 0) || // Next.js versions before 16.4.5 treat a param whose value is its placeholder (e.g. `[slug]`) as unresolved.
    // Next.js receives both the rawPath and the URL pathname, which is normalized (e.g. dot segments).
    !isExternalRewrite && [eventOrResult.rawPath, new URL(eventOrResult.url).pathname].some(hasRouteParamPlaceholder)) {
      resolvedRoutes = [];
      eventOrResult = {
        ...eventOrResult,
        rawPath: "/404",
        url: constructNextUrl(eventOrResult.url, "/404"),
        headers: {
          ...eventOrResult.headers,
          "x-middleware-response-cache-control": NO_STORE_CACHE_CONTROL
        }
      };
    }
    if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !isExternalRewrite && !isInternalResult(eventOrResult)) {
      debug("Cache interception enabled");
      eventOrResult = await cacheInterceptor(eventOrResult, resolvedRoutes);
      if (isInternalResult(eventOrResult)) {
        applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders);
        return eventOrResult;
      }
    }
    applyResponseHeaders(eventOrResult, nextConfigHeaders, middlewareHeaders);
    debug("resolvedRoutes", resolvedRoutes);
    return {
      internalEvent: eventOrResult,
      isExternalRewrite,
      origin: false,
      isISR,
      resolvedRoutes,
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(eventOrResult, NextConfig.i18n) : void 0,
      rewriteStatusCode: middlewareEventOrResult.rewriteStatusCode
    };
  } catch (e) {
    error("Error in routingHandler", e);
    return {
      internalEvent: {
        type: "core",
        method: "GET",
        rawPath: "/500",
        url: constructNextUrl(event.url, "/500"),
        headers: {
          ...event.headers
        },
        query: event.query,
        cookies: event.cookies,
        remoteAddress: event.remoteAddress
      },
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      resolvedRoutes: [],
      initialURL: event.url,
      locale: NextConfig.i18n ? detectLocale(event, NextConfig.i18n) : void 0
    };
  }
}
function isInternalResult(eventOrResult) {
  return eventOrResult != null && "statusCode" in eventOrResult;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const middlewareConfig = globalThis.openNextConfig.middleware;
  const originResolver = await resolveOriginResolver(middlewareConfig?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(middlewareConfig?.override?.proxyExternalRequest);
  const assetResolver = await resolveAssetResolver(middlewareConfig?.assetResolver);
  const requestId = Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    const result = await routingHandler(internalEvent, { assetResolver });
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes),
              [INTERNAL_EVENT_REQUEST_ID]: requestId,
              [INTERNAL_HEADER_REWRITE_STATUS_CODE]: String(result.rewriteStatusCode)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_EVENT_REQUEST_ID]: requestId
            },
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
      result.headers[INTERNAL_EVENT_REQUEST_ID] = requestId;
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
