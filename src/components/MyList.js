import MovieCard from './MovieCard'

export default function MyList({ myList }) {
  return (
    <div className="pt-20 px-4">
      <h2 className="text-2xl font-bold mb-4">My List</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {myList.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  )
}