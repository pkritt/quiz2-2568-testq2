import { useState } from "react";
import { Button, Stack, Title, Divider, Container ,
  Text,
 } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import AddFoodModal from "../components/Modall";
import ItemCard from "../components/ItemCard";
type FoodItem = {
  id: string;
  name: string;
  price: number | string;
  quantity: number | string;
  category: string;
};

export default function FoodTracker() {
  const [opened, setOpened] = useState(false);
  const [items, setItems] = useState<FoodItem[]>([]);
 // const categories = ["Main Course", "Drink", "Dessert"];
  
  // helper แปลงเป็นตัวเลข ป้องกัน NaN
  const toNum = (v: number | string) => Number(v) || 0;

  // ราคารวมทั้งหมด
  const totalCost = items.reduce(
    (sum, it) => sum + toNum(it.price) * toNum(it.quantity),
    0
  ); 
  return (
    <Container style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title order={2} mb="md">
        Food Tracker
      </Title>
       <Button onClick={() => setOpened(true)}>Add Food Item</Button>
      {/* Type additional AddFoodModal here. */}
       <AddFoodModal
        opened={opened}
        onClose={() => setOpened(false)}
        onAdd={(name, price, quantity, category) => {
          setItems([
            ...items,
            { id: uuidv4(), name, price, quantity, category },
          ]);
          setOpened(false);
        }}
      />

    
      <Divider my="md" />
      {/* Type additional total cost here. */}
      <Title order={4}>Total cost: {totalCost.toLocaleString()} Baht</Title>
      <Stack my="sm">{/* Type additional text here. */}</Stack>

      <Divider my="md" />
      {/* Type additional card here. */}

      <Stack>
  {items.length === 0 ? (
    <Text c="dimmed">ยังไม่มีรายการอาหาร • กด “Add Food Item” เพื่อเริ่มเพิ่ม</Text>
  ) : (
    items.map((item) => (
      <ItemCard
        key={item.id}
        name={item.name}
        price={item.price}
        quantity={item.quantity}
        category={item.category}
        onDelete={() => setItems(items.filter((i) => i.id !== item.id))}
      />
    ))
  )}
</Stack>
</Container>
);}