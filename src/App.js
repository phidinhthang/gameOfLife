import React, {useState, useEffect,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridUI from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Grid from './Grid.js';
import Cell from './Cell.js';
import './App.css';

const rowNums = 20;
const colNums = 30;

const neightborsIndex = [
	{
		x:1,
		y:0,
	},
	{
		x:1,
		y:1,
	},
	{
		x:1,
		y:-1,
	},
	{
		x:0,
		y:1,
	},
	{
		x:0,
		y:-1,
	},
	{
		x:-1,
		y:1,
	},
	{
		x:-1,
		y:0,
	},
	{
		x:-1,
		y:-1,
	}
]

const useStyles = makeStyles(theme => ({
	button: {
		margin: theme.spacing(2)
	}
}))

const App = () => {
	const classes = useStyles();
	const [grid, setGrid] = useState(()=>{
		const col = Array.from(Array(colNums),()=>0);
		const grids = [];
		for(var i = 0;i<rowNums;i++){
			grids.push([...col]);
		}
		return grids;
	});
	const [start,setStart] = useState(false);
	const handleChange = (r,c) => {
		const draft = [...grid];
		draft[r][c] = draft[r][c] ? 0 : 1;

		setGrid(draft); 
	}
	const gridRef = useRef();
			gridRef.current = grid;
	const handleToggle = () => {
		setStart(start => !start);
	}
	const handleClear = () => {
		setStart(false);
		const draft = grid.map(arr => arr.slice());
		draft.map(arr => arr.fill(0))
		setGrid(draft);
	}
	useEffect(() => {
		const i = setInterval(() => {
			if(start){
				updateGrid();
			}
		},100);
		return () => clearInterval(i);
	},[start]);
	const updateGrid = () => {
		var draft = gridRef.current.map(function(arr) {
    	return arr.slice();
		});
		for(let i = 0;i<rowNums;i++){
			for(let j =0;j<colNums;j++){
				if(gridRef.current[i][j] == 0){
					let count = 0;
					neightborsIndex.forEach(neightbor => {
						if(gridRef.current[i + neightbor.y]&& gridRef.current[i + neightbor.y][j + neightbor.x] && gridRef.current[i + neightbor.y][j + neightbor.x] == 1){
							count++;
						}
					})
					if(count == 3){
						draft[i][j] = 1;
					}
				}else {
					let count = 0;
					neightborsIndex.forEach(neightbor => {
						if(gridRef.current[i + neightbor.y]&& gridRef.current[i+neightbor.y][j + neightbor.x] && gridRef.current[i + neightbor.y][j + neightbor.x] == 1){
							count++;
						}
					})
					if(count > 3 || count <2){
						draft[i][j] = 0;
					}
				} 
			}
		}
		setGrid(draft);
	}
	return (
		<React.Fragment>
			<Container>
				<GridUI container spacing={2}>
					<GridUI item xs={3}>
						<Button variant="contained" className={classes.button} color="primary" onClick={handleToggle}>{start ? "Dừng":"Bắt đầu"}</Button>
						<Button variant="contained" className={classes.button} color="primary" onClick={handleClear}>Xóa</Button>
					</GridUI>
					<GridUI item xs={9}>
						<Grid>
							{
								grid.map((row,r) => 
									row.map((col,c) => (
										<Cell key={`${r}a${c}`} className={col?"active":null} onClick={()=>handleChange(r,c)} />
									))
								)
							}
						</Grid>
					</GridUI>
				</GridUI>
			</Container>
		</React.Fragment>
	)
}

export default App;