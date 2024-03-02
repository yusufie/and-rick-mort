"use client";
import useLikeStore from '@/stores/likeStore';
import styles from './Favorite.module.scss'
import Image from 'next/image';
import Link from 'next/link';

const Favorite = () => {

  const likedCharacters = useLikeStore(state => state.likedCharacters);
  console.log("Liked Characters:", likedCharacters)

  return (
    <section className={styles.favorite} >

        <h1>Favorite Characters</h1>

        <article className={styles.cards}>
          {likedCharacters.map((character: any) => (

            <article key={character.id} className={styles.card}>
              <Image src={character.image} alt={character.name} width={200} height={200} />
              <Link href={`/character/${character.id}`}>
                <p>Name: {character.name}</p>
              </Link>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Status: {character.status}</p>
            </article>
          ))}

        </article>
    </section>
  )
}

export default Favorite