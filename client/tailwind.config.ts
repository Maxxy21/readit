import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            spacing: {
                70: '18.0rem',
                160: '40rem',
            },

            colors: {
                blue: {
                    100: '#cce4f6',
                    200: '#99c9ed',
                    300: '#66afe5',
                    400: '#3394dc',
                    500: '#0079d3',
                    600: '#0061a9',
                    700: '#00497f',
                    800: '#003054',
                    900: '#00182a',
                }
            },
            container: false,
        },
        fontFamily: {
            ibmPlexSans: ['var(--font-ibm-plex-sans)', 'sans-serif'],
        }
    },
    plugins: [
        function ({addComponents}: { addComponents: Function }) {
            addComponents({
                '.container': {
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    '@screen sm': {maxWidth: '640px'},
                    '@screen md': {maxWidth: '768px'},
                    '@screen lg': {maxWidth: '975px'},
                },
            })
        },
    ],
}
export default config
