"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const registrationFormSchema = z.object({
  inGameName: z.string().min(3, { message: "El nombre en el juego debe tener al menos 3 caracteres." }),
  playerId: z.string().min(5, { message: "El ID de jugador debe tener al menos 5 caracteres." }),
  level: z.coerce.number({invalid_type_error: "El nivel debe ser un número."}).min(50, { message: "Debes tener nivel 50 o superior." }),
  rank: z.string({ required_error: "Por favor selecciona tu rango." }),
  kdBR: z.coerce.number({invalid_type_error: "El K/D debe ser un número."}).min(3.0, { message: "El K/D en BR debe ser de 3.0 o superior." }),
  kdBE: z.coerce.number({invalid_type_error: "El K/D debe ser un número."}).min(2.5, { message: "El K/D en BE debe ser de 2.50 o superior." }),
  age: z.coerce.number({invalid_type_error: "La edad debe ser un número."}).min(18, { message: "Debes ser mayor de edad." }),
  hasWhatsApp: z.boolean().default(false).refine(val => val === true, { message: "Debes tener WhatsApp." }),
  isAvailable: z.boolean().default(false).refine(val => val === true, { message: "Debes tener tiempo disponible." }),
  acceptTiktok: z.boolean().default(false).refine(val => val === true, { message: "Debes aceptar los términos de creación de contenido." }),
  message: z.string().max(500, { message: "El mensaje no puede exceder los 500 caracteres." }).optional(),
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

interface FormResult {
  message: string;
}

function RegistrationResult({ result, submittedData }: { result: FormResult; submittedData: RegistrationFormValues | null }) {
    const { toast } = useToast();
    const whatsAppGroupLink = 'https://chat.whatsapp.com/FbjnJW13u3IHSVj7XFQRiw';

    const handleSendToWhatsApp = () => {
        if (!submittedData) return;

        const message = `
*Nueva Postulación para Sav Oficial*
----------------------------------
*Nombre en el Juego:* ${submittedData.inGameName}
*Player ID:* ${submittedData.playerId}
*Edad:* ${submittedData.age}
*Nivel:* ${submittedData.level}
*Rango:* ${submittedData.rank}
*K/D (BR):* ${submittedData.kdBR}
*K/D (BE):* ${submittedData.kdBE}
*Mensaje:* ${submittedData.message || 'N/A'}
----------------------------------
*Confirmaciones:*
- Tiene WhatsApp: Sí
- Tiene disponibilidad: Sí
- Acepta crear contenido: Sí
        `.trim().replace(/^\s+/gm, '');

        navigator.clipboard.writeText(message).then(() => {
            toast({
                title: "¡Datos Copiados!",
                description: "Serás redirigido a WhatsApp. Pega el mensaje en el grupo.",
            });
            window.open(whatsAppGroupLink, '_blank');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            toast({
                variant: 'destructive',
                title: "Error al copiar",
                description: "No se pudieron copiar los datos. Por favor, cópialos y pégalos manualmente.",
            });
             window.open(whatsAppGroupLink, '_blank');
        });
    };

    return (
        <div className="text-center space-y-6">
            <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
            <h3 className="text-2xl font-bold">¡Aplicado Correctamente!</h3>
            <p className="text-muted-foreground">
                {result.message} El último paso es enviar tus datos al grupo de WhatsApp del clan para que los administradores puedan revisarlos.
            </p>
            <div className="pt-4">
                <Button onClick={handleSendToWhatsApp} size="lg" className="font-bold">
                    Enviar Formulario al Grupo
                </Button>
            </div>
             <p className="text-xs text-muted-foreground pt-4">
                Al hacer clic, se copiarán tus datos y se abrirá WhatsApp. Solo tienes que pegar el mensaje en el chat del grupo.
            </p>
        </div>
    );
}


export function Registration() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formResult, setFormResult] = React.useState<FormResult | null>(null);
  const [submittedData, setSubmittedData] = React.useState<RegistrationFormValues | null>(null);
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      inGameName: "",
      playerId: "",
      message: "",
      level: undefined,
      rank: undefined,
      kdBE: undefined,
      kdBR: undefined,
      age: undefined,
      hasWhatsApp: false,
      isAvailable: false,
      acceptTiktok: false
    },
  });

  async function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);
    setFormResult({ message: "Tu postulación está lista." });
    setSubmittedData(data);
    setIsSubmitting(false);
  }

  return (
    <section id="register" className="w-full py-16 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Postula para las Pruebas</CardTitle>
            <CardDescription>
              ¿Crees que tienes lo necesario? Completa el formulario para aplicar a un período de prueba con Sav Oficial.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formResult ? (
              <RegistrationResult result={formResult} submittedData={submittedData} />
            ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="inGameName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre en el Juego</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre de BloodStrike" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="playerId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Player ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu ID de jugador" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Edad</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="18" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                   <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nivel</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="50" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rango</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona tu rango" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mitico">Mítico</SelectItem>
                            <SelectItem value="mitico-top-global">Mítico Top Global</SelectItem>
                            <SelectItem value="gran-maestro">Gran Maestro</SelectItem>
                            <SelectItem value="maestro">Maestro</SelectItem>
                            <SelectItem value="elite">Élite</SelectItem>
                            <SelectItem value="pro">Pro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="kdBR"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>K/D (BR)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="3.0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="kdBE"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>K/D (BE)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" placeholder="2.5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensaje (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Cuéntanos sobre tu experiencia competitiva, roles preferidos, etc."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                   <FormField
                    control={form.control}
                    name="hasWhatsApp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                           Confirmo que tengo WhatsApp.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isAvailable"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                           Confirmo que tengo tiempo disponible para jugar.
                          </FormLabel>
                           <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="acceptTiktok"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Acepto los Términos y Condiciones sobre creación de contenido.
                          </FormLabel>
                          <FormDescription>
                            Me comprometo a crear una cuenta de TikTok con mi nombre del juego y las iniciales del clan (Sav) y a subir contenido para promocionar al clan.
                          </FormDescription>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full font-bold" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Enviar Solicitud
                </Button>
              </form>
            </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
