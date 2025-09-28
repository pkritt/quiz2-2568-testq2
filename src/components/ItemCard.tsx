import { Card, Group, Badge, ActionIcon, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

type FoodProps = {
  name: string;
  price: number | string;
  quantity: number | string;
  category: string;
  onDelete: () => void;
};

export default function ItemCard({ name, price, quantity, category, onDelete }: FoodProps) {
  const p = Number(price) || 0;
  const q = Number(quantity) || 0;
  const lineTotal = p * q;

  return (
    <Card withBorder radius="lg" shadow="sm" mb="sm">
      <Group justify="space-between" align="flex-start">
        <div>
          <Text fw={600}>{name}</Text>
          <Text size="sm" c="dimmed">
            Price: {p}  Qty: {q}
          </Text>
        </div>

        <Badge variant="light">{category}</Badge>
      </Group>

      <Group justify="space-between" mt="xs">
        <Text size="sm">Subtotal</Text>
        <Text fw={700}>{lineTotal.toLocaleString()} ฿</Text>
      </Group>

      <Group justify="flex-end" mt="sm">
        <ActionIcon color="red" variant="light" onClick={onDelete}>
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    </Card>
  );
}
