import { ImportExportStrategy } from '../format.strategy';

export class JSONStrategy implements ImportExportStrategy {
    parseData(data: string): any {
        const parsedData = JSON.parse(data);
        return parsedData;
    }

    stringifyData(data: any, _: string): string {
        return JSON.stringify(data);
    }
}

const jsonStrategy = new JSONStrategy();
export default jsonStrategy;