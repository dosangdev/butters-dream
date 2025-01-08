'use client';

import { baseFetcher } from '@/utils/api';
import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export const swrFetcher = async (url: string) => {
  return baseFetcher(url).json<any>();
};

export default function ClientSWRConfig({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnMount: true,
        fetcher: swrFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
}
