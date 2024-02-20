import Header from "./Header";
import Navbar from "./Navbar";
import MainHome from "./MainHome";

const Home = () => {
    return ( 
        <div className="appHome">
            <div className="wrapHeader">
                <Header />
                <Navbar />
            </div>
            <MainHome />
        </div>
     );
}
 
export default Home;