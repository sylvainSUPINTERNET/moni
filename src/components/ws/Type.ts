export interface IService {
    readonly id: string;
}
export interface IHomeService extends IService {
    readonly id: "HOME_SERVICE";
}
export interface IHistoryService extends IService {
    readonly id: "HISTORY_SERVICE";
}
