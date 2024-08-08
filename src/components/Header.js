import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '../lib/authenticate';
import { useAtom } from 'jotai';
import { userAtom, favoriteAtom, searchHistoryAtom } from '../state/atoms';

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [favorites] = useAtom(favoriteAtom);
  const [history] = useAtom(searchHistoryAtom);
  const token = readToken();

  const logout = () => {
    removeToken();
    setUser(null);
    router.push('/');
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-dark" style={{ backgroundColor: '#494949' }}>
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>DreamCars</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" passHref legacyBehavior>
              <Nav.Link>Home</Nav.Link>
            </Link>
            {token && (
              <>
                <Link href="/dashboard" passHref legacyBehavior>
                  <Nav.Link>Dashboard</Nav.Link>
                </Link>
                <Link href="/favorite" passHref legacyBehavior>
                  <Nav.Link>Favourites ({favorites.length})</Nav.Link>
                </Link>
                <NavDropdown title="History" id="history-dropdown">
                  {history.length > 0 ? (
                    history.slice(0, 5).map((car, index) => (
                      <Link href={`/product/${car.id}/page`} passHref key={index} legacyBehavior>
                        <NavDropdown.Item>{car.make_model.make.name} {car.make_model.name} - {car.year}</NavDropdown.Item>
                      </Link>
                    ))
                  ) : (
                    <NavDropdown.Item>No recent views</NavDropdown.Item>
                  )}
                </NavDropdown>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {token ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link>Login</Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link>Register</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
// import { Container, Navbar, Nav, NavDropdown, Tooltip, OverlayTrigger } from 'react-bootstrap';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { readToken, removeToken } from '../lib/authenticate';
// import { useAtom } from 'jotai';
// import { userAtom, favoriteAtom, searchHistoryAtom } from '../state/atoms';
// import styles from '../styles/Header.module.css';

// const Header = () => {
//   const router = useRouter();
//   const [user, setUser] = useAtom(userAtom);
//   const [favorites] = useAtom(favoriteAtom);
//   const [history] = useAtom(searchHistoryAtom);
//   const token = readToken();

//   const logout = () => {
//     removeToken();
//     setUser(null);
//     router.push('/');
//   };

//   const renderTooltip = (props) => (
//     <Tooltip id="button-tooltip" {...props}>
//       Log in to access.
//     </Tooltip>
//   );

//   const preventClick = (e) => {
//     if (!token) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//   };




//   return (
//     <Navbar expand="lg" fixed="top" className={styles.navbar}>
//       <Container>
//         <Link href="/" passHref legacyBehavior>
//           <Navbar.Brand className={styles.brand}>DreamCars</Navbar.Brand>
//         </Link>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Link href="/" passHref legacyBehavior>
//               <Nav.Link className={styles.navLink}>Home</Nav.Link>
//             </Link>
//             <OverlayTrigger
//               placement="bottom"
//               overlay={!token ? renderTooltip : <></>}
//             >
//               <Link href="/dashboard" passHref legacyBehavior>
//                 <Nav.Link className={styles.navLink} onClick={preventClick}>Dashboard</Nav.Link>
//               </Link>
//             </OverlayTrigger>
//             <OverlayTrigger
//               placement="bottom"
//               overlay={!token ? renderTooltip : <></>}
//             >
//               <NavDropdown title={`Favourites (${favorites.length})`} id="favourites-dropdown" className={styles.dropdownToggle} onClick={preventClick}>
//                 {favorites.length > 0 ? (
//                   favorites.slice(0, 5).map((favorite, index) => (
//                     <Link href={`/product/${favorite.id}/page`} passHref key={index} legacyBehavior>
//                       <NavDropdown.Item>{favorite.make_model.make.name} {favorite.make_model.name} - {favorite.year}</NavDropdown.Item>
//                     </Link>
//                   ))
//                 ) : (
//                   <NavDropdown.Item>No favourites added yet</NavDropdown.Item>
//                 )}
//               </NavDropdown>
//             </OverlayTrigger>
//             <OverlayTrigger
//               placement="bottom"
//               overlay={!token ? renderTooltip : <></>}
//             >
//               <NavDropdown title="History" id="history-dropdown" onClick={preventClick} className={styles.dropdownToggle}>
//                 {history.length > 0 ? (
//                   history.slice(0, 5).map((car, index) => (
//                     <Link href={`/product/${car.id}/page`} passHref key={index} legacyBehavior>
//                       <NavDropdown.Item>{car.make_model.make.name} {car.make_model.name} - {car.year}</NavDropdown.Item>
//                     </Link>
//                   ))
//                 ) : (
//                   <NavDropdown.Item>View a vehicle to add it to your history</NavDropdown.Item>
//                 )}
//               </NavDropdown>
//             </OverlayTrigger>
//           </Nav>
//           <Nav className="ms-auto">
//             {token ? (
//               <Nav.Link className={styles.navLink} onClick={logout}>Logout</Nav.Link>
//             ) : (
//               <div className={styles.authButtons}>
//                 <Link href="/login" passHref legacyBehavior>
//                   <Nav.Link className={styles.navLink}>Login</Nav.Link>
//                 </Link>
//                 <Link href="/register" passHref legacyBehavior>
//                   <Nav.Link className={styles.navLink}>Register</Nav.Link>
//                 </Link>
//               </div>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
