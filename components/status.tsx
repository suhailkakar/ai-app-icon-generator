import React from "react";
import { GeistMono } from "geist/font/mono";
import { ScrollArea } from "./ui/scroll-area";

export default function Status({ images, apps }: { images: any; apps: any }) {
  if (images.length === 0) {
    return null;
  }

  const status = images.map((image: any) => {
    const app = apps.find((app: any) => app.name === image.app.name);
    return {
      name: app.name,
      status: image ? "ready" : "pending",
    };
  });

  return (
    <div className="fixed bottom-4 right-4 w-[300px] h-[220px] bg-gray-100 p-3 rounded-md">
      <ScrollArea className="h-full">
        <div className="flex flex-col">
          {status.map((app: any) => (
            <div key={app.name} className="flex flex-row items-center">
              <p className={GeistMono.className + " text-sm text-gray-700"}>
                generated for "{app.name}"
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
