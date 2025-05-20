"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [error, setError] = useState(null);
  const [character, setCharacter] = useState(null);
  const [search, setSearch] = useState("");
  const [script, setScript] = useState("");

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get("/api/dashboard");
        console.log("Voices data:", response.data);
        setVoices(response.data.voices);
      } catch (err) {
        console.error("Error fetching voices:", err);
        toast.error("Failed to load voices");
      }
    };

    fetchVoices();
  }, []);
  useEffect(() => {
    console.log(voices);
  }, [voices]);

  const filterVoiceHandler = async () => {
    // toast.loading("Searching")
    try {
      return;
    } catch (error) {
      console.error("Error in searching characters : ", error);
      toast.error("Something went wrong");
    }
  };

  const createScriptHandler = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter content first");
      return; // ⬅️ Add this to stop execution
    }

    try {
      const response = await axios.post(
        "/api/create-script",
        {
          data: prompt,
          character,
        },
        {
          headers: {
            "Content-Type": "application/json", // ✅ Add this
          },
        }
      );

      console.log(response);
      setScript(response.data.text);
      toast.success("Script created successfully");
      return;
    } catch (error) {
      console.log("Error in creating script : ", error);
      return;
    }
  };

  const createReelHandler = async () => {
    setIsLoading(true);
    try {
      // Add your reel creation logic here
      // Example:
      // const response = await axios.post("/api/create-reel", { prompt });
      // console.log("Reel created:", response.data);

      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Creating reel with content:", prompt);

      // Reset input after successful creation
      setPrompt("");
      alert("Reel created successfully!");
    } catch (err) {
      console.error("Error creating reel:", err);
      alert("Failed to create reel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-0 mt-5">
      <label
        htmlFor="character"
        className="block text-green-400 text-base sm:text-lg font-medium"
      >
        Select your character
      </label>

      <Button
        className="mt-3 bg-green-400 hover:bg-green-700 text-white cursor-pointer"
        onClick={filterVoiceHandler}
        disabled={isLoading}
      >
        Filter
      </Button>
      {voices.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-white">
            Available Voices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {voices.map((voice, index) => (
              <div
                key={index}
                className={`h-10 rounded-md flex justify-between px-2 items-center cursor-pointer ${
                  character === voice.displayName
                    ? "bg-white text-black"
                    : "bg-gray-800 text-white"
                }`}
                onClick={() => {
                  const nextCharacter =
                    character === voice.displayName ? null : voice.displayName;
                  setCharacter(nextCharacter);

                  if (voice.audioUrl && nextCharacter === voice.displayName) {
                    const audio = new Audio(voice.audioUrl);
                    audio.play();
                  }
                }}
              >
                {voice.displayName}
                <div className="rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="my-6 ">
        <label
          htmlFor="content"
          className="block text-green-400 text-base sm:text-lg font-medium mb-2"
        >
          Add content
        </label>
        <Input
          id="topic"
          placeholder="Enter your topic"
          className="w-full bg-white text-gray-800 placeholder-gray-500 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <Button
          className="mt-3 bg-green-400 hover:bg-green-700 text-white cursor-pointer"
          onClick={createScriptHandler}
          disabled={isLoading || !character}
        >
          {isLoading ? "Creating..." : "Create Script"}
        </Button>

        {script && (
          <Textarea value={script} className="my-2 bg-white" readOnly />
        )}
      </div>
      <Button
        className="mt-3 bg-blue-400 hover:bg-blue-700 text-white cursor-pointer"
        onClick={createReelHandler}
        disabled={isLoading || !script}
      >
        {isLoading ? "Creating..." : "Create Reel"}
      </Button>
    </div>
  );
}
