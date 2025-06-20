export interface ImportExportStrategy {
	parseData(data: string): any;
	stringifyData(data: any, datatype: string): string;
}