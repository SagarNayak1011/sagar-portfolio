/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ink: '#060818', cyan2: '#22e5ea', violet2: '#9d5cff', coral: '#ff6b5c', mint: '#2ee6a6', amber2: '#ffb020', sky2: '#4f9dff' },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['"Space Grotesk"', 'system-ui', 'sans-serif'] },
      keyframes: {
        drift: { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(30px,-40px,0) scale(1.15)' } },
        spin360: { to: { transform: 'rotate(360deg)' } },
        shine: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
      },
      animation: { drift: 'drift 16s ease-in-out infinite', spin360: 'spin360 8s linear infinite', shine: 'shine 6s linear infinite' },
    },
  },
  plugins: [],
}
