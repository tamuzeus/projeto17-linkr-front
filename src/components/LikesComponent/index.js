import { IconDisliked, IconLiked } from "./style";
import { useState, useEffect, useContext } from "react";
import { postLike, deleteLike } from "../../services/linkr";
import { getNumLikes } from "../../services/linkr";
import UserContext from "../contexts/UserContext";

export default function Likes({ postId, likedAlready, setLikedAlready }) {
	const [liked, setLiked] = useState(false);
	const [likedBy, setLikedBy] = useState({ numLikes: 0 });
	const token = localStorage.getItem("linkrUserToken");
	const { refrash, setRefrash } = useContext(UserContext);

	useEffect(() => {
		if (likedAlready) {
			setLiked(true);
		}

		getNumLikes(postId)
			.then((resp) => {
				const numLikes = resp.data;
				setLikedBy(numLikes);
			})
			.catch((err) => {
				console.error(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [liked]);

	function insertLike(id) {
		setLikedAlready(true)
		postLike(id, token)
			.then((resp) => {
				console.log("worked");
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function dislike(id) {
		setLikedAlready(false)
		deleteLike(id, token)
			.then((resp) => {
				console.log("worked");
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<>
			{liked === false ? (
				<IconLiked
					onClick={() => {
						insertLike(postId);
						setLiked(true);
						setRefrash(!refrash);
					}}
				/>
			) : (
				<IconDisliked
					onClick={() => {
						dislike(postId);
						setLiked(false);
						setRefrash(!refrash);
					}}
				/>
			)}
			<span>{likedBy.numLikes ? likedBy.numLikes : 0}</span>
		</>
	);
}
