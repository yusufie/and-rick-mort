"use client"
import { useParams } from 'next/navigation';
import useSWR from "swr";
import Image from 'next/image';

import styles from './TheLocation.module.scss'

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const TheLocation: React.FC = () => {

  const { id } = useParams();
  console.log("params", id)

  const { data, error } = useSWR(`https://rickandmortyapi.com/api/character/${id}`, fetcher)

      if (!data) return <div>Loading...</div>
      if (error) return <div>Failed to load</div>
      console.log("character:", data)
  return (
    <section className={styles.location} >
        <article>
            <h1>{data.name}</h1>
            <Image src={data.image} alt={data.name} width={300} height={300} />
            <p>Status: {data.status}</p>
        </article>
    </section>
  )
}

export default TheLocation