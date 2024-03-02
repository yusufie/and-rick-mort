"use client"
import useSWR from "swr"
import Link from "next/link";

const fetcher = (url: any) => fetch(url).then((res) => res.json());

const Home: React.FC = () => {

    const { data, error } = useSWR('https://rickandmortyapi.com/api/location', fetcher)

    if (!data) return <div>Loading...</div>
    if (error) return <div>Failed to load</div>
    console.log(data.results)
  return (

    <section>
        <h1>Locations</h1>
        <ul>
            {data.results.map((location: any) => (
                <Link href={`${location.id}`} key={location.id}>
                    <li>{location.name}</li>
                </Link>
            ))}
        </ul>   
    </section>
  )
}

export default Home