import { Component } from 'react';
import Link from 'next/link';

class ErrorPage extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
  }

  render() {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
        <h1 className="display-4">{
          this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'
        }</h1>
        <p className="lead">Please try again later.</p>
        <Link href="/">
          <a className="btn btn-primary">Go Home</a>
        </Link>
      </div>
    );
  }
}

export default ErrorPage;
