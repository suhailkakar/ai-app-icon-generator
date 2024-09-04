import React from "react";
import { GeistMono } from "geist/font/mono";

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
    <div className="absolute bottom-10 right-10 w-[400px] h-[220px] bg-gray-100 p-3 rounded-md">
      {status.map((app: any) => (
        <div key={app.name} className="flex flex-row items-center">
          <p className={GeistMono.className + " text-sm text-gray-700"}>
            generated app icon for "{app.name}"
          </p>
        </div>
      ))}
    </div>
  );
}
