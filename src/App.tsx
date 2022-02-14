import { Counter } from './Counter'
import FacebookIcon from './facebook.svg'
import './index.css'
import InstagramIcon from './instagram.png'

const App = () => {
  const name = 'Sam'

  return (
    <div>
      <h1>Hello React Typescript Webpack Starter Template</h1>
      <img src={FacebookIcon} alt="" />
      <img src={InstagramIcon} alt="" />
      <p>This is {process.env.NODE_ENV}</p>
      <p>This is {process.env.name}</p>
      <Counter />
    </div>
  )
}

export { App }
