import React from 'react';
import './Cell.css';

const Cell = ({onClick,className}) => {
	return <div className={`cell ${className}`} onClick={onClick}>
		
	</div>
}

export default Cell;