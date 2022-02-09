import React, { useEffect, useState } from 'react';
import { db } from '../../scripts/firebase/config';
import { doc, getDoc, updateDoc, collection, getDocs, query, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

let page = 'ProfilePage';

function SavedEvents(props) {
	import('../../styles/page/ProfilePage.css');
	const [eventListState, setEventListState] = useState([]);

	let SavedEventsTemp = [];
	const handleRoute = useNavigate();
	const [savedArticles, setSavedArticles] = useState([]);
	const docRef = doc(db, 'users', props.userID);
	useEffect(async () => {
		const p = query(collection(db, 'users', props.userID, 'Published'));
		const eventListTemp = [];

		//listen to events
		const eventsSnapshot = onSnapshot(p, (querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const eventTemp = doc.data();
				eventTemp.id = doc.id;
				eventListTemp.push(eventTemp);
			});
			setEventListState(eventListTemp);
		});
	}, []);

	return (
		<div className='wholePage'>
			<div className='SavedEvents'>
				<h3 className='EventParent2'>Published Events</h3>
				<div className='eventMapContainer'>
					{eventListState.map((event) => {
						return (
							<div key={event.id} className='nametag card card--link'>
								<button onClick={() => handleRoute(`Edit/${event.id}`)}>Edit Event</button>

								<img src={event.coverImage} alt={event.title}></img>
								<div onClick={() => handleRoute(`View/${event.id}`)}>
									<h2>{event.title}</h2>
									<div className='cardData'>
										<div id='Date'>
											{new Intl.DateTimeFormat('en', {
												timeStyle: 'short',
												dateStyle: 'medium',
											}).format(event.startTime.seconds * 1000)}
										</div>
										<div id='Views'>
											<div className='tagGroup'>
												{event.tags.map((e) => (
													<div key={e.id} className='tag'>
														{e}
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
								<div className='cardTags'></div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SavedEvents;
