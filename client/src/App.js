import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import {GlobalStyles} from './styles/globalStyles'
import SideMenu from "./components/SideMenu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
//   border: 2px solid red;
  overflow: hidden;
`;

const Main = styled.div`
  flex: 7;
  height: 100%;
  background-color: ${({ theme }) => theme.bg};
  border: 2px solid purple;
  overflow-y: scroll;

`;
const Wrapper = styled.div`
  padding: 22px;
border: 2px solid blue;


`;

axios.defaults.withCredentials = true

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
    <GlobalStyles/>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>

      <Container>

        <BrowserRouter>

          <SideMenu darkMode={darkMode} setDarkMode={setDarkMode} />

          <Main>
            <Navbar />

            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="subscriptions" element={!currentUser ? <SignIn /> : <Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route
                    path="signin"
                    element={currentUser ?  <Navigate to="/" replace/> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
    </>

  );
}

export default App;
