import { DomainCode } from "../../../../../core/responses/DomainCode";
import { NotFoundError } from "../../../../../core/responses/ErrorResponse";
import { ImportExportStrategy } from "../format.strategy";
import {JSONStrategy} from "./json.strategy";
import {XMLStrategy} from "./xml.strategy";


class FormatStrategyFactory {
    private _strategies: Map<string, ImportExportStrategy>;

    constructor() {
        this._strategies = new Map();
    }

    has(type: string): boolean {
        return this._strategies.has(type);
    }

    register(name: string, strategy: ImportExportStrategy): void {
        if (this._strategies.has(name)) 
            throw new Error(`Strategy with name ${name} already exists`);
        this._strategies.set(name, strategy);
    }

    getStrategy(type: string): ImportExportStrategy {
        const strategy = this._strategies.get(type);
        if (!strategy) {
            throw new NotFoundError(DomainCode.IMPORT_EXPORT_TYPE_NOT_FOUND, `Import/Export type ${type} not found`);
        }
        
        return strategy;
    }
}

const formatStrategyFactory = new FormatStrategyFactory();
formatStrategyFactory.register('json', new JSONStrategy());
formatStrategyFactory.register('xml', new XMLStrategy());


export default formatStrategyFactory;
