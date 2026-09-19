/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#04060B',
        ink: '#070B12',
        panel: '#0B111A',
        raised: '#101925',
        hairline: '#1A2533',
        azure: {
          DEFAULT: '#4C8DFF',
          dim: '#2C5EB8',
          glow: 'rgba(76,141,255,0.35)',
        },
        signal: '#2FE8C3',
        amberline: '#F0B354',
        mist: '#E7EDF7',
        muted: '#8A98AE',
        faint: '#59677D',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { shell: '1280px' },
      keyframes: {
        spinSlow: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        spinSlowRev: { from: { transform: 'rotate(360deg)' }, to: { transform: 'rotate(0deg)' } },
        corePulse: {
          '0%,100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.06)' },
        },
        dash: { to: { strokeDashoffset: '-1000' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        bounceX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'spin-slow': 'spinSlow 46s linear infinite',
        'spin-slower': 'spinSlow 72s linear infinite',
        'spin-rev': 'spinSlowRev 60s linear infinite',
        'core-pulse': 'corePulse 4.5s ease-in-out infinite',
        dash: 'dash 14s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        marquee: 'marquee 26s linear infinite',
        'bounce-x': 'bounceX 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
