import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '0 2rem'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: '1.5rem' }}>The page you are looking for does not exist.</p>
      <Link href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        Return to Home
      </Link>
    </div>
  );
}