
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

interface PurchaseItemFormProps {
  language: 'en' | 'hi';
  initialData?: {
    id?: string;
    vendor?: string;
    date?: string;
    items?: number;
    value?: string;
    status?: 'completed' | 'pending' | 'processing';
  };
  onSuccess?: () => void;
}

const PurchaseItemForm: React.FC<PurchaseItemFormProps> = ({ language, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const translations = {
    en: {
      vendor: "Vendor",
      date: "Date",
      items: "Number of Items",
      value: "Value (₹)",
      status: "Status",
      completed: "Completed",
      pending: "Pending",
      processing: "Processing",
      save: "Save",
      cancel: "Cancel",
      requiredField: "This field is required",
      positiveNumber: "Must be a positive number",
      successAdd: "Purchase order added successfully",
      successEdit: "Purchase order updated successfully"
    },
    hi: {
      vendor: "विक्रेता",
      date: "तारीख",
      items: "आइटम संख्या",
      value: "मूल्य (₹)",
      status: "स्थिति",
      completed: "पूरा हुआ",
      pending: "लंबित",
      processing: "प्रसंस्करण",
      save: "सहेजें",
      cancel: "रद्द करें",
      requiredField: "यह फील्ड आवश्यक है",
      positiveNumber: "एक सकारात्मक संख्या होनी चाहिए",
      successAdd: "खरीद आदेश सफलतापूर्वक जोड़ा गया",
      successEdit: "खरीद आदेश सफलतापूर्वक अपडेट किया गया"
    }
  };

  const t = translations[language];

  const formSchema = z.object({
    vendor: z.string().min(1, { message: t.requiredField }),
    date: z.string().min(1, { message: t.requiredField }),
    items: z.coerce.number().positive({ message: t.positiveNumber }),
    value: z.string().min(1, { message: t.requiredField }),
    status: z.enum(["completed", "pending", "processing"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vendor: initialData?.vendor || "",
      date: initialData?.date || new Date().toISOString().split('T')[0],
      items: initialData?.items || 1,
      value: initialData?.value?.replace('₹', '') || "",
      status: (initialData?.status as "completed" | "pending" | "processing") || "pending"
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
          name="vendor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.vendor}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.date}</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t.items}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>{t.value}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.status}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={t.status} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="completed">{t.completed}</SelectItem>
                  <SelectItem value="pending">{t.pending}</SelectItem>
                  <SelectItem value="processing">{t.processing}</SelectItem>
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

export default PurchaseItemForm;
