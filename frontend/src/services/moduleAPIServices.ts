export interface Module {
    id: string;
    name: string;
    numOfCredits: number;
    faculty: string;
    description: string;
    prerequisiteModules: string[];
}