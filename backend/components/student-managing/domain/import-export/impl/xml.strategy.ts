import { ImportExportStrategy } from '../format.strategy';
import { XMLBuilder, XMLParser  } from 'fast-xml-parser';
import studentXMLParser from './parser/StudentXML.parser';

export enum ParserType {
    STUDENT = 'student'
}

export class XMLStrategy implements ImportExportStrategy {

    private xmlParser: XMLParser;

    private xmlBuilder: XMLBuilder; 

    private parserMap: Map<string, any>;

    constructor() {
        this.xmlParser = new XMLParser({ ignoreAttributes: false });

        this.xmlBuilder = new XMLBuilder({
            format: true,
            ignoreAttributes: false
        });

        this.parserMap = new Map<string, any>();
    }

    registerParser(parser: any, type: string) {
        if (this.parserMap.has(type)) {
            throw new Error(`Parser for type ${type} already exists`);
        }
        this.parserMap.set(type, parser);
    }

    parseData(data: string): any {
        const jsonObj = this.xmlParser.parse(data);
        const type = this.getType(jsonObj);
        const parser = this.getParser(type);
        return parser.parse(jsonObj);        
    }

    stringifyData(data: any, type: string): string {
        const wrappedData = this.getParser(type).wrap(data);
        return this.xmlBuilder.build(wrappedData);
    }

    private getType(data: any): string {
        return data.students.student ? ParserType.STUDENT : '';
    }
    
    private getParser(type: string) {
        const parser = this.parserMap.get(type);
        if (!parser) {
            throw new Error(`Parser for type ${type} not found`);
        }
        return parser;
    }
}

const xmlStrategy = new XMLStrategy();
xmlStrategy.registerParser(studentXMLParser, ParserType.STUDENT);
export default xmlStrategy;