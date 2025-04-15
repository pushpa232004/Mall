
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

interface TenantFormProps {
  language: 'en' | 'hi';
  initialData?: {
    id?: string;
    name?: string;
    category?: string;
    location?: string;
    gstin?: string;
    status?: 'active' | 'pending' | 'inactive';
  };
  onSuccess?: () => void;
}

const TenantForm: React.FC<TenantFormProps> = ({ language, initialData, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const translations = {
    en: {
      name: "Name",
      category: "Category",
      location: "Location",
      gstin: "GSTIN",
      status: "Status",
      active: "Active",
      pending: "Pending",
      inactive: "Inactive",
      save: "Save",
      cancel: "Cancel",
      requiredField: "This field is required",
      successAdd: "Tenant added successfully",
      successEdit: "Tenant updated successfully",
      gstinFormat: "GSTIN must be in the format: 33AABCT1234Z1Z5"
    },
    hi: {
      name: "नाम",
      category: "श्रेणी",
      location: "स्थान",
      gstin: "जीएसटीआईएन",
      status: "स्थिति",
      active: "सक्रिय",
      pending: "लंबित",
      inactive: "निष्क्रिय",
      save: "सहेजें",
      cancel: "रद्द करें",
      requiredField: "यह फील्ड आवश्यक है",
      successAdd: "किरायेदार सफलतापूर्वक जोड़ा गया",
      successEdit: "किरायेदार सफलतापूर्वक अपडेट किया गया",
      gstinFormat: "GSTIN का फॉर्मेट इस प्रकार होना चाहिए: 33AABCT1234Z1Z5"
    }
  };

  const t = translations[language];

  const formSchema = z.object({
    name: z.string().min(1, { message: t.requiredField }),
    category: z.string().min(1, { message: t.requiredField }),
    location: z.string().min(1, { message: t.requiredField }),
    gstin: z.string().regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/, {
      message: t.gstinFormat,
    }),
    status: z.enum(["active", "pending", "inactive"])
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      category: initialData?.category || "",
      location: initialData?.location || "",
      gstin: initialData?.gstin || "",
      status: (initialData?.status as "active" | "pending" | "inactive") || "active"
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
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.location}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="gstin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.gstin}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
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
                  <SelectItem value="active">{t.active}</SelectItem>
                  <SelectItem value="pending">{t.pending}</SelectItem>
                  <SelectItem value="inactive">{t.inactive}</SelectItem>
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

export default TenantForm;
