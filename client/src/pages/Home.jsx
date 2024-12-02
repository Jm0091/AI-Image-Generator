import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { Link } from "react-router-dom";

/**
 * This home page shows a lsit of posts (AI generated images), postion to search and a Link to create-post.
 * Total Handlers: 1
 * @returns jsx
 */

// Rendors Cards
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return <h2 className="mt-5 font-bold text-xl uppercase">{title}</h2>;
};

export default function Home() {
  // useState variables
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setsearchResults] = useState(null);
  const [allPosts, setAllPosts] = useState(null);

  // useEffect: GET call (/api/post/) to get a list of posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/post/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          alert(`Server responded with status: ${response.status}`);
        }

        const result = await response.json();
        setAllPosts(result.data.reverse());

      } catch (e) {
        alert(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handler: filters posts according to search term
  const handleSearch = (e) => {
    clearTimeout(searchTimeout);

    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (post) =>
            post.name.toLowerCase().includes(searchText.toLowerCase()) ||
            post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setsearchResults(searchResults);
      }, 10) //This delay is intentional to avoid triggering the search function on every keystroke immediately.
    );
  };

  // return: Layout: Link, Titles text, Search field, Images
  return (
    <section className="max-w-7xl mx-auto" id="homeSection">
      <div className="flex justify-end mb-5">
        <Link
          to="/create-post"
          className="font-medium text-white px-4 py-2 rounded-md border-2 border-[#00ca9a]
          
          hover:text-black hover:bg-[#4ade80] hover:border-[#4ade80] hover:shadow-lg transition-all duration-300 ease-in-out"
        >
          Create Post
        </Link>
      </div>

      <div>
        <h1 className="font-extrabold text-[30px]">Community Showcase</h1>
        <p className="mt-2 text-[16px] max-w [500px]">
          Browse through the latest images from the community.
        </p>
      </div>

      <div className="mt-16 flex justify-center px-4">
        <div className="w-full max-w-lg sm:w-[50%]">
          <FormField
            labelName="Search post"
            type="text"
            name="search"
            value={searchText}
            placeholder="Ex. Hello World!"
            handleChange={handleSearch}
            className=""
          />
        </div>
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-xl mb-3">
                Showing results for <span>{searchText}</span>
              </h2>
            )}

            <div className="grid lg:grid-cols-3 sm:grid-cols-3 xs: grid-cols-2 grid-cols-1 gap-1">
              {searchText ? (
                <RenderCards
                  data={searchResults}
                  title="No search results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
