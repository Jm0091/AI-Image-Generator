import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

/**
 * This page handles form submission for generating image and creating a post.
 * Total Handlers: 5
 * @returns jsx
 */

export default function CreatePost() {

  // Used to navigate back to Home page.
  const navigate = useNavigate();
  // Used for loading mechanism
  const [generatedImage, setGeneratedImage] = useState(false);
  // Used for loading
  const [loading, setLoading] = useState(false);
  // used for form.
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  
  
  // Handler: Sets generatedImage true until it gets generated photo back from POST endpoint (/api/dalle). On response, sets form, and loading=false. 
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratedImage(true);

        const response = await fetch("http://localhost:5000/api/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (e) {
        alert(e);
        console.log(e);
      } finally {
        setGeneratedImage(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  // Handler: Submit form handler. Calls POST endpoint (/api/post), and passes form.
  const handleSubmit = async (e) => {
   
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    } else {
      alert("ISSUE!! Please enter a prompt to create an image.");
    }
  };

  // Handler: Gets and Sets change for onChange
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handler: Gets and sets random prompt  
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // Handler: Goes back to Home page 
  const backToHome = () => {
    navigate("/");
  };


  
  // Return: jsx with layout: title, form (fields and buttons)
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[32px]">Create</h1>
        <p className="mt-2 text-[16px] max-w [500px]">
          Create imaginative and visually stunning images. Share your creations
          with the community.
        </p>
      </div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Ex. Mike Ross"
              value={form.name}
              handleChange={handleChange}
              className=""
            />

            <FormField
              labelName="Prompt"
              type="text"
              name="prompt"
              placeholder="Ex. An Impressionist oil painting of sunflowers in a purple vase…"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              className=""
            />
            <div className="flex justify-center">
              <div className="relative border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-9/12 h-9/12 object-contain opacity-40"
                  />
                )}
                {generatedImage && (
                  <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="mt-5 flex gap-5">
              <button
                type="button"
                onClick={generateImage}
                className="border border-[#16a34a] font-medium rounded-md text-m w-full sm:w-auto px-5 py-2.5 text-center
                
                hover:text-black hover:bg-[#22c55e] hover:border-[#22c55e] hover:shadow-lg transition-all duration-300 ease-in-out"
              >
                {generatedImage ? "Generating..." : "Generate Image"}
              </button>
            </div>
          </div>
          
          <div className="mt-10">
            <p className="mt-2 text-[14px]">
              Once you have created the image you want, you can share it with
              the community.
            </p>
            <button
              type="submit"
              className=" mt-3 border border-[#e11d48] font-medium rounded-md text-m w-full sm:w-auto px-5 py-2.5 text-center
              
              hover:text-black hover:bg-[#e11d48] hover:border-[#ff4d6d] hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              {loading ? "Sharing..." : "Share with the community"}
            </button>

            <div>
              <button
                className="mt-3 border border-[#64748b] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                
                hover:text-black hover:bg-[#6b7280] hover:border-[#6b7280] hover:shadow-lg transition-all duration-300 ease-in-out"
                onClick={backToHome}
              >
                Back to home page
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
