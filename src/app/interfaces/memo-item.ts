export interface MemoItem {
    id: string;                 // '1'
    views: number               // 1
    lastDay: string;            // '2020-01-11'
    lastScore: number,          // 0, 1.5, 3, 4.5
    factor: number              // 1.3 - 2.5
    schedule: number,           // 4 (days)
    nextDay: string,            // '2020-01-11'
}
