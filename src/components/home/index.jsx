import React, { Suspense } from 'react';
import ArtworkViewer from '../artwork-viewer';
import Loader from '../loader';

export default function Home() {
  return (
    <>
    <Suspense fallback={<Loader/>}>
      <ArtworkViewer/>
    </Suspense>
    </>
  );
}
