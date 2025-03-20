## FE - Shipment Trace

## Overview

This website is uses to see tracking shipment of Courier, with input Resi/AWB and choose courier in Indonesian Dosmetic (JNT,JNE,SiCepat,etc).
This website consume API from [RajaOngkir](https://rajaongkir.com/dokumentasi/starter) and Frontend using Next JS, you can preview this website in the link [here](https://shipment-trace.vercel.app/)

## Tech Stack

- [Tailwind](https://v3.tailwindcss.com/)
- [Tanstack React Query](https://tanstack.com/query/latest)
- [Material UI](https://mui.com/material-ui/getting-started/)
- [BE - RajaOngkir](https://rajaongkir.com/dokumentasi/starter)


## Getting Started

Create `.env` file with key value, for `NEXT_PUBLIC_ACCESS_KEY` is mandatory to headers at API_HOST, you can genereate your own key in documentation [here](https://rajaongkir.com/dokumentasi/starter)

```bash
NEXT_PUBLIC_API_HOST=https://try.readme.io/https://rajaongkir.komerce.id
NEXT_PUBLIC_ACCESS_KEY=Ye9NP8iQ8bd0d8150a6803923AMQ69lL
```

install the project
```bash
npm install
# or
yarn
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.
