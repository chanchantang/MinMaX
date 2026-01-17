import { useState } from "react";
import { DataTable, TextInput } from "react-native-paper";

type EditableCellProps = {
  value?: string | number;
  numeric?: boolean;
  onSave: (value: string) => void;
};

export default function EditableCell({
  value,
  numeric,
  onSave,
}: EditableCellProps) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(
    value !== undefined ? String(value) : ""
  );

  if (editing) {
    return (
      <DataTable.Cell numeric={numeric}>
        <TextInput
          value={text}
          onChangeText={setText}
          autoFocus
          keyboardType={numeric ? "numeric" : "default"}
          onBlur={() => {
            setEditing(false);
            onSave(text);
          }}
          dense
          mode="outlined"
          style={{ height: 36 }}
        />
      </DataTable.Cell>
    );
  }

  return (
    <DataTable.Cell
      numeric={numeric}
      onPress={() => setEditing(true)}
    >
      {value ?? "—"}
    </DataTable.Cell>
  );
}
