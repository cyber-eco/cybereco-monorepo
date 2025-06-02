'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ fontFamily: 'Arial, sans-serif', padding: '50px', textAlign: 'center' }}>
        <h2>Something went wrong!</h2>
        <p>An error occurred while loading the application.</p>
        <button 
          onClick={() => reset()}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007cba', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Try again
        </button>
        <br />
        <br />
        <a href="/" style={{ color: '#007cba' }}>Go to Home</a>
      </body>
    </html>
  );
}