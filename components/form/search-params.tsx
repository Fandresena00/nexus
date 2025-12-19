"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputSeacrhValue, SetInputSearchValue] = useState("");

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams("search", inputSeacrhValue);
  };

  const HandleReset = () => {
    updateSearchParams("search", "");
  };

  return (
    <div className="relativegroup">
      <div className="absolute inset-0.5 bg-linear-to-r from-purple-700 to-cyan-600 rounded-lg opacity-0 group-focus-within:opacity-10 blur transition-all duration-300" />
      <form className="relative" onSubmit={HandleSubmit}>
        <Button
          variant={"link"}
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300"
        >
          <Search />
        </Button>
        <Input
          type="text"
          onChange={(e) => SetInputSearchValue(e.target.value)}
          placeholder="Search projects..."
          className="px-10 w-64 bg-muted/50 text-gray-300 border-border focus:border-primary/50 transition-all duration-300"
        />
        {inputSeacrhValue.length > 0 ? (
          <Button
            variant={"link"}
            type="reset"
            onClick={HandleReset}
            className="absolute top-1/2 right-0 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors duration-300"
          >
            <X />
          </Button>
        ) : null}
      </form>
    </div>
  );
}
