export interface MemoResult {
    schedule: number, // The next review space.
    factor: number, // The factor that should be use in the next round of caculation.
    isRepeatAgain: boolean // If is true, should review the item again until the quality is not less than 4.
}