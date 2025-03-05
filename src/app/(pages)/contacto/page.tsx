"use client";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  AtSign,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { toast } = useToast();

  const handleCopyMail = () => {
    navigator.clipboard
      .writeText("info@make-renders.com")
      .then(() => {
        toast({
          variant: "default",
          description: "Copiado al portapapeles",
        });
      })
      .catch((error) => {
        console.error("Error al copiar el número: ", error);
      });
  };
  return (
    <div className="relative flex h-dvh w-full max-w-[1440px] flex-col items-start justify-start px-6 pb-6 pt-28 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-[120px] lg:pb-0 lg:pt-0">
      <section className="flex flex-col gap-4 md:gap-6 lg:h-[500px] lg:max-w-xl lg:items-start lg:px-0 lg:pt-1">
        <div className="font-serif text-2xl font-medium md:text-6xl">
          Contactate con nosotros
        </div>

        <ul className="text-10 space-y-4 font-normal md:text-sm">
          <li
            className="flex cursor-pointer items-center gap-2"
            onClick={handleCopyMail}
          >
            <AtSign className="mr-3 h-4 w-4" /> info@make-renders.com
          </li>
          <li
            className="flex cursor-pointer items-center gap-2"
            onClick={() => (window.location.href = "tel:+5491133763637")}
          >
            <Phone className="mr-3 h-4 w-4" /> (+54) 911 3376-3637
          </li>
          <li>
            <Link
              className="flex cursor-pointer items-center gap-2"
              href={"https://maps.app.goo.gl/L9RxYX8zfWbaccc98"}
              target="_blank"
            >
              <MapPin className="mr-3 h-4 w-4" /> Calle Salvador Debenedetti
              602, La Lucila, Bs. As., Arg.
            </Link>
          </li>
        </ul>
      </section>

      <section className="mt-6 flex w-full flex-row items-start gap-3 lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-fit lg:-translate-y-1/2 lg:flex-col lg:rounded-l-md lg:bg-[#1A1D38] lg:p-3">
        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant={"secondary"}
                size={"icon"}
                className="rounded-[10px]"
              >
                <Link
                  href={
                    "https://www.linkedin.com/company/82986786/admin/feed/posts/"
                  }
                  target="_blank"
                >
                  <Linkedin className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={10}
              side="left"
              className="font-semibold"
            >
              <p>Linkedin</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                asChild
                variant={"secondary"}
                size={"icon"}
                className="rounded-[10px]"
              >
                <Link
                  href={"https://www.instagram.com/makerenders/"}
                  target="_blank"
                >
                  <Instagram className="h-4 w-4" />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent
              sideOffset={10}
              side="left"
              className="font-semibold"
            >
              <p>Instagram</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </section>

      <section className="w-full pb-6 pt-8 sm:pb-0 sm:pt-6 lg:max-w-xl lg:pt-0">
        <ContactForm />
      </section>
    </div>
  );
}
