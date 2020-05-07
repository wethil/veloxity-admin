import React, { Component } from 'react';
import ToggleSidebarButton from './ToggleSidebarButton.jsx';

import { Navbar, Button } from 'reactstrap';


import i18n from '../i18n.js';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }
  getPageTitle = () => {
    let name;
    this.props.routes.map(prop => {
      if (prop.path === this.props.location.pathname) {
        name = prop.name;
      }
      return null;
    });
    return name;
  };

  getLanguage = () => {
    if (['tr', 'TR'].includes(i18n.language)) {
      return {
        languageTitle: 'EN',
        changeTo: 'en'
      };
    }
    return {
      languageTitle: 'TR',
      changeTo: 'tr'
    };
  }

  render() {
    const { navbarOpen, toggleNavbar } = this.props;
    console.log(i18n.language);
    const { languageTitle, changeTo } = this.getLanguage();
    return (
      <header className='app-header'>
        <div className='top-nav'>
          <Navbar color='faded' light expand='md'>
            <ToggleSidebarButton
              toggleSidebar={toggleNavbar}
              isSidebarCollapsed={!navbarOpen}
            />
            <div className='page-heading'> Veloxity </div>
            <Button
              outline
              color='primary'
              className='lang-button'
              onClick={(e) => {
                e.preventDefault();
                i18n.changeLanguage(changeTo);
              }}
            > {languageTitle} </Button>
          </Navbar>
        </div>
      </header>
    );
  }
}

