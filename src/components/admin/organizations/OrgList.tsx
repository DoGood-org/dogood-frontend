import { Slider } from '@/components/ui/Slider';
import { JSX } from 'react';
import { OrgItem } from './OrgItem';
import { Pagination } from '@/components/ui/Pagination';
import { Spinner } from '@/components/ui/Spinner';
import { OrganizationListProps } from '@/types/admin';

export const OrgList = ({
  organizations,
  pagination,
  page,
  isDesktop,
  isFetchingMore,
  loadMoreRef,
  onPageChange,
}: OrganizationListProps): JSX.Element => {
  return (
    <>
      {isDesktop && (
        <>
          <Slider
            containerClassName="min-h-[830px] md:min-h-[686px] lg:min-h-[837px] flex flex-col justify-between"
            showPagination={false}
            items={organizations}
            itemsPerSlide={6}
            renderItem={(organization, idx) => (
              <OrgItem
                key={`${idx}-${organization.name}`}
                organization={organization}
              />
            )}
          />

          {pagination && (
            <Pagination
              currentPage={page - 1}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => onPageChange(newPage + 1)}
            />
          )}
        </>
      )}

      {!isDesktop && (
        <>
          <ul className="flex flex-col gap-[18px] md:gap-3 pb-1">
            {organizations.map((organization, index) => (
              <li
                key={organization.id}
                ref={
                  index === organizations.length - 1 ? loadMoreRef : undefined
                }
              >
                <OrgItem organization={organization} />
              </li>
            ))}
          </ul>
          {isFetchingMore && (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          )}

          {/* <div ref={loadMoreRef} className="h-20" /> */}

          {/* {isFetchingMore && <p>Loading...</p>} */}
        </>
      )}

      {/* <Slider
        containerClassName="min-h-[830px] md:min-h-[686px] lg:min-h-[837px] flex flex-col justify-between"
        sliderClassName=""
        itemClassName="p-0 bg-admin-card-bg rounded-md border-1 border-transparent hover:shadow-admin hover:border-admin-border focus-within:border-admin-border focus-within:shadow-admin outline-none focus:outline-hidden active:outline-hidden active:border-btn-hover"
        listClassName=" gap-[18px] md:gap-3 pb-1"
        buttonsClassName="lg:mt-[7px]"
        items={organizations}
        itemsPerSlide={6}
        // itemsPerSlide={organizations.length}
        renderItem={(organization, idx) => (
          <OrgItem
            key={`${idx}-${organization.name}`}
            organization={organization}
          />
        )}
      /> */}
    </>
  );
};
