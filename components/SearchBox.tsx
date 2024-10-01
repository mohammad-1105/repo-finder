"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import axios from "axios";
import { endpoint } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  searchTerm: z.string().min(2, {
    message: "Search term must be at least 2 characters.",
  }),
  language: z.string().min(1, {
    message: "Please select a language.",
  }),
});

export default function SearchBox({setRepos}: {setRepos: (repos: any) => void}) {
  const [sortByStars, setSortByStars] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "Rust",
    "C#",
    "Swift",
    "Kotlin",
    "PHP",
    "R",
    "Perl",
    "Objective-C",
    "Scala",
    "Dart",
    "Elixir",
    "Haskell",
    "Shell",
    "Lua",
    "Matlab",
    "F#",
    "Erlang",
    "C",
    "SQL",
    "VHDL",
    "Verilog",
    "Julia",
    "Tcl",
    "Fortran",
    "Ada",
    "COBOL",
    "Scheme",
    "Groovy",
    "Visual Basic",
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchTerm: "",
      language: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data, sortByStars);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${endpoint}?q=${data.searchTerm}+language:${data.language}&sort=${
          sortByStars ? "stars" : "updated"
        }&order=desc`
      );
      setRepos(response.data.items);
    } catch (error: Error | any) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        {/* Search Term Input */}
        <FormItem className="w-full md:max-w-xl">
          <FormControl>
            <Input
              type="text"
              placeholder="Search repositories..."
              {...form.register("searchTerm")}
              className="w-full md:max-w-xl"
            />
          </FormControl>
          <FormMessage>{form.formState.errors.searchTerm?.message}</FormMessage>
        </FormItem>

        {/* Language Select with error handling */}
        <FormItem className="w-full md:w-[140px]">
          <FormControl>
            <Controller
              control={form.control}
              name="language"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.language?.message}</FormMessage>
        </FormItem>

        {/* Sort by Stars Switch */}
        <div className="flex items-center space-x-2">
          <Switch
            id="sort-stars"
            checked={sortByStars}
            onCheckedChange={() => setSortByStars(!sortByStars)}
          />
          <Label htmlFor="sort-stars">Sort by stars</Label>
        </div>

        {/* Submit Button */}
        <Button type="submit">
          {isLoading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-black animate-spin ml-2"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            "Search"
          )}
        </Button>
      </form>
    </Form>
  );
}
