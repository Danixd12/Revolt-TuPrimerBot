export declare type Nullable<T> = T | null;
export declare function toNullable<T>(data?: T): T | null;
export declare function toNullableDate(data?: {
    $date: string;
}): Date | null;
