import List from "components/list";
import Head from "next/head";

import styles from "styles/Home.module.scss";

export default function Home() {
	return (
		<>
			<Head>
				<title>Destinations | AirBnB</title>
			</Head>
			<div className={styles.content}>
				<h1 className={styles.title}>Apartments for rent</h1>
				<List />
			</div>
		</>
	);
}
