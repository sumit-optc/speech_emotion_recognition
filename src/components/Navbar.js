import React from "react";

function Navbar() {
	return (
		<nav className='navbar navbar-expand-lg sticky-top bg-body-tertiary navbar-dark bg-dark'>
			<button
				className='navbar-toggler'
				type='button'
				data-bs-toggle='collapse'
				data-bs-target='#navbarSupportedContent'
				aria-controls='navbarSupportedContent'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<a className='navbar-brand me-auto mb-0 mb-lg-0'>
				<img
					src='/logo192.png'
					width='30'
					height='30'
					className='d-inline-block align-top'
					alt=''
				/>
				Capstone
			</a>
			<div className='collapse navbar-collapse' id='navbarSupportedContent'>
				<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
					<li className='nav-item'>
						<a className='nav-link active' aria-current='page' href='#'>
							Page 1
						</a>
					</li>{" "}
					<li className='nav-item'>
						<a className='nav-link active' aria-current='page' href='#'>
							Page 2
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
