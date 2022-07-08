import { useState, useEffect } from "react"

import Marquee from "react-fast-marquee"
import { motion } from "framer-motion"

import heroImage from "../assets/imgs/black-sand.jpg"

import Search from "../components/Search"

const UNSPLASH_URL = "https://api.unsplash.com"

const MovieList = ({ movies }) => {
  return (
    <div className="w-4/5 mx-auto my-0 mt-8 grid grid-cols-5 gap-2 justify-center">
      {movies.map((movie, index) => {
        return <CardImage height="lg" image={movie} />
      })}
    </div>
  )
}

const getRandomBoolean = () => {
  const randomBool = Math.round(Math.random())
  console.log(randomBool)
  return randomBool
}

const CardImage = ({
  image: itemData,
  scalable = false,
  height,
  gap,
}) => {
  const [loaded, setLoaded] = useState(false)

  // let heightNumber
  // switch (height) {
  //   case "xs":
  //     heightNumber = 48
  //     break
  //   case "md":
  //     heightNumber = 72
  //     break
  //   case "lg":
  //     heightNumber = 96
  //     break
  //   default:
  //     heightNumber = 72
  // }

  return (
    <div>
      <img
        className={`ease-out duration-100 ${
          scalable && "hover:scale-90"
        } hover:cursor-pointer max-h-72 overflow-hidden rounded-xl ml-${gap}`}
        onLoad={() => setLoaded(true)}
        src={itemData.urls.regular}
        alt={itemData.alt_description}
      />
      {/* {loaded && <div className={`h-72 w-42 ml-3 rounded-xl bg-slate-400`} />} */}
      {/* <div className={`h-72 w-44 rounded-xl bg-slate-400`} /> */}
    </div>
  )
}

const MarqueeCarousel = ({ images }) => {
  return (
    <Marquee
      pauseOnHover={true}
      gradient={false}
      speed={60}
      className="mt-8 flex wrap"
    >
      {images.map((img) => {
        return (
          <CardImage image={img} scalable={true} gap={3} />
        )
      })}
    </Marquee>
  )
}

const variants = {
  topBar: {
    width: "80%",
    marginTop: "3rem",
  },
  middleBar: {
    width: "60%",
    marginTop: "13rem",
  },
}

function Home() {
  const [images, setImages] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [searched, setSearched] = useState(false)

  const fetchAllImages = async () => {
    const req = await fetch(
      `${UNSPLASH_URL}/photos?page=1&client_id=t286ROUJRazXZ82f5i5jVBhBZE8GErofk1Mp50Ydl7o`
    )
    const apiData = await req.json()

    return apiData
  }

  useEffect(() => {
    fetchAllImages().then((data) => {
      setImages(data)
      setLoaded(true)
    })
  }, [])

  return (
    <div
      style={{ backgroundImage: `url(${heroImage})` }}
      className={`w-full h-full flex flex-col bg-cover bg-no-repeat bg-center overflow-hidden`}
    >
      <motion.div
        variants={variants}
        animate={searched ? "topBar" : "middleBar"}
        transition={{ ease: [0.22, 0.61, 0.36, 1] }}
        className={`my-8 mx-auto w-3/5`}
      >
        <Search setSearched={setSearched} />
      </motion.div>

      <section>
        {loaded && !searched && (
          <MarqueeCarousel
            images={images}
            loaded={loaded}
          />
        )}
        {loaded && searched && (
          <MovieList movies={images} />
        )}
      </section>
    </div>
  )
}

export default Home
