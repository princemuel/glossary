import FacebookIcon from './facebook.svg';
import './index.css';
import InstagramIcon from './instagram.png';

const App = () => {
  return (
    <div>
      <h1>React Typescript Webpack Starter Template</h1>
      <img src={FacebookIcon} alt='image' />
      <img src={InstagramIcon} alt='image' />
      <p>This is {process.env.NODE_ENV}</p>
      <p>This is {process.env.name}</p>
    </div>
  );
};

export { App };
