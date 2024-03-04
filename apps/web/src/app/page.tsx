'use client';

import Image from 'next/image';
import HomeQuestionImg from '@/assets/images/home-question.png';
import HomeLightImg from '@/assets/images/home-light.png';
import HomeQuoImg from '@/assets/images/home-quo.png';
import HomeStarImg from '@/assets/images/home-star.png';
import HomeStringImg from '@/assets/images/home-string.png';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useUserStore } from '@/store/user';

export default function Home() {
  const isLogin = useUserStore((state) => !!state.user);

  return (
    <main className="min-h-screen p-[140px]">
      <header className="text-6xl mb-[100px] animate-fade-down animate-duration-1000">
        <h1 className="text-center">Talk.Listen. Get inspired</h1>
        <h1 className="text-center">by every minute of it</h1>
      </header>

      <div className="flex justify-between mb-32 animate-fade-right animate-duration-1000">
        <div className="w-[472px] text-center text-lg">
          <Image
            src={HomeQuestionImg}
            alt="question"
            className="mb-10 m-auto"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ac ultrices odio.
          </p>
        </div>

        <div className="w-[472px] text-center text-lg">
          <Image src={HomeLightImg} alt="light" className="mb-10 m-auto" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            ac ultrices odio.
          </p>
        </div>
      </div>

      <section className="relative bg-[#F7EDE8] p-[40px] mb-20 animate-fade-left animate-duration-1000">
        <Image src={HomeQuoImg} alt="quote" className="m-auto mb-10" />
        <Image
          src={HomeStarImg}
          alt="star"
          className="absolute -top-14 -right-12"
        />
        <Image
          src={HomeStringImg}
          alt="string"
          className="absolute -left-14 bottom-8"
        ></Image>
        <h1 className="text-3xl font-bold text-center">
          One of the best daily podcasts that
        </h1>
        <h1 className="text-3xl font-bold text-center">
          covers every topic on Spotify.
        </h1>
      </section>

      <section className="flex justify-center">
        {isLogin ? (
          <Button colorScheme="gray">
            <Link href="/resumes">resumes</Link>
          </Button>
        ) : (
          <Button colorScheme="gray">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </section>
    </main>
  );
}
