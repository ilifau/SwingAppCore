import {MemoItem} from "./memo-item";

export interface MemoStatus {
    items: Array<MemoItem>
    today: string,
    newIds: Array<string>,
    reviewIds: Array<string>,
    repeatIds: Array<string>
}