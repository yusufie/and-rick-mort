"use client"
import { useParams } from 'next/navigation';
import useSWR from "swr";
import Image from 'next/image';
import styles from './TheCharacter.module.scss'

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const TheCharacter:React.FC = () => {

  const { id } = useParams();
  console.log("The Character params:", id)

   const { data, error } = useSWR(`https://rickandmortyapi.com/api/character/${id}`, fetcher)

    if (!data) return <div>Loading...</div>
    if (error) return <div>Failed to load</div>
    console.log("character:", data)

  return (
    <section className={styles.character} >
       <h1>{data.name}</h1>
        <article className={styles.cardWrapper}>
            
            <Image src={data.image} alt={data.name} width={300} height={300} />
            <div className={styles.cardInfo}>
              <p>Status: {data.status}</p>
              <p>Species: {data.species}</p>
              <p>type: {data.type}</p>
              <p>Gender: {data.gender}</p>
              <p>Origin: {data.origin.name}</p>
              <p>Origin: {data.origin.species}</p>
              <p>Url: {data.origin.url}</p>
            </div>
        </article>
    </section>
  )
}

export default TheCharacter