"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import Link from "next/link";
import { ExternalLink, SquareCheckIcon, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import { formPostSheetsStore } from "../stores/form-post-sheets.store";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "*El nombre debe tener al menos 2 caracteres",
    })
    .max(30),
  email: z
    .string()
    .email({ message: "*Revisa que el mail esté escrito correctamente" }),
  message: z
    .string()
    .min(10, { message: "*El mensaje debe tener al menos 10 caracteres" })
    .max(50),
});

export const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  const formPostSheets = formPostSheetsStore((state) => state.submitForm);
  const isSubmitting = formPostSheetsStore((state) => state.isSubmitting);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    formData.append("message", values.message);

    await formPostSheets(values)
      .then(() => {
        toast("Mensaje enviado correctamente", {
          cancelButtonStyle: {
            backgroundColor: "#292C47",
            color: "#B7BAD5",
          },
          cancel: {
            label: <X className="h-6 w-6" />,
            onClick: () => console.log("Cancel!"),
          },
          position: "top-right",
          duration: 5000,
          description: "El equipo te contactará a la brevedad.",
          icon: <SquareCheckIcon className="h-5 w-5" />,
        });
      })
      .catch((error) => {
        console.error("Error al copiar el número: ", error);
      });

    form.reset();
  }

  function disabledSubmit() {
    return isSubmitting || !form.formState.isSubmitting;
  }

  return (
    <section className="rounded-lg bg-[#1A1D38] p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* input username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre*</FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Ingresa tu nombre"
                    {...field}
                    className={cn(
                      "border px-4 py-3",
                      form.formState.errors["username"]
                        ? "border-[#AF3336]"
                        : "",
                    )}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Ingresa tu email"
                    {...field}
                    className="px-4 py-3"
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* input message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Mensaje*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Déjanos tu mensaje"
                    className="resize-none rounded-[10px] border border-[#33344F] bg-[#21243F]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <div className="flex flex-col justify-start gap-3 sm:flex-row">
            <Button
              type="submit"
              disabled={!form.formState.isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loader mr-2"></span>{" "}
                  {/* Aquí va tu animación del loader */}
                  Enviando
                </>
              ) : (
                "Enviar mensaje"
              )}
            </Button>

            <Button asChild variant={"inverse"} className="">
              <Link
                href={"https://calendly.com/makerenders/hola"}
                target="_blank"
              >
                <ExternalLink className="mr-2 h-4 w-4" /> Agendar llamada
              </Link>
            </Button>
          </div>
        </form>
      </Form>

      <Separator className="my-5 bg-[#33344F]" />

      <div>
        <p className="text-10 text-justify leading-3 text-[#9DA0BB]">
          *Acepto que mis datos en este formulario se enviarán a
          info@make-renders.com y serán leídos por seres humanos. Te
          responderemos lo más pronto posible. Si enviaste este formulario por
          error o quieres eliminar tus datos, puedes informarnos enviando un
          correo electrónico a contact@make-renders.com. Nunca te enviaremos
          spam ni compartiremos tus datos con terceros.
        </p>
      </div>
    </section>
  );
};
