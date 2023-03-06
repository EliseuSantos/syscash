import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import { ActionsButtonLeft, ActionsButtonRight } from './ui/ActionButtons'

const App = () => {
  return (
    <Router>
      <div className="screen_content">
        <ActionsButtonLeft />
        <div className="screen_lcd">
          <Routes />
        </div>
        <ActionsButtonRight />
      </div>
    </Router>
  );
}

export default App
