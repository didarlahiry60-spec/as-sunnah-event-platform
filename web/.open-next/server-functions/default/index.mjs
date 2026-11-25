globalThis.monorepoPackagePath = "";globalThis.openNextDebug = false;globalThis.openNextVersion = "4.2.0";globalThis.nextVersion = "16.4.6";
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
var __commonJS = (cb, mod3) => function __require2() {
  try {
    return mod3 || (0, cb[__getOwnPropNames(cb)[0]])((mod3 = { exports: {} }).exports, mod3), mod3.exports;
  } catch (e) {
    throw mod3 = 0, e;
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
var __reExport = (target, mod3, secondTarget) => (__copyProps(target, mod3, "default"), secondTarget && __copyProps(secondTarget, mod3, "default"));
var __toESM = (mod3, isNodeMode, target) => (target = mod3 != null ? __create(__getProtoOf(mod3)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod3 || !mod3.__esModule ? __defProp(target, "default", { value: mod3, enumerable: true }) : target,
  mod3
));
var __toCommonJS = (mod3) => __copyProps(__defProp({}, "__esModule", { value: true }), mod3);

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var IgnorableError, FatalError;
var init_error = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/error.js"() {
    IgnorableError = class extends Error {
      __openNextInternal = true;
      canIgnore = true;
      logLevel = 0;
      constructor(message) {
        super(message);
        this.name = "IgnorableError";
      }
    };
    FatalError = class extends Error {
      __openNextInternal = true;
      canIgnore = false;
      logLevel = 2;
      constructor(message) {
        super(message);
        this.name = "FatalError";
      }
    };
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
var parseHeaders, convertHeader;
var init_util = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/util.js"() {
    init_logger();
    parseHeaders = (headers) => {
      const result = {};
      if (!headers) {
        return result;
      }
      for (const [key, value] of Object.entries(headers)) {
        if (value === void 0) {
          continue;
        }
        const keyLower = key.toLowerCase();
        if (keyLower === "location" && Array.isArray(value)) {
          if (value.length === 1 || value[0] === value[1]) {
            result[keyLower] = value[0];
          } else {
            warn("Multiple different values for Location header found. Using the last one");
            result[keyLower] = value[value.length - 1];
          }
          continue;
        }
        result[keyLower] = convertHeader(value);
      }
      return result;
    };
    convertHeader = (header) => {
      if (typeof header === "string") {
        return header;
      }
      if (Array.isArray(header)) {
        return header.join(",");
      }
      return String(header);
    };
  }
});

// node-built-in-modules:node:module
var node_module_exports = {};
import * as node_module_star from "node:module";
var init_node_module = __esm({
  "node-built-in-modules:node:module"() {
    __reExport(node_module_exports, node_module_star);
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/stream.js
import { ReadableStream as ReadableStream2 } from "node:stream/web";
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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js
function getQueryFromSearchParams(searchParams) {
  return getQueryFromIterator(searchParams.entries());
}
var init_utils = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/converters/utils.js"() {
    init_util();
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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js
var cloudflare_node_exports = {};
__export(cloudflare_node_exports, {
  default: () => cloudflare_node_default
});
import { Writable } from "node:stream";
var NULL_BODY_STATUSES2, handler, cloudflare_node_default;
var init_cloudflare_node = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-node.js"() {
    NULL_BODY_STATUSES2 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
    handler = async (handler3, converter2) => async (request, env, ctx, abortSignal) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const url = new URL(request.url);
      const { promise: promiseResponse, resolve: resolveResponse } = Promise.withResolvers();
      const streamCreator = {
        writeHeaders(prelude) {
          const { statusCode, cookies, headers } = prelude;
          const responseHeaders = new Headers(headers);
          for (const cookie of cookies) {
            responseHeaders.append("Set-Cookie", cookie);
          }
          if (url.hostname === "localhost") {
            responseHeaders.set("Content-Encoding", "identity");
          }
          if (NULL_BODY_STATUSES2.has(statusCode)) {
            const response2 = new Response(null, {
              status: statusCode,
              headers: responseHeaders
            });
            resolveResponse(response2);
            return new Writable({
              write(chunk, encoding, callback) {
                callback();
              }
            });
          }
          let controller;
          const readable = new ReadableStream({
            start(c) {
              controller = c;
            }
          });
          const response = new Response(readable, {
            status: statusCode,
            headers: responseHeaders
          });
          resolveResponse(response);
          return new Writable({
            write(chunk, encoding, callback) {
              try {
                controller.enqueue(chunk);
              } catch (e) {
                return callback(e);
              }
              callback();
            },
            final(callback) {
              controller.close();
              callback();
            },
            destroy(error2, callback) {
              if (error2) {
                controller.error(error2);
              } else {
                try {
                  controller.close();
                } catch {
                }
              }
              callback(error2);
            }
          });
        },
        // This is for passing along the original abort signal from the initial Request you retrieve in your worker
        // Ensures that the response we pass to NextServer is aborted if the request is aborted
        // By doing this `request.signal.onabort` will work in route handlers
        abortSignal,
        // There is no need to retain the chunks that were pushed to the response stream.
        retainChunks: false
      };
      ctx.waitUntil(handler3(internalEvent, {
        streamCreator,
        waitUntil: ctx.waitUntil.bind(ctx)
      }));
      return promiseResponse;
    };
    cloudflare_node_default = {
      wrapper: handler,
      name: "cloudflare-node",
      supportStreaming: true
    };
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js
var dummy_exports = {};
__export(dummy_exports, {
  default: () => dummy_default
});
var dummyTagCache, dummy_default;
var init_dummy = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/tagCache/dummy.js"() {
    dummyTagCache = {
      name: "dummy",
      mode: "original",
      getByPath: async () => {
        return [];
      },
      getByTag: async () => {
        return [];
      },
      getLastModified: async (_, lastModified) => {
        return lastModified ?? Date.now();
      },
      writeTags: async () => {
        return;
      },
      isStale: async (_path) => {
        return false;
      }
    };
    dummy_default = dummyTagCache;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/queue/dummy.js
var dummy_exports2 = {};
__export(dummy_exports2, {
  default: () => dummy_default2
});
var dummyQueue, dummy_default2;
var init_dummy2 = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/queue/dummy.js"() {
    init_error();
    dummyQueue = {
      name: "dummy",
      send: async () => {
        throw new FatalError("Dummy queue is not implemented");
      }
    };
    dummy_default2 = dummyQueue;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js
var dummy_exports3 = {};
__export(dummy_exports3, {
  default: () => dummy_default3
});
var dummyIncrementalCache, dummy_default3;
var init_dummy3 = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/incrementalCache/dummy.js"() {
    init_error();
    dummyIncrementalCache = {
      name: "dummy",
      get: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      set: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      },
      delete: async () => {
        throw new IgnorableError('"Dummy" cache does not cache anything');
      }
    };
    dummy_default3 = dummyIncrementalCache;
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js
var dummy_exports4 = {};
__export(dummy_exports4, {
  default: () => dummy_default4
});
var resolver, dummy_default4;
var init_dummy4 = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/assetResolver/dummy.js"() {
    resolver = {
      name: "dummy"
    };
    dummy_default4 = resolver;
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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js
var dummy_exports5 = {};
__export(dummy_exports5, {
  default: () => dummy_default5
});
var dummy_default5;
var init_dummy5 = __esm({
  "../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/overrides/cdnInvalidation/dummy.js"() {
    dummy_default5 = {
      name: "dummy",
      invalidatePaths: (_) => {
        return Promise.resolve();
      }
    };
  }
});

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/createMainHandler.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/util.js
function setNodeEnv() {
  const processEnv = process.env;
  processEnv.NODE_ENV = process.env.NODE_ENV ?? "production";
}
function generateUniqueId() {
  return Math.random().toString(36).slice(2, 8);
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/requestHandler.js
import { AsyncLocalStorage } from "node:async_hooks";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
import { Transform } from "node:stream";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/cacheHeaders.js
var CACHE_CONTROL_HEADER = "cache-control";
var NEXTJS_CACHE_HEADER = "x-nextjs-cache";
var ISR_HEADER = "x-isr";
var NO_STORE_CACHE_CONTROL = "private, no-cache, no-store, max-age=0, must-revalidate";
function fixCacheControlForError(headers, statusCode) {
  if (process.env.OPEN_NEXT_DANGEROUSLY_SET_ERROR_HEADERS === "true") {
    return;
  }
  if (statusCode === 404 || statusCode === 500) {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_util();
var SET_COOKIE_HEADER = "set-cookie";
var CANNOT_BE_USED = "This cannot be used in OpenNext";
var OpenNextNodeResponse = class extends Transform {
  fixHeadersFn;
  onEnd;
  streamCreator;
  initialHeaders;
  statusCode;
  statusMessage = "";
  headers = {};
  headersSent = false;
  _chunks = [];
  headersAlreadyFixed = false;
  _cookies = [];
  responseStream;
  bodyLength = 0;
  // To comply with the ServerResponse interface :
  strictContentLength = false;
  assignSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  detachSocket(_socket) {
    throw new Error(CANNOT_BE_USED);
  }
  // We might have to revisit those 3 in the future
  writeContinue(_callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeEarlyHints(_hints, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  writeProcessing() {
    throw new Error(CANNOT_BE_USED);
  }
  /**
   * This is a dummy request object to comply with the ServerResponse interface
   * It will never be defined
   */
  req;
  chunkedEncoding = false;
  shouldKeepAlive = true;
  useChunkedEncodingByDefault = true;
  sendDate = false;
  connection = null;
  socket = null;
  setTimeout(_msecs, _callback) {
    throw new Error(CANNOT_BE_USED);
  }
  addTrailers(_headers) {
    throw new Error(CANNOT_BE_USED);
  }
  constructor(fixHeadersFn, onEnd, streamCreator, initialHeaders, statusCode) {
    super();
    this.fixHeadersFn = fixHeadersFn;
    this.onEnd = onEnd;
    this.streamCreator = streamCreator;
    this.initialHeaders = initialHeaders;
    if (statusCode && Number.isInteger(statusCode) && statusCode >= 100 && statusCode <= 599) {
      this.statusCode = statusCode;
    }
    streamCreator?.abortSignal?.addEventListener("abort", () => {
      this.destroy();
    });
  }
  // Necessary for next 12
  // We might have to implement all the methods here
  get originalResponse() {
    return this;
  }
  get finished() {
    return this.responseStream ? this.responseStream?.writableFinished : this.writableFinished;
  }
  setHeader(name, value) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      if (Array.isArray(value)) {
        this._cookies = value;
      } else {
        this._cookies = [value];
      }
    }
    this.headers[key] = value;
    return this;
  }
  removeHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      this._cookies = [];
    } else {
      delete this.headers[key];
    }
    return this;
  }
  hasHeader(name) {
    const key = name.toLowerCase();
    if (key === SET_COOKIE_HEADER) {
      return this._cookies.length > 0;
    }
    return this.headers[key] !== void 0;
  }
  getHeaders() {
    return this.headers;
  }
  getHeader(name) {
    return this.headers[name.toLowerCase()];
  }
  getHeaderNames() {
    return Object.keys(this.headers);
  }
  // Only used directly in next@14+
  flushHeaders() {
    this.headersSent = true;
    const mergeHeadersPriority = globalThis.__openNextAls?.getStore()?.mergeHeadersPriority ?? "middleware";
    if (this.initialHeaders) {
      this.headers = mergeHeadersPriority === "middleware" ? {
        ...this.headers,
        ...this.initialHeaders
      } : {
        ...this.initialHeaders,
        ...this.headers
      };
      const initialCookies = parseSetCookieHeader(this.initialHeaders[SET_COOKIE_HEADER]?.toString());
      this._cookies = mergeHeadersPriority === "middleware" ? [...this._cookies, ...initialCookies] : [...initialCookies, ...this._cookies];
    }
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    const parsedHeaders = parseHeaders(this.headers);
    delete parsedHeaders[SET_COOKIE_HEADER];
    if (this.streamCreator) {
      this.responseStream = this.streamCreator?.writeHeaders({
        statusCode: this.statusCode ?? 200,
        cookies: this._cookies,
        headers: parsedHeaders
      });
      this.pipe(this.responseStream);
    }
  }
  appendHeader(name, value) {
    const key = name.toLowerCase();
    if (!this.hasHeader(key)) {
      return this.setHeader(key, value);
    }
    const existingHeader = this.getHeader(key);
    const toAppend = Array.isArray(value) ? value : [value];
    const newValue = Array.isArray(existingHeader) ? [...existingHeader, ...toAppend] : [existingHeader, ...toAppend];
    return this.setHeader(key, newValue);
  }
  writeHead(statusCode, statusMessage, headers) {
    let _headers = headers;
    let _statusMessage;
    if (typeof statusMessage === "string") {
      _statusMessage = statusMessage;
    } else {
      _headers = statusMessage;
    }
    const finalHeaders = this.headers;
    if (_headers) {
      if (Array.isArray(_headers)) {
        for (let i = 0; i < _headers.length; i += 2) {
          finalHeaders[_headers[i]] = _headers[i + 1];
        }
      } else {
        for (const key of Object.keys(_headers)) {
          finalHeaders[key] = _headers[key];
        }
      }
    }
    this.statusCode = statusCode;
    if (headers) {
      this.headers = finalHeaders;
    }
    this.flushHeaders();
    return this;
  }
  /**
   * OpenNext specific method
   */
  fixHeaders(headers) {
    if (this.headersAlreadyFixed) {
      return;
    }
    this.fixHeadersFn(headers);
    this.headersAlreadyFixed = true;
  }
  getFixedHeaders() {
    this.fixHeaders(this.headers);
    this.fixHeadersForError();
    this.headers[SET_COOKIE_HEADER] = this._cookies;
    return this.headers;
  }
  getBody() {
    return Buffer.concat(this._chunks);
  }
  _internalWrite(chunk, encoding) {
    const buffer = encoding === "buffer" ? chunk : Buffer.from(chunk, encoding);
    this.bodyLength += buffer.length;
    if (this.streamCreator?.retainChunks !== false) {
      this._chunks.push(buffer);
    }
    this.push(buffer);
    this.streamCreator?.onWrite?.();
  }
  _transform(chunk, encoding, callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    this._internalWrite(chunk, encoding);
    callback();
  }
  _flush(callback) {
    if (!this.headersSent) {
      this.flushHeaders();
    }
    globalThis.__openNextAls?.getStore()?.pendingPromiseRunner.add(this.onEnd(this.headers));
    this.streamCreator?.onFinish?.(this.bodyLength);
    if (this.bodyLength === 0 && // We use an env variable here because not all aws account have the same behavior
    // On some aws accounts the response will hang if the body is empty
    // We are modifying the response body here, this is not a good practice
    process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
      debug('Force writing "SOMETHING" to the response body');
      this.push("SOMETHING");
    }
    callback();
  }
  /**
   * New method in Node 18.15+
   * There are probably not used right now in Next.js, but better be safe than sorry
   */
  setHeaders(headers) {
    headers.forEach((value, key) => {
      this.setHeader(key, Array.isArray(value) ? value : value.toString());
    });
    return this;
  }
  /**
   * Next specific methods
   * On earlier versions of next.js, those methods are mandatory to make everything work
   */
  get sent() {
    return this.finished || this.headersSent;
  }
  getHeaderValues(name) {
    const values = this.getHeader(name);
    if (values === void 0)
      return void 0;
    return (Array.isArray(values) ? values : [values]).map((value) => value.toString());
  }
  send() {
    for (const chunk of this._chunks) {
      this.write(chunk);
    }
    this.end();
  }
  body(value) {
    this.write(value);
    return this;
  }
  onClose(callback) {
    this.on("close", callback);
  }
  redirect(destination, statusCode) {
    this.setHeader("Location", destination);
    this.statusCode = statusCode;
    if (statusCode === 308) {
      this.setHeader("Refresh", `0;url=${destination}`);
    }
    return this;
  }
  // For some reason, next returns the 500 error page with some cache-control headers
  // We need to fix that
  fixHeadersForError() {
    fixCacheControlForError(this.headers, this.statusCode);
  }
};

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/http/request.js
import http from "node:http";
var IncomingMessage = class extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    super({
      encrypted: true,
      readable: false,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });
    if (body) {
      headers["content-length"] ??= String(Buffer.byteLength(body));
    }
    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: "1.1",
      httpVersionMajor: "1",
      httpVersionMinor: "1",
      method,
      headers,
      body,
      url
    });
    this._read = () => {
      this.push(body);
      this.push(null);
    };
  }
};

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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "webpack": null, "typescript": { "ignoreBuildErrors": false }, "typedRoutes": false, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "instrumentationClientInject": [], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 14400, "formats": ["image/webp"], "maximumRedirects": 3, "maximumResponseBody": 5e7, "dangerouslyAllowLocalIP": false, "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "localPatterns": [{ "pathname": "**", "search": "" }], "remotePatterns": [{ "protocol": "https", "hostname": "images.unsplash.com" }, { "protocol": "https", "hostname": "assunnah.foundation" }, { "protocol": "https", "hostname": "*.assunnah.foundation" }, { "protocol": "https", "hostname": "*.r2.cloudflarestorage.com" }, { "protocol": "https", "hostname": "pub-*.r2.dev" }, { "protocol": "https", "hostname": "*.cloudflare.com" }], "qualities": [75], "unoptimized": true, "customCacheHandler": false }, "devIndicators": { "position": "bottom-left" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": { "serverFunctions": true, "browserToTerminal": "warn" }, "compiler": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/home/didar-lahiry/Antigravity/Event management", "enablePrerenderSourceMaps": true, "cacheComponents": false, "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 30, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 31536e3 } }, "cacheHandlers": {}, "deprecated": {}, "experimental": { "agentUpgrade": "security", "agentFeedback": false, "coldCacheBadge": false, "collapseAdapterRoutes": true, "devValidationWorker": true, "useSkewCookie": false, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "parallelRouteMetadata": false, "prerenderEarlyExit": true, "serverMinification": true, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "cachedNavigations": false, "dynamicOnHover": false, "reactBrowserBailout": true, "useOffline": false, "varyParams": true, "optimisticRouting": true, "concurrentRouterQueue": false, "instrumentationClientRouterTransitionEvents": false, "prefetchInlining": { "maxSize": 2048, "maxBundleSize": 10240 }, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "proxyPrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 15, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptOperationCache": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "imgOptMozjpeg": true, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "devMemoryThresholdRestart": true, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "requestInsights": false, "largePageDataBytes": 128e3, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "strictRouteTypes": false, "useTypeScriptCli": true, "removeUncaughtErrorAndRejectionListeners": false, "validateRSCRequestHeaders": true, "staleTimes": { "dynamic": 0, "static": 300 }, "reactDebugChannel": true, "serverComponentsHmrCache": true, "serverComponentsHmrCancellation": false, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "transitionIndicator": false, "gestureTransition": false, "inlineCss": false, "useCache": false, "useCacheStaticRootParamTracking": false, "globalNotFound": false, "explicitParallelRouteChildren": true, "strictRouteMatching": true, "browserDebugInfoInTerminal": "warn", "lockDistDir": true, "disableResumeDataCacheCompression": false, "proxyClientMaxBodySize": 10485760, "hideLogsAfterAbort": false, "mcpServer": true, "exposeRuntimeErrorsToHMR": false, "turbopackFileSystemCacheForDev": true, "turbopackFileSystemCacheForBuild": true, "turbopackStaleOutputMaxAge": 6048e5, "turbopackInferModuleSideEffects": true, "turbopackPluginRuntimeStrategy": "childProcesses", "turbopackSharedRuntime": true, "turbopackMemoryEvictionMode": "auto", "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-sqlite-node", "@effect/sql-sqlite-bun", "@effect/sql-sqlite-wasm", "@effect/sql-sqlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "useCacheTimeout": 54, "instantInsights": { "validationLevel": "warning" }, "trustHostHeader": false, "isExperimentalCompile": false }, "htmlLimitedBots": "[\\w-]+-Google|Google-[\\w-]+|Chrome-Lighthouse|Slurp|DuckDuckBot|baiduspider|yandex|sogou|bitlybot|tumblr|vkShare|quora link preview|redditbot|ia_archiver|Bingbot|BingPreview|applebot|facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|Yeti|googleweblight", "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts", "turbopack": { "rules": { "*.css": { "loaders": ["@tailwindcss/turbopack"], "as": "*.css" } }, "root": "/home/didar-lahiry/Antigravity/Event management" }, "repoRoot": "/home/didar-lahiry/Antigravity/Event management", "distDirRoot": ".next" };
var BuildId = "VdwBIu5GB2q7VAlfr8-xy";
var HtmlPages = ["/500"];
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "priority": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/", "regex": "^/(?:/)?$", "routeKeys": {}, "namedRegex": "^/(?:/)?$" }, { "page": "/_global-error", "regex": "^/_global\\-error(?:/)?$", "routeKeys": {}, "namedRegex": "^/_global\\-error(?:/)?$" }, { "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/about", "regex": "^/about(?:/)?$", "routeKeys": {}, "namedRegex": "^/about(?:/)?$" }, { "page": "/admin", "regex": "^/admin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin(?:/)?$" }, { "page": "/admin/applications", "regex": "^/admin/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/applications(?:/)?$" }, { "page": "/admin/automation", "regex": "^/admin/automation(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/automation(?:/)?$" }, { "page": "/admin/checkin", "regex": "^/admin/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/checkin(?:/)?$" }, { "page": "/admin/launch", "regex": "^/admin/launch(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/launch(?:/)?$" }, { "page": "/admin/login", "regex": "^/admin/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/login(?:/)?$" }, { "page": "/admin/monitoring", "regex": "^/admin/monitoring(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/monitoring(?:/)?$" }, { "page": "/admin/relief", "regex": "^/admin/relief(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/relief(?:/)?$" }, { "page": "/admin/submissions", "regex": "^/admin/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/submissions(?:/)?$" }, { "page": "/admin/whatsapp", "regex": "^/admin/whatsapp(?:/)?$", "routeKeys": {}, "namedRegex": "^/admin/whatsapp(?:/)?$" }, { "page": "/api/admin/applications", "regex": "^/api/admin/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/applications(?:/)?$" }, { "page": "/api/admin/applications/bulk", "regex": "^/api/admin/applications/bulk(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/applications/bulk(?:/)?$" }, { "page": "/api/admin/auth/login", "regex": "^/api/admin/auth/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/login(?:/)?$" }, { "page": "/api/admin/auth/logout", "regex": "^/api/admin/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/logout(?:/)?$" }, { "page": "/api/admin/auth/me", "regex": "^/api/admin/auth/me(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/auth/me(?:/)?$" }, { "page": "/api/admin/automation", "regex": "^/api/admin/automation(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation(?:/)?$" }, { "page": "/api/admin/automation/call", "regex": "^/api/admin/automation/call(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/call(?:/)?$" }, { "page": "/api/admin/automation/settings", "regex": "^/api/admin/automation/settings(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/settings(?:/)?$" }, { "page": "/api/admin/automation/trigger", "regex": "^/api/admin/automation/trigger(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/automation/trigger(?:/)?$" }, { "page": "/api/admin/relief", "regex": "^/api/admin/relief(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief(?:/)?$" }, { "page": "/api/admin/relief/broadcast", "regex": "^/api/admin/relief/broadcast(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief/broadcast(?:/)?$" }, { "page": "/api/admin/relief/respond", "regex": "^/api/admin/relief/respond(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/relief/respond(?:/)?$" }, { "page": "/api/admin/reports/summary", "regex": "^/api/admin/reports/summary(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/reports/summary(?:/)?$" }, { "page": "/api/admin/settings/whatsapp", "regex": "^/api/admin/settings/whatsapp(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/settings/whatsapp(?:/)?$" }, { "page": "/api/admin/submissions", "regex": "^/api/admin/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/submissions(?:/)?$" }, { "page": "/api/admin/trainees", "regex": "^/api/admin/trainees(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/admin/trainees(?:/)?$" }, { "page": "/api/applications", "regex": "^/api/applications(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/applications(?:/)?$" }, { "page": "/api/applications/prefill", "regex": "^/api/applications/prefill(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/applications/prefill(?:/)?$" }, { "page": "/api/auth/logout", "regex": "^/api/auth/logout(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/logout(?:/)?$" }, { "page": "/api/auth/magic-link/create", "regex": "^/api/auth/magic\\-link/create(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/magic\\-link/create(?:/)?$" }, { "page": "/api/auth/otp/send", "regex": "^/api/auth/otp/send(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/otp/send(?:/)?$" }, { "page": "/api/auth/otp/verify", "regex": "^/api/auth/otp/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/otp/verify(?:/)?$" }, { "page": "/api/auth/session", "regex": "^/api/auth/session(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/auth/session(?:/)?$" }, { "page": "/api/certificates/verify", "regex": "^/api/certificates/verify(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/certificates/verify(?:/)?$" }, { "page": "/api/checkin", "regex": "^/api/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/checkin(?:/)?$" }, { "page": "/api/contact", "regex": "^/api/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/contact(?:/)?$" }, { "page": "/api/health", "regex": "^/api/health(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/health(?:/)?$" }, { "page": "/api/newsletter", "regex": "^/api/newsletter(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/newsletter(?:/)?$" }, { "page": "/api/portal/certificates", "regex": "^/api/portal/certificates(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/certificates(?:/)?$" }, { "page": "/api/portal/classes/attend", "regex": "^/api/portal/classes/attend(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/classes/attend(?:/)?$" }, { "page": "/api/portal/profile", "regex": "^/api/portal/profile(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/profile(?:/)?$" }, { "page": "/api/portal/submissions", "regex": "^/api/portal/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/api/portal/submissions(?:/)?$" }, { "page": "/blog", "regex": "^/blog(?:/)?$", "routeKeys": {}, "namedRegex": "^/blog(?:/)?$" }, { "page": "/checkin", "regex": "^/checkin(?:/)?$", "routeKeys": {}, "namedRegex": "^/checkin(?:/)?$" }, { "page": "/contact", "regex": "^/contact(?:/)?$", "routeKeys": {}, "namedRegex": "^/contact(?:/)?$" }, { "page": "/events", "regex": "^/events(?:/)?$", "routeKeys": {}, "namedRegex": "^/events(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }, { "page": "/gallery", "regex": "^/gallery(?:/)?$", "routeKeys": {}, "namedRegex": "^/gallery(?:/)?$" }, { "page": "/manifest.webmanifest", "regex": "^/manifest\\.webmanifest(?:/)?$", "routeKeys": {}, "namedRegex": "^/manifest\\.webmanifest(?:/)?$" }, { "page": "/notices", "regex": "^/notices(?:/)?$", "routeKeys": {}, "namedRegex": "^/notices(?:/)?$" }, { "page": "/portal", "regex": "^/portal(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal(?:/)?$" }, { "page": "/portal/certificates", "regex": "^/portal/certificates(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/certificates(?:/)?$" }, { "page": "/portal/login", "regex": "^/portal/login(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/login(?:/)?$" }, { "page": "/portal/submissions", "regex": "^/portal/submissions(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/submissions(?:/)?$" }, { "page": "/portal/submissions/new", "regex": "^/portal/submissions/new(?:/)?$", "routeKeys": {}, "namedRegex": "^/portal/submissions/new(?:/)?$" }, { "page": "/verify-certificate", "regex": "^/verify\\-certificate(?:/)?$", "routeKeys": {}, "namedRegex": "^/verify\\-certificate(?:/)?$" }], "dynamic": [{ "page": "/api/admin/applications/[id]/status", "regex": "^/api/admin/applications/([^/]+?)/status(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/applications/(?<nxtPid>[^/]+?)/status(?:/)?$" }, { "page": "/api/admin/submissions/[id]/status", "regex": "^/api/admin/submissions/([^/]+?)/status(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/submissions/(?<nxtPid>[^/]+?)/status(?:/)?$" }, { "page": "/api/admin/trainees/[id]/call-log", "regex": "^/api/admin/trainees/([^/]+?)/call\\-log(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/trainees/(?<nxtPid>[^/]+?)/call\\-log(?:/)?$" }, { "page": "/api/admin/trainees/[id]/rating", "regex": "^/api/admin/trainees/([^/]+?)/rating(?:/)?$", "routeKeys": { "nxtPid": "nxtPid" }, "namedRegex": "^/api/admin/trainees/(?<nxtPid>[^/]+?)/rating(?:/)?$" }, { "page": "/events/[slug]", "regex": "^/events/([^/]+?)(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)(?:/)?$" }, { "page": "/events/[slug]/apply", "regex": "^/events/([^/]+?)/apply(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)/apply(?:/)?$" }, { "page": "/events/[slug]/apply/success", "regex": "^/events/([^/]+?)/apply/success(?:/)?$", "routeKeys": { "nxtPslug": "nxtPslug" }, "namedRegex": "^/events/(?<nxtPslug>[^/]+?)/apply/success(?:/)?$" }, { "page": "/m/[code]", "regex": "^/m/([^/]+?)(?:/)?$", "routeKeys": { "nxtPcode": "nxtPcode" }, "namedRegex": "^/m/(?<nxtPcode>[^/]+?)(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var PrerenderManifest = { "version": 4, "routes": { "/_global-error": { "routeType": "page", "response": "complete", "compute": "static", "htmlSize": 9351, "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/_global-error", "dataRoute": "/_global-error.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/manifest.webmanifest": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "application/manifest+json", "x-next-cache-tags": "_N_T_/layout,_N_T_/manifest.webmanifest/layout,_N_T_/manifest.webmanifest/route,_N_T_/manifest.webmanifest" }, "routeType": "route", "response": "complete", "compute": "static", "experimentalBypassFor": [{ "type": "header", "key": "next-action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/manifest.webmanifest", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": {}, "notFoundRoutes": [], "preview": { "previewModeId": "525bd15bca8a843ea0c47495a265bdc7", "previewModeSigningKey": "6db05b887a1739797854c2e5cf9d3cdd5fc76f600f59002886ac76fae0703a09", "previewModeEncryptionKey": "d49ab6b3a99cd2f12aa1cbe7a918dca62c4cc8997d39eb315ab64deea9fd6867" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge/chunks/[root-of-the-server]__11zk02vj3xkf2._.js", "server/edge/chunks/[root-of-the-server]__20wuf2xt1epdd._.js", "server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js"], "name": "middleware", "page": "/", "entrypoint": "server/edge/chunks/0igt_next_dist_esm_build_templates_edge-wrapper_16fitzwc6vw_y.js", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/admin" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/admin(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/admin/:path*" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?\\/api\\/auth\\/magic-link\\/create(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$", "originalSource": "/api/auth/magic-link/create" }], "wasm": [{ "name": "wasm_b1b6a44cda0ef428469235d0d537a6bf", "filePath": "server/edge/chunks/1oji__prisma_client_query_engine_bg_0athij3ijk6je.wasm" }], "assets": [], "env": { "__NEXT_BUILD_ID": "VdwBIu5GB2q7VAlfr8-xy", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "QSt3rmbjHSxhpwUA0k8wxZhErX5ETHE7RRFSsJf6aA0=", "__NEXT_PREVIEW_MODE_ID": "525bd15bca8a843ea0c47495a265bdc7", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "d49ab6b3a99cd2f12aa1cbe7a918dca62c4cc8997d39eb315ab64deea9fd6867", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "6db05b887a1739797854c2e5cf9d3cdd5fc76f600f59002886ac76fae0703a09" } } }, "sortedMiddleware": ["/"], "functions": {} };
var AppPathsManifest = { "/_global-error/page": "app/_global-error/page.js", "/_not-found/page": "app/_not-found/page.js", "/about/page": "app/about/page.js", "/admin/applications/page": "app/admin/applications/page.js", "/admin/automation/page": "app/admin/automation/page.js", "/admin/checkin/page": "app/admin/checkin/page.js", "/admin/launch/page": "app/admin/launch/page.js", "/admin/login/page": "app/admin/login/page.js", "/admin/monitoring/page": "app/admin/monitoring/page.js", "/admin/page": "app/admin/page.js", "/admin/relief/page": "app/admin/relief/page.js", "/admin/submissions/page": "app/admin/submissions/page.js", "/admin/whatsapp/page": "app/admin/whatsapp/page.js", "/api/admin/applications/[id]/status/route": "app/api/admin/applications/[id]/status/route.js", "/api/admin/applications/bulk/route": "app/api/admin/applications/bulk/route.js", "/api/admin/applications/route": "app/api/admin/applications/route.js", "/api/admin/auth/login/route": "app/api/admin/auth/login/route.js", "/api/admin/auth/logout/route": "app/api/admin/auth/logout/route.js", "/api/admin/auth/me/route": "app/api/admin/auth/me/route.js", "/api/admin/automation/call/route": "app/api/admin/automation/call/route.js", "/api/admin/automation/route": "app/api/admin/automation/route.js", "/api/admin/automation/settings/route": "app/api/admin/automation/settings/route.js", "/api/admin/automation/trigger/route": "app/api/admin/automation/trigger/route.js", "/api/admin/relief/broadcast/route": "app/api/admin/relief/broadcast/route.js", "/api/admin/relief/respond/route": "app/api/admin/relief/respond/route.js", "/api/admin/relief/route": "app/api/admin/relief/route.js", "/api/admin/reports/summary/route": "app/api/admin/reports/summary/route.js", "/api/admin/settings/whatsapp/route": "app/api/admin/settings/whatsapp/route.js", "/api/admin/submissions/[id]/status/route": "app/api/admin/submissions/[id]/status/route.js", "/api/admin/submissions/route": "app/api/admin/submissions/route.js", "/api/admin/trainees/[id]/call-log/route": "app/api/admin/trainees/[id]/call-log/route.js", "/api/admin/trainees/[id]/rating/route": "app/api/admin/trainees/[id]/rating/route.js", "/api/admin/trainees/route": "app/api/admin/trainees/route.js", "/api/applications/prefill/route": "app/api/applications/prefill/route.js", "/api/applications/route": "app/api/applications/route.js", "/api/auth/logout/route": "app/api/auth/logout/route.js", "/api/auth/magic-link/create/route": "app/api/auth/magic-link/create/route.js", "/api/auth/otp/send/route": "app/api/auth/otp/send/route.js", "/api/auth/otp/verify/route": "app/api/auth/otp/verify/route.js", "/api/auth/session/route": "app/api/auth/session/route.js", "/api/certificates/verify/route": "app/api/certificates/verify/route.js", "/api/checkin/route": "app/api/checkin/route.js", "/api/contact/route": "app/api/contact/route.js", "/api/health/route": "app/api/health/route.js", "/api/newsletter/route": "app/api/newsletter/route.js", "/api/portal/certificates/route": "app/api/portal/certificates/route.js", "/api/portal/classes/attend/route": "app/api/portal/classes/attend/route.js", "/api/portal/profile/route": "app/api/portal/profile/route.js", "/api/portal/submissions/route": "app/api/portal/submissions/route.js", "/blog/page": "app/blog/page.js", "/checkin/page": "app/checkin/page.js", "/contact/page": "app/contact/page.js", "/events/[slug]/apply/page": "app/events/[slug]/apply/page.js", "/events/[slug]/apply/success/page": "app/events/[slug]/apply/success/page.js", "/events/[slug]/page": "app/events/[slug]/page.js", "/events/page": "app/events/page.js", "/favicon.ico/route": "app/favicon.ico/route.js", "/gallery/page": "app/gallery/page.js", "/m/[code]/route": "app/m/[code]/route.js", "/manifest.webmanifest/route": "app/manifest.webmanifest/route.js", "/notices/page": "app/notices/page.js", "/page": "app/page.js", "/portal/certificates/page": "app/portal/certificates/page.js", "/portal/login/page": "app/portal/login/page.js", "/portal/page": "app/portal/page.js", "/portal/submissions/new/page": "app/portal/submissions/new/page.js", "/portal/submissions/page": "app/portal/submissions/page.js", "/verify-certificate/page": "app/verify-certificate/page.js" };
var AppPathRoutesManifest = { "/_global-error/page": "/_global-error", "/_not-found/page": "/_not-found", "/about/page": "/about", "/admin/applications/page": "/admin/applications", "/admin/automation/page": "/admin/automation", "/admin/checkin/page": "/admin/checkin", "/admin/launch/page": "/admin/launch", "/admin/login/page": "/admin/login", "/admin/monitoring/page": "/admin/monitoring", "/admin/page": "/admin", "/admin/relief/page": "/admin/relief", "/admin/submissions/page": "/admin/submissions", "/admin/whatsapp/page": "/admin/whatsapp", "/api/admin/applications/[id]/status/route": "/api/admin/applications/[id]/status", "/api/admin/applications/bulk/route": "/api/admin/applications/bulk", "/api/admin/applications/route": "/api/admin/applications", "/api/admin/auth/login/route": "/api/admin/auth/login", "/api/admin/auth/logout/route": "/api/admin/auth/logout", "/api/admin/auth/me/route": "/api/admin/auth/me", "/api/admin/automation/call/route": "/api/admin/automation/call", "/api/admin/automation/route": "/api/admin/automation", "/api/admin/automation/settings/route": "/api/admin/automation/settings", "/api/admin/automation/trigger/route": "/api/admin/automation/trigger", "/api/admin/relief/broadcast/route": "/api/admin/relief/broadcast", "/api/admin/relief/respond/route": "/api/admin/relief/respond", "/api/admin/relief/route": "/api/admin/relief", "/api/admin/reports/summary/route": "/api/admin/reports/summary", "/api/admin/settings/whatsapp/route": "/api/admin/settings/whatsapp", "/api/admin/submissions/[id]/status/route": "/api/admin/submissions/[id]/status", "/api/admin/submissions/route": "/api/admin/submissions", "/api/admin/trainees/[id]/call-log/route": "/api/admin/trainees/[id]/call-log", "/api/admin/trainees/[id]/rating/route": "/api/admin/trainees/[id]/rating", "/api/admin/trainees/route": "/api/admin/trainees", "/api/applications/prefill/route": "/api/applications/prefill", "/api/applications/route": "/api/applications", "/api/auth/logout/route": "/api/auth/logout", "/api/auth/magic-link/create/route": "/api/auth/magic-link/create", "/api/auth/otp/send/route": "/api/auth/otp/send", "/api/auth/otp/verify/route": "/api/auth/otp/verify", "/api/auth/session/route": "/api/auth/session", "/api/certificates/verify/route": "/api/certificates/verify", "/api/checkin/route": "/api/checkin", "/api/contact/route": "/api/contact", "/api/health/route": "/api/health", "/api/newsletter/route": "/api/newsletter", "/api/portal/certificates/route": "/api/portal/certificates", "/api/portal/classes/attend/route": "/api/portal/classes/attend", "/api/portal/profile/route": "/api/portal/profile", "/api/portal/submissions/route": "/api/portal/submissions", "/blog/page": "/blog", "/checkin/page": "/checkin", "/contact/page": "/contact", "/events/[slug]/apply/page": "/events/[slug]/apply", "/events/[slug]/apply/success/page": "/events/[slug]/apply/success", "/events/[slug]/page": "/events/[slug]", "/events/page": "/events", "/favicon.ico/route": "/favicon.ico", "/gallery/page": "/gallery", "/m/[code]/route": "/m/[code]", "/manifest.webmanifest/route": "/manifest.webmanifest", "/notices/page": "/notices", "/page": "/", "/portal/certificates/page": "/portal/certificates", "/portal/login/page": "/portal/login", "/portal/page": "/portal", "/portal/submissions/new/page": "/portal/submissions/new", "/portal/submissions/page": "/portal/submissions", "/verify-certificate/page": "/verify-certificate" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
var PagesManifest = { "/500": "pages/500.html" };
process.env.NEXT_BUILD_ID = BuildId;
process.env.OPEN_NEXT_BUILD_ID = "VdwBIu5GB2q7VAlfr8-xy";
process.env.NEXT_PREVIEW_MODE_ID = PrerenderManifest?.preview?.previewModeId;

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/requestHandler.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/patchAsyncStorage.js
var mod = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename = mod._resolveFilename;

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routeMatchMetadata.js
import path2 from "node:path";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/routeCacheKey.js
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
function normalizeLocalePath(pathname, locales) {
  const segment = pathname.split("/", 2)[1]?.toLowerCase();
  const locale = locales?.find((l) => l.toLowerCase() === segment);
  if (!locale) {
    return pathname;
  }
  return pathname.slice(locale.length + 1) || "/";
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routeMatchMetadata.js
var DYNAMIC_SEGMENT_REGEX = /\[{1,2}(\.\.\.)?([^\]]+)\]{1,2}$/;
function getRouteMatchMetadata(route, pathname) {
  const definition = getRouteDefinition(route);
  const params = definition ? getRouteParams(route, normalizePathname(pathname)) : null;
  return {
    match: definition && params !== null ? { definition, params } : void 0
  };
}
function getRouteDefinition(route) {
  const appPaths = Object.keys(AppPathRoutesManifest).filter((appPath) => AppPathRoutesManifest[appPath] === route);
  const appPages = appPaths.filter((appPath) => appPath.endsWith("/page"));
  const appPage = selectAppPageEntry(route, appPages);
  if (appPage) {
    return {
      kind: "APP_PAGE",
      pathname: route,
      page: appPage,
      filename: getFilename(AppPathsManifest[appPage]),
      appPaths: appPages
    };
  }
  const appRoute = appPaths.find((appPath) => appPath.endsWith("/route"));
  if (appRoute) {
    return {
      kind: "APP_ROUTE",
      pathname: route,
      page: appRoute,
      filename: getFilename(AppPathsManifest[appRoute])
    };
  }
  if (PagesManifest[route]) {
    return {
      kind: route === "/api" || route.startsWith("/api/") ? "PAGES_API" : "PAGES",
      pathname: route,
      page: route,
      filename: getFilename(PagesManifest[route])
    };
  }
  return void 0;
}
function getFilename(manifestPath) {
  return manifestPath ? path2.join(NEXT_DIR, "server", manifestPath) : "";
}
function normalizePathname(pathname) {
  const basePath = NextConfig.basePath;
  let normalized = pathname;
  if (basePath && (normalized === basePath || normalized.startsWith(`${basePath}/`))) {
    normalized = normalized.slice(basePath.length) || "/";
  }
  normalized = normalizeLocalePath(normalized, NextConfig.i18n?.locales);
  return normalized !== "/" && normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}
function getRouteParams(route, pathname) {
  const dynamicRoute = RoutesManifest.routes.dynamic.find(({ page }) => page === route);
  if (!dynamicRoute) {
    return pathname === route ? void 0 : null;
  }
  const result = new RegExp(dynamicRoute.regex).exec(pathname);
  if (!result) {
    return null;
  }
  const params = {};
  let group = 1;
  for (const segment of route.split("/")) {
    const dynamicSegment = DYNAMIC_SEGMENT_REGEX.exec(segment);
    if (!dynamicSegment) {
      continue;
    }
    const [, isCatchAll, name] = dynamicSegment;
    const value = result[group++];
    if (value !== void 0) {
      params[name] = isCatchAll ? value.split("/").map(decodeURIComponent) : decodeURIComponent(value);
    }
  }
  return params;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
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
function constructNextUrl(baseUrl, path3) {
  const nextBasePath = NextConfig.basePath ?? "";
  const url = new URL(`${nextBasePath}${path3}`, baseUrl);
  return url.href;
}
function convertRes(res) {
  const statusCode = res.statusCode || 200;
  const headers = parseHeaders(res.getFixedHeaders());
  const isBase64Encoded = isBinaryContentType(headers["content-type"]) || !!headers["content-encoding"];
  const body = new ReadableStream3({
    pull(controller) {
      if (!res._chunks || res._chunks.length === 0) {
        controller.close();
        return;
      }
      controller.enqueue(res._chunks.shift());
    }
  });
  return {
    type: "core",
    statusCode,
    headers,
    body,
    isBase64Encoded
  };
}
function convertToQuery(querystring) {
  if (!querystring)
    return {};
  const query = new URLSearchParams(querystring);
  const queryObject = {};
  for (const key of query.keys()) {
    const queries = query.getAll(key);
    queryObject[key] = queries.length > 1 ? queries : queries[0];
  }
  return queryObject;
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
function fixCacheHeaderForHtmlPages(internalEvent, headers) {
  if (internalEvent.rawPath === "/404" || internalEvent.rawPath === "/500") {
    fixCacheControlForError(headers, internalEvent.rawPath === "/404" ? 404 : 500);
    return;
  }
  const localizedPath = localizePath(internalEvent);
  if (HtmlPages.includes(localizedPath) && !internalEvent.headers["x-middleware-prefetch"]) {
    headers[CACHE_CONTROL_HEADER] = "public, max-age=0, s-maxage=31536000, must-revalidate";
  }
}
function fixSWRCacheHeader(headers) {
  let cacheControl = headers[CACHE_CONTROL_HEADER];
  if (!cacheControl)
    return;
  if (Array.isArray(cacheControl)) {
    cacheControl = cacheControl.join(",");
  }
  if (typeof cacheControl !== "string")
    return;
  headers[CACHE_CONTROL_HEADER] = cacheControl.replace(/\bstale-while-revalidate(?!=)/, "stale-while-revalidate=2592000");
}
function addOpenNextHeader(headers) {
  if (NextConfig.poweredByHeader) {
    headers["X-OpenNext"] = "1";
  }
  if (globalThis.openNextDebug) {
    headers["X-OpenNext-Version"] = globalThis.openNextVersion;
  }
  if (process.env.OPEN_NEXT_REQUEST_ID_HEADER || globalThis.openNextDebug) {
    headers["X-OpenNext-RequestId"] = globalThis.__openNextAls.getStore()?.requestId;
  }
}
async function revalidateIfRequired(host, rawPath, headers, req) {
  if (headers[NEXTJS_CACHE_HEADER] === "STALE") {
    const internalMeta = req?.[/* @__PURE__ */ Symbol.for("NextInternalRequestMeta")];
    const revalidateUrl = internalMeta?._nextDidRewrite ? rawPath.startsWith("/_next/data/") ? `/_next/data/${BuildId}${internalMeta?._nextRewroteUrl}.json` : internalMeta?._nextRewroteUrl : rawPath;
    try {
      const hash = (str) => crypto.createHash("md5").update(str).digest("hex");
      const store = globalThis.__openNextAls.getStore();
      const lastModified = store?.lastModified ?? 0;
      const eTag = `${headers.etag ?? headers.ETag ?? ""}`;
      await globalThis.queue.send({
        MessageBody: {
          host,
          url: revalidateUrl,
          eTag,
          // The time of the entry, so that the queue can skip it when it was revalidated since
          lastModified: store?.entryLastModified ?? lastModified
        },
        MessageDeduplicationId: hash(`${rawPath}-${lastModified}-${eTag}`),
        MessageGroupId: generateMessageGroupId(rawPath)
      });
    } catch (e) {
      error(`Failed to revalidate stale page ${rawPath}`, e);
    }
  }
}
function fixISRHeaders(headers) {
  const sMaxAgeRegex = /s-maxage=(\d+)/;
  const match = headers[CACHE_CONTROL_HEADER]?.match(sMaxAgeRegex);
  const sMaxAge = match ? Number.parseInt(match[1]) : void 0;
  if (!sMaxAge) {
    return;
  }
  if (headers[NEXTJS_CACHE_HEADER] === "REVALIDATED") {
    headers[CACHE_CONTROL_HEADER] = NO_STORE_CACHE_CONTROL;
    return;
  }
  const _lastModified = globalThis.__openNextAls.getStore()?.lastModified ?? 0;
  if (headers[NEXTJS_CACHE_HEADER] === "HIT" && _lastModified > 0) {
    debug("cache-control", headers[CACHE_CONTROL_HEADER], _lastModified, Date.now());
    if (sMaxAge && sMaxAge !== 31536e3) {
      const age = Math.round((Date.now() - _lastModified) / 1e3);
      const remainingTtl = Math.max(sMaxAge - age, 1);
      headers[CACHE_CONTROL_HEADER] = `s-maxage=${remainingTtl}, stale-while-revalidate=2592000`;
    }
  }
  if (headers[NEXTJS_CACHE_HEADER] !== "STALE")
    return;
  headers[CACHE_CONTROL_HEADER] = "s-maxage=2, stale-while-revalidate=2592000";
}
function createServerResponse(routingResult, headers, responseStream) {
  const internalEvent = routingResult.internalEvent;
  return new OpenNextNodeResponse((_headers) => {
    fixCacheHeaderForHtmlPages(internalEvent, _headers);
    fixSWRCacheHeader(_headers);
    addOpenNextHeader(_headers);
    fixISRHeaders(_headers);
  }, async (_headers) => {
    await revalidateIfRequired(internalEvent.headers.host, internalEvent.rawPath, _headers);
    await invalidateCDNOnRequest(routingResult, _headers);
  }, responseStream, headers, routingResult.rewriteStatusCode);
}
async function invalidateCDNOnRequest(params, headers) {
  const { internalEvent, resolvedRoutes, initialURL } = params;
  const initialPath = new URL(initialURL).pathname;
  const isIsrRevalidation = internalEvent.headers[ISR_HEADER] === "1";
  if (!isIsrRevalidation && headers[NEXTJS_CACHE_HEADER] === "REVALIDATED") {
    await globalThis.cdnInvalidationHandler.invalidatePaths([
      {
        initialPath,
        rawPath: internalEvent.rawPath,
        resolvedRoutes
      }
    ]);
  }
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_stream();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/utils/cache.js
init_logger();

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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_util();
init_stream();
init_utils();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);

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

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/util.js
init_logger();
import NextServer from "next/dist/server/next-server.js";

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/require-hooks.js
init_logger();
var mod2 = (init_node_module(), __toCommonJS(node_module_exports));
var resolveFilename2 = mod2._resolveFilename;

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/revalidate.js
init_logger();
var REMOTE_REVALIDATE_TIMEOUT_MS = 3e4;
function resolveRoute(urlPath) {
  const pathname = urlPath.split(/[?#]/)[0];
  return staticRouteMatcher(pathname)[0] ?? dynamicRouteMatcher(pathname)[0];
}
function getRouteTemplates(route) {
  if (route.type === "page") {
    return [`pages${route.route === "/" ? "/index" : route.route}`];
  }
  return Object.entries(AppPathRoutesManifest).filter(([, path3]) => path3 === route.route).map(([appPath]) => `app${appPath}`);
}
function isServedByCurrentFunction(route) {
  const functions = globalThis.openNextConfig?.functions ?? {};
  if (!route || Object.keys(functions).length === 0) {
    return true;
  }
  const templates = getRouteTemplates(route);
  const owner = Object.entries(functions).find(([, fn]) => fn.routes?.some((r) => templates.includes(r)))?.[0];
  return owner === (globalThis.fnName || void 0);
}
async function revalidateRemote({ urlPath, headers, revalidateHeaders, opts }) {
  const host = globalThis.__openNextAls.getStore()?.host;
  if (!host) {
    throw new Error(`Unable to revalidate ${urlPath}: unknown host`);
  }
  const requestHeaders = new Headers();
  for (const [key, value] of Object.entries(headers ?? revalidateHeaders ?? {})) {
    if (value === void 0)
      continue;
    for (const v of Array.isArray(value) ? value : [value]) {
      requestHeaders.append(key, v);
    }
  }
  const url = `https://${host}${urlPath}`;
  debug("Revalidating page served by another function", { url });
  const res = await globalThis.internalFetch(url, {
    method: "HEAD",
    headers: requestHeaders,
    redirect: "manual",
    signal: AbortSignal.timeout(REMOTE_REVALIDATE_TIMEOUT_MS)
  });
  if (res.headers.get(NEXTJS_CACHE_HEADER)?.toUpperCase() !== "REVALIDATED" && res.status !== 200 && !(res.status === 404 && opts.unstable_onlyGenerated)) {
    throw new Error(`Invalid response ${res.status}`);
  }
}
function createRevalidate(revalidateInProcess) {
  return async (args) => {
    const route = resolveRoute(args.urlPath);
    if (!isServedByCurrentFunction(route)) {
      return revalidateRemote(args);
    }
    const store = globalThis.__openNextAls.getStore();
    const renderInProcess = () => revalidateInProcess(args);
    await (store ? globalThis.__openNextAls.run({
      ...store,
      lastModified: void 0,
      entryLastModified: void 0,
      writtenTags: /* @__PURE__ */ new Set(),
      requestCache: new RequestCache()
    }, renderInProcess) : renderInProcess());
    const path3 = args.urlPath.split(/[?#]/)[0];
    try {
      await globalThis.cdnInvalidationHandler?.invalidatePaths([
        {
          initialPath: path3,
          rawPath: path3,
          resolvedRoutes: route ? [route] : [{ route: path3, type: "page" }]
        }
      ]);
    } catch (e) {
      error(`Failed to invalidate ${path3} in the CDN`, e);
    }
  };
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/util.js
var cacheHandlerPath = __require.resolve("./cache.cjs");
var composableCacheHandlerPath = __require.resolve("./composable-cache.cjs");
var nextServer = new NextServer.default({
  conf: {
    ...NextConfig,
    // Next.js compression should be disabled because of a bug in the bundled
    // `compression` package — https://github.com/vercel/next.js/issues/11669
    compress: false,
    // By default, Next.js uses local disk to store ISR cache. We will use
    // our own cache handler to store the cache on S3.
    //#override stableIncrementalCache
    cacheHandler: cacheHandlerPath,
    cacheMaxMemorySize: 0,
    // We need to disable memory cache
    //#endOverride
    // Next.js 16 promoted `cacheHandlers` out of `experimental` to a top-level
    // config key. At runtime `route-module.js#loadCustomCacheHandlers` reads
    // `nextConfig.cacheHandlers` (top-level) — the nested `experimental` copy
    // below is ignored on Next >= 16, so the composable ("use cache") handler
    // must also be registered here or Next falls back to its in-memory default
    // and composable entries never reach the incremental cache override.
    // Older Next versions ignore this unknown top-level key and read the
    // `experimental` copy instead; setting both is safe across versions.
    //#override topLevelComposableCache
    cacheHandlers: {
      default: composableCacheHandlerPath
    },
    //#endOverride
    experimental: {
      ...NextConfig.experimental,
      // This uses the request.headers.host as the URL
      // https://github.com/vercel/next.js/blob/canary/packages/next/src/server/next-server.ts#L1749-L1754
      //#override trustHostHeader
      trustHostHeader: true,
      //#endOverride
      //#override composableCache
      cacheHandlers: {
        default: composableCacheHandlerPath
      }
      //#endOverride
    }
  },
  customServer: false,
  dev: false,
  dir: __dirname
});
if (typeof nextServer.revalidate === "function") {
  nextServer.revalidate = createRevalidate(nextServer.revalidate.bind(nextServer));
}
var routesLoaded = false;
globalThis.__next_route_preloader = async (stage) => {
  if (routesLoaded) {
    return;
  }
  const thisFunction = globalThis.fnName ? globalThis.openNextConfig.functions[globalThis.fnName] : globalThis.openNextConfig.default;
  const routePreloadingBehavior = thisFunction?.routePreloadingBehavior ?? "none";
  if (routePreloadingBehavior === "none") {
    routesLoaded = true;
    return;
  }
  if (!("unstable_preloadEntries" in nextServer)) {
    debug("The current version of Next.js does not support route preloading. Skipping route preloading.");
    routesLoaded = true;
    return;
  }
  if (stage === "waitUntil" && routePreloadingBehavior === "withWaitUntil") {
    const waitUntil = globalThis.__openNextAls.getStore()?.waitUntil;
    if (!waitUntil) {
      error("You've tried to use the 'withWaitUntil' route preloading behavior, but the 'waitUntil' function is not available.");
      routesLoaded = true;
      return;
    }
    debug("Preloading entries with waitUntil");
    waitUntil?.(nextServer.unstable_preloadEntries());
    routesLoaded = true;
  } else if (stage === "start" && routePreloadingBehavior === "onStart" || stage === "warmerEvent" && routePreloadingBehavior === "onWarmerEvent" || stage === "onDemand") {
    const startTimestamp = Date.now();
    debug("Preloading entries");
    await nextServer.unstable_preloadEntries();
    debug("Preloading entries took", Date.now() - startTimestamp, "ms");
    routesLoaded = true;
  }
};
var requestHandler = (metadata) => "getRequestHandlerWithMetadata" in nextServer ? nextServer.getRequestHandlerWithMetadata(metadata) : nextServer.getRequestHandler();

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/requestHandler.js
globalThis.__openNextAls = new AsyncLocalStorage();
function splitRoutingHeaders(eventHeaders) {
  const requestHeaders = {};
  const middlewareHeaders = {};
  const nextConfigHeaders = {};
  for (const [key, value] of Object.entries(eventHeaders)) {
    if (key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
      middlewareHeaders[key.slice(MIDDLEWARE_HEADER_PREFIX_LEN)] = value;
    } else if (key.startsWith(NEXT_CONFIG_HEADER_PREFIX)) {
      nextConfigHeaders[key.slice(NEXT_CONFIG_HEADER_PREFIX_LEN)] = value;
    } else {
      requestHeaders[key] = value;
    }
  }
  return {
    requestHeaders: { ...requestHeaders, ...middlewareHeaders },
    // The routing already dropped the `next.config` headers that must not take precedence.
    responseHeaders: { ...middlewareHeaders, ...nextConfigHeaders }
  };
}
async function openNextHandler(internalEvent, options) {
  const initialHeaders = internalEvent.headers;
  const requestId = globalThis.openNextConfig.middleware?.external ? internalEvent.headers[INTERNAL_EVENT_REQUEST_ID] : Math.random().toString(36);
  return runWithOpenNextRequestContext({
    isISRRevalidation: initialHeaders[ISR_HEADER] === "1",
    waitUntil: options?.waitUntil,
    requestId
  }, async () => {
    await globalThis.__next_route_preloader("waitUntil");
    if (initialHeaders["x-forwarded-host"]) {
      initialHeaders.host = initialHeaders["x-forwarded-host"];
    }
    const requestStore = globalThis.__openNextAls.getStore();
    if (requestStore) {
      requestStore.host = initialHeaders.host;
    }
    debug("internalEvent", internalEvent);
    const internalHeaders = {
      initialPath: initialHeaders[INTERNAL_HEADER_INITIAL_URL] ?? internalEvent.rawPath,
      resolvedRoutes: initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES] ? JSON.parse(initialHeaders[INTERNAL_HEADER_RESOLVED_ROUTES]) : [],
      rewriteStatusCode: Number.parseInt(initialHeaders[INTERNAL_HEADER_REWRITE_STATUS_CODE])
    };
    let routingResult = {
      internalEvent,
      isExternalRewrite: false,
      origin: false,
      isISR: false,
      initialURL: internalEvent.url,
      ...internalHeaders
    };
    let requestHeaders = {};
    let overwrittenResponseHeaders = {};
    if (!("type" in routingResult)) {
      const split = splitRoutingHeaders(routingResult.internalEvent.headers);
      requestHeaders = split.requestHeaders;
      overwrittenResponseHeaders = split.responseHeaders;
      routingResult = {
        ...routingResult,
        internalEvent: {
          ...routingResult.internalEvent,
          headers: requestHeaders
        }
      };
    }
    if ("isExternalRewrite" in routingResult && routingResult.isExternalRewrite === true) {
      try {
        routingResult = await globalThis.proxyExternalRequest.proxy(routingResult.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        routingResult = {
          internalEvent: {
            type: "core",
            rawPath: "/500",
            method: "GET",
            headers: {},
            url: constructNextUrl(internalEvent.url, "/500"),
            query: {},
            cookies: {},
            remoteAddress: ""
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          isISR: false,
          origin: false,
          initialURL: internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    if ("type" in routingResult) {
      if (options?.streamCreator) {
        const response = createServerResponse({
          internalEvent,
          isExternalRewrite: false,
          isISR: false,
          resolvedRoutes: [],
          origin: false,
          initialURL: internalEvent.url
        }, routingResult.headers, options.streamCreator);
        response.statusCode = routingResult.statusCode;
        response.flushHeaders();
        const [bodyToConsume, bodyToReturn] = routingResult.body.tee();
        for await (const chunk of bodyToConsume) {
          response.write(chunk);
        }
        response.end();
        routingResult.body = bodyToReturn;
      }
      return routingResult;
    }
    const preprocessedEvent = routingResult.internalEvent;
    debug("preprocessedEvent", preprocessedEvent);
    const { search, pathname, hash } = new URL(preprocessedEvent.url);
    const reqProps = {
      method: preprocessedEvent.method,
      url: `${pathname}${search}${hash}`,
      //WORKAROUND: We pass this header to the serverless function to mimic a prefetch request which will not trigger revalidation since we handle revalidation differently
      // There is 3 way we can handle revalidation:
      // 1. We could just let the revalidation go as normal, but due to race conditions the revalidation will be unreliable
      // 2. We could alter the lastModified time of our cache to make next believe that the cache is fresh, but this could cause issues with stale data since the cdn will cache the stale data as if it was fresh
      // 3. OUR CHOICE: We could pass a purpose prefetch header to the serverless function to make next believe that the request is a prefetch request and not trigger revalidation (This could potentially break in the future if next changes the behavior of prefetch requests)
      headers: {
        ...requestHeaders
      },
      body: preprocessedEvent.body,
      remoteAddress: preprocessedEvent.remoteAddress
    };
    const mergeHeadersPriority = globalThis.openNextConfig.dangerous?.headersAndCookiesPriority ? globalThis.openNextConfig.dangerous.headersAndCookiesPriority(preprocessedEvent) : "middleware";
    const store = globalThis.__openNextAls.getStore();
    if (store) {
      store.mergeHeadersPriority = mergeHeadersPriority;
    }
    const req = new IncomingMessage(reqProps);
    const res = createServerResponse(routingResult, overwrittenResponseHeaders, options?.streamCreator);
    await processRequest(req, res, routingResult);
    const { statusCode, headers: responseHeaders, isBase64Encoded, body } = convertRes(res);
    const internalResult = {
      type: internalEvent.type,
      statusCode,
      headers: responseHeaders,
      body,
      isBase64Encoded
    };
    return internalResult;
  });
}
async function processRequest(req, res, routingResult) {
  delete req.body;
  const initialURL = new URL(
    // We always assume that only the routing layer can set this header.
    routingResult.internalEvent.headers[INTERNAL_HEADER_INITIAL_URL] ?? routingResult.initialURL
  );
  let invokeStatus;
  if (routingResult.internalEvent.rawPath === "/500") {
    invokeStatus = 500;
  } else if (routingResult.internalEvent.rawPath === "/404") {
    invokeStatus = 404;
  }
  const requestMetadata = {
    isNextDataReq: routingResult.internalEvent.query.__nextDataReq === "1",
    initURL: routingResult.initialURL,
    initQuery: convertToQuery(initialURL.search),
    initProtocol: initialURL.protocol,
    defaultLocale: NextConfig.i18n?.defaultLocale,
    locale: routingResult.locale,
    middlewareInvoke: false,
    // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
    invokePath: routingResult.internalEvent.rawPath,
    invokeQuery: routingResult.internalEvent.query,
    // invokeStatus is only used for error pages
    invokeStatus
  };
  try {
    req.url = initialURL.pathname + initialURL.search;
    await requestHandler(requestMetadata)(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, requestMetadata);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
var MAX_RENDER_ATTEMPTS = 6;
async function handleNoFallbackError(req, res, routingResult, metadata, index = 1) {
  if (index >= MAX_RENDER_ATTEMPTS) {
    await tryRenderError("500", res, routingResult.internalEvent);
    return;
  }
  if (index >= routingResult.resolvedRoutes.length) {
    await tryRenderError("404", res, routingResult.internalEvent);
    return;
  }
  const route = routingResult.resolvedRoutes[index].route;
  try {
    let routeMatchMetadata = {};
    if (compareSemver(globalThis.nextVersion, ">=", "16.4.0")) {
      try {
        routeMatchMetadata = getRouteMatchMetadata(route, routingResult.internalEvent.rawPath);
      } catch (e) {
        if (!(e instanceof URIError)) {
          throw e;
        }
        await tryRenderError("400", res, routingResult.internalEvent);
        return;
      }
    }
    await requestHandler({
      ...routingResult,
      invokeOutput: route,
      ...metadata,
      // Must come after `metadata` to override the stale `match` of the previous attempt.
      ...routeMatchMetadata
    })(req, res);
  } catch (e) {
    if (e.constructor.name === "NoFallbackError") {
      await handleNoFallbackError(req, res, routingResult, metadata, index + 1);
    } else {
      error("NextJS request failed.", e);
      await tryRenderError("500", res, routingResult.internalEvent);
    }
  }
}
async function tryRenderError(type, res, internalEvent) {
  try {
    const _req = new IncomingMessage({
      method: "GET",
      url: `/${type}`,
      headers: internalEvent.headers,
      body: internalEvent.body,
      remoteAddress: internalEvent.remoteAddress
    });
    const requestMetadata = {
      // By setting invokePath and invokeQuery we can bypass some of the routing logic in Next.js
      invokePath: `/${type}`,
      invokeStatus: Number(type),
      middlewareInvoke: false
    };
    await requestHandler(requestMetadata)(_req, res);
  } catch (e) {
    error("NextJS request failed.", e);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      message: "Server failed to respond.",
      details: e
    }, null, 2));
  }
}

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
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_node(), cloudflare_node_exports));
  return m_1.default;
}
async function resolveTagCache(tagCache) {
  if (typeof tagCache === "function") {
    return tagCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy(), dummy_exports));
  return m_1.default;
}
async function resolveQueue(queue) {
  if (typeof queue === "function") {
    return queue();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy2(), dummy_exports2));
  return m_1.default;
}
async function resolveIncrementalCache(incrementalCache) {
  if (typeof incrementalCache === "function") {
    return incrementalCache();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy3(), dummy_exports3));
  return m_1.default;
}
async function resolveAssetResolver(assetResolver) {
  if (typeof assetResolver === "function") {
    return assetResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy4(), dummy_exports4));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}
async function resolveCdnInvalidation(cdnInvalidation) {
  if (typeof cdnInvalidation === "function") {
    return cdnInvalidation();
  }
  const m_1 = await Promise.resolve().then(() => (init_dummy5(), dummy_exports5));
  return m_1.default;
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/core/createMainHandler.js
async function createMainHandler() {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  const thisFunction = globalThis.fnName ? config.functions[globalThis.fnName] : config.default;
  globalThis.serverId = generateUniqueId();
  globalThis.openNextConfig = config;
  await globalThis.__next_route_preloader("start");
  globalThis.queue = await resolveQueue(thisFunction.override?.queue);
  globalThis.incrementalCache = await resolveIncrementalCache(thisFunction.override?.incrementalCache);
  globalThis.tagCache = await resolveTagCache(thisFunction.override?.tagCache);
  if (config.middleware?.external !== true) {
    globalThis.assetResolver = await resolveAssetResolver(globalThis.openNextConfig.middleware?.assetResolver);
  }
  globalThis.proxyExternalRequest = await resolveProxyRequest(thisFunction.override?.proxyExternalRequest);
  globalThis.cdnInvalidationHandler = await resolveCdnInvalidation(thisFunction.override?.cdnInvalidation);
  const converter2 = await resolveConverter(thisFunction.override?.converter);
  const { wrapper, name } = await resolveWrapper(thisFunction.override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(openNextHandler, converter2);
}

// ../node_modules/.pnpm/@opennextjs+aws@4.2.0_next@16.4.6_@babel+core@7.29.13_supports-color@7.2.0__@types+node_93af2875b27fc0abb94a6eb39ccbe36d/node_modules/@opennextjs/aws/dist/adapters/server-adapter.js
setNodeEnv();
setNextjsServerWorkingDirectory();
globalThis.internalFetch = fetch;
var handler2 = await createMainHandler();
function setNextjsServerWorkingDirectory() {
  process.chdir(__dirname);
}
export {
  handler2 as handler
};
