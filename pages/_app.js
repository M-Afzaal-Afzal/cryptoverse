import 'antd/dist/antd.css'
import '../styles/vars.css'
import '../styles/global.css'
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import {Layout} from "antd";
import {Provider} from 'react-redux';
import store from '../store/store';


export default function MyApp({Component, pageProps}) {


    return (
        <Provider store={store}>
            <div className={'app'}>
                <div className={'nav-bar'}>
                    <Navbar/>
                </div>
                <div className={'main'}>
                    <Layout>
                        <div className={'routes'}>
                            <Component {...pageProps} />
                        </div>

                    </Layout>
                    <div className={'footer'}>
                        <Footer/>
                    </div>
                </div>
            </div>
        </Provider>
    )
}
