
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface InventoryItemFormProps {
  language: 'en' | 'hi';
  initialData?: {
    id?: string;
    name?: string;
    category?: string;
    store?: string;
    quantity?: number;
    price?: number;
    stockLevel?: 'low' | 'medium' | 'high';
  };
  onSuccess?: () => void;
}

const InventoryItemForm: React.FC<InventoryItemFormProps> = ({ language, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const translations = {
    en: {
      name: "Item Name",
      category: "Category",
      store: "Store",
      quantity: "Quantity",
      price: "Price",
      stockLevel: "Stock Level",
      low: "Low",
      medium: "Medium",
      high: "High",
      save: "Save",
      cancel: "Cancel",
      requiredField: "This field is required",
      positiveNumber: "Must be a positive number",
      successAdd: "Inventory item added successfully",
      successEdit: "Inventory item updated successfully"
    },
    hi: {
      name: "आइटम नाम",
      category: "श्रेणी",
      store: "स्टोर",
      quantity: "मात्रा",
      price: "मूल्य",
      stockLevel: "स्टॉक स्तर",
      low: "कम",
      medium: "मध्यम",
      high: "उच्च",
      save: "सहेजें",
      cancel: "रद्द करें",
      requiredField: "यह फील्ड आवश्यक है",
      positiveNumber: "एक सकारात्मक संख्या होनी चाहिए",
      successAdd: "इन्वेंटरी आइटम सफलतापूर्वक जोड़ा गया",
      successEdit: "इन्वेंटरी आइटम सफलतापूर्वक अपडेट किया गया"
    }
  };

  const t = translations[language];

  const formSchema = z.object({
    name: z.string().min(1, { message: t.requiredField }),
    category: z.string().min(1, { message: t.requiredField }),
    store: z.string().min(1, { message: t.requiredField }),
    quantity: z.coerce.number().positive({ message: t.positiveNumber }),
    price: z.coerce.number().positive({ message: t.positiveNumber }),
    stockLevel: z.enum(["low", "medium", "high"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      store: initialData?.store || "",
      quantity: initialData?.quantity || 0,
      price: initialData?.price || 0,
      stockLevel: (initialData?.stockLevel as "low" | "medium" | "high") || "medium"
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Show success notification
    if (initialData?.id) {
      toast.success(t.successEdit);
    } else {
      toast.success(t.successAdd);
    }
    
    setIsSubmitting(false);
    if (onSuccess) onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.name}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.category}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.store}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t.quantity}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t.price}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="stockLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.stockLevel}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.stockLevel} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">{t.low}</SelectItem>
                  <SelectItem value="medium">{t.medium}</SelectItem>
                  <SelectItem value="high">{t.high}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>{t.save}</Button>
        </div>
      </form>
    </Form>
  );
};

export default InventoryItemForm;
