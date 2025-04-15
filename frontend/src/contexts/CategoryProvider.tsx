import { createContext, useState, useContext, PropsWithChildren } from 'react';
import { mockDataPrograms} from '../services/mockData';
import { getStudyStatuses, StudyStatus } from '../services/studentStatusAPIServices';
import { Faculty, getFaculties } from '../services/facultyAPIServices';
import { useEffect } from 'react'; // cần import

interface CategoryType {
    status: StudyStatus[];
    programs: string[];
    faculty: Faculty[];
}

type CategoryContextType = {
    category: CategoryType
    setCategory: (category: CategoryType) => void;
};

// type CategoryProviderProps = PropsWithChildren & { color: string };
type CategoryProviderProps = PropsWithChildren;

const CatogoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {

    const [category, setCategory] = useState<CategoryType>(
        {
            status: [] as StudyStatus[],
            programs: mockDataPrograms,
            faculty: [] as Faculty[],
        }
    );

    // fetchData().then((data) => {
    //     console.log(data);
    //     setCategory({
    //         status: data.status,
    //         programs: mockDataPrograms,
    //         faculty: data.faculty,
    //     })
    // });

    useEffect(() => {
        const fetchData = async () => {
            const status = await getStudyStatuses();
            const faculty = await getFaculties();
            console.log(status, faculty);
            setCategory({
                status,
                programs: mockDataPrograms,
                faculty,
            });
        };

        fetchData();
    }, []); 

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
