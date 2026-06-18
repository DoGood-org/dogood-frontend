'use client';

import { getAllOrganizations } from '@/services/adminService';
import { IAdminOrganizations, IAdminPagination } from '@/types/admin';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseOrganizationsProps = {
  search: string;
  limit: number;
  isDesktop: boolean;
};

type UseOrganizationsReturn = {
  organizations: IAdminOrganizations[];
  pagination: IAdminPagination | null;
  page: number;
  isLoading: boolean;
  isInitialLoading: boolean;
  isFetchingMore: boolean;
  loadMoreRef: React.RefObject<HTMLLIElement | null>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const useOrganizations = ({
  search,
  limit,
  isDesktop,
}: UseOrganizationsProps): UseOrganizationsReturn => {
  const [organizations, setOrganizations] = useState<IAdminOrganizations[]>([]);
  const [pagination, setPagination] = useState<IAdminPagination | null>(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  // const [isPageLoading, setIsPageLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadMoreRef = useRef<HTMLLIElement>(null);

  /**
   * Завантажує конкретну сторінку організацій.
   * Використовується для десктопної пагінації.
   */
  const loadPage = useCallback(
    async (pageNumber: number): Promise<void> => {
      try {
        const result = await getAllOrganizations(pageNumber, limit, search);

        if (!result.ok) {
          return;
        }

        setOrganizations(result.data.data);
        setPagination(result.data.pagination);
      } finally {
        setIsInitialLoading(false);
      }
    },
    [limit, search]
  );
  // const loadPage = useCallback(
  //   async (pageNumber: number): Promise<void> => {
  //     try {
  //       // setIsLoading(true);
  //       setIsPageLoading(true);

  //       const result = await getAllOrganizations(pageNumber, limit, search);

  //       if (!result.ok) {
  //         console.error(result);
  //         return;
  //       }

  //       setOrganizations(result.data.data);
  //       setPagination(result.data.pagination);
  //     } finally {
  //       setIsLoading(false);
  //       setIsPageLoading(false);
  //     }
  //   },
  //   [limit, search]
  // );

  /**
   * Підвантажує наступну сторінку організацій.
   * Використовується для infinite scroll на мобільних пристроях.
   */
  const loadMore = useCallback(async (): Promise<void> => {
    if (!pagination?.hasNextPage || isFetchingMore) {
      return;
    }

    try {
      setIsFetchingMore(true);

      const nextPage = page + 1;

      const result = await getAllOrganizations(nextPage, limit, search);

      if (!result.ok) {
        return;
      }

      setOrganizations((prev) => [...prev, ...result.data.data]);

      setPagination(result.data.pagination);
      setPage(nextPage);
    } finally {
      setIsFetchingMore(false);
    }
  }, [page, limit, search, pagination?.hasNextPage, isFetchingMore]);

  /**
   * Скидає список та повертає користувача
   * на першу сторінку при зміні пошукового запиту.
   */
  useEffect(() => {
    setPage(1);
    // setOrganizations([]);
    setIsLoading(true);
    // setIsPageLoading(true);
  }, [search]);

  /**
   * Завантажує потрібну сторінку організацій
   * для десктопної версії з пагінацією.
   */
  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    void loadPage(page);
  }, [page, isDesktop, loadPage]);

  /**
   * Завантажує першу сторінку організацій
   * для мобільної та планшетної версії.
   */
  useEffect(() => {
    if (isDesktop) {
      return;
    }

    void loadPage(1);
  }, [isDesktop, limit, loadPage]);

  /**
   * Створює IntersectionObserver для реалізації
   * безкінечного скролу на мобільних пристроях.
   */
  useEffect(() => {
    if (isDesktop) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          pagination?.hasNextPage &&
          !isFetchingMore
        ) {
          void loadMore();
        }
      },
      {
        rootMargin: '0px 0px -30% 0px',
        threshold: 0,
      }
    );

    const current = loadMoreRef.current;

    if (current) {
      observer.observe(current);
    }

    return (): void => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [isDesktop, pagination?.hasNextPage, isFetchingMore, loadMore]);

  return {
    organizations,
    pagination,
    page,
    isLoading,
    // isPageLoading,
    isFetchingMore,
    loadMoreRef,
    setPage,
    isInitialLoading,
  };
};
