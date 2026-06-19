import {
  OrganizationStore,
  useOrganizationsStore,
} from '../stores/organizationStore';

type UseOrganizationFiltersReturn = Pick<
  OrganizationStore,
  'search' | 'page' | 'setSearch' | 'setPage'
>;

export const useOrganizationFilters = (): UseOrganizationFiltersReturn => {
  const search = useOrganizationsStore((state) => state.search);
  const page = useOrganizationsStore((state) => state.page);

  const setSearch = useOrganizationsStore((state) => state.setSearch);

  const setPage = useOrganizationsStore((state) => state.setPage);

  return {
    search,
    page,
    setSearch,
    setPage,
  };
};
