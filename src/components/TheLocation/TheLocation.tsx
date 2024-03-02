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

  // filter states for the residents
    // handle click event for alive, unknown, and dead
    const [showAll, setShowAll] = useState(true);
    const [showAlive, setShowAlive] = useState(false);
    const [showDead, setShowDead] = useState(false);
    const [showUnknown, setShowUnknown] = useState(false);

  const { id } = useParams();
  console.log("The location params:", id)

   const { data, error } = useSWR(`https://rickandmortyapi.com/api/location/${id}`, fetcher)

   const [residentsData, setResidentsData] = useState([]);

   useEffect(() => {
     const fetchResidentsDetails = async () => {
       if (data && data.residents) {
         const residentsDetails: any = await Promise.all(
           data.residents.map((residentUrl: any) => fetcher(residentUrl))
         );
         setResidentsData(residentsDetails);
       }
     };
 
     fetchResidentsDetails();
   }, [data]);
 
   if (!data) return <div>Loading...</div>;
   if (error) return <div>Failed to load</div>;
   console.log("residentsData:", residentsData)

   // filter out the residents that are alive, unknown, or dead
    const aliveResidents = residentsData.filter((resident: any) => resident.status === "Alive");
    const unknownResidents = residentsData.filter((resident: any) => resident.status === "unknown");
    const deadResidents = residentsData.filter((resident: any) => resident.status === "Dead");
    console.log("aliveResidents:", aliveResidents)
    console.log("unknownResidents:", unknownResidents)
    console.log("deadResidents:", deadResidents)

    // display all residents, if it filtered out by alive, unknown, or dead
    const residents = residentsData.filter((resident: any) => resident.status === "Alive" || resident.status === "unknown" || resident.status === "Dead");

    const handleShowAll = () => {
      setShowAll(true);
      setShowAlive(false);
      setShowDead(false);
      setShowUnknown(false);
    }

    const handleLikeProduct = (resident: any) => {
      toggleLikeProduct(resident);
    }

  return (
    <section className={styles.location}>

      <h1>{data.name}</h1>

      {/* filter residents */}   

      <article className={styles.cards}>
        {residents?.map((resident: any) => (
          
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
                {/* {likedProducts.some((p) => p.id === resident.id) ? "Unlike" : "Like"} */}
                like
              </button>
            </article>
          
        ))}
      </article>
    </section>
  )
}

export default TheLocation