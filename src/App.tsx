import { useEffect, useReducer, useState } from 'react';
import './App.css';
// import { uid } from 'uid';
type Props = {
	id: number;
	title: string;
	desc: string;
};

type State = {
	data: Props[];
};

type Add = {
	readonly type: 'add';
	title: string;
	desc: string;
	id: number;
};

type Delete = {
	readonly type: 'delete';
	id: number;
};
export type Action = Add | Delete;

const neverReached = (never: never) => {};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'add':
			return { ...state, data: [ ...state.data, { id: action.id, title: action.title, desc: action.desc } ] };
		case 'delete':
			return { ...state, data: state.data.filter((i) => i.id !== action.id) };
		default:
			neverReached(action);
	}
	return state;
};

const Data: Props[] = [];

function App() {
	const [ state, dispatch ] = useReducer<React.Reducer<State, Action>>(reducer, { data: Data });
	const [ title, setTitle ] = useState('');
	const [ desc, setDesc ] = useState('');
	const [ selectedDesc, setSelected ] = useState('');
	console.log(state);

	useEffect(() => {});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: 'add', title: title, id: Math.random(), desc: desc });
		setTitle('');
		setDesc('');
	};
	const getDescription = (desc: string) => {
		console.log(desc);
		setSelected(desc);
	};
	const invalid = title === '' || desc === '';
	return (
		<div>
			<div className="header">
				<h1>Typescript Todo App</h1>
			</div>
			<div className="container">
				<div className="form-container">
					<h1>Create Todo</h1>
					<form onSubmit={onSubmit}>
						<input
							type="text"
							className="input"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter Todo"
						/>
						<br />
						<textarea
							className="input"
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							placeholder="Description"
						/>
						<br />
						<button className="input" disabled={invalid}>
							Save
						</button>
					</form>
				</div>
				<div className="list-container" style={{margin:'5px'}}>
					<h1>List</h1>
					{state.data.map((i) => {
						return (
							<div onClick={() => getDescription(i.desc)} className="list" key={i.id}>
								<h1 style={{ cursor: 'pointer' }}>{i.title}</h1>
								<button className="input" onClick={() => dispatch({ type: 'delete', id: i.id })}>
									Delete
								</button>
							</div>
						);
					})}
				</div>
				<div style={{ margin: '5px',width:'300px',textAlign:'justify',textJustify:'inter-word' }}>
					<h1>Description</h1>
					<h3>{selectedDesc}</h3>
				</div>
			</div>
		</div>
	);
}

export default App;
