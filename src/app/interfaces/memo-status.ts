import {MemoItem} from "./memo-item";

export interface MemoStatus {
    items: Array<MemoItem>
    today: string,
    new: Array<string>,
    review: Array<string>,
    repeat: Array<string>
}