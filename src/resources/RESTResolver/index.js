import $ from 'jquery';
import path from 'path';
import data from '../data.json';

export class RESTResolver {
	constructor() {
		const { host, getbooks, getbook } = data;

		this.bookspath = path.join(host, getbooks);
		this.bookpath = path.join(host, getbook);
	}

	getBooks = (success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: this.bookspath,
			success: success,
			error: error
		});
	};

	getBook = (id, success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: path.join(this.bookpath, id),
			success: success,
			error: error
		});
	};
}
