import React from 'react';

class Footer extends React.Component {
	render() {
		const { data } = this.props;
		const { copyright } = data;

		return (
			<footer className="pw-footer">
				<section className="pw-content">
					<h5>Primer proyecto para Programación en la web</h5>
					<ul className="pw-list">
						<li>Juan Miguel Gomez Ganem</li>
						<li>Juan Manuel Sánchez</li>
						<li>Luis David Zárate Castillo</li>
					</ul>
				</section>
				<section className="pw-copyright">
					<span>{copyright}</span>
					<section>
						<a href="https://github.com/juanmsl/pw-library-front" className="pwi pwi-left pwi-github">Frontend</a>
						<span className="pw-separator">|</span>
						<a href="https://github.com/juanmsl/pw-library-api" className="pwi pwi-left pwi-github">Backend</a>
					</section>
				</section>
			</footer>
		);
	}
}

export default Footer;
