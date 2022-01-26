import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StickyBanner.css';
import { Component } from 'react';

//icons
import HomeButton from '../Images/home.svg';
import Menu from '../Images/Menu.svg';
import X from '../Images/X.svg';

function StickyBanner({isAdmin, isOle}) {
	const navigate = useNavigate();
	const [navToggle, setNavToggle] = useState(false);


	function handleMenu() {
		let temp = !navToggle;
		setNavToggle(temp);
		console.log(navToggle, 'nav toggle');
	}
	
	return (
		<div id='stickyBanner'>
			<div
				className='homeB_container'
				onClick={() => {
					navigate('/MainPage');
				}}>
				<img src={HomeButton} alt='Home' id='homeButton' />
			</div>
			<div className='Menu_container'>
				{navToggle ? (
					<div>
						<img src={X} alt='X' id='MenuButton' onClick={handleMenu} />
						<div className='menuList_Container'>
							<ul className='menuList'>
								<li className='ListItemElement'>
									<div
										className='menuItem'
										onClick={() => {
											navigate('/ProfilePage')
											handleMenu()
										}}>
										Profile Page
									</div>
								</li>
								<li className='ListItemElement'>
									<div
										className='menuItem'
										onClick={() => {
											navigate('/ContactUs')
											handleMenu()
										}}>
										Contact Us
									</div>
								</li>
								<li className='ListItemElement'>
									<div
										className='menuItem'
										onClick={() => {
											navigate('/')
											handleMenu()
										}}
										name='add a reqest to be org page'>
										Create an Event
									</div>
								</li>
								<li className='ListItemElement'>
									<div
										className='menuItem'
										onClick={() => {
											navigate('/ArticleCreation')
											handleMenu()
										}}>
										Article Creation
									</div>
								</li>
								<li className='ListItemElement'>
									<div
										className='menuItem'
										onClick={() => {
											navigate('/AdminPage')
											handleMenu()
										}}>
										Admin Page
									</div>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<img src={Menu} alt='Home' id='MenuButton' onClick={handleMenu} />
				)}
			</div>
		</div>
	);
}

export default StickyBanner;
