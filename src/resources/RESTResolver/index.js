import $ from 'jquery';
import path from 'path';
import data from '../data.json';

export class RESTResolver {
	constructor() {
		const { host, getbooks, getbook, gethistorial, getuser, getauthors } = data;

		this.bookspath = path.join(host, getbooks);
		this.bookpath = path.join(host, getbook);
		this.historypath = path.join(host, gethistorial);
		this.userpath = path.join(host, getuser);
		this.authorspath = path.join(host, getauthors);
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

	getHistorial = (id, success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: path.join(this.historypath, id),
			success: success,
			error: error
		});
	};

	getUser = (success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: this.userpath,
			success: success,
			error: error
		});
	};

	getAuthors = (success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: this.authorspath,
			success: success,
			error: error
		});
	};
}
