import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
// import { mockOrganization } from '@/data/mockOrganization';
import {
  AddMemberResponse,
  DeleteMemberResponse,
  IAddMemberOrgRequest,
  IDeleteMemberOrgRequest,
  OrganizationApiResponse,
  OrganizationDetailedProps,
  UpdateMemberRoleRequest,
} from '@/types';
import { apiRoutes } from '@/lib/server/apiRoutes';

export const getOrganizationById = async (
  id: string | number
): Promise<FetchResult<OrganizationDetailedProps>> => {
  const result = await fetchFromApi<OrganizationApiResponse>(
    apiRoutes.organizations.getById(id),
    { method: 'GET' }
  );

  if (!result.ok) {
    return result;
  }

  return {
    ok: true,
    data: result.data.data.organization,
  };
};

export const addMemberToOrganization = async (
  data: IAddMemberOrgRequest
): Promise<FetchResult<AddMemberResponse>> => {
  return fetchFromApi(apiRoutes.organizations.addMember, {
    method: 'POST',
    data,
    auth: true,
  });
};

export const removeMemberFromOrganization = async (
  data: IDeleteMemberOrgRequest
): Promise<FetchResult<DeleteMemberResponse>> => {
  return fetchFromApi(apiRoutes.organizations.deleteMember, {
    method: 'DELETE',
    data,
    auth: true,
  });
};

export const updateMemberRole = async (
  data: UpdateMemberRoleRequest
): Promise<FetchResult<AddMemberResponse>> => {
  return fetchFromApi(apiRoutes.organizations.updateMemberRole, {
    method: 'PATCH',
    data,
    auth: true,
  });
};
