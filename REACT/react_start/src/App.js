
import './App.css';
import "./style/postTagCont.css"
import { Header} from './components/Header.js';
import { Posts } from './components/Posts.js';
import { Tag } from './components/Tag.js';

function App() {
  return (
    <div className="App">
        <Header/>
        <div className={"postTagCont"}>
          <Posts/>
          <Tag/>
        </div>

    </div>
  );
}


export default App;
