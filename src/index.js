import { Component, createElement } from "react";
import * as prodLytics from "./analytics/prod";
import * as devLytics from "./analytics/dev";

function isLocal(host) {
  return location.hostname === host;
}

function isDev() {
  return process.env.NODE_ENV !== "production";
}

class WithAnalytics extends Component {
  state = {
    analytics: undefined
  };

  componentDidMount() {
    // check if it should track
    const shouldNotTrack = isLocal(this.state.localhost) || isDev();
    // check if it should use production or dev analytics
    const analytics = shouldNotTrack ? devLytics : prodLytics;

    // init analytics
    analytics.init(this.state.code, this.state.options, this.state.version || 2);
    // log page
    analytics.pageview();

    // save possible previously defined callback
    const previousCallback = this.state.router.onRouteChangeComplete;
    this.state.router.onRouteChangeComplete = () => {
      // call previously defined callback if is a function
      if (typeof previousCallback === "function") {
        previousCallback();
      }
      // log page
      analytics.pageview();
    };

    this.setState({
      analytics
    });
  }

  render() {
    return createElement(this.state.page_component, {
      ...this.props,
      analytics: this.state.analytics
    });
  }
}

export default (code, Router, { localhost = "localhost" } = {}) => Page => {
  class WithAnalyticsDefault extends WithAnalytics {
    constructor(props) {
        super(props);
        this.state = {
          ...this.state,
          code,
          router: Router,
          localhost,
          page_component: Page
        };
    }
  }

  if (Page.getInitialProps) {
    WithAnalyticsDefault.getInitialProps = Page.getInitialProps;
  }

  return WithAnalyticsDefault;
};

export const withYMCustom = (code, options, version, Router, { localhost = "localhost" } = {}) => Page => {
  class WithAnalyticsCustom extends WithAnalytics {
    constructor(props) {
        super(props);
        this.state = {
          ...this.state,
          code,
          options,
          version,
          router: Router,
          localhost,
          page_component: Page
        };
    }
  }

  if (Page.getInitialProps) {
    WithAnalyticsCustom.getInitialProps = Page.getInitialProps;
  }

  return WithAnalyticsCustom;
};
