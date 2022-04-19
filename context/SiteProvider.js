import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SiteContext from './SiteContext';

const SiteProvider = ({ children }) => {
  let initialStoreState = {
    mobileMenuOpen: false,
    sidebarCartOpen: false
  };
  const [store, updateStore] = useState(initialStoreState);
  return (
    <SiteContext.Provider
      value={{
        store,
        setMobileMenuOpen: (bool) => {
          updateStore((store) => ({
            ...store,
            mobileMenuOpen: bool
          }));
        },
        setSidebarCartOpen: (bool) => {
          updateStore((store) => ({
            ...store,
            sidebarCartOpen: bool
          }));
        }
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

SiteProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default SiteProvider;
