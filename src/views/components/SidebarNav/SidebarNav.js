import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import NavSpacer from './components/NavSpacer';
import NavDivider from './components/NavDivider';
import NavSingleItem from './components/NavSingleItem';
import NavOverlay from './components/NavOverlay';

export default class SidebarNav extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const navItems = items => {
      return items.map((item, index) => itemType(item, index));
    };

    const itemType = (item, index) => {

      if (item.divider) {
        return <NavDivider key={index} />;
      }
      return <NavSingleItem item={item} key={index} />;
    };

    const NavBrand = ({ logo, logoText }) => {
      return (
        <div className='site-logo-bar'>
          <NavLink to='/' className='navbar-brand'>
            {logo && <img src={logo} alt='' />}
            {logoText && <span className='logo-text'>{logoText}</span>}
          </NavLink>
        </div>
      );
    };

    return (
      <>
        <div className={'app-sidebar'}>
          <NavBrand logoText={'Veloxity'} logo={null} />
          <nav>
            <ul id='main-menu'>
              {navItems(this.props.nav.top)}
              <NavSpacer />
              {navItems(this.props.nav.bottom)}
            </ul>
          </nav>
        </div>
        {this.props.isSidebarCollapsed && <NavOverlay onClick={this.props.toggleSidebar} />}
      </>
    );
  }
}
