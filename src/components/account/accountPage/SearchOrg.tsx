import React, { JSX } from 'react';
import { SearchOrgClient } from './SearchOrgClient';

interface ISearchOrg {
  setIsSearchOpen: (arg0: boolean) => void;
}

export const SearchOrg = ({ setIsSearchOpen }: ISearchOrg): JSX.Element => {
  return <SearchOrgClient setIsSearchOpen={setIsSearchOpen} />;
};
