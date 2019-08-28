import { ym } from "react-ym";

const IS_BROWSER = typeof window !== "undefined";

let key;

export function init(code, options, version) {
  key = `yaCounter${code}`;

  if (IS_BROWSER && !window[key] && code) {
    ym.initialize(code, options, version);
  }
}

export function pageview() {
  if (window[key]) {
    window[key].hit(window.location.pathname);
  }
}

export function reachGoal(...args) {
  if (window[key]) {
    window[key].reachGoal(...args);
  }
}
