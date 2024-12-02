import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost, NotFound } from "./pages";
import { FaLinkedin, FaGithub } from "react-icons/fa";

/**
 * Routes (pages):
 *  1. Home:        Displays list of posts
 *  2. CreatePost:  Displays form to generate image.
 *  3. NotFound:    Displays invalid request.
 * @returns jsx
 */
function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b-2 border-b-[#0a6650] mb-5">
        <Link to="/" className="text-4xl">
          <h1 className="text-4xl">AI Image Generator</h1>
        </Link>
        <div className="flex justify-center">
          <h1 className="mx-5">
            <a
              href="https://www.linkedin.com/in/jemsc/"
              target="_blank"
              rel="noopener noreferrer"
              title="Jump to LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </h1>
          <h1>
            <a
              href="https://github.com/jm0091"
              target="_blank"
              rel="noopener noreferrer"
              title="Jump to GitHub"
            >
              <FaGithub size={24} />
            </a>
          </h1>
        </div>
      </header>

      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
