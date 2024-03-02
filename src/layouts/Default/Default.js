import { Header, Sidebar, Footer } from '../components';

function Default({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="left-block">
                    <Sidebar />
                </div>
                <div className="right-block">{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Default;
