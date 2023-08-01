import {Routes,Route} from "react-router-dom";
import Signup from "./pages/signup/signup";
import Signin from "./pages/signin/signin";
import HomePage from "./component/home";
import Bookmarks from "./component/bookmark";
import { SearchProvider } from "./searchContext";
import Loader from "./component/loader";



function AllRoutes(){
    return(
        <Routes>
            <Route path="/" element={
                <SearchProvider>
                <HomePage />
            </SearchProvider>
            } />
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/signup" element={<Signup/>
            }/>
            <Route path="/bookmark" element={<Bookmarks/>}/>
            <Route path="/loader" element={<Loader />} />
        </Routes>
    )
}
export default AllRoutes;