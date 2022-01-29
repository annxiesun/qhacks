import React from 'react';
import PropTypes from 'prop-types';
import './SideMenu.css';

function SideMenu({ menuItems, className }) {
  const goToSection = ((id) => {
    document.getElementById(id)?.scrollIntoView();
  });

  return (
    <div className={`${className} menu`}>
      {menuItems.map((menuItem) => (
        <div className="menu-item mini" key={menuItem.id} onClick={() => { goToSection(menuItem.id) }}>{menuItem.label}</div>
      ))
      }
    </div >
  );
}

SideMenu.propTypes = {
  menuItems: PropTypes.array.isRequired,
  className: PropTypes.string
}

SideMenu.defaultProps = {
  className: null
}

export default SideMenu;