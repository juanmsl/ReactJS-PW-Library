import $ from 'jquery';
import data from '../data.json';

export class RESTResolver {
	constructor() {
		const { host, getbooks, getbook, gethistorial, getuser, getauthors, login, addbook, adduser, deletebook, borrow, returnbook } = data;

		this.bookspath = (host + getbooks);
		this.bookpath = (host + getbook);
		this.historypath = (host + gethistorial);
		this.userpath = (host + getuser);
		this.authorspath = (host + getauthors);
		this.loginpath = (host + login);
		this.addbookpath = (host + addbook);
		this.adduserpath = (host + adduser);
		this.deletebookpath = (host + deletebook);
		this.borrowpath = (host + borrow);
		this.returnpath = (host + returnbook);
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
			url: (this.bookpath + "/" + id),
			success: success,
			error: error
		});
	};

	getHistorial = (id, success, error) => {
		$.ajax({
			dataType: "json",
			type: "GET",
			timeout: 2000,
			url: (this.historypath + "/" + id),
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

	login = (data, success, error) => {
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "POST",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.loginpath,
			success: success,
			error: error
		});
	};

	addBook = (data, success, error) => {
		console.log(JSON.stringify(data));
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "POST",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.addbookpath,
			success: success,
			error: error
		});
	};

	addUser = (data, success, error) => {
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "POST",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.adduserpath,
			success: success,
			error: error
		});
	};

	deleteBook = (data, success, error) => {
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "DELETE",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.deletebookpath,
			success: success,
			error: error
		});
	};

	borrow = (data, success, error) => {
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "POST",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.borrowpath,
			success: success,
			error: error
		});
	};

	returnBook = (data, success, error) => {
		$.ajax({
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			type: "PUT",
			timeout: 2000,
			data: JSON.stringify(data),
			url: this.returnpath,
			success: success,
			error: error
		});
	};
}
