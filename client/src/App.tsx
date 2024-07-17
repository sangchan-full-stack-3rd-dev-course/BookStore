import Layout from "./components/layout/Layout";
import Homes from "./pages/Homes";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import { BookStoreThemeProvider } from "./context/themeContext";


function App() {
  return (
    <BookStoreThemeProvider>
        <ThemeSwitcher/>
        <Layout>
          <Homes/>
        </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
