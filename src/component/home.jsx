import React, { useContext, useEffect, useState } from "react";
import rj from "./song.mp3";
import SearchContext from "../searchContext";
import CustomNavbar from "./navbar/navbar";
import { GiSpeaker } from "react-icons/gi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { BsBookmarkHeartFill } from "react-icons/bs";
import Bookmarks from "./bookmark";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { Carousel } from "react-bootstrap";
import "./home.css";

function HomePage() {
  const [bookmarks, setBookmarks] = useState([]);
  const { search } = useContext(SearchContext);
  const [arr, setArr] = useState([]);
  const [wholearr, setWholeArr] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const [wholearr1, setWholeArr1] = useState([]);
  const [filteredArr1, setFilteredArr1] = useState([]);

  

  
  

  // api setting
  const getData = async () => {
    await fetch(
      `https://www.dictionaryapi.com/api/v3/references/thesaurus/json/${search}?key=b454008b-2ee5-41e8-a29e-5efb9fd0df15`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWholeArr(data);
      });
  };

  // sound api
  const getData1 = async () => {
    await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setWholeArr1(data);
        if (Array.isArray(data)) {
          const filteredArr1 = data.map((item) => {
            const audio = item.phonetics.find((phonetic) => phonetic.audio);
            return {
              text: item.phonetics[0]?.text,
              audio: audio ? audio.audio : null,
            };
          });
          setFilteredArr1(filteredArr1);
        } else {
          setFilteredArr1([]);
        }
      });
  };

  const handleButton = () => {
    if (!token) {
      alert("Log in first to proceed !!");
      window.location.reload();
    } else if (search !== "") {
      getData();
      //
      // setSearchHistory((prevHistory) => [search, ...prevHistory]);
    }
  };

  // bookamark
  const handleBookmark = (word, def, syns, ants) => {
    // setBookmarks((prevBookmarks) => [...prevBookmarks, word]);
    fetch("http://localhost:8080/bookmarks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, def, syns, ants, userId: token }),
    })
      .then((response) => response.json())
      .then((updatedBookmarks) => setBookmarks(updatedBookmarks))

      .catch((error) => console.error(error));
    alert("Word added to bookmark section");
  };

  useEffect(() => {
    if (search === "") {
      setArr([]);
    } else {
      const filteredArr = wholearr.filter(
        (item) =>
          item.meta &&
          item.meta.id &&
          item.meta.id.toLowerCase().includes(search.toLowerCase())
      );
      setArr(filteredArr);
      getData1();
    }
  }, [search, wholearr]);

  const audio = new Audio(rj);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setCurrentDate(formattedDate);
    }, 1000); // Update the date every second

    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, []);

  const handleAudio = () => {
    audio.play();
  };

  const games = [
    {
      title: "Snake Game",
      description:
        "Snake Game is a classic arcade-style video game in which the player controls a snake that moves around a rectangular grid or playing field. The objective of the game is to guide the snake to eat food items, which causes the snake's body to grow longer. As the snake grows, it becomes more challenging to navigate the playing field without colliding with itself or the boundaries.",
      imageUrl: "https://media.giphy.com/media/zPdwt79PXjMEo/giphy.gif",
      link: "https://radiant-medovik-c02073.netlify.app/",
    },
    {
      title: "Sudoku",
      description:
        "Sudoku is a logic-based number placement puzzle. The objective is to fill a 9x9 grid with digits so that each column, each row, and each of the nine 3x3 sub-grids contains all of the digits from 1 to 9.",
      imageUrl: "https://media.giphy.com/media/QRmUHn4hbfJvi5yR1G/giphy.gif",
      link: "https://648f510e3b64505a28ec6912--silver-cobbler-a096ce.netlify.app/",
    },
    {
      title: "Cross Word",
      description:
        "Cross Word is a popular word puzzle game. The objective is to fill in the white squares with letters, forming words or phrases, by solving clues that lead to the answers.",
      imageUrl: "https://i.gifer.com/2mVW.gif",
      link: "http://www.earthfluent.com/crossword-puzzle-demo.html",
    },
  ];

  // blogs
  const blogs = [
    {
      imageLink:
        "https://dtcfza6z1c8xn.cloudfront.net/OLD_WoTM_culture_war.png",
      title: "Spread the World",
      description: "A recent addition to our online dictionary .",
      link: "https://learningenglishwithoxford.com/2023/03/23/culture-war/",
      info: "Read our Blog",
    },
    {
      imageLink:
        "https://dtcfza6z1c8xn.cloudfront.net/grammar-promo-square.png",
      title: "Learn & Practise Grammar",
      description: "Our grammar pages combine clear explanations. ",
      link: "https://www.oxfordlearnersdictionaries.com/grammar/online-grammar/table-of-contents",
      info: "Try it Out",
    },
    {
      imageLink:
        "https://dtcfza6z1c8xn.cloudfront.net/OLD_home_newtopicsfeature.png",
      title: "Topic Dictionaries",
      description: "Our Topic Dictionaries are lists of topic-related words.. ",
      link: "https://www.oxfordlearnersdictionaries.com/topic/",
      info: "Browse Topics",
    },
  ];

  // resources
  const resources = [
    {
      imageLink:
        "https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsOALD.png?version=2.3.48",
      info: "Oxford Advanced Learner's Dictionary",
      link: "We offer a number of premium products on this website to help you improve your English.",
    },
    {
      imageLink:
        "https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsOLDAE.png?version=2.3.48",
      info: "Oxford Learner's Dictionary of Academic English",
      link: "https://www.oxfordlearnersdictionaries.com/definition/academic/",
    },
    {
      imageLink:
        "https://www.oxfordlearnersdictionaries.com/external/images/home_2020/OLD_home_productsCollocs.png?version=2.3.48",
      info: "Oxford Collocations Dictionary",
      link: "https://www.oxfordlearnersdictionaries.com/definition/collocations/",
    },
  ];
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // store in db.json
  // };
  const [showDescription, setShowDescription] = useState({});

  const toggleDescription = (index) => {
    setShowDescription((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  function getBackgroundColor(index) {
    const colors = ['lightpink', 'lightblue', 'lightgreen', 'lightyellow']; // Define your desired colors
    // const colors = ['lightred', 'blue', 'green', 'yellow']; // Define your desired colors
    return colors[index % colors.length];
  }
  
  // Scroll to top function
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById("btn-back-to-top");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        btn.style.display = "block";
      } else {
        btn.style.display = "none";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className={"homepage "}>
      
      
      {/* <Navbar performSearch={handleButton} /> */}
      <CustomNavbar performSearch={handleButton} />
     

      {/*  searchar bar */}
      <div className="searchbar">
  {arr.length > 0 ? (
    <div className="searchbox">
      {arr[0] && (
        <div key={arr[0]?.meta?.id}>
          {arr[0]?.meta?.id && <h2>{arr[0].meta.id}</h2>}
          {arr[0]?.shortdef && (
            <div>
              <h3>Definitions:</h3>
              {arr[0].shortdef.map((def, index) => (
                <p key={index}>{def}</p>
              ))}
            </div>
          )}
          {arr[0]?.meta?.syns && arr[0].meta.syns[1] && (
            <h3>Synonym: {arr[0].meta.syns[1].join(", ")}</h3>
          )}
          {arr[0]?.meta?.ants && (
            <div>
              <h3>Antonyms:</h3>
              <p>
                {arr[0].meta.ants
                  .slice(0, 10)
                  .map((antonym, index) => antonym.join(", "))
                  .join(", ")}
              </p>
            </div>
          )}
          <button
            onClick={() =>
              handleBookmark(
                arr[0].meta.id,
                arr[0].shortdef,
                arr[0].meta.syns[1],
                arr[0]?.meta?.ants
              )
            }
            className="bookmark-button"
          >
            <BsBookmarkHeartFill />
            Bookmark
          </button>
        </div>
      )}
      {filteredArr1.length > 0 && (
        <div>
          <h3>Pronunciation:</h3>
          <p>{filteredArr1[0]?.text}</p>
          {filteredArr1[0]?.audio && (
            <div>
              <VolumeUpIcon
                onClick={() => {
                  const audioElement = new Audio(filteredArr1[0].audio);
                  audioElement.play();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  ) : search !== "" ? (
    <div className="spinner">
      <h1>Your searched word "{search}" is loading :)</h1>
      <div className="spinner-border text-warning"></div>
      <div className="spinner-border text-danger"></div>
      <div className="spinner-border text-secondary"></div>
    </div>
  ) : null}
</div>
 

      {/* word of the day */}

      <div className="box">
        <h2>Word Of The Day</h2> <br />
        <div className="b1">
          <h5>React Js</h5>
          <pre>
            [Trending Technology]{" "}
            <button onClick={handleAudio}>
              <GiSpeaker />
            </button>
          </pre>
          <div>
            <a
              href="https://silicon.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meaning & Examples
            </a>
            <p>{currentDate.toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* games */}

      <div className="container">
        <div className="row row-cols-3 g-3">
          {games.map((game, index) => (
            <div className="col" key={index}>
              <div className="card h-100 d-flex flex-column">
                <img src={game.imageUrl} className="card-imag-top" alt="Game" />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{game.title}</h5>
                  {showDescription[index] ? (
                    <p className="card-text">{game.description}</p>
                  ) : null}
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-primary mb-2"
                        onClick={() => toggleDescription(index)}
                      >
                        {showDescription[index]
                          ? "Close Description"
                          : "Open Description"}
                      </button>
                      <a
                        href={game.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-success"
                      >
                        Play Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* blogs */}
      <div className="blog-slider">
        <Carousel interval={3000}>
          {blogs.map((blog, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-content">
                <div className="carousel-caption">
                  <h3 className="caption-title">{blog.title}</h3>
                  <p className="caption-description">{blog.description}</p>
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    {blog.info}
                  </a>
                </div>
                <div className="carousel-image">
                  <img src={blog.imageLink} alt="Blog" className="blog-image" />
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* resources */}
      <div className="container p-4 resources-container">
  <div className="row" style={{ display: 'flex' }}>
    {resources.map((res, index) => (
      <div key={index} className="col-md-4 mb-4" style={{ flex: '1' }}>
        <div className="card" style={{ backgroundColor: getBackgroundColor(index), height: '100%' }}>
          <img src={res.imageLink} alt="error" className="card-img-top" style={{ maxWidth: '200px' }} />
          <div className="card-body">
            <h5 className="card-title">{res.title}</h5>
            <p className="card-text">{res.info}</p>
            <a href={res.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>



      {/* newslater */}

      {/* footer */}
      <footer >
      <div className="container py-4 footer-container">
        <div className="row">
          <div className="col-md-4">
            <a href="./"><h3>DictionaryDex.com</h3></a>
            <p>"Unlock the power of words with DictionaryDex, your ultimate language companion." - DictionaryDex is your trusted guide in the exciting journey of learning, offering a joyful and enriching experience as you delve into the world of language.</p>
          </div>
          <div className="col-md-4">
            <h3>Newsletter</h3>
            <form>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Enter your email" />
              </div>
              <button type="submit" className="btn btn1-primary">Subscribe</button>
            </form>
          </div>
          <div className="col-md-4">
            <h3>Contact</h3>
            <form>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </footer>

    <button
      type="button"
      className="btn btn-danger btn-floating btn-lg"
      id="btn-back-to-top"
      onClick={backToTop}
    >
      <i className="fas fa-arrow-up"></i>
    </button>

    </div>
  );
}

export default HomePage;
