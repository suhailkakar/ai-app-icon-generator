"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Stars } from "lucide-react";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { APPS, generate } from "@/utils/generate";
import { Button } from "./ui/button";
import Status from "./status";
import { ScrollArea } from "./ui/scroll-area";

export default function Hero() {
  const [theme, setTheme] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const characters = ["batman", "barbie", "doge", "pepe", "spongebob", "yoda"];

  const generateImages = async () => {
    if (!theme) {
      return;
    }

    setImages([]); // Clear previous images
    setStatus("Generating...");
    for (const app of APPS) {
      setStatus(`Generating for ${app.name}...`);
      const images = await generate(app, theme);

      if (images.length > 0) {
        const image = {
          url: images[0].url,
          app: app,
        };

        // @ts-ignore
        setImages((prev) => [...prev, image]);
      } else {
        console.log("No images generated for", app, theme);
      }
    }

    setStatus("All completed");
  };

  return (
    <div className="mt-[15rem]">
      <h1 className="font-heading text-pretty text-center mb-4 text-[22px] font-semibold tracking-tighter text-gray-900 sm:text-[30px] md:text-[46px]">
        Generate App Icons with AI
      </h1>
      <Label className=" text-gray-500 text-sm ">
        Please enter just the character name, we will handle the rest.
      </Label>
      <div className="flex items-center justify-center mt-2  border-input border p-1 rounded-xl">
        <Stars className="w-4 h-4 ml-2 text-gray-500" />
        <Input
          className="border-0 shadow-none focus:outline-none focus:ring-0 focus-visible:ring-0"
          placeholder="Enter your character name"
          onChange={(e) => setTheme(e.target.value)}
          value={theme}
        />
      </div>
      <div className="flex items-center justify-center space-x-3 mt-4">
        {characters.map((character) => (
          <div
            key={character}
            onClick={() => setTheme(character)}
            className="flex items-center text-sm bg-gray-100 p-1 px-3 rounded-md hover:bg-gray-200 cursor-pointer"
          >
            {character}{" "}
            <ArrowTopRightIcon className="w-3 h-3 ml-1 text-gray-500" />
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button onClick={generateImages} className="w-full">
          {status ? status : "Generate"}{" "}
          {!status && <ArrowTopRightIcon className="w-4 h-4 ml-2" />}
        </Button>
      </div>
      <ScrollArea className=" max-w-[600px] mx-auto">
        <div className="grid grid-cols-6 gap-4 mt-5 max-w-[600px] mx-auto">
          {images.map((image) => (
            <div key={image.url} className="flex flex-col items-center">
              <img
                src={image.url}
                alt={image.app.name}
                width={512}
                height={512}
                className="rounded-xl w-full h-full cover"
              />
              <div className="mt-2">
                <p>{image.app.name}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Status images={images} apps={APPS} />
    </div>
  );
}
