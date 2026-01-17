import { DataTable } from "react-native-paper";
import EditableCell from "./EditableCell";

type EditableSetRowProps = {
  name: string;
  sets: number;
  reps: number;

  onUpdate: (data: Partial<{
    name: string;
    sets: number;
    reps: number;
  }>) => void;
};

export default function EditableSetRow({
  name,
  sets,
  reps,
  onUpdate,
}: EditableSetRowProps) {
  return (
    <DataTable.Row>
      {/* Name */}
      <DataTable.Cell>{name}</DataTable.Cell>

      {/* Sets */}
      <EditableCell
        numeric
        value={sets}
        onSave={(v) =>
          onUpdate({ sets: Number(v) || 0 })
        }
      />

      {/* Reps */}
      <EditableCell
        numeric
        value={reps}
        onSave={(v) =>
          onUpdate({ reps: Number(v) || 0 })
        }
      />
    </DataTable.Row>
  );
}
