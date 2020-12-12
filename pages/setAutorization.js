import React from 'react';
import { useRouter } from 'next/router';

export default function SetAutorization() {
  const { asPath, replace } = useRouter();

  React.useEffect(() => {
    localStorage.setItem(
      'ACCESS_TOKEN',
      asPath.match(/access_token=(\w*)&/)[1],
    );
    replace('/');
  }, [asPath]);

  return <div>123</div>;
}
