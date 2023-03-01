import Head from "next/head";

import { Inter } from "next/font/google";

const inter = Inter({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Head>
				<meta
					name="description"
					content="AirBnB clone built with Next.js"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link
					rel="icon"
					href="/favicon.ico"
				/>
			</Head>
			<main className={inter.className}>{children}</main>
		</>
	);
}
