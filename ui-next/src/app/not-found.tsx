import Link from 'next/link';

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>404</h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.7)' }}>
          The page you are looking for does not exist.
        </p>
        <Link href="/" style={{ color: '#ff69b4', textDecoration: 'underline' }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
