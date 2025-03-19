import { createContext, useState, useContext, PropsWithChildren } from 'react';

interface CategoryType {
    status: string[];
    programs: string[];
    faculty: string[];
}

type CategoryContextType = {
    category: CategoryType
    setCategory: (category: CategoryType) => void;
};

// type CategoryProviderProps = PropsWithChildren & { color: string };
type CategoryProviderProps = PropsWithChildren;

const CatogoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
    const [category, setCategory] = useState<CategoryType>({} as CategoryType);
    return (
        <CatogoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CatogoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CatogoryContext);
    if (context === undefined) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
}
