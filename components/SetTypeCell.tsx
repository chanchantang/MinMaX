import { SetType } from "@/domain/enum";
import { useState } from "react";
import { Button, DataTable, Menu } from "react-native-paper";

type SetTypeCellProps = {
  value: SetType;
  onChange: (value: SetType) => void;
};

const SET_TYPES = Object.values(SetType);

export default function SetTypeCell({
  value,
  onChange,
}: SetTypeCellProps) {
  const [visible, setVisible] = useState(false);

  return (
    <DataTable.Cell>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <Button
            compact
            onPress={() => setVisible(true)}
            mode="text"
          >
            {value}
          </Button>
        }
      >
        {SET_TYPES.map((type) => (
          <Menu.Item
            key={type}
            title={type}
            onPress={() => {
              setVisible(false);
              onChange(type);
            }}
          />
        ))}
      </Menu>
    </DataTable.Cell>
  );
}
