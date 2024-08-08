require('dotenv').config()

import SearchPage from '@/components/Search';
// import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';


export default function Home() {
  // const [initialCity, setInitialCity] = useState(null);

  return (
    <>
      <Head>
        <title>DreamCars</title>
        <meta name="CarApp" content="application that offers car info" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container className="my-4">
         <SearchPage />
        </Container>
      </main>
    </>
  );
}
