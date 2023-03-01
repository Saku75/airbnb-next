import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FavoriteBorder, Favorite } from "@mui/icons-material";

import styles from "./listItem.module.scss";

export default function ListItem(props: {
	value: boolean;
	onFavoriteClick: () => void;
}) {
	return (
		<li className={styles.content}>
			<Image
				src="/img/italy.webp"
				alt="Picture of destination"
				width={500}
				height={500}
				priority={true}
			/>
			<div>
				<button onClick={props.onFavoriteClick}>
					{props.value ? <Favorite /> : <FavoriteBorder />}
				</button>
				<Link href="/">More</Link>
			</div>
		</li>
	);
}
