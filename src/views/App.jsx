import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

import cls from 'classnames';
import { withTranslation } from 'react-i18next';


import routePaths from './routes.js';
import SidebarNav from './components/SidebarNav/SidebarNav';
import Header from './components/Header.jsx';

import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { startWatching } from '../store/TopList/actions.js';
import { getStatus } from '../store/TopList/reducer.js';

import './App.scss';
import './i18n.js';

const HomePage = lazy(() => import('./home-page/HomePage'));
const TopSellings = lazy(() => import('./top-sellings/TopSellings'));

class AppModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: true,
    };
  }

  componentDidMount() {
    this.props.startWatching();
  }

  toggleNavbar = () => {
    const {navbarOpen} = this.state;
    this.setState({navbarOpen: !navbarOpen});
  }

  render() {
    const { navbarOpen } = this.state;
    const { status } = this.props;
    return (
      <ConnectedRouter history={this.props.history}>
        <Suspense fallback={<div> Loading </div>}>
          <div
            className={cls('app', {
              'side-menu-collapsed': !navbarOpen
            })}
          >
            <div className='app-body'>
              <SidebarNav
                nav={routePaths}
                // logo={Logo}
                logoText={'VIBE.'}
              />
              <div id='page-content'>
                <Header navbarOpen={navbarOpen} toggleNavbar={this.toggleNavbar} />
                {status.success && <Switch>
                  <Route exact path={'/'} component={HomePage} />
                  <Route
                    path={'/topSellings'}
                    component={TopSellings}
                  />
                </Switch> }
              </div>
            </div>
          </div>
        </Suspense>
      </ConnectedRouter>
    );
  }
}


AppModule.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    status: getStatus(state)
  };
};

const mapDispatchToProps = {
  startWatching
};

const App = connect(mapStateToProps, mapDispatchToProps)(AppModule);

export default withTranslation()(App);
