"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useProductModal } from "@/hooks/use-product-modal";
import { useRouter } from "next/navigation";

export const runtime = "edge";

const formSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  price: z.number(),
});

export const CreateProductModal = () => {
  const productModal = useProductModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter();
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      router.refresh();
      toast({
        title: "Product created successfully!",
        variant: "default",
      });
      setLoading(false);
      form.reset();
      productModal.onClose();
    },
    onError: () => {
      toast({
        title: "Duplicate value entered!",
        description: "The value you're trying to create already exists.",
        variant: "destructive",
      });
      setLoading(false);
      productModal.onClose();
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      createProduct.mutate(values);
      console.log(values);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "Please try again in sometime.",
        variant: "destructive",
      });
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create a new product"
      description="You can manage your products here."
      isOpen={productModal.isOpen}
      onClose={productModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div className="space-y-2">
            <Form {...form}>
              <form
                className="space-y-3"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Enter the Product Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                        <FormControl>
                        <Input
                          disabled={loading}
                          type="number"
                          placeholder="Enter Product Price"
                          {...field}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          type="number"
                          placeholder="Enter Quantity"
                          {...field}
                          onChange={(event) =>
                            field.onChange(parseInt(event.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-center justify-end space-x-2 pt-6">
                  <Button
                    disabled={loading}
                    type="button"
                    variant="outline"
                    onClick={productModal.onClose}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
