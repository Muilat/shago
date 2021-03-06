import { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class Layout extends Component {
		render() {
				return (
					<html lang="en">
						<head>
							<title>Shoppers &mdash; Colorlib e-Commerce Template</title>
							<meta charSet="utf-8"/>
			                  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

			                  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Mukta:300,400,700" />
			                  <link rel="stylesheet" href="/static/fonts/icomoon/style.css"/>

			                  <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
			                  <link rel="stylesheet" href="/static/css/magnific-popup.css"/>
			                  <link rel="stylesheet" href="/static/css/jquery-ui.css"/>
			                  <link rel="stylesheet" href="/static/css/owl.carousel.min.css"/>
			                  <link rel="stylesheet" href="/static/css/owl.theme.default.min.css"/>


			                  <link rel="stylesheet" href="/static/css/aos.css"/>

			                  <link rel="stylesheet" href="/static/css/style.css"/>

						</head>
						<body>

							<div className="site-wrap">

								<Header />
								{this.props.children}
								<Footer />
							</div>
							<script src="/static/js/jquery-3.3.1.min.js"></script>
						  <script src="/static/js/jquery-ui.js"></script>
						  <script src="/static/js/popper.min.js"></script>
						  <script src="/static/js/bootstrap.min.js"></script>
						  <script src="/static/js/owl.carousel.min.js"></script>
						  <script src="/static/js/jquery.magnific-popup.min.js"></script>
						  <script src="/static/js/aos.js"></script>

						  <script src="/static/js/main.js"></script>
								
						</body>
					</html>

				);
		}
}
export default Layout;
