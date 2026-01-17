import ActionSheet from '@/components/ActionSheet';
import { ExerciseDefinitionSheetItem } from '@/data/local/types';
import { SheetDefinition, registerSheet } from 'react-native-actions-sheet';

registerSheet('payload', ActionSheet)

declare module 'react-native-actions-sheet' {
    export interface Sheets {
        payload: SheetDefinition<{
            payload: ExerciseDefinitionSheetItem[];
        }>;
    }
}

export default {};