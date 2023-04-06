import { Transition } from "react-transition-group";
import { SwitchTransition } from "react-transition-group";
import { useReducer, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/router";
import { useUserPrefs } from "@wethegit/react-hooks";

import { locales } from "../../config-locales";
import { PAGE_TRANSITION_STATE } from "#context/site-state-context";
import useSiteState from "#hooks/use-site-state";

import * as styles from "./page-transition.module.scss";

const localeRemover = new RegExp("/(" + locales.join("|") + ")/");

// import SwipeTransition from "./swipe/swipe"
// import BatmanTransition from "./batman/batman"

const defaultOptions = { duration: 0 };
// const swipeOptions = {
//   type: "swipe",
//   duration: { exit: 500, enter: 500 },
// }
// const batmanOptions = {
//   type: "batman",
//   duration: 1500,
// }

const PageTransition = ({ children, location }) => {
  const { transitionState, transitionEvent } = useSiteState();
  const count = useRef(0);
  const transitionRef = useRef();
  const { prefersReducedMotion } = useUserPrefs();

  const [options, pageChange] = useReducer((_, path) => {
    // switch (path) {
    //   case "/components/page-transitions/swipe/":
    //     return { ...defaultOptions, ...swipeOptions }
    //   case "/components/page-transitions/batman/":
    //     return { ...defaultOptions, ...batmanOptions }
    // }
    return defaultOptions;
  }, defaultOptions);

  const router = useRouter();

  const handleRouteChange = useCallback(
    (url, { shallow }) => {
      url = url.replace(localeRemover, "/");
      count.current = count.current + 1;
      pageChange(url);
      transitionEvent("reset");
    },
    [pageChange, transitionEvent]
  );

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  useEffect(() => {
    if (transitionState == PAGE_TRANSITION_STATE.in) {
      window.scrollTo(0, 0);
    }
  }, [transitionState]);

  const getDuration = (state) => {
    if (!options.duration) return 0;
    if (prefersReducedMotion) return 0;
    if (typeof options.duration == "number") return options.duration;

    switch (state) {
      case "in":
        if (options.duration.enter) return options.duration.enter;
        return 0;
      case "out":
        if (options.duration.exit) return options.duration.exit;
        return 0;
    }

    return 0;
  };

  const handleTransitionEvent = (type) => {
    // we wrap this in a timeout to prevent React from batching
    // the updates. This might break if we update to React v18
    setTimeout(() => {
      transitionEvent(type);
    }, 100);
  };

  return (
    <div className={styles.container}>
      <SwitchTransition
        mode={options && options.mode ? options.mode : "out-in"}
      >
        <Transition
          key={location}
          nodeRef={transitionRef}
          timeout={options && !prefersReducedMotion ? options.duration : 0}
          onExit={() => handleTransitionEvent("onExit")}
          onExiting={() => handleTransitionEvent("onExiting")}
          onEntering={() => handleTransitionEvent("onEntering")}
          onEntered={() => handleTransitionEvent("onEntered")}
        >
          <div ref={transitionRef}>{children}</div>
        </Transition>
      </SwitchTransition>
      {/* {options.type == "swipe" && (
        <SwipeTransition
          transitionState={transitionState}
          inDuration={getDuration("in")}
          outDuration={getDuration("out")}
        />
      )}
      {options.type == "batman" && (
        <BatmanTransition
          transitionState={transitionState}
          inDuration={getDuration("in")}
          outDuration={getDuration("out")}
        />
      )} */}
    </div>
  );
};

export default PageTransition;
