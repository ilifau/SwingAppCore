export interface MemoOverview {
    trainDate: string,          // training date
    totalCount: number,         // total number of available items for the current filter
    trainedCount: number,       // number of trained items for the current filter
    untrainedCount: number,     // number of not yet trained items for the current filter
    newCount: number,           // number of remaining new items of the training day
    reviewCount: number,        // number of remaining items to be reviewed on the training day
    repeatCount: number         // number of unknown items to be repeated on the training day,
    todayCount: number          // number of items to be trained today
}