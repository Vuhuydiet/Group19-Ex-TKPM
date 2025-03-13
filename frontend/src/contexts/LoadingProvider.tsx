import { createContext, useState, useContext, PropsWithChildren } from 'react';

type LoadingContextType = {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
};

// type LoadingProviderProps = PropsWithChildren & { color: string };
type LoadingProviderProps = PropsWithChildren;

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
