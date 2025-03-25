import { useState, useEffect } from 'react';

export const useMinimumLoadingTime = (isLoading, minimumLoadingTimeMs = 1000) => {
  const [isShowingLoader, setIsShowingLoader] = useState(isLoading);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsShowingLoader(false);
      }, minimumLoadingTimeMs);

      return () => clearTimeout(timer);
    } else {
      setIsShowingLoader(true);
    }
  }, [isLoading, minimumLoadingTimeMs]);

  return isShowingLoader;
}; 