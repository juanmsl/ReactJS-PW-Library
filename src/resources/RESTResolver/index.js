import $ from 'jquery';
import path from 'path';
import data from '../data.json';

export class RESTResolver {
	constructor() {
		const { host, getbooks } = data;

		this.bookspath = path.join(host, getbooks);
	}

	getBooks = (success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			url: this.bookspath,
			success: success,
			error: error
		});
	}
}
