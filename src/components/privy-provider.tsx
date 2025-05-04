'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';

export const PrivyProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
            config={{
                embeddedWallets: {
                    createOnLogin: 'off',
                },
                loginMethods: ['wallet'],
            }}
        >
            {children}
        </PrivyProvider>
    );
};
