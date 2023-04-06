import { useUserPrefs } from "@wethegit/react-hooks";

import useLocale from "#hooks/use-locale";

import { castToBool } from "#utils/utils";
import classnames from "#utils/classnames";

import {
  rmButton,
  rmButtonSelected,
  rmButtonLabel,
  rmButtonIcon,
} from "./reduced-motion-button.module.scss";

const ReducedMotionButton = () => {
  const { globals } = useLocale();
  const { prefersReducedMotion, togglePrefersReducedMotion } = useUserPrefs();

  return (
    <button
      className={classnames([
        rmButton,
        castToBool(prefersReducedMotion) && rmButtonSelected,
      ])}
      onClick={() => togglePrefersReducedMotion()}
    >
      <span className={rmButtonIcon}></span>
      <span className={rmButtonLabel}>
        {globals.nav.a11yOptions.reducedMotion}
      </span>
    </button>
  );
};

export default ReducedMotionButton;
