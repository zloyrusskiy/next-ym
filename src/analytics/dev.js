import debug from "debug";

const log = debug("analytics");

export function init(code, options, version) {
  log('Analytics init triggered for %s with options %o and version %d', code, options, version);
}

export function pageview() {
  log(`Pageview triggered for ${window.location.pathname}`);
}

export function reachGoal(...args) {
  log('Goal reached:', ...args);
}
