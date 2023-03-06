import { Switch, Route } from 'react-router-dom'
import { CashOut } from "./ui/CashOut";
import { CashOutResult } from "./ui/CashOutResult";
import { Finger } from "./ui/Finger";
import { Menu } from "./ui/Menu";
import { Pin } from "./ui/Pin";
import { Splash } from "./ui/Splash";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Splash} />
      <Route path="/finger-check" exact component={Finger} />
      <Route path="/pin-check" exact component={Pin} />
      <Route path="/menu" exact component={Menu} />
      <Route path="/cash-out" exact component={CashOut} />
      <Route path="/cash-out/result" exact component={CashOutResult} />
    </Switch>
  )
}

export default Routes