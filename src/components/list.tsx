import { useEffect, useRef, useState } from "react";

import ListItem from "./listItem";

import styles from "./list.module.scss";

export default function List() {
	const mounted = useRef(false);
	const [favorites, setFavorites] = useState<number[]>([]);
	const [list, setList] = useState<number[]>([]);

	function handleFavoriteClick(id: number) {
		if (favorites.includes(id)) {
			setFavorites(favorites.filter(favorite => favorite !== id));
		} else {
			setFavorites([...favorites, id]);
		}
	}

	// Save the favorites in the localStorage
	useEffect(() => {
		if (!mounted.current) {
			// Get the favorites from the localStorage
			const localFavorites = JSON.parse(
				localStorage.getItem("favorites") || "[]"
			);

			// Set the favorites
			setFavorites(localFavorites);
			mounted.current = true;
		} else {
			// Save the favorites in the localStorage
			localStorage.setItem("favorites", JSON.stringify(favorites));
		}
	}, [favorites]);

	// Add first 4 items to the list
	useEffect(() => {
		setList([1, 2, 3, 4]);
	}, []);

	return (
		<ul className={styles.content}>
			{list.map(id => (
				<ListItem
					key={id}
					value={favorites.includes(id)}
					onFavoriteClick={() => handleFavoriteClick(id)}
				/>
			))}
		</ul>
	);
}
