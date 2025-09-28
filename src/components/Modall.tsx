import { useState } from "react";
import {
  Modal,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
} from "@mantine/core";

type AddFoodModalProps = {
  opened: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    price: number | string,
    quantity: number | string,
    category: string
  ) => void;
};

export default function AddFoodModal({opened, onClose, onAdd,}: AddFoodModalProps) {
  const [Name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>(0);
  const [quantity, setQuantity] = useState<number | string>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [nameError, setnameError] = useState(false);
  const [priceError, setpriceError] = useState(false);
  const [CategoryError, setCategoryError] = useState(false);
  const [quantityError, setquantityError] = useState(false);
  const handleSubmit = () => {
    let ok = true;
    if (Name === "") {setnameError(true);
    ok = false;}
    let pricenum: number = Number(price);
    if (price === "" || pricenum <= 0) {setpriceError(true);
    ok = false;}
    let quantitynum: number = Number(quantity);
    if (quantity === "" || quantitynum <= 0) {setquantityError(true);
    ok = false;}
      if (!category) {setCategoryError(true);
    ok = false;}

    if (ok) {
    onAdd(Name, price, quantity, category!);
    onClose();
  }
};
  const newAddFoodModalProps: AddFoodModalProps = {
    opened: false,
    onClose: function (): void {
      throw new Error("Function not implemented.");
    },
    onAdd: function (name: string, price: number | string, quantity: number | string, category: string): void {
      throw new Error("Function not implemented.");
    }
  };
 

  
  // หากต้องการแปง type string เป็น type number สามารถดูตัวอย่างนี้ได้
  let val_number: number = Number("500.0");
  console.log(val_number + 100); // 600.0

  return(
      <Modal opened={opened} onClose={onClose} title="Add Food Item">
        {/* Modal content */}
         <Stack>                  
            {/* Name of item */}
            
              <div>
                
                <TextInput      value={Name}      onChange={(event) => {setName(event.currentTarget.value); 
                                                                      setnameError(false);}}/> 
                       
                {nameError && ( <div className="invalid-feedback">Name of item is required</div>  )}
                
                <NumberInput  label="price" value={price} onChange={(val) => {
                                         setPrice(val ?? 0);
                                          setpriceError(false);}} />;
                
                {priceError && (
                                  <div className="text-danger mt-1">Price per dish is required</div>
                                 )}
                <NumberInput  label="quantity" value={quantity} onChange={(val) => {
                                         setQuantity(val ?? 0);
                                          setquantityError(false);}} />;
                 {quantityError && (
                                  <div className="text-danger mt-1">Number of dishes is required</div>
                                 )}                                      
            {/* category */}
            <Select  data={['Main Course', 'Drink', 'Dessert']} value={category} onChange={setCategory} />;
                {CategoryError && (
                                  <div className="text-danger mt-1">Category is required</div>
                                 )}                                         
            <Button 
              className="btn btn-success my-2"
              onClick={handleSubmit}                   
            >
              Submit
            </Button >
           </div>

          </Stack>
            </Modal>
   );
}  
