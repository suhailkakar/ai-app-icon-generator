const APPS = [
  {
    name: "Phone",
    identifier: "com.apple.mobilephone",
    description: "Make calls, manage contacts, and access voicemail",
  },
  {
    name: "Messages",
    identifier: "com.apple.MobileSMS",
    description:
      "Send and receive text messages, iMessages, and multimedia messages",
  },
  {
    name: "Mail",
    identifier: "com.apple.mobilemail",
    description: "Manage email accounts, send and receive emails",
  },
  {
    name: "Safari",
    identifier: "com.apple.mobilesafari",
    description: "Web browser for accessing internet content",
  },
  {
    name: "Music",
    identifier: "com.apple.Music",
    description:
      "Play and organize music, access Apple Music streaming service",
  },
  {
    name: "Calendar",
    identifier: "com.apple.mobilecal",
    description: "Manage schedules, events, and appointments",
  },
  {
    name: "Photos",
    identifier: "com.apple.mobileslideshow",
    description: "View, edit, and organize photos and videos",
  },
  {
    name: "Camera",
    identifier: "com.apple.camera",
    description: "Take photos and videos, access various camera modes",
  },
  {
    name: "Maps",
    identifier: "com.apple.Maps",
    description: "Navigation, directions, and location services",
  },
  {
    name: "Weather",
    identifier: "com.apple.weather",
    description: "Check current weather conditions and forecasts",
  },
  {
    name: "App Store",
    identifier: "com.apple.AppStore",
    description: "Browse, purchase, and download apps and games",
  },
  {
    name: "Settings",
    identifier: "com.apple.Preferences",
    description: "Adjust device settings and preferences",
  },
  {
    name: "Instagram",
    identifier: "com.burbn.instagram",
    description:
      "Share photos and videos, connect with friends, explore content",
  },
  {
    name: "Facebook",
    identifier: "com.facebook.Facebook",
    description: "Connect with friends, share updates, join groups, and more",
  },
  {
    name: "Twitter",
    identifier: "com.atebits.Tweetie2",
    description:
      "Share thoughts, follow news, and engage in public conversations",
  },
  {
    name: "WhatsApp",
    identifier: "net.whatsapp.WhatsApp",
    description: "Send messages, make voice and video calls, share media",
  },
  {
    name: "TikTok",
    identifier: "com.zhiliaoapp.musically",
    description: "Create, watch, and share short-form video content",
  },
  {
    name: "YouTube",
    identifier: "com.google.ios.youtube",
    description: "Watch, create, and share videos on various topics",
  },
  {
    name: "Netflix",
    identifier: "com.netflix.Netflix",
    description: "Stream TV shows, movies, and original content",
  },
  {
    name: "Spotify",
    identifier: "com.spotify.client",
    description: "Stream music, podcasts, and create playlists",
  },
  {
    name: "Airbnb",
    identifier: "com.airbnb.app",
    description: "Book accommodations, experiences, and vacation rentals",
  },
  {
    name: "Uber",
    identifier: "com.ubercab.UberClient",
    description: "Request rides, track drivers, and get to your destination",
  },
  {
    name: "Amazon",
    identifier: "com.amazon.Amazon",
    description: "Shop online for various products, access Prime services",
  },
  {
    name: "Google Maps",
    identifier: "com.google.Maps",
    description:
      "Navigate, explore local businesses, and get real-time traffic updates",
  },
  {
    name: "LinkedIn",
    identifier: "com.linkedin.LinkedIn",
    description:
      "Professional networking, job searching, and career development",
  },
];

const NEGATIVE_PROMPT = `border radius,  shadows, textures, glare, reflections`;

function generatePrompt(appName: string, theme: string, description: string) {
  return `square modern iOS flat app icon for the ${appName} app with a ${theme} theme. The icon should feature a vibrant, playful aesthetic, reflecting the core functionality of ${appName}, which is to ${description}. The design should include elements from the ${theme} universe, such as ${theme}-inspired colors, shapes, and symbols. Keep the design clean and modern, ensuring it is visually appealing and instantly recognizable as both ${appName} and ${theme}. flat icon, white background, 1:1 ratio,square no border radius, no shadows, no textures, no glare, no reflections`;
}

const generate = async (app: (typeof APPS)[number], theme: string) => {
  const prompt = generatePrompt(app.name, theme, app.description);
  const payload = {
    prompt: prompt,
    model_id: "black-forest-labs/FLUX.1-schnell",
    negative_prompt: NEGATIVE_PROMPT,
    width: 1024,
    height: 1024,
    num_images_per_prompt: 2,
    num_inference_steps: 6,
    guidance_scale: 5,
    safety_check: false,
  };

  try {
    const response = await fetch(
      "https://dream-gateway.livepeer.cloud/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    return data.images;
  } catch (error) {
    console.error(`Error generating images for ${app.name}:`, error);
    return []; // Return an empty array in case of an error
  }
};

export { generatePrompt, APPS, generate };
