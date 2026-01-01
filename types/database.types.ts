import { Models } from "react-native-appwrite"

export interface Exercise extends Models.Document {
    userId: string;
    name: string;
    notes: string;

}