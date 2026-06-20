import {
  OrganizationStore,
  useOrganizationsStore,
} from '../stores/organizationStore';

type UseOrganizationFiltersReturn = Pick<
  OrganizationStore,
  | 'search'
  | 'page'
  | 'setSearch'
  | 'setPage'
  | 'restoreFilters'
  | 'resetFilters'
>;

export const useOrganizationFilters = (): UseOrganizationFiltersReturn => {
  const search = useOrganizationsStore((state) => state.search);
  const page = useOrganizationsStore((state) => state.page);

  const setSearch = useOrganizationsStore((state) => state.setSearch);

  const setPage = useOrganizationsStore((state) => state.setPage);

  const restoreFilters = useOrganizationsStore((state) => state.restoreFilters);

  const resetFilters = useOrganizationsStore((state) => state.resetFilters);

  return {
    search,
    page,
    setSearch,
    setPage,
    restoreFilters,
    resetFilters,
  };
};
