var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_index_001 = __commonJS({
  "assets/index-4cfae3e7.js"(exports, module) {
    (function polyfill() {
      const relList = document.createElement("link").relList;
      if (relList && relList.supports && relList.supports("modulepreload")) {
        return;
      }
      for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
      }
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") {
            continue;
          }
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload")
              processPreload(node);
          }
        }
      }).observe(document, { childList: true, subtree: true });
      function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
          fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
          fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials")
          fetchOpts.credentials = "include";
        else if (link.crossOrigin === "anonymous")
          fetchOpts.credentials = "omit";
        else
          fetchOpts.credentials = "same-origin";
        return fetchOpts;
      }
      function processPreload(link) {
        if (link.ep)
          return;
        link.ep = true;
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
      }
    })();
    function makeMap(str, expectsLowerCase) {
      const map = /* @__PURE__ */ Object.create(null);
      const list = str.split(",");
      for (let i = 0; i < list.length; i++) {
        map[list[i]] = true;
      }
      return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
    }
    function normalizeStyle(value) {
      if (isArray$2(value)) {
        const res = {};
        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
          if (normalized) {
            for (const key in normalized) {
              res[key] = normalized[key];
            }
          }
        }
        return res;
      } else if (isString(value)) {
        return value;
      } else if (isObject$1(value)) {
        return value;
      }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:([^]+)/;
    const styleCommentRE = /\/\*.*?\*\//gs;
    function parseStringStyle(cssText) {
      const ret = {};
      cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
        if (item) {
          const tmp = item.split(propertyDelimiterRE);
          tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
        }
      });
      return ret;
    }
    function normalizeClass(value) {
      let res = "";
      if (isString(value)) {
        res = value;
      } else if (isArray$2(value)) {
        for (let i = 0; i < value.length; i++) {
          const normalized = normalizeClass(value[i]);
          if (normalized) {
            res += normalized + " ";
          }
        }
      } else if (isObject$1(value)) {
        for (const name in value) {
          if (value[name]) {
            res += name + " ";
          }
        }
      }
      return res.trim();
    }
    const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
    const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
    function includeBooleanAttr(value) {
      return !!value || value === "";
    }
    const toDisplayString = (val) => {
      return isString(val) ? val : val == null ? "" : isArray$2(val) || isObject$1(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
    };
    const replacer = (_key, val) => {
      if (val && val.__v_isRef) {
        return replacer(_key, val.value);
      } else if (isMap(val)) {
        return {
          [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
            entries[`${key} =>`] = val2;
            return entries;
          }, {})
        };
      } else if (isSet(val)) {
        return {
          [`Set(${val.size})`]: [...val.values()]
        };
      } else if (isObject$1(val) && !isArray$2(val) && !isPlainObject(val)) {
        return String(val);
      }
      return val;
    };
    const EMPTY_OBJ = {};
    const EMPTY_ARR = [];
    const NOOP = () => {
    };
    const NO = () => false;
    const onRE = /^on[^a-z]/;
    const isOn = (key) => onRE.test(key);
    const isModelListener = (key) => key.startsWith("onUpdate:");
    const extend = Object.assign;
    const remove = (arr, el) => {
      const i = arr.indexOf(el);
      if (i > -1) {
        arr.splice(i, 1);
      }
    };
    const hasOwnProperty$5 = Object.prototype.hasOwnProperty;
    const hasOwn = (val, key) => hasOwnProperty$5.call(val, key);
    const isArray$2 = Array.isArray;
    const isMap = (val) => toTypeString(val) === "[object Map]";
    const isSet = (val) => toTypeString(val) === "[object Set]";
    const isFunction$1 = (val) => typeof val === "function";
    const isString = (val) => typeof val === "string";
    const isSymbol = (val) => typeof val === "symbol";
    const isObject$1 = (val) => val !== null && typeof val === "object";
    const isPromise = (val) => {
      return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
    };
    const objectToString$1 = Object.prototype.toString;
    const toTypeString = (value) => objectToString$1.call(value);
    const toRawType = (value) => {
      return toTypeString(value).slice(8, -1);
    };
    const isPlainObject = (val) => toTypeString(val) === "[object Object]";
    const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
    const isReservedProp = /* @__PURE__ */ makeMap(
      // the leading comma is intentional so empty string "" is also included
      ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
    );
    const cacheStringFunction = (fn) => {
      const cache = /* @__PURE__ */ Object.create(null);
      return (str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };
    const camelizeRE = /-(\w)/g;
    const camelize = cacheStringFunction((str) => {
      return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
    });
    const hyphenateRE = /\B([A-Z])/g;
    const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
    const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
    const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const invokeArrayFns = (fns, arg) => {
      for (let i = 0; i < fns.length; i++) {
        fns[i](arg);
      }
    };
    const def = (obj, key, value) => {
      Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value
      });
    };
    const looseToNumber = (val) => {
      const n = parseFloat(val);
      return isNaN(n) ? val : n;
    };
    const toNumber = (val) => {
      const n = isString(val) ? Number(val) : NaN;
      return isNaN(n) ? val : n;
    };
    let _globalThis;
    const getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
    };
    let activeEffectScope;
    class EffectScope {
      constructor(detached = false) {
        this.detached = detached;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
          this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
      }
      get active() {
        return this._active;
      }
      run(fn) {
        if (this._active) {
          const currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      on() {
        activeEffectScope = this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
      off() {
        activeEffectScope = this.parent;
      }
      stop(fromParent) {
        if (this._active) {
          let i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          if (!this.detached && this.parent && !fromParent) {
            const last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = void 0;
          this._active = false;
        }
      }
    }
    function effectScope(detached) {
      return new EffectScope(detached);
    }
    function recordEffectScope(effect, scope = activeEffectScope) {
      if (scope && scope.active) {
        scope.effects.push(effect);
      }
    }
    function getCurrentScope() {
      return activeEffectScope;
    }
    const createDep = (effects) => {
      const dep = new Set(effects);
      dep.w = 0;
      dep.n = 0;
      return dep;
    };
    const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    const newTracked = (dep) => (dep.n & trackOpBit) > 0;
    const initDepMarkers = ({ deps }) => {
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].w |= trackOpBit;
        }
      }
    };
    const finalizeDepMarkers = (effect) => {
      const { deps } = effect;
      if (deps.length) {
        let ptr = 0;
        for (let i = 0; i < deps.length; i++) {
          const dep = deps[i];
          if (wasTracked(dep) && !newTracked(dep)) {
            dep.delete(effect);
          } else {
            deps[ptr++] = dep;
          }
          dep.w &= ~trackOpBit;
          dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
      }
    };
    const targetMap = /* @__PURE__ */ new WeakMap();
    let effectTrackDepth = 0;
    let trackOpBit = 1;
    const maxMarkerBits = 30;
    let activeEffect;
    const ITERATE_KEY = Symbol("");
    const MAP_KEY_ITERATE_KEY = Symbol("");
    class ReactiveEffect {
      constructor(fn, scheduler = null, scope) {
        this.fn = fn;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
      }
      run() {
        if (!this.active) {
          return this.fn();
        }
        let parent = activeEffect;
        let lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = void 0;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
      stop() {
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    }
    function cleanupEffect(effect) {
      const { deps } = effect;
      if (deps.length) {
        for (let i = 0; i < deps.length; i++) {
          deps[i].delete(effect);
        }
        deps.length = 0;
      }
    }
    let shouldTrack = true;
    const trackStack = [];
    function pauseTracking() {
      trackStack.push(shouldTrack);
      shouldTrack = false;
    }
    function resetTracking() {
      const last = trackStack.pop();
      shouldTrack = last === void 0 ? true : last;
    }
    function track(target, type, key) {
      if (shouldTrack && activeEffect) {
        let depsMap = targetMap.get(target);
        if (!depsMap) {
          targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
          depsMap.set(key, dep = createDep());
        }
        trackEffects(dep);
      }
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
      let shouldTrack2 = false;
      if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
          dep.n |= trackOpBit;
          shouldTrack2 = !wasTracked(dep);
        }
      } else {
        shouldTrack2 = !dep.has(activeEffect);
      }
      if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
      }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
      const depsMap = targetMap.get(target);
      if (!depsMap) {
        return;
      }
      let deps = [];
      if (type === "clear") {
        deps = [...depsMap.values()];
      } else if (key === "length" && isArray$2(target)) {
        const newLength = Number(newValue);
        depsMap.forEach((dep, key2) => {
          if (key2 === "length" || key2 >= newLength) {
            deps.push(dep);
          }
        });
      } else {
        if (key !== void 0) {
          deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!isArray$2(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            } else if (isIntegerKey(key)) {
              deps.push(depsMap.get("length"));
            }
            break;
          case "delete":
            if (!isArray$2(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
              if (isMap(target)) {
                deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
              }
            }
            break;
          case "set":
            if (isMap(target)) {
              deps.push(depsMap.get(ITERATE_KEY));
            }
            break;
        }
      }
      if (deps.length === 1) {
        if (deps[0]) {
          {
            triggerEffects(deps[0]);
          }
        }
      } else {
        const effects = [];
        for (const dep of deps) {
          if (dep) {
            effects.push(...dep);
          }
        }
        {
          triggerEffects(createDep(effects));
        }
      }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
      const effects = isArray$2(dep) ? dep : [...dep];
      for (const effect of effects) {
        if (effect.computed) {
          triggerEffect(effect);
        }
      }
      for (const effect of effects) {
        if (!effect.computed) {
          triggerEffect(effect);
        }
      }
    }
    function triggerEffect(effect, debuggerEventExtraInfo) {
      if (effect !== activeEffect || effect.allowRecurse) {
        if (effect.scheduler) {
          effect.scheduler();
        } else {
          effect.run();
        }
      }
    }
    const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(
      /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
    );
    const get$1 = /* @__PURE__ */ createGetter();
    const shallowGet = /* @__PURE__ */ createGetter(false, true);
    const readonlyGet = /* @__PURE__ */ createGetter(true);
    const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
    function createArrayInstrumentations() {
      const instrumentations = {};
      ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
        instrumentations[key] = function(...args) {
          const arr = toRaw(this);
          for (let i = 0, l = this.length; i < l; i++) {
            track(arr, "get", i + "");
          }
          const res = arr[key](...args);
          if (res === -1 || res === false) {
            return arr[key](...args.map(toRaw));
          } else {
            return res;
          }
        };
      });
      ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
        instrumentations[key] = function(...args) {
          pauseTracking();
          const res = toRaw(this)[key].apply(this, args);
          resetTracking();
          return res;
        };
      });
      return instrumentations;
    }
    function hasOwnProperty$4(key) {
      const obj = toRaw(this);
      track(obj, "has", key);
      return obj.hasOwnProperty(key);
    }
    function createGetter(isReadonly2 = false, shallow = false) {
      return function get2(target, key, receiver) {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_isShallow") {
          return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
          return target;
        }
        const targetIsArray = isArray$2(target);
        if (!isReadonly2) {
          if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
            return Reflect.get(arrayInstrumentations, key, receiver);
          }
          if (key === "hasOwnProperty") {
            return hasOwnProperty$4;
          }
        }
        const res = Reflect.get(target, key, receiver);
        if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
          return res;
        }
        if (!isReadonly2) {
          track(target, "get", key);
        }
        if (shallow) {
          return res;
        }
        if (isRef(res)) {
          return targetIsArray && isIntegerKey(key) ? res : res.value;
        }
        if (isObject$1(res)) {
          return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
      };
    }
    const set$1 = /* @__PURE__ */ createSetter();
    const shallowSet = /* @__PURE__ */ createSetter(true);
    function createSetter(shallow = false) {
      return function set2(target, key, value, receiver) {
        let oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
          return false;
        }
        if (!shallow) {
          if (!isShallow(value) && !isReadonly(value)) {
            oldValue = toRaw(oldValue);
            value = toRaw(value);
          }
          if (!isArray$2(target) && isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
          }
        }
        const hadKey = isArray$2(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const result = Reflect.set(target, key, value, receiver);
        if (target === toRaw(receiver)) {
          if (!hadKey) {
            trigger(target, "add", key, value);
          } else if (hasChanged(value, oldValue)) {
            trigger(target, "set", key, value);
          }
        }
        return result;
      };
    }
    function deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      target[key];
      const result = Reflect.deleteProperty(target, key);
      if (result && hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    function has$1(target, key) {
      const result = Reflect.has(target, key);
      if (!isSymbol(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
      }
      return result;
    }
    function ownKeys(target) {
      track(target, "iterate", isArray$2(target) ? "length" : ITERATE_KEY);
      return Reflect.ownKeys(target);
    }
    const mutableHandlers = {
      get: get$1,
      set: set$1,
      deleteProperty,
      has: has$1,
      ownKeys
    };
    const readonlyHandlers = {
      get: readonlyGet,
      set(target, key) {
        return true;
      },
      deleteProperty(target, key) {
        return true;
      }
    };
    const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
      get: shallowGet,
      set: shallowSet
    });
    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get(target, key, isReadonly2 = false, isShallow2 = false) {
      target = target[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
      }
      const { has: has2 } = getProto(rawTarget);
      const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
      if (has2.call(rawTarget, key)) {
        return wrap(target.get(key));
      } else if (has2.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
      } else if (target !== rawTarget) {
        target.get(key);
      }
    }
    function has(key, isReadonly2 = false) {
      const target = this[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      const rawTarget = toRaw(target);
      const rawKey = toRaw(key);
      if (!isReadonly2) {
        if (key !== rawKey) {
          track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
      }
      return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly2 = false) {
      target = target[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
      return Reflect.get(target, "size", target);
    }
    function add(value) {
      value = toRaw(value);
      const target = toRaw(this);
      const proto = getProto(target);
      const hadKey = proto.has.call(target, value);
      if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
      }
      return this;
    }
    function set(key, value) {
      value = toRaw(value);
      const target = toRaw(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
      }
      const oldValue = get2.call(target, key);
      target.set(key, value);
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value);
      }
      return this;
    }
    function deleteEntry(key) {
      const target = toRaw(this);
      const { has: has2, get: get2 } = getProto(target);
      let hadKey = has2.call(target, key);
      if (!hadKey) {
        key = toRaw(key);
        hadKey = has2.call(target, key);
      }
      get2 ? get2.call(target, key) : void 0;
      const result = target.delete(key);
      if (hadKey) {
        trigger(target, "delete", key, void 0);
      }
      return result;
    }
    function clear() {
      const target = toRaw(this);
      const hadItems = target.size !== 0;
      const result = target.clear();
      if (hadItems) {
        trigger(target, "clear", void 0, void 0);
      }
      return result;
    }
    function createForEach(isReadonly2, isShallow2) {
      return function forEach(callback, thisArg) {
        const observed = this;
        const target = observed[
          "__v_raw"
          /* ReactiveFlags.RAW */
        ];
        const rawTarget = toRaw(target);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach((value, key) => {
          return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
      };
    }
    function createIterableMethod(method, isReadonly2, isShallow2) {
      return function(...args) {
        const target = this[
          "__v_raw"
          /* ReactiveFlags.RAW */
        ];
        const rawTarget = toRaw(target);
        const targetIsMap = isMap(rawTarget);
        const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        const isKeyOnly = method === "keys" && targetIsMap;
        const innerIterator = target[method](...args);
        const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return {
          // iterator protocol
          next() {
            const { value, done } = innerIterator.next();
            return done ? { value, done } : {
              value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
              done
            };
          },
          // iterable protocol
          [Symbol.iterator]() {
            return this;
          }
        };
      };
    }
    function createReadonlyMethod(type) {
      return function(...args) {
        return type === "delete" ? false : this;
      };
    }
    function createInstrumentations() {
      const mutableInstrumentations2 = {
        get(key) {
          return get(this, key);
        },
        get size() {
          return size(this);
        },
        has,
        add,
        set,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, false)
      };
      const shallowInstrumentations2 = {
        get(key) {
          return get(this, key, false, true);
        },
        get size() {
          return size(this);
        },
        has,
        add,
        set,
        delete: deleteEntry,
        clear,
        forEach: createForEach(false, true)
      };
      const readonlyInstrumentations2 = {
        get(key) {
          return get(this, key, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has.call(this, key, true);
        },
        add: createReadonlyMethod(
          "add"
          /* TriggerOpTypes.ADD */
        ),
        set: createReadonlyMethod(
          "set"
          /* TriggerOpTypes.SET */
        ),
        delete: createReadonlyMethod(
          "delete"
          /* TriggerOpTypes.DELETE */
        ),
        clear: createReadonlyMethod(
          "clear"
          /* TriggerOpTypes.CLEAR */
        ),
        forEach: createForEach(true, false)
      };
      const shallowReadonlyInstrumentations2 = {
        get(key) {
          return get(this, key, true, true);
        },
        get size() {
          return size(this, true);
        },
        has(key) {
          return has.call(this, key, true);
        },
        add: createReadonlyMethod(
          "add"
          /* TriggerOpTypes.ADD */
        ),
        set: createReadonlyMethod(
          "set"
          /* TriggerOpTypes.SET */
        ),
        delete: createReadonlyMethod(
          "delete"
          /* TriggerOpTypes.DELETE */
        ),
        clear: createReadonlyMethod(
          "clear"
          /* TriggerOpTypes.CLEAR */
        ),
        forEach: createForEach(true, true)
      };
      const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
      iteratorMethods.forEach((method) => {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
      });
      return [
        mutableInstrumentations2,
        readonlyInstrumentations2,
        shallowInstrumentations2,
        shallowReadonlyInstrumentations2
      ];
    }
    const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
    function createInstrumentationGetter(isReadonly2, shallow) {
      const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
      return (target, key, receiver) => {
        if (key === "__v_isReactive") {
          return !isReadonly2;
        } else if (key === "__v_isReadonly") {
          return isReadonly2;
        } else if (key === "__v_raw") {
          return target;
        }
        return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
      };
    }
    const mutableCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, false)
    };
    const shallowCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(false, true)
    };
    const readonlyCollectionHandlers = {
      get: /* @__PURE__ */ createInstrumentationGetter(true, false)
    };
    const reactiveMap = /* @__PURE__ */ new WeakMap();
    const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
    const readonlyMap = /* @__PURE__ */ new WeakMap();
    const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
    function targetTypeMap(rawType) {
      switch (rawType) {
        case "Object":
        case "Array":
          return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
          return 2;
        default:
          return 0;
      }
    }
    function getTargetType(value) {
      return value[
        "__v_skip"
        /* ReactiveFlags.SKIP */
      ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
      if (isReadonly(target)) {
        return target;
      }
      return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    function shallowReactive(target) {
      return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
    }
    function readonly(target) {
      return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
      if (!isObject$1(target)) {
        return target;
      }
      if (target[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ] && !(isReadonly2 && target[
        "__v_isReactive"
        /* ReactiveFlags.IS_REACTIVE */
      ])) {
        return target;
      }
      const existingProxy = proxyMap.get(target);
      if (existingProxy) {
        return existingProxy;
      }
      const targetType = getTargetType(target);
      if (targetType === 0) {
        return target;
      }
      const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
      proxyMap.set(target, proxy);
      return proxy;
    }
    function isReactive(value) {
      if (isReadonly(value)) {
        return isReactive(value[
          "__v_raw"
          /* ReactiveFlags.RAW */
        ]);
      }
      return !!(value && value[
        "__v_isReactive"
        /* ReactiveFlags.IS_REACTIVE */
      ]);
    }
    function isReadonly(value) {
      return !!(value && value[
        "__v_isReadonly"
        /* ReactiveFlags.IS_READONLY */
      ]);
    }
    function isShallow(value) {
      return !!(value && value[
        "__v_isShallow"
        /* ReactiveFlags.IS_SHALLOW */
      ]);
    }
    function isProxy(value) {
      return isReactive(value) || isReadonly(value);
    }
    function toRaw(observed) {
      const raw = observed && observed[
        "__v_raw"
        /* ReactiveFlags.RAW */
      ];
      return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
      def(value, "__v_skip", true);
      return value;
    }
    const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
    function trackRefValue(ref2) {
      if (shouldTrack && activeEffect) {
        ref2 = toRaw(ref2);
        {
          trackEffects(ref2.dep || (ref2.dep = createDep()));
        }
      }
    }
    function triggerRefValue(ref2, newVal) {
      ref2 = toRaw(ref2);
      const dep = ref2.dep;
      if (dep) {
        {
          triggerEffects(dep);
        }
      }
    }
    function isRef(r) {
      return !!(r && r.__v_isRef === true);
    }
    function ref(value) {
      return createRef(value, false);
    }
    function createRef(rawValue, shallow) {
      if (isRef(rawValue)) {
        return rawValue;
      }
      return new RefImpl(rawValue, shallow);
    }
    class RefImpl {
      constructor(value, __v_isShallow) {
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw(value);
        this._value = __v_isShallow ? value : toReactive(value);
      }
      get value() {
        trackRefValue(this);
        return this._value;
      }
      set value(newVal) {
        const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this);
        }
      }
    }
    function unref(ref2) {
      return isRef(ref2) ? ref2.value : ref2;
    }
    const shallowUnwrapHandlers = {
      get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
      set: (target, key, value, receiver) => {
        const oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        } else {
          return Reflect.set(target, key, value, receiver);
        }
      }
    };
    function proxyRefs(objectWithRefs) {
      return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }
    var _a$1;
    class ComputedRefImpl {
      constructor(getter, _setter, isReadonly2, isSSR) {
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a$1] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, () => {
          if (!this._dirty) {
            this._dirty = true;
            triggerRefValue(this);
          }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this[
          "__v_isReadonly"
          /* ReactiveFlags.IS_READONLY */
        ] = isReadonly2;
      }
      get value() {
        const self2 = toRaw(this);
        trackRefValue(self2);
        if (self2._dirty || !self2._cacheable) {
          self2._dirty = false;
          self2._value = self2.effect.run();
        }
        return self2._value;
      }
      set value(newValue) {
        this._setter(newValue);
      }
    }
    _a$1 = "__v_isReadonly";
    function computed$1(getterOrOptions, debugOptions, isSSR = false) {
      let getter;
      let setter;
      const onlyGetter = isFunction$1(getterOrOptions);
      if (onlyGetter) {
        getter = getterOrOptions;
        setter = NOOP;
      } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
      }
      const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
      return cRef;
    }
    function warn(msg, ...args) {
      return;
    }
    function callWithErrorHandling(fn, instance, type, args) {
      let res;
      try {
        res = args ? fn(...args) : fn();
      } catch (err) {
        handleError(err, instance, type);
      }
      return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
      if (isFunction$1(fn)) {
        const res = callWithErrorHandling(fn, instance, type, args);
        if (res && isPromise(res)) {
          res.catch((err) => {
            handleError(err, instance, type);
          });
        }
        return res;
      }
      const values2 = [];
      for (let i = 0; i < fn.length; i++) {
        values2.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
      }
      return values2;
    }
    function handleError(err, instance, type, throwInDev = true) {
      const contextVNode = instance ? instance.vnode : null;
      if (instance) {
        let cur = instance.parent;
        const exposedInstance = instance.proxy;
        const errorInfo = type;
        while (cur) {
          const errorCapturedHooks = cur.ec;
          if (errorCapturedHooks) {
            for (let i = 0; i < errorCapturedHooks.length; i++) {
              if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                return;
              }
            }
          }
          cur = cur.parent;
        }
        const appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
          callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
          return;
        }
      }
      logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
      {
        console.error(err);
      }
    }
    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = /* @__PURE__ */ Promise.resolve();
    let currentFlushPromise = null;
    function nextTick(fn) {
      const p2 = currentFlushPromise || resolvedPromise;
      return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
    }
    function findInsertionIndex(id) {
      let start = flushIndex + 1;
      let end = queue.length;
      while (start < end) {
        const middle = start + end >>> 1;
        const middleJobId = getId(queue[middle]);
        middleJobId < id ? start = middle + 1 : end = middle;
      }
      return start;
    }
    function queueJob(job) {
      if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
        if (job.id == null) {
          queue.push(job);
        } else {
          queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
      }
    }
    function queueFlush() {
      if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
      }
    }
    function invalidateJob(job) {
      const i = queue.indexOf(job);
      if (i > flushIndex) {
        queue.splice(i, 1);
      }
    }
    function queuePostFlushCb(cb) {
      if (!isArray$2(cb)) {
        if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
          pendingPostFlushCbs.push(cb);
        }
      } else {
        pendingPostFlushCbs.push(...cb);
      }
      queueFlush();
    }
    function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
      for (; i < queue.length; i++) {
        const cb = queue[i];
        if (cb && cb.pre) {
          queue.splice(i, 1);
          i--;
          cb();
        }
      }
    }
    function flushPostFlushCbs(seen) {
      if (pendingPostFlushCbs.length) {
        const deduped = [...new Set(pendingPostFlushCbs)];
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
          activePostFlushCbs.push(...deduped);
          return;
        }
        activePostFlushCbs = deduped;
        activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
          activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
      }
    }
    const getId = (job) => job.id == null ? Infinity : job.id;
    const comparator = (a, b) => {
      const diff = getId(a) - getId(b);
      if (diff === 0) {
        if (a.pre && !b.pre)
          return -1;
        if (b.pre && !a.pre)
          return 1;
      }
      return diff;
    };
    function flushJobs(seen) {
      isFlushPending = false;
      isFlushing = true;
      queue.sort(comparator);
      const check = NOOP;
      try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
          const job = queue[flushIndex];
          if (job && job.active !== false) {
            if (false)
              ;
            callWithErrorHandling(
              job,
              null,
              14
              /* ErrorCodes.SCHEDULER */
            );
          }
        }
      } finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs();
        isFlushing = false;
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
          flushJobs();
        }
      }
    }
    function emit(instance, event, ...rawArgs) {
      if (instance.isUnmounted)
        return;
      const props = instance.vnode.props || EMPTY_OBJ;
      let args = rawArgs;
      const isModelListener2 = event.startsWith("update:");
      const modelArg = isModelListener2 && event.slice(7);
      if (modelArg && modelArg in props) {
        const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
        const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
        if (trim) {
          args = rawArgs.map((a) => isString(a) ? a.trim() : a);
        }
        if (number) {
          args = rawArgs.map(looseToNumber);
        }
      }
      let handlerName;
      let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
      props[handlerName = toHandlerKey(camelize(event))];
      if (!handler && isModelListener2) {
        handler = props[handlerName = toHandlerKey(hyphenate(event))];
      }
      if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6, args);
      }
      const onceHandler = props[handlerName + `Once`];
      if (onceHandler) {
        if (!instance.emitted) {
          instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
          return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6, args);
      }
    }
    function normalizeEmitsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.emitsCache;
      const cached = cache.get(comp);
      if (cached !== void 0) {
        return cached;
      }
      const raw = comp.emits;
      let normalized = {};
      let hasExtends = false;
      if (!isFunction$1(comp)) {
        const extendEmits = (raw2) => {
          const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
          if (normalizedFromExtend) {
            hasExtends = true;
            extend(normalized, normalizedFromExtend);
          }
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
          extendEmits(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendEmits);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject$1(comp)) {
          cache.set(comp, null);
        }
        return null;
      }
      if (isArray$2(raw)) {
        raw.forEach((key) => normalized[key] = null);
      } else {
        extend(normalized, raw);
      }
      if (isObject$1(comp)) {
        cache.set(comp, normalized);
      }
      return normalized;
    }
    function isEmitListener(options, key) {
      if (!options || !isOn(key)) {
        return false;
      }
      key = key.slice(2).replace(/Once$/, "");
      return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
    }
    let currentRenderingInstance = null;
    let currentScopeId = null;
    function setCurrentRenderingInstance(instance) {
      const prev = currentRenderingInstance;
      currentRenderingInstance = instance;
      currentScopeId = instance && instance.type.__scopeId || null;
      return prev;
    }
    function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
      if (!ctx)
        return fn;
      if (fn._n) {
        return fn;
      }
      const renderFnWithContext = (...args) => {
        if (renderFnWithContext._d) {
          setBlockTracking(-1);
        }
        const prevInstance = setCurrentRenderingInstance(ctx);
        let res;
        try {
          res = fn(...args);
        } finally {
          setCurrentRenderingInstance(prevInstance);
          if (renderFnWithContext._d) {
            setBlockTracking(1);
          }
        }
        return res;
      };
      renderFnWithContext._n = true;
      renderFnWithContext._c = true;
      renderFnWithContext._d = true;
      return renderFnWithContext;
    }
    function markAttrsAccessed() {
    }
    function renderComponentRoot(instance) {
      const { type: Component, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, inheritAttrs } = instance;
      let result;
      let fallthroughAttrs;
      const prev = setCurrentRenderingInstance(instance);
      try {
        if (vnode.shapeFlag & 4) {
          const proxyToUse = withProxy || proxy;
          result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
          fallthroughAttrs = attrs;
        } else {
          const render2 = Component;
          if (false)
            ;
          result = normalizeVNode(render2.length > 1 ? render2(props, false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit2
          } : { attrs, slots, emit: emit2 }) : render2(
            props,
            null
            /* we know it doesn't need it */
          ));
          fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
        }
      } catch (err) {
        blockStack.length = 0;
        handleError(
          err,
          instance,
          1
          /* ErrorCodes.RENDER_FUNCTION */
        );
        result = createVNode(Comment);
      }
      let root2 = result;
      if (fallthroughAttrs && inheritAttrs !== false) {
        const keys2 = Object.keys(fallthroughAttrs);
        const { shapeFlag } = root2;
        if (keys2.length) {
          if (shapeFlag & (1 | 6)) {
            if (propsOptions && keys2.some(isModelListener)) {
              fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
            }
            root2 = cloneVNode(root2, fallthroughAttrs);
          }
        }
      }
      if (vnode.dirs) {
        root2 = cloneVNode(root2);
        root2.dirs = root2.dirs ? root2.dirs.concat(vnode.dirs) : vnode.dirs;
      }
      if (vnode.transition) {
        root2.transition = vnode.transition;
      }
      {
        result = root2;
      }
      setCurrentRenderingInstance(prev);
      return result;
    }
    const getFunctionalFallthrough = (attrs) => {
      let res;
      for (const key in attrs) {
        if (key === "class" || key === "style" || isOn(key)) {
          (res || (res = {}))[key] = attrs[key];
        }
      }
      return res;
    };
    const filterModelListeners = (attrs, props) => {
      const res = {};
      for (const key in attrs) {
        if (!isModelListener(key) || !(key.slice(9) in props)) {
          res[key] = attrs[key];
        }
      }
      return res;
    };
    function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
      const { props: prevProps, children: prevChildren, component } = prevVNode;
      const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
      const emits = component.emitsOptions;
      if (nextVNode.dirs || nextVNode.transition) {
        return true;
      }
      if (optimized && patchFlag >= 0) {
        if (patchFlag & 1024) {
          return true;
        }
        if (patchFlag & 16) {
          if (!prevProps) {
            return !!nextProps;
          }
          return hasPropsChanged(prevProps, nextProps, emits);
        } else if (patchFlag & 8) {
          const dynamicProps = nextVNode.dynamicProps;
          for (let i = 0; i < dynamicProps.length; i++) {
            const key = dynamicProps[i];
            if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
              return true;
            }
          }
        }
      } else {
        if (prevChildren || nextChildren) {
          if (!nextChildren || !nextChildren.$stable) {
            return true;
          }
        }
        if (prevProps === nextProps) {
          return false;
        }
        if (!prevProps) {
          return !!nextProps;
        }
        if (!nextProps) {
          return true;
        }
        return hasPropsChanged(prevProps, nextProps, emits);
      }
      return false;
    }
    function hasPropsChanged(prevProps, nextProps, emitsOptions) {
      const nextKeys = Object.keys(nextProps);
      if (nextKeys.length !== Object.keys(prevProps).length) {
        return true;
      }
      for (let i = 0; i < nextKeys.length; i++) {
        const key = nextKeys[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
          return true;
        }
      }
      return false;
    }
    function updateHOCHostEl({ vnode, parent }, el) {
      while (parent && parent.subTree === vnode) {
        (vnode = parent.vnode).el = el;
        parent = parent.parent;
      }
    }
    const isSuspense = (type) => type.__isSuspense;
    function queueEffectWithSuspense(fn, suspense) {
      if (suspense && suspense.pendingBranch) {
        if (isArray$2(fn)) {
          suspense.effects.push(...fn);
        } else {
          suspense.effects.push(fn);
        }
      } else {
        queuePostFlushCb(fn);
      }
    }
    function provide(key, value) {
      if (!currentInstance)
        ;
      else {
        let provides = currentInstance.provides;
        const parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
          provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
      }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
      const instance = currentInstance || currentRenderingInstance;
      if (instance) {
        const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
        if (provides && key in provides) {
          return provides[key];
        } else if (arguments.length > 1) {
          return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
        } else
          ;
      }
    }
    const INITIAL_WATCHER_VALUE = {};
    function watch(source, cb, options) {
      return doWatch(source, cb, options);
    }
    function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
      const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
      let getter;
      let forceTrigger = false;
      let isMultiSource = false;
      if (isRef(source)) {
        getter = () => source.value;
        forceTrigger = isShallow(source);
      } else if (isReactive(source)) {
        getter = () => source;
        deep = true;
      } else if (isArray$2(source)) {
        isMultiSource = true;
        forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
        getter = () => source.map((s) => {
          if (isRef(s)) {
            return s.value;
          } else if (isReactive(s)) {
            return traverse(s);
          } else if (isFunction$1(s)) {
            return callWithErrorHandling(
              s,
              instance,
              2
              /* ErrorCodes.WATCH_GETTER */
            );
          } else
            ;
        });
      } else if (isFunction$1(source)) {
        if (cb) {
          getter = () => callWithErrorHandling(
            source,
            instance,
            2
            /* ErrorCodes.WATCH_GETTER */
          );
        } else {
          getter = () => {
            if (instance && instance.isUnmounted) {
              return;
            }
            if (cleanup) {
              cleanup();
            }
            return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
          };
        }
      } else {
        getter = NOOP;
      }
      if (cb && deep) {
        const baseGetter = getter;
        getter = () => traverse(baseGetter());
      }
      let cleanup;
      let onCleanup = (fn) => {
        cleanup = effect.onStop = () => {
          callWithErrorHandling(
            fn,
            instance,
            4
            /* ErrorCodes.WATCH_CLEANUP */
          );
        };
      };
      let ssrCleanup;
      if (isInSSRComponentSetup) {
        onCleanup = NOOP;
        if (!cb) {
          getter();
        } else if (immediate) {
          callWithAsyncErrorHandling(cb, instance, 3, [
            getter(),
            isMultiSource ? [] : void 0,
            onCleanup
          ]);
        }
        if (flush === "sync") {
          const ctx = useSSRContext();
          ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
        } else {
          return NOOP;
        }
      }
      let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
      const job = () => {
        if (!effect.active) {
          return;
        }
        if (cb) {
          const newValue = effect.run();
          if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
            if (cleanup) {
              cleanup();
            }
            callWithAsyncErrorHandling(cb, instance, 3, [
              newValue,
              // pass undefined as the old value when it's changed for the first time
              oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
              onCleanup
            ]);
            oldValue = newValue;
          }
        } else {
          effect.run();
        }
      };
      job.allowRecurse = !!cb;
      let scheduler;
      if (flush === "sync") {
        scheduler = job;
      } else if (flush === "post") {
        scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
      } else {
        job.pre = true;
        if (instance)
          job.id = instance.uid;
        scheduler = () => queueJob(job);
      }
      const effect = new ReactiveEffect(getter, scheduler);
      if (cb) {
        if (immediate) {
          job();
        } else {
          oldValue = effect.run();
        }
      } else if (flush === "post") {
        queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
      } else {
        effect.run();
      }
      const unwatch = () => {
        effect.stop();
        if (instance && instance.scope) {
          remove(instance.scope.effects, effect);
        }
      };
      if (ssrCleanup)
        ssrCleanup.push(unwatch);
      return unwatch;
    }
    function instanceWatch(source, value, options) {
      const publicThis = this.proxy;
      const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
      let cb;
      if (isFunction$1(value)) {
        cb = value;
      } else {
        cb = value.handler;
        options = value;
      }
      const cur = currentInstance;
      setCurrentInstance(this);
      const res = doWatch(getter, cb.bind(publicThis), options);
      if (cur) {
        setCurrentInstance(cur);
      } else {
        unsetCurrentInstance();
      }
      return res;
    }
    function createPathGetter(ctx, path) {
      const segments = path.split(".");
      return () => {
        let cur = ctx;
        for (let i = 0; i < segments.length && cur; i++) {
          cur = cur[segments[i]];
        }
        return cur;
      };
    }
    function traverse(value, seen) {
      if (!isObject$1(value) || value[
        "__v_skip"
        /* ReactiveFlags.SKIP */
      ]) {
        return value;
      }
      seen = seen || /* @__PURE__ */ new Set();
      if (seen.has(value)) {
        return value;
      }
      seen.add(value);
      if (isRef(value)) {
        traverse(value.value, seen);
      } else if (isArray$2(value)) {
        for (let i = 0; i < value.length; i++) {
          traverse(value[i], seen);
        }
      } else if (isSet(value) || isMap(value)) {
        value.forEach((v) => {
          traverse(v, seen);
        });
      } else if (isPlainObject(value)) {
        for (const key in value) {
          traverse(value[key], seen);
        }
      }
      return value;
    }
    function useTransitionState() {
      const state = {
        isMounted: false,
        isLeaving: false,
        isUnmounting: false,
        leavingVNodes: /* @__PURE__ */ new Map()
      };
      onMounted(() => {
        state.isMounted = true;
      });
      onBeforeUnmount(() => {
        state.isUnmounting = true;
      });
      return state;
    }
    const TransitionHookValidator = [Function, Array];
    const BaseTransitionImpl = {
      name: `BaseTransition`,
      props: {
        mode: String,
        appear: Boolean,
        persisted: Boolean,
        // enter
        onBeforeEnter: TransitionHookValidator,
        onEnter: TransitionHookValidator,
        onAfterEnter: TransitionHookValidator,
        onEnterCancelled: TransitionHookValidator,
        // leave
        onBeforeLeave: TransitionHookValidator,
        onLeave: TransitionHookValidator,
        onAfterLeave: TransitionHookValidator,
        onLeaveCancelled: TransitionHookValidator,
        // appear
        onBeforeAppear: TransitionHookValidator,
        onAppear: TransitionHookValidator,
        onAfterAppear: TransitionHookValidator,
        onAppearCancelled: TransitionHookValidator
      },
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevTransitionKey;
        return () => {
          const children = slots.default && getTransitionRawChildren(slots.default(), true);
          if (!children || !children.length) {
            return;
          }
          let child = children[0];
          if (children.length > 1) {
            for (const c of children) {
              if (c.type !== Comment) {
                child = c;
                break;
              }
            }
          }
          const rawProps = toRaw(props);
          const { mode } = rawProps;
          if (state.isLeaving) {
            return emptyPlaceholder(child);
          }
          const innerChild = getKeepAliveChild(child);
          if (!innerChild) {
            return emptyPlaceholder(child);
          }
          const enterHooks = resolveTransitionHooks(innerChild, rawProps, state, instance);
          setTransitionHooks(innerChild, enterHooks);
          const oldChild = instance.subTree;
          const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
          let transitionKeyChanged = false;
          const { getTransitionKey } = innerChild.type;
          if (getTransitionKey) {
            const key = getTransitionKey();
            if (prevTransitionKey === void 0) {
              prevTransitionKey = key;
            } else if (key !== prevTransitionKey) {
              prevTransitionKey = key;
              transitionKeyChanged = true;
            }
          }
          if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
            const leavingHooks = resolveTransitionHooks(oldInnerChild, rawProps, state, instance);
            setTransitionHooks(oldInnerChild, leavingHooks);
            if (mode === "out-in") {
              state.isLeaving = true;
              leavingHooks.afterLeave = () => {
                state.isLeaving = false;
                if (instance.update.active !== false) {
                  instance.update();
                }
              };
              return emptyPlaceholder(child);
            } else if (mode === "in-out" && innerChild.type !== Comment) {
              leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
                const leavingVNodesCache = getLeavingNodesForType(state, oldInnerChild);
                leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
                el._leaveCb = () => {
                  earlyRemove();
                  el._leaveCb = void 0;
                  delete enterHooks.delayedLeave;
                };
                enterHooks.delayedLeave = delayedLeave;
              };
            }
          }
          return child;
        };
      }
    };
    const BaseTransition = BaseTransitionImpl;
    function getLeavingNodesForType(state, vnode) {
      const { leavingVNodes } = state;
      let leavingVNodesCache = leavingVNodes.get(vnode.type);
      if (!leavingVNodesCache) {
        leavingVNodesCache = /* @__PURE__ */ Object.create(null);
        leavingVNodes.set(vnode.type, leavingVNodesCache);
      }
      return leavingVNodesCache;
    }
    function resolveTransitionHooks(vnode, props, state, instance) {
      const { appear, mode, persisted = false, onBeforeEnter, onEnter, onAfterEnter, onEnterCancelled, onBeforeLeave, onLeave, onAfterLeave, onLeaveCancelled, onBeforeAppear, onAppear, onAfterAppear, onAppearCancelled } = props;
      const key = String(vnode.key);
      const leavingVNodesCache = getLeavingNodesForType(state, vnode);
      const callHook2 = (hook, args) => {
        hook && callWithAsyncErrorHandling(hook, instance, 9, args);
      };
      const callAsyncHook = (hook, args) => {
        const done = args[1];
        callHook2(hook, args);
        if (isArray$2(hook)) {
          if (hook.every((hook2) => hook2.length <= 1))
            done();
        } else if (hook.length <= 1) {
          done();
        }
      };
      const hooks = {
        mode,
        persisted,
        beforeEnter(el) {
          let hook = onBeforeEnter;
          if (!state.isMounted) {
            if (appear) {
              hook = onBeforeAppear || onBeforeEnter;
            } else {
              return;
            }
          }
          if (el._leaveCb) {
            el._leaveCb(
              true
              /* cancelled */
            );
          }
          const leavingVNode = leavingVNodesCache[key];
          if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
            leavingVNode.el._leaveCb();
          }
          callHook2(hook, [el]);
        },
        enter(el) {
          let hook = onEnter;
          let afterHook = onAfterEnter;
          let cancelHook = onEnterCancelled;
          if (!state.isMounted) {
            if (appear) {
              hook = onAppear || onEnter;
              afterHook = onAfterAppear || onAfterEnter;
              cancelHook = onAppearCancelled || onEnterCancelled;
            } else {
              return;
            }
          }
          let called = false;
          const done = el._enterCb = (cancelled) => {
            if (called)
              return;
            called = true;
            if (cancelled) {
              callHook2(cancelHook, [el]);
            } else {
              callHook2(afterHook, [el]);
            }
            if (hooks.delayedLeave) {
              hooks.delayedLeave();
            }
            el._enterCb = void 0;
          };
          if (hook) {
            callAsyncHook(hook, [el, done]);
          } else {
            done();
          }
        },
        leave(el, remove2) {
          const key2 = String(vnode.key);
          if (el._enterCb) {
            el._enterCb(
              true
              /* cancelled */
            );
          }
          if (state.isUnmounting) {
            return remove2();
          }
          callHook2(onBeforeLeave, [el]);
          let called = false;
          const done = el._leaveCb = (cancelled) => {
            if (called)
              return;
            called = true;
            remove2();
            if (cancelled) {
              callHook2(onLeaveCancelled, [el]);
            } else {
              callHook2(onAfterLeave, [el]);
            }
            el._leaveCb = void 0;
            if (leavingVNodesCache[key2] === vnode) {
              delete leavingVNodesCache[key2];
            }
          };
          leavingVNodesCache[key2] = vnode;
          if (onLeave) {
            callAsyncHook(onLeave, [el, done]);
          } else {
            done();
          }
        },
        clone(vnode2) {
          return resolveTransitionHooks(vnode2, props, state, instance);
        }
      };
      return hooks;
    }
    function emptyPlaceholder(vnode) {
      if (isKeepAlive(vnode)) {
        vnode = cloneVNode(vnode);
        vnode.children = null;
        return vnode;
      }
    }
    function getKeepAliveChild(vnode) {
      return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
    }
    function setTransitionHooks(vnode, hooks) {
      if (vnode.shapeFlag & 6 && vnode.component) {
        setTransitionHooks(vnode.component.subTree, hooks);
      } else if (vnode.shapeFlag & 128) {
        vnode.ssContent.transition = hooks.clone(vnode.ssContent);
        vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
      } else {
        vnode.transition = hooks;
      }
    }
    function getTransitionRawChildren(children, keepComment = false, parentKey) {
      let ret = [];
      let keyedFragmentCount = 0;
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
        if (child.type === Fragment) {
          if (child.patchFlag & 128)
            keyedFragmentCount++;
          ret = ret.concat(getTransitionRawChildren(child.children, keepComment, key));
        } else if (keepComment || child.type !== Comment) {
          ret.push(key != null ? cloneVNode(child, { key }) : child);
        }
      }
      if (keyedFragmentCount > 1) {
        for (let i = 0; i < ret.length; i++) {
          ret[i].patchFlag = -2;
        }
      }
      return ret;
    }
    const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
    const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
    function onActivated(hook, target) {
      registerKeepAliveHook(hook, "a", target);
    }
    function onDeactivated(hook, target) {
      registerKeepAliveHook(hook, "da", target);
    }
    function registerKeepAliveHook(hook, type, target = currentInstance) {
      const wrappedHook = hook.__wdc || (hook.__wdc = () => {
        let current = target;
        while (current) {
          if (current.isDeactivated) {
            return;
          }
          current = current.parent;
        }
        return hook();
      });
      injectHook(type, wrappedHook, target);
      if (target) {
        let current = target.parent;
        while (current && current.parent) {
          if (isKeepAlive(current.parent.vnode)) {
            injectToKeepAliveRoot(wrappedHook, type, target, current);
          }
          current = current.parent;
        }
      }
    }
    function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
      const injected = injectHook(
        type,
        hook,
        keepAliveRoot,
        true
        /* prepend */
      );
      onUnmounted(() => {
        remove(keepAliveRoot[type], injected);
      }, target);
    }
    function injectHook(type, hook, target = currentInstance, prepend = false) {
      if (target) {
        const hooks = target[type] || (target[type] = []);
        const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
          if (target.isUnmounted) {
            return;
          }
          pauseTracking();
          setCurrentInstance(target);
          const res = callWithAsyncErrorHandling(hook, target, type, args);
          unsetCurrentInstance();
          resetTracking();
          return res;
        });
        if (prepend) {
          hooks.unshift(wrappedHook);
        } else {
          hooks.push(wrappedHook);
        }
        return wrappedHook;
      }
    }
    const createHook = (lifecycle) => (hook, target = currentInstance) => (
      // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
      (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
    );
    const onBeforeMount = createHook(
      "bm"
      /* LifecycleHooks.BEFORE_MOUNT */
    );
    const onMounted = createHook(
      "m"
      /* LifecycleHooks.MOUNTED */
    );
    const onBeforeUpdate = createHook(
      "bu"
      /* LifecycleHooks.BEFORE_UPDATE */
    );
    const onUpdated = createHook(
      "u"
      /* LifecycleHooks.UPDATED */
    );
    const onBeforeUnmount = createHook(
      "bum"
      /* LifecycleHooks.BEFORE_UNMOUNT */
    );
    const onUnmounted = createHook(
      "um"
      /* LifecycleHooks.UNMOUNTED */
    );
    const onServerPrefetch = createHook(
      "sp"
      /* LifecycleHooks.SERVER_PREFETCH */
    );
    const onRenderTriggered = createHook(
      "rtg"
      /* LifecycleHooks.RENDER_TRIGGERED */
    );
    const onRenderTracked = createHook(
      "rtc"
      /* LifecycleHooks.RENDER_TRACKED */
    );
    function onErrorCaptured(hook, target = currentInstance) {
      injectHook("ec", hook, target);
    }
    function invokeDirectiveHook(vnode, prevVNode, instance, name) {
      const bindings = vnode.dirs;
      const oldBindings = prevVNode && prevVNode.dirs;
      for (let i = 0; i < bindings.length; i++) {
        const binding = bindings[i];
        if (oldBindings) {
          binding.oldValue = oldBindings[i].value;
        }
        let hook = binding.dir[name];
        if (hook) {
          pauseTracking();
          callWithAsyncErrorHandling(hook, instance, 8, [
            vnode.el,
            binding,
            vnode,
            prevVNode
          ]);
          resetTracking();
        }
      }
    }
    const NULL_DYNAMIC_COMPONENT = Symbol();
    function renderList(source, renderItem, cache, index) {
      let ret;
      const cached = cache && cache[index];
      if (isArray$2(source) || isString(source)) {
        ret = new Array(source.length);
        for (let i = 0, l = source.length; i < l; i++) {
          ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
        }
      } else if (typeof source === "number") {
        ret = new Array(source);
        for (let i = 0; i < source; i++) {
          ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
        }
      } else if (isObject$1(source)) {
        if (source[Symbol.iterator]) {
          ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
        } else {
          const keys2 = Object.keys(source);
          ret = new Array(keys2.length);
          for (let i = 0, l = keys2.length; i < l; i++) {
            const key = keys2[i];
            ret[i] = renderItem(source[key], key, i, cached && cached[i]);
          }
        }
      } else {
        ret = [];
      }
      if (cache) {
        cache[index] = ret;
      }
      return ret;
    }
    const getPublicInstance = (i) => {
      if (!i)
        return null;
      if (isStatefulComponent(i))
        return getExposeProxy(i) || i.proxy;
      return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = (
      // Move PURE marker to new line to workaround compiler discarding it
      // due to type annotation
      /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
        $: (i) => i,
        $el: (i) => i.vnode.el,
        $data: (i) => i.data,
        $props: (i) => i.props,
        $attrs: (i) => i.attrs,
        $slots: (i) => i.slots,
        $refs: (i) => i.refs,
        $parent: (i) => getPublicInstance(i.parent),
        $root: (i) => getPublicInstance(i.root),
        $emit: (i) => i.emit,
        $options: (i) => resolveMergedOptions(i),
        $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
        $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
        $watch: (i) => instanceWatch.bind(i)
      })
    );
    const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
    const PublicInstanceProxyHandlers = {
      get({ _: instance }, key) {
        const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
        let normalizedProps;
        if (key[0] !== "$") {
          const n = accessCache[key];
          if (n !== void 0) {
            switch (n) {
              case 1:
                return setupState[key];
              case 2:
                return data[key];
              case 4:
                return ctx[key];
              case 3:
                return props[key];
            }
          } else if (hasSetupBinding(setupState, key)) {
            accessCache[key] = 1;
            return setupState[key];
          } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
            accessCache[key] = 2;
            return data[key];
          } else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
          ) {
            accessCache[key] = 3;
            return props[key];
          } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
          } else if (shouldCacheAccess) {
            accessCache[key] = 0;
          }
        }
        const publicGetter = publicPropertiesMap[key];
        let cssModule, globalProperties;
        if (publicGetter) {
          if (key === "$attrs") {
            track(instance, "get", key);
          }
          return publicGetter(instance);
        } else if (
          // css module (injected by vue-loader)
          (cssModule = type.__cssModules) && (cssModule = cssModule[key])
        ) {
          return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4;
          return ctx[key];
        } else if (
          // global properties
          globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
        ) {
          {
            return globalProperties[key];
          }
        } else
          ;
      },
      set({ _: instance }, key, value) {
        const { data, setupState, ctx } = instance;
        if (hasSetupBinding(setupState, key)) {
          setupState[key] = value;
          return true;
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          data[key] = value;
          return true;
        } else if (hasOwn(instance.props, key)) {
          return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
          return false;
        } else {
          {
            ctx[key] = value;
          }
        }
        return true;
      },
      has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
        let normalizedProps;
        return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
      },
      defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
          target._.accessCache[key] = 0;
        } else if (hasOwn(descriptor, "value")) {
          this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
      }
    };
    let shouldCacheAccess = true;
    function applyOptions(instance) {
      const options = resolveMergedOptions(instance);
      const publicThis = instance.proxy;
      const ctx = instance.ctx;
      shouldCacheAccess = false;
      if (options.beforeCreate) {
        callHook$1(
          options.beforeCreate,
          instance,
          "bc"
          /* LifecycleHooks.BEFORE_CREATE */
        );
      }
      const {
        // state
        data: dataOptions,
        computed: computedOptions,
        methods,
        watch: watchOptions,
        provide: provideOptions,
        inject: injectOptions,
        // lifecycle
        created,
        beforeMount,
        mounted,
        beforeUpdate,
        updated,
        activated,
        deactivated,
        beforeDestroy,
        beforeUnmount,
        destroyed,
        unmounted,
        render,
        renderTracked,
        renderTriggered,
        errorCaptured,
        serverPrefetch,
        // public API
        expose,
        inheritAttrs,
        // assets
        components,
        directives,
        filters
      } = options;
      const checkDuplicateProperties = null;
      if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
      }
      if (methods) {
        for (const key in methods) {
          const methodHandler = methods[key];
          if (isFunction$1(methodHandler)) {
            {
              ctx[key] = methodHandler.bind(publicThis);
            }
          }
        }
      }
      if (dataOptions) {
        const data = dataOptions.call(publicThis, publicThis);
        if (!isObject$1(data))
          ;
        else {
          instance.data = reactive(data);
        }
      }
      shouldCacheAccess = true;
      if (computedOptions) {
        for (const key in computedOptions) {
          const opt = computedOptions[key];
          const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
          const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : NOOP;
          const c = computed({
            get: get2,
            set: set2
          });
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: () => c.value,
            set: (v) => c.value = v
          });
        }
      }
      if (watchOptions) {
        for (const key in watchOptions) {
          createWatcher(watchOptions[key], ctx, publicThis, key);
        }
      }
      if (provideOptions) {
        const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
        Reflect.ownKeys(provides).forEach((key) => {
          provide(key, provides[key]);
        });
      }
      if (created) {
        callHook$1(
          created,
          instance,
          "c"
          /* LifecycleHooks.CREATED */
        );
      }
      function registerLifecycleHook(register, hook) {
        if (isArray$2(hook)) {
          hook.forEach((_hook) => register(_hook.bind(publicThis)));
        } else if (hook) {
          register(hook.bind(publicThis));
        }
      }
      registerLifecycleHook(onBeforeMount, beforeMount);
      registerLifecycleHook(onMounted, mounted);
      registerLifecycleHook(onBeforeUpdate, beforeUpdate);
      registerLifecycleHook(onUpdated, updated);
      registerLifecycleHook(onActivated, activated);
      registerLifecycleHook(onDeactivated, deactivated);
      registerLifecycleHook(onErrorCaptured, errorCaptured);
      registerLifecycleHook(onRenderTracked, renderTracked);
      registerLifecycleHook(onRenderTriggered, renderTriggered);
      registerLifecycleHook(onBeforeUnmount, beforeUnmount);
      registerLifecycleHook(onUnmounted, unmounted);
      registerLifecycleHook(onServerPrefetch, serverPrefetch);
      if (isArray$2(expose)) {
        if (expose.length) {
          const exposed = instance.exposed || (instance.exposed = {});
          expose.forEach((key) => {
            Object.defineProperty(exposed, key, {
              get: () => publicThis[key],
              set: (val) => publicThis[key] = val
            });
          });
        } else if (!instance.exposed) {
          instance.exposed = {};
        }
      }
      if (render && instance.render === NOOP) {
        instance.render = render;
      }
      if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
      }
      if (components)
        instance.components = components;
      if (directives)
        instance.directives = directives;
    }
    function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
      if (isArray$2(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
      }
      for (const key in injectOptions) {
        const opt = injectOptions[key];
        let injected;
        if (isObject$1(opt)) {
          if ("default" in opt) {
            injected = inject(
              opt.from || key,
              opt.default,
              true
              /* treat default function as factory */
            );
          } else {
            injected = inject(opt.from || key);
          }
        } else {
          injected = inject(opt);
        }
        if (isRef(injected)) {
          if (unwrapRef) {
            Object.defineProperty(ctx, key, {
              enumerable: true,
              configurable: true,
              get: () => injected.value,
              set: (v) => injected.value = v
            });
          } else {
            ctx[key] = injected;
          }
        } else {
          ctx[key] = injected;
        }
      }
    }
    function callHook$1(hook, instance, type) {
      callWithAsyncErrorHandling(isArray$2(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
    }
    function createWatcher(raw, ctx, publicThis, key) {
      const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
      if (isString(raw)) {
        const handler = ctx[raw];
        if (isFunction$1(handler)) {
          watch(getter, handler);
        }
      } else if (isFunction$1(raw)) {
        watch(getter, raw.bind(publicThis));
      } else if (isObject$1(raw)) {
        if (isArray$2(raw)) {
          raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
        } else {
          const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
          if (isFunction$1(handler)) {
            watch(getter, handler, raw);
          }
        }
      } else
        ;
    }
    function resolveMergedOptions(instance) {
      const base = instance.type;
      const { mixins, extends: extendsOptions } = base;
      const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
      const cached = cache.get(base);
      let resolved;
      if (cached) {
        resolved = cached;
      } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
          resolved = base;
        }
      } else {
        resolved = {};
        if (globalMixins.length) {
          globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
        }
        mergeOptions(resolved, base, optionMergeStrategies);
      }
      if (isObject$1(base)) {
        cache.set(base, resolved);
      }
      return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
      const { mixins, extends: extendsOptions } = from;
      if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
      }
      if (mixins) {
        mixins.forEach((m) => mergeOptions(to, m, strats, true));
      }
      for (const key in from) {
        if (asMixin && key === "expose")
          ;
        else {
          const strat = internalOptionMergeStrats[key] || strats && strats[key];
          to[key] = strat ? strat(to[key], from[key]) : from[key];
        }
      }
      return to;
    }
    const internalOptionMergeStrats = {
      data: mergeDataFn,
      props: mergeObjectOptions,
      emits: mergeObjectOptions,
      // objects
      methods: mergeObjectOptions,
      computed: mergeObjectOptions,
      // lifecycle
      beforeCreate: mergeAsArray,
      created: mergeAsArray,
      beforeMount: mergeAsArray,
      mounted: mergeAsArray,
      beforeUpdate: mergeAsArray,
      updated: mergeAsArray,
      beforeDestroy: mergeAsArray,
      beforeUnmount: mergeAsArray,
      destroyed: mergeAsArray,
      unmounted: mergeAsArray,
      activated: mergeAsArray,
      deactivated: mergeAsArray,
      errorCaptured: mergeAsArray,
      serverPrefetch: mergeAsArray,
      // assets
      components: mergeObjectOptions,
      directives: mergeObjectOptions,
      // watch
      watch: mergeWatchOptions,
      // provide / inject
      provide: mergeDataFn,
      inject: mergeInject
    };
    function mergeDataFn(to, from) {
      if (!from) {
        return to;
      }
      if (!to) {
        return from;
      }
      return function mergedDataFn() {
        return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
      };
    }
    function mergeInject(to, from) {
      return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
      if (isArray$2(raw)) {
        const res = {};
        for (let i = 0; i < raw.length; i++) {
          res[raw[i]] = raw[i];
        }
        return res;
      }
      return raw;
    }
    function mergeAsArray(to, from) {
      return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
      return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
      if (!to)
        return from;
      if (!from)
        return to;
      const merged = extend(/* @__PURE__ */ Object.create(null), to);
      for (const key in from) {
        merged[key] = mergeAsArray(to[key], from[key]);
      }
      return merged;
    }
    function initProps(instance, rawProps, isStateful, isSSR = false) {
      const props = {};
      const attrs = {};
      def(attrs, InternalObjectKey, 1);
      instance.propsDefaults = /* @__PURE__ */ Object.create(null);
      setFullProps(instance, rawProps, props, attrs);
      for (const key in instance.propsOptions[0]) {
        if (!(key in props)) {
          props[key] = void 0;
        }
      }
      if (isStateful) {
        instance.props = isSSR ? props : shallowReactive(props);
      } else {
        if (!instance.type.props) {
          instance.props = attrs;
        } else {
          instance.props = props;
        }
      }
      instance.attrs = attrs;
    }
    function updateProps(instance, rawProps, rawPrevProps, optimized) {
      const { props, attrs, vnode: { patchFlag } } = instance;
      const rawCurrentProps = toRaw(props);
      const [options] = instance.propsOptions;
      let hasAttrsChanged = false;
      if (
        // always force full diff in dev
        // - #1942 if hmr is enabled with sfc component
        // - vite#872 non-sfc component used by sfc component
        (optimized || patchFlag > 0) && !(patchFlag & 16)
      ) {
        if (patchFlag & 8) {
          const propsToUpdate = instance.vnode.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            let key = propsToUpdate[i];
            if (isEmitListener(instance.emitsOptions, key)) {
              continue;
            }
            const value = rawProps[key];
            if (options) {
              if (hasOwn(attrs, key)) {
                if (value !== attrs[key]) {
                  attrs[key] = value;
                  hasAttrsChanged = true;
                }
              } else {
                const camelizedKey = camelize(key);
                props[camelizedKey] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  camelizedKey,
                  value,
                  instance,
                  false
                  /* isAbsent */
                );
              }
            } else {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            }
          }
        }
      } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
          hasAttrsChanged = true;
        }
        let kebabKey;
        for (const key in rawCurrentProps) {
          if (!rawProps || // for camelCase
          !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
          // and converted to camelCase (#955)
          ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
            if (options) {
              if (rawPrevProps && // for camelCase
              (rawPrevProps[key] !== void 0 || // for kebab-case
              rawPrevProps[kebabKey] !== void 0)) {
                props[key] = resolvePropValue(
                  options,
                  rawCurrentProps,
                  key,
                  void 0,
                  instance,
                  true
                  /* isAbsent */
                );
              }
            } else {
              delete props[key];
            }
          }
        }
        if (attrs !== rawCurrentProps) {
          for (const key in attrs) {
            if (!rawProps || !hasOwn(rawProps, key) && true) {
              delete attrs[key];
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (hasAttrsChanged) {
        trigger(instance, "set", "$attrs");
      }
    }
    function setFullProps(instance, rawProps, props, attrs) {
      const [options, needCastKeys] = instance.propsOptions;
      let hasAttrsChanged = false;
      let rawCastValues;
      if (rawProps) {
        for (let key in rawProps) {
          if (isReservedProp(key)) {
            continue;
          }
          const value = rawProps[key];
          let camelKey;
          if (options && hasOwn(options, camelKey = camelize(key))) {
            if (!needCastKeys || !needCastKeys.includes(camelKey)) {
              props[camelKey] = value;
            } else {
              (rawCastValues || (rawCastValues = {}))[camelKey] = value;
            }
          } else if (!isEmitListener(instance.emitsOptions, key)) {
            if (!(key in attrs) || value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
      if (needCastKeys) {
        const rawCurrentProps = toRaw(props);
        const castValues = rawCastValues || EMPTY_OBJ;
        for (let i = 0; i < needCastKeys.length; i++) {
          const key = needCastKeys[i];
          props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
        }
      }
      return hasAttrsChanged;
    }
    function resolvePropValue(options, props, key, value, instance, isAbsent) {
      const opt = options[key];
      if (opt != null) {
        const hasDefault = hasOwn(opt, "default");
        if (hasDefault && value === void 0) {
          const defaultValue = opt.default;
          if (opt.type !== Function && isFunction$1(defaultValue)) {
            const { propsDefaults } = instance;
            if (key in propsDefaults) {
              value = propsDefaults[key];
            } else {
              setCurrentInstance(instance);
              value = propsDefaults[key] = defaultValue.call(null, props);
              unsetCurrentInstance();
            }
          } else {
            value = defaultValue;
          }
        }
        if (opt[
          0
          /* BooleanFlags.shouldCast */
        ]) {
          if (isAbsent && !hasDefault) {
            value = false;
          } else if (opt[
            1
            /* BooleanFlags.shouldCastTrue */
          ] && (value === "" || value === hyphenate(key))) {
            value = true;
          }
        }
      }
      return value;
    }
    function normalizePropsOptions(comp, appContext, asMixin = false) {
      const cache = appContext.propsCache;
      const cached = cache.get(comp);
      if (cached) {
        return cached;
      }
      const raw = comp.props;
      const normalized = {};
      const needCastKeys = [];
      let hasExtends = false;
      if (!isFunction$1(comp)) {
        const extendProps = (raw2) => {
          hasExtends = true;
          const [props, keys2] = normalizePropsOptions(raw2, appContext, true);
          extend(normalized, props);
          if (keys2)
            needCastKeys.push(...keys2);
        };
        if (!asMixin && appContext.mixins.length) {
          appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
          extendProps(comp.extends);
        }
        if (comp.mixins) {
          comp.mixins.forEach(extendProps);
        }
      }
      if (!raw && !hasExtends) {
        if (isObject$1(comp)) {
          cache.set(comp, EMPTY_ARR);
        }
        return EMPTY_ARR;
      }
      if (isArray$2(raw)) {
        for (let i = 0; i < raw.length; i++) {
          const normalizedKey = camelize(raw[i]);
          if (validatePropName(normalizedKey)) {
            normalized[normalizedKey] = EMPTY_OBJ;
          }
        }
      } else if (raw) {
        for (const key in raw) {
          const normalizedKey = camelize(key);
          if (validatePropName(normalizedKey)) {
            const opt = raw[key];
            const prop = normalized[normalizedKey] = isArray$2(opt) || isFunction$1(opt) ? { type: opt } : Object.assign({}, opt);
            if (prop) {
              const booleanIndex = getTypeIndex(Boolean, prop.type);
              const stringIndex = getTypeIndex(String, prop.type);
              prop[
                0
                /* BooleanFlags.shouldCast */
              ] = booleanIndex > -1;
              prop[
                1
                /* BooleanFlags.shouldCastTrue */
              ] = stringIndex < 0 || booleanIndex < stringIndex;
              if (booleanIndex > -1 || hasOwn(prop, "default")) {
                needCastKeys.push(normalizedKey);
              }
            }
          }
        }
      }
      const res = [normalized, needCastKeys];
      if (isObject$1(comp)) {
        cache.set(comp, res);
      }
      return res;
    }
    function validatePropName(key) {
      if (key[0] !== "$") {
        return true;
      }
      return false;
    }
    function getType(ctor) {
      const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
      return match ? match[2] : ctor === null ? "null" : "";
    }
    function isSameType(a, b) {
      return getType(a) === getType(b);
    }
    function getTypeIndex(type, expectedTypes) {
      if (isArray$2(expectedTypes)) {
        return expectedTypes.findIndex((t) => isSameType(t, type));
      } else if (isFunction$1(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
      }
      return -1;
    }
    const isInternalKey = (key) => key[0] === "_" || key === "$stable";
    const normalizeSlotValue = (value) => isArray$2(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
    const normalizeSlot = (key, rawSlot, ctx) => {
      if (rawSlot._n) {
        return rawSlot;
      }
      const normalized = withCtx((...args) => {
        if (false)
          ;
        return normalizeSlotValue(rawSlot(...args));
      }, ctx);
      normalized._c = false;
      return normalized;
    };
    const normalizeObjectSlots = (rawSlots, slots, instance) => {
      const ctx = rawSlots._ctx;
      for (const key in rawSlots) {
        if (isInternalKey(key))
          continue;
        const value = rawSlots[key];
        if (isFunction$1(value)) {
          slots[key] = normalizeSlot(key, value, ctx);
        } else if (value != null) {
          const normalized = normalizeSlotValue(value);
          slots[key] = () => normalized;
        }
      }
    };
    const normalizeVNodeSlots = (instance, children) => {
      const normalized = normalizeSlotValue(children);
      instance.slots.default = () => normalized;
    };
    const initSlots = (instance, children) => {
      if (instance.vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          instance.slots = toRaw(children);
          def(children, "_", type);
        } else {
          normalizeObjectSlots(children, instance.slots = {});
        }
      } else {
        instance.slots = {};
        if (children) {
          normalizeVNodeSlots(instance, children);
        }
      }
      def(instance.slots, InternalObjectKey, 1);
    };
    const updateSlots = (instance, children, optimized) => {
      const { vnode, slots } = instance;
      let needDeletionCheck = true;
      let deletionComparisonTarget = EMPTY_OBJ;
      if (vnode.shapeFlag & 32) {
        const type = children._;
        if (type) {
          if (optimized && type === 1) {
            needDeletionCheck = false;
          } else {
            extend(slots, children);
            if (!optimized && type === 1) {
              delete slots._;
            }
          }
        } else {
          needDeletionCheck = !children.$stable;
          normalizeObjectSlots(children, slots);
        }
        deletionComparisonTarget = children;
      } else if (children) {
        normalizeVNodeSlots(instance, children);
        deletionComparisonTarget = { default: 1 };
      }
      if (needDeletionCheck) {
        for (const key in slots) {
          if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
            delete slots[key];
          }
        }
      }
    };
    function createAppContext() {
      return {
        app: null,
        config: {
          isNativeTag: NO,
          performance: false,
          globalProperties: {},
          optionMergeStrategies: {},
          errorHandler: void 0,
          warnHandler: void 0,
          compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: /* @__PURE__ */ Object.create(null),
        optionsCache: /* @__PURE__ */ new WeakMap(),
        propsCache: /* @__PURE__ */ new WeakMap(),
        emitsCache: /* @__PURE__ */ new WeakMap()
      };
    }
    let uid$1 = 0;
    function createAppAPI(render, hydrate) {
      return function createApp2(rootComponent, rootProps = null) {
        if (!isFunction$1(rootComponent)) {
          rootComponent = Object.assign({}, rootComponent);
        }
        if (rootProps != null && !isObject$1(rootProps)) {
          rootProps = null;
        }
        const context = createAppContext();
        const installedPlugins = /* @__PURE__ */ new Set();
        let isMounted = false;
        const app2 = context.app = {
          _uid: uid$1++,
          _component: rootComponent,
          _props: rootProps,
          _container: null,
          _context: context,
          _instance: null,
          version,
          get config() {
            return context.config;
          },
          set config(v) {
          },
          use(plugin, ...options) {
            if (installedPlugins.has(plugin))
              ;
            else if (plugin && isFunction$1(plugin.install)) {
              installedPlugins.add(plugin);
              plugin.install(app2, ...options);
            } else if (isFunction$1(plugin)) {
              installedPlugins.add(plugin);
              plugin(app2, ...options);
            } else
              ;
            return app2;
          },
          mixin(mixin) {
            {
              if (!context.mixins.includes(mixin)) {
                context.mixins.push(mixin);
              }
            }
            return app2;
          },
          component(name, component) {
            if (!component) {
              return context.components[name];
            }
            context.components[name] = component;
            return app2;
          },
          directive(name, directive) {
            if (!directive) {
              return context.directives[name];
            }
            context.directives[name] = directive;
            return app2;
          },
          mount(rootContainer, isHydrate, isSVG) {
            if (!isMounted) {
              const vnode = createVNode(rootComponent, rootProps);
              vnode.appContext = context;
              if (isHydrate && hydrate) {
                hydrate(vnode, rootContainer);
              } else {
                render(vnode, rootContainer, isSVG);
              }
              isMounted = true;
              app2._container = rootContainer;
              rootContainer.__vue_app__ = app2;
              return getExposeProxy(vnode.component) || vnode.component.proxy;
            }
          },
          unmount() {
            if (isMounted) {
              render(null, app2._container);
              delete app2._container.__vue_app__;
            }
          },
          provide(key, value) {
            context.provides[key] = value;
            return app2;
          }
        };
        return app2;
      };
    }
    function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
      if (isArray$2(rawRef)) {
        rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray$2(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
        return;
      }
      if (isAsyncWrapper(vnode) && !isUnmount) {
        return;
      }
      const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
      const value = isUnmount ? null : refValue;
      const { i: owner, r: ref2 } = rawRef;
      const oldRef = oldRawRef && oldRawRef.r;
      const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
      const setupState = owner.setupState;
      if (oldRef != null && oldRef !== ref2) {
        if (isString(oldRef)) {
          refs[oldRef] = null;
          if (hasOwn(setupState, oldRef)) {
            setupState[oldRef] = null;
          }
        } else if (isRef(oldRef)) {
          oldRef.value = null;
        }
      }
      if (isFunction$1(ref2)) {
        callWithErrorHandling(ref2, owner, 12, [value, refs]);
      } else {
        const _isString = isString(ref2);
        const _isRef = isRef(ref2);
        if (_isString || _isRef) {
          const doSet = () => {
            if (rawRef.f) {
              const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
              if (isUnmount) {
                isArray$2(existing) && remove(existing, refValue);
              } else {
                if (!isArray$2(existing)) {
                  if (_isString) {
                    refs[ref2] = [refValue];
                    if (hasOwn(setupState, ref2)) {
                      setupState[ref2] = refs[ref2];
                    }
                  } else {
                    ref2.value = [refValue];
                    if (rawRef.k)
                      refs[rawRef.k] = ref2.value;
                  }
                } else if (!existing.includes(refValue)) {
                  existing.push(refValue);
                }
              }
            } else if (_isString) {
              refs[ref2] = value;
              if (hasOwn(setupState, ref2)) {
                setupState[ref2] = value;
              }
            } else if (_isRef) {
              ref2.value = value;
              if (rawRef.k)
                refs[rawRef.k] = value;
            } else
              ;
          };
          if (value) {
            doSet.id = -1;
            queuePostRenderEffect(doSet, parentSuspense);
          } else {
            doSet();
          }
        }
      }
    }
    const queuePostRenderEffect = queueEffectWithSuspense;
    function createRenderer(options) {
      return baseCreateRenderer(options);
    }
    function baseCreateRenderer(options, createHydrationFns) {
      const target = getGlobalThis();
      target.__VUE__ = true;
      const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
      const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
        if (n1 === n2) {
          return;
        }
        if (n1 && !isSameVNodeType(n1, n2)) {
          anchor = getNextHostNode(n1);
          unmount(n1, parentComponent, parentSuspense, true);
          n1 = null;
        }
        if (n2.patchFlag === -2) {
          optimized = false;
          n2.dynamicChildren = null;
        }
        const { type, ref: ref2, shapeFlag } = n2;
        switch (type) {
          case Text:
            processText(n1, n2, container, anchor);
            break;
          case Comment:
            processCommentNode(n1, n2, container, anchor);
            break;
          case Static:
            if (n1 == null) {
              mountStaticNode(n2, container, anchor, isSVG);
            }
            break;
          case Fragment:
            processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            break;
          default:
            if (shapeFlag & 1) {
              processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 6) {
              processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (shapeFlag & 64) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else if (shapeFlag & 128) {
              type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
            } else
              ;
        }
        if (ref2 != null && parentComponent) {
          setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
        }
      };
      const processText = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
        } else {
          const el = n2.el = n1.el;
          if (n2.children !== n1.children) {
            hostSetText(el, n2.children);
          }
        }
      };
      const processCommentNode = (n1, n2, container, anchor) => {
        if (n1 == null) {
          hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
        } else {
          n2.el = n1.el;
        }
      };
      const mountStaticNode = (n2, container, anchor, isSVG) => {
        [n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
      };
      const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostInsert(el, container, nextSibling);
          el = next;
        }
        hostInsert(anchor, container, nextSibling);
      };
      const removeStaticNode = ({ el, anchor }) => {
        let next;
        while (el && el !== anchor) {
          next = hostNextSibling(el);
          hostRemove(el);
          el = next;
        }
        hostRemove(anchor);
      };
      const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        isSVG = isSVG || n2.type === "svg";
        if (n1 == null) {
          mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let el;
        let vnodeHook;
        const { type, props, shapeFlag, transition, dirs } = vnode;
        el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
        if (shapeFlag & 8) {
          hostSetElementText(el, vnode.children);
        } else if (shapeFlag & 16) {
          mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== "foreignObject", slotScopeIds, optimized);
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "created");
        }
        setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
        if (props) {
          for (const key in props) {
            if (key !== "value" && !isReservedProp(key)) {
              hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in props) {
            hostPatchProp(el, "value", null, props.value);
          }
          if (vnodeHook = props.onVnodeBeforeMount) {
            invokeVNodeHook(vnodeHook, parentComponent, vnode);
          }
        }
        if (dirs) {
          invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
        }
        const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
        if (needCallTransitionHooks) {
          transition.beforeEnter(el);
        }
        hostInsert(el, container, anchor);
        if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            needCallTransitionHooks && transition.enter(el);
            dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
          }, parentSuspense);
        }
      };
      const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
        if (scopeId) {
          hostSetScopeId(el, scopeId);
        }
        if (slotScopeIds) {
          for (let i = 0; i < slotScopeIds.length; i++) {
            hostSetScopeId(el, slotScopeIds[i]);
          }
        }
        if (parentComponent) {
          let subTree = parentComponent.subTree;
          if (vnode === subTree) {
            const parentVNode = parentComponent.vnode;
            setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
          }
        }
      };
      const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start = 0) => {
        for (let i = start; i < children.length; i++) {
          const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
          patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      };
      const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const el = n2.el = n1.el;
        let { patchFlag, dynamicChildren, dirs } = n2;
        patchFlag |= n1.patchFlag & 16;
        const oldProps = n1.props || EMPTY_OBJ;
        const newProps = n2.props || EMPTY_OBJ;
        let vnodeHook;
        parentComponent && toggleRecurse(parentComponent, false);
        if (vnodeHook = newProps.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        }
        if (dirs) {
          invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
        }
        parentComponent && toggleRecurse(parentComponent, true);
        const areChildrenSVG = isSVG && n2.type !== "foreignObject";
        if (dynamicChildren) {
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        } else if (!optimized) {
          patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
        }
        if (patchFlag > 0) {
          if (patchFlag & 16) {
            patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
          } else {
            if (patchFlag & 2) {
              if (oldProps.class !== newProps.class) {
                hostPatchProp(el, "class", null, newProps.class, isSVG);
              }
            }
            if (patchFlag & 4) {
              hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
            }
            if (patchFlag & 8) {
              const propsToUpdate = n2.dynamicProps;
              for (let i = 0; i < propsToUpdate.length; i++) {
                const key = propsToUpdate[i];
                const prev = oldProps[key];
                const next = newProps[key];
                if (next !== prev || key === "value") {
                  hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
                }
              }
            }
          }
          if (patchFlag & 1) {
            if (n1.children !== n2.children) {
              hostSetElementText(el, n2.children);
            }
          }
        } else if (!optimized && dynamicChildren == null) {
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        }
        if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
            dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
          }, parentSuspense);
        }
      };
      const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
        for (let i = 0; i < newChildren.length; i++) {
          const oldVNode = oldChildren[i];
          const newVNode = newChildren[i];
          const container = (
            // oldVNode may be an errored async setup() component inside Suspense
            // which will not have a mounted element
            oldVNode.el && // - In the case of a Fragment, we need to provide the actual parent
            // of the Fragment itself so it can move its children.
            (oldVNode.type === Fragment || // - In the case of different nodes, there is going to be a replacement
            // which also requires the correct parent container
            !isSameVNodeType(oldVNode, newVNode) || // - In the case of a component, it could contain anything.
            oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : (
              // In other cases, the parent container is not actually used so we
              // just pass the block element here to avoid a DOM parentNode call.
              fallbackContainer
            )
          );
          patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
        }
      };
      const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
        if (oldProps !== newProps) {
          if (oldProps !== EMPTY_OBJ) {
            for (const key in oldProps) {
              if (!isReservedProp(key) && !(key in newProps)) {
                hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
          for (const key in newProps) {
            if (isReservedProp(key))
              continue;
            const next = newProps[key];
            const prev = oldProps[key];
            if (next !== prev && key !== "value") {
              hostPatchProp(el, key, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
          if ("value" in newProps) {
            hostPatchProp(el, "value", oldProps.value, newProps.value);
          }
        }
      };
      const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
        const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
        let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
        if (fragmentSlotScopeIds) {
          slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
        }
        if (n1 == null) {
          hostInsert(fragmentStartAnchor, container, anchor);
          hostInsert(fragmentEndAnchor, container, anchor);
          mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && // #2715 the previous fragment could've been a BAILed one as a result
          // of renderSlot() with no valid children
          n1.dynamicChildren) {
            patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
            if (
              // #2080 if the stable fragment has a key, it's a <template v-for> that may
              //  get moved around. Make sure all root level vnodes inherit el.
              // #2134 or if it's a component root, it may also get moved around
              // as the component is being moved.
              n2.key != null || parentComponent && n2 === parentComponent.subTree
            ) {
              traverseStaticChildren(
                n1,
                n2,
                true
                /* shallow */
              );
            }
          } else {
            patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      };
      const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        n2.slotScopeIds = slotScopeIds;
        if (n1 == null) {
          if (n2.shapeFlag & 512) {
            parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
          } else {
            mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
          }
        } else {
          updateComponent(n1, n2, optimized);
        }
      };
      const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
        const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
        if (isKeepAlive(initialVNode)) {
          instance.ctx.renderer = internals;
        }
        {
          setupComponent(instance);
        }
        if (instance.asyncDep) {
          parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
          if (!initialVNode.el) {
            const placeholder = instance.subTree = createVNode(Comment);
            processCommentNode(null, placeholder, container, anchor);
          }
          return;
        }
        setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      };
      const updateComponent = (n1, n2, optimized) => {
        const instance = n2.component = n1.component;
        if (shouldUpdateComponent(n1, n2, optimized)) {
          if (instance.asyncDep && !instance.asyncResolved) {
            updateComponentPreRender(instance, n2, optimized);
            return;
          } else {
            instance.next = n2;
            invalidateJob(instance.update);
            instance.update();
          }
        } else {
          n2.el = n1.el;
          instance.vnode = n2;
        }
      };
      const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
        const componentUpdateFn = () => {
          if (!instance.isMounted) {
            let vnodeHook;
            const { el, props } = initialVNode;
            const { bm, m, parent } = instance;
            const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
            toggleRecurse(instance, false);
            if (bm) {
              invokeArrayFns(bm);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
              invokeVNodeHook(vnodeHook, parent, initialVNode);
            }
            toggleRecurse(instance, true);
            if (el && hydrateNode) {
              const hydrateSubTree = () => {
                instance.subTree = renderComponentRoot(instance);
                hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              };
              if (isAsyncWrapperVNode) {
                initialVNode.type.__asyncLoader().then(
                  // note: we are moving the render call into an async callback,
                  // which means it won't track dependencies - but it's ok because
                  // a server-rendered async wrapper is already in resolved state
                  // and it will never need to change.
                  () => !instance.isUnmounted && hydrateSubTree()
                );
              } else {
                hydrateSubTree();
              }
            } else {
              const subTree = instance.subTree = renderComponentRoot(instance);
              patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
              initialVNode.el = subTree.el;
            }
            if (m) {
              queuePostRenderEffect(m, parentSuspense);
            }
            if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
              const scopedInitialVNode = initialVNode;
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
            }
            if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
              instance.a && queuePostRenderEffect(instance.a, parentSuspense);
            }
            instance.isMounted = true;
            initialVNode = container = anchor = null;
          } else {
            let { next, bu, u, parent, vnode } = instance;
            let originNext = next;
            let vnodeHook;
            toggleRecurse(instance, false);
            if (next) {
              next.el = vnode.el;
              updateComponentPreRender(instance, next, optimized);
            } else {
              next = vnode;
            }
            if (bu) {
              invokeArrayFns(bu);
            }
            if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
              invokeVNodeHook(vnodeHook, parent, next, vnode);
            }
            toggleRecurse(instance, true);
            const nextTree = renderComponentRoot(instance);
            const prevTree = instance.subTree;
            instance.subTree = nextTree;
            patch(
              prevTree,
              nextTree,
              // parent may have changed if it's in a teleport
              hostParentNode(prevTree.el),
              // anchor may have changed if it's in a fragment
              getNextHostNode(prevTree),
              instance,
              parentSuspense,
              isSVG
            );
            next.el = nextTree.el;
            if (originNext === null) {
              updateHOCHostEl(instance, nextTree.el);
            }
            if (u) {
              queuePostRenderEffect(u, parentSuspense);
            }
            if (vnodeHook = next.props && next.props.onVnodeUpdated) {
              queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
            }
          }
        };
        const effect = instance.effect = new ReactiveEffect(
          componentUpdateFn,
          () => queueJob(update),
          instance.scope
          // track it in component's effect scope
        );
        const update = instance.update = () => effect.run();
        update.id = instance.uid;
        toggleRecurse(instance, true);
        update();
      };
      const updateComponentPreRender = (instance, nextVNode, optimized) => {
        nextVNode.component = instance;
        const prevProps = instance.vnode.props;
        instance.vnode = nextVNode;
        instance.next = null;
        updateProps(instance, nextVNode.props, prevProps, optimized);
        updateSlots(instance, nextVNode.children, optimized);
        pauseTracking();
        flushPreFlushCbs();
        resetTracking();
      };
      const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
        const c1 = n1 && n1.children;
        const prevShapeFlag = n1 ? n1.shapeFlag : 0;
        const c2 = n2.children;
        const { patchFlag, shapeFlag } = n2;
        if (patchFlag > 0) {
          if (patchFlag & 128) {
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          } else if (patchFlag & 256) {
            patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            return;
          }
        }
        if (shapeFlag & 8) {
          if (prevShapeFlag & 16) {
            unmountChildren(c1, parentComponent, parentSuspense);
          }
          if (c2 !== c1) {
            hostSetElementText(container, c2);
          }
        } else {
          if (prevShapeFlag & 16) {
            if (shapeFlag & 16) {
              patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else {
              unmountChildren(c1, parentComponent, parentSuspense, true);
            }
          } else {
            if (prevShapeFlag & 8) {
              hostSetElementText(container, "");
            }
            if (shapeFlag & 16) {
              mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            }
          }
        }
      };
      const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        c1 = c1 || EMPTY_ARR;
        c2 = c2 || EMPTY_ARR;
        const oldLength = c1.length;
        const newLength = c2.length;
        const commonLength = Math.min(oldLength, newLength);
        let i;
        for (i = 0; i < commonLength; i++) {
          const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
        if (oldLength > newLength) {
          unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
        } else {
          mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
        }
      };
      const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
        let i = 0;
        const l2 = c2.length;
        let e1 = c1.length - 1;
        let e2 = l2 - 1;
        while (i <= e1 && i <= e2) {
          const n1 = c1[i];
          const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          i++;
        }
        while (i <= e1 && i <= e2) {
          const n1 = c1[e1];
          const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
          if (isSameVNodeType(n1, n2)) {
            patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            break;
          }
          e1--;
          e2--;
        }
        if (i > e1) {
          if (i <= e2) {
            const nextPos = e2 + 1;
            const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
            while (i <= e2) {
              patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              i++;
            }
          }
        } else if (i > e2) {
          while (i <= e1) {
            unmount(c1[i], parentComponent, parentSuspense, true);
            i++;
          }
        } else {
          const s1 = i;
          const s2 = i;
          const keyToNewIndexMap = /* @__PURE__ */ new Map();
          for (i = s2; i <= e2; i++) {
            const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
            if (nextChild.key != null) {
              keyToNewIndexMap.set(nextChild.key, i);
            }
          }
          let j;
          let patched = 0;
          const toBePatched = e2 - s2 + 1;
          let moved = false;
          let maxNewIndexSoFar = 0;
          const newIndexToOldIndexMap = new Array(toBePatched);
          for (i = 0; i < toBePatched; i++)
            newIndexToOldIndexMap[i] = 0;
          for (i = s1; i <= e1; i++) {
            const prevChild = c1[i];
            if (patched >= toBePatched) {
              unmount(prevChild, parentComponent, parentSuspense, true);
              continue;
            }
            let newIndex;
            if (prevChild.key != null) {
              newIndex = keyToNewIndexMap.get(prevChild.key);
            } else {
              for (j = s2; j <= e2; j++) {
                if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                  newIndex = j;
                  break;
                }
              }
            }
            if (newIndex === void 0) {
              unmount(prevChild, parentComponent, parentSuspense, true);
            } else {
              newIndexToOldIndexMap[newIndex - s2] = i + 1;
              if (newIndex >= maxNewIndexSoFar) {
                maxNewIndexSoFar = newIndex;
              } else {
                moved = true;
              }
              patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
              patched++;
            }
          }
          const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
          j = increasingNewIndexSequence.length - 1;
          for (i = toBePatched - 1; i >= 0; i--) {
            const nextIndex = s2 + i;
            const nextChild = c2[nextIndex];
            const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
            if (newIndexToOldIndexMap[i] === 0) {
              patch(null, nextChild, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            } else if (moved) {
              if (j < 0 || i !== increasingNewIndexSequence[j]) {
                move(
                  nextChild,
                  container,
                  anchor,
                  2
                  /* MoveType.REORDER */
                );
              } else {
                j--;
              }
            }
          }
        }
      };
      const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
        const { el, type, transition, children, shapeFlag } = vnode;
        if (shapeFlag & 6) {
          move(vnode.component.subTree, container, anchor, moveType);
          return;
        }
        if (shapeFlag & 128) {
          vnode.suspense.move(container, anchor, moveType);
          return;
        }
        if (shapeFlag & 64) {
          type.move(vnode, container, anchor, internals);
          return;
        }
        if (type === Fragment) {
          hostInsert(el, container, anchor);
          for (let i = 0; i < children.length; i++) {
            move(children[i], container, anchor, moveType);
          }
          hostInsert(vnode.anchor, container, anchor);
          return;
        }
        if (type === Static) {
          moveStaticNode(vnode, container, anchor);
          return;
        }
        const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
        if (needTransition) {
          if (moveType === 0) {
            transition.beforeEnter(el);
            hostInsert(el, container, anchor);
            queuePostRenderEffect(() => transition.enter(el), parentSuspense);
          } else {
            const { leave, delayLeave, afterLeave } = transition;
            const remove3 = () => hostInsert(el, container, anchor);
            const performLeave = () => {
              leave(el, () => {
                remove3();
                afterLeave && afterLeave();
              });
            };
            if (delayLeave) {
              delayLeave(el, remove3, performLeave);
            } else {
              performLeave();
            }
          }
        } else {
          hostInsert(el, container, anchor);
        }
      };
      const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
        const { type, props, ref: ref2, children, dynamicChildren, shapeFlag, patchFlag, dirs } = vnode;
        if (ref2 != null) {
          setRef(ref2, null, parentSuspense, vnode, true);
        }
        if (shapeFlag & 256) {
          parentComponent.ctx.deactivate(vnode);
          return;
        }
        const shouldInvokeDirs = shapeFlag & 1 && dirs;
        const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
        let vnodeHook;
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
        if (shapeFlag & 6) {
          unmountComponent(vnode.component, parentSuspense, doRemove);
        } else {
          if (shapeFlag & 128) {
            vnode.suspense.unmount(parentSuspense, doRemove);
            return;
          }
          if (shouldInvokeDirs) {
            invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
          }
          if (shapeFlag & 64) {
            vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
          } else if (dynamicChildren && // #1153: fast path should not be taken for non-stable (v-for) fragments
          (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
            unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
          } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
            unmountChildren(children, parentComponent, parentSuspense);
          }
          if (doRemove) {
            remove2(vnode);
          }
        }
        if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
          queuePostRenderEffect(() => {
            vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
            shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
          }, parentSuspense);
        }
      };
      const remove2 = (vnode) => {
        const { type, el, anchor, transition } = vnode;
        if (type === Fragment) {
          {
            removeFragment(el, anchor);
          }
          return;
        }
        if (type === Static) {
          removeStaticNode(vnode);
          return;
        }
        const performRemove = () => {
          hostRemove(el);
          if (transition && !transition.persisted && transition.afterLeave) {
            transition.afterLeave();
          }
        };
        if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
          const { leave, delayLeave } = transition;
          const performLeave = () => leave(el, performRemove);
          if (delayLeave) {
            delayLeave(vnode.el, performRemove, performLeave);
          } else {
            performLeave();
          }
        } else {
          performRemove();
        }
      };
      const removeFragment = (cur, end) => {
        let next;
        while (cur !== end) {
          next = hostNextSibling(cur);
          hostRemove(cur);
          cur = next;
        }
        hostRemove(end);
      };
      const unmountComponent = (instance, parentSuspense, doRemove) => {
        const { bum, scope, update, subTree, um } = instance;
        if (bum) {
          invokeArrayFns(bum);
        }
        scope.stop();
        if (update) {
          update.active = false;
          unmount(subTree, instance, parentSuspense, doRemove);
        }
        if (um) {
          queuePostRenderEffect(um, parentSuspense);
        }
        queuePostRenderEffect(() => {
          instance.isUnmounted = true;
        }, parentSuspense);
        if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
          parentSuspense.deps--;
          if (parentSuspense.deps === 0) {
            parentSuspense.resolve();
          }
        }
      };
      const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
        for (let i = start; i < children.length; i++) {
          unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
        }
      };
      const getNextHostNode = (vnode) => {
        if (vnode.shapeFlag & 6) {
          return getNextHostNode(vnode.component.subTree);
        }
        if (vnode.shapeFlag & 128) {
          return vnode.suspense.next();
        }
        return hostNextSibling(vnode.anchor || vnode.el);
      };
      const render = (vnode, container, isSVG) => {
        if (vnode == null) {
          if (container._vnode) {
            unmount(container._vnode, null, null, true);
          }
        } else {
          patch(container._vnode || null, vnode, container, null, null, null, isSVG);
        }
        flushPreFlushCbs();
        flushPostFlushCbs();
        container._vnode = vnode;
      };
      const internals = {
        p: patch,
        um: unmount,
        m: move,
        r: remove2,
        mt: mountComponent,
        mc: mountChildren,
        pc: patchChildren,
        pbc: patchBlockChildren,
        n: getNextHostNode,
        o: options
      };
      let hydrate;
      let hydrateNode;
      if (createHydrationFns) {
        [hydrate, hydrateNode] = createHydrationFns(internals);
      }
      return {
        render,
        hydrate,
        createApp: createAppAPI(render, hydrate)
      };
    }
    function toggleRecurse({ effect, update }, allowed) {
      effect.allowRecurse = update.allowRecurse = allowed;
    }
    function traverseStaticChildren(n1, n2, shallow = false) {
      const ch1 = n1.children;
      const ch2 = n2.children;
      if (isArray$2(ch1) && isArray$2(ch2)) {
        for (let i = 0; i < ch1.length; i++) {
          const c1 = ch1[i];
          let c2 = ch2[i];
          if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
            if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
              c2 = ch2[i] = cloneIfMounted(ch2[i]);
              c2.el = c1.el;
            }
            if (!shallow)
              traverseStaticChildren(c1, c2);
          }
          if (c2.type === Text) {
            c2.el = c1.el;
          }
        }
      }
    }
    function getSequence(arr) {
      const p2 = arr.slice();
      const result = [0];
      let i, j, u, v, c;
      const len = arr.length;
      for (i = 0; i < len; i++) {
        const arrI = arr[i];
        if (arrI !== 0) {
          j = result[result.length - 1];
          if (arr[j] < arrI) {
            p2[i] = j;
            result.push(i);
            continue;
          }
          u = 0;
          v = result.length - 1;
          while (u < v) {
            c = u + v >> 1;
            if (arr[result[c]] < arrI) {
              u = c + 1;
            } else {
              v = c;
            }
          }
          if (arrI < arr[result[u]]) {
            if (u > 0) {
              p2[i] = result[u - 1];
            }
            result[u] = i;
          }
        }
      }
      u = result.length;
      v = result[u - 1];
      while (u-- > 0) {
        result[u] = v;
        v = p2[v];
      }
      return result;
    }
    const isTeleport = (type) => type.__isTeleport;
    const Fragment = Symbol(void 0);
    const Text = Symbol(void 0);
    const Comment = Symbol(void 0);
    const Static = Symbol(void 0);
    const blockStack = [];
    let currentBlock = null;
    function openBlock(disableTracking = false) {
      blockStack.push(currentBlock = disableTracking ? null : []);
    }
    function closeBlock() {
      blockStack.pop();
      currentBlock = blockStack[blockStack.length - 1] || null;
    }
    let isBlockTreeEnabled = 1;
    function setBlockTracking(value) {
      isBlockTreeEnabled += value;
    }
    function setupBlock(vnode) {
      vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
      closeBlock();
      if (isBlockTreeEnabled > 0 && currentBlock) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
      return setupBlock(createBaseVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        shapeFlag,
        true
        /* isBlock */
      ));
    }
    function createBlock(type, props, children, patchFlag, dynamicProps) {
      return setupBlock(createVNode(
        type,
        props,
        children,
        patchFlag,
        dynamicProps,
        true
        /* isBlock: prevent a block from tracking itself */
      ));
    }
    function isVNode(value) {
      return value ? value.__v_isVNode === true : false;
    }
    function isSameVNodeType(n1, n2) {
      return n1.type === n2.type && n1.key === n2.key;
    }
    const InternalObjectKey = `__vInternal`;
    const normalizeKey = ({ key }) => key != null ? key : null;
    const normalizeRef = ({ ref: ref2, ref_key, ref_for }) => {
      return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction$1(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
      const vnode = {
        __v_isVNode: true,
        __v_skip: true,
        type,
        props,
        key: props && normalizeKey(props),
        ref: props && normalizeRef(props),
        scopeId: currentScopeId,
        slotScopeIds: null,
        children,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag,
        patchFlag,
        dynamicProps,
        dynamicChildren: null,
        appContext: null,
        ctx: currentRenderingInstance
      };
      if (needFullChildrenNormalization) {
        normalizeChildren(vnode, children);
        if (shapeFlag & 128) {
          type.normalize(vnode);
        }
      } else if (children) {
        vnode.shapeFlag |= isString(children) ? 8 : 16;
      }
      if (isBlockTreeEnabled > 0 && // avoid a block node from tracking itself
      !isBlockNode && // has current parent block
      currentBlock && // presence of a patch flag indicates this node needs patching on updates.
      // component nodes also should always be patched, because even if the
      // component doesn't need to update, it needs to persist the instance on to
      // the next vnode so that it can be properly unmounted later.
      (vnode.patchFlag > 0 || shapeFlag & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
      // vnode should not be considered dynamic due to handler caching.
      vnode.patchFlag !== 32) {
        currentBlock.push(vnode);
      }
      return vnode;
    }
    const createVNode = _createVNode;
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
      if (!type || type === NULL_DYNAMIC_COMPONENT) {
        type = Comment;
      }
      if (isVNode(type)) {
        const cloned = cloneVNode(
          type,
          props,
          true
          /* mergeRef: true */
        );
        if (children) {
          normalizeChildren(cloned, children);
        }
        if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
          if (cloned.shapeFlag & 6) {
            currentBlock[currentBlock.indexOf(type)] = cloned;
          } else {
            currentBlock.push(cloned);
          }
        }
        cloned.patchFlag |= -2;
        return cloned;
      }
      if (isClassComponent(type)) {
        type = type.__vccOpts;
      }
      if (props) {
        props = guardReactiveProps(props);
        let { class: klass, style } = props;
        if (klass && !isString(klass)) {
          props.class = normalizeClass(klass);
        }
        if (isObject$1(style)) {
          if (isProxy(style) && !isArray$2(style)) {
            style = extend({}, style);
          }
          props.style = normalizeStyle(style);
        }
      }
      const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction$1(type) ? 2 : 0;
      return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
      if (!props)
        return null;
      return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
      const { props, ref: ref2, patchFlag, children } = vnode;
      const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
      const cloned = {
        __v_isVNode: true,
        __v_skip: true,
        type: vnode.type,
        props: mergedProps,
        key: mergedProps && normalizeKey(mergedProps),
        ref: extraProps && extraProps.ref ? (
          // #2078 in the case of <component :is="vnode" ref="extra"/>
          // if the vnode itself already has a ref, cloneVNode will need to merge
          // the refs so the single vnode can be set on multiple refs
          mergeRef && ref2 ? isArray$2(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps)
        ) : ref2,
        scopeId: vnode.scopeId,
        slotScopeIds: vnode.slotScopeIds,
        children,
        target: vnode.target,
        targetAnchor: vnode.targetAnchor,
        staticCount: vnode.staticCount,
        shapeFlag: vnode.shapeFlag,
        // if the vnode is cloned with extra props, we can no longer assume its
        // existing patch flag to be reliable and need to add the FULL_PROPS flag.
        // note: preserve flag for fragments since they use the flag for children
        // fast paths only.
        patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
        dynamicProps: vnode.dynamicProps,
        dynamicChildren: vnode.dynamicChildren,
        appContext: vnode.appContext,
        dirs: vnode.dirs,
        transition: vnode.transition,
        // These should technically only be non-null on mounted VNodes. However,
        // they *should* be copied for kept-alive vnodes. So we just always copy
        // them since them being non-null during a mount doesn't affect the logic as
        // they will simply be overwritten.
        component: vnode.component,
        suspense: vnode.suspense,
        ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
        ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
        el: vnode.el,
        anchor: vnode.anchor,
        ctx: vnode.ctx,
        ce: vnode.ce
      };
      return cloned;
    }
    function createTextVNode(text = " ", flag = 0) {
      return createVNode(Text, null, text, flag);
    }
    function createCommentVNode(text = "", asBlock = false) {
      return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
    }
    function normalizeVNode(child) {
      if (child == null || typeof child === "boolean") {
        return createVNode(Comment);
      } else if (isArray$2(child)) {
        return createVNode(
          Fragment,
          null,
          // #3666, avoid reference pollution when reusing vnode
          child.slice()
        );
      } else if (typeof child === "object") {
        return cloneIfMounted(child);
      } else {
        return createVNode(Text, null, String(child));
      }
    }
    function cloneIfMounted(child) {
      return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
    }
    function normalizeChildren(vnode, children) {
      let type = 0;
      const { shapeFlag } = vnode;
      if (children == null) {
        children = null;
      } else if (isArray$2(children)) {
        type = 16;
      } else if (typeof children === "object") {
        if (shapeFlag & (1 | 64)) {
          const slot = children.default;
          if (slot) {
            slot._c && (slot._d = false);
            normalizeChildren(vnode, slot());
            slot._c && (slot._d = true);
          }
          return;
        } else {
          type = 32;
          const slotFlag = children._;
          if (!slotFlag && !(InternalObjectKey in children)) {
            children._ctx = currentRenderingInstance;
          } else if (slotFlag === 3 && currentRenderingInstance) {
            if (currentRenderingInstance.slots._ === 1) {
              children._ = 1;
            } else {
              children._ = 2;
              vnode.patchFlag |= 1024;
            }
          }
        }
      } else if (isFunction$1(children)) {
        children = { default: children, _ctx: currentRenderingInstance };
        type = 32;
      } else {
        children = String(children);
        if (shapeFlag & 64) {
          type = 16;
          children = [createTextVNode(children)];
        } else {
          type = 8;
        }
      }
      vnode.children = children;
      vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
      const ret = {};
      for (let i = 0; i < args.length; i++) {
        const toMerge = args[i];
        for (const key in toMerge) {
          if (key === "class") {
            if (ret.class !== toMerge.class) {
              ret.class = normalizeClass([ret.class, toMerge.class]);
            }
          } else if (key === "style") {
            ret.style = normalizeStyle([ret.style, toMerge.style]);
          } else if (isOn(key)) {
            const existing = ret[key];
            const incoming = toMerge[key];
            if (incoming && existing !== incoming && !(isArray$2(existing) && existing.includes(incoming))) {
              ret[key] = existing ? [].concat(existing, incoming) : incoming;
            }
          } else if (key !== "") {
            ret[key] = toMerge[key];
          }
        }
      }
      return ret;
    }
    function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
      callWithAsyncErrorHandling(hook, instance, 7, [
        vnode,
        prevVNode
      ]);
    }
    const emptyAppContext = createAppContext();
    let uid = 0;
    function createComponentInstance(vnode, parent, suspense) {
      const type = vnode.type;
      const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
      const instance = {
        uid: uid++,
        vnode,
        type,
        parent,
        appContext,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new EffectScope(
          true
          /* detached */
        ),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent ? parent.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resolved assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type.inheritAttrs,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
      };
      {
        instance.ctx = { _: instance };
      }
      instance.root = parent ? parent.root : instance;
      instance.emit = emit.bind(null, instance);
      if (vnode.ce) {
        vnode.ce(instance);
      }
      return instance;
    }
    let currentInstance = null;
    const getCurrentInstance = () => currentInstance || currentRenderingInstance;
    const setCurrentInstance = (instance) => {
      currentInstance = instance;
      instance.scope.on();
    };
    const unsetCurrentInstance = () => {
      currentInstance && currentInstance.scope.off();
      currentInstance = null;
    };
    function isStatefulComponent(instance) {
      return instance.vnode.shapeFlag & 4;
    }
    let isInSSRComponentSetup = false;
    function setupComponent(instance, isSSR = false) {
      isInSSRComponentSetup = isSSR;
      const { props, children } = instance.vnode;
      const isStateful = isStatefulComponent(instance);
      initProps(instance, props, isStateful, isSSR);
      initSlots(instance, children);
      const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
      isInSSRComponentSetup = false;
      return setupResult;
    }
    function setupStatefulComponent(instance, isSSR) {
      const Component = instance.type;
      instance.accessCache = /* @__PURE__ */ Object.create(null);
      instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
      const { setup } = Component;
      if (setup) {
        const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        setCurrentInstance(instance);
        pauseTracking();
        const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
        resetTracking();
        unsetCurrentInstance();
        if (isPromise(setupResult)) {
          setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
          if (isSSR) {
            return setupResult.then((resolvedResult) => {
              handleSetupResult(instance, resolvedResult, isSSR);
            }).catch((e) => {
              handleError(
                e,
                instance,
                0
                /* ErrorCodes.SETUP_FUNCTION */
              );
            });
          } else {
            instance.asyncDep = setupResult;
          }
        } else {
          handleSetupResult(instance, setupResult, isSSR);
        }
      } else {
        finishComponentSetup(instance, isSSR);
      }
    }
    function handleSetupResult(instance, setupResult, isSSR) {
      if (isFunction$1(setupResult)) {
        if (instance.type.__ssrInlineRender) {
          instance.ssrRender = setupResult;
        } else {
          instance.render = setupResult;
        }
      } else if (isObject$1(setupResult)) {
        instance.setupState = proxyRefs(setupResult);
      } else
        ;
      finishComponentSetup(instance, isSSR);
    }
    let compile;
    function finishComponentSetup(instance, isSSR, skipOptions) {
      const Component = instance.type;
      if (!instance.render) {
        if (!isSSR && compile && !Component.render) {
          const template = Component.template || resolveMergedOptions(instance).template;
          if (template) {
            const { isCustomElement, compilerOptions } = instance.appContext.config;
            const { delimiters, compilerOptions: componentCompilerOptions } = Component;
            const finalCompilerOptions = extend(extend({
              isCustomElement,
              delimiters
            }, compilerOptions), componentCompilerOptions);
            Component.render = compile(template, finalCompilerOptions);
          }
        }
        instance.render = Component.render || NOOP;
      }
      {
        setCurrentInstance(instance);
        pauseTracking();
        applyOptions(instance);
        resetTracking();
        unsetCurrentInstance();
      }
    }
    function createAttrsProxy(instance) {
      return new Proxy(instance.attrs, {
        get(target, key) {
          track(instance, "get", "$attrs");
          return target[key];
        }
      });
    }
    function createSetupContext(instance) {
      const expose = (exposed) => {
        instance.exposed = exposed || {};
      };
      let attrs;
      {
        return {
          get attrs() {
            return attrs || (attrs = createAttrsProxy(instance));
          },
          slots: instance.slots,
          emit: instance.emit,
          expose
        };
      }
    }
    function getExposeProxy(instance) {
      if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
          get(target, key) {
            if (key in target) {
              return target[key];
            } else if (key in publicPropertiesMap) {
              return publicPropertiesMap[key](instance);
            }
          },
          has(target, key) {
            return key in target || key in publicPropertiesMap;
          }
        }));
      }
    }
    function isClassComponent(value) {
      return isFunction$1(value) && "__vccOpts" in value;
    }
    const computed = (getterOrOptions, debugOptions) => {
      return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
    };
    function h(type, propsOrChildren, children) {
      const l = arguments.length;
      if (l === 2) {
        if (isObject$1(propsOrChildren) && !isArray$2(propsOrChildren)) {
          if (isVNode(propsOrChildren)) {
            return createVNode(type, null, [propsOrChildren]);
          }
          return createVNode(type, propsOrChildren);
        } else {
          return createVNode(type, null, propsOrChildren);
        }
      } else {
        if (l > 3) {
          children = Array.prototype.slice.call(arguments, 2);
        } else if (l === 3 && isVNode(children)) {
          children = [children];
        }
        return createVNode(type, propsOrChildren, children);
      }
    }
    const ssrContextKey = Symbol(``);
    const useSSRContext = () => {
      {
        const ctx = inject(ssrContextKey);
        return ctx;
      }
    };
    const version = "3.2.47";
    const svgNS = "http://www.w3.org/2000/svg";
    const doc = typeof document !== "undefined" ? document : null;
    const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
    const nodeOps = {
      insert: (child, parent, anchor) => {
        parent.insertBefore(child, anchor || null);
      },
      remove: (child) => {
        const parent = child.parentNode;
        if (parent) {
          parent.removeChild(child);
        }
      },
      createElement: (tag, isSVG, is, props) => {
        const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
        if (tag === "select" && props && props.multiple != null) {
          el.setAttribute("multiple", props.multiple);
        }
        return el;
      },
      createText: (text) => doc.createTextNode(text),
      createComment: (text) => doc.createComment(text),
      setText: (node, text) => {
        node.nodeValue = text;
      },
      setElementText: (el, text) => {
        el.textContent = text;
      },
      parentNode: (node) => node.parentNode,
      nextSibling: (node) => node.nextSibling,
      querySelector: (selector) => doc.querySelector(selector),
      setScopeId(el, id) {
        el.setAttribute(id, "");
      },
      // __UNSAFE__
      // Reason: innerHTML.
      // Static content here can only come from compiled templates.
      // As long as the user only uses trusted templates, this is safe.
      insertStaticContent(content, parent, anchor, isSVG, start, end) {
        const before = anchor ? anchor.previousSibling : parent.lastChild;
        if (start && (start === end || start.nextSibling)) {
          while (true) {
            parent.insertBefore(start.cloneNode(true), anchor);
            if (start === end || !(start = start.nextSibling))
              break;
          }
        } else {
          templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
          const template = templateContainer.content;
          if (isSVG) {
            const wrapper = template.firstChild;
            while (wrapper.firstChild) {
              template.appendChild(wrapper.firstChild);
            }
            template.removeChild(wrapper);
          }
          parent.insertBefore(template, anchor);
        }
        return [
          // first
          before ? before.nextSibling : parent.firstChild,
          // last
          anchor ? anchor.previousSibling : parent.lastChild
        ];
      }
    };
    function patchClass(el, value, isSVG) {
      const transitionClasses = el._vtc;
      if (transitionClasses) {
        value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
      }
      if (value == null) {
        el.removeAttribute("class");
      } else if (isSVG) {
        el.setAttribute("class", value);
      } else {
        el.className = value;
      }
    }
    function patchStyle(el, prev, next) {
      const style = el.style;
      const isCssString = isString(next);
      if (next && !isCssString) {
        if (prev && !isString(prev)) {
          for (const key in prev) {
            if (next[key] == null) {
              setStyle(style, key, "");
            }
          }
        }
        for (const key in next) {
          setStyle(style, key, next[key]);
        }
      } else {
        const currentDisplay = style.display;
        if (isCssString) {
          if (prev !== next) {
            style.cssText = next;
          }
        } else if (prev) {
          el.removeAttribute("style");
        }
        if ("_vod" in el) {
          style.display = currentDisplay;
        }
      }
    }
    const importantRE = /\s*!important$/;
    function setStyle(style, name, val) {
      if (isArray$2(val)) {
        val.forEach((v) => setStyle(style, name, v));
      } else {
        if (val == null)
          val = "";
        if (name.startsWith("--")) {
          style.setProperty(name, val);
        } else {
          const prefixed = autoPrefix(style, name);
          if (importantRE.test(val)) {
            style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
          } else {
            style[prefixed] = val;
          }
        }
      }
    }
    const prefixes = ["Webkit", "Moz", "ms"];
    const prefixCache = {};
    function autoPrefix(style, rawName) {
      const cached = prefixCache[rawName];
      if (cached) {
        return cached;
      }
      let name = camelize(rawName);
      if (name !== "filter" && name in style) {
        return prefixCache[rawName] = name;
      }
      name = capitalize(name);
      for (let i = 0; i < prefixes.length; i++) {
        const prefixed = prefixes[i] + name;
        if (prefixed in style) {
          return prefixCache[rawName] = prefixed;
        }
      }
      return rawName;
    }
    const xlinkNS = "http://www.w3.org/1999/xlink";
    function patchAttr(el, key, value, isSVG, instance) {
      if (isSVG && key.startsWith("xlink:")) {
        if (value == null) {
          el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
        } else {
          el.setAttributeNS(xlinkNS, key, value);
        }
      } else {
        const isBoolean = isSpecialBooleanAttr(key);
        if (value == null || isBoolean && !includeBooleanAttr(value)) {
          el.removeAttribute(key);
        } else {
          el.setAttribute(key, isBoolean ? "" : value);
        }
      }
    }
    function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
      if (key === "innerHTML" || key === "textContent") {
        if (prevChildren) {
          unmountChildren(prevChildren, parentComponent, parentSuspense);
        }
        el[key] = value == null ? "" : value;
        return;
      }
      if (key === "value" && el.tagName !== "PROGRESS" && // custom elements may use _value internally
      !el.tagName.includes("-")) {
        el._value = value;
        const newValue = value == null ? "" : value;
        if (el.value !== newValue || // #4956: always set for OPTION elements because its value falls back to
        // textContent if no value attribute is present. And setting .value for
        // OPTION has no side effect
        el.tagName === "OPTION") {
          el.value = newValue;
        }
        if (value == null) {
          el.removeAttribute(key);
        }
        return;
      }
      let needRemove = false;
      if (value === "" || value == null) {
        const type = typeof el[key];
        if (type === "boolean") {
          value = includeBooleanAttr(value);
        } else if (value == null && type === "string") {
          value = "";
          needRemove = true;
        } else if (type === "number") {
          value = 0;
          needRemove = true;
        }
      }
      try {
        el[key] = value;
      } catch (e) {
      }
      needRemove && el.removeAttribute(key);
    }
    function addEventListener(el, event, handler, options) {
      el.addEventListener(event, handler, options);
    }
    function removeEventListener(el, event, handler, options) {
      el.removeEventListener(event, handler, options);
    }
    function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
      const invokers = el._vei || (el._vei = {});
      const existingInvoker = invokers[rawName];
      if (nextValue && existingInvoker) {
        existingInvoker.value = nextValue;
      } else {
        const [name, options] = parseName(rawName);
        if (nextValue) {
          const invoker = invokers[rawName] = createInvoker(nextValue, instance);
          addEventListener(el, name, invoker, options);
        } else if (existingInvoker) {
          removeEventListener(el, name, existingInvoker, options);
          invokers[rawName] = void 0;
        }
      }
    }
    const optionsModifierRE = /(?:Once|Passive|Capture)$/;
    function parseName(name) {
      let options;
      if (optionsModifierRE.test(name)) {
        options = {};
        let m;
        while (m = name.match(optionsModifierRE)) {
          name = name.slice(0, name.length - m[0].length);
          options[m[0].toLowerCase()] = true;
        }
      }
      const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
      return [event, options];
    }
    let cachedNow = 0;
    const p = /* @__PURE__ */ Promise.resolve();
    const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
    function createInvoker(initialValue, instance) {
      const invoker = (e) => {
        if (!e._vts) {
          e._vts = Date.now();
        } else if (e._vts <= invoker.attached) {
          return;
        }
        callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5, [e]);
      };
      invoker.value = initialValue;
      invoker.attached = getNow();
      return invoker;
    }
    function patchStopImmediatePropagation(e, value) {
      if (isArray$2(value)) {
        const originalStop = e.stopImmediatePropagation;
        e.stopImmediatePropagation = () => {
          originalStop.call(e);
          e._stopped = true;
        };
        return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
      } else {
        return value;
      }
    }
    const nativeOnRE = /^on[a-z]/;
    const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
      if (key === "class") {
        patchClass(el, nextValue, isSVG);
      } else if (key === "style") {
        patchStyle(el, prevValue, nextValue);
      } else if (isOn(key)) {
        if (!isModelListener(key)) {
          patchEvent(el, key, prevValue, nextValue, parentComponent);
        }
      } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
        patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
      } else {
        if (key === "true-value") {
          el._trueValue = nextValue;
        } else if (key === "false-value") {
          el._falseValue = nextValue;
        }
        patchAttr(el, key, nextValue, isSVG);
      }
    };
    function shouldSetAsProp(el, key, value, isSVG) {
      if (isSVG) {
        if (key === "innerHTML" || key === "textContent") {
          return true;
        }
        if (key in el && nativeOnRE.test(key) && isFunction$1(value)) {
          return true;
        }
        return false;
      }
      if (key === "spellcheck" || key === "draggable" || key === "translate") {
        return false;
      }
      if (key === "form") {
        return false;
      }
      if (key === "list" && el.tagName === "INPUT") {
        return false;
      }
      if (key === "type" && el.tagName === "TEXTAREA") {
        return false;
      }
      if (nativeOnRE.test(key) && isString(value)) {
        return false;
      }
      return key in el;
    }
    const TRANSITION = "transition";
    const ANIMATION = "animation";
    const Transition = (props, { slots }) => h(BaseTransition, resolveTransitionProps(props), slots);
    Transition.displayName = "Transition";
    const DOMTransitionPropsValidators = {
      name: String,
      type: String,
      css: {
        type: Boolean,
        default: true
      },
      duration: [String, Number, Object],
      enterFromClass: String,
      enterActiveClass: String,
      enterToClass: String,
      appearFromClass: String,
      appearActiveClass: String,
      appearToClass: String,
      leaveFromClass: String,
      leaveActiveClass: String,
      leaveToClass: String
    };
    const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend({}, BaseTransition.props, DOMTransitionPropsValidators);
    const callHook = (hook, args = []) => {
      if (isArray$2(hook)) {
        hook.forEach((h2) => h2(...args));
      } else if (hook) {
        hook(...args);
      }
    };
    const hasExplicitCallback = (hook) => {
      return hook ? isArray$2(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
    };
    function resolveTransitionProps(rawProps) {
      const baseProps = {};
      for (const key in rawProps) {
        if (!(key in DOMTransitionPropsValidators)) {
          baseProps[key] = rawProps[key];
        }
      }
      if (rawProps.css === false) {
        return baseProps;
      }
      const { name = "v", type, duration, enterFromClass = `${name}-enter-from`, enterActiveClass = `${name}-enter-active`, enterToClass = `${name}-enter-to`, appearFromClass = enterFromClass, appearActiveClass = enterActiveClass, appearToClass = enterToClass, leaveFromClass = `${name}-leave-from`, leaveActiveClass = `${name}-leave-active`, leaveToClass = `${name}-leave-to` } = rawProps;
      const durations = normalizeDuration(duration);
      const enterDuration = durations && durations[0];
      const leaveDuration = durations && durations[1];
      const { onBeforeEnter, onEnter, onEnterCancelled, onLeave, onLeaveCancelled, onBeforeAppear = onBeforeEnter, onAppear = onEnter, onAppearCancelled = onEnterCancelled } = baseProps;
      const finishEnter = (el, isAppear, done) => {
        removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
        removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
        done && done();
      };
      const finishLeave = (el, done) => {
        el._isLeaving = false;
        removeTransitionClass(el, leaveFromClass);
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
        done && done();
      };
      const makeEnterHook = (isAppear) => {
        return (el, done) => {
          const hook = isAppear ? onAppear : onEnter;
          const resolve = () => finishEnter(el, isAppear, done);
          callHook(hook, [el, resolve]);
          nextFrame(() => {
            removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
            addTransitionClass(el, isAppear ? appearToClass : enterToClass);
            if (!hasExplicitCallback(hook)) {
              whenTransitionEnds(el, type, enterDuration, resolve);
            }
          });
        };
      };
      return extend(baseProps, {
        onBeforeEnter(el) {
          callHook(onBeforeEnter, [el]);
          addTransitionClass(el, enterFromClass);
          addTransitionClass(el, enterActiveClass);
        },
        onBeforeAppear(el) {
          callHook(onBeforeAppear, [el]);
          addTransitionClass(el, appearFromClass);
          addTransitionClass(el, appearActiveClass);
        },
        onEnter: makeEnterHook(false),
        onAppear: makeEnterHook(true),
        onLeave(el, done) {
          el._isLeaving = true;
          const resolve = () => finishLeave(el, done);
          addTransitionClass(el, leaveFromClass);
          forceReflow();
          addTransitionClass(el, leaveActiveClass);
          nextFrame(() => {
            if (!el._isLeaving) {
              return;
            }
            removeTransitionClass(el, leaveFromClass);
            addTransitionClass(el, leaveToClass);
            if (!hasExplicitCallback(onLeave)) {
              whenTransitionEnds(el, type, leaveDuration, resolve);
            }
          });
          callHook(onLeave, [el, resolve]);
        },
        onEnterCancelled(el) {
          finishEnter(el, false);
          callHook(onEnterCancelled, [el]);
        },
        onAppearCancelled(el) {
          finishEnter(el, true);
          callHook(onAppearCancelled, [el]);
        },
        onLeaveCancelled(el) {
          finishLeave(el);
          callHook(onLeaveCancelled, [el]);
        }
      });
    }
    function normalizeDuration(duration) {
      if (duration == null) {
        return null;
      } else if (isObject$1(duration)) {
        return [NumberOf(duration.enter), NumberOf(duration.leave)];
      } else {
        const n = NumberOf(duration);
        return [n, n];
      }
    }
    function NumberOf(val) {
      const res = toNumber(val);
      return res;
    }
    function addTransitionClass(el, cls) {
      cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
      (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
    }
    function removeTransitionClass(el, cls) {
      cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
      const { _vtc } = el;
      if (_vtc) {
        _vtc.delete(cls);
        if (!_vtc.size) {
          el._vtc = void 0;
        }
      }
    }
    function nextFrame(cb) {
      requestAnimationFrame(() => {
        requestAnimationFrame(cb);
      });
    }
    let endId = 0;
    function whenTransitionEnds(el, expectedType, explicitTimeout, resolve) {
      const id = el._endId = ++endId;
      const resolveIfNotStale = () => {
        if (id === el._endId) {
          resolve();
        }
      };
      if (explicitTimeout) {
        return setTimeout(resolveIfNotStale, explicitTimeout);
      }
      const { type, timeout, propCount } = getTransitionInfo(el, expectedType);
      if (!type) {
        return resolve();
      }
      const endEvent = type + "end";
      let ended = 0;
      const end = () => {
        el.removeEventListener(endEvent, onEnd);
        resolveIfNotStale();
      };
      const onEnd = (e) => {
        if (e.target === el && ++ended >= propCount) {
          end();
        }
      };
      setTimeout(() => {
        if (ended < propCount) {
          end();
        }
      }, timeout + 1);
      el.addEventListener(endEvent, onEnd);
    }
    function getTransitionInfo(el, expectedType) {
      const styles = window.getComputedStyle(el);
      const getStyleProperties = (key) => (styles[key] || "").split(", ");
      const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
      const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
      const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
      const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
      const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
      const animationTimeout = getTimeout(animationDelays, animationDurations);
      let type = null;
      let timeout = 0;
      let propCount = 0;
      if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
          type = TRANSITION;
          timeout = transitionTimeout;
          propCount = transitionDurations.length;
        }
      } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
          type = ANIMATION;
          timeout = animationTimeout;
          propCount = animationDurations.length;
        }
      } else {
        timeout = Math.max(transitionTimeout, animationTimeout);
        type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
        propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
      }
      const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(getStyleProperties(`${TRANSITION}Property`).toString());
      return {
        type,
        timeout,
        propCount,
        hasTransform
      };
    }
    function getTimeout(delays, durations) {
      while (delays.length < durations.length) {
        delays = delays.concat(delays);
      }
      return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
    }
    function toMs(s) {
      return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
    }
    function forceReflow() {
      return document.body.offsetHeight;
    }
    const positionMap = /* @__PURE__ */ new WeakMap();
    const newPositionMap = /* @__PURE__ */ new WeakMap();
    const TransitionGroupImpl = {
      name: "TransitionGroup",
      props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
        tag: String,
        moveClass: String
      }),
      setup(props, { slots }) {
        const instance = getCurrentInstance();
        const state = useTransitionState();
        let prevChildren;
        let children;
        onUpdated(() => {
          if (!prevChildren.length) {
            return;
          }
          const moveClass = props.moveClass || `${props.name || "v"}-move`;
          if (!hasCSSTransform(prevChildren[0].el, instance.vnode.el, moveClass)) {
            return;
          }
          prevChildren.forEach(callPendingCbs);
          prevChildren.forEach(recordPosition);
          const movedChildren = prevChildren.filter(applyTranslation);
          forceReflow();
          movedChildren.forEach((c) => {
            const el = c.el;
            const style = el.style;
            addTransitionClass(el, moveClass);
            style.transform = style.webkitTransform = style.transitionDuration = "";
            const cb = el._moveCb = (e) => {
              if (e && e.target !== el) {
                return;
              }
              if (!e || /transform$/.test(e.propertyName)) {
                el.removeEventListener("transitionend", cb);
                el._moveCb = null;
                removeTransitionClass(el, moveClass);
              }
            };
            el.addEventListener("transitionend", cb);
          });
        });
        return () => {
          const rawProps = toRaw(props);
          const cssTransitionProps = resolveTransitionProps(rawProps);
          let tag = rawProps.tag || Fragment;
          prevChildren = children;
          children = slots.default ? getTransitionRawChildren(slots.default()) : [];
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.key != null) {
              setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
            }
          }
          if (prevChildren) {
            for (let i = 0; i < prevChildren.length; i++) {
              const child = prevChildren[i];
              setTransitionHooks(child, resolveTransitionHooks(child, cssTransitionProps, state, instance));
              positionMap.set(child, child.el.getBoundingClientRect());
            }
          }
          return createVNode(tag, null, children);
        };
      }
    };
    const removeMode = (props) => delete props.mode;
    /* @__PURE__ */ removeMode(TransitionGroupImpl.props);
    const TransitionGroup = TransitionGroupImpl;
    function callPendingCbs(c) {
      const el = c.el;
      if (el._moveCb) {
        el._moveCb();
      }
      if (el._enterCb) {
        el._enterCb();
      }
    }
    function recordPosition(c) {
      newPositionMap.set(c, c.el.getBoundingClientRect());
    }
    function applyTranslation(c) {
      const oldPos = positionMap.get(c);
      const newPos = newPositionMap.get(c);
      const dx = oldPos.left - newPos.left;
      const dy = oldPos.top - newPos.top;
      if (dx || dy) {
        const s = c.el.style;
        s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
        s.transitionDuration = "0s";
        return c;
      }
    }
    function hasCSSTransform(el, root2, moveClass) {
      const clone = el.cloneNode();
      if (el._vtc) {
        el._vtc.forEach((cls) => {
          cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
        });
      }
      moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
      clone.style.display = "none";
      const container = root2.nodeType === 1 ? root2 : root2.parentNode;
      container.appendChild(clone);
      const { hasTransform } = getTransitionInfo(clone);
      container.removeChild(clone);
      return hasTransform;
    }
    const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
    let renderer;
    function ensureRenderer() {
      return renderer || (renderer = createRenderer(rendererOptions));
    }
    const createApp = (...args) => {
      const app2 = ensureRenderer().createApp(...args);
      const { mount } = app2;
      app2.mount = (containerOrSelector) => {
        const container = normalizeContainer(containerOrSelector);
        if (!container)
          return;
        const component = app2._component;
        if (!isFunction$1(component) && !component.render && !component.template) {
          component.template = container.innerHTML;
        }
        container.innerHTML = "";
        const proxy = mount(container, false, container instanceof SVGElement);
        if (container instanceof Element) {
          container.removeAttribute("v-cloak");
          container.setAttribute("data-v-app", "");
        }
        return proxy;
      };
      return app2;
    };
    function normalizeContainer(container) {
      if (isString(container)) {
        const res = document.querySelector(container);
        return res;
      }
      return container;
    }
    var isVue2 = false;
    /*!
      * pinia v2.0.34
      * (c) 2023 Eduardo San Martin Morote
      * @license MIT
      */
    const piniaSymbol = (
      /* istanbul ignore next */
      Symbol()
    );
    var MutationType;
    (function(MutationType2) {
      MutationType2["direct"] = "direct";
      MutationType2["patchObject"] = "patch object";
      MutationType2["patchFunction"] = "patch function";
    })(MutationType || (MutationType = {}));
    function createPinia() {
      const scope = effectScope(true);
      const state = scope.run(() => ref({}));
      let _p = [];
      let toBeInstalled = [];
      const pinia = markRaw({
        install(app2) {
          {
            pinia._a = app2;
            app2.provide(piniaSymbol, pinia);
            app2.config.globalProperties.$pinia = pinia;
            toBeInstalled.forEach((plugin) => _p.push(plugin));
            toBeInstalled = [];
          }
        },
        use(plugin) {
          if (!this._a && !isVue2) {
            toBeInstalled.push(plugin);
          } else {
            _p.push(plugin);
          }
          return this;
        },
        _p,
        // it's actually undefined here
        // @ts-expect-error
        _a: null,
        _e: scope,
        _s: /* @__PURE__ */ new Map(),
        state
      });
      return pinia;
    }
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    const freeGlobal$1 = freeGlobal;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal$1 || freeSelf || Function("return this")();
    const root$1 = root;
    var Symbol$1 = root$1.Symbol;
    const Symbol$2 = Symbol$1;
    var objectProto$5 = Object.prototype;
    var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
    var nativeObjectToString$1 = objectProto$5.toString;
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty$3.call(value, symToStringTag$1), tag = value[symToStringTag$1];
      try {
        value[symToStringTag$1] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }
    var objectProto$4 = Object.prototype;
    var nativeObjectToString = objectProto$4.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    var isArray = Array.isArray;
    const isArray$1 = isArray;
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function copyArray(source, array) {
      var index = -1, length = source.length;
      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }
    var MAX_SAFE_INTEGER$1 = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER$1 : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var objectProto$3 = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$3;
      return value === proto;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    var argsTag$1 = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag$1;
    }
    var objectProto$2 = Object.prototype;
    var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
    var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    const isArguments$1 = isArguments;
    function stubFalse() {
      return false;
    }
    var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
    var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    const isBuffer$1 = isBuffer;
    var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal$1.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    const nodeUtil$1 = nodeUtil;
    var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    const isTypedArray$1 = isTypedArray;
    var objectProto$1 = Object.prototype;
    var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var nativeKeys = overArg(Object.keys, Object);
    const nativeKeys$1 = nativeKeys;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys$1(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }
    var nativeFloor = Math.floor, nativeRandom = Math.random;
    function baseRandom(lower, upper) {
      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
    }
    function shuffleSelf(array, size2) {
      var index = -1, length = array.length, lastIndex = length - 1;
      size2 = size2 === void 0 ? length : size2;
      while (++index < size2) {
        var rand = baseRandom(index, lastIndex), value = array[rand];
        array[rand] = array[index];
        array[index] = value;
      }
      array.length = size2;
      return array;
    }
    function arrayShuffle(array) {
      return shuffleSelf(copyArray(array));
    }
    function baseShuffle(collection) {
      return shuffleSelf(values(collection));
    }
    function shuffle(collection) {
      var func = isArray$1(collection) ? arrayShuffle : baseShuffle;
      return func(collection);
    }
    const App_vue_vue_type_style_index_0_lang = "";
    const _hoisted_1 = { key: 0 };
    const _hoisted_2 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
    const _hoisted_3 = { key: 0 };
    const _hoisted_4 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
    const _hoisted_5 = {
      key: 0,
      style: { "text-align": "left" }
    };
    const _hoisted_6 = /* @__PURE__ */ createBaseVNode("br", null, null, -1);
    const _hoisted_7 = {
      key: 2,
      style: { "text-align": "left" }
    };
    const _sfc_main = {
      __name: "App",
      setup(__props) {
        const show = ref(false);
        const play = ref(false);
        const show1 = ref(false);
        const play1 = ref(false);
        const getInitialItems = () => ["to", "meet", "you", "!"];
        const items = ref(getInitialItems());
        function reset() {
          items.value = getInitialItems();
        }
        function shuffle$1() {
          items.value = shuffle(items.value);
        }
        return (_ctx, _cache) => {
          return openBlock(), createElementBlock(Fragment, null, [
            createBaseVNode("button", {
              onClick: _cache[0] || (_cache[0] = ($event) => show.value = !show.value)
            }, "Click ME First!"),
            createVNode(Transition, null, {
              default: withCtx(() => [
                show.value ? (openBlock(), createElementBlock("p", _hoisted_1, "Helloooo")) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _hoisted_2,
            createBaseVNode("button", {
              onClick: _cache[1] || (_cache[1] = ($event) => play.value = !play.value)
            }, "Click Me Next!"),
            createVNode(Transition, { name: "slide-fade" }, {
              default: withCtx(() => [
                play.value ? (openBlock(), createElementBlock("p", _hoisted_3, "I'm")) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _hoisted_4,
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => show1.value = !show1.value)
            }, "Click Me Third!"),
            createVNode(Transition, { name: "bounce" }, {
              default: withCtx(() => [
                show1.value ? (openBlock(), createElementBlock("p", _hoisted_5, " E X C I T E D ")) : createCommentVNode("", true)
              ]),
              _: 1
            }),
            _hoisted_6,
            createBaseVNode("button", {
              onClick: _cache[3] || (_cache[3] = ($event) => play1.value = !play1.value)
            }, "Click Me Fourth!"),
            createVNode(TransitionGroup, {
              tag: "ul",
              name: "fade",
              class: "container"
            }, {
              default: withCtx(() => [
                play1.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  onClick: reset
                }, "reset")) : createCommentVNode("", true),
                play1.value ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  onClick: shuffle$1
                }, "shuffle")) : createCommentVNode("", true),
                play1.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(items.value, (item) => {
                    return openBlock(), createElementBlock("div", {
                      class: "item",
                      key: item
                    }, toDisplayString(item), 1);
                  }), 128))
                ])) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ], 64);
        };
      }
    };
    const app = createApp(_sfc_main);
    app.use(createPinia());
    app.mount("#app");
  }
});
export default require_index_001();
