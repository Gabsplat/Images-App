import { AiOutlineSearch } from "react-icons/ai"
import { IconContext } from "react-icons"

function Search({ setSearched }) {
  const submitData = () => {
    console.log(setSearched)
    setSearched(true)
  }

  return (
    <div className="glass-effect flex justify-center flex-col px-14 py-8 rounded-xl w-full h-auto bg-slate-800 mx-auto my-0">
      <h1 className="text-left text-slate-100 text-4xl mb-10 font-semibold">Best free stock photos in one place.</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submitData()
        }}
        className="relative"
      >
        <input type="text" placeholder="Search beautiful photos for free..." className="w-full px-6 py-2 rounded-xl" />
        <IconContext.Provider
          value={{ className: "text-2xl text-purple-900 hover:text-purple-700 absolute top-0 bottom-0 right-4 m-auto" }}
        >
          <div onClick={() => submitData()}>
            <AiOutlineSearch />
          </div>
        </IconContext.Provider>
      </form>
    </div>
  )
}

export default Search
