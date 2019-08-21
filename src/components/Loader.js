import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { isLoading, isNormal, isError } from 'resift';

// Components
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorView from 'components/ErrorView';

// Styles
import classNames from 'classnames';
import withStyles from '@material-ui/styles/withStyles';

const TRANSITION_TIMING = 250;

function statusIsEqual(a, b) {
  if (typeof a === 'number' || typeof b === 'number') return a === b;
  return a.value === b.value;
}

export const styles = theme => {
  return {
    root: {
      position: 'relative',
    },
    overlay: {
      backgroundColor: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: `opacity ${TRANSITION_TIMING}ms`,
      zIndex: theme.zIndex.tooltip,
    },
    overlayTransparent: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    appear: {
      opacity: 0,
    },
    appearActive: {
      opacity: 1,
    },
    enter: {
      opacity: 0,
    },
    enterActive: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
    exitActive: {
      opacity: 0,
    },
  };
};

class Loader extends React.Component {
  static defaultProps = {
    isLoadingView: <CircularProgress />,
    isErrorView: <ErrorView />,
  };

  shouldComponentUpdate(nextProps) {
    return (
      isNormal(this.props.status) ||
      isNormal(nextProps.status) ||
      !statusIsEqual(this.props.status, nextProps.status)
    );
  }

  get transitionClasses() {
    const { classes } = this.props;
    return {
      appear: classes.appear,
      appearActive: classes.appearActive,
      enter: classes.enter,
      enterActive: classes.enterActive,
      exit: classes.exit,
      exitActive: classes.exitActive,
    };
  }

  get transitionTimeout() {
    const { transitionTimeout } = this.props;
    return (
      transitionTimeout || {
        enter: TRANSITION_TIMING,
        exit: TRANSITION_TIMING,
        active: TRANSITION_TIMING,
      }
    );
  }

  /**
   * Renders the proper state view from the current status. See contents of function to
   * determine priority order of each state.
   */
  renderStateView() {
    const { status, isLoadingView, isErrorView } = this.props;

    if (isLoading(status)) return isLoadingView;
    if (isError(status)) return isErrorView;

    return null;
  }

  render() {
    const {
      className,
      classes,
      children,
      status,
      isLoadingView,
      isErrorView,
      rootRef,
      ...rest
    } = this.props;

    const stateView = this.renderStateView();
    const visible = !!stateView;

    return (
      <div className={classNames(classes.root, className)} ref={rootRef} {...rest}>
        <CSSTransition
          classNames={this.transitionClasses}
          timeout={this.transitionTimeout}
          appear
          unmountOnExit
          in={visible}
        >
          <div
            className={classNames(classes.overlay, {
              [classes.overlayTransparent]: isNormal(status),
            })}
          >
            {stateView}
          </div>
        </CSSTransition>
        {isNormal(status) && <>{typeof children === 'function' ? children() : children}</>}
      </div>
    );
  }
}

const LoaderWithStyles = withStyles(styles, { name: 'SkpLoader' })(Loader);
// make it so that `ref` gets passed to the root
export default React.forwardRef((props, ref) => <LoaderWithStyles rootRef={ref} {...props} />);
