"use client"
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import useSWR from "swr";
import useLikeStore from "@/stores/likeStore";
import Link from "next/link";
import Image from 'next/image';

import styles from './TheLocation.module.scss'

const fetcher = (url: any) => fetch(url).then((res) => res.json());
const TheLocation: React.FC = () => {

  // like store
  const toggleLikeProduct = useLikeStore((state) => state.toggleLikeCharacter);
  const likedProducts = useLikeStore((state) => state.likedCharacters);

  const { id } = useParams();
  console.log("The location params:", id)

   const { data, error } = useSWR(`https://rickandmortyapi.com/api/location/${id}`, fetcher)

  const [residentsData, setResidentsData] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);

   useEffect(() => {
    const fetchResidentsDetails = async () => {
      if (data && data.residents) {
        const residentsDetails: any = await Promise.all(
          data.residents.map((residentUrl: any) => fetcher(residentUrl))
        );
        setResidentsData(residentsDetails);
        setFilteredResidents(residentsDetails); // Set filtered residents initially
      }
    };
    fetchResidentsDetails();
  }, [data]);
 
   if (!data) return <div>Loading...</div>;
   if (error) return <div>Failed to load</div>;
   console.log("residentsData:", residentsData)

    const handleFilterClick = (status: string) => {
      let filteredRes;
      switch (status) {
        case "Alive":
          filteredRes = residentsData.filter((resident: any) => resident.status === "Alive");
          break;
        case "Unknown":
          filteredRes = residentsData.filter((resident: any) => resident.status === "unknown");
          break;
        case "Dead":
          filteredRes = residentsData.filter((resident: any) => resident.status === "Dead");
          break;
        default:
          filteredRes = residentsData;
      }
      setFilteredResidents(filteredRes);
    };

    const handleLikeProduct = (resident: any) => {
      toggleLikeProduct(resident);
    }

  return (
    <section className={styles.location}>

      {/* Title Residents */}
      <h1>{data.name}</h1>

      {/* filter residents */}
      <section className={styles.filterButtons} >
        <button onClick={() => handleFilterClick("Alive")}>Alive</button>
        <button onClick={() => handleFilterClick("Unknown")}>Unknown</button>
        <button onClick={() => handleFilterClick("Dead")}>Dead</button>
        <button onClick={() => setFilteredResidents(residentsData)}>All</button>
      </section>

      {/* display residents */}
      <article className={styles.cards}>
        {filteredResidents?.map((resident: any) => (
          
            <article key={resident.id} className={styles.card}>
              <Image src={resident.image} alt={resident.name} width={200} height={200} />
              <Link href={`/character/${resident.id}`}>
                <p>Name: {resident.name}</p>
              </Link>
              <p>Status: {resident.status}</p>
              <p>Species: {resident.species}</p>
              <p>Status: {resident.status}</p>
              <button 
                className={styles.likeButton}
                onClick={() => handleLikeProduct(resident)}
              >
                {likedProducts.includes(resident) ? "Unlike" : "Like"}
              </button>
            </article>
          
        ))}
      </article>
    </section>
  )
}

export default TheLocation