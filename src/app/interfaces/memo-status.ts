import {MemoItem} from "./memo-item";

export interface MemoStatus {
    items: Array<MemoItem>      // all items created for any filter so far
    testDay: string,            // '2020-01-10' current day (changeable for testing purposes)
    trainDay: string,           // '2020-01-10' day of the last saved training status
    newIds: Array<string>,      // ids of new items to be trained on the trainDay
    reviewIds: Array<string>,   // ids of items to be reviewed on the trainDay
    repeatIds: Array<string>    // ids of unknown items to be repeated on the trainDay
}