import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center mt-5">
      <h1 className="display-4">404 - Page Not Found</h1>
      <p className="lead">The page you are looking for does not exist.</p>
      <Link href="/">
        <a className="btn btn-primary">Go Home</a>
      </Link>
    </div>
  );
};

export default Custom404;
