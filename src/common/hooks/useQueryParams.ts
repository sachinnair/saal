import React from 'react';
import type { NavigateOptions } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function useQueryParam<T>(
    key: string
  ): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  
    let [searchParams, setSearchParams] = useSearchParams();
    let paramValue = searchParams.get(key);
  
    let value = React.useMemo(() => paramValue && JSON.parse(paramValue), [paramValue]);
  
    let setValue = React.useCallback(
      (newValue: T, options?: NavigateOptions) => {
        let newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(key, JSON.stringify(newValue));
        setSearchParams(newSearchParams, options);
      },
      [key, searchParams, setSearchParams]
    );
  
    return [value, setValue];
  }