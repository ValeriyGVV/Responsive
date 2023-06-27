import {deleteAsync} from 'del';

// import del from "del";
export const reset = () => {
	return deleteAsync (app.path.clean);
}