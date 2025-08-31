'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export type QueryParamsObject = Record<string, string | number>;

const useQueryParams = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const serializeParams = (
    object: Partial<QueryParamsObject> = {}
  ): URLSearchParams => {
    const params = new URLSearchParams();
    Object.keys(object).forEach((key) => {
      const value = object[key];
      if (value !== undefined && value !== '') {
        params.set(key, String(value));
      }
    });
    return params;
  };

  const deserializeParams = (params: URLSearchParams): QueryParamsObject => {
    const object: QueryParamsObject = {};
    params.forEach((value, key) => {
      if (value !== undefined && value !== '') {
        object[key] = value;
      }
    });
    return object;
  };

  const setQueryParams = (query: URLSearchParams | QueryParamsObject): void => {
    const params =
      query instanceof URLSearchParams ? query : serializeParams(query);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    params: searchParams,
    setQueryParams,
    serializeParams,
    deserializeParams
  };
};

export default useQueryParams;
