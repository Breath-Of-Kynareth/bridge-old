import { Document, WithId } from "mongodb";

export interface RankDocument extends WithId<Document>{
    key: string;
    data: string[];
}