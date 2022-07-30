import { useEffect } from 'react';

import { useRouter } from 'next/router';

function Raindrop() {
  const router = useRouter();
  useEffect(() => {
    async function fetchLocation() {
      const response = await fetch('/api/raindrop/authorize');
      const json = await response.json();
      console.log('redirecting:', json.location);
      router.push(json.location);
    }

    fetchLocation();
  }, []);
  return <div>Raindrop</div>;
}

export default Raindrop;
