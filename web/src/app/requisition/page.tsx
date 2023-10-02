"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRole } from "@/contexts"
import { useEffect, useState } from "react"
import { SelectLabel } from "@radix-ui/react-select"
import { api } from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
 

const formSchema = z.object({
    title: z.string(),
    body: z.string(),
    serviceId: z.string(),
})

export default function NewRequisition() {
    const { toast } = useToast();
    const { push } = useRouter();

    const {
        user,
        sectionsList,
        fetchSection,
    } = useRole();

    useEffect(() => { fetchSection() }, []);

    const findSectionBasedOnService = (serviceId: string): string | undefined => {
        const section = sectionsList.find((section) => {
            const service = section.services.find((service) => service.id === serviceId);
            return service;
        });

        return section?.id;
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            body: "",
            serviceId: ""
        },
    });
     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const universitySectionId = findSectionBasedOnService(values.serviceId);

        if (universitySectionId && user!.Student) {
            await api.post("/requisition", {
                title: values.title,
                body: values.body,
                universitySectionId: universitySectionId,
                serviceId: values.serviceId,
                studentId: user?.Student.id,
            }).then(() => {
                toast({
                    title: "Requisição criada!",
                    description: "Sua requisição será analisada em breve.",
                });
                
                setTimeout(() => {
                    push('/');
                }, 3000);
            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Erro ao criar requisição!",
                    description: "Tente novamente mais tarde.",
                });
            })
        }
    };
    
    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="font-semibold text-lg mb-4">Nova Requisição</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="serviceId"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Serviço</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione um serviço" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {sectionsList.map((section) => {
                                        return (
                                            <SelectGroup key={section.id}>
                                                <SelectLabel>{section.name} ({section.slug})</SelectLabel>

                                                {section.services.map((service) => {
                                                    return (
                                                        <SelectItem key={service.id} value={service.id}>
                                                            {service.name}
                                                        </SelectItem>
                                                    )
                                                })}
                                            </SelectGroup>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                You can manage email addresses in your{" "}
                                <Link href="/examples/forms">email settings</Link>.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="body"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input placeholder="Descreva sua solicitação" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}