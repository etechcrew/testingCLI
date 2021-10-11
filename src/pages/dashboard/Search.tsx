import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonToolbar } from '@ionic/react';
import { close, search } from 'ionicons/icons';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import RestaurantList from '../../components/RestaurantCards/general';
import GeneralSkeletonText from '../../components/skeleton_text/general_restaurant';
import axios from '../../helpers/axiosInterceptor';


const Home: React.FC = (props: any) => {

	const [restaurants, setRestaurants] = useState([]);
	const [status, setStatus] = useState({
		searching: false,
		loaded: false,
		error: ''
	});
	const [query, setQuery] = useState("");

	const onSearch = (e) => {
		const q = e.target.value
		setQuery(q);
		if (q.trim().length < 3 || status.searching)
			return

		setStatus({ ...status, searching: true });

		axios.post('/restaurants/search', { q })
			.then(res => {
				setRestaurants(res.data);
				setStatus({ ...status, loaded: true, searching: false });
			})
			.catch(err => {
				setStatus({ ...status, loaded: true, error: err, searching: false });
			})
	}


	return (
		<IonPage>

			<IonHeader className="bg-white ion-no-border border-bottom">
				<IonToolbar color="white">
					<IonButtons slot="primary">
						<IonButton onClick={() => setQuery('')}>
							<IonIcon icon={close} className="text-muted" />
						</IonButton>
					</IonButtons>
					<IonButtons slot="start">
						<IonButton>
							<IonIcon icon={search} className="text-muted" />
						</IonButton>
					</IonButtons>

					<IonInput onIonChange={onSearch} value={query} placeholder="Search for Restaurant and Dishes" className="font-weight-bold text-default">
					</IonInput>
				</IonToolbar>
			</IonHeader>


			<IonContent fullscreen>

				<Container fluid={true} className="h-100">
					{(restaurants.length === 0 && !status.searching) && (
						<Row className="d-flex align-items-center h-100">
							<Col className="px-7 py-2 col mt-n5">
								<img className="dull-filter" src={require('../../assets/img/icons/common/search-restaurant.svg')} alt="search-restaurant" />
							</Col>
						</Row>
					)}

					{status.searching && (
						<Row className="mt-3">
							<Col>
								{[...Array(5)].map((e, i) => (<GeneralSkeletonText key={i} />))}
							</Col>
						</Row>
					)}
					{(status.loaded && !status.searching && restaurants.length !== 0) && (
						<Row className="mt-3">
							<Col>
								<h5 className="font-weight-bold px-3">Search Results</h5>
								<RestaurantList history={props.history} restaurants={restaurants} />
							</Col>
						</Row>
					)}

				</Container>
			</IonContent>


		</IonPage>
	);
};

export default Home;
