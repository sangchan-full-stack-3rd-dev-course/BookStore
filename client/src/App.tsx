import Layout from "./components/layout/Layout";
import Homes from "./pages/Homes";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { BookStoreThemeProvider } from "./context/themeContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Error from "./components/common/Error";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout><Homes/></Layout>,
    errorElement : <Error/>
  },
  {
    path : '/books',
    element : <Layout><div>도서 목록</div></Layout>,
    errorElement : <div>오류 발생</div>
  },
  {
    path : '/signup',
    element : <Layout>
      <SignUp/>
    </Layout>,
    errorElement : <div>오류 발생</div>
  },
  {
    path : '/reset',
    element : <Layout>
      <ResetPassword/>
    </Layout>,
    errorElement : <div>오류 발생</div>
  },
  {
    path : '/login',
    element : <Layout>
      <Login/>
    </Layout>,
    errorElement : <div>오류 발생</div>
  }
]);

function App() {
  return (
    <BookStoreThemeProvider>
        <ThemeSwitcher/>
          <RouterProvider router={router}/>
    </BookStoreThemeProvider>
  );
}

export default App;
